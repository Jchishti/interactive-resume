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
  dim?: boolean;
};

export type SectionDivider = {
  id: string;
  type: 'divider';
  label: string;
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

export type TimelineEntry = JobEntry | ProjectEntry | SectionDivider;

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
  {
    id: 'pre-career-divider',
    type: 'divider',
    label: 'Before the tech career',
  },
  {
    id: 'bsg',
    type: 'job',
    company: 'The Business Solutions Group',
    role: 'Business Analyst',
    period: '2009 – 2010',
    startYear: 2009,
    endYear: 2010,
    accent: '#64748b',
    dim: true,
    highlight: 'The job that started all of this',
    bullets: [
      'Translated client requirements into testing documentation for a software development team',
      'Guaranteed code quality produced by programmers — this was QA before I knew what QA was',
      'Bridged clients and developers across the full software delivery lifecycle',
    ],
  },
  {
    id: 'forest-service',
    type: 'job',
    company: 'U.S. Forest Service',
    role: 'Wildland Firefighter',
    period: 'Summer 2009',
    startYear: 2009,
    endYear: 2009,
    accent: '#4d7c0f',
    dim: true,
    highlight: '70–100 hour weeks',
    bullets: [
      'Fought wildfires across extreme terrain with a 20-person crew for an entire summer',
      'Hiked through brutal conditions carrying 45lbs of gear, day after day',
      'Was asked to come back full-time. Knew one summer was enough.',
    ],
  },
  {
    id: 'steven-moore',
    type: 'job',
    company: 'M. Steven Moore Company',
    role: 'Finance Intern',
    period: 'Summer 2008',
    startYear: 2008,
    endYear: 2008,
    accent: '#b45309',
    dim: true,
    highlight: 'Job title: Finance Intern. Actual job: IT.',
    bullets: [
      'Prevented business closures by troubleshooting hardware, reinstalling operating systems, and removing viruses',
      'Configured networks and printers; fielded customer health and life insurance questions',
      'Learned that “finance intern” can mean many things, most of them involving a screwdriver',
    ],
  },
  {
    id: 'ups',
    type: 'job',
    company: 'United Parcel Service',
    role: 'Driver Helper',
    period: '2007 – 2008',
    startYear: 2007,
    endYear: 2008,
    logoUrl: 'https://logo.clearbit.com/ups.com',
    accent: '#78350f',
    dim: true,
    highlight: 'Highest reviews of any driver helper in the Portland metro area',
    bullets: [
      'Delivered packages across Portland metro across two consecutive Christmas seasons',
      'Kept pace with veteran drivers; received the top driver helper reviews in the region',
    ],
  },
  {
    id: 'hillsboro',
    type: 'job',
    company: 'City of Hillsboro Parks & Rec',
    role: 'Utility Worker',
    period: '2006 – 2007',
    startYear: 2006,
    endYear: 2007,
    accent: '#6b7280',
    dim: true,
    highlight: '15% raise after 6 weeks',
    bullets: [
      'Streamlined daily maintenance operations across parks and recreation facilities',
      'Received a 15% raise after 6 weeks on the job; returned for a second summer',
    ],
  },
];
