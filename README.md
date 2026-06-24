<h1 align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=800&size=42&pause=1000&color=06B6D4&center=true&vCenter=true&width=800&lines=🚀+ResumeAI+Pro;The+Ultimate+Career+System;Engineer+Your+Future" alt="Typing SVG" />
</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />
</p>

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11.0.1-ea2845?logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2d3748?logo=prisma)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase)

Welcome to **ResumeAI Pro**—not just another resume builder, but a fully-fledged, AI-driven **Career Intelligence System**. 

Built with an enterprise-grade NPM Workspace Monorepo architecture (Next.js Frontend + NestJS Backend), this platform fundamentally changes how candidates optimize their profiles for the modern job market. We've bypassed the generic templates of the past and engineered an **ATS 2.0 Engine** that simulates real-world Applicant Tracking Systems to ensure maximum visibility for job seekers.

---

## ✨ Unique Features & Ecosystem

ResumeAI Pro operates across multiple specialized portals and intelligence engines:

### 🧠 ATS 2.0 Optimization Engine
- **Local Heuristics & NLP:** Simulates recruiter psychology using a completely local, rule-based Node.js NLP engine. No external APIs required.
- **8-Dimension Scoring Matrix:** Grades resumes on ATS Compatibility, Recruiter Score, Keyword Density, Industry Alignment, Executive Presence, Readability, and Business Impact.
- **Recruiter Psychology Scanner:** Simulates a human "6-second scan" to score Trustworthiness and First Impressions.
- **Impact Quantification:** Uses Regex and dictionaries to detect high-impact action verbs and parse out hard business metrics (Revenue, Cost Savings, Team Sizes).

### 🛡️ Indestructible Triple-Fallback Architecture
Our backend is engineered to survive any local development or network failure. When booting and authenticating, it gracefully cascades through:
1. **Primary Layer:** PostgreSQL via Prisma.
2. **Fallback 1:** MongoDB Atlas via Mongoose.
3. **Fallback 2:** Firebase Web SDK Cloud Firestore.
4. **Ultimate Fallback:** Secure In-Memory Mock Database.

### 💼 Comprehensive Input Ecosystem
- **Drag-and-Drop Builder:** Powered by `@dnd-kit`, allowing seamless reordering of Work Experience and Technical Projects.
- **Granular Data Collection:** Forms specifically engineered to capture Career Targets (Remote preference, Expected Salary), Certifications, and in-depth Technical Project objectives.
- **Gamification Engine:** Candidates earn XP, maintain streaks, and unlock badges to boost platform retention.

### 🏢 Multi-Role Portals & Admin Configuration
- **Terminal Admin Auth:** A breathtaking, glassmorphic login portal powered by Framer Motion. Features a "System Feature Overrides" panel for injecting external API keys securely into `localStorage`.
- **Recruiter Portal:** An AI Vector Search interface to discover top talent and post jobs.
- **College Placement Portal:** A tracking system for universities to monitor their students' hiring status.

---

## 🏗️ Architecture & Tech Stack

```mermaid
graph TD
    %% Styling
    classDef frontend fill:#000,stroke:#fff,stroke-width:2px,color:#fff;
    classDef backend fill:#ea2845,stroke:#fff,stroke-width:2px,color:#fff;
    classDef db1 fill:#336791,stroke:#fff,stroke-width:2px,color:#fff;
    classDef db2 fill:#47A248,stroke:#fff,stroke-width:2px,color:#fff;
    classDef db3 fill:#FFCA28,stroke:#fff,stroke-width:2px,color:#000;
    classDef db4 fill:#555,stroke:#fff,stroke-width:2px,color:#fff;

    subgraph "NPM Workspace Monorepo"
        UI["Next.js Frontend (Turbopack)"]:::frontend
        API["NestJS Backend API"]:::backend

        UI -->|HTTP / REST| API

        subgraph "Triple-Fallback Database Layer"
            DB1[("1. PostgreSQL\n(Prisma ORM)")]:::db1
            DB2[("2. MongoDB Atlas\n(Mongoose)")]:::db2
            DB3[("3. Firebase\n(Firestore)")]:::db3
            DB4[("4. In-Memory Mock\n(Local RAM)")]:::db4
            
            API -- "Primary" --> DB1
            API -. "Fallback 1" .-> DB2
            API -. "Fallback 2" .-> DB3
            API -. "Ultimate Fallback" .-> DB4
        end
    end
```

This project utilizes a modern **NPM Workspace Monorepo** pattern to enforce strict separation of concerns while sharing typings when necessary.

### Frontend (`apps/frontend`)
- **Framework:** Next.js 16 (Turbopack)
- **Styling:** Tailwind CSS + Framer Motion (for dynamic, liquid animations)
- **UI Components:** Shadcn/UI (Radix Primitives)
- **State Management:** Zustand
- **Assets:** `ian-xiaohei-illustrations` open-source SVGs.

### Backend (`apps/backend`)
- **Framework:** NestJS
- **Databases:** PostgreSQL (Prisma), MongoDB (Mongoose), Firebase (Firestore)
- **Intelligence:** Custom local NLP and heuristics services.

---

## 🚦 Getting Started

Follow these instructions to boot up the entire Career Intelligence System locally.

### 1. Installation
Clone the repository and install all dependencies globally across the workspace.

```bash
cd AcePath
npm install
```

### 2. Database Environment Setup
Make sure you have a `.env` file in your backend workspace containing your database credentials and API configuration overrides.

### 3. Start the Ecosystem
Our boot sequence is entirely fully-automated. Run the unified development command from the root folder:

```bash
cd AcePath
npm run dev
```

This single command will:
1. Boot the Next.js Frontend.
2. Boot the NestJS Backend.
3. Trigger an automated background webhook that seeds the Super Admin credentials (`admin` / `Admin@123`) directly into the active database layers.

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
- [x] **Phase 7:** Triple-Fallback DB Architecture (Postgres, Mongo, Firebase)
- [x] **Phase 8:** Animated Admin Terminal & Local Storage Configuration Injection
- [ ] **Phase 9:** Connect Frontend Zustand Forms to NestJS APIs
- [ ] **Phase 10:** Premium ATS-Safe Exports (PDF/DOCX)

---

> *"Stop building resumes. Start engineering your career."* 
> 
> — **ResumeAI Pro**
