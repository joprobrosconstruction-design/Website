"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Global Tech Semiconductor Fab",
    type: "Commercial",
    location: "Austin, TX",
    scale: "5M Plumbing & High-Purity Water Systems",
    image: "/images/fab.png",
  },
  {
    id: 2,
    title: "Mercy General Hospital Expansion",
    type: "Commercial",
    location: "Chicago, IL",
    scale: "$8.5M Medical Gas & Waste Systems",
    image: "/images/hospital.png",
  },
  {
    id: 3,
    title: "Nexus Office Tower",
    type: "Commercial",
    location: "Seattle, WA",
    scale: "40-Story Water Distribution & HVAC Plumbing",
    image: "/images/office.png",
  },
  {
    id: 4,
    title: "Industrial Manufacturing Plant",
    type: "Commercial",
    location: "Detroit, MI",
    scale: "Heavy Process Piping & Fire Suppression",
    image: "/images/industrial.png",
  },
  {
    id: 5,
    title: "The Pinnacle Luxury Apartments",
    type: "Residential",
    location: "Miami, FL",
    scale: "300-Unit Full Plumbing Fit-Out",
    bg: "bg-gradient-to-br from-indigo-900 to-slate-800",
  },
  {
    id: 6,
    title: "Oak Ridge Estate",
    type: "Residential",
    location: "Beverly Hills, CA",
    scale: "Custom Fixtures & Radiant Heating",
    bg: "bg-gradient-to-br from-slate-800 to-gray-900",
  },
  {
    id: 7,
    title: "Downtown Restaurant Hub",
    type: "Commercial",
    location: "New York, NY",
    scale: "Grease Traps & Commercial Kitchen Plumbing",
    bg: "bg-gradient-to-br from-blue-900 to-slate-900",
  },
  {
    id: 8,
    title: "Historic Brownstone Repipe",
    type: "Residential",
    location: "Boston, MA",
    scale: "Whole-House Historic Preservation Repipe",
    bg: "bg-gradient-to-br from-slate-900 to-indigo-950",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(
    (p) => filter === "All" || p.type === filter
  );

  return (
    <main className="min-h-screen pt-24 bg-background">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-foreground to-foreground z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl text-primary-foreground/80">
            From multi-million dollar commercial infrastructure to high-end residential estates, explore our track record of excellence.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <Filter className="w-5 h-5" />
            <span>Filter Projects:</span>
          </div>
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            {["All", "Commercial", "Residential"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  filter === f
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`filter-${f.toLowerCase()}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[4/3] bg-muted cursor-pointer"
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`absolute inset-0 ${project.bg} opacity-90 transition-transform duration-500 group-hover:scale-105`}></div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-300">
                    <div className="mb-4">
                      <span className={`inline-block py-1 px-3 rounded-md text-xs font-bold ${
                        project.type === 'Commercial' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                      }`}>
                        {project.type}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-white/80 text-sm">
                      <span>{project.location}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="font-semibold text-white">{project.scale}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Let's discuss how Premier Plumbing can bring our expertise to your next build.
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Request an Estimate <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
