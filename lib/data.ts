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
  slug: string;
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
  link?: string;
  external?: boolean;
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
  { label: "Showcase", href: "/showcase" },
  { label: "Contact", href: "#contact" },
];

export const heroData: HeroData = {
  id: "hero",
  ghostText: "Mani",
  eyebrow: "CS & AI · Plaksha University · 2025-Present",
  firstName: "Marutey",
  lastName: "Mani.",
  description:
    "First-year B.Tech (CS & AI) student at Plaksha building full-stack systems and production-grade clinical AI. Led a 20+ member cross-functional team, co-founded two NGOs, and spearheaded India's first university-staged musical.",
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
    { label: "Languages", items: "Java · Python · C · C++" },
    { label: "Backend", items: "Node.js · Express · FastAPI · Knex.js · JWT · Celery · WebSocket" },
    { label: "Frontend", items: "Next.js · React Native · Tailwind CSS · HTML · Vanilla JS" },
    { label: "Databases", items: "PostgreSQL · pgvector · Redis · Docker" },
    { label: "ML & AI", items: "XGBoost · CatBoost · SHAP · LIME · MAPIE · LSTM · GNN · NLP · RAG · BM25 · Semantic Search · Causal Discovery" },
    { label: "MLOps", items: "PyTorch · Helm · Terraform · Kubeflow · Prefect · Playwright · DVC · GitHub Actions · Fly.io" },
    { label: "Design", items: "Figma · Canva · Kittl · Adobe Premiere Pro · DaVinci Resolve · Photography · Videography" },
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
    period: "Aug 2025 – Jan 2026",
    category: "University",
    role: "Management & Media Lead",
    bullets: [
      "Orchestrated operations across 5 engineering subsystems within a 20+ member Mars Rover team, driving Plaksha's first URC competition entry",
      "Also managed media pipeline for CanSat (10th nationally, score 92.4)",
      "Secured 3+ sponsor relationships; authored all compliance documentation, proposals, and formal submissions",
      "Directed 5+ media assets and chaired all coordination meetings as sole operations lead",
    ],
  },
  {
    org: "Prajvalan Co.",
    period: "Feb 2026 – Present",
    category: "Internship",
    role: "Graphic Design Intern",
    bullets: [
      "Sole designer for end-to-end creative output — branding, podcast creatives, event posters, and campaigns — for an entrepreneurship platform connecting 100+ professionals",
      "Directed visual identity and storytelling strategy across all channels",
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
    period: "Jun 2024 – Present",
    category: "NGO",
    role: "Managing Director",
    bullets: [
      "Established foundation from inception; spearheaded 3+ environmental campaigns across Lucknow localities",
      "Mobilised volunteer teams across waste management and community awareness drives",
    ],
  },
  {
    org: "CyberSahyog",
    period: "Dec 2023 – Present",
    category: "Founder",
    role: "Co-Founder & Managing Director",
    bullets: [
      "Founded a grassroots digital literacy initiative; engineered original curriculum and executed 3+ workshops reaching 100–200 participants across multiple cities",
      "Managed 5+ volunteers; currently scaling for second-phase launch — rebuilding volunteer infrastructure and outreach strategy from the ground up",
    ],
  },
  {
    org: "TechCurators",
    period: "Jun – Aug 2024",
    category: "Internship",
    role: "Video Editing Intern",
    bullets: [
      "Delivered broadcast-quality marketing video content for agency clients",
      "Managed colour grading, audio mixing, and subtitling workflows to meet consistent on-time delivery standards",
    ],
  },
  {
    org: "Spotlight - Drama Club",
    period: "Jan 2026 – Present",
    category: "University",
    role: "Stage Lighting Lead & Physical Design",
    bullets: [
      "Spearheaded lighting design and live technical execution for Laila Majnu — India's first full-scale musical staged within a university",
      "Delivered a 50+ audience production with real-time lighting cues across all show nights",
      "Directed physical set construction and stage design planning",
    ],
  },
  {
    org: "Project Udaan",
    period: "Dec 2024 – Mar 2025",
    category: "Social",
    role: "Head of Operations",
    bullets: [
      "Directed volunteer logistics, welfare operations, and a community First Aid Drive across Lucknow under time-constrained field conditions",
    ],
  },
  {
    org: "Mental Health Awareness Programme (MHAP)",
    period: "Nov 2023 – Feb 2025",
    category: "Social",
    role: "Community Coordinator",
    bullets: [
      "Coordinated outreach and volunteer programming for a mental health awareness initiative over 16 months",
      "Managed event logistics, scheduling, and community engagement to widen access in underserved settings",
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
    slug: "racejudge",
    number: "01",
    name: "RaceJudge",
    description:
      "1,085 FIA stewards' decision PDFs scraped, parsed, and evidence-linked to race control messages, team radio transcripts (ASR-diarised), and lap telemetry across 7 F1 seasons (2019–2025). Hybrid BM25 + BGE-M3 semantic search over a pgvector HNSW index. Calibrated XGBoost 7-class penalty predictor with MAPIE conformal intervals and RAG rationale generation. Live WebSocket race mode surfaces precedents in under 5 seconds on investigation flags.",
    stack: [
      { label: "FastAPI · Python" },
      { label: "XGBoost · BGE-M3 · BM25" },
      { label: "pgvector · HNSW" },
      { label: "Next.js 15 · TypeScript" },
      { label: "Playwright · Prefect" },
      { label: "1,085 FIA Decisions", accent: true },
    ],
  },
  {
    slug: "ilgc-tracker",
    number: "02",
    name: "University Housekeeping Management System",
    description:
      "Role-based campus housekeeping platform across 5 university buildings. Supervisors mark facilities cleaned with mandatory photo proof, submit per-washroom hygiene checklists (6 line-items each), and manage supply inventory. Python AI microservice auto-classifies complaints and generates response suggestions. Auto-resets every 8 hours for shift discipline.",
    stack: [
      { label: "Node.js · Express" },
      { label: "PostgreSQL (Neon)" },
      { label: "Redis" },
      { label: "React Native · Expo" },
      { label: "Python AI Service" },
      { label: "Knex.js · JWT", accent: true },
    ],
  },
  {
    slug: "rwe-tracker",
    number: "03",
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
  {
    slug: "neurosynth",
    number: "04",
    name: "NeuroSynth",
    description:
      "Clinical AI decision-support platform classifying 6 neurological diseases (Alzheimer's, Parkinson's, MS, Epilepsy, ALS, Huntington's) from a 31-feature biomarker panel. 5-model calibrated ensemble achieves AUC 0.9408. Outputs 48-month LSTM trajectory forecasts, SHAP / LIME / counterfactual explanations, and Claude-generated SOAP clinical notes with FHIR R4 export.",
    stack: [
      { label: "FastAPI · Python" },
      { label: "XGBoost · CatBoost · scikit-learn" },
      { label: "SHAP · LIME · MAPIE" },
      { label: "React 18 · Vite" },
      { label: "Helm · Terraform · Kubeflow" },
      { label: "AUC 0.9408", accent: true },
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
    link: "https://theshillongtimes.com/2025/11/27/how-crypto-grew-up-why-it-might-finally-belong-inside-government/",
    external: true,
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
    title: "World War I: A Comprehensive Analysis",
    meta: "City Montessori School — Graded Academic Paper",
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
    subtitle: "2025-Present · 8+ conferences · High Commendation & Verbal Mention",
  },
  {
    label: "Head of Operations",
    title: "Project Udaan",
    subtitle: "Dec 2024 - Mar 2025",
  },
  {
    label: "Photographer · Guitarist · Vocalist",
    title: "Photo · Music · Makerforce",
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
    name: "AIR 7 - ICSE Class X National Merit List — Top 1% Nationwide",
    mark: "National Rank 7",
  },
  {
    name: "Bronze Medal - International Youth Mathematics Competition (IYMC)",
    mark: "International",
  },
  {
    name: "Head Boy — City Montessori School",
    mark: "2023 – 2025",
  },
  {
    name: "McKinsey Forward Program — Problem Solving, Leadership & Communication",
    mark: "Completed",
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
