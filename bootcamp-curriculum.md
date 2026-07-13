# Full-Stack Developer Bootcamp — Curriculum

This document is the source of truth for the bootcamp curriculum content. It covers three tracks — **Frontend (Web)**, **Frontend (Mobile)**, and **Backend** — plus the overall program timeline. A machine-readable JSON version of the same data is included at the bottom for direct use in code (e.g. rendering a curriculum page, course cards, or a syllabus generator).

---

## Program Summary

- **Total duration:** 2 months
- **Month 1 — Learning phase:** project-based, teams meet **3x per week**
- **Month 2 — Final team project:** one month, per-track capstone
- **Tracks:** Frontend (Web), Frontend (Mobile), Backend
- **Shared sessions:** All three tracks teach their own JavaScript & TypeScript foundations (Fundamentals, DOM Manipulation, OOP, Async, TypeScript). Since the content is identical across tracks, these specific sessions can be run once as a **joint class** for all teams instead of being repeated per track. These modules are marked `shared: true` below.
- **New/recommended additions:** Database Design & ORMs and API Design were added to the Backend track to cover a gap in the original outline (data layer and API contracts weren't otherwise addressed). These are marked `new: true` below.

| Track | Modules | Phases |
|---|---|---|
| Frontend (Web) | 20 | Foundations → React Ecosystem → Advanced & Production-Ready |
| Frontend (Mobile) | 14 | Foundations → Build & Ship |
| Backend | 18 | Foundations & Architecture → Architecture & Quality → DevOps, AI Workflow & Scale |

---

## Track 1: Frontend (Web)

### Phase 1 — Foundations
Core web languages before framework work begins.

1. HTML & CSS Essentials
2. Introduction to Tailwind CSS
3. JavaScript Fundamentals *(shared)*
4. JavaScript DOM Manipulation *(shared)*
5. JavaScript Object-Oriented Programming *(shared)*
6. Asynchronous Programming with JavaScript *(shared)*
7. TypeScript Essentials *(shared)*

### Phase 2 — React Ecosystem
Building real UIs with React and its tooling.

1. Introduction to JavaScript UI Libraries
2. React Concepts & Build Tools (Vite)
3. State Management with Zustand
4. Routing in React
5. Data Fetching (Tanstack Query & Axios)
6. **Milestone Project** — applied checkpoint

### Phase 3 — Advanced & Production-Ready
Frameworks, performance, AI workflow, and shipping.

1. Web Animations — CSS + GSAP / Framer Motion
2. Next.js & Tanstack Start
3. Website Deployment
4. Frontend System Design & Optimization
5. Prompt Engineering & Token Optimization with AI
6. Debugging with Breakpoints & AI-Assisted Strategies
7. **Final Team Project** — 1-month capstone

---

## Track 2: Frontend (Mobile)

### Phase 1 — Foundations
React Native fundamentals and core JS/TS.

1. React Native & CSS Essentials
2. Nativewind Essentials
3. JavaScript Fundamentals *(shared)*
4. JavaScript DOM Manipulation *(shared)*
5. JavaScript Object-Oriented Programming *(shared)*
6. Asynchronous Programming with JavaScript *(shared)*
7. TypeScript Essentials *(shared)*

### Phase 2 — Build & Ship
Device APIs, data, animation, and release builds.

1. Introduction to Expo
2. Expo APIs for Device Component Access
3. 3rd-Party Libraries for Data Fetching & State
4. Mobile Animations with Reanimated
5. Development & Production Builds
6. Frontend System Design & Mobile Optimization
7. **Final Team Project**

---

## Track 3: Backend

### Phase 1 — Foundations & Architecture
Core JS/TS plus first backend architecture concepts.

1. JavaScript Fundamentals *(shared)*
2. JavaScript DOM Manipulation *(shared)*
3. JavaScript Object-Oriented Programming *(shared)*
4. Asynchronous Programming with JavaScript *(shared)*
5. TypeScript Essentials *(shared)*
6. Backend Dev: Three-Layer Architecture — Node.js & Express
7. Database Design & ORMs — SQL/NoSQL, Prisma *(new)*
8. API Design — REST & GraphQL fundamentals *(new)*

### Phase 2 — Architecture & Quality
Testing, structured design patterns and security.

1. Unit & Integration Testing — Jest & Vitest
2. Aspect-Oriented Programming & Dependency Injection — NestJS
3. Security in Backend Development
4. Message & Task Queues for Async Work

### Phase 3 — DevOps, AI Workflow & Scale
Shipping, cloud infrastructure and system design.

1. Docker Fundamentals
2. Cloud Deployment on AWS (Free Tier)
3. Prompt Engineering & Token Management with AI
4. Debugging with Breakpoints & AI-Assisted Strategies
5. System Design for Scalable Backend Applications
6. **Final Team Project**

---

## Program Throughlines

- **Shared JS/TS, run once** — Every track teaches its own JavaScript & TypeScript foundations; sessions covering identical content across teams can be run as one joint class.
- **AI-native from day one** — Prompt engineering, token management, and AI-assisted debugging appear in every track, not as an add-on.
- **One month learning, one month building** — Teams meet three times a week for project-based learning, then spend a full month on their final team project.

---

## Machine-Readable Data

```json
{
  "program": {
    "title": "Full-Stack Developer Bootcamp",
    "durationMonths": 2,
    "phases": [
      {
        "name": "Learning Phase",
        "durationMonths": 1,
        "format": "project-based",
        "cadence": "3x per week per team"
      },
      {
        "name": "Final Team Project",
        "durationMonths": 1,
        "format": "capstone, per track team"
      }
    ]
  },
  "tracks": [
    {
      "id": "frontend-web",
      "name": "Frontend (Web)",
      "moduleCount": 20,
      "phases": [
        {
          "name": "Foundations",
          "description": "Core web languages before framework work begins",
          "modules": [
            { "title": "HTML & CSS Essentials" },
            { "title": "Introduction to Tailwind CSS" },
            { "title": "JavaScript Fundamentals", "shared": true },
            { "title": "JavaScript DOM Manipulation", "shared": true },
            { "title": "JavaScript Object-Oriented Programming", "shared": true },
            { "title": "Asynchronous Programming with JavaScript", "shared": true },
            { "title": "TypeScript Essentials", "shared": true }
          ]
        },
        {
          "name": "React Ecosystem",
          "description": "Building real UIs with React and its tooling",
          "modules": [
            { "title": "Introduction to JavaScript UI Libraries" },
            { "title": "React Concepts & Build Tools (Vite)" },
            { "title": "State Management with Zustand" },
            { "title": "Routing in React" },
            { "title": "Data Fetching (Tanstack Query & Axios)" },
            { "title": "Milestone Project", "note": "Applied checkpoint" }
          ]
        },
        {
          "name": "Advanced & Production-Ready",
          "description": "Frameworks, performance, AI workflow, and shipping",
          "modules": [
            { "title": "Web Animations", "note": "CSS + GSAP / Framer Motion" },
            { "title": "Next.js & Tanstack Start" },
            { "title": "Website Deployment" },
            { "title": "Frontend System Design & Optimization" },
            { "title": "Prompt Engineering & Token Optimization with AI" },
            { "title": "Debugging with Breakpoints & AI-Assisted Strategies" },
            { "title": "Final Team Project", "note": "1-month capstone" }
          ]
        }
      ]
    },
    {
      "id": "frontend-mobile",
      "name": "Frontend (Mobile)",
      "moduleCount": 14,
      "phases": [
        {
          "name": "Foundations",
          "description": "React Native fundamentals and core JS/TS",
          "modules": [
            { "title": "React Native & CSS Essentials" },
            { "title": "Nativewind Essentials" },
            { "title": "JavaScript Fundamentals", "shared": true },
            { "title": "JavaScript DOM Manipulation", "shared": true },
            { "title": "JavaScript Object-Oriented Programming", "shared": true },
            { "title": "Asynchronous Programming with JavaScript", "shared": true },
            { "title": "TypeScript Essentials", "shared": true }
          ]
        },
        {
          "name": "Build & Ship",
          "description": "Device APIs, data, animation, and release builds",
          "modules": [
            { "title": "Introduction to Expo" },
            { "title": "Expo APIs for Device Component Access" },
            { "title": "3rd-Party Libraries for Data Fetching & State" },
            { "title": "Mobile Animations with Reanimated" },
            { "title": "Development & Production Builds" },
            { "title": "Frontend System Design & Mobile Optimization" },
            { "title": "Final Team Project" }
          ]
        }
      ]
    },
    {
      "id": "backend",
      "name": "Backend",
      "moduleCount": 18,
      "phases": [
        {
          "name": "Foundations & Architecture",
          "description": "Core JS/TS plus first backend architecture concepts",
          "modules": [
            { "title": "JavaScript Fundamentals", "shared": true },
            { "title": "JavaScript DOM Manipulation", "shared": true },
            { "title": "JavaScript Object-Oriented Programming", "shared": true },
            { "title": "Asynchronous Programming with JavaScript", "shared": true },
            { "title": "TypeScript Essentials", "shared": true },
            { "title": "Backend Dev: Three-Layer Architecture", "note": "Node.js & Express" },
            { "title": "Database Design & ORMs", "note": "SQL/NoSQL, Prisma", "new": true },
            { "title": "API Design", "note": "REST & GraphQL fundamentals", "new": true }
          ]
        },
        {
          "name": "Architecture & Quality",
          "description": "Testing, structured design patterns and security",
          "modules": [
            { "title": "Unit & Integration Testing", "note": "Jest & Vitest" },
            { "title": "Aspect-Oriented Programming & Dependency Injection", "note": "NestJS" },
            { "title": "Security in Backend Development" },
            { "title": "Message & Task Queues for Async Work" }
          ]
        },
        {
          "name": "DevOps, AI Workflow & Scale",
          "description": "Shipping, cloud infrastructure and system design",
          "modules": [
            { "title": "Docker Fundamentals" },
            { "title": "Cloud Deployment on AWS (Free Tier)" },
            { "title": "Prompt Engineering & Token Management with AI" },
            { "title": "Debugging with Breakpoints & AI-Assisted Strategies" },
            { "title": "System Design for Scalable Backend Applications" },
            { "title": "Final Team Project" }
          ]
        }
      ]
    }
  ],
  "throughlines": [
    {
      "title": "Shared JS/TS, run once",
      "description": "Every track teaches its own JavaScript & TypeScript foundations — sessions covering identical content across teams can be run as one joint class."
    },
    {
      "title": "AI-native from day one",
      "description": "Prompt engineering, token management and AI-assisted debugging appear in every track, not as an add-on."
    },
    {
      "title": "One month learning, one month building",
      "description": "Teams meet three times a week for project-based learning, then spend a full month on their final team project."
    }
  ]
}
```
