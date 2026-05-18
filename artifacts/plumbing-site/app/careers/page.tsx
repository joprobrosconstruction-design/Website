"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DollarSign, FileSignature, CalendarCheck, Info, X,
  Clock, Calendar, ListChecks, Briefcase, Languages,
  ChevronDown, ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jobs, type Job } from "@/lib/jobs";
import { useRouter } from "next/navigation";

function playOpenSound() {
  try {
    const ctx = new AudioContext();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0.10, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.28);
    setTimeout(() => ctx.close(), 500);
  } catch {
    // AudioContext unavailable — fail silently
  }
}

export default function CareersPage() {
  const { t } = useLanguage();
  const c = t.careers;
  const router = useRouter();

  const [modalJob, setModalJob] = useState<Job | null>(null);
  const [modalEs, setModalEs]   = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeJobs = jobs.filter((j) => j.active);

  const openModal = (job: Job) => {
    setModalJob(job);
    setModalEs(false);
    if (job.es) {
      if (hintTimer.current) clearTimeout(hintTimer.current);
      // Delay 3.5s, then play sound + show hint for 4s
      hintTimer.current = setTimeout(() => {
        playOpenSound();
        setShowHint(true);
        hintTimer.current = setTimeout(() => setShowHint(false), 4000);
      }, 3500);
    }
  };

  useEffect(() => () => { if (hintTimer.current) clearTimeout(hintTimer.current); }, []);

  const handleApplyClick = (title: string) => {
    setModalJob(null);
    router.push(`/careers/apply?role=${encodeURIComponent(title)}`);
  };

  const perks = [
    { Icon: DollarSign,    title: c.benefit1Title, desc: c.benefit1Desc },
    { Icon: FileSignature, title: c.benefit2Title, desc: c.benefit2Desc },
    { Icon: CalendarCheck, title: c.benefit3Title, desc: c.benefit3Desc },
  ];

  const jobText = (job: Job) => (modalEs && job.es ? job.es : null);

  return (
    <main className="min-h-screen bg-background pt-24 pb-32">

      {/* ── Job Detail Modal ── */}
      <AnimatePresence>
        {modalJob && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalJob(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative bg-card border border-border rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border px-5 py-4 sm:px-8 sm:py-5 flex items-start justify-between gap-4 rounded-t-3xl z-10">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {(modalEs && modalJob.es?.title) ? modalJob.es.title : modalJob.title}
                  </h2>
                  <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded-md border border-accent/20 mt-2 inline-block">
                    {c.contractorBadge}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {modalJob.es && (
                    <div className="relative">
                      <button
                        onClick={() => { setModalEs((v) => !v); setShowHint(false); }}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
                          modalEs
                            ? "bg-primary text-white border-primary"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        <Languages className="w-4 h-4 shrink-0" />
                        {modalEs ? "View in English" : "Ver en Español"}
                      </button>

                      {/* Translate hint tooltip */}
                      <AnimatePresence>
                        {showHint && !modalEs && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.96 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 pointer-events-none"
                          >
                            {/* Arrow */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#040e28] rounded-sm" />
                            <div className="bg-[#040e28] text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg border border-white/10">
                              Available in Spanish
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                  <button
                    onClick={() => setModalJob(null)}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-5 py-5 sm:px-8 sm:py-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {jobText(modalJob)?.desc ?? modalJob.desc}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { Icon: DollarSign, label: modalEs ? "Pago" : "Pay",             val: jobText(modalJob)?.pay        ?? modalJob.pay },
                    { Icon: Clock,      label: modalEs ? "Horas" : "Hours",           val: jobText(modalJob)?.hours      ?? modalJob.hours },
                    { Icon: Calendar,   label: modalEs ? "Horario" : "Schedule",      val: jobText(modalJob)?.schedule   ?? modalJob.schedule },
                    { Icon: Briefcase,  label: modalEs ? "Experiencia" : "Experience",val: jobText(modalJob)?.experience ?? modalJob.experience },
                  ].map(({ Icon, label, val }) => (
                    <div key={label} className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                      <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
                        <p className="text-sm font-medium text-foreground">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-foreground">{modalEs ? "Requisitos" : "Requirements"}</h3>
                  </div>
                  <ul className="space-y-2">
                    {(jobText(modalJob)?.requirements ?? modalJob.requirements).map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border px-5 py-4 sm:px-8 sm:py-5 rounded-b-3xl">
                <button
                  onClick={() => handleApplyClick(modalJob.title)}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 rounded-xl transition-colors text-base shadow-md"
                >
                  {c.applyNow} — {(modalEs && modalJob.es?.title) ? modalJob.es.title : modalJob.title}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="relative bg-foreground text-primary-foreground py-24 overflow-hidden mb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/30 via-foreground to-foreground z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent/80 border border-accent/30 px-3 py-1 rounded-full mb-6">
            {c.contractorBadge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{c.heroTitle}</h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {c.heroDesc}
          </p>
          <a
            href="#open-roles"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md text-base"
          >
            {c.openPositions}
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="container mx-auto px-4 md:px-6 mb-24 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground">{c.whyTitle}</h2>
          <p className="text-muted-foreground mt-2">{c.whyDesc}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl flex gap-4 border border-white/10 overflow-hidden"
              style={{ background: "rgba(4,14,40,0.92)" }}
            >
              <div className="absolute top-0 left-0 w-24 h-16 bg-accent/10 blur-2xl rounded-full pointer-events-none" />
              <div className="relative w-11 h-11 bg-accent/20 text-accent rounded-xl flex items-center justify-center shrink-0 border border-accent/25">
                <perk.Icon className="w-5 h-5" />
              </div>
              <div className="relative">
                <h3 className="font-bold text-white text-sm mb-1">{perk.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{c.openPositions}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {activeJobs.length} {activeJobs.length === 1 ? "position" : "positions"} available
            </p>
          </div>
        </div>

        {activeJobs.length === 0 ? (
          <div className="glass p-10 rounded-2xl text-center text-muted-foreground border border-border/50">
            {c.noPositions}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {activeJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative border border-border/60 rounded-2xl bg-card overflow-hidden flex flex-col hover:border-accent/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="h-1 w-full bg-gradient-to-r from-primary to-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-foreground leading-tight">{job.title}</h3>
                    <span className="text-xs font-semibold bg-accent/10 text-accent px-2.5 py-1 rounded-lg border border-accent/20 shrink-0 whitespace-nowrap">
                      {c.contractorBadge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{job.desc}</p>
                  <div className="grid grid-cols-1 gap-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-medium text-foreground/80">{job.pay}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span>{job.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-accent shrink-0" />
                      <span>{job.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4 text-accent shrink-0" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      onClick={() => handleApplyClick(job.title)}
                      className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {c.applyNow}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal(job)}
                      className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                      Full Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
