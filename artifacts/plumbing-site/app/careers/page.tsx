"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { DollarSign, FileSignature, CalendarCheck, Upload, FileText, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jobs } from "@/lib/jobs";

export default function CareersPage() {
  const { t } = useLanguage();
  const c = t.careers;

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [resumeName, setResumeName] = useState("");
  const [idName, setIdName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const activeJobs = jobs.filter((j) => j.active);

  const handleApplyClick = (title: string) => {
    setSelectedRole(title);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    { Icon: DollarSign, title: c.benefit1Title, desc: c.benefit1Desc },
    { Icon: FileSignature, title: c.benefit2Title, desc: c.benefit2Desc },
    { Icon: CalendarCheck, title: c.benefit3Title, desc: c.benefit3Desc },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/30 via-foreground to-foreground z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.heroTitle}</h1>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{c.heroDesc}</p>
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
              <h3 className="font-bold text-lg mb-2 text-primary-foreground">{perk.title}</h3>
              <p className="text-sm text-primary-foreground/70">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <h2 className="text-3xl font-bold mb-8 text-foreground">{c.openPositions}</h2>
        {activeJobs.length === 0 ? (
          <div className="glass p-10 rounded-2xl text-center text-muted-foreground border border-border/50">
            {c.noPositions}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="border border-border/50 rounded-2xl p-6 bg-card hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between sm:items-center gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                    <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded-md border border-accent/20">
                      {c.contractorBadge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.desc}</p>
                </div>
                <button
                  onClick={() => handleApplyClick(job.title)}
                  className="shrink-0 bg-accent hover:bg-accent/90 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm shadow-sm"
                  data-testid={`apply-btn-${job.id}`}
                >
                  {c.applyNow}
                </button>
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

          {/* Agreement note */}
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
