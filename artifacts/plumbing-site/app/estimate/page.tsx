"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, ThumbsUp, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function EstimatePage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
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
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg==')] opacity-10 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request an Estimate</h1>
          <p className="text-lg text-primary-foreground/80">
            Tell us about your project. Our estimating team will review your requirements and provide a comprehensive proposal.
          </p>
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
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Request Received</h2>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                    Thank you for reaching out. Our team is reviewing your project details and will be in touch within 24-48 business hours.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="text-primary font-semibold hover:underline"
                  >
                    Submit another request
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
                      <label className="text-sm font-semibold text-foreground" htmlFor="name">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="phone">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="company">Company / Org (Optional)</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground" htmlFor="projectType">Project Type *</label>
                    <select 
                      id="projectType" 
                      name="projectType" 
                      required
                      className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                    >
                      <option value="" disabled selected>Select an option</option>
                      <option value="commercial">Commercial</option>
                      <option value="residential">Residential</option>
                      <option value="industrial">Industrial</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground" htmlFor="address">Project Address / Location (Optional)</label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="123 Jobsite Blvd, City, State"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="timeline">Estimated Timeline</label>
                      <select 
                        id="timeline" 
                        name="timeline" 
                        className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                      >
                        <option value="" disabled selected>Select an option</option>
                        <option value="ASAP">ASAP</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="1-3 months">1–3 months</option>
                        <option value="3-6 months">3–6 months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground" htmlFor="budget">Estimated Budget</label>
                      <select 
                        id="budget" 
                        name="budget" 
                        className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                      >
                        <option value="" disabled selected>Select an option</option>
                        <option value="Under $10k">Under $10k</option>
                        <option value="$10k-$50k">$10k–$50k</option>
                        <option value="$50k-$200k">$50k–$200k</option>
                        <option value="$200k-$500k">$200k–$500k</option>
                        <option value="$500k+">$500k+</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground" htmlFor="description">Project Description *</label>
                    <textarea 
                      id="description" 
                      name="description" 
                      required 
                      minLength={10}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-y"
                      placeholder="Please describe the scope of work, specific issues, or general requirements..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "submitting"}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    data-testid="submit-estimate-btn"
                  >
                    {status === "submitting" ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Request <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
              <h3 className="text-xl font-bold mb-6 text-foreground">What to Expect</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Fast Response</h4>
                    <p className="text-sm text-muted-foreground mt-1">We aim to review and respond to all inquiries within 24-48 business hours.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Expert Evaluation</h4>
                    <p className="text-sm text-muted-foreground mt-1">A seasoned estimator or project manager will review your spec for accurate pricing.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <ThumbsUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">No Obligations</h4>
                    <p className="text-sm text-muted-foreground mt-1">Our initial consultations and estimates are provided pressure-free.</p>
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
