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
  Wind,
  Factory,
  Stethoscope,
  Bath,
  ArrowRight,
  Droplets,
  AlertTriangle,
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
      title: "Pipe Installation & Routing",
      desc: "Expert design and installation of complex distribution systems for large-scale commercial facilities. We handle everything from high-rise water supply to industrial process piping.",
      bullets: ["Copper & PEX systems", "Cast iron routing", "High-pressure lines"],
    },
    es: {
      title: "Instalación y Ruteo de Tuberías",
      desc: "Diseño e instalación experta de sistemas de distribución complejos para instalaciones comerciales a gran escala. Manejamos todo, desde el suministro de agua en rascacielos hasta tuberías de procesos industriales.",
      bullets: ["Sistemas de cobre y PEX", "Ruteo de hierro fundido", "Líneas de alta presión"],
    },
  },
  {
    Icon: ShieldCheck,
    en: {
      title: "Backflow Prevention & Testing",
      desc: "Protecting municipal water supplies from contamination. We install, test, and certify commercial backflow assemblies to ensure strict code compliance.",
      bullets: ["Annual certification", "RPZ installation", "Code compliance"],
    },
    es: {
      title: "Prevención y Pruebas de Contraflujo",
      desc: "Protegemos los suministros de agua municipales de la contaminación. Instalamos, probamos y certificamos ensambles comerciales de contraflujo para garantizar el estricto cumplimiento del código.",
      bullets: ["Certificación anual", "Instalación de RPZ", "Cumplimiento de normativas"],
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
    Icon: Flame,
    en: {
      title: "Fire Suppression Plumbing",
      desc: "Critical safety infrastructure for commercial buildings. Our certified fitters install reliable wet and dry standpipe systems that meet all fire codes.",
      bullets: ["Wet/Dry systems", "Standpipe installation", "Pump rooms"],
    },
    es: {
      title: "Plomería para Supresión de Incendios",
      desc: "Infraestructura de seguridad crítica para edificios comerciales. Nuestros instaladores certificados colocan sistemas confiables de tuberías secas y húmedas que cumplen todos los códigos de incendios.",
      bullets: ["Sistemas húmedos/secos", "Instalación de tuberías verticales", "Salas de bombas"],
    },
  },
  {
    Icon: Video,
    en: {
      title: "Sewer Line Inspection & Repair",
      desc: "Advanced camera diagnostics to pinpoint blockages or structural failures without trenching. We offer trenchless repair options to minimize disruption.",
      bullets: ["Video diagnostics", "Hydro-jetting", "Trenchless relining"],
    },
    es: {
      title: "Inspección y Reparación de Alcantarillado",
      desc: "Diagnóstico avanzado con cámara para localizar obstrucciones o fallas estructurales sin excavación. Ofrecemos opciones de reparación sin zanja para minimizar interrupciones.",
      bullets: ["Diagnóstico por video", "Limpieza a alta presión", "Revestimiento sin zanja"],
    },
  },
  {
    Icon: Wind,
    en: {
      title: "Commercial HVAC Plumbing",
      desc: "Supporting large-scale climate control systems. We route chilled water, boiler feeds, and condensation lines for massive commercial HVAC units.",
      bullets: ["Chiller piping", "Boiler systems", "Condensation routing"],
    },
    es: {
      title: "Plomería HVAC Comercial",
      desc: "Apoyo a sistemas de control climático a gran escala. Rutamos agua fría, alimentaciones de caldera y líneas de condensación para unidades HVAC comerciales masivas.",
      bullets: ["Tuberías de enfriador", "Sistemas de calderas", "Ruteo de condensación"],
    },
  },
  {
    Icon: Factory,
    en: {
      title: "Industrial Process Piping",
      desc: "Specialized piping for manufacturing and processing facilities. We handle corrosive, high-temp, or high-pressure materials safely.",
      bullets: ["Stainless steel", "Chemical routing", "High-purity systems"],
    },
    es: {
      title: "Tuberías de Proceso Industrial",
      desc: "Tuberías especializadas para instalaciones de manufactura y procesamiento. Manejamos materiales corrosivos, de alta temperatura o alta presión de forma segura.",
      bullets: ["Acero inoxidable", "Ruteo de químicos", "Sistemas de alta pureza"],
    },
  },
  {
    Icon: Stethoscope,
    en: {
      title: "Medical Gas Systems",
      desc: "Certified installation of medical gas piping for hospitals and clinics. We ensure absolute purity and reliable pressure for life-saving equipment.",
      bullets: ["Oxygen lines", "Vacuum systems", "Nitrous oxide"],
    },
    es: {
      title: "Sistemas de Gas Médico",
      desc: "Instalación certificada de tuberías de gas médico para hospitales y clínicas. Garantizamos pureza absoluta y presión confiable para equipos que salvan vidas.",
      bullets: ["Líneas de oxígeno", "Sistemas de vacío", "Óxido nitroso"],
    },
  },
];

const RESIDENTIAL_SERVICES: ServiceData[] = [
  {
    Icon: Flame,
    en: {
      title: "Water Heater Installation",
      desc: "Upgrade to high-efficiency traditional or tankless water heaters. We ensure proper sizing for your household's peak demand.",
      bullets: ["Tankless upgrades", "Gas & Electric", "Recirculation pumps"],
    },
    es: {
      title: "Instalación de Calentador de Agua",
      desc: "Actualice a calentadores de agua sin tanque o tradicionales de alta eficiencia. Garantizamos el dimensionamiento correcto para la demanda máxima de su hogar.",
      bullets: ["Actualizaciones sin tanque", "Gas y eléctrico", "Bombas de recirculación"],
    },
  },
  {
    Icon: Droplet,
    en: {
      title: "Drain Cleaning & Unclogging",
      desc: "Fast, effective clearing of stubborn blockages. We use professional-grade augers and hydro-jetters to restore full flow to your drains.",
      bullets: ["Main line clearing", "Root removal", "Hydro-jetting"],
    },
    es: {
      title: "Limpieza y Desatasco de Drenajes",
      desc: "Limpieza rápida y eficaz de obstrucciones persistentes. Usamos equipo profesional para restaurar el flujo completo en sus drenajes.",
      bullets: ["Limpieza de línea principal", "Eliminación de raíces", "Limpieza a alta presión"],
    },
  },
  {
    Icon: AlertTriangle,
    en: {
      title: "Leak Detection & Repair",
      desc: "Pinpointing hidden slab leaks or wall leaks using non-invasive electronic detection. We fix the problem fast to minimize water damage.",
      bullets: ["Slab leaks", "Electronic detection", "Pipe rerouting"],
    },
    es: {
      title: "Detección y Reparación de Fugas",
      desc: "Localización de fugas ocultas usando detección electrónica no invasiva. Solucionamos el problema rápidamente para minimizar daños por agua.",
      bullets: ["Fugas de losa", "Detección electrónica", "Rerouting de tuberías"],
    },
  },
  {
    Icon: Bath,
    en: {
      title: "Bathroom & Kitchen Remodeling",
      desc: "High-end fixture installation and complete plumbing rough-ins for your renovation projects. We turn your design vision into reality.",
      bullets: ["Custom showers", "Island sinks", "Fixture upgrades"],
    },
    es: {
      title: "Remodelación de Baño y Cocina",
      desc: "Instalación de accesorios de alta gama y trabajos de plomería completos para sus proyectos de renovación. Hacemos realidad su visión de diseño.",
      bullets: ["Duchas personalizadas", "Fregaderos de isla", "Actualización de accesorios"],
    },
  },
  {
    Icon: Droplets,
    en: {
      title: "Sump Pump Installation",
      desc: "Protect your basement from flooding. We install primary and battery-backup sump systems for reliable groundwater management.",
      bullets: ["Battery backups", "Pit installation", "Discharge routing"],
    },
    es: {
      title: "Instalación de Bomba de Sumidero",
      desc: "Proteja su sótano de inundaciones. Instalamos sistemas de bombeo primarios y de respaldo con batería para un manejo confiable de aguas subterráneas.",
      bullets: ["Respaldo con batería", "Instalación de foso", "Ruteo de descarga"],
    },
  },
  {
    Icon: Wrench,
    en: {
      title: "Emergency 24/7 Plumbing",
      desc: "When disaster strikes, our rapid response team is ready. We handle burst pipes, major backups, and no-hot-water emergencies around the clock.",
      bullets: ["Rapid dispatch", "Burst pipes", "After-hours support"],
    },
    es: {
      title: "Plomería de Emergencia 24/7",
      desc: "Cuando surge un desastre, nuestro equipo de respuesta rápida está listo. Manejamos tuberías reventadas, grandes obstrucciones y emergencias sin agua caliente a cualquier hora.",
      bullets: ["Despacho rápido", "Tuberías reventadas", "Soporte fuera de horario"],
    },
  },
  {
    Icon: Settings,
    en: {
      title: "Whole-House Repiping",
      desc: "Replace aging galvanized or polybutylene pipes with modern PEX or copper. Improve water pressure and eliminate rusty water.",
      bullets: ["PEX routing", "Copper systems", "Minimal drywall impact"],
    },
    es: {
      title: "Retuberización de Casa Completa",
      desc: "Reemplace tuberías de galvanizado o polibutileno antiguas con PEX moderno o cobre. Mejore la presión del agua y elimine el agua oxidada.",
      bullets: ["Ruteo de PEX", "Sistemas de cobre", "Mínimo impacto en drywall"],
    },
  },
  {
    Icon: ShieldCheck,
    en: {
      title: "Water Filtration Systems",
      desc: "Enjoy pure, great-tasting water from every tap. We install whole-house softeners, reverse osmosis systems, and under-sink filters.",
      bullets: ["Whole-house systems", "Reverse osmosis", "Water softeners"],
    },
    es: {
      title: "Sistemas de Filtración de Agua",
      desc: "Disfrute agua pura y de buen sabor de cada grifo. Instalamos suavizadores para toda la casa, sistemas de ósmosis inversa y filtros bajo el fregadero.",
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
