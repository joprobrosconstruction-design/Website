"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiSamsung } from "react-icons/si";
import { Building2, Droplet, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-foreground to-foreground z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg==')] z-0"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium mb-6">
                {h.heroBadge}
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-primary-foreground tracking-tight mb-6 leading-tight">
                {h.heroLine1} <span className="text-gradient-blue">{h.heroWord1}</span>
                <br />
                {h.heroLine2} <span className="text-gradient-orange">{h.heroWord2}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted/80 mb-10 max-w-2xl leading-relaxed">
                {h.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/estimate"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-[0_0_20px_rgba(227,90,26,0.3)] hover:shadow-[0_0_30px_rgba(227,90,26,0.5)] flex items-center justify-center gap-2"
                  data-testid="hero-estimate-btn"
                >
                  {h.ctaEstimate}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/careers"
                  className="glass-dark hover:bg-white/10 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
                  data-testid="hero-careers-btn"
                >
                  {h.ctaCareers}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-12 z-20 container mx-auto px-4 md:px-6">
        <div className="glass-dark rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {[
            { label: h.stat1, value: "500+" },
            { label: h.stat2, value: "25+" },
            { label: h.stat3, value: "100%" },
            { label: h.stat4, value: "24/7" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-3xl md:text-5xl font-black text-accent mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-primary-foreground/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Clients Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-12">
            {h.trustedBy}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <SiSamsung className="w-40 h-20 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{h.expertiseTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{h.expertiseDesc}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Commercial */}
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
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm ml-3.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Residential */}
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
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
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

      {/* Recent Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">{h.recentProjects}</h2>
            <p className="text-muted-foreground max-w-xl">{h.recentProjectsDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {h.projects.map((project, i) => {
              const bgs = [
                "bg-gradient-to-br from-slate-800 to-slate-900",
                "bg-gradient-to-br from-blue-900 to-slate-900",
                "bg-gradient-to-br from-slate-900 to-gray-800",
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
                >
                  <div className={`absolute inset-0 ${bgs[i]} opacity-90 transition-transform duration-500 group-hover:scale-105`}></div>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="inline-block py-1 px-3 rounded-md bg-accent text-accent-foreground text-xs font-bold mb-3 w-max">
                      {project.type}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.scale}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-dark rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 z-0"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                {h.ctaTitle}
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-10">{h.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/estimate"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  {h.ctaEstimateBtn}
                </Link>
                <Link
                  href="/careers"
                  className="bg-white/10 hover:bg-white/20 text-primary-foreground border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  {h.ctaCareersBtn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
