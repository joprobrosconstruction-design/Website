"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload, FileText, CheckCircle2, AlertCircle,
  ArrowLeft, Languages, User, Phone, Briefcase, FileUp, ShieldCheck, PenLine,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jobs } from "@/lib/jobs";
import { useSearchParams, useRouter } from "next/navigation";

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-border mb-5">
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{label}</h2>
    </div>
  );
}

function ApplyForm() {
  const { t, lang, setLang } = useLanguage();
  const c = t.careers;
  const searchParams = useSearchParams();
  const router = useRouter();

  const roleParam = searchParams.get("role") || "";
  const activeJobs = jobs.filter((j) => j.active);

  const [status, setStatus]             = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeName, setResumeName]     = useState("");
  const [idName, setIdName]             = useState("");
  const [selectedRole, setSelectedRole] = useState(roleParam);
  const [termsOpen, setTermsOpen]       = useState(false);
  const [signatureName, setSignatureName] = useState("");
  const [signatureError, setSignatureError] = useState("");
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roleParam) setSelectedRole(roleParam);
  }, [roleParam]);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const enteredName = (formData.get("name") as string ?? "").trim();

    if (!signatureName.trim()) {
      setSignatureError(c.signatureRequired);
      signatureRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (signatureName.trim().toLowerCase() !== enteredName.toLowerCase()) {
      setSignatureError(c.signatureMatchError);
      signatureRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSignatureError("");
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/careers", { method: "POST", body: formData });
      const result = await response.json();
      if (response.ok) {
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    "w-full px-4 py-3 rounded-xl border border-border bg-background/60 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <main className="min-h-screen bg-background pt-24 pb-32">

      {/* ── Submitting overlay ── */}
      <AnimatePresence>
        {status === "submitting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040e28]/80 backdrop-blur-sm"
          >
            <div className="bg-white rounded-2xl px-10 py-10 flex flex-col items-center gap-5 shadow-2xl max-w-xs w-full mx-4 text-center">
              <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <div>
                <p className="font-bold text-gray-900 text-base">Submitting Your Application</p>
                <p className="text-sm text-gray-500 mt-1">This may take a moment — please don't close the page.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 max-w-2xl">

        {/* Back link */}
        <button
          onClick={() => router.push("/careers")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Open Roles
        </button>

        {/* Success state */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl border border-border/50 p-12 text-center shadow-sm"
          >
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-foreground">{c.successTitle}</h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto mb-8 leading-relaxed">{c.successDesc}</p>
            <button
              onClick={() => router.push("/careers")}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Open Roles
            </button>
          </motion.div>
        ) : (
          <>
            {/* Page header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{c.formTitle}</h1>
                {roleParam && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {lang === "es" ? "Aplicando para:" : "Applying for:"}{" "}
                    <span className="font-semibold text-foreground">{roleParam}</span>
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors shrink-0 mt-1 ${
                  lang === "es"
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <Languages className="w-3.5 h-3.5 shrink-0" />
                {lang === "es" ? "English" : "Español"}
              </button>
            </div>

            {/* Error banner */}
            {status === "error" && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-200 mb-6">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10" encType="multipart/form-data">

              {/* ── Section 1: Personal Info ── */}
              <div>
                <SectionHeader icon={User} label={lang === "es" ? "Información Personal" : "Personal Info"} />
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground" htmlFor="name">
                        {c.labelName} <span className="text-accent">{c.required}</span>
                      </label>
                      <input type="text" id="name" name="name" required className={inputCls} placeholder={c.placeholderName} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground" htmlFor="email">
                        {c.labelEmail} <span className="text-accent">{c.required}</span>
                      </label>
                      <input type="email" id="email" name="email" required className={inputCls} placeholder={c.placeholderEmail} />
                    </div>
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <label className="text-sm font-semibold text-foreground" htmlFor="phone">
                      {c.labelPhone} <span className="text-accent">{c.required}</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="tel" id="phone" name="phone" required className={`${inputCls} pl-10`} placeholder={c.placeholderPhone} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Position ── */}
              <div>
                <SectionHeader icon={Briefcase} label={lang === "es" ? "Puesto e Experiencia" : "Position & Experience"} />
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground" htmlFor="position">
                      {c.labelPosition} <span className="text-accent">{c.required}</span>
                    </label>
                    <select
                      id="position" name="position" required className={selectCls}
                      value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="" disabled>{c.selectRole}</option>
                      {activeJobs.map((j) => (
                        <option key={j.id} value={j.title}>{j.title}</option>
                      ))}
                      <option value="Other">{c.optOther}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground" htmlFor="experience">
                      {c.labelExperience} <span className="text-accent">{c.required}</span>
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
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground" htmlFor="message">
                      {c.labelMessage}
                    </label>
                    <textarea
                      id="message" name="message" rows={3}
                      className={`${inputCls} resize-y`}
                      placeholder={c.placeholderMessage}
                    />
                  </div>
                </div>
              </div>

              {/* ── Section 3: Documents ── */}
              <div>
                <SectionHeader icon={FileUp} label={lang === "es" ? "Documentos" : "Documents"} />
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Resume */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground block">{c.resumeLabel}</label>
                    <label className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors bg-background/30 text-center hover:border-primary/50 hover:bg-primary/5 border-border group">
                      <input
                        type="file" name="resume" accept=".pdf,.doc,.docx" className="hidden"
                        onChange={(ev) => setResumeName(ev.target.files?.[0]?.name || "")}
                      />
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${resumeName ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      {resumeName ? (
                        <span className="text-sm font-semibold text-primary break-all">{resumeName}</span>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-foreground mb-1">{lang === "es" ? "Subir Currículum" : "Upload Resume"}</span>
                          <span className="text-xs text-muted-foreground">PDF, DOC, DOCX</span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Government ID */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground block">
                      {c.idLabel} <span className="text-accent">{c.required}</span>
                    </label>
                    <label className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors bg-background/30 text-center hover:border-primary/50 hover:bg-primary/5 border-border group">
                      <input
                        type="file" name="id" accept=".pdf,.jpg,.jpeg,.png" required className="hidden"
                        onChange={(ev) => setIdName(ev.target.files?.[0]?.name || "")}
                      />
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${idName ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
                        <Upload className="w-6 h-6" />
                      </div>
                      {idName ? (
                        <span className="text-sm font-semibold text-primary break-all">{idName}</span>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-foreground mb-1">{lang === "es" ? "Subir Identificación" : "Upload ID"}</span>
                          <span className="text-xs text-muted-foreground">JPG, PNG, PDF</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* ── Section 4: Terms & Signature ── */}
              <div ref={signatureRef}>
                <SectionHeader icon={ShieldCheck} label={lang === "es" ? "Términos y Firma" : "Terms & Signature"} />

                {/* Terms accordion */}
                <div className="rounded-2xl border border-border overflow-hidden mb-5">
                  <button
                    type="button"
                    onClick={() => setTermsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <span>{c.termsTitle}</span>
                    <span className={`text-muted-foreground text-xs transition-transform duration-200 ${termsOpen ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {termsOpen && (
                    <div className="px-5 pb-4 max-h-52 overflow-y-auto border-t border-border">
                      <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans mt-3">
                        {c.termsBody}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Signature field */}
                <div className={`rounded-2xl border-2 overflow-hidden transition-colors ${signatureError ? "border-red-400" : "border-border"}`}>
                  <div className="bg-muted/30 px-5 py-3 border-b border-border flex items-center gap-2.5">
                    <PenLine className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-sm font-bold text-foreground">{c.signatureLabel}</p>
                    <span className="text-accent text-sm">*</span>
                  </div>
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {lang === "es"
                        ? "Escriba exactamente como aparece en la sección Información Personal:"
                        : "Type exactly as entered in the Personal Info section:"}
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        value={signatureName}
                        onChange={(e) => { setSignatureName(e.target.value); setSignatureError(""); }}
                        placeholder={c.signaturePlaceholder}
                        className={`w-full px-4 py-4 rounded-xl border bg-background outline-none transition-all text-foreground text-xl placeholder:text-muted-foreground/40 ${
                          signatureError
                            ? "border-red-400 focus:ring-2 focus:ring-red-200"
                            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
                      />
                    </div>
                    {signatureError ? (
                      <div className="flex items-start gap-2 mt-2.5">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-500">{signatureError}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="px-5 py-3 border-t border-border bg-primary/5">
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.signatureHint}</p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                data-testid="submit-application-btn"
                className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-2xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {c.submitting}
                  </>
                ) : c.submitBtn}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyForm />
    </Suspense>
  );
}
