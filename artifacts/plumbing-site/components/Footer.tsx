"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-foreground text-muted pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/images/logo.png"
                alt="J&O Pro Bros Construction"
                width={160}
                height={60}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-muted/80 mb-6 leading-relaxed">{f.tagline}</p>
            <div className="text-sm text-muted/60">
              <p>{f.license}</p>
              <p>{f.insured}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-6">{f.quickLinks}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">{f.home}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">{f.services}</Link>
              </li>
              <li>
                <Link href="/estimate" className="hover:text-primary transition-colors">{f.requestEstimate}</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">{f.careers}</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-6">{f.servicesHeader}</h3>
            <ul className="space-y-4">
              <li className="text-muted/80">
                {t.lang === "en" ? "Commercial Pipe Routing" : "Ruteo de Tuberías Comerciales"}
              </li>
              <li className="text-muted/80">
                {t.lang === "en" ? "Medical Gas Systems" : "Sistemas de Gas Médico"}
              </li>
              <li className="text-muted/80">
                {t.lang === "en" ? "Fire Suppression" : "Supresión de Incendios"}
              </li>
              <li className="text-muted/80">
                {t.lang === "en" ? "Industrial Process Piping" : "Tuberías de Proceso Industrial"}
              </li>
              <li className="text-muted/80">
                {t.lang === "en" ? "Residential Repiping" : "Retuberización Residencial"}
              </li>
              <li className="text-muted/80">
                {t.lang === "en" ? "24/7 Emergency Service" : "Servicio de Emergencia 24/7"}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-6">{f.contactHeader}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted/80">
                  1234 Contractor Way, Suite 100<br />
                  Metropolis, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted/80">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted/80">estimates@joprobros.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted/60">
          <p>&copy; {new Date().getFullYear()} J&amp;O Pro Bros Construction. {f.copyright}</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">{f.privacy}</Link>
            <Link href="#" className="hover:text-primary transition-colors">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
