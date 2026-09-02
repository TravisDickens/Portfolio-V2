"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { ProjectStrip } from "@/components/project-strip";
import { ExperienceTabs } from "@/components/experience-tabs";
import { TypingHero } from "@/components/typing-hero";
import { HeroTree } from "@/components/hero-tree";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  about,
  contact,
  education,
  hero,
  projects,
  skills,
} from "@/lib/data";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:pt-24">
          <HeroSection />
          <AboutSection />
          <WorkSection />
          <ProjectsSection />
          <EducationSection />
          <SkillsSection />
          <ContactSection />
        </div>
        <footer className="border-t border-hairline py-8 text-center font-mono text-xs text-muted">
          Travis Dickens · South Africa
        </footer>
      </motion.main>
    </MotionConfig>
  );
}

function ContactLinks() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {contact.socials.map((social) => {
        const isExternal = social.href.startsWith("http");
        return (
          <Link
            key={social.label}
            href={social.href}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="link-underline text-muted"
          >
            {social.label}
          </Link>
        );
      })}
    </div>
  );
}

function HeroSection() {
  return (
    <Section className="border-b border-hairline pb-16 lg:pb-24">
      <div className="lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
        <div className="space-y-8">
          <TypingHero />
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {hero.name}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{hero.tagline}</p>
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">{hero.currentRole.company}</span>
            {" · "}
            {hero.currentRole.title}
            {" · "}
            {hero.currentRole.period}
          </p>
          <ContactLinks />
        </div>
        <div className="mt-12 hidden lg:mt-0 lg:block">
          <HeroTree />
        </div>
      </div>
    </Section>
  );
}

function AboutSection() {
  return (
    <Section id="about" className="border-b border-hairline py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
        <div className="space-y-6">
          <SectionHeader index="01" title={about.title} />
          {about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="space-y-6">
          {about.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function WorkSection() {
  return (
    <Section id="work" className="border-b border-hairline py-16 lg:py-24">
      <SectionHeader index="02" title="work" />
      <div className="mt-10">
        <ExperienceTabs />
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" className="border-b border-hairline py-16 lg:py-24">
      <SectionHeader index="03" title="projects" />
      <div className="mt-10">
        <ProjectStrip />
        <div className="mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function EducationSection() {
  return (
    <Section id="education" className="border-b border-hairline py-16 lg:py-24">
      <SectionHeader index="04" title="education" />
      <div className="mt-10 space-y-8">
        {education.map((entry) => (
          <article
            key={entry.institution}
            className="grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="font-mono text-sm text-muted">{entry.period}</p>
            <div>
              <h3 className="font-serif text-xl">{entry.institution}</h3>
              <p className="text-muted">{entry.qualification}</p>
              {entry.badge ? (
                <p className="mt-1 text-sm text-accent">{entry.badge}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function SkillsSection() {
  return (
    <Section id="skills" className="border-b border-hairline py-16 lg:py-24">
      <SectionHeader index="05" title="skills" />
      <div className="mt-10 space-y-6">
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-2 border-t border-hairline pt-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              {group.category}
            </p>
            <p className="text-sm leading-relaxed">{group.items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section id="contact" className="py-16 lg:py-24">
      <SectionHeader index="06" title="contact" />
      <div className="mt-10 border-t-2 border-accent bg-accent-soft p-8 sm:p-10">
        <p className="font-serif text-2xl tracking-tight sm:text-3xl">
          Open to junior software roles.
        </p>
        <div className="mt-6">
          <ContactLinks />
        </div>
      </div>
    </Section>
  );
}
