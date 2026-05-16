"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DollarSign, FileSignature, CalendarCheck, Info, X, Clock, Calendar, ListChecks, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jobs, type Job } from "@/lib/jobs";
import { useRouter } from "next/navigation";

export default function CareersPage() {
  const { t } = useLanguage();
  const c = t.careers;
  const router = useRouter();

  const [modalJob, setModalJob] = useState<Job | null>(null);
  const activeJobs = jobs.filter((j) => j.active);

  const handleApplyClick = (title: string) => {
    setModalJob(null);
    router.push(`/careers/apply?role=${encodeURIComponent(title)}`);
  };

  const perks = [
    { Icon: DollarSign, title: c.benefit1Title },
    { Icon: FileSignature, title: c.benefit2Title },
    { Icon: CalendarCheck, title: c.benefit3Title },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">

      {/* Job Detail Modal */}
      <AnimatePresence>
        {modalJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              <div className="sticky top-0 bg-card border-b border-border px-8 py-5 flex items-start justify-between gap-4 rounded-t-3xl z-10">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{modalJob.title}</h2>
                  <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded-md border border-accent/20 mt-1 inline-block">
                    {c.contractorBadge}
                  </span>
                </div>
                <button
                  onClick={() => setModalJob(null)}
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-8 py-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed">{modalJob.desc}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <DollarSign className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pay</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.pay}</p>
                    </div>
                  </div>
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Hours</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.hours}</p>
                    </div>
                  </div>
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Schedule</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.schedule}</p>
                    </div>
                  </div>
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <Briefcase className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Experience</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.experience}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Requirements</h3>
                  </div>
                  <ul className="space-y-2">
                    {modalJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{c.agreementNote}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border px-8 py-5 rounded-b-3xl">
                <button
                  onClick={() => handleApplyClick(modalJob.title)}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 rounded-xl transition-colors text-base shadow-md"
                >
                  {c.applyNow}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/30 via-foreground to-foreground z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.heroTitle}</h1>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">{c.whyTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{c.whyDesc}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {perks.map((perk, i) => (
            <div key={i} className="glass-dark p-6 rounded-2xl text-center flex flex-col items-center border border-white/10">
              <div className="w-14 h-14 bg-accent/15 text-accent rounded-full flex items-center justify-center mb-4">
                <perk.Icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-primary-foreground">{perk.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section className="container mx-auto px-4 md:px-6 mb-24 text-center">
        <h2 className="text-3xl font-bold mb-8 text-foreground">{c.openPositions}</h2>
        {activeJobs.length === 0 ? (
          <div className="glass p-10 rounded-2xl text-center text-muted-foreground border border-border/50 max-w-2xl mx-auto">
            {c.noPositions}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="border border-border/50 rounded-2xl p-6 bg-card hover:shadow-md transition-shadow flex flex-col gap-4 text-left"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                    <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded-md border border-accent/20">
                      {c.contractorBadge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{job.desc}</p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => setModalJob(job)}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    View More
                  </button>
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="bg-accent hover:bg-accent/90 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shadow-sm"
                    data-testid={`apply-btn-${job.id}`}
                  >
                    {c.applyNow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
