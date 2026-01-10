"use client";

import { motion, MotionConfig } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Github,
  Linkedin,
  Mail,
  Palette,
  Send,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { about, blog, experience, hero, projects, skills } from "@/lib/data";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
         
        </div>
      </motion.main>
    </MotionConfig>
  );
}

function HeroSection() {
  return (
    <Section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/90 p-8 sm:p-12 shadow-[0_30px_120px_-50px_rgba(0,0,0,0.2)] dark:border-white/10 dark:bg-white/2 dark:shadow-[0_30px_120px_-50px_rgba(0,0,0,0.8)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(125,211,252,0.16),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(196,181,253,0.12),transparent_30%),radial-gradient(circle_at_50%_120%,rgba(248,180,0,0.12),transparent_30%)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          variants={fadeIn}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-200 shadow-inner shadow-cyan-200/10">
            <Sparkles className="h-4 w-4" />
            <span>{hero.location}</span>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              {hero.role}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              {hero.name}
            </h1>
            <p className="text-xl leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-2xl">
              {hero.tagline}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="#contact" className="inline-flex items-center gap-2">
                <Send className="h-4 w-4" />
                Contact
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="mailto:Travis.Dickens@outlook.com" className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Link>
            </Button>

          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <HighlightCard
              icon={<Palette className="h-4 w-4" />}
              title="AI/ML and data"
              copy="Exploring machine learning and data pipelines that turn signals into actionable insights."
            />
            <HighlightCard
              icon={<Braces className="h-4 w-4" />}
              title="Full-stack delivery"
              copy="Building reliable backends and usable UIs with Java, .NET, and React, shipping end-to-end features safely."
            />

          </div>
        </motion.div>
        <motion.div
          variants={fadeIn}
          className="relative mx-auto h-64 w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/10 via-white/5 to-white/0 p-6 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.8)] lg:mx-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(120px_circle_at_30%_30%,rgba(52,211,153,0.45),transparent_45%),radial-gradient(180px_circle_at_80%_0%,rgba(14,165,233,0.32),transparent_40%)] opacity-80" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-100">Now</p>
              <p className="text-2xl font-semibold text-white">Building AI/ML models and full-stack software.</p>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-200 shadow-inner shadow-white/5">
              <div>
                <p className="font-semibold text-white">Forvis Mazars</p>
                <p className="text-zinc-400">AI/ML Intern</p>
              </div>

              <Link
                href="https://www.forvismazars.com/group/en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Forvis Mazars website"
              >
                <ArrowUpRight className="h-5 w-5 text-cyan-200 hover:text-cyan-300 transition-colors" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function AboutSection() {
  return (
    <Section id="about" className="mt-20">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <SectionHeader
          kicker="About"
          title={about.title}
          description={about.body[0]}
        />
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_20px_90px_-50px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-white/3 dark:shadow-[0_20px_90px_-50px_rgba(0,0,0,0.6)]">
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{about.body[1]}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {about.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-slate-800 shadow-inner shadow-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:shadow-white/5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" className="mt-24 space-y-8">
      <SectionHeader
        kicker="Projects"
        title="Projects focused on AI, backend, and real-world software impact."
        description="Selected work built for real-world usage."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience" className="mt-24 space-y-8">
      <SectionHeader
        kicker="Experience"
        title="Where I'm growing."
        description="Helping teams achieve goals through practical solutions."
      />
      <div className="space-y-4">
        {experience.map((role) => (
          <motion.article
            key={role.company}
            variants={fadeIn}
            className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_20px_80px_-60px_rgba(0,0,0,0.2)] dark:border-white/10 dark:bg-white/3 dark:shadow-[0_20px_80px_-60px_rgba(0,0,0,0.65)]"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{role.role}</h3>
                <p className="text-zinc-700 dark:text-zinc-300">{role.company}</p>
              </div>
              <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                {role.period}
              </span>
            </div>
            <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{role.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {role.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function SkillsSection() {
  return (
    <Section id="skills" className="mt-24 space-y-8">
      <SectionHeader
        kicker="Skills"
        title="What I bring to the table."
        description="A balance of design, reliable engineering, and collaborative delivery."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <motion.div
            key={group.category}
            variants={fadeIn}
            className="rounded-2xl border border-black/10 bg-white/80 p-4 shadow-[0_20px_70px_-55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/3 dark:shadow-[0_20px_70px_-55px_rgba(0,0,0,0.65)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
              {group.category}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section id="contact" className="mt-24">
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 p-8 sm:p-10 shadow-[0_30px_120px_-70px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-white/3 dark:shadow-[0_30px_120px_-70px_rgba(0,0,0,0.75)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Contact
            </p>
            <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">Let&apos;s build something great.</h3>
            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              I’m open to junior software engineering roles across AI/ML, backend, and full-stack development.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="mailto:Travis.Dickens@outlook.com" className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email me
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="https://www.linkedin.com/in/travis-dickens-010a84250" className="inline-flex items-center gap-2" target="_blank">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="https://github.com/TravisDickens" className="inline-flex items-center gap-2" target="_blank">
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 text-sm text-zinc-700 shadow-inner shadow-black/5 dark:border-white/10 dark:bg-black/40 dark:text-zinc-300 dark:shadow-white/5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>Based in South Africa</span>
            </div>
            <p className="mt-3 leading-relaxed">
              I respond within 48 hours. Include a short note about your team, tech stack, and what success looks like.
            </p>
           
          </div>
        </div>
      </div>
    </Section>
  );
}
/*
function BlogSection() {
  return (
    <Section id="blog" className="mt-20">
      <div className="rounded-2xl border border-black/10 bg-white/80 p-8 text-center shadow-[0_20px_90px_-60px_rgba(0,0,0,0.2)] dark:border-white/10 dark:bg-white/2 dark:shadow-[0_20px_90px_-60px_rgba(0,0,0,0.7)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Writing</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{blog.headline}</h3>
        <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{blog.note}</p>
        <Button asChild className="mt-5 inline-flex items-center gap-2">
          <Link href="mailto:Travis.Dickens@outlook.com?subject=Newsletter">
            Get notified
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
*/
function HighlightCard({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/70 p-4 text-sm text-zinc-700 shadow-inner shadow-black/5 dark:border-white/10 dark:bg-black/40 dark:text-zinc-200 dark:shadow-white/5">
      <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-200">
        {icon}
        <span className="text-xs uppercase tracking-[0.14em]">Focus</span>
      </div>
      <p className="text-base font-semibold text-slate-900 dark:text-white">{title}</p>
      <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{copy}</p>
    </div>
  );
}
