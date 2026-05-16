"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Droplet, ArrowRight, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CallNowDropdown } from "@/components/CallNowDropdown";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: "easeOut", delay },
});

const revealUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const revealScale = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  const projectImages = [
    { src: "/images/project_workers_site.jpg", alt: "Two workers in hard hats at commercial building site" },
    { src: "/images/project_valve.jpg", alt: "Technicians working on industrial valve" },
    { src: "/images/project_pipes.jpg", alt: "Worker inspecting industrial pipes and equipment" },
  ];

  return (
    <main className="min-h-screen">

      {/* ── Hero ── solid left panel + photo right, blended at seam */}
      <section className="relative flex min-h-[78vh] overflow-hidden bg-[#040e28]">

        {/* ── Left: solid dark panel ── */}
        <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2 shrink-0 py-28 px-8 md:px-12 lg:px-16 bg-[#040e28]">
          <div className="max-w-md lg:max-w-xl">

            <motion.span
              {...fadeUp(0)}
              className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-10 backdrop-blur-sm"
            >
              {h.heroBadge}
            </motion.span>

            <motion.h1
              {...fadeUp(0.15)}
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight mb-8 leading-[1.15]"
            >
              {h.heroLine1}{" "}
              <span className="text-gradient-blue">{h.heroWord1}</span>
              <br />
              <span className="text-gradient-orange">{h.heroWord2}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-lg md:text-xl text-white/70 mb-12 leading-[1.75]"
            >
              {h.heroDesc}
            </motion.p>

            <motion.div
              {...fadeUp(0.45)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/estimate"
                className="bg-accent hover:bg-accent/90 text-white px-7 py-3.5 rounded-lg font-bold text-base transition-all shadow-[0_0_24px_rgba(227,90,26,0.4)] hover:shadow-[0_0_38px_rgba(227,90,26,0.6)] flex items-center justify-center gap-2"
                data-testid="hero-estimate-btn"
              >
                {h.ctaEstimate}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <CallNowDropdown label={h.ctaCall} testId="hero-call-btn" />
            </motion.div>

          </div>
        </div>

        {/* ── Right: photo panel ── */}
        <div className="hidden lg:block relative flex-1 overflow-hidden">
          <Image
            src="/images/hero_crew.png"
            alt="J&O Pro Bros Construction plumber at work"
            fill
            priority
            className="object-cover object-left"
            sizes="55vw"
          />
          {/* Seam fade: blends left edge of photo into the solid navy panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040e28] via-[rgba(4,14,40,0.18)] to-transparent" />
          {/* Subtle top/bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,14,40,0.35)] via-transparent to-[rgba(4,14,40,0.3)]" />
        </div>

        {/* Mobile: faint full-bleed photo behind text */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/images/hero_crew.png"
            alt="J&O Pro Bros Construction plumber at work"
            fill
            priority
            className="object-cover object-right"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(4,14,40,0.82)]" />
        </div>

      </section>

      {/* ── Services Overview ── */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">

          <motion.div {...revealUp(0)} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 text-accent text-base font-bold px-5 py-2 rounded-full mb-5 shadow-[0_0_20px_rgba(227,90,26,0.2)]">
              <Star className="w-4 h-4 fill-accent" />
              {h.trustExperience}
            </span>
            <h2 className="text-4xl font-bold mb-4">{h.expertiseTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{h.expertiseDesc}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Commercial */}
            <div className="space-y-8">
              <motion.div {...revealUp(0)} className="flex items-center gap-4 border-b pb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{h.commercialServices}</h3>
              </motion.div>
              <div className="grid gap-6">
                {h.commItems.map((item, i) => (
                  <motion.div
                    key={i}
                    {...revealUp(i * 0.08)}
                    className="glass p-6 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm ml-3.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Residential */}
            <div className="space-y-8">
              <motion.div {...revealUp(0.05)} className="flex items-center gap-4 border-b pb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Droplet className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{h.residentialServices}</h3>
              </motion.div>
              <div className="grid gap-6">
                {h.resItems.map((item, i) => (
                  <motion.div
                    key={i}
                    {...revealUp(i * 0.08)}
                    className="glass p-6 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm ml-3.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div {...revealUp(0.1)} className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {h.viewAllServices} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Van / Fleet ── */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-4 md:px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <motion.p {...revealUp(0)} className="text-accent font-semibold uppercase tracking-widest text-sm mb-3">
              On The Road Daily
            </motion.p>
            <motion.h2 {...revealUp(0.1)} className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Professional. Local. Ready.
            </motion.h2>
          </div>

          {/* Service area cards */}
          <motion.div {...revealUp(0.18)} className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            {/* Residential */}
            <div className="border border-white/10 rounded-2xl px-6 py-5">
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Residential</p>
              <p className="text-white font-semibold text-base">Gwinnett Area &amp; Atlanta, GA</p>
              <p className="text-white/50 text-sm mt-1">Local crews — fast response, every time.</p>
            </div>
            {/* Commercial */}
            <div className="border border-white/10 rounded-2xl px-6 py-5">
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Large-Scale Commercial</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Georgia", "Texas", "Arizona", "Ohio"].map((state) => (
                  <span key={state} className="text-xs font-semibold bg-white/8 border border-white/15 text-white/80 px-3 py-1 rounded-full">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Van photo */}
          <motion.div {...revealScale(0.25)} className="rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <Image
              src="/images/van.png"
              alt="J&O Pro Bros Construction service van"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Recent Projects ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...revealUp(0)} className="mb-12">
            <h2 className="text-4xl font-bold mb-4">{h.recentProjects}</h2>
            <p className="text-muted-foreground max-w-xl">{h.recentProjectsDesc}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {h.projects.map((project, i) => (
              <motion.div
                key={i}
                {...revealScale(i * 0.12)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={projectImages[i].src}
                  alt={projectImages[i].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-block py-1 px-3 rounded-md bg-accent text-white text-xs font-bold mb-3 w-max">
                    {project.type}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-white/75 text-sm">{project.scale}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="py-14 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 {...revealUp(0)} className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            {h.trustedBy}
          </motion.h2>
          <motion.div {...revealUp(0.15)} className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <Image
              src="/images/samsung_logo.avif"
              alt="Samsung"
              width={500}
              height={160}
              className="h-40 w-auto opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...revealScale(0)} className="glass-dark rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 z-0" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.h2 {...revealUp(0.05)} className="text-4xl md:text-5xl font-bold text-white mb-6">
                {h.ctaTitle}
              </motion.h2>
              <motion.p {...revealUp(0.15)} className="text-xl text-white/70 mb-10">
                {h.ctaDesc}
              </motion.p>
              <motion.div {...revealUp(0.25)} className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/estimate"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  {h.ctaEstimateBtn}
                </Link>
                <CallNowDropdown label={h.ctaCall} testId="footer-call-btn" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
