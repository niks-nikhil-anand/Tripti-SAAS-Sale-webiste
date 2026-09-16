"use me";
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig, services, engagementModels } from "@/lib/site";

export function HireForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: initialService,
    budget: "",
    timeline: "",
    model: "Fixed Scope",
    desc: "",
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.service) errs.service = "Please select a service.";
    if (!formData.desc.trim()) errs.desc = "Please provide a project description.";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const selectModel = (modelName: string) => {
    setFormData((prev) => ({ ...prev, model: modelName }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const generateWaText = () => {
    const msg = `Hi Tripti,\nName: ${formData.name || "N/A"}\nEmail: ${
      formData.email || "N/A"
    }\nCompany: ${formData.company || "N/A"}\nService: ${
      formData.service || "N/A"
    }\nBudget: ${formData.budget || "N/A"}\nTimeline: ${
      formData.timeline || "N/A"
    }\nEngagement: ${formData.model}\nDescription: ${
      formData.desc || "N/A"
    }`;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      msg
    )}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column Info & Engagement Models */}
      <div className="lg:col-span-5 grid gap-7">
        <div className="border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.028)] p-6">
          <h2 className="font-['Space_Grotesk'] font-bold text-[19px] mb-4 text-[var(--ink)]">
            Available Services
          </h2>
          <div className="flex flex-wrap gap-1.75">
            {services.map((s) => (
              <span
                key={s.id}
                className="font-['JetBrains_Mono'] text-[11px] px-2.75 py-1.5 border border-[var(--line)] rounded-lg bg-[rgba(255,255,255,0.04)] text-[#c6cfe4]"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-['Space_Grotesk'] font-bold text-[19px] mb-2 text-[var(--ink)]">
            Engagement Models
          </h2>
          <p className="text-[13px] text-[var(--faint)] mb-4">
            Pick the one that matches how the project is funded — pricing is quoted per project milestone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {engagementModels.map((m) => {
              const selected = formData.model === m.name;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => selectModel(m.name)}
                  aria-pressed={selected}
                  className={`p-3.5 rounded-[var(--r)] text-left border transition-all cursor-pointer ${
                    selected
                      ? "border-[var(--blue)] bg-[rgba(77,124,255,0.12)]"
                      : "border-[var(--line)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--line2)]"
                  }`}
                >
                  <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.14em] uppercase text-[#7fe6f7]">
                    {m.tag}
                  </span>
                  <span className="block my-1.5 font-['Space_Grotesk'] font-semibold text-[16px] text-[var(--ink)]">
                    {m.name}
                  </span>
                  <span className="block text-[12.5px] leading-[1.5] text-[var(--dim)]">
                    {m.body}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border border-[rgba(139,92,246,0.3)] rounded-[var(--r-lg)] bg-[rgba(139,92,246,0.08)] p-5.5">
          <h2 className="font-['Space_Grotesk'] font-bold text-[17px] mb-2 text-[var(--ink)]">
            Availability & Location
          </h2>
          <p className="text-[13.5px] leading-[1.65] text-[#cfd7ea]">
            Taking new projects for Q4 2026. Typical reply time is within 24 hours. Based in Bengaluru (IST) with dedicated daily overlap windows for international teams.
          </p>
        </div>
      </div>

      {/* Right Column Project Brief Form */}
      <div
        id="form"
        className="lg:col-span-7 relative border border-[var(--line2)] rounded-[var(--r-lg)] bg-[linear-gradient(160deg,rgba(255,255,255,0.075),rgba(255,255,255,0.02))] backdrop-blur-xl shadow-[0_44px_100px_-50px_rgba(0,0,0,0.95)] p-6 sm:p-8.5"
      >
        <div
          aria-hidden="true"
          className="absolute -top-[40%] -right-[20%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(77,124,255,0.18),transparent_66%)] blur-[40px] pointer-events-none"
        ></div>

        <div className="relative">
          <h2 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[30px] mb-2 text-[var(--ink)]">
            Project Brief
          </h2>
          <p className="text-[13.5px] leading-[1.6] text-[var(--dim)] mb-6">
            Marked fields (*) are required. Send as a brief or push straight to WhatsApp.
          </p>

          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-1.75">
                <label
                  htmlFor="h-name"
                  className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
                >
                  Name *
                </label>
                <input
                  id="h-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  className={`w-full box-border px-3.5 py-3 min-h-[46px] border rounded-[11px] bg-[rgba(4,6,12,0.5)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] focus:border-[var(--cyan)] outline-none ${
                    errors.name ? "border-[#ffb4a8]" : "border-[var(--line2)]"
                  }`}
                />
                {errors.name && (
                  <p role="alert" className="text-[12px] text-[#ffb4a8]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-1.75">
                <label
                  htmlFor="h-email"
                  className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
                >
                  Email *
                </label>
                <input
                  id="h-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  className={`w-full box-border px-3.5 py-3 min-h-[46px] border rounded-[11px] bg-[rgba(4,6,12,0.5)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] focus:border-[var(--cyan)] outline-none ${
                    errors.email ? "border-[#ffb4a8]" : "border-[var(--line2)]"
                  }`}
                />
                {errors.email && (
                  <p role="alert" className="text-[12px] text-[#ffb4a8]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-1.75">
                <label
                  htmlFor="h-company"
                  className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
                >
                  Company
                </label>
                <input
                  id="h-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full box-border px-3.5 py-3 min-h-[46px] border border-[var(--line2)] rounded-[11px] bg-[rgba(4,6,12,0.5)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] focus:border-[var(--cyan)] outline-none"
                />
              </div>

              <div className="grid gap-1.75">
                <label
                  htmlFor="h-phone"
                  className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
                >
                  Phone
                </label>
                <input
                  id="h-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full box-border px-3.5 py-3 min-h-[46px] border border-[var(--line2)] rounded-[11px] bg-[rgba(4,6,12,0.5)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] focus:border-[var(--cyan)] outline-none"
                />
              </div>

              <div className="grid gap-1.75 sm:col-span-2">
                <label
                  htmlFor="h-service"
                  className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
                >
                  Service *
                </label>
                <select
                  id="h-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.service)}
                  className={`w-full box-border px-3.5 py-3 min-h-[46px] border rounded-[11px] bg-[rgba(4,6,12,0.85)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] focus:border-[var(--cyan)] outline-none ${
                    errors.service ? "border-[#ffb4a8]" : "border-[var(--line2)]"
                  }`}
                >
                  <option value="">Select a service</option>
                  <option value="React development">React development</option>
                  <option value="Next.js development">Next.js development</option>
                  <option value="Python development">Python development</option>
                  <option value="AI development">AI development</option>
                  <option value="Full-stack development">Full-stack development</option>
                  <option value="Node.js development">Node.js development</option>
                  <option value="TypeScript development">TypeScript development</option>
                  <option value="AI automation">AI automation</option>
                  <option value="AI chatbot development">AI chatbot development</option>
                  <option value="Backend & API development">Backend & API development</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                {errors.service && (
                  <p role="alert" className="text-[12px] text-[#ffb4a8]">
                    {errors.service}
                  </p>
                )}
              </div>

              <div className="grid gap-1.75">
                <label
                  htmlFor="h-budget"
                  className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
                >
                  Budget
                </label>
                <select
                  id="h-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full box-border px-3.5 py-3 min-h-[46px] border border-[var(--line2)] rounded-[11px] bg-[rgba(4,6,12,0.85)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] focus:border-[var(--cyan)] outline-none"
                >
                  <option value="">Prefer to discuss</option>
                  <option value="Under ₹1L / under $1.5k">Under ₹1L / under $1.5k</option>
                  <option value="₹1–3L / $1.5k–4k">₹1–3L / $1.5k–4k</option>
                  <option value="₹3–8L / $4k–10k">₹3–8L / $4k–10k</option>
                  <option value="₹8L+ / $10k+">₹8L+ / $10k+</option>
                </select>
              </div>

              <div className="grid gap-1.75">
                <label
                  htmlFor="h-timeline"
                  className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
                >
                  Timeline
                </label>
                <select
                  id="h-timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full box-border px-3.5 py-3 min-h-[46px] border border-[var(--line2)] rounded-[11px] bg-[rgba(4,6,12,0.85)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] focus:border-[var(--cyan)] outline-none"
                >
                  <option value="">Not fixed</option>
                  <option value="ASAP">ASAP</option>
                  <option value="Within a month">Within a month</option>
                  <option value="1–3 months">1–3 months</option>
                  <option value="Exploring for later">Exploring for later</option>
                </select>
              </div>
            </div>

            <div className="grid gap-1.75">
              <label
                htmlFor="h-desc"
                className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[#9aa4bb]"
              >
                Project description *
              </label>
              <textarea
                id="h-desc"
                name="desc"
                rows={5}
                value={formData.desc}
                onChange={handleChange}
                placeholder="What are you building, who uses it, and what has to be true for it to be a success?"
                className={`w-full box-border p-3.5 border rounded-[11px] bg-[rgba(4,6,12,0.5)] text-[var(--ink)] font-['IBM_Plex_Sans'] text-[14.5px] leading-[1.6] resize-y focus:border-[var(--cyan)] outline-none ${
                  errors.desc ? "border-[#ffb4a8]" : "border-[var(--line2)]"
                }`}
              ></textarea>
              {errors.desc && (
                <p role="alert" className="text-[12px] text-[#ffb4a8]">
                  {errors.desc}
                </p>
              )}
            </div>

            <div className="grid gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.75 min-h-[50px] border-0 rounded-full font-['Space_Grotesk'] font-semibold text-[15.5px] text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] cursor-pointer hover:-translate-y-0.5 transition-all"
              >
                Send Project Brief →
              </button>

              <a
                href={generateWaText()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[50px] border border-[var(--line2)] rounded-full bg-[var(--glass)] font-['Space_Grotesk'] font-semibold text-[15px] text-[var(--ink)] hover:bg-[var(--glass2)] transition-all"
              >
                Continue on WhatsApp →
              </a>
            </div>

            {submitted && (
              <div
                role="status"
                className="p-4 border border-[rgba(34,211,238,0.35)] rounded-[var(--r)] bg-[rgba(34,211,238,0.09)] text-[13.5px] leading-[1.6] text-[#cfeff7] animate-in fade-in duration-200"
              >
                ✓ Brief validated successfully! Thank you for reaching out. Tripti will review your project details and respond within 24 hours.
              </div>
            )}
          </form>

          <div className="mt-6 pt-4.5 border-t border-[var(--line)] grid gap-1 text-[13.5px] text-[var(--dim)]">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--ink)]">
              {siteConfig.email}
            </a>
            <span>{siteConfig.phone} · Bengaluru, India (IST)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
