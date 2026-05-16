"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Info, ArrowLeft, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jobs } from "@/lib/jobs";
import { useSearchParams, useRouter } from "next/navigation";

function ApplyForm() {
  const { t, lang, setLang } = useLanguage();
  const c = t.careers;
  const searchParams = useSearchParams();
  const router = useRouter();

  const roleParam = searchParams.get("role") || "";
  const activeJobs = jobs.filter((j) => j.active);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [idName, setIdName] = useState("");
  const [selectedRole, setSelectedRole] = useState(roleParam);

  useEffect(() => {
    if (roleParam) setSelectedRole(roleParam);
  }, [roleParam]);

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

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">

        {/* Back link */}
        <button
          onClick={() => router.push("/careers")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Open Roles
        </button>

        <div className="glass p-8 md:p-12 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

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
                onClick={() => router.push("/careers")}
                className="text-primary font-semibold hover:underline"
              >
                Back to Open Roles
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 mb-2 relative z-10">
                <h1 className="text-3xl font-bold text-foreground">{c.formTitle}</h1>
                <button
                  type="button"
                  onClick={() => setLang(lang === "en" ? "es" : "en")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-sm font-semibold transition-colors shrink-0 mt-1 ${
                    lang === "es"
                      ? "bg-primary text-white border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <Languages className="w-4 h-4 shrink-0" />
                  {lang === "es" ? "View in English" : "Ver en Español"}
                </button>
              </div>
              {roleParam && (
                <p className="text-muted-foreground mb-6 relative z-10">
                  {lang === "es" ? "Aplicando para:" : "Applying for:"} <span className="font-semibold text-foreground">{roleParam}</span>
                </p>
              )}

              <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-8 relative z-10">
                <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">{c.agreementNote}</p>
              </div>

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
            </>
          )}
        </div>
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
