"use client";

import { FaBriefcase } from "react-icons/fa";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export interface WorkRole {
  title: string;
  company: string;
  location?: string;
  period: string;
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
          alt={role.logoAlt ?? `${role.company} logo`}
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
    title: "Data Integrity Analyst",
    company: "Attentive",
    location: "United States (Remote)",
    period: "Oct 2025 – Present",
    highlights: [
      "Automated end-to-end investigation workflows with LangGraph and Playwright.",
      "Implemented and validated TypeScript event tracking across major US and international retail sites (e.g. Wayfair, Samsung).",
      "Debugged client-side tracking, e-commerce integrations, and signup unit / banner behavior.",
      "Aligned with client stakeholders to clarify requirements and close integration gaps.",
    ],
    logoSrc: "/work-logos/attentive.png",
  },
  {
    title: "Data Science Trainee",
    company: "SHAI for AI",
    location: "Jordan (Remote)",
    period: "Mar 2024 – Aug 2024",
    highlights: [
      "Collaborated on two machine learning projects: Diamond Pricing Prediction and Music Genre Classification.",
      "Worked on multiple BI tasks including Power BI, Pandas, NumPy, and Seaborn.",
    ],
    logoSrc: "/work-logos/shai.jpeg",
  },
  {
    title: "Technical Support & Operations Manager",
    company: "Nakkash Tech Store",
    location: "Lebanon · During High School",
    period: "Jul 2017 – Nov 2019",
    // logoSrc: "/work-logos/nakkash.png",
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
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#0a1f1a]/50 p-6 sm:p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-[#0a1f1a]/70 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.55)]"
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
                        <p className="font-medium text-white/90">{role.company}</p>
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
