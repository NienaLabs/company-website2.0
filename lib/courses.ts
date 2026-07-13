// ─── Pricing constants ───────────────────────────────────────────────────────
// Early-bird period: now → August 5 2025 (23:59:59 GMT)
export const EARLY_BIRD_DEADLINE = new Date('2025-08-05T23:59:59Z');
export const PRICE_EARLY_BIRD = 399;   // GHS – individual track (early bird)
export const PRICE_REGULAR = 499;      // GHS – individual track (after Aug 5)
export const PRICE_FULLSTACK = 749;    // GHS – full-stack bundle (all 3 tracks)

/** Returns the currently active price for a single-track course. */
export function getActivePrice(): number {
  return Date.now() < EARLY_BIRD_DEADLINE.getTime()
    ? PRICE_EARLY_BIRD
    : PRICE_REGULAR;
}

/** Returns true if the early-bird window is still open. */
export function isEarlyBird(): boolean {
  return Date.now() < EARLY_BIRD_DEADLINE.getTime();
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CurriculumPhase {
  phase: string;
  description: string;
  modules: { title: string; shared?: boolean; note?: string; isNew?: boolean }[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  category: 'Web' | 'Mobile' | 'Backend' | 'Bundle';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  /** Number of sessions across the 2-month program */
  sessions: number;
  /** Early-bird price in GHS (valid until EARLY_BIRD_DEADLINE) */
  earlyBirdPrice: number;
  /** Regular price in GHS */
  regularPrice: number;
  instructors: { name: string; title: string; avatar: string }[];
  phases: CurriculumPhase[];
  skills: string[];
  badge: string;
  featured: boolean;
  /** If true this is the full-stack bundle, not a standalone track */
  isBundle?: boolean;
}

// ─── Instructors ──────────────────────────────────────────────────────────────

const nienaInstructors = [
  { name: 'Adomako Yaw',     title: '@ Niena Labs', avatar: '/avatars/adomako.jpg' },
  { name: 'Williams Adusei', title: '@ Niena Labs', avatar: '/avatars/williams.jpg' },
];

// ─── Courses ──────────────────────────────────────────────────────────────────

export const courses: Course[] = [
  // ── Track 1: Frontend (Web) ─────────────────────────────────────────────────
  {
    id: '1',
    slug: 'frontend-web',
    title: 'Frontend Web Development',
    shortTitle: 'Frontend (Web)',
    description:
      'Build production-ready web apps with React, Next.js, TypeScript, and modern animation libraries — from HTML basics to full deployment.',
    longDescription:
      'This track takes you from the ground up. You start with the core web languages, move into the React ecosystem — Zustand, Tanstack Query, Vite — then level up with Next.js, advanced animations using GSAP and Framer Motion, and production deployment strategies. You\'ll also learn how to use AI tools effectively in your dev workflow. The program closes with a one-month team capstone project.',
    category: 'Web',
    level: 'Beginner',
    duration: '2 months',
    sessions: 24,
    earlyBirdPrice: PRICE_EARLY_BIRD,
    regularPrice: PRICE_REGULAR,
    instructors: nienaInstructors,
    phases: [
      {
        phase: 'Phase 1 — Foundations',
        description: 'Core web languages before framework work begins.',
        modules: [
          { title: 'HTML & CSS Essentials' },
          { title: 'Introduction to Tailwind CSS' },
          { title: 'JavaScript Fundamentals', shared: true },
          { title: 'JavaScript DOM Manipulation', shared: true },
          { title: 'JavaScript Object-Oriented Programming', shared: true },
          { title: 'Asynchronous Programming with JavaScript', shared: true },
          { title: 'TypeScript Essentials', shared: true },
        ],
      },
      {
        phase: 'Phase 2 — React Ecosystem',
        description: 'Building real UIs with React and its tooling.',
        modules: [
          { title: 'Introduction to JavaScript UI Libraries' },
          { title: 'React Concepts & Build Tools (Vite)' },
          { title: 'State Management with Zustand' },
          { title: 'Routing in React' },
          { title: 'Data Fetching (Tanstack Query & Axios)' },
          { title: 'Milestone Project', note: 'Applied checkpoint' },
        ],
      },
      {
        phase: 'Phase 3 — Advanced & Production-Ready',
        description: 'Frameworks, performance, AI workflow, and shipping.',
        modules: [
          { title: 'Web Animations', note: 'CSS + GSAP / Framer Motion' },
          { title: 'Next.js & Tanstack Start' },
          { title: 'Website Deployment' },
          { title: 'Frontend System Design & Optimization' },
          { title: 'Prompt Engineering & Token Optimization with AI' },
          { title: 'Debugging with Breakpoints & AI-Assisted Strategies' },
          { title: 'Final Team Project', note: '1-month capstone' },
        ],
      },
    ],
    skills: ['HTML/CSS', 'React', 'Next.js', 'TypeScript', 'Zustand', 'Tanstack Query', 'GSAP', 'Vercel'],
    badge: 'Most Popular',
    featured: true,
  },

  // ── Track 2: Frontend (Mobile) ──────────────────────────────────────────────
  {
    id: '2',
    slug: 'frontend-mobile',
    title: 'Frontend Mobile Development',
    shortTitle: 'Frontend (Mobile)',
    description:
      'Ship cross-platform mobile apps with React Native and Expo — device APIs, animations with Reanimated, and production builds to the App Store & Play Store.',
    longDescription:
      'Build real mobile apps from day one. You\'ll start with React Native and CSS essentials, then dive into Nativewind for styling, the shared JavaScript & TypeScript foundations, and then jump straight into Expo — device APIs, third-party data libraries, and smooth animations with Reanimated. The program wraps with production builds and a month-long team capstone.',
    category: 'Mobile',
    level: 'Beginner',
    duration: '2 months',
    sessions: 24,
    earlyBirdPrice: PRICE_EARLY_BIRD,
    regularPrice: PRICE_REGULAR,
    instructors: nienaInstructors,
    phases: [
      {
        phase: 'Phase 1 — Foundations',
        description: 'React Native fundamentals and core JS/TS.',
        modules: [
          { title: 'React Native & CSS Essentials' },
          { title: 'Nativewind Essentials' },
          { title: 'JavaScript Fundamentals', shared: true },
          { title: 'JavaScript DOM Manipulation', shared: true },
          { title: 'JavaScript Object-Oriented Programming', shared: true },
          { title: 'Asynchronous Programming with JavaScript', shared: true },
          { title: 'TypeScript Essentials', shared: true },
        ],
      },
      {
        phase: 'Phase 2 — Build & Ship',
        description: 'Device APIs, data, animation, and release builds.',
        modules: [
          { title: 'Introduction to Expo' },
          { title: 'Expo APIs for Device Component Access' },
          { title: '3rd-Party Libraries for Data Fetching & State' },
          { title: 'Mobile Animations with Reanimated' },
          { title: 'Development & Production Builds' },
          { title: 'Frontend System Design & Mobile Optimization' },
          { title: 'Final Team Project' },
        ],
      },
    ],
    skills: ['React Native', 'Expo', 'Nativewind', 'TypeScript', 'Reanimated', 'App Store', 'Play Store'],
    badge: 'Hands-On',
    featured: true,
  },

  // ── Track 3: Backend ────────────────────────────────────────────────────────
  {
    id: '3',
    slug: 'backend',
    title: 'Backend Development',
    shortTitle: 'Backend',
    description:
      'Design and ship scalable server-side systems — Node.js, NestJS, SQL/NoSQL databases, REST & GraphQL APIs, Docker, and cloud deployment on AWS.',
    longDescription:
      'Become the engineer who keeps things running. Starting with the JS/TS foundations you\'ll build backend systems from scratch using Node.js and Express, then move into database design with Prisma, REST & GraphQL API design, testing with Jest and Vitest, dependency injection with NestJS, message queues, Docker, and cloud deployment on AWS Free Tier. Prompt engineering and AI-assisted debugging are woven throughout.',
    category: 'Backend',
    level: 'Intermediate',
    duration: '2 months',
    sessions: 24,
    earlyBirdPrice: PRICE_EARLY_BIRD,
    regularPrice: PRICE_REGULAR,
    instructors: nienaInstructors,
    phases: [
      {
        phase: 'Phase 1 — Foundations & Architecture',
        description: 'Core JS/TS plus first backend architecture concepts.',
        modules: [
          { title: 'JavaScript Fundamentals', shared: true },
          { title: 'JavaScript DOM Manipulation', shared: true },
          { title: 'JavaScript Object-Oriented Programming', shared: true },
          { title: 'Asynchronous Programming with JavaScript', shared: true },
          { title: 'TypeScript Essentials', shared: true },
          { title: 'Backend Dev: Three-Layer Architecture', note: 'Node.js & Express' },
          { title: 'Database Design & ORMs', note: 'SQL/NoSQL, Prisma', isNew: true },
          { title: 'API Design', note: 'REST & GraphQL fundamentals', isNew: true },
        ],
      },
      {
        phase: 'Phase 2 — Architecture & Quality',
        description: 'Testing, structured design patterns and security.',
        modules: [
          { title: 'Unit & Integration Testing', note: 'Jest & Vitest' },
          { title: 'Aspect-Oriented Programming & Dependency Injection', note: 'NestJS' },
          { title: 'Security in Backend Development' },
          { title: 'Message & Task Queues for Async Work' },
        ],
      },
      {
        phase: 'Phase 3 — DevOps, AI Workflow & Scale',
        description: 'Shipping, cloud infrastructure and system design.',
        modules: [
          { title: 'Docker Fundamentals' },
          { title: 'Cloud Deployment on AWS (Free Tier)' },
          { title: 'Prompt Engineering & Token Management with AI' },
          { title: 'Debugging with Breakpoints & AI-Assisted Strategies' },
          { title: 'System Design for Scalable Backend Applications' },
          { title: 'Final Team Project' },
        ],
      },
    ],
    skills: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'REST', 'GraphQL', 'Docker', 'AWS'],
    badge: 'In Demand',
    featured: true,
  },

  // ── Bundle: Full-Stack ──────────────────────────────────────────────────────
  {
    id: '4',
    slug: 'full-stack-bundle',
    title: 'Full-Stack Developer Bundle',
    shortTitle: 'Full-Stack (All Tracks)',
    description:
      'All three tracks — Web, Mobile, and Backend — in one program. The most comprehensive path to becoming a full-stack developer.',
    longDescription:
      'Get access to all three bootcamp tracks: Frontend Web, Frontend Mobile, and Backend Development. You\'ll cover the complete stack — from pixel-perfect UIs and cross-platform mobile apps to scalable server-side systems, databases, and cloud infrastructure. This is the bundle for those who want to be able to build anything.',
    category: 'Bundle',
    level: 'Beginner',
    duration: '2 months',
    sessions: 24,
    earlyBirdPrice: PRICE_FULLSTACK,
    regularPrice: PRICE_FULLSTACK, // Bundle price does not change after the deadline
    instructors: nienaInstructors,
    phases: [
      {
        phase: 'All Tracks Included',
        description: 'Everything in Web, Mobile, and Backend — all in one.',
        modules: [
          { title: 'Frontend (Web) — all 20 modules' },
          { title: 'Frontend (Mobile) — all 14 modules' },
          { title: 'Backend — all 18 modules' },
        ],
      },
    ],
    skills: ['React', 'Next.js', 'React Native', 'Expo', 'Node.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript'],
    badge: 'Best Value',
    featured: true,
    isBundle: true,
  },
];
