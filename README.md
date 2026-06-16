# 🚀 ResumeAI Pro: The Ultimate Career Intelligence System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11.0.1-ea2845?logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2d3748?logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)

Welcome to **ResumeAI Pro**—not just another resume builder, but a fully-fledged, AI-driven **Career Intelligence System**. 

Built with an enterprise-grade NPM Workspace Monorepo architecture (Next.js Frontend + NestJS Backend), this platform fundamentally changes how candidates optimize their profiles for the modern job market. We've bypassed the generic templates of the past and engineered an **ATS 2.0 Engine** that simulates real-world Applicant Tracking Systems (like Workday, Taleo, and Greenhouse) to ensure maximum visibility for job seekers.

---

## ✨ Unique Features & Ecosystem

ResumeAI Pro operates across multiple specialized portals and intelligence engines:

### 🧠 ATS 2.0 Optimization Engine
- **Local Heuristics & NLP:** Simulates recruiter psychology using a completely local, rule-based Node.js NLP engine. No external APIs required.
- **8-Dimension Scoring Matrix:** Grades resumes on ATS Compatibility, Recruiter Score, Keyword Density, Industry Alignment, Executive Presence, Readability, and Business Impact.
- **Recruiter Psychology Scanner:** Simulates a human "6-second scan" to score Trustworthiness and First Impressions.
- **Impact Quantification:** Uses Regex and dictionaries to detect high-impact action verbs and parse out hard business metrics (Revenue, Cost Savings, Team Sizes).

### 🤖 Multi-Persona AI Copilot
Simulates feedback from three distinct hiring personas based on your generated data:
1. **HR Recruiter:** Audits formatting, sentence density, and readability.
2. **Technical Hiring Manager:** Checks for specific technical domain skills (e.g., Cloud, DevOps, AI).
3. **CTO / Executive Review:** Analyzes the critical balance between leadership qualities and quantifiable ROI.

### 💼 Comprehensive Input Ecosystem
- **Drag-and-Drop Builder:** Powered by `@dnd-kit`, allowing seamless reordering of Work Experience and Technical Projects.
- **Granular Data Collection:** Forms specifically engineered to capture Career Targets (Remote preference, Expected Salary), Certifications, and in-depth Technical Project objectives.
- **Gamification Engine:** Candidates earn XP, maintain streaks, and unlock badges (e.g., *ATS Conqueror*, *Profile Master*) to boost platform retention.

### 🏢 Multi-Role Portals
Beyond the candidate view, ResumeAI Pro features mock dashboards for:
- **Recruiter Portal:** An AI Vector Search interface to discover top talent and post jobs.
- **College Placement Portal:** A tracking system for universities to monitor their students' hiring status and ATS averages.

---

## 🏗️ Architecture & Tech Stack

This project utilizes a modern **NPM Workspace Monorepo** pattern to enforce strict separation of concerns while sharing typings when necessary.

### Frontend (`apps/frontend`)
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Framer Motion (for dynamic, liquid animations)
- **UI Components:** Shadcn/UI (Radix Primitives)
- **State Management:** Zustand (Handling the massive extended profile inputs)

### Backend (`apps/backend`)
- **Framework:** NestJS
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Intelligence:** Custom local NLP and heuristics services (No external LLM dependency for scoring).

---

## 🚦 Getting Started

Follow these instructions to boot up the entire Career Intelligence System locally.

### 1. Installation
Clone the repository and install all dependencies globally across the workspace. We use `concurrently` to orchestrate both servers.

```bash
cd AcePath
npm install
```

*(Note: We route all NPM caches locally via `.npmrc` to maintain a clean filesystem).*

### 2. Database Setup (Backend)
Navigate to the backend to generate the Prisma client and push the schema to your PostgreSQL database. Make sure you have a `.env` file with a valid `DATABASE_URL`.

```bash
cd apps/backend
npx prisma generate
npx prisma db push
```

### 3. Start the Ecosystem
Boot up both the Next.js Frontend and the NestJS Backend simultaneously with a single command from the root directory:

```bash
cd AcePath
npm run dev
```

- **Frontend UI:** `http://localhost:3000`
- **Backend API:** `http://localhost:3001`

---

## 🗺️ Project Roadmap

- [x] **Phase 1:** Core UI & Next.js Monorepo Setup
- [x] **Phase 2:** Smart Import & Drag-and-Drop Resume Builder
- [x] **Phase 3:** ATS Score Generation & Job Matching Dashboard
- [x] **Phase 4:** Mock Interview & AI Portfolio Generation UIs
- [x] **Phase 5:** Multi-Role Portals (Recruiter/College) & Gamification
- [x] **Phase 6:** Local ATS 2.0 Engine & Prisma Database Overhaul
- [ ] **Phase 7:** Connect Frontend Zustand Forms to NestJS APIs
- [ ] **Phase 8:** User Authentication & Premium ATS-Safe Exports (PDF/DOCX)

---

> *"Stop building resumes. Start engineering your career."* 
> 
> — **ResumeAI Pro**
