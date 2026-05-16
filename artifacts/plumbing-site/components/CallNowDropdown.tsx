"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, ChevronDown } from "lucide-react";
import { translations } from "@/lib/i18n";

interface Props {
  label: string;
  className?: string;
  testId?: string;
}

export function CallNowDropdown({ label, className = "", testId }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const options = [
    {
      lang: "English",
      code: "EN",
      number: translations.en.nav.phone,
      href: translations.en.nav.phoneHref,
    },
    {
      lang: "Español",
      code: "ES",
      number: translations.es.nav.phone,
      href: translations.es.nav.phoneHref,
    },
  ];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid={testId}
        className="w-full glass-dark hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
      >
        <Phone className="w-5 h-5 text-accent shrink-0" />
        {label}
        <ChevronDown
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 z-50 glass-dark border border-white/20 rounded-xl overflow-hidden shadow-2xl min-w-[240px]">
          {options.map((opt) => (
            <a
              key={opt.code}
              href={opt.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-6 py-5 hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
            >
              <div className="bg-accent/20 border border-accent/30 rounded-md px-2.5 py-1 text-accent font-black text-xs tracking-wider shrink-0">
                {opt.code}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white/50 text-xs font-medium mb-0.5">{opt.lang}</div>
                <div className="text-white font-bold text-base whitespace-nowrap">{opt.number}</div>
              </div>
              <Phone className="w-4 h-4 text-accent shrink-0" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
