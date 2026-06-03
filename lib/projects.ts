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
    slug: "racejudge",
    number: "01",
    name: "RaceJudge",
    tagline: "F1 Stewards' Precedent Engine: Semantic Search, Penalty Prediction & Live Race Intelligence",
    summary:
      "A production-grade F1 stewardship intelligence platform built from scratch — 1,085 FIA stewards' decision PDFs scraped, parsed, and structured across seven seasons (2019–2025), linked to team radio transcripts, race control messages, and lap telemetry. Hybrid BM25 + BGE-M3 semantic search over a pgvector HNSW index, a calibrated XGBoost 7-class penalty predictor, a RAG explanation layer, and a live WebSocket race mode delivering precedents in under 5 seconds on investigation flags. 132 pytest tests passing. Tiered monetisation: Free / $29 Pro / $499 Team / Enterprise.",
    problem:
      "F1 stewardship decisions are inconsistent and opaque — fans, journalists, and teams have no way to query historical precedents, understand why a penalty was or wasn't issued, or predict outcomes from incident descriptions. The FIA publishes decisions as individual PDFs with no cross-referencing, no searchability, and no link to the race data that caused the incident.",
    solution:
      "RaceJudge ingests every FIA stewards' decision PDF across 7 seasons, links each incident to race control messages, team radio (ASR-transcribed and speaker-diarised), and lap telemetry — building the only searchable, evidence-linked FIA decision corpus in existence. A hybrid retrieval stack (BM25 + BGE-M3 dense embeddings, RRF fusion) returns the most relevant precedents for any incident description. A calibrated XGBoost model predicts the most likely penalty across 7 classes. A RAG layer generates per-prediction rationales grounded in actual precedent text. A live WebSocket mode listens for investigation flags and surfaces top-5 precedents in real time during a race.",
    github: "https://github.com/racejudge-hq/racejudge-web",
    version: "1.0.0-beta",
    generated: "03 June 2026",
    stats: [
      { value: "1,085", label: "FIA Decision PDFs" },
      { value: "7", label: "Seasons Covered" },
      { value: "< 5s", label: "Live Precedent Delivery" },
      { value: "132", label: "Pytest Tests Passing" },
      { value: "7-class", label: "Penalty Predictor" },
      { value: "20+", label: "API Endpoints" },
    ],
    tech: [
      { label: "Python 3.11", category: "backend" },
      { label: "FastAPI", category: "backend" },
      { label: "Celery", category: "backend" },
      { label: "WebSocket + Redis Pub/Sub", category: "backend" },
      { label: "Playwright", category: "backend" },
      { label: "pdfplumber", category: "backend" },
      { label: "Next.js 15 App Router", category: "frontend" },
      { label: "TypeScript", category: "frontend" },
      { label: "Tailwind CSS", category: "frontend" },
      { label: "PostgreSQL + pgvector HNSW", category: "db" },
      { label: "Redis", category: "db" },
      { label: "Faster-Whisper ASR", category: "ml" },
      { label: "pyannote (diarisation)", category: "ml" },
      { label: "BGE-M3 (dense embeddings)", category: "ml" },
      { label: "BM25 + RRF (k=60)", category: "ml" },
      { label: "XGBoost (7-class)", category: "ml" },
      { label: "MAPIE (calibration)", category: "ml" },
      { label: "LayoutLMv3", category: "ml" },
      { label: "RAG (claude-haiku)", category: "ml" },
      { label: "Terraform", category: "infra" },
      { label: "Fly.io", category: "infra" },
      { label: "Prefect", category: "infra" },
      { label: "GitHub Actions CI", category: "infra" },
    ],
    features: [
      {
        title: "1,085-Document FIA Corpus with Evidence Linking",
        description:
          "A Playwright + pdfplumber pipeline scraped, parsed, and structured every FIA stewards' decision PDF across 7 seasons (2019–2025) with SHA-256 deduplication. Each decision is linked to its race control messages, team radio transcripts (Faster-Whisper ASR + pyannote speaker diarisation), and lap telemetry via OpenF1 and FastF1 APIs — building the only searchable, multi-modal FIA decision corpus in existence.",
      },
      {
        title: "Hybrid Semantic Search: BM25 + BGE-M3 + RRF",
        description:
          "Retrieval fuses BM25 keyword scoring with BGE-M3 1024-dimensional dense embeddings over a pgvector HNSW index (m=16, ef_construction=200) using Reciprocal Rank Fusion (k=60). Targeting Recall@10 ≥ 0.80. Any incident description returns the most relevant historical precedents ranked by hybrid relevance score.",
      },
      {
        title: "Calibrated XGBoost 7-Class Penalty Predictor",
        description:
          "A time-split cross-validated XGBoost classifier predicts the most likely stewards' outcome across 7 penalty classes. Trained with ECE and Macro-F1 validation gates (target: Macro-F1 ≥ 0.65, ECE < 0.05). Isotonic calibration applied post-training. MAPIE conformal prediction intervals provide uncertainty-aware outputs on every prediction.",
      },
      {
        title: "RAG Precedent Rationale Layer",
        description:
          "A retrieval-augmented generation layer (claude-haiku) takes the top-k retrieved precedents and the predicted penalty class and generates a structured explanation grounded in actual FIA decision text — telling the user not just what the likely outcome is, but why, with citations to specific historical cases.",
      },
      {
        title: "Live Race Mode: WebSocket + Redis Pub/Sub",
        description:
          "A WebSocket endpoint backed by Redis Pub/Sub listens for live investigation flags during a race. On trigger, the system queries the retrieval stack and returns the top-5 most relevant historical precedents in under 5 seconds — giving analysts and broadcasters real-time stewardship context as incidents unfold.",
      },
      {
        title: "Full Next.js 15 App Router Web Platform",
        description:
          "10+ pages including live race mode, precedent search, penalty prediction form, consistency heat-maps across drivers and teams, driver profiles, and an FIA guideline browser. Backed by a FastAPI service with 9 routers and 20+ endpoints. 132 pytest tests passing with green CI across ruff, mypy, tsc, and Next.js build. Tiered monetisation architecture: Free / $29 Pro / $499 Team / Enterprise.",
      },
    ],
    architecture:
      "Data pipeline: Playwright scraper → pdfplumber PDF parser → SHA-256 dedup → PostgreSQL corpus store → Faster-Whisper ASR + pyannote diarisation for team radio → OpenF1 + FastF1 telemetry linker → pgvector HNSW index (BGE-M3 embeddings, vector(1024), m=16, ef_construction=200). Prediction stack: BM25 index + pgvector ANN search → RRF fusion (k=60) → XGBoost 7-class classifier → MAPIE calibration → claude-haiku RAG rationale. Live mode: FastAPI WebSocket endpoint → Redis Pub/Sub → retrieval query → top-5 results streamed to client in < 5s. Orchestration: Prefect for pipeline scheduling, GitHub Actions CI (ruff + mypy + tsc + pytest 132 tests), Terraform + Fly.io deployment. Frontend: Next.js 15 App Router, 10+ pages, TypeScript, Tailwind CSS.",
  },
  {
    slug: "ilgc-tracker",
    number: "02",
    name: "University Housekeeping Management System",
    tagline: "Role-Based Campus Housekeeping & Facility Compliance Platform",
    summary:
      "A full-stack housekeeping management system covering 5 university buildings (H1 Hostel, H2 Hostel, A1 Bharti, A2 Havells, A4 HDFC). Supervisors mark every facility cleaned with mandatory photo proof, submit per-washroom hygiene checklists across 6 line-items, and track supply levels. An optional Python AI microservice auto-classifies resident complaints, assigns priority, generates response templates, and provides dashboard insights. All cleaning records auto-reset every 8 hours for per-shift discipline.",
    problem:
      "University campuses rely on paper-based cleaning logs and manual checklists. No real-time visibility into which areas have been cleaned, no photographic proof of completion, no centralised complaint tracking, and no data for supply management. Shift handovers are error-prone and admins cannot verify compliance without physically walking every floor.",
    solution:
      "Four-role platform (Admin / Supervisor / Staff / Resident) with tailored dashboards. Supervisors select a building and floor to mark each facility Cleaned (photo required) or Not Cleaned (comment required). Per-washroom digital checklists capture 6 line-items with individual photo uploads. Resident complaints are auto-analyzed by a Python AI sidecar - priority classification, sentiment analysis, response suggestions, predictive maintenance lookahead. An 8-hour facility reset enforces per-shift discipline. Supply levels (soap, tissue, sanitizer) tracked as 0-100% integers per washroom point.",
    github: "https://github.com/DisturbedSage5840C/uhms",
    version: "1.0.0",
    generated: "25 May 2026",
    stats: [
      { value: "74+", label: "API Endpoints" },
      { value: "15", label: "DB Tables" },
      { value: "16", label: "Migrations" },
      { value: "5", label: "Buildings Covered" },
      { value: "4", label: "User Roles" },
      { value: "6", label: "AI Features" },
    ],
    tech: [
      { label: "Node.js 18+", category: "backend" },
      { label: "Express 4", category: "backend" },
      { label: "Knex.js 3", category: "backend" },
      { label: "JWT Auth", category: "backend" },
      { label: "bcrypt + Helmet", category: "backend" },
      { label: "Winston Logger", category: "backend" },
      { label: "PostgreSQL 15 (Neon)", category: "db" },
      { label: "Redis (optional)", category: "db" },
      { label: "React Native", category: "mobile" },
      { label: "Expo + EAS Build", category: "mobile" },
      { label: "Multer (file uploads)", category: "backend" },
      { label: "Python AI Microservice", category: "ml" },
      { label: "Complaint Classifier", category: "ml" },
      { label: "Predictive Maintenance", category: "ml" },
      { label: "Render.com", category: "infra" },
      { label: "Neon.tech", category: "infra" },
    ],
    features: [
      {
        title: "Facility Cleaning Tracker with Photo Proof",
        description:
          "Supervisors see a live grid of all facilities (rooms, washrooms, corridors, pantries, lobbies) per building and floor. Each facility is marked Cleaned (mandatory photo upload) or Not Cleaned (written comment required). All records auto-reset every 8 hours at shift change so each new shift starts from zero.",
      },
      {
        title: "Per-Washroom Hygiene Checklists",
        description:
          "Supervisors submit digital checklists covering 6 line-items per washroom: floor mopping, sink cleaning, dustbin cleared, soap refill, tissue refill, and sanitizer refill. Each item supports an individual photo upload. Completion data is stored as a JSONB object and admins can filter all records by building, floor, and date.",
      },
      {
        title: "AI-Powered Complaint Management",
        description:
          "Residents submit maintenance requests with description and optional photo. The Python AI microservice auto-categorizes the complaint, assigns urgency (urgent / high / medium / low), analyzes sentiment, and generates response templates in three tones. Admins can batch-analyze up to 10 complaints at once. Full lifecycle: pending → in_progress → resolved.",
      },
      {
        title: "Supply Inventory Tracking",
        description:
          "Washroom supply levels for soap, tissue, and sanitizer stored as 0–100% integers per washroom point. Staff update levels during cleaning rounds and the admin dashboard aggregates supply health across all buildings. A separate supply_inventory table tracks stock by item name, quantity, unit, and low-stock threshold.",
      },
      {
        title: "Staff Work Submission & Approval Workflow",
        description:
          "Staff submit work completion records with optional photo evidence, entering a supervisor approval queue. Supervisors approve or reject submissions. A pending-count endpoint gives supervisors an at-a-glance view of outstanding approvals and creates an auditable per-shift work record.",
      },
      {
        title: "Role-Based Dashboards with Live Stats",
        description:
          "Four distinct role views each expose role-filtered data through dedicated dashboard endpoints. The admin dashboard shows cross-building stats: room counts, complaints by status, staff and resident counts, average resolution hours, and AI-generated insights. A public /api/home-stats endpoint serves live counts for the landing screen without authentication.",
      },
    ],
    architecture:
      "Monolith + optional AI sidecar on Render.com: Express server (Node.js 18) handles all 74+ API endpoints across 10 route modules → Knex.js query builder → PostgreSQL 15 on Neon.tech (15 tables, 16 migrations, UUID PKs, JSONB for checklist data) + Redis optional cache layer (30-min TTL for AI results). Python AI microservice called over HTTP with 15-second timeout, degrades gracefully to rule-based keyword matching when unavailable. Two background schedulers run on worker ID 1: facility auto-reset (every 8 hours) and reminder checker (every 60 seconds). Mobile: React Native + Expo WebView wrapper pointing to production URL, built to APK via EAS Build.",
  },
  {
    slug: "rwe-tracker",
    number: "03",
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
    slug: "neurosynth",
    number: "04",
    name: "NeuroSynth",
    tagline: "Clinical AI Decision Support Platform for Neurological Disease Diagnosis",
    summary:
      "A full-stack clinical AI platform that ingests a 31-feature biomarker panel and simultaneously classifies risk across 6 neurological diseases, forecasts 48-month disease trajectories, and generates clinician-ready SOAP notes via Claude. A 5-model calibrated ensemble (RandomForest, GradientBoosting, ExtraTrees, LogisticRegression, LightGBM) achieves AUC 0.9408 with ECE 0.020 after isotonic calibration. Every inference includes SHAP waterfall attributions, LIME local explanations, counterfactual recommendations, and causal intervention graphs — all wrapped in an FDA-grade MLOps pipeline with hash-chained audit logs, PSI drift detection, and fairness auditing. Live at https://neurosynth.vercel.app.",
    problem:
      "Neurological diseases — Alzheimer's, Parkinson's, MS, Epilepsy, ALS, Huntington's — share overlapping biomarker profiles, making early differential diagnosis difficult. Existing tools produce opaque predictions without explanation, lack longitudinal trajectory information, and fail to meet clinical documentation and regulatory traceability standards required for real-world clinical deployment.",
    solution:
      "NeuroSynth ingests a 31-feature clinical vector and outputs: (a) calibrated multi-disease risk probabilities across all 6 conditions with ICD-10 codes, (b) 48-month LSTM progression trajectory at 8 time points with confidence bands, (c) causal intervention recommendations showing which modifiable risk factors to address, (d) SHAP / LIME / counterfactual explanations satisfying clinician interpretability needs, and (e) a Claude claude-sonnet-4-6 SOAP clinical note with hallucination guard (±12% tolerance on all stated percentages) and FHIR R4 export. The entire pipeline meets FDA Software as a Medical Device (SaMD) standards with SHA-256 hash-chained audit logs, PSI + KS drift detection with auto-retrain triggers, and CI-enforced AUC ≥ 0.92 promotion gates.",
    github: "https://github.com/DisturbedSage5840C/NeuroSynth",
    version: "4.0.0-alpha",
    generated: "25 May 2026",
    stats: [
      { value: "0.9408", label: "Production AUC" },
      { value: "6", label: "Diseases Classified" },
      { value: "48mo", label: "Forecast Horizon" },
      { value: "11", label: "Docker Services" },
      { value: "15K", label: "Training Samples" },
      { value: "0.020", label: "Calibration Error" },
    ],
    tech: [
      { label: "FastAPI 0.111", category: "backend" },
      { label: "Python 3.11", category: "backend" },
      { label: "Celery 5.4", category: "backend" },
      { label: "asyncpg", category: "backend" },
      { label: "React 18 + Vite", category: "frontend" },
      { label: "TypeScript 5.5", category: "frontend" },
      { label: "Three.js + R3F", category: "frontend" },
      { label: "Recharts + D3", category: "frontend" },
      { label: "PostgreSQL 16", category: "db" },
      { label: "Redis 7", category: "db" },
      { label: "PyTorch 2.2 (LSTM)", category: "ml" },
      { label: "XGBoost", category: "ml" },
      { label: "CatBoost", category: "ml" },
      { label: "LightGBM 4.3", category: "ml" },
      { label: "scikit-learn 1.4", category: "ml" },
      { label: "SHAP + LIME", category: "ml" },
      { label: "MAPIE (Conformal)", category: "ml" },
      { label: "Claude claude-sonnet-4-6 API", category: "ml" },
      { label: "DoWhy (Causal)", category: "ml" },
      { label: "Docker Compose (11 svc)", category: "infra" },
      { label: "Kafka (KRaft)", category: "infra" },
      { label: "Prometheus + Grafana", category: "infra" },
      { label: "Helm", category: "infra" },
      { label: "Terraform", category: "infra" },
      { label: "Kubeflow", category: "infra" },
      { label: "Vercel + Render + Neon", category: "infra" },
    ],
    features: [
      {
        title: "Calibrated 5-Model Ensemble (AUC 0.9408)",
        description:
          "Stacks RandomForest (500 trees), GradientBoosting, ExtraTrees, LogisticRegression, and LightGBM with an out-of-fold meta-learner and isotonic calibration — reducing Expected Calibration Error from 0.109 to 0.020. Hard promotion gate requires AUC ≥ 0.92 in CI before any model version is deployed.",
      },
      {
        title: "48-Month Longitudinal Trajectory Forecasting",
        description:
          "A PyTorch LSTM predicts disease progression at 8 future time points (6, 12, 18, 24, 30, 36, 42, 48 months) with upper and lower confidence bands. Results render as an interactive Recharts area chart in the React UI, giving clinicians a visual progression timeline per patient.",
      },
      {
        title: "Explainability Triad: SHAP + LIME + Counterfactuals",
        description:
          "Every inference returns SHAP waterfall attributions (top-10 features), LIME perturbation-based local explanations with direction indicators, and up to 5 counterfactual 'what-if' recommendations showing exactly which feature changes would reduce the patient's risk score and by how much.",
      },
      {
        title: "Claude LLM SOAP Report with Hallucination Guard",
        description:
          "ClinicalReportGeneratorV3 calls claude-sonnet-4-6 to write structured SOAP clinical notes with ICD-10 codes. A post-generation verifier checks every stated percentage against the inference payload (±12% tolerance) — falling back to a Jinja2 template if verification fails — ensuring the note never contradicts the model output.",
      },
      {
        title: "Real-Time Biomarker Streaming + 3D Brain Visualization",
        description:
          "A Server-Sent Events endpoint streams AR(1)-driven wearable vitals every 2 seconds. A Three.js / react-three-fiber procedural brain mesh is colored by aggregated SHAP values mapped to anatomical regions via a custom brain atlas, giving clinicians a spatial view of which areas drive the prediction.",
      },
      {
        title: "FDA-Grade MLOps: Drift Detection, Fairness & Audit Trail",
        description:
          "PSI + KS drift detection with 4-tier severity auto-triggers Celery retraining on CRITICAL. Fairness auditing enforces Demographic Parity Ratio and Equalized Odds Ratio in [0.80, 1.25] across age, sex, and ethnicity. A SHA-256 hash-chained audit_log table provides tamper-evident FDA 21 CFR Part 11 / IEC 62304 compliance.",
      },
    ],
    architecture:
      "11-service Docker Compose: React 18 UI (Vercel) → FastAPI backend (port 8000, Render) → PostgreSQL 16 (Neon, 6 tables) + Redis 7 broker/cache → Celery worker (async retrain + chord aggregation) → dedicated model-server (port 8001, GPU-optional) → Kafka KRaft (biomarker event streaming) → Prometheus (15 metrics) + Grafana (10-panel dashboard) + node/redis/postgres exporters. Model artifacts stored on Cloudflare R2 (fetched on startup). Production K8s: EKS g4dn.xlarge GPU nodes via Terraform, HPA scaling 2–8 pods on CPU + latency. Frontend demo mode serves realistic simulated data when backend is unreachable.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
