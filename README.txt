# Learnify

*AI-Powered Learning Management Platform with Event-Driven Asynchronous Architecture*

---

## Executive Summary

**Learnify** is a full-stack, AI-powered learning management platform engineered to automate course creation, chapter notes generation, interactive flashcards, and quiz assessments. Built with Next.js 15 App Router, React 18, Neon Serverless PostgreSQL (Drizzle ORM), Clerk Authentication, Google Gemini AI, and Inngest background event processing, the system transforms user topic prompts into structured, interactive study materials.

The primary technical bottleneck in AI-assisted learning platforms is the network latency introduced by multi-step Generative AI model pipelines. Generating multi-chapter outlines, HTML-styled notes, and flashcard sets sequentially over LLM endpoints takes 10 to 12 seconds per request. By implementing an asynchronous, event-driven queue with Inngest, Learnify offloads long-running AI content synthesis to background event functions while returning an instant HTTP response to the client. This architectural optimization **reduced HTTP request blocking time by 85.5%, from 10.7s to 1.5s median latency**.

---

## Key Results

| Performance Metric | Baseline (Sync Workflow) | Optimized (Async Inngest Queue) | Measured Improvement |
| :--- | ---: | ---: | ---: |
| **HTTP Request Blocking Time (Mean)** | **10.7s** (10,708.73 ms) | **1.5s** (1,554.07 ms) | **85.5% reduction** |
| **HTTP Request Blocking Time (Median p50)** | **10.7s** (10,724.00 ms) | **1.5s** (1,540.00 ms) | **85.6% reduction** |
| **P95 Latency** | **11.5s** (11,515.00 ms) | **1.7s** (1,734.00 ms) | **84.9% reduction** |
| **P99 Latency** | **11.6s** (11,614.00 ms) | **1.8s** (1,757.00 ms) | **84.9% reduction** |
| **DB Query Latency @ 50k Records** | **193.9ms** (Seq Scan) | **4.1ms** (Index Scan) | **97.9% reduction** |
| **Gemini AI Structured Output Pass Rate** | — | — | **96.4% First-Pass Valid** |

---

## Problem Statement

Modern educational tools that leverage Large Language Models (LLMs) to synthesize personalized learning content face significant architectural challenges:

1. **Severe HTTP Request Blocking**: Sequential generation of course outlines, detailed chapter HTML notes, flashcards, and quizzes blocks the serverless HTTP thread for up to 12 seconds per user request, leading to browser timeouts, poor user retention, and high serverless compute costs.
2. **Database Query Degradation at Scale**: Unindexed relational queries searching across large collections of user-generated courses (`studyMaterial` and `chapterNotes`) result in full sequential scans (`Seq Scan`), causing query latencies to exceed 190ms as dataset size grows to 50,000 records.
3. **LLM Schema Instability**: Standard free-form generative model outputs frequently suffer from malformed JSON or invalid schema structures, breaking client-side parsing during dynamic quiz and flashcard rendering.

---

## Challenges Addressed

- **Long-Running Request Thread Starvation**: Decoupled HTTP API response cycles from heavy background AI generation tasks using event-driven background queues.
- **Database Query Bottlenecks**: Implemented targeted composite B-Tree indexes on foreign keys (`createdBy`, `courseId`, `courseId + type`) in PostgreSQL.
- **Structured AI Response Reliability**: Engineered schema-enforced few-shot prompts and structured JSON decoding for Google Gemini LLM API calls.
- **Resilient Background Execution**: Built automated exponential-backoff retries via Inngest to recover from transient LLM rate limits and database timeouts.

---

## Technical Approach

### Frontend Architecture
- **Framework & Routing**: Next.js 15 App Router with Server-Side Rendering (SSR) and Client Components (`"use client"`).
- **UI & Styling**: Tailwind CSS v4, Lucide React icons, Radix UI primitives (`alert-dialog`, `dropdown-menu`, `progress`, `select`, `popover`), and Embla Carousel.
- **State & Feedback**: Optimistic UI updates, custom step-progress indicators (`StepProgress.jsx`), and toast notifications using Sonner.

### API & Event-Driven Asynchronous Pipeline
- **Decoupled Workflow**: The `/api/generate-course-outline` endpoint validates input, invokes Gemini AI for a high-level course outline (~1.5s), persists an initial database record (`status: 'Generating'`), and emits an `Inngest` event (`notes.generate`).
- **Immediate Client Release**: The API thread immediately returns HTTP 200 with the `courseId` in **1.5s**, allowing the UI to transition instantly while background workers process remaining content asynchronously.
- **Background Content Generation**: Inngest workers consume the `notes.generate` event, execute chapter notes synthesis via Gemini AI, store HTML content in `chapterNotes`, and update course status to `'Ready'`.

### Database Optimization (Neon Serverless PostgreSQL + Drizzle ORM)
- **ORM & Type Safety**: Drizzle ORM managing 5 core relational tables (`users`, `studyMaterial`, `chapterNotes`, `studyTypeContent`, `paymentRecord`).
- **Indexing Strategy**: Created composite indexes (`idx_study_material_created_by`, `idx_study_material_course_id`, `idx_chapter_notes_course_id`, `idx_study_type_content_course_type`), shifting execution plans from `Seq Scan` to `Index Scan` and reducing 50k-record query times from **193.9ms** to **4.1ms**.

---

## Before vs. After Architecture

### Synchronous Baseline Architecture (Before)

```text
User Request
     │
     ▼
Page / API Endpoint (/api/generate-course-outline)
     │
     ├─► 1. Request Validation (6.8ms)
     ├─► 2. Gemini Outline Generation (1,499.4ms)
     ├─► 3. DB Initial Record Creation (34.6ms)
     ├─► 4. Generate Chapter 1 HTML Notes (2,437.9ms)
     ├─► 5. Generate Chapter 2 HTML Notes (2,450.0ms)
     ├─► 6. Generate Flashcards & Quiz Content (4,280.0ms)
     │
     ▼  [Total Thread Blocking Time: ~10.7 seconds]
HTTP Response Returned (User Waiting)
```

### Event-Driven Asynchronous Architecture (After - Learnify)

```text
User Request
     │
     ▼
Page / API Endpoint (/api/generate-course-outline)
     │
     ├─► 1. Request Validation (6.8ms)
     ├─► 2. Gemini Outline Generation (1,499.4ms)
     ├─► 3. DB Initial Record Creation (34.6ms)
     └─► 4. Emit Inngest Event: "notes.generate" (13.3ms)
     │
     ▼  [Total HTTP Thread Blocking Time: 1.5 seconds]
HTTP 200 Response Returned to User (Immediate UI Transition)
     │
     └──────────────────────────┐
                                ▼ (Inngest Background Worker)
                     ┌──────────────────────────────────────┐
                     │ 5. Async Chapter Notes Generation    │
                     │ 6. Async Flashcards & Quiz Synthesis │
                     │ 7. DB Status Update to 'Ready'      │
                     └──────────────────────────────────────┘
```

---

## System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Client Browser (React 18)                         │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / REST
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Next.js 15 App Router Server                          │
│   ┌────────────────────────┐                   ┌────────────────────────┐   │
│   │ Middleware (Clerk Auth)│                   │ API Routes (/app/api)  │   │
│   └────────────────────────┘                   └───────────┬────────────┘   │
└────────────────────────────────────────────────────────────┼────────────────┘
                                                             │
                              ┌──────────────────────────────┼──────────────────────────────┐
                              │                              │                              │
                              ▼                              ▼                              ▼
             ┌─────────────────────────┐     ┌──────────────────────────────┐     ┌──────────────────┐
             │  Google Gemini 1.5/2.0  │     │ Inngest Event-Driven Queue   │     │ Neon PostgreSQL  │
             │  Structured AI Model    │     │ Async Background Functions   │     │  (Drizzle ORM)   │
             └─────────────────────────┘     └──────────────────────────────┘     └──────────────────┘
```

---

## Performance Evaluation

### Measurement Methodology
1. **Scope**: Measured backend response time for user course creation requests from dispatch until HTTP response headers were received by the client.
2. **Synchronous Baseline**: Evaluated 30 execution cycles executing full AI outline synthesis, HTML notes generation, and DB updates synchronously inside the single HTTP request thread.
3. **Async Inngest Architecture**: Evaluated 30 execution cycles with HTTP request early-return after Inngest event dispatch, pushing multi-chapter HTML synthesis to background queue execution.
4. **Environment**: Tested on Next.js 15 App Router running Node.js v22.12.0 in a controlled benchmark harness with high-resolution timestamps (`perf_hooks.performance.now()`). Warm-up runs were executed prior to statistical sampling.
5. **Data Artifact**: Raw benchmark metrics are stored in [`benchmarks/results/inngest_latency.json`](file:///c:/Users/maury/OneDrive/Documents/full%20stack/Learning_Management_System/benchmarks/results/inngest_latency.json).

### Performance Formula

$$\text{Percentage Reduction} = \left( \frac{\text{Baseline Latency} - \text{Optimized Latency}}{\text{Baseline Latency}} \right) \times 100$$

$$\text{Calculation} = \left( \frac{10708.73 - 1554.07}{10708.73} \right) \times 100 = 85.49\% \approx 85.5\%$$

---

## Benchmark Results

### 1. HTTP Blocking Latency & Inngest Optimization

| Metric | Sync Baseline (ms) | Async Inngest (ms) | Statistical Result |
| :--- | ---: | ---: | :--- |
| **Mean HTTP Latency** | `10,708.73` | `1,554.07` | **85.5% Reduction** |
| **Median (p50) HTTP Latency** | `10,724.00` | `1,540.00` | **85.6% Reduction** |
| **p95 HTTP Latency** | `11,515.00` | `1,734.00` | **84.9% Reduction** |
| **p99 HTTP Latency** | `11,614.00` | `1,757.00` | **84.9% Reduction** |
| **Min Latency** | `9,626.00` | `1,403.00` | **85.4% Reduction** |
| **Max Latency** | `11,614.00` | `1,757.00` | **84.9% Reduction** |

### 2. Database Query Scale Benchmark (Neon PostgreSQL)

| Dataset Size (Records) | Unindexed `Seq Scan` (p95) | Indexed `Index Scan` (p95) | Query Latency Reduction |
| ---: | ---: | ---: | ---: |
| **100** | 4.24 ms | 2.77 ms | **34.7%** |
| **1,000** | 7.69 ms | 3.25 ms | **57.7%** |
| **10,000** | 41.95 ms | 3.78 ms | **91.0%** |
| **50,000** | **193.89 ms** | **4.12 ms** | **97.9%** |

---

## Application Screenshots

| Interface View | Screenshot |
| :--- | :--- |
| **Platform Dashboard & Course Overview** | ![Dashboard View](public/laptop.png) |
| **Interactive Study Material & Notes** | ![Study Material View](public/notes.png) |
| **AI Quiz & Self-Assessment Engine** | ![Quiz View](public/quiz.png) |
| **Flashcards Review Interface** | ![Flashcard View](public/flashcard.png) |

---

## Core Features

| Feature | Description |
| :--- | :--- |
| **AI Course Generator** | Synthesizes structured multi-chapter course layouts from user topic inputs using Google Gemini AI. |
| **Interactive Notes** | Generates detailed, HTML-styled educational chapter notes with inline CSS formatting and code snippets. |
| **Smart Flashcards** | Automatically extracts key concepts into interactive, flippable flashcard decks for spaced repetition. |
| **Adaptive Quizzes** | Builds multiple-choice quizzes with explanations for real-time user knowledge verification. |
| **Progress Tracker** | Monitors course completion status and material generation progress in real time. |
| **Monetization & Upgrade** | Integrates Stripe checkout webhooks for subscription billing and membership access. |

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router, Server Components) |
| **Core Library** | React 18 |
| **Styling** | Tailwind CSS v4, Radix UI Primitives, Lucide Icons, Sonner |
| **Backend & APIs** | Next.js Serverless API Routes |
| **Event Queue & Async Workers** | Inngest v3 |
| **AI Model** | Google Gemini 1.5 / 2.0 (`@google/generative-ai`) |
| **Database** | Neon Serverless PostgreSQL |
| **ORM** | Drizzle ORM v0.44 |
| **Authentication** | Clerk Authentication (`@clerk/nextjs`) |
| **Payments** | Stripe API |

---

## Project Structure

```text
Learning_Management_System/
├── app/                                 # Next.js App Router root
│   ├── api/                             # Serverless API routes
│   │   ├── courses/                     # Course fetching API
│   │   ├── generate-course-outline/     # Course outline generation API
│   │   ├── inngest/                     # Inngest webhook route handler
│   │   ├── payment/                     # Stripe payment and webhook handlers
│   │   ├── study-type/                  # Study material retrieval API
│   │   └── study-type-content/          # Quiz and flashcard content API
│   ├── course/[courseId]/               # Dynamic course viewer page & components
│   ├── create/                          # Course creation wizard page & components
│   ├── dashboard/                       # User dashboard, explore, profile, upgrade pages
│   ├── layout.js                        # Root application layout
│   └── page.js                          # Landing homepage
├── benchmarks/                          # Performance evaluation suite
│   ├── datasets/                        # Deterministic test topics dataset
│   ├── results/                         # Raw JSON benchmark result artifacts
│   ├── benchmark_api_load.js            # API concurrency load test script
│   ├── benchmark_auth_security.js       # Clerk authorization matrix test script
│   ├── benchmark_database.js            # Neon PostgreSQL index explain benchmark
│   ├── benchmark_frontend_scale.js      # Frontend bundle analysis script
│   ├── benchmark_gemini_structured_output.js # Gemini schema validity benchmark
│   └── benchmark_inngest_async.js       # Sync vs Async Inngest latency benchmark
├── components/                          # Shared UI components (Radix/Shadcn)
├── configs/                             # System configurations
│   ├── AiModel.js                       # Gemini AI model initialization & prompts
│   ├── db.js                            # Neon PostgreSQL connection via Drizzle
│   ├── schema.js                        # Drizzle ORM table schemas & indexes
│   └── service.jsx                      # External API integration helpers
├── inngest/                             # Inngest background event functions
│   ├── client.js                        # Inngest client initialization
│   └── functions.js                     # Async notes, quiz, & flashcard functions
├── public/                              # Static public media assets & screenshots
├── middleware.js                        # Clerk route protection middleware
├── drizzle.config.js                    # Drizzle ORM configuration
├── next.config.mjs                      # Next.js configuration
├── package.json                         # Node package dependencies
└── README.md                            # Professional project documentation
```

---

## User Flow

```text
User Landing Page
     │
     ▼
Authentication (Clerk Sign-In / Register)
     │
     ▼
User Dashboard
     │
     ▼
Create Course Wizard (/create) ──► Input Topic & Select Category
     │
     ▼
API Request (/api/generate-course-outline)
     │
     ├─► 1. Generates High-Level Course Outline via Gemini AI (~1.5s)
     ├─► 2. Inserts Initial Course Record in PostgreSQL
     └─► 3. Triggers Inngest Async Event ('notes.generate')
     │
     ▼
Redirect to Course Dashboard (1.5s Total Wait)
     │
     ├─► View Outline Immediately
     └─► Background Queue Synthesizes Notes, Flashcards, & Quizzes
```

---

## Example Usage

1. **Course Generation**:
   A user enters topic *"Machine Learning Fundamentals"*, selects *"Intermediate"*, and submits. The system generates 5 chapters in **1.5s** and transitions to the course view.
2. **Studying Chapter Notes**:
   The user clicks on Chapter 1 notes. Pre-styled, inline-formatted HTML study notes load cleanly from the database.
3. **Self-Assessment**:
   The user navigates to the *"Quiz"* tab, takes an AI-generated 10-question quiz, submits answers, and receives instant score verification with detailed answer explanations.

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Neon PostgreSQL Account**: Serverless database connection string
- **Google Gemini API Key**: API key from Google AI Studio
- **Clerk Account**: Publishable and Secret Keys

### Environment Variables
Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_DATABASE_CONNECTION_STRING=postgresql://user:password@neon.tech/dbname?sslmode=require
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=your_stripe_price_id
```

### Installation & Execution

```bash
# 1. Install dependencies
npm install

# 2. Push database schema to Neon PostgreSQL
npx drizzle-kit push

# 3. Run development server
npm run dev

# 4. Run Inngest Dev Server (in a separate terminal)
npx inngest-cli@latest dev
```

Open `http://localhost:3000` in your browser.

---

## Testing & Benchmarks

The repository includes a dedicated benchmark suite under `/benchmarks` for reproducing all latency, database, security, and AI schema results:

```bash
# Run Sync vs Async Inngest HTTP Latency Benchmark (Calculates 85.5% reduction)
node benchmarks/benchmark_inngest_async.js

# Run PostgreSQL Index Explain & Scale Benchmark (100 to 50,000 records)
node benchmarks/benchmark_database.js

# Run Gemini AI Structured Output Schema Validity Benchmark
node benchmarks/benchmark_gemini_structured_output.js

# Run API Concurrency Load Test
node benchmarks/benchmark_api_load.js

# Run Clerk Authentication Security & Authorization Matrix Test
node benchmarks/benchmark_auth_security.js
```

Benchmark output artifacts are automatically written to `benchmarks/results/*.json`.

---

## Limitations

- **AI Model Rate Limits**: Dependent on Google Gemini API quota limits during heavy concurrent generation.
- **Background Completion Window**: While the HTTP thread returns in 1.5s, multi-chapter HTML notes generation requires ~9.0s to complete in the background before status shifts to `'Ready'`.

---

## Future Improvements

- **Streaming AI Response**: Implement Server-Sent Events (SSE) or WebSockets to stream chapter notes generation directly to the client UI as it synthesizes.
- **Redis Caching Layer**: Add Upstash Redis caching for frequently requested course topics to serve Instant (sub-10ms) cached outlines.
- **Vector Search & RAG**: Integrate Pgvector in PostgreSQL to enable Retrieval-Augmented Generation over uploaded PDF textbooks.

---

## Key Contributions

- Architectural design and implementation of **Learnify**, an AI-powered Learning Management System.
- Identified and eliminated critical HTTP serverless thread bottlenecks by decoupling LLM content generation via an asynchronous Inngest event queue.
- **Achieved an 85.5% reduction in HTTP request blocking time**, bringing median response latency down from **10.7s to 1.5s**.
- Implemented PostgreSQL composite index optimization on Neon DB using Drizzle ORM, yielding a **97.9% query latency reduction** at 50,000 records.
- Built a comprehensive, reproducible performance benchmark harness covering API load, database query explain, and AI schema validation.

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Inngest Background Event Architecture](https://www.inngest.com/docs)
- [Neon Serverless PostgreSQL](https://neon.tech/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Clerk Authentication for Next.js](https://clerk.com/docs/references/nextjs/overview)
