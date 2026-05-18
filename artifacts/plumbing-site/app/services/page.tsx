"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Droplet,
  Settings,
  ShieldCheck,
  Wrench,
  Flame,
  Video,
  Factory,
  Bath,
  ArrowRight,
  Droplets,
  AlertTriangle,
  Thermometer,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LucideIcon } from "lucide-react";

interface ServiceData {
  Icon: LucideIcon;
  en: { title: string; desc: string; bullets: string[] };
  es: { title: string; desc: string; bullets: string[] };
}

const COMMERCIAL_SERVICES: ServiceData[] = [
  {
    Icon: Settings,
    en: {
      title: "Pipe Installation",
      desc: "Expert design and installation of complex distribution systems for commercial facilities. We handle everything from high-rise water supply to industrial process piping.",
      bullets: ["Copper & PEX systems", "Cast iron routing", "High-pressure lines"],
    },
    es: {
      title: "Instalación de Tuberías",
      desc: "Diseño e instalación experta de sistemas de distribución complejos para instalaciones comerciales. Manejamos todo, desde el suministro de agua en rascacielos hasta tuberías de procesos industriales.",
      bullets: ["Sistemas de cobre y PEX", "Ruteo de hierro fundido", "Líneas de alta presión"],
    },
  },
  {
    Icon: Thermometer,
    en: {
      title: "Commercial HVAC Systems",
      desc: "Professional installation, replacement, and servicing for commercial heating and cooling systems designed to keep facilities operating efficiently year-round.",
      bullets: ["Rooftop units", "System replacements", "Preventative maintenance"],
    },
    es: {
      title: "Sistemas HVAC Comerciales",
      desc: "Instalación, reemplazo y mantenimiento profesional de sistemas de calefacción y enfriamiento comerciales diseñados para mantener las instalaciones funcionando eficientemente todo el año.",
      bullets: ["Unidades en azotea", "Reemplazos de sistemas", "Mantenimiento preventivo"],
    },
  },
  {
    Icon: Droplets,
    en: {
      title: "Grease Trap Service",
      desc: "Complete solutions for commercial kitchens and restaurants. We install high-capacity interceptors and provide maintenance routing to prevent costly backups.",
      bullets: ["Interceptor sizing", "New installations", "Compliance reporting"],
    },
    es: {
      title: "Servicio de Trampa de Grasa",
      desc: "Soluciones completas para cocinas comerciales y restaurantes. Instalamos interceptores de alta capacidad y proporcionamos mantenimiento rutinario para prevenir costosas obstrucciones.",
      bullets: ["Dimensionamiento de interceptores", "Nuevas instalaciones", "Informes de cumplimiento"],
    },
  },
  {
    Icon: Video,
    en: {
      title: "Sewer Line Inspection & Repair",
      desc: "Advanced camera diagnostics to identify blockages or structural failures with minimal disruption. Trenchless repair solutions available.",
      bullets: ["Video diagnostics", "Hydro-jetting", "Trenchless relining"],
    },
    es: {
      title: "Inspección y Reparación de Alcantarillado",
      desc: "Diagnóstico avanzado con cámara para identificar obstrucciones o fallas estructurales con mínima interrupción. Soluciones de reparación sin zanja disponibles.",
      bullets: ["Diagnóstico por video", "Limpieza a alta presión", "Revestimiento sin zanja"],
    },
  },
  {
    Icon: Factory,
    en: {
      title: "Industrial Process Piping",
      desc: "Specialized piping solutions for manufacturing and processing facilities handling corrosive, high-temperature, or high-pressure systems.",
      bullets: ["Stainless steel", "Chemical routing", "High-purity systems"],
    },
    es: {
      title: "Tuberías de Proceso Industrial",
      desc: "Soluciones de tuberías especializadas para instalaciones de manufactura y procesamiento que manejan sistemas corrosivos, de alta temperatura o alta presión.",
      bullets: ["Acero inoxidable", "Ruteo de químicos", "Sistemas de alta pureza"],
    },
  },
];

const RESIDENTIAL_SERVICES: ServiceData[] = [
  {
    Icon: Flame,
    en: {
      title: "Water Heater Installation",
      desc: "Upgrade to high-efficiency traditional or tankless water heaters professionally sized for your household's needs.",
      bullets: ["Tankless upgrades", "Gas & Electric", "Recirculation pumps"],
    },
    es: {
      title: "Instalación de Calentador de Agua",
      desc: "Actualice a calentadores de agua sin tanque o tradicionales de alta eficiencia, dimensionados profesionalmente para las necesidades de su hogar.",
      bullets: ["Actualizaciones sin tanque", "Gas y eléctrico", "Bombas de recirculación"],
    },
  },
  {
    Icon: Thermometer,
    en: {
      title: "HVAC Installation & Replacement",
      desc: "Energy-efficient heating and cooling solutions for residential properties, including full system installations and equipment upgrades.",
      bullets: ["Central air systems", "Furnace replacement", "Energy-efficient upgrades"],
    },
    es: {
      title: "Instalación y Reemplazo de HVAC",
      desc: "Soluciones de calefacción y enfriamiento energéticamente eficientes para propiedades residenciales, incluyendo instalaciones completas y actualizaciones de equipos.",
      bullets: ["Sistemas de aire central", "Reemplazo de calefacción", "Actualizaciones eficientes"],
    },
  },
  {
    Icon: Wrench,
    en: {
      title: "HVAC Repair & Maintenance",
      desc: "Reliable diagnostics, repairs, and preventative maintenance to keep your heating and cooling systems operating at peak performance.",
      bullets: ["AC troubleshooting", "Furnace repair", "Seasonal maintenance"],
    },
    es: {
      title: "Reparación y Mantenimiento de HVAC",
      desc: "Diagnóstico, reparaciones y mantenimiento preventivo confiables para mantener sus sistemas de calefacción y enfriamiento en máximo rendimiento.",
      bullets: ["Diagnóstico de A/C", "Reparación de calefacción", "Mantenimiento estacional"],
    },
  },
  {
    Icon: Droplet,
    en: {
      title: "Drain Cleaning & Unclogging",
      desc: "Fast, effective clearing of stubborn blockages using professional-grade equipment.",
      bullets: ["Main line clearing", "Root removal", "Hydro-jetting"],
    },
    es: {
      title: "Limpieza y Desatasco de Drenajes",
      desc: "Limpieza rápida y eficaz de obstrucciones persistentes usando equipo de grado profesional.",
      bullets: ["Limpieza de línea principal", "Eliminación de raíces", "Limpieza a alta presión"],
    },
  },
  {
    Icon: AlertTriangle,
    en: {
      title: "Leak Detection & Repair",
      desc: "Non-invasive electronic detection for hidden leaks behind walls or beneath slabs, minimizing unnecessary damage to your home.",
      bullets: ["Slab leaks", "Electronic detection", "Pipe rerouting"],
    },
    es: {
      title: "Detección y Reparación de Fugas",
      desc: "Detección electrónica no invasiva para fugas ocultas detrás de paredes o bajo losas, minimizando daños innecesarios a su hogar.",
      bullets: ["Fugas de losa", "Detección electrónica", "Rerouting de tuberías"],
    },
  },
  {
    Icon: Bath,
    en: {
      title: "Bathroom & Kitchen Remodeling",
      desc: "Fixture installation and complete plumbing rough-ins tailored to your renovation vision.",
      bullets: ["Custom showers", "Island sinks", "Fixture upgrades"],
    },
    es: {
      title: "Remodelación de Baño y Cocina",
      desc: "Instalación de accesorios y trabajos de plomería completos adaptados a su visión de renovación.",
      bullets: ["Duchas personalizadas", "Fregaderos de isla", "Actualización de accesorios"],
    },
  },
  {
    Icon: Droplets,
    en: {
      title: "Sump Pump Installation",
      desc: "Protect your basement from flooding with reliable primary and battery-backup sump pump systems.",
      bullets: ["Battery backups", "Pit installation", "Discharge routing"],
    },
    es: {
      title: "Instalación de Bomba de Sumidero",
      desc: "Proteja su sótano de inundaciones con sistemas de bomba de sumidero primarios y de respaldo con batería confiables.",
      bullets: ["Respaldo con batería", "Instalación de foso", "Ruteo de descarga"],
    },
  },
  {
    Icon: Settings,
    en: {
      title: "Whole-House Repiping",
      desc: "Replace outdated galvanized or polybutylene piping with modern PEX or copper systems to improve reliability and water pressure.",
      bullets: ["PEX routing", "Copper systems", "Minimal drywall impact"],
    },
    es: {
      title: "Retuberización de Casa Completa",
      desc: "Reemplace tuberías de galvanizado o polibutileno antiguas con sistemas modernos de PEX o cobre para mejorar la confiabilidad y la presión del agua.",
      bullets: ["Ruteo de PEX", "Sistemas de cobre", "Mínimo impacto en drywall"],
    },
  },
  {
    Icon: ShieldCheck,
    en: {
      title: "Water Filtration Systems",
      desc: "Whole-home filtration and softening solutions for cleaner, better-tasting water throughout your property.",
      bullets: ["Whole-house systems", "Reverse osmosis", "Water softeners"],
    },
    es: {
      title: "Sistemas de Filtración de Agua",
      desc: "Soluciones de filtración y suavización para todo el hogar para agua más limpia y de mejor sabor en toda su propiedad.",
      bullets: ["Sistemas para toda la casa", "Ósmosis inversa", "Suavizadores de agua"],
    },
  },
];

export default function ServicesPage() {
  const { lang, t } = useLanguage();
  const s = t.services;

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-foreground to-foreground z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{s.heroTitle}</h1>
          <p className="text-xl text-primary-foreground/80">{s.heroDesc}</p>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-muted">
          <div className="bg-primary/10 p-4 rounded-2xl">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{s.commercialTitle}</h2>
            <p className="text-muted-foreground mt-1">{s.commercialSubtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMERCIAL_SERVICES.map((service, i) => {
            const data = service[lang];
            const Icon = service.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-2xl flex flex-col h-full hover:shadow-xl transition-shadow"
              >
                <div className="mb-6 bg-muted/50 w-16 h-16 rounded-xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{data.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{data.desc}</p>
                <ul className="space-y-2">
                  {data.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Residential Services */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-muted">
          <div className="bg-primary/10 p-4 rounded-2xl">
            <Droplet className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{s.residentialTitle}</h2>
            <p className="text-muted-foreground mt-1">{s.residentialSubtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESIDENTIAL_SERVICES.map((service, i) => {
            const data = service[lang];
            const Icon = service.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-2xl flex flex-col h-full hover:shadow-xl transition-shadow"
              >
                <div className="mb-6 bg-muted/50 w-16 h-16 rounded-xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{data.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{data.desc}</p>
                <ul className="space-y-2">
                  {data.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="glass-dark rounded-3xl p-12 text-center bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{s.ctaTitle}</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{s.ctaDesc}</p>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-accent/20"
            >
              {s.ctaBtn} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
