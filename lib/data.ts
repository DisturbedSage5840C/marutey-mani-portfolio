export type NavItem = {
  label: string;
  href: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroData = {
  id: string;
  ghostText: string;
  eyebrow: string;
  firstName: string;
  lastName: string;
  description: string;
  ctas: Array<{ label: string; href: string; variant: "primary" | "ghost"; external?: boolean }>;
  stats: HeroStat[];
};

export type SkillCell = {
  label: string;
  items: string;
};

export type InfoRow = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type AboutData = {
  id: string;
  tag: string;
  headingStart: string;
  headingEmphasis: string;
  paragraphs: string[];
  skills: SkillCell[];
  infoRows: InfoRow[];
};

export type ExperienceItem = {
  org: string;
  period: string;
  category: string;
  role: string;
  bullets: string[];
};

export type ExperienceData = {
  id: string;
  tag: string;
  headingStart: string;
  headingEmphasis: string;
};

export type ProjectItem = {
  number: string;
  name: string;
  description: string;
  stack: Array<{ label: string; accent?: boolean }>;
};

export type ProjectsData = {
  id: string;
  tag: string;
  headingStart: string;
  headingEmphasis: string;
  intro: string;
};

export type ResearchItem = {
  title: string;
  meta?: string;
  status: "Published" | "Ongoing" | "Complete";
};

export type ResearchData = {
  id: string;
  tag: string;
  headingStart: string;
  headingEmphasis: string;
};

export type LeadershipItem = {
  label: string;
  title: string;
  subtitle: string;
};

export type LeadershipData = {
  id: string;
  tag: string;
  headingStart: string;
  headingEmphasis: string;
  intro: string;
};

export type AwardItem = {
  name: string;
  mark: string;
};

export type AwardsData = {
  id: string;
  tag: string;
  headingStart: string;
  headingEmphasis: string;
};

export type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ContactData = {
  id: string;
  tag: string;
  headingStart: string;
  headingEmphasis: string;
  links: ContactLink[];
};

export type FooterData = {
  copyright: string;
  location: string;
};

export const person = {
  name: "Marutey Mani",
  title: "B.Tech CS & AI Student, Plaksha University",
  location: "Lucknow, Uttar Pradesh, India",
  email: "maruteymani31@gmail.com",
  linkedin: "https://www.linkedin.com/in/marutey-mani-7ab79b283/",
  github: "https://github.com/DisturbedSage5840C",
  portfolio: "https://drive.google.com/drive/folders/1bQgFxzm_B3OMxLi-ZVbJGiARwwHuI-s8?usp=sharing",
  publishedAt: "The Shillong Times",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export const heroData: HeroData = {
  id: "hero",
  ghostText: "Mani",
  eyebrow: "CS & AI · Plaksha University · 2025-Present",
  firstName: "Marutey",
  lastName: "Mani.",
  description:
    "Engineering student navigating the intersection of technology, governance, design, and community - builder, designer, and researcher with roots in operations, media, and social impact.",
  ctas: [
    { label: "View Portfolio", href: person.portfolio, variant: "primary", external: true },
    { label: "GitHub", href: person.github, variant: "ghost", external: true },
    { label: "Get in Touch", href: "#contact", variant: "ghost" },
  ],
  stats: [
    { value: "9+", label: "Organizations" },
    { value: "2", label: "Ventures Founded" },
    { value: "96.75%", label: "Class XII Score" },
  ],
};

export const aboutData: AboutData = {
  id: "about",
  tag: "About",
  headingStart: "Multi-domain",
  headingEmphasis: "operator.",
  paragraphs: [
    "B.Tech student in Computer Science & Artificial Intelligence at Plaksha University. I pair technical rigour with a creative and operational edge spanning robotics teams, NGOs, graphic design, and published research.",
    "Whether managing a Mars Rover project's media pipeline, founding a digital literacy initiative, or writing about crypto governance for national newspapers, I bring systems thinking to every context.",
  ],
  skills: [
    { label: "Programming", items: "Java · Python · C/C++ · DSA" },
    { label: "Web Dev", items: "HTML · CSS · JavaScript · Node.js" },
    { label: "Design", items: "Figma · Canva · Adobe Premiere · DaVinci" },
    { label: "ML / Data", items: "NLP · FastAPI · PostgreSQL · Redis" },
  ],
  infoRows: [
    { label: "Location", value: "Lucknow, Uttar Pradesh, India" },
    { label: "Institution", value: "Plaksha University, Mohali" },
    { label: "Degree", value: "B.Tech CS & AI (2025-Present)" },
    { label: "Class XII", value: "ISC - 96.75% (PCM + CS)" },
    { label: "Class X", value: "ICSE - 98.6% · AIR 7" },
    { label: "SAT · PTE", value: "1460 · 75/90" },
    { label: "Email", value: "maruteymani31@gmail.com", href: "mailto:maruteymani31@gmail.com" },
    { label: "LinkedIn", value: "marutey-mani ->", href: person.linkedin, external: true },
    { label: "GitHub", value: "DisturbedSage5840C ->", href: person.github, external: true },
  ],
};

export const experienceData: ExperienceData = {
  id: "experience",
  tag: "Experience",
  headingStart: "What I've",
  headingEmphasis: "built & led.",
};

export const experienceItems: ExperienceItem[] = [
  {
    org: "Kalki Robotics - URC",
    period: "Aug 2025 - Jan 2026",
    category: "University",
    role: "Management & Media",
    bullets: [
      "Managed cross-functional operations for Plaksha's Mars Rover project",
      "Coordinated with sponsors, partners & competition bodies (URC)",
      "Directed technical video production, reels & sponsor assets",
      "Drafted proposals, compliance docs & formal submissions",
    ],
  },
  {
    org: "Prajvalan Co.",
    period: "Feb 2026 - Present",
    category: "Internship",
    role: "Graphic Design Intern",
    bullets: [
      "Design posters, branding assets & podcast visuals",
      "Visual storytelling for an entrepreneurship community platform",
      "Support content for networking across businesses & creators",
    ],
  },
  {
    org: "CTLC - Plaksha",
    period: "Aug 2025 - Present",
    category: "Student Role",
    role: "Student Associate - Design & Content",
    bullets: [
      "Design educational visuals: posters, thumbnails, creatives",
      "Support gamified learning module development",
      "Produce podcast visuals & academic content assets",
    ],
  },
  {
    org: "EcoSentinels Foundation",
    period: "2024 - Present",
    category: "NGO",
    role: "Managing Director",
    bullets: [
      "Oversee NGO operations, campaigns & environmental outreach",
      "Manage volunteers & coordinate large-scale initiatives in Lucknow",
    ],
  },
  {
    org: "CyberSahyog",
    period: "2023 - Present",
    category: "Founder",
    role: "Co-Founder & Managing Director",
    bullets: [
      "Founded digital literacy initiative serving Lucknow communities",
      "Developed content strategy & led grassroots outreach programs",
    ],
  },
  {
    org: "TechCurators",
    period: "Jun-Aug 2024",
    category: "Internship",
    role: "Video Editing Intern",
    bullets: [
      "Edited professional marketing videos in Premiere & DaVinci Resolve",
      "Optimized production workflows for timely delivery",
    ],
  },
  {
    org: "Spotlight - Drama Club",
    period: "Jan 2026 - Present",
    category: "University",
    role: "Stage & Technical Department",
    bullets: [
      "Lead lighting department operations & execution",
      "Handle physical design and stage setup planning",
    ],
  },
  {
    org: "Project Udaan",
    period: "Dec 2024 - Mar 2025",
    category: "Social",
    role: "Head of Operations",
    bullets: [
      "Managed volunteer activities and logistics",
      "Led First Aid Drive and welfare initiatives in Lucknow",
    ],
  },
];

export const projectsData: ProjectsData = {
  id: "projects",
  tag: "Projects",
  headingStart: "Things I've",
  headingEmphasis: "shipped.",
  intro: "Technical builds combining full-stack engineering with real-world data pipelines and ML integration.",
};

export const projectItems: ProjectItem[] = [
  {
    number: "01",
    name: "University Housekeeping Management System",
    description:
      "AI-powered campus hygiene tracking with ML-based complaint categorisation, NLP sentiment analysis, and predictive maintenance. Features role-based dashboards for Admin, Staff, and Students.",
    stack: [
      { label: "Node.js" },
      { label: "Python (FastAPI)" },
      { label: "PostgreSQL" },
      { label: "Redis" },
      { label: "Docker" },
      { label: "ML · NLP", accent: true },
    ],
  },
  {
    number: "02",
    name: "RWE Tracker - Real-World Evidence Platform",
    description:
      "Analyses the gap between clinical trial claims and real-world patient sentiment. Integrates NLP pipelines, sentiment models, and multi-source ingestion from OpenFDA, Reddit, and ClinicalTrials. Async processing via FastAPI + Celery.",
    stack: [
      { label: "Next.js" },
      { label: "FastAPI" },
      { label: "PostgreSQL" },
      { label: "Redis" },
      { label: "Celery" },
      { label: "NLP · Sentiment", accent: true },
    ],
  },
];

export const researchData: ResearchData = {
  id: "research",
  tag: "Research & Writing",
  headingStart: "Ideas I'm",
  headingEmphasis: "investigating.",
};

export const researchItems: ResearchItem[] = [
  {
    title: "How Crypto Grew Up: Why It Might Finally Belong Inside Government",
    meta: "The Shillong Times - November 2025",
    status: "Published",
  },
  {
    title: "Cryptocurrency & Dark Web Financial Cybercrime",
    status: "Ongoing",
  },
  {
    title: "Machine Learning Algorithms for Predictive Analysis",
    status: "Ongoing",
  },
  {
    title: "World War I: Technological Innovations and Engineering Impact",
    status: "Complete",
  },
  {
    title:
      "When Time Collapses: Rethinking the Historical Logic of Technological Evolution in High-Velocity Cultural Systems",
    status: "Ongoing",
  },
];

export const leadershipData: LeadershipData = {
  id: "leadership",
  tag: "Leadership & Campus",
  headingStart: "Roles &",
  headingEmphasis: "involvement.",
  intro: "From Head Boy to MUN secretariats, I've led teams and communities across disciplines.",
};

export const leadershipItems: LeadershipItem[] = [
  {
    label: "Design Head",
    title: "Blockchain Bytes Club",
    subtitle: "Plaksha University · 2025-Present",
  },
  {
    label: "Stage & Technical",
    title: "Spotlight Drama Club",
    subtitle: "Lighting lead · Jan 2026-Present",
  },
  {
    label: "Head Boy",
    title: "City Montessori School",
    subtitle: "Jun 2023 - Jun 2025",
  },
  {
    label: "Design & Research",
    title: "Plaksha MUN Society",
    subtitle: "2025-Present · 8-9 conferences · 2 awards",
  },
  {
    label: "Head of Operations",
    title: "Project Udaan",
    subtitle: "Dec 2024 - Mar 2025",
  },
  {
    label: "Photographer · Guitarist",
    title: "Photo + Music Clubs",
    subtitle: "Plaksha · 2025-Present",
  },
];

export const awardsData: AwardsData = {
  id: "awards",
  tag: "Awards & Achievements",
  headingStart: "Recognition",
  headingEmphasis: "received.",
};

export const awardItems: AwardItem[] = [
  {
    name: "Bronze Medal - International Youth Mathematics Competition (IYMC)",
    mark: "International",
  },
  {
    name: "AIR 7 - ICSE Class X National Merit List",
    mark: "National Rank 7",
  },
  {
    name: "AIR 1518 - NSTSE (Class 9)",
    mark: "National",
  },
  {
    name: "3rd Place - Nawab Wajid Ali Shah Zoological Garden Quiz",
    mark: "Academic",
  },
  {
    name: "Senior Generation Global Member - SDG Dialogue",
    mark: "Global",
  },
  {
    name: "Harvard CS50: Introduction to Computer Science",
    mark: "Certification",
  },
];

export const contactData: ContactData = {
  id: "contact",
  tag: "Let's connect",
  headingStart: "Let's make",
  headingEmphasis: "something real.",
  links: [
    { label: "Email", href: `mailto:${person.email}` },
    { label: "LinkedIn", href: person.linkedin, external: true },
    { label: "GitHub", href: person.github, external: true },
    { label: "Portfolio Drive", href: person.portfolio, external: true },
  ],
};

export const footerData: FooterData = {
  copyright: "© 2026 Marutey Mani. All rights reserved.",
  location: "Lucknow, Uttar Pradesh, India",
};
