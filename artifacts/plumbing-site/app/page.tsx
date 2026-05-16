"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Droplet, ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CallNowDropdown } from "@/components/CallNowDropdown";

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  const projectImages = [
    {
      src: "/images/project_workers_site.jpg",
      alt: "Two workers in hard hats at commercial building site",
    },
    {
      src: "/images/project_valve.jpg",
      alt: "Technicians working on industrial valve",
    },
    {
      src: "/images/project_pipes.jpg",
      alt: "Worker inspecting industrial pipes and equipment",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section — split layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/25 via-foreground to-foreground z-0" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium mb-6">
                {h.heroBadge}
              </span>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight mb-5 leading-[1.05]">
                {h.heroLine1}{" "}
                <span className="text-gradient-blue">{h.heroWord1}</span>
                <br />
                <span className="text-gradient-orange">{h.heroWord2}</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
                {h.heroDesc}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/estimate"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_24px_rgba(227,90,26,0.35)] hover:shadow-[0_0_36px_rgba(227,90,26,0.5)] flex items-center justify-center gap-2"
                  data-testid="hero-estimate-btn"
                >
                  {h.ctaEstimate}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <CallNowDropdown
                  label={h.ctaCall}
                  testId="hero-call-btn"
                />
              </div>

            </motion.div>

            {/* Right — logo + company name */}
            <motion.div
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:flex flex-col items-center justify-center gap-8"
            >
              <Image
                src="/images/logo.png"
                alt="J&O Pro Bros Construction logo"
                width={480}
                height={480}
                className="w-[420px] h-[420px] object-contain drop-shadow-[0_0_80px_rgba(30,100,220,0.4)]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 text-accent text-base font-bold px-5 py-2 rounded-full mb-5 shadow-[0_0_20px_rgba(227,90,26,0.2)]">
              <Star className="w-4 h-4 fill-accent" />
              {h.trustExperience}
            </span>
            <h2 className="text-4xl font-bold mb-4">{h.expertiseTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{h.expertiseDesc}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{h.commercialServices}</h3>
              </div>
              <div className="grid gap-6">
                {h.commItems.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
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

            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Droplet className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{h.residentialServices}</h3>
              </div>
              <div className="grid gap-6">
                {h.resItems.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
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

          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {h.viewAllServices} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Van / Fleet Section */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-3">On The Road Daily</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Professional. Local. Ready.
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            From Atlanta to your doorstep — our crews show up on time and get the job done right.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <Image
              src="/images/van.png"
              alt="J&O Pro Bros Construction service van"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">{h.recentProjects}</h2>
            <p className="text-muted-foreground max-w-xl">{h.recentProjectsDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {h.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
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

      {/* Corporate Clients Section */}
      <section className="py-14 bg-background border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            {h.trustedBy}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <Image
              src="/images/samsung_logo.avif"
              alt="Samsung"
              width={400}
              height={120}
              className="h-28 w-auto opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-dark rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 z-0" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{h.ctaTitle}</h2>
              <p className="text-xl text-white/70 mb-10">{h.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/estimate"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  {h.ctaEstimateBtn}
                </Link>
                <CallNowDropdown
                  label={h.ctaCall}
                  testId="footer-call-btn"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
