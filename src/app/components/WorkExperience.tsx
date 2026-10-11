"use client";

import { FaBriefcase } from "react-icons/fa";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export interface WorkRole {
  title: string;
  company?: string;
  location?: string;
  period: string;
  /** Introductory paragraph shown before the bullet points. */
  description?: string;
  /** Bullet points; omit or leave empty to hide the list. */
  highlights?: string[];
  /**
   * Image path under `/public`, e.g. `/work-logos/attentive.png`.
   * When set, this is shown instead of the briefcase (or `icon`).
   */
  logoSrc?: string;
  /** Accessible label for the logo; defaults to “{company} logo”. */
  logoAlt?: string;
  /** Shown when `logoSrc` is not set. Defaults to a briefcase icon. */
  icon?: ReactNode;
}

const defaultIcon = <FaBriefcase className="text-3xl" />;

function RoleEmblem({ role }: { role: WorkRole }) {
  if (role.logoSrc) {
    return (
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 transition-[transform,box-shadow] duration-300 ease-out group-hover:ring-white/25 group-hover:shadow-md">
        <Image
          src={role.logoSrc}
          alt={role.logoAlt ?? `${role.company ?? role.title} logo`}
          fill
          sizes="56px"
          className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="shrink-0 text-white/50 transition-all duration-300 ease-out group-hover:text-white/70 group-hover:scale-105">
      {role.icon ?? defaultIcon}
    </div>
  );
}

const workRoles: WorkRole[] = [
  {
    title: "Independent AI Consultant",
    period: "Sep 2026 – Present",
    description:
      "Leading an AI transformation engagement for a UK-based restaurant chain, scoping a central LLM-powered data layer with agentic workflows across the client's operations, alongside a data migration and business intelligence initiative.",
    highlights: [
      "Building a fully on-premise, secure role-based backend",
      "Automating receipt/invoice digitization via OCR and kitchen-usage invoicing",
      "Implementing IoT-based temperature monitoring with real-time alerting across freezers and fridges",
      "Scoping a replacement for the client's online ordering system",
    ],
  },
  {
    title: "Support Engineer & AI Automation",
    company: "Attentive",
    location: "United States (Remote)",
    period: "Oct 2025 – Present",
    highlights: [
      "Resolved 1,000+ support tickets across L1–L3 tiers for 700+ enterprise accounts (up to $80K+ tier), with a median resolution time under 24 hours on high-priority issues. L3 work involved resolving niche revenue attribution and event tracking bugs, and reverse-engineering site DOM structure and window objects to build custom event tracking for platforms with no native SDK support.",
      "Designed and built an end-to-end diagnostic workflow (LangGraph, Playwright, FastAPI, Pub/Sub) that scraped and aggregated signals across clients’ sites, Zendesk, DataDog, and Looker without API access, cutting triage time ~20%.",
    ],
    logoSrc: "/work-logos/attentive.png",
  },
  {
    title: "AI Education Lead",
    company: "RBCs Team (NGO)",
    location: "Damascus, Syria",
    period: "Nov 2023 – Sep 2025",
    highlights: [
      "Led curriculum development for NGO's first NLP course, mentoring and training 100+ CS students on foundational NLP topics from statistical language models to transformers, embeddings, and sequence modeling",
    ],
    logoSrc: "/work-logos/rbcs.jpg",
  },
  {
    title: "Data Science Trainee",
    company: "SHAI for AI",
    location: "Jordan (Remote)",
    period: "Mar 2024 – Aug 2024",
    highlights: [
      "Built pricing prediction models and an automated music genre classifier; developed Power BI dashboards over an Olympics dataset.",
    ],
    logoSrc: "/work-logos/shai.jpeg",
  },
  {
    title: "Technical Support & Operations Manager",
    company: "Nakkash Tech Store",
    location: "Lebanon",
    period: "Jul 2017 – Nov 2019",
    highlights: [
      "Managed technical troubleshooting for mobile devices and led store operations, maintaining high performance during peak business hours.",
    ],
  },
];

const WorkExperience = () => {
  return (
    <section id="work-experience" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          Work Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {workRoles.map((role, index) => (
            <motion.div
              key={`${role.company}-${role.title}-${index}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="group relative overflow-hidden rounded-lg border border-white/20 bg-white/[0.04] p-6 sm:p-8 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.55)]"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  el.style.setProperty(
                    "--mx",
                    `${((e.clientX - r.left) / r.width) * 100}%`
                  );
                  el.style.setProperty(
                    "--my",
                    `${((e.clientY - r.top) / r.height) * 100}%`
                  );
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--mx,50%) var(--my,0%), rgba(255,255,255,0.07), transparent 45%)",
                  }}
                />
                <div className="relative">
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <RoleEmblem role={role} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-white">
                          {role.title}
                        </h3>
                        {role.company ? (
                          <p className="font-medium text-white/90">{role.company}</p>
                        ) : null}
                        {role.location ? (
                          <p className="mt-0.5 text-sm text-white/70">
                            {role.location}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <p className="text-sm text-white/60 sm:shrink-0 sm:text-right">
                      {role.period}
                    </p>
                  </div>
                  {role.description ? (
                    <p className="mb-4 text-white/80 leading-relaxed sm:pl-8">
                      {role.description}
                    </p>
                  ) : null}
                  {role.highlights && role.highlights.length > 0 ? (
                    <ul className="list-outside list-disc space-y-2 pl-6 text-white/80 leading-relaxed marker:text-white/45 sm:pl-14">
                      {role.highlights.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: 0.12 + i * 0.05,
                            ease: "easeOut",
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
