export interface TechItem {
  label: string;
  category: "backend" | "frontend" | "ml" | "infra" | "db" | "mobile";
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  github: string;
  stats: ProjectStat[];
  tech: TechItem[];
  features: ProjectFeature[];
  architecture: string;
  version: string;
  generated: string;
}

export const projects: Project[] = [
  {
    slug: "ilgc-tracker",
    number: "01",
    name: "University Housekeeping Management System",
    tagline: "AI-Powered Campus Housekeeping & Hygiene Compliance Tracker",
    summary:
      "A full-stack AI system solving a persistent campus hygiene problem - essential supplies like soap and tissue going unrefilled for days. Gives residents an instant way to report shortages, uses ML to auto-categorize and prioritize complaints, and gives administrators real-time visibility into compliance gaps.",
    problem:
      "Recurring housekeeping lapses on campus - essential hygiene supplies (tissues, soaps) go unrefilled for up to 4 consecutive days. No structured system for residents to report shortages, no tracking of replenishment schedules, and no accountability mechanism for housekeeping staff.",
    solution:
      "Track-based login (Admin / Housekeeping / Faculty-Student) with role-specific dashboards. Building/Floor/Direction-wise washroom data tracking. Supply inventory monitoring (soap, tissue, sanitizer). AI complaint analysis across 12 categories. Priority prediction with hygiene issues auto-flagged high/urgent. 2-way work verification (LLM image analysis + supervisor approval). False reporting detection. Predictive maintenance to anticipate supply shortages.",
    github: "https://github.com/DisturbedSage5840C",
    version: "3.1.0",
    generated: "14 March 2026",
    stats: [
      { value: "59", label: "Source Files" },
      { value: "11,500+", label: "Lines of Code" },
      { value: "50+", label: "API Endpoints" },
      { value: "6", label: "Docker Services" },
      { value: "14", label: "DB Tables" },
      { value: "12", label: "ML Categories" },
    ],
    tech: [
      { label: "Node.js", category: "backend" },
      { label: "Express.js", category: "backend" },
      { label: "FastAPI", category: "backend" },
      { label: "Python 3.11", category: "backend" },
      { label: "PostgreSQL 16", category: "db" },
      { label: "Redis 7", category: "db" },
      { label: "Docker + Compose", category: "infra" },
      { label: "Nginx 1.25", category: "infra" },
      { label: "React Native", category: "mobile" },
      { label: "scikit-learn", category: "ml" },
      { label: "Random Forest", category: "ml" },
      { label: "Gradient Boosting", category: "ml" },
      { label: "TextBlob + NLTK", category: "ml" },
      { label: "spaCy", category: "ml" },
      { label: "JWT Auth", category: "backend" },
      { label: "Knex.js ORM", category: "backend" },
      { label: "Prometheus", category: "infra" },
    ],
    features: [
      {
        title: "AI Complaint Analysis",
        description:
          "Random Forest classifier (200 trees, 12 categories, ~85% accuracy) auto-categorizes complaints. Gradient Boosting predictor assigns priority levels. TF-IDF vectorizer with 5000 features and 1-3 word n-grams.",
      },
      {
        title: "NLP Sentiment Pipeline",
        description:
          "TextBlob sentiment analysis (polarity -1 to 1), custom urgency keyword detection across 4 levels, regex entity extraction for rooms and supply items, language quality scoring.",
      },
      {
        title: "2-Way Work Verification",
        description:
          "Cleaning staff upload photo proof. LLM verifies image for cleanliness/completion. Supervisor then reviews and approves - dual accountability at every step.",
      },
      {
        title: "Role-Based Dashboards",
        description:
          "Four distinct roles - Admin, Supervisor, Cleaning Staff, Student/Faculty - each with tailored dashboards, permissions, and workflow controls.",
      },
      {
        title: "Supply Inventory Tracking",
        description:
          "Building-wise real-time tracking of soap, tissue, and sanitizer levels (0-100%). Consumption-based reminders sent to supervisors before stockouts occur.",
      },
      {
        title: "Predictive Maintenance",
        description:
          "Historical complaint pattern analysis, peak time prediction, room-level risk scoring, and complaint volume forecasting to get ahead of hygiene failures.",
      },
    ],
    architecture:
      "6-container Docker deployment: PostgreSQL 16 (14 tables, UUID PKs, JSONB for AI data) -> Redis 7 (session cache, API response cache) -> Python FastAPI AI Service (4 Uvicorn workers, ML models) -> Node.js Express API (4 cluster workers, 9 route modules) -> Nginx 1.25 (SSL termination, rate limiting, gzip) -> React Native mobile shell.",
  },
  {
    slug: "rwe-tracker",
    number: "02",
    name: "RWE Tracker",
    tagline: "Real-World Evidence Perception Platform",
    summary:
      "A platform that quantifies the gap between clinical trial claims and real-world patient perception for monitored drugs. Ingests data from OpenFDA, ClinicalTrials.gov, and Reddit, runs NLP and statistical analysis, then publishes perception reports with trend, gap, and insight views.",
    problem:
      "Medical affairs and safety teams rely on one-off spreadsheets to compare clinical trial outcomes against real-world patient experience. There is no repeatable, auditable signal pipeline for tracking how patients actually perceive a drug versus what trials promised.",
    solution:
      "Tenant-aware drug tracking with role-based access. Asynchronous ingestion and analysis jobs with progress polling. Gap breakdown across 7 dimensions: efficacy, safety, tolerability, convenience, quality of life, adherence, and trust. Per-drug trend views over configurable windows. Structured source metrics embedded in final report payloads for full traceability.",
    github: "https://github.com/DisturbedSage5840C/rwe-tracker",
    version: "1.0.0",
    generated: "24 March 2026",
    stats: [
      { value: "19", label: "API Endpoints" },
      { value: "5", label: "Celery Tasks" },
      { value: "10", label: "Domain Models" },
      { value: "131", label: "Source Files" },
      { value: "3", label: "Alembic Migrations" },
      { value: "7", label: "Gap Dimensions" },
    ],
    tech: [
      { label: "Next.js 14", category: "frontend" },
      { label: "TypeScript", category: "frontend" },
      { label: "SWR", category: "frontend" },
      { label: "Recharts", category: "frontend" },
      { label: "FastAPI", category: "backend" },
      { label: "Python 3.11", category: "backend" },
      { label: "Celery 5", category: "backend" },
      { label: "SQLAlchemy", category: "db" },
      { label: "Alembic", category: "db" },
      { label: "PostgreSQL", category: "db" },
      { label: "Redis 7", category: "db" },
      { label: "RoBERTa", category: "ml" },
      { label: "VADER + NLTK", category: "ml" },
      { label: "SentenceTransformers", category: "ml" },
      { label: "Docker Compose", category: "infra" },
      { label: "GitHub Actions", category: "infra" },
    ],
    features: [
      {
        title: "Multi-Source Ingestion",
        description:
          "Parallel async ingestion from OpenFDA (paginated adverse-event pulls), ClinicalTrials.gov (paginated studies with token cycle guard), and Reddit (OAuth path with automatic public JSON fallback). All source outcomes persisted in report payload under source_metrics.",
      },
      {
        title: "NLP Perception Pipeline",
        description:
          "VADER lexical sentiment with custom lexicon, RoBERTa transformer classifier (cardiffnlp/twitter-roberta-base-sentiment-latest), SentenceTransformer embeddings (all-MiniLM-L6-v2) for clustering, and composite gap scoring across 7 clinical dimensions.",
      },
      {
        title: "Async Job Orchestration",
        description:
          "Celery chord pattern: parallel ingestion subtasks (OpenFDA + Reddit + ClinicalTrials) followed by gap analysis callback. Frontend polls job status endpoint until SUCCESS, then renders full report.",
      },
      {
        title: "Tenant-Aware RBAC",
        description:
          "Organization-scoped data isolation. Four roles: OWNER, ADMIN, ANALYST, VIEWER. JWT token flow with refresh token rotation. Machine auth via hashed API keys.",
      },
      {
        title: "Gap Dimension Analysis",
        description:
          "Structured breakdown across efficacy, safety, tolerability, convenience, quality of life, adherence, and trust. Each dimension scored and compared against clinical trial benchmarks.",
      },
      {
        title: "Trend & Comparison Views",
        description:
          "Time-series trend points per drug over configurable windows. Cross-drug metric comparison. Structured source_metrics in every report payload for full auditability.",
      },
    ],
    architecture:
      "Microservice architecture: Next.js 14 frontend (BFF routes, SWR polling, Recharts) -> FastAPI primary API (auth, drug lifecycle, analysis endpoints) -> Celery workers (ingestion + analysis orchestration) -> NLP FastAPI microservice (sentiment + gap pipeline) -> PostgreSQL (SQLAlchemy + Alembic migrations) + Redis (broker/result backend) + Flower (task monitoring UI).",
  },
  {
    slug: "amate",
    number: "03",
    name: "AMATE — Adaptive Multi-Agent Task Engine",
    tagline: "Horizontally Scalable, Feedback-Driven Multi-Agent AI System",
    summary:
      "AMATE decomposes complex user goals into a directed acyclic graph (DAG) of parallelisable subtasks and routes each subtask to a specialised agent — Research, Code, Analysis, or Writer. Every output is scored by a three-agent Validation & QA layer (Fact-Check, Critic, Safety). Outputs that pass the 0.80 composite threshold move through Refinement, Compression, and Format agents before final delivery. All outcomes are written to a Learning Store for continuous policy improvement.",
    problem:
      "Single-agent LLM pipelines hit a quality ceiling: they cannot parallelise subtasks, cannot self-verify factual accuracy, cannot enforce safety policy at delivery time, and have no mechanism to retry only the weakest section of a response. Every failure requires a full re-run at full token cost.",
    solution:
      "A three-layer pipeline: (1) Orchestration — Intake, Planner (DAG), Router/Dispatcher with shared Redis Context Store and Task Queue. (2) Execution — horizontally scalable agent worker pool (Research, Code, Analysis, Writer) sharing a Tool Layer (APIs, vector DB, browser, calculator). (3) Validation — simultaneous scoring by Fact-Check (30%), Critic (40%), and Safety (30%) agents; composite score gate at ≥ 0.80; targeted retry on weakest section (max 2×) before full retry; Timeout Guard, exponential-backoff Retry Manager, Fallback Agent (haiku-class), circuit breaker, and human escalation queue.",
    github: "https://github.com/DisturbedSage5840C",
    version: "1.0",
    generated: "May 2026",
    stats: [
      { value: "15", label: "Agent Prompts" },
      { value: "4", label: "Execution Agent Types" },
      { value: "≥ 0.80", label: "Quality Gate Score" },
      { value: "3×", label: "Max Retry Attempts" },
      { value: "4", label: "Implementation Phases" },
      { value: "12 wks", label: "Build Roadmap" },
    ],
    tech: [
      { label: "Python 3.12", category: "backend" },
      { label: "asyncio", category: "backend" },
      { label: "FastAPI", category: "backend" },
      { label: "Anthropic Claude (Sonnet 4 / Haiku)", category: "ml" },
      { label: "Redis Streams", category: "db" },
      { label: "Celery", category: "backend" },
      { label: "PostgreSQL 16", category: "db" },
      { label: "pgvector / Pinecone", category: "db" },
      { label: "Docker", category: "infra" },
      { label: "Kubernetes + HPA", category: "infra" },
      { label: "OpenTelemetry", category: "infra" },
      { label: "Jaeger", category: "infra" },
      { label: "Prometheus + Grafana", category: "infra" },
      { label: "GitHub Actions + ArgoCD", category: "infra" },
      { label: "HashiCorp Vault", category: "infra" },
    ],
    features: [
      {
        title: "DAG-Based Task Planner",
        description:
          "Planner Agent decomposes any goal into a dependency DAG of up to 8 subtasks, each assigned to exactly one agent type. Topological sort determines execution order; independent subtasks run in parallel via asyncio task groups.",
      },
      {
        title: "Composite Scoring Gate",
        description:
          "Three QA agents score simultaneously: Fact-Check (30% — source citation rate, contradiction count), Critic (40% — coherence, completeness, clarity), Safety (30% — hard block on policy violation). Score ≥ 0.80 required for delivery.",
      },
      {
        title: "Targeted Retry Loop",
        description:
          "If composite score is 0.50–0.79, the Critic identifies the weakest section and the Planner creates a targeted re-run for that section only — max 2 targeted retries before escalating to a full retry. Exponential backoff: 1 s → 2 s → 4 s.",
      },
      {
        title: "Fallback & Circuit Breaker",
        description:
          "After 3 failed attempts, the Fallback Agent (lighter model, reduced scope) produces a '[DEGRADED OUTPUT]' response. A circuit breaker opens if P99 latency for any agent type exceeds 8 s over a 2-minute window, automatically rerouting to Fallback.",
      },
      {
        title: "Token Budget Management",
        description:
          "Each task receives a token budget at planning time (low: 1 000 / medium: 4 000 / high: 12 000). Compressor Agent fires proactively at 80% consumption. Hard stop at 100%: output truncated gracefully with summary appended.",
      },
      {
        title: "Learning Store & Observability",
        description:
          "All task outcomes are written async to an append-only Learning Store (nightly batch → policy updates, prompt cache). Full OpenTelemetry traces per task in Jaeger; Prometheus metrics (score distribution, retry rate, token utilisation, P50/P95/P99 latency) visualised in Grafana.",
      },
    ],
    architecture:
      "Orchestration Layer (Intake Agent → Planner Agent DAG → Router/Dispatcher, shared Redis Context Store + Task Queue) → Execution Agent Pool (Research, Code, Analysis, Writer — parallel where dependency graph allows, Tool Layer: APIs, vector DB, browser, calculator) → Aggregator Agent (confidence-weighted conflict resolution) → Validation & QA Layer (Fact-Check + Critic + Safety simultaneous, composite score gate ≥ 0.80) → Optimization Layer (Refinement → Compressor → Format & Persona, sequential) → Learning Store (async, nightly batch). Failure path: Timeout Guard + Retry Manager (exp. backoff, max 3×) → Fallback Agent → human escalation queue. Infra: Kubernetes HPA (scale-out at queue depth > 20), Redis Streams, PostgreSQL 16, pgvector/Pinecone, OpenTelemetry + Jaeger + Prometheus + Grafana, HashiCorp Vault.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
