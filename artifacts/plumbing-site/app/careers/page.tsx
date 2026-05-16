"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, FileSignature, CalendarCheck, Upload, FileText, CheckCircle2, AlertCircle, Info, X, Clock, Calendar, ListChecks, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jobs, type Job } from "@/lib/jobs";

export default function CareersPage() {
  const { t } = useLanguage();
  const c = t.careers;

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [resumeName, setResumeName] = useState("");
  const [idName, setIdName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [modalJob, setModalJob] = useState<Job | null>(null);

  const activeJobs = jobs.filter((j) => j.active);

  const handleApplyClick = (title: string) => {
    setModalJob(null);
    setSelectedRole(title);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const formData = new FormData(ev.currentTarget);
    try {
      const response = await fetch("/api/careers", { method: "POST", body: formData });
      const result = await response.json();
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit application. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage(c.networkError);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground";
  const selectCls = `${inputCls} appearance-none`;

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
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{modalJob.desc}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Pay */}
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <DollarSign className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pay</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.pay}</p>
                    </div>
                  </div>
                  {/* Hours */}
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Hours</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.hours}</p>
                    </div>
                  </div>
                  {/* Schedule */}
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Schedule</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.schedule}</p>
                    </div>
                  </div>
                  {/* Experience */}
                  <div className="bg-muted/40 rounded-2xl p-4 flex gap-3">
                    <Briefcase className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Experience</p>
                      <p className="text-sm font-medium text-foreground">{modalJob.experience}</p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
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

                {/* Contractor Agreement Note */}
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
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="border border-border/50 rounded-2xl p-6 bg-card hover:shadow-md transition-shadow flex flex-col gap-4 text-left"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                    <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded-md border border-accent/20">
                      {c.contractorBadge}
                    </span>
                  </div>
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

      {/* Application Form */}
      <section className="container mx-auto px-4 md:px-6 max-w-3xl" ref={formRef}>
        <div className="glass p-8 md:p-12 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <h2 className="text-3xl font-bold mb-2 text-foreground relative z-10">{c.formTitle}</h2>

          <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-8 relative z-10">
            <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">{c.agreementNote}</p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 relative z-10"
            >
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">{c.successTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">{c.successDesc}</p>
              <button
                onClick={() => { setStatus("idle"); setSelectedRole(""); setResumeName(""); setIdName(""); }}
                className="text-primary font-semibold hover:underline"
              >
                {c.submitAnother}
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
              encType="multipart/form-data"
            >
              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 border border-red-200">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="name">
                    {c.labelName} {c.required}
                  </label>
                  <input type="text" id="name" name="name" required className={inputCls} placeholder={c.placeholderName} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="email">
                    {c.labelEmail} {c.required}
                  </label>
                  <input type="email" id="email" name="email" required className={inputCls} placeholder={c.placeholderEmail} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="phone">
                    {c.labelPhone} {c.required}
                  </label>
                  <input type="tel" id="phone" name="phone" required className={inputCls} placeholder={c.placeholderPhone} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="position">
                    {c.labelPosition} {c.required}
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    className={selectCls}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="" disabled>{c.selectRole}</option>
                    {activeJobs.map((j) => (
                      <option key={j.id} value={j.title}>{j.title}</option>
                    ))}
                    <option value="Other">{c.optOther}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="experience">
                  {c.labelExperience} {c.required}
                </label>
                <select id="experience" name="experience" required className={selectCls} defaultValue="">
                  <option value="" disabled>{c.selectExperience}</option>
                  <option value="No experience">{c.optEntryLevel}</option>
                  <option value="1-2 years">{c.opt12Years}</option>
                  <option value="3-5 years">{c.opt35Years}</option>
                  <option value="5-10 years">{c.opt510Years}</option>
                  <option value="10+ years">{c.opt10Plus}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="message">
                  {c.labelMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={`${inputCls} resize-y`}
                  placeholder={c.placeholderMessage}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">
                    {c.resumeLabel}
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors bg-background/30 text-center">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(ev) => setResumeName(ev.target.files?.[0]?.name || "")}
                    />
                    <div className="flex flex-col items-center">
                      <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm font-medium">
                        {resumeName
                          ? <span className="text-primary">{resumeName}</span>
                          : <span className="text-muted-foreground">{c.resumeUploadText}</span>}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">
                    {c.idLabel} {c.required}
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors bg-background/30 text-center">
                    <input
                      type="file"
                      name="id"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                      className="hidden"
                      onChange={(ev) => setIdName(ev.target.files?.[0]?.name || "")}
                    />
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm font-medium">
                        {idName
                          ? <span className="text-primary">{idName}</span>
                          : <span className="text-muted-foreground">{c.idUploadText}</span>}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                data-testid="submit-application-btn"
              >
                {status === "submitting" ? c.submitting : c.submitBtn}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
