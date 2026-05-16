"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Phone } from "lucide-react";
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
          lang === "en" ? "bg-accent text-white shadow-sm" : "text-white/60 hover:text-white"
        }`}
        data-testid="lang-en-btn"
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
          lang === "es" ? "bg-accent text-white shadow-sm" : "text-white/60 hover:text-white"
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "glass-dark border-b border-white/10 shadow-lg py-3"
            : "bg-foreground/80 backdrop-blur-md border-b border-white/10 py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 shrink-0" data-testid="nav-logo">
              <Image
                src="/images/logo.png"
                alt="J&O Pro Bros Construction logo"
                width={72}
                height={72}
                className="h-14 w-14 object-contain"
                priority
              />
              <span className="text-white font-extrabold tracking-tight leading-tight text-xl hidden sm:block">
                J&amp;O Pro Bros<br />
                <span className="text-accent text-sm font-bold tracking-widest uppercase">Construction</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.path ? "text-primary" : "text-white/70"
                  }`}
                  data-testid={`nav-link-${link.path === "/" ? "home" : link.path.slice(1)}`}
                >
                  {link.name}
                </Link>
              ))}

              <LanguageToggle />

              <Link
                href="/estimate"
                className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-full font-semibold transition-colors shadow-lg shadow-accent/25 shrink-0 text-sm"
                data-testid="nav-cta"
              >
                {t.nav.cta}
              </Link>
            </nav>

            {/* Mobile: toggle + hamburger */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageToggle compact />
              <button
                className="p-2 text-white"
                onClick={() => setIsOpen(!isOpen)}
                data-testid="nav-mobile-toggle"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
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
            <nav className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-lg font-medium p-2 rounded-md ${
                    pathname === link.path ? "bg-primary/10 text-primary" : "text-white"
                  }`}
                  data-testid={`nav-mobile-link-${link.path === "/" ? "home" : link.path.slice(1)}`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={t.nav.phoneHref}
                className="flex items-center gap-2 text-accent font-bold p-2 text-lg"
              >
                <Phone className="w-5 h-5" />
                {t.nav.phone}
              </a>
              <Link
                href="/estimate"
                className="bg-accent text-white text-center py-3 rounded-md font-semibold mt-1"
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
