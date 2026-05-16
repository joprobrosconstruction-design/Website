export type Job = {
  id: string;
  title: string;
  type: string;
  desc: string;
  active: boolean;
};

export const jobs: Job[] = [
  {
    id: "general-helper",
    title: "General Helper",
    type: "1099 Contractor",
    desc: "Assist our licensed crew on commercial and residential job sites. Tasks include material handling, site prep, cleanup, and supporting plumbers as directed. No experience required — we just need reliable, hardworking people.",
    active: true,
  },
];
