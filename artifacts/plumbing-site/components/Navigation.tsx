"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Droplets, Menu, X, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border-2 border-accent/70 bg-foreground/80 backdrop-blur-sm p-0.5 shadow-[0_0_12px_rgba(227,90,26,0.25)] ${compact ? "scale-95" : ""}`}
      data-testid="language-toggle"
      title="Switch language / Cambiar idioma"
    >
      <Globe className="w-3.5 h-3.5 text-accent ml-1.5 shrink-0" />
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
          lang === "en"
            ? "bg-accent text-white shadow-sm"
            : "text-white/60 hover:text-white"
        }`}
        data-testid="lang-en-btn"
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
          lang === "es"
            ? "bg-accent text-white shadow-sm"
            : "text-white/60 hover:text-white"
        }`}
        data-testid="lang-es-btn"
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/services" },
    { name: t.nav.estimate, path: "/estimate" },
    { name: t.nav.careers, path: "/careers" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/10 shadow-lg py-3"
          : "bg-foreground/70 backdrop-blur-md border-b border-white/10 py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0" data-testid="nav-logo">
            <div className="bg-accent/20 border border-accent/30 p-2 rounded-lg group-hover:bg-accent/30 transition-colors">
              <Droplets className="w-6 h-6 text-accent" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
              J&amp;O Pro Bro&apos;s
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`nav-link-${link.path === "/" ? "home" : link.path.slice(1)}`}
              >
                {link.name}
              </Link>
            ))}

            <LanguageToggle />

            <Link
              href="/estimate"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-primary/25 shrink-0"
              data-testid="nav-cta"
            >
              {t.nav.cta}
            </Link>
          </nav>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle compact />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="nav-mobile-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-lg font-medium p-2 rounded-md ${
                    pathname === link.path ? "bg-primary/10 text-primary" : "text-foreground"
                  }`}
                  data-testid={`nav-mobile-link-${link.path === "/" ? "home" : link.path.slice(1)}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/estimate"
                className="bg-primary text-primary-foreground text-center py-3 rounded-md font-medium mt-2"
              >
                {t.nav.cta}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
