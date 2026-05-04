// File: src/timelineData.ts

export type JobEntry = {
  id: string;
  type: 'job';
  company: string;
  role: string;
  period: string;
  startYear: number;
  endYear: number | null;
  logoUrl?: string;
  accent: string;
  highlight?: string;
  bullets: string[];
  note?: string;
};

export type ProjectEntry = {
  id: string;
  type: 'project';
  title: string;
  tagline: string;
  platforms: string[];
  story: string;
  links?: { label: string; url: string }[];
  accent: string;
  startYear: number;
  endYear: number | null;
};

export type TimelineEntry = JobEntry | ProjectEntry;

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'infodump',
    type: 'job',
    company: 'The InfoDump LLC',
    role: 'Founder',
    period: '2023 – Present',
    startYear: 2023,
    endYear: null,
    logoUrl: 'https://theinfodump.com/favicon.svg',
    accent: '#50d2be',
    highlight: 'Founded, built, and shipped a multi-platform app to real users on four platforms',
    bullets: [
      'Founded an independent, one-person software studio out of Oregon',
      'Shipped Linear Timer+ natively on iOS, macOS, iPadOS, and as a Chrome Extension',
      'Built and maintains theinfodump.com — studio site, product pages, and Android beta pipeline',
      'Operates on a simple principle: useful, honest, quiet — no tracking, no ads, no dark patterns',
    ],
  },
  {
    id: 'linear-timer',
    type: 'project',
    title: 'Linear Timer+',
    tagline: 'Built it because I needed it. Shipped it because others did too.',
    platforms: ['iOS', 'macOS', 'iPadOS', 'Chrome'],
    story:
      'I wanted a timer that stayed out of my way — no clutter, no accounts, just a clean visual countdown that lived where I was working. Every timer app I tried either did too much or felt designed by committee. So I built one. Linear Timer+ runs natively on iOS, macOS, and iPad, with a Chrome Extension for people who live in their browser. It\'s in real hands, on real devices, doing exactly what it says it does.',
    accent: '#6366f1',
    startYear: 2023,
    endYear: null,
  },
  {
    id: 'powin',
    type: 'job',
    company: 'Powin Energy',
    role: 'Sr. DevOps & QA Engineer',
    period: '2024 – Aug 2025',
    startYear: 2024,
    endYear: 2025,
    logoUrl: 'https://logo.clearbit.com/powin.com',
    accent: '#22c55e',
    note: 'Promoted from Quality Engineer after 6 months',
    highlight: 'Owned test strategy and infrastructure reliability at the same time',
    bullets: [
      'Built state-based Postman tests validating HVAC platform behavior across edge conditions',
      'Automated segmented lab routing, SSH config management, and remote deployments',
      'Created Python tooling to manage Docker container configurations and YAML manifests',
      'Bridged QA and DevOps: one person accountable for both what ships and how it runs',
    ],
  },
  {
    id: 'siemens',
    type: 'job',
    company: 'Siemens DISW',
    role: 'QA Lead',
    period: '2020 – 2024',
    startYear: 2020,
    endYear: 2024,
    logoUrl: 'https://logo.clearbit.com/siemens.com',
    accent: '#0070d2',
    highlight: 'Cut regression testing from 18 hours to under 2',
    bullets: [
      'Led QA across global teams for high-traffic marketing and digital experience platforms',
      'Reduced regression cycle from 18 hours to under 2 with BrowserStack automation',
      'Embedded QA into sprint ceremonies, building trust across engineering and product orgs',
      'Mentored junior QA engineers and standardized test coverage reporting across the org',
    ],
  },
  {
    id: 'webmd',
    type: 'job',
    company: 'WebMD Health Services',
    role: 'Sr. QA Analyst',
    period: '2011 – 2020',
    startYear: 2011,
    endYear: 2020,
    logoUrl: 'https://logo.clearbit.com/webmd.com',
    accent: '#e04e39',
    highlight: 'Built automation that cut test execution time by 16×',
    bullets: [
      'Led QA for enterprise wellness platform implementations across major health insurance clients',
      'Developed automation tooling that reduced test execution time by 16×',
      'Built internal tools for test data creation, import pipelines, and environment validation',
      'Primary QA contact for client-facing delivery and UAT readiness across major releases',
    ],
  },
];
