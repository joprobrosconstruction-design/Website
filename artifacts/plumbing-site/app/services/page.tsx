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
  AlertTriangle
} from "lucide-react";

const COMMERCIAL_SERVICES = [
  {
    icon: <Settings className="w-8 h-8 text-primary" />,
    title: "Pipe Installation & Routing",
    desc: "Expert design and installation of complex distribution systems for large-scale commercial facilities. We handle everything from high-rise water supply to industrial process piping.",
    bullets: ["Copper & PEX systems", "Cast iron routing", "High-pressure lines"]
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Backflow Prevention & Testing",
    desc: "Protecting municipal water supplies from contamination. We install, test, and certify commercial backflow assemblies to ensure strict code compliance.",
    bullets: ["Annual certification", "RPZ installation", "Code compliance"]
  },
  {
    icon: <Droplets className="w-8 h-8 text-primary" />,
    title: "Grease Trap Service",
    desc: "Complete solutions for commercial kitchens and restaurants. We install high-capacity interceptors and provide maintenance routing to prevent costly backups.",
    bullets: ["Interceptor sizing", "New installations", "Compliance reporting"]
  },
  {
    icon: <Flame className="w-8 h-8 text-primary" />,
    title: "Fire Suppression Plumbing",
    desc: "Critical safety infrastructure for commercial buildings. Our certified fitters install reliable wet and dry standpipe systems that meet all fire codes.",
    bullets: ["Wet/Dry systems", "Standpipe installation", "Pump rooms"]
  },
  {
    icon: <Video className="w-8 h-8 text-primary" />,
    title: "Sewer Line Inspection & Repair",
    desc: "Advanced camera diagnostics to pinpoint blockages or structural failures without trenching. We offer trenchless repair options to minimize disruption.",
    bullets: ["Video diagnostics", "Hydro-jetting", "Trenchless relining"]
  },
  {
    icon: <Wind className="w-8 h-8 text-primary" />,
    title: "Commercial HVAC Plumbing",
    desc: "Supporting large-scale climate control systems. We route chilled water, boiler feeds, and condensation lines for massive commercial HVAC units.",
    bullets: ["Chiller piping", "Boiler systems", "Condensation routing"]
  },
  {
    icon: <Factory className="w-8 h-8 text-primary" />,
    title: "Industrial Process Piping",
    desc: "Specialized piping for manufacturing and processing facilities. We handle corrosive, high-temp, or high-pressure materials safely.",
    bullets: ["Stainless steel", "Chemical routing", "High-purity systems"]
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
    title: "Medical Gas Systems",
    desc: "Certified installation of medical gas piping for hospitals and clinics. We ensure absolute purity and reliable pressure for life-saving equipment.",
    bullets: ["Oxygen lines", "Vacuum systems", "Nitrous oxide"]
  }
];

const RESIDENTIAL_SERVICES = [
  {
    icon: <Flame className="w-8 h-8 text-primary" />,
    title: "Water Heater Installation",
    desc: "Upgrade to high-efficiency traditional or tankless water heaters. We ensure proper sizing for your household's peak demand.",
    bullets: ["Tankless upgrades", "Gas & Electric", "Recirculation pumps"]
  },
  {
    icon: <Droplet className="w-8 h-8 text-primary" />,
    title: "Drain Cleaning & Unclogging",
    desc: "Fast, effective clearing of stubborn blockages. We use professional-grade augers and hydro-jetters to restore full flow to your drains.",
    bullets: ["Main line clearing", "Root removal", "Hydro-jetting"]
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-primary" />,
    title: "Leak Detection & Repair",
    desc: "Pinpointing hidden slab leaks or wall leaks using non-invasive electronic detection. We fix the problem fast to minimize water damage.",
    bullets: ["Slab leaks", "Electronic detection", "Pipe rerouting"]
  },
  {
    icon: <Bath className="w-8 h-8 text-primary" />,
    title: "Bathroom & Kitchen Remodeling",
    desc: "High-end fixture installation and complete plumbing rough-ins for your renovation projects. We turn your design vision into reality.",
    bullets: ["Custom showers", "Island sinks", "Fixture upgrades"]
  },
  {
    icon: <Droplets className="w-8 h-8 text-primary" />,
    title: "Sump Pump Installation",
    desc: "Protect your basement from flooding. We install primary and battery-backup sump systems for reliable groundwater management.",
    bullets: ["Battery backups", "Pit installation", "Discharge routing"]
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: "Emergency 24/7 Plumbing",
    desc: "When disaster strikes, our rapid response team is ready. We handle burst pipes, major backups, and no-hot-water emergencies around the clock.",
    bullets: ["Rapid dispatch", "Burst pipes", "After-hours support"]
  },
  {
    icon: <Settings className="w-8 h-8 text-primary" />,
    title: "Whole-House Repiping",
    desc: "Replace aging galvanized or polybutylene pipes with modern PEX or copper. Improve water pressure and eliminate rusty water.",
    bullets: ["PEX routing", "Copper systems", "Minimal drywall impact"]
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Water Filtration Systems",
    desc: "Enjoy pure, great-tasting water from every tap. We install whole-house softeners, reverse osmosis systems, and under-sink filters.",
    bullets: ["Whole-house systems", "Reverse osmosis", "Water softeners"]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-foreground to-foreground z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Plumbing Services</h1>
          <p className="text-xl text-primary-foreground/80">
            From multi-phase commercial infrastructure to critical residential repairs, our licensed teams deliver precision and reliability.
          </p>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-muted">
          <div className="bg-primary/10 p-4 rounded-2xl">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Commercial Services</h2>
            <p className="text-muted-foreground mt-1">Engineered for scale and strict code compliance.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMERCIAL_SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col h-full hover:shadow-xl transition-shadow"
            >
              <div className="mb-6 bg-muted/50 w-16 h-16 rounded-xl flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{service.desc}</p>
              <ul className="space-y-2">
                {service.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Residential Services */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-muted">
          <div className="bg-primary/10 p-4 rounded-2xl">
            <Droplet className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Residential Services</h2>
            <p className="text-muted-foreground mt-1">Premium care for your home's most vital systems.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESIDENTIAL_SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col h-full hover:shadow-xl transition-shadow"
            >
              <div className="mb-6 bg-muted/50 w-16 h-16 rounded-xl flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{service.desc}</p>
              <ul className="space-y-2">
                {service.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="glass-dark rounded-3xl p-12 text-center bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Need Service?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Whether it's a minor repair or a massive installation, our team is ready to deliver premier results.
            </p>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-accent/20"
            >
              Request an Estimate <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
