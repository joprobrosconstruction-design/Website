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
};

export const jobs: Job[] = [
  {
    id: "general-helper",
    title: "General Helper",
    type: "1099 Contractor",
    desc: "Assist our licensed crew on commercial and residential job sites. Tasks include material handling, site prep, cleanup, and supporting plumbers as directed.",
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
  },
];
