export type JobLang = {
  title?: string;
  desc: string;
  pay: string;
  hours: string;
  schedule: string;
  requirements: string[];
  experience: string;
};

export type Job = {
  id: string;
  title: string;
  type: string;
  desc: string;
  pay: string;
  hours: string;
  schedule: string;
  requirements: string[];
  experience: string;
  active: boolean;
  es?: JobLang;
};

export const jobs: Job[] = [
  {
    id: "general-helper",
    title: "General Helper",
    type: "1099 Contractor",
    desc: "Assist our crew on commercial and residential job sites. Tasks include material handling, site prep, cleanup, and supporting plumbers as directed.",
    pay: "Competitive — rate provided upon selection",
    hours: "Full day shifts, project-dependent",
    schedule: "Monday – Friday (occasional weekends based on project needs)",
    requirements: [
      "Reliable transportation to job site",
      "Ability to lift 50+ lbs",
      "Follow directions and work safely on an active job site",
      "Valid government-issued ID",
    ],
    experience: "No experience required — reliability and work ethic matter most",
    active: true,
    es: {
      desc: "Asistir a nuestro equipo licenciado en obras comerciales y residenciales. Las tareas incluyen manejo de materiales, preparación del sitio, limpieza y apoyo a los plomeros según se indique.",
      pay: "Competitivo — tarifa proporcionada al momento de la selección",
      hours: "Turnos de día completo, según el proyecto",
      schedule: "Lunes a viernes (fines de semana ocasionales según las necesidades del proyecto)",
      requirements: [
        "Transporte confiable al sitio de trabajo",
        "Capacidad para levantar más de 50 lbs",
        "Seguir instrucciones y trabajar de forma segura en una obra activa",
        "Identificación oficial vigente",
      ],
      experience: "No se requiere experiencia — la puntualidad y la ética de trabajo son lo más importante",
    },
  },
  {
    id: "fire-watcher",
    title: "Fire Watcher",
    type: "1099 Contractor",
    desc: "Monitor active job sites during and after hot work operations (welding, cutting, grinding) to detect and respond to fire hazards. You are a critical part of keeping the crew and property safe.",
    pay: "Competitive — rate provided upon selection",
    hours: "Full day shifts aligned with hot work schedule",
    schedule: "Monday – Friday (weekends possible on larger commercial projects)",
    requirements: [
      "Reliable transportation to job site",
      "Fire watch certification (or willingness to obtain before start)",
      "Ability to remain alert and on-post for extended periods",
      "Basic knowledge of fire extinguisher operation",
      "Valid government-issued ID",
    ],
    experience: "Entry-level welcome — attention to detail and responsibility are essential",
    active: true,
    es: {
      title: "Vigilante de Incendios",
      desc: "Monitorear los sitios de trabajo activos durante y después de operaciones de trabajo en caliente (soldadura, corte, esmerilado) para detectar y responder a peligros de incendio. Usted es una parte fundamental para mantener al equipo y la propiedad seguros.",
      pay: "Competitivo — tarifa proporcionada al momento de la selección",
      hours: "Turnos de día completo alineados con el horario de trabajo en caliente",
      schedule: "Lunes a viernes (fines de semana posibles en proyectos comerciales más grandes)",
      requirements: [
        "Transporte confiable al sitio de trabajo",
        "Certificación de vigilante de incendios (o disposición para obtenerla antes de comenzar)",
        "Capacidad para permanecer alerta y en su puesto durante períodos prolongados",
        "Conocimiento básico del uso de extintores",
        "Identificación oficial vigente",
      ],
      experience: "Nivel de entrada bienvenido — la atención al detalle y la responsabilidad son esenciales",
    },
  },
];
