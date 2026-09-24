---
title: AWS Deployment Architecture for SaaS – A Practical Blueprint
description: A practical AWS deployment architecture for SaaS products. Covers VPC layout, ECS vs Lambda, RDS, S3, queues, CI/CD, secrets and environments.
category: system-design
tags: [aws, saas, ecs, devops, system design, docker]
publishedAt: 2026-09-24
services: [aws-developer, saas-development]
projects: [vercel-clone]
related: [dockerizing-nextjs, building-saas-with-nextjs, nodejs-api-architecture]
featured: false
---

A sensible AWS deployment architecture for SaaS puts containerised app and worker services on ECS Fargate inside a VPC, fronts them with an Application Load Balancer and CloudFront, stores data in RDS Postgres and S3, and moves slow work through a queue. Everything is defined as code and deployed by a pipeline. That shape covers most early and mid-stage SaaS products without the operational weight of Kubernetes.

## Start from the requirements, not the service list

AWS has hundreds of services, and it is easy to design an architecture diagram that looks impressive and costs a lot to run. Before choosing anything, write down what the product actually needs:

- How many long-running processes: a web app, an API, background workers?
- Are there spiky or CPU-heavy jobs, such as builds, media processing or LLM pipelines?
- Is the product multi-tenant with shared infrastructure, or do some customers need isolation?
- What are the data residency and compliance constraints?
- Who will operate it? A solo developer and a platform team need very different levels of complexity.

The answers drive every choice below.

## The reference layout

This is the baseline I start from and then trim or extend.

1. **Route 53** for DNS, with ACM certificates for TLS.
2. **CloudFront** in front of everything, caching static assets and terminating TLS close to users.
3. **Application Load Balancer** in public subnets, routing by host or path to services.
4. **ECS Fargate services** in private subnets: one for the web or API, one or more for workers.
5. **RDS PostgreSQL** in private subnets, Multi-AZ once uptime matters.
6. **ElastiCache Redis** for caching, rate limiting and queues, or SQS if you prefer a fully managed queue.
7. **S3** for user uploads and build artefacts, accessed through presigned URLs.
8. **Secrets Manager or SSM Parameter Store** for credentials, injected into tasks at start.
9. **CloudWatch** for logs, metrics and alarms.

Nothing in the private subnets is reachable from the internet. The load balancer is the only public entry point for application traffic.

## Networking without overthinking it

Create a VPC across at least two availability zones, each with a public and a private subnet. Public subnets hold the load balancer and NAT gateways. Private subnets hold tasks and databases.

NAT gateways are a frequent surprise on the bill, because they charge for hours and for data processed. Two cost controls help: use VPC endpoints for S3 and ECR so image pulls and uploads do not route through NAT, and for non-production environments consider a single NAT gateway instead of one per zone.

Security groups should reference each other rather than IP ranges. The database security group allows Postgres traffic only from the app and worker security groups. The app security group allows traffic only from the load balancer.

## Compute choices – ECS, Lambda or EC2

### ECS on Fargate

For most SaaS backends, ECS Fargate is the default I recommend. You ship a Docker image, define CPU and memory, and AWS runs it without you managing servers. Services autoscale on CPU, memory or custom metrics such as queue depth. Rolling deploys and health checks come built in.

### Lambda

Lambda fits event-driven, bursty work: webhook handlers, scheduled jobs, image thumbnailing, S3 event processing. It is a weaker fit for a full API with persistent database connections, long-lived WebSockets, or requests that run longer than its timeout. If you do run an API on Lambda, put RDS Proxy in front of Postgres so each invocation is not opening a fresh connection.

### EC2

Plain EC2 makes sense when you need things Fargate does not offer well, such as privileged Docker access, GPUs, or very steady high utilisation where reserved instances are cheaper. You take on patching and capacity management in exchange.

### Kubernetes

EKS is powerful but carries a real operational cost. Unless you already have Kubernetes expertise, many services to orchestrate, or a portability requirement, ECS gets you most of the benefits with far less to maintain.

## Where the Vercel clone pushed on this design

The [Vercel clone case study](/projects/vercel-clone) is a good example of a workload that does not fit a plain web-app layout. Users connect a repo, and each push triggers an isolated Docker build whose logs stream back to the browser. Builds are CPU-heavy, unpredictable in volume and run untrusted code.

That argues for a clear split: the dashboard and API run as normal always-on services, while builds run as separately scheduled, isolated tasks pulled from a queue. Build concurrency is capped so a burst of pushes queues rather than starving the API. On AWS, build output belongs in S3, and generated subdomains need a routing layer that maps each host to the right deployment. The general lesson applies to any SaaS with heavy background work: keep it on separate compute from the request path, and scale it on queue depth rather than CPU.

## Data layer

RDS Postgres covers the relational needs of most SaaS products. Turn on automated backups and point-in-time recovery from day one, since restoring from a snapshot you never tested is the classic failure. Enable Multi-AZ when downtime starts costing customers.

For multi-tenancy, a shared schema with a `tenant_id` column on every table is the simplest to operate. Enforce it in code at the repository layer, and consider Postgres row-level security as a second line of defence. Separate schemas or databases per tenant give stronger isolation but make migrations and connection management harder, so reserve that for customers who contractually need it.

Store files in S3, never on container disks, because Fargate task storage disappears when the task stops. Let clients upload directly to S3 with presigned URLs so large files do not pass through your API.

## CI/CD and infrastructure as code

Click-ops in the console does not survive the second environment. Define infrastructure with Terraform, AWS CDK or a similar tool, and keep it in the repo.

A typical pipeline in GitHub Actions or GitLab CI looks like this:

1. Run lint, type checks and tests on every pull request.
2. On merge, build the Docker image once and tag it with the commit SHA.
3. Push the image to ECR.
4. Run database migrations as a one-off ECS task before the new version starts.
5. Update the ECS service to the new task definition and let the rolling deploy wait for health checks.
6. Promote the same image to production after staging passes, instead of rebuilding it.

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
    aws-region: ap-south-1

- name: Build and push image
  run: |
    IMAGE=$ECR_REGISTRY/app:${{ github.sha }}
    docker build -t $IMAGE .
    docker push $IMAGE
```

Use OIDC role assumption, as above, rather than long-lived access keys stored as CI secrets. If you are containerising a Next.js frontend for this pipeline, [Dockerizing Next.js](/blog/dockerizing-nextjs) covers the image itself.

## Environments and secrets

Run at least staging and production, ideally in separate AWS accounts under AWS Organizations. Separate accounts give a hard blast-radius boundary: a mistake in staging cannot delete production data.

Keep secrets out of images and environment files in the repo. Store them in Secrets Manager or Parameter Store, reference them in the ECS task definition, and grant the task role permission to read only the secrets it needs.

## Observability and cost

Ship structured JSON logs to CloudWatch, and set alarms on the signals that mean users are hurting: load balancer 5xx rate, p95 latency, task restarts, queue age and database CPU or connections. Add AWS Budgets alerts early so a runaway resource is noticed in days, not at the end of the month.

## When this is too much

For an MVP with a handful of users, this full layout is probably more than you need. A frontend on Vercel, a single container on ECS or a small EC2 instance, and a managed Postgres can be the right call while you validate the product. The key is to keep the app stateless, files in S3 and config in environment variables, so moving to the fuller layout later is a migration rather than a rewrite.

## Key takeaways

- Default to ECS Fargate in private subnets behind an ALB and CloudFront for most SaaS backends.
- Keep heavy background work on separate compute, pulled from a queue and scaled on queue depth.
- Use RDS with tested backups, S3 with presigned uploads, and a shared schema with tenant_id for multi-tenancy.
- Build images once, deploy through a pipeline with OIDC, and define infrastructure as code.
- Scale the architecture to your stage, but keep the app stateless so growing it is straightforward.

## Planning your AWS setup

If you are moving a SaaS product onto AWS or tidying up a setup that grew by hand, I can help design the architecture, write the infrastructure code and build the deploy pipeline. See my [AWS development](/aws-developer) and [SaaS development](/saas-development) work, or [get in touch](/hire-me) with where you are today.
