import { siteConfig, stats } from "@/lib/site";
import { Badge, Dot } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { AppPreview } from "./AppPreview";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Ambient background: grid + two soft colour washes. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[-14rem] size-[40rem] -translate-x-1/2 rounded-full bg-[var(--glow-1)] blur-[110px]" />
        <div className="absolute right-[-10rem] top-[6rem] size-[30rem] rounded-full bg-[var(--glow-2)] blur-[110px]" />
      </div>

      <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="flex flex-col items-center text-center animate-rise">
          <Badge>
            <Dot />
            Now with warehouse-native AI queries
          </Badge>

          <h1
            id="hero-heading"
            className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl"
          >
            <span className="text-gradient">Ask your product data</span>{" "}
            anything. Get an answer you can defend.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-fg-muted text-pretty">
            {siteConfig.name} sits on top of your warehouse and turns plain-English
            questions into governed metrics, charts and cohorts — so product teams
            stop waiting on the data backlog and analysts stop rewriting the same
            SQL.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button as="a" href="#pricing" size="lg">
              Start free — no card required
              <ArrowRightIcon className="size-[18px]" />
            </Button>
            <Button as="a" href="#how-it-works" size="lg" variant="secondary">
              See how it works
            </Button>
          </div>

          <p className="mt-4 text-sm text-fg-muted">
            Free forever for 3 editors · SOC 2 Type II · Connects in 5 minutes
          </p>
        </div>

        <div className="mt-14 sm:mt-16">
          <AppPreview />
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 sm:mt-16 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="order-2 text-sm text-fg-muted">{stat.label}</dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
