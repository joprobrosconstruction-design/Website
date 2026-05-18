"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, ThumbsUp, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EstimatePage() {
  const { t, lang } = useLanguage();
  const e = t.estimate;

  const SERVICES = {
    en: {
      commercial: "Commercial Services",
      residential: "Residential Services",
      items: {
        commercial: [
          "Pipe Installation",
          "Grease Trap Service",
          "Fire Suppression Plumbing",
          "Sewer Line Inspection & Repair",
          "Industrial Process Piping",
        ],
        residential: [
          "Water Heater Installation",
          "Drain Cleaning & Unclogging",
          "Leak Detection & Repair",
          "Bathroom & Kitchen Remodeling",
          "Sump Pump Installation",
          "Whole-House Repiping",
          "Water Filtration Systems",
        ],
      },
      other: "Other / Not Listed",
    },
    es: {
      commercial: "Servicios Comerciales",
      residential: "Servicios Residenciales",
      items: {
        commercial: [
          "Instalación de Tuberías",
          "Servicio de Trampa de Grasa",
          "Plomería para Supresión de Incendios",
          "Inspección y Reparación de Alcantarillado",
          "Tuberías de Proceso Industrial",
        ],
        residential: [
          "Instalación de Calentador de Agua",
          "Limpieza y Desatasco de Drenajes",
          "Detección y Reparación de Fugas",
          "Remodelación de Baño y Cocina",
          "Instalación de Bomba de Sumidero",
          "Retuberización de Casa Completa",
          "Sistemas de Filtración de Agua",
        ],
      },
      other: "Otro / No en la lista",
    },
  };

  const svc = SERVICES[lang] ?? SERVICES.en;

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(ev.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage(e.networkError);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
  const selectCls = `${inputCls} appearance-none`;

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg==')] opacity-10 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{e.heroTitle}</h1>
          <p className="text-lg text-primary-foreground/80">{e.heroDesc}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-border/50 bg-card">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-foreground">{e.successTitle}</h2>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">{e.successDesc}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-primary font-semibold hover:underline"
                  >
                    {e.submitAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 border border-red-200">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="name">
                        {e.labelName} {e.required}
                      </label>
                      <input type="text" id="name" name="name" required className={inputCls} placeholder={e.placeholderName} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="email">
                        {e.labelEmail} {e.required}
                      </label>
                      <input type="email" id="email" name="email" required className={inputCls} placeholder={e.placeholderEmail} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="phone">
                        {e.labelPhone} {e.required}
                      </label>
                      <input type="tel" id="phone" name="phone" required className={inputCls} placeholder={e.placeholderPhone} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="company">
                        {e.labelCompanyOpt}
                      </label>
                      <input type="text" id="company" name="company" className={inputCls} placeholder={e.placeholderCompany} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground" htmlFor="service">
                      {lang === "es" ? "Servicio Solicitado" : "Service Requested"} {e.required}
                    </label>
                    <select id="service" name="service" required className={selectCls} defaultValue="">
                      <option value="" disabled>{e.selectOption}</option>
                      <optgroup label={svc.commercial}>
                        {svc.items.commercial.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </optgroup>
                      <optgroup label={svc.residential}>
                        {svc.items.residential.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </optgroup>
                      <option value="Other">{svc.other}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground" htmlFor="address">
                      {e.labelAddressOpt}
                    </label>
                    <input type="text" id="address" name="address" className={inputCls} placeholder={e.placeholderAddress} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-foreground">
                        {e.labelTimeline}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground font-medium">Start Date</span>
                          <input
                            type="date"
                            id="timelineStart"
                            name="timelineStart"
                            min={today}
                            value={startDate}
                            onChange={ev => {
                              setStartDate(ev.target.value);
                              if (endDate && ev.target.value > endDate) setEndDate("");
                            }}
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground font-medium">End Date</span>
                          <input
                            type="date"
                            id="timelineEnd"
                            name="timelineEnd"
                            min={startDate || today}
                            value={endDate}
                            onChange={ev => setEndDate(ev.target.value)}
                            disabled={!startDate}
                            className={`${inputCls} disabled:opacity-40 disabled:cursor-not-allowed`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="budget">
                        {e.labelBudget}
                      </label>
                      <select id="budget" name="budget" className={selectCls} defaultValue="">
                        <option value="" disabled>{e.selectOption}</option>
                        <option value="Under $10k">{e.optUnder10k}</option>
                        <option value="$10k-$50k">{e.opt10_50k}</option>
                        <option value="$50k-$200k">{e.opt50_200k}</option>
                        <option value="$200k-$500k">{e.opt200_500k}</option>
                        <option value="$500k+">{e.opt500k}</option>
                        <option value="Not sure">{e.optNotSure}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground" htmlFor="description">
                      {e.labelDescription} {e.required}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      minLength={10}
                      rows={5}
                      className={`${inputCls} resize-y`}
                      placeholder={e.placeholderDescription}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    data-testid="submit-estimate-btn"
                  >
                    {status === "submitting" ? e.submitting : (
                      <>{e.submitBtn} <Send className="w-5 h-5" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
              <h3 className="text-xl font-bold mb-6 text-foreground">{e.sidebarTitle}</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{e.fastResponseTitle}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{e.fastResponseDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{e.expertEvalTitle}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{e.expertEvalDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <ThumbsUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{e.noObligationsTitle}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{e.noObligationsDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
