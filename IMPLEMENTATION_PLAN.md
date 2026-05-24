# Multi-Agent AI System — Implementation Plan

> **System name:** Adaptive Multi-Agent Task Engine (AMATE)
> **Version:** 1.0
> **Author:** Marutey Mani
> **Status:** Draft — Ready for Engineering Review

---

## 1. Executive Summary

AMATE is a horizontally scalable, feedback-driven multi-agent AI system designed to decompose complex user goals into parallelisable subtasks, route them to specialised agents, validate output quality against a composite rubric, and refine iteratively until a delivery threshold is met. The system is built for reliability, auditability, and graceful degradation.

---

## 2. Architecture Overview

```
User Input
    │
    ▼
┌─────────────────────────────────────┐
│  Orchestration Layer                │
│  Intake → Planner → Router          │
│  Shared Context Store (Redis/Vector)│
└──────────────────┬──────────────────┘
                   │ dispatch subtasks
                   ▼
┌─────────────────────────────────────┐
│  Execution Agent Pool               │
│  Research · Code · Analysis · Write │
│  Tool Layer (APIs, DB, Browser)     │
└──────────────────┬──────────────────┘
                   │ subtask outputs
                   ▼
           Aggregator Agent
                   │
                   ▼
┌─────────────────────────────────────┐
│  Validation & QA Layer              │
│  Fact-Check · Critic · Safety       │
│  Scoring Gate (threshold ≥ 0.80)    │
└──────────────────┬──────────────────┘
          ┌────────┴────────┐
         Pass              Fail
          │                 │
          ▼                 ▼
  Optimization         Retry / Failure
  Layer                Handler
  Refine·Compress·      Timeout · Backoff
  Format               Fallback · Escalate
          │
          ▼
     Final Output → User
          │
          ▼
   Learning Store (async)
```

---

## 3. Agent Definitions

### 3.1 Orchestration Agents

| Agent | Role | Inputs | Outputs | Decision Logic |
|---|---|---|---|---|
| **Intake Agent** | Parse and validate user request | Raw user message | Structured task object | Reject malformed; request clarification if ambiguous |
| **Planner Agent** | Decompose goal into DAG of subtasks | Structured task object | Subtask list with dependencies | Use LLM to generate subtask graph; topological sort for ordering |
| **Router / Dispatcher** | Assign subtasks to agents | Subtask list, agent registry | Dispatch events to queue | Match subtask type to agent capability; respect priority weights |

### 3.2 Execution Agents

| Agent | Specialisation | Tools Available | Output Schema |
|---|---|---|---|
| **Research Agent** | Web retrieval, RAG lookups | Web search, vector DB, document reader | `{sources: [], summary: "", confidence: float}` |
| **Code Agent** | Write, run, and debug code | Code interpreter, file system, compiler | `{code: "", tests: [], output: "", errors: []}` |
| **Analysis Agent** | Reasoning, synthesis, structured thinking | Calculator, data DB, structured query | `{reasoning_chain: [], conclusion: "", evidence: []}` |
| **Writer Agent** | Drafting, formatting, audience adaptation | Style guide, template library | `{draft: "", word_count: int, tone: ""}` |

### 3.3 Quality Agents

| Agent | Checks | Scoring Contribution |
|---|---|---|
| **Fact-Check Agent** | Claim verification vs. sources | 30% of composite score |
| **Critic Agent** | Logical gaps, coherence, completeness | 40% of composite score |
| **Safety Agent** | Policy compliance, hallucination detection | 30% of composite score (hard block if fails) |

### 3.4 Support Agents

| Agent | Role |
|---|---|
| **Aggregator Agent** | Merge subtask outputs; resolve conflicts by confidence-weighted voting |
| **Refinement Agent** | Rewrite sections below a quality threshold; targeted edits only |
| **Compressor Agent** | Trim duplicate content; enforce token budget |
| **Format & Persona Agent** | Apply output tone, structure, and audience profile |

---

## 4. Data Flows

### 4.1 Happy Path

```
1. User submits task
2. Intake Agent validates and structures request → stored in Context Store
3. Planner generates subtask DAG → pushed to Task Queue
4. Router reads queue; dispatches subtasks to agent worker pool
5. Execution agents run in parallel where dependencies allow
6. Each agent writes output + tool calls to Context Store
7. Aggregator merges outputs when all subtasks complete
8. Validation agents score merged output simultaneously
9. Composite score calculated
10. If score ≥ 0.80: pass to Optimization Layer
11. Refinement → Compression → Format applied sequentially
12. Final output delivered to user
13. Outcome metadata written async to Learning Store
```

### 4.2 Feedback Loop Path

```
If score 0.50–0.79:
  - Critic Agent identifies lowest-scoring section
  - Planner creates targeted retry subtask for that section only
  - Retry counter incremented
  - Re-run from step 4 for affected subtask only
  - Max 2 targeted retries before escalating to full retry

If score < 0.50 OR retry count ≥ 3:
  - Failure Handler activates (see Section 6)
```

---

## 5. Scoring Rubric

| Dimension | Weight | Measured By |
|---|---|---|
| Factual accuracy | 30% | Fact-Check Agent: source citation rate, contradiction count |
| Logical coherence | 25% | Critic Agent: argument chain completeness |
| Completeness | 15% | Critic Agent: requirement coverage vs. original task |
| Safety / Policy | 30% | Safety Agent: rule violation binary + confidence |

**Composite Score Formula:**
```
score = (factual * 0.30) + (coherence * 0.25) + (completeness * 0.15) + (safety * 0.30)
```

Safety is a hard gate: if Safety Agent returns `block=True`, the output is never delivered regardless of composite score.

---

## 6. Failure Handling

### 6.1 Timeout Guard
- Each subtask is assigned a TTL based on agent type (default 30s, Code Agent 120s)
- Exceeded TTL → subtask marked FAILED → Retry Manager activated

### 6.2 Retry Manager
- Exponential backoff: 1s → 2s → 4s
- Maximum 3 attempts per subtask
- After 3 failures: mark subtask as DEGRADED; attempt with Fallback Agent

### 6.3 Fallback Agent
- Uses a smaller, faster model (e.g. haiku-class) with reduced scope
- Output is flagged as degraded in the final response
- User is notified that the section may be less complete

### 6.4 Escalation (Human-in-the-Loop)
Triggered when:
- All retries exhausted AND fallback also fails
- Safety Agent returns a hard block
- Composite score < 0.30 after all retries

Action:
- Task flagged for human review queue
- User receives partial output with explicit caveat
- Incident logged to Audit Trail

### 6.5 Circuit Breaker
- If P99 latency for an agent type exceeds 8s over a 2-minute window, circuit opens
- New subtasks for that agent type route to Fallback Agent automatically
- Circuit re-evaluates every 60s

---

## 7. Scalability Design

### 7.1 Worker Pool Auto-scaling
- Kubernetes HPA (Horizontal Pod Autoscaler) on queue depth metric
- Scale-out trigger: queue depth > 20 pending subtasks
- Scale-in delay: 3 minutes of low load before pod termination
- Min replicas: 2 per agent type | Max: 20

### 7.2 Token Budget Management
- Each task is allocated a token budget at planning time based on task complexity score
- Compressor Agent fires proactively at 80% budget consumption
- Hard stop at 100%: output truncated gracefully with summary appended

### 7.3 Context Store Architecture
- **Hot path:** Redis for in-flight subtask state and inter-agent messaging
- **Warm path:** PostgreSQL for task history, scoring records, audit trail
- **Vector path:** Pinecone / pgvector for RAG and semantic deduplication
- **Learning Store:** Append-only event log → batch processed nightly into policy updates

### 7.4 Observability
- **Traces:** OpenTelemetry → Jaeger (full subtask lineage per task)
- **Metrics:** Prometheus → Grafana dashboards
  - Composite score distribution
  - Retry rate per agent type
  - Token budget utilisation
  - End-to-end latency P50 / P95 / P99
- **Alerts:** PagerDuty integration for circuit breaker opens and escalation queue depth > 5

---

## 8. Technology Stack

| Layer | Technology |
|---|---|
| LLM API | Anthropic Claude (Sonnet 4 primary, Haiku fallback) |
| Orchestration runtime | Python 3.12 + asyncio |
| Task queue | Redis Streams + Celery |
| Context store | Redis (hot) + PostgreSQL 16 (warm) |
| Vector store | pgvector (dev) / Pinecone (prod) |
| Agent containers | Docker + Kubernetes |
| API gateway | FastAPI |
| Observability | OpenTelemetry + Jaeger + Prometheus + Grafana |
| CI/CD | GitHub Actions + ArgoCD |
| Secrets | HashiCorp Vault |

---

## 9. Implementation Phases

### Phase 1 — Core Pipeline (Weeks 1–3)
- [ ] Set up project skeleton (FastAPI + Docker Compose)
- [ ] Implement Intake Agent with input validation schema
- [ ] Implement basic Planner (flat task list, no DAG yet)
- [ ] Implement Router with static agent registry
- [ ] Implement Research + Writer Agents (simplest execution pair)
- [ ] Implement Aggregator (concatenation only)
- [ ] Basic Critic Agent with hardcoded rubric
- [ ] Deliver first end-to-end test: "Summarise this document" task

### Phase 2 — Quality Layer (Weeks 4–6)
- [ ] Upgrade Planner to generate dependency DAG
- [ ] Implement parallel subtask execution via asyncio task groups
- [ ] Implement Fact-Check Agent with source citation verification
- [ ] Implement Safety Agent with policy rule set
- [ ] Implement composite scoring + pass/fail gate
- [ ] Implement targeted retry loop (section-level)
- [ ] Add Refinement + Compressor + Format Agents
- [ ] End-to-end test: "Research and write a report on X" task

### Phase 3 — Reliability (Weeks 7–9)
- [ ] Implement Timeout Guard with TTL per agent type
- [ ] Implement Retry Manager with exponential backoff
- [ ] Implement Fallback Agent (smaller model path)
- [ ] Implement circuit breaker with P99 monitoring
- [ ] Implement human escalation queue with webhook notification
- [ ] Load test: 50 concurrent tasks, measure P99 latency
- [ ] Audit trail and incident log implementation

### Phase 4 — Scalability (Weeks 10–12)
- [ ] Kubernetes deployment with HPA
- [ ] Redis Streams replacing simple queue
- [ ] OpenTelemetry trace instrumentation across all agents
- [ ] Grafana dashboards live
- [ ] Learning Store pipeline (nightly batch)
- [ ] Prompt cache for repeated subtask patterns
- [ ] Load test: 500 concurrent tasks

---

## 10. Testing Strategy

| Test Type | Scope | Tool |
|---|---|---|
| Unit tests | Each agent in isolation with mocked LLM | pytest + respx |
| Integration tests | Agent pairs (e.g. Planner → Router → Agent) | pytest + testcontainers |
| End-to-end tests | Full task pipeline on real LLM | Custom harness |
| Score regression tests | Composite score must not degrade across builds | pytest + score snapshots |
| Load tests | Concurrent task throughput | Locust |
| Chaos tests | Random agent failure injection | Chaos Monkey patterns |

---

## 11. Security & Privacy

- All LLM API calls go through a centralised proxy that enforces rate limits and strips PII before logging
- Audit trail is append-only and tamper-evident (hash chain)
- Secrets managed via Vault; never in environment variables or code
- Human escalation queue has RBAC — only designated reviewers can access task content
- Outputs are not stored beyond 30 days unless user opts in

---

## 12. Open Questions

1. Should the Planner Agent itself use an LLM call, or a deterministic rule engine for cost control?
2. What is the acceptable P99 latency SLA for the full pipeline end-to-end?
3. Should the Learning Store update agent selection policy in real-time or batch-only?
4. Is human escalation handled in-app or via external ticketing (e.g. Linear, Jira)?
5. How should the system handle tasks that span multiple user sessions?

---

*Last updated: May 2026 — Marutey Mani*
