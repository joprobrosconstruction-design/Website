"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ShieldCheck, FileText } from "lucide-react";
import Image from "next/image";
import { CONTRACT_AGREEMENT_TEXT } from "@/lib/contract-agreement";

function SignForm() {
  const searchParams = useSearchParams();
  const name     = searchParams.get("name")     ?? "";
  const email    = searchParams.get("email")    ?? "";
  const position = searchParams.get("position") ?? "";
  const sig      = searchParams.get("sig")      ?? "";

  const [typedName, setTypedName]   = useState("");
  const [status, setStatus]         = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  if (!name || !email || !position || !sig) {
    return (
      <div className="min-h-screen bg-[#040e28] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl">
          <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Link</h1>
          <p className="text-gray-500 text-sm">This signing link is missing required information. Please use the link provided in your acceptance email.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typedName.trim().toLowerCase() !== name.trim().toLowerCase()) {
      setErrorMessage("The name you entered does not match the name on file. Please type your full name exactly as it appears above.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res  = await fetch("/api/careers/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, position, sig, typedSignature: typedName }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#040e28] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 max-w-md w-full text-center shadow-2xl"
        >
          <Image src="/images/logo.png" alt="J&O Pro Bros" width={64} height={64} className="rounded-2xl mx-auto mb-5 object-contain" />
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-5">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Agreement Signed!</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            Your contractor agreement has been recorded. Our team will be in touch shortly to confirm your start date and job site details.
          </p>
          <p className="text-gray-400 text-xs mt-4">Signed as <strong>{name}</strong> on {today}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040e28] py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="J&O Pro Bros Construction" width={72} height={72} className="rounded-2xl mx-auto mb-4 object-contain" />
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase">J&O Pro Bros Construction</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">

          {/* Card header */}
          <div className="bg-gradient-to-r from-[#0f2a6e] to-[#1a4a8a] px-8 py-7">
            <div className="flex items-center gap-3 mb-1">
              <FileText className="w-5 h-5 text-white/70" />
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Contractor Agreement</p>
            </div>
            <h1 className="text-white text-2xl font-bold leading-tight">Independent Contractor Agreement</h1>
            <p className="text-white/60 text-sm mt-1">{position} &nbsp;·&nbsp; {name}</p>
          </div>

          <div className="px-8 py-7">
            {/* Agreement details row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Contractor", value: name },
                { label: "Role", value: position },
                { label: "Date", value: today },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{value}</p>
                </div>
              ))}
            </div>

            {/* Agreement text */}
            <div className="border border-gray-200 rounded-xl mb-6 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Agreement — Please Read Carefully</p>
              </div>
              <div className="max-h-72 overflow-y-auto p-5">
                <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-sans">
                  {CONTRACT_AGREEMENT_TEXT}
                </pre>
              </div>
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

            {/* Signature form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Type your full legal name to sign <span className="text-orange-500">*</span>
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Type exactly: <strong className="text-gray-600">{name}</strong>
                </p>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => { setTypedName(e.target.value); setErrorMessage(""); }}
                  required
                  placeholder={name}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 font-medium text-lg"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="text-xs text-blue-600 leading-relaxed">
                  By submitting this form, you confirm that you are <strong>{name}</strong>, you have read and understood the Independent Contractor Agreement above, and you agree to its terms.
                  Your electronic signature is legally binding.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || !typedName}
                className="w-full bg-[#e35a1a] hover:bg-[#c94d14] text-white py-4 rounded-xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing...
                  </>
                ) : "Sign &amp; Submit Agreement"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          J&O Pro Bros Construction &nbsp;·&nbsp; joprobros.construction@gmail.com
        </p>
      </div>
    </div>
  );
}

export default function SignPage() {
  return (
    <Suspense>
      <SignForm />
    </Suspense>
  );
}
