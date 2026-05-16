"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, HeartPulse, GraduationCap, DollarSign, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";

const POSITIONS = [
  {
    id: "licensed-plumber",
    title: "Licensed Plumber - Commercial",
    type: "Full-Time",
    desc: "Lead large-scale commercial installations, manage junior staff, and ensure absolute code compliance on multi-million dollar sites."
  },
  {
    id: "apprentice",
    title: "Apprentice Plumber",
    type: "Full-Time",
    desc: "Learn from the best. Assist journeymen and master plumbers on commercial and residential sites while earning your hours."
  },
  {
    id: "estimator",
    title: "Project Estimator",
    type: "Full-Time",
    desc: "Analyze blueprints, conduct takeoffs, and generate accurate bids for massive commercial plumbing infrastructure."
  },
  {
    id: "supervisor",
    title: "Field Supervisor",
    type: "Full-Time",
    desc: "Oversee multiple job sites, coordinate with GCs, manage crews, and ensure projects stay on schedule and under budget."
  },
  {
    id: "welder",
    title: "Pipe Welder/Fitter",
    type: "Full-Time",
    desc: "Specialized welding for industrial process piping, medical gas lines, and high-pressure steam systems."
  }
];

export default function CareersPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const [resumeName, setResumeName] = useState("");
  const [idName, setIdName] = useState("");

  const handleApplyClick = (positionId: string) => {
    const select = document.getElementById("position") as HTMLSelectElement;
    if (select) {
      select.value = positionId;
    }
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData, // browser sets multipart/form-data
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/30 via-foreground to-foreground z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Build Your Career With Us</h1>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join the team trusted by Fortune 500 companies. We're looking for dedicated professionals ready to work on the region's most ambitious projects.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Why Premier Plumbing?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We invest in our people because they are the foundation of our success.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: DollarSign, title: "Competitive Pay", desc: "Top-tier hourly rates, prevailing/union wages, and performance bonuses." },
            { icon: HeartPulse, title: "Full Health Coverage", desc: "Comprehensive medical, dental, and vision insurance for you and your family." },
            { icon: GraduationCap, title: "Paid Training", desc: "We sponsor your continuing education, certifications, and licensing exams." },
            { icon: Briefcase, title: "Vehicle Allowance", desc: "Take-home company trucks for foremen and generous allowances for travel." }
          ].map((benefit, i) => (
            <div key={i} className="glass p-6 rounded-2xl text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Open Positions</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {POSITIONS.map((pos) => (
            <div key={pos.id} className="border border-border/50 rounded-2xl p-6 bg-card hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between sm:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{pos.title}</h3>
                  <span className="text-xs font-semibold bg-muted px-2 py-1 rounded-md text-muted-foreground">{pos.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{pos.desc}</p>
              </div>
              <button 
                onClick={() => handleApplyClick(pos.title)}
                className="shrink-0 text-accent font-semibold hover:bg-accent/10 px-4 py-2 rounded-lg transition-colors text-sm border border-accent/20"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl" ref={formRef}>
        <div className="glass p-8 md:p-12 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <h2 className="text-3xl font-bold mb-8 text-foreground relative z-10">Submit Your Application</h2>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-center py-12 relative z-10"
            >
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Application Received!</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                Thanks for applying. Our hiring team will review your qualifications and reach out if there's a good fit.
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="text-primary font-semibold hover:underline"
              >
                Submit another application
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" encType="multipart/form-data">
              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 border border-red-200">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="jane@example.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="position">Position Applying For *</label>
                  <select id="position" name="position" required className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
                    <option value="" disabled selected>Select a role</option>
                    {POSITIONS.map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                    <option value="Other">Other / General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="experience">Years of Experience *</label>
                <select id="experience" name="experience" required className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
                  <option value="" disabled selected>Select experience level</option>
                  <option value="Entry Level">Entry Level (0-1 years)</option>
                  <option value="1-2 years">1–2 years</option>
                  <option value="3-5 years">3–5 years</option>
                  <option value="5-10 years">5–10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="coverLetter">Cover Letter / Message (Optional)</label>
                <textarea id="coverLetter" name="coverLetter" rows={4} className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-y" placeholder="Tell us why you'd be a great fit..."></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">Resume Upload *</label>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors bg-background/30 text-center">
                    <input type="file" name="resume" accept=".pdf,.doc,.docx" required className="hidden" onChange={(e) => setResumeName(e.target.files?.[0]?.name || "")} />
                    <div className="flex flex-col items-center">
                      <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground font-medium">
                        {resumeName ? <span className="text-primary">{resumeName}</span> : "Click to upload Resume (PDF/DOC)"}
                      </span>
                    </div>
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">ID Document for verification</label>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors bg-background/30 text-center">
                    <input type="file" name="id" accept=".pdf,.jpg,.png" className="hidden" onChange={(e) => setIdName(e.target.files?.[0]?.name || "")} />
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground font-medium">
                        {idName ? <span className="text-primary">{idName}</span> : "Click to upload ID (Optional)"}
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
                {status === "submitting" ? "Sending..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
