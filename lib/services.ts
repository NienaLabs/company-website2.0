export interface ServicePillar {
  title: string;
  description: string;
  tags: string[];
}

export interface ServiceCaseStudy {
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  image?: string;
  tags: string[];
}

export interface ServiceMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  aliases: string[];
  label: string;
  title: string;
  tagline: string;
  headline: string;
  body: string;
  heroDescription: string;
  altColorIndex: "1" | "2" | "3" | "4";
  icon: string;
  iconType: "3d" | "lucide";
  metrics: ServiceMetric[];
  pillars: ServicePillar[];
  caseStudies: ServiceCaseStudy[];
  techStack: string[];
  deliverables: string[];
  processSteps: { step: string; title: string; desc: string }[];
}

export const servicesList: ServiceData[] = [
  {
    id: "devtools",
    slug: "devtools",
    aliases: ["developer-tools"],
    label: "Developer Tools",
    title: "DX that accelerates.",
    tagline: "Custom tooling, CLIs, and automated environments built for engineering velocity.",
    headline: "Engineering tools engineered to remove friction and multiply speed.",
    body: "Custom tooling, CLIs, and dev environments that remove friction and multiply engineering velocity.",
    heroDescription:
      "We design and build bespoke engineering tools, CLI utilities, automation scripts, and development platforms that eliminate papercuts, accelerate feedback loops, and empower engineering teams to build and ship with confidence.",
    altColorIndex: "1",
    icon: "Terminal",
    iconType: "lucide",
    metrics: [
      { value: "Native", label: "Compiled Runtimes", detail: "Fast binaries built in Rust, Go, or Node" },
      { value: "Zero", label: "Runtime Bloat", detail: "Self-contained tools with minimal dependencies" },
      { value: "100%", label: "Consistent Environments", detail: "Standardized container setups across teams" },
      { value: "Automated", label: "Release Pipelines", detail: "Semantic versioning and GitHub Actions" },
    ],
    pillars: [
      {
        title: "Ergonomic CLIs & Command Utilities",
        description:
          "Fast, intuitive command-line tools with structured argument parsing, helpful error messages, interactive prompts, and terminal color formatting.",
        tags: ["CLI DESIGN", "SHELL AUTOMATION", "GO", "RUST"],
      },
      {
        title: "Developer Scaffolding & Starters",
        description:
          "Opinionated code scaffolders and starters that eliminate repetitive setup work, generate standard folder structures, and configure auth and databases.",
        tags: ["PROJECT SCAFFOLDING", "CODEGEN", "STARTERS"],
      },
      {
        title: "Monorepo & Build Optimization",
        description:
          "Task orchestration using Turborepo and workspace tools that prune duplicate work, run checks in parallel, and keep local test cycles fast.",
        tags: ["TURBOREPO", "CACHING", "PARALLEL BUILDS"],
      },
      {
        title: "Automated CI/CD & Testing Workflows",
        description:
          "GitHub Actions pipelines that automatically run linters, type checks, and unit tests on every pull request to catch regressions before they ship.",
        tags: ["GITHUB ACTIONS", "AUTOMATED TESTING", "CONTINUOUS INTEGRATION"],
      },
    ],
    caseStudies: [
      {
        title: "Automated CLI Scaffolder & Architecture Templates",
        subtitle: "Developer Productivity Tooling",
        description:
          "Engineered an interactive CLI generator for full-stack Next.js applications that sets up authentication, typed database schemas, and folder structures in a single command.",
        highlight: "Transforms multi-hour project bootstrap into a two-minute automated process",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
        tags: ["CLI SCAFFOLDER", "DEVELOPER EXPERIENCE", "AUTOMATION"],
      },
      {
        title: "Containerized Local Dev Environments",
        subtitle: "Engineering Environment Standardization",
        description:
          "Configured reproducible Docker Compose development environments with pre-configured local databases and service dependencies, eliminating local environment discrepancies.",
        highlight: "Ensures identical local runtimes for all developers on the team",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
        tags: ["DOCKER", "LOCAL DX", "REPRODUCIBLE BUILDS"],
      },
    ],
    techStack: [
      "Rust",
      "Go",
      "TypeScript",
      "Node.js",
      "Docker",
      "Turborepo",
      "GitHub Actions",
      "Bash / Zsh",
      "pnpm / Bun",
      "REST / JSON APIs",
    ],
    deliverables: [
      "Cross-platform compiled binaries or npm packages for your team",
      "Interactive CLI with argument parsing, help commands, and shell completion",
      "Automated CI/CD release action pipelines with test workflows",
      "Comprehensive internal documentation and usage examples",
      "Full source code ownership with clear repository structure",
    ],
    processSteps: [
      {
        step: "01",
        title: "Workflow Audit",
        desc: "We analyze your engineers' daily workflow to pinpoint repetitive scripts, slow builds, and manual steps.",
      },
      {
        step: "02",
        title: "Tooling Architecture",
        desc: "We design ergonomic, well-structured tools with clear command hierarchies and helpful output.",
      },
      {
        step: "03",
        title: "Testing & Validation",
        desc: "We test across target developer platforms (macOS, Linux, Windows) to ensure consistent behavior.",
      },
      {
        step: "04",
        title: "Team Handover & Documentation",
        desc: "We document setup instructions and run a walkthrough to get your engineers onboarded smoothly.",
      },
    ],
  },
  {
    id: "enterprise",
    slug: "enterprise",
    aliases: ["enterprise-web"],
    label: "Enterprise Web",
    title: "Scalable by architecture,\nnot by accident.",
    tagline: "End-to-end web platforms engineered to grow with your business, from 100 users to 10 million.",
    headline: "Modern, secure web applications built with clean architecture and robust data integrity.",
    body: "End-to-end web platforms engineered to grow with your business, from 100 users to 10 million.",
    heroDescription:
      "We architect enterprise-grade web applications designed for stability and real-world growth. We prioritize maintainable codebases, strong database design, atomic transaction safety, and responsive user experiences.",
    altColorIndex: "2",
    icon: "/images/icons/website3d.png",
    iconType: "3d",
    metrics: [
      { value: "100%", label: "Strict TypeScript", detail: "End-to-end type safety from schema to client" },
      { value: "ACID", label: "Data Integrity", detail: "Atomic database transactions and strong consistency" },
      { value: "Fast", label: "Edge Rendering", detail: "Server-side rendering with Next.js App Router" },
      { value: "Modular", label: "Clean Architecture", detail: "Separation of concerns without vendor lock-in" },
    ],
    pillars: [
      {
        title: "Relational Database Design & Integrity",
        description:
          "Robust PostgreSQL schemas with explicit foreign keys, indexes, transactions, and migration management to keep your business data accurate and consistent.",
        tags: ["POSTGRESQL", "DATABASE INDEXES", "MIGRATIONS", "ACID"],
      },
      {
        title: "Modern React & Server Components",
        description:
          "Fast web applications leveraging Next.js App Router and React Server Components to minimize client bundle sizes and deliver fast initial page loads.",
        tags: ["NEXT.JS", "REACT 19", "SERVER COMPONENTS", "TYPESCRIPT"],
      },
      {
        title: "Role-Based Access Control (RBAC)",
        description:
          "Secure user authentication and permissions architectures with encrypted session cookies, protected routes, and audit trails for sensitive administrative actions.",
        tags: ["AUTH", "RBAC", "SECURITY", "SESSION MANAGEMENT"],
      },
      {
        title: "Real-Time Updates & Responsive UX",
        description:
          "Fluid user interfaces with optimistic state updates, clean loading feedback, and WebSocket or polling synchronization for active data dashboards.",
        tags: ["REAL-TIME", "WEBSOCKETS", "OPTIMISTIC UI", "DASHBOARDS"],
      },
    ],
    caseStudies: [
      {
        title: "Atlas — Sovereign High-Velocity Event Ticketing",
        subtitle: "Production Ticketing Infrastructure",
        description:
          "Built a ticket reservation and checkout system engineered to prevent overselling through atomic database locking, queue handling, and verified payment processing with Paystack.",
        highlight: "Guaranteed single-owner seat allocation with atomic database transactions",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
        tags: ["ATLAS", "TICKETING", "POSTGRESQL", "PAYSTACK"],
      },
      {
        title: "Centralized Administrative & Operations Portal",
        subtitle: "Business Management Platform",
        description:
          "Engineered a multi-role administrative backoffice for staff to manage customer orders, track operational metrics, view activity logs, and resolve user inquiries efficiently.",
        highlight: "Replaced scattered spreadsheets with a secure, role-restricted web platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        tags: ["ADMIN PORTAL", "ROLE PERMISSIONS", "OPERATIONS"],
      },
    ],
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma / Drizzle",
      "Redis",
      "Tailwind CSS",
      "Docker",
      "Paystack",
      "Resend",
    ],
    deliverables: [
      "Complete web platform source code repository with full documentation",
      "PostgreSQL database schemas with versioned migration scripts",
      "Secure authentication and role authorization integration",
      "Responsive UI matching design system specifications across mobile and desktop",
      "Deployment guides for Vercel, Docker, or self-hosted cloud environments",
    ],
    processSteps: [
      {
        step: "01",
        title: "Data Modeling & User Flows",
        desc: "We define core database entities, relationships, constraints, and user permission levels.",
      },
      {
        step: "02",
        title: "Architecture & API Contract",
        desc: "We design server actions, REST/tRPC route handlers, and transaction boundaries.",
      },
      {
        step: "03",
        title: "Iterative Feature Sprints",
        desc: "We build features in testable increments with continuous staging deployment for your review.",
      },
      {
        step: "04",
        title: "Production Deployment & Handover",
        desc: "We configure production databases, environment variables, monitoring, and transfer complete access.",
      },
    ],
  },
  {
    id: "mobile",
    slug: "mobile",
    aliases: ["mobile-apps"],
    label: "Mobile",
    title: "iOS & Android,\nnative at heart.",
    tagline: "Cross-platform applications that feel native on every device, delivering performance users expect.",
    headline: "Fast, responsive mobile applications for iOS and Android.",
    body: "Cross-platform applications that feel native on every device, delivering performance users expect.",
    heroDescription:
      "We build polished mobile applications for iOS and Android using modern cross-platform engineering. We focus on natural gesture interactions, offline-first data persistence, and reliable hardware integration.",
    altColorIndex: "1",
    icon: "/images/icons/mobile3d.png",
    iconType: "3d",
    metrics: [
      { value: "60-120", label: "Target FPS", detail: "Smooth gesture and transition animations" },
      { value: "Offline", label: "First Architecture", detail: "Local SQLite caching for low-connectivity environments" },
      { value: "Unified", label: "Cross-Platform Core", detail: "Shared codebase between iOS and Android" },
      { value: "Native", label: "Device Integration", detail: "Biometrics, camera scanning, and push notifications" },
    ],
    pillars: [
      {
        title: "Smooth Gesture-Driven Interfaces",
        description:
          "Fluid animations and natural touch responses that make navigating through screens, sheets, and lists feel native to iOS and Android.",
        tags: ["REACT NATIVE", "REANIMATED", "TOUCH FEEDBACK", "UI/UX"],
      },
      {
        title: "Offline-First Local Storage",
        description:
          "Local data caching using SQLite and WatermelonDB so users can read data and draft actions even without active mobile data or Wi-Fi.",
        tags: ["SQLITE", "LOCAL STORAGE", "OFFLINE CAPABLE"],
      },
      {
        title: "Hardware API Bridges",
        description:
          "Clean integrations with mobile hardware features including camera barcode scanning, biometric authentication (FaceID/Fingerprint), and push notifications.",
        tags: ["CAMERA APIS", "BIOMETRICS", "PUSH NOTIFICATIONS"],
      },
      {
        title: "Cross-Platform Consistency",
        description:
          "A unified React Native core that respects platform-specific design conventions like navigation headers, back button gestures, and safe area insets.",
        tags: ["IOS", "ANDROID", "SHARED CODEBASE"],
      },
    ],
    caseStudies: [
      {
        title: "Famlink — Bridging the Gap Across Generations",
        subtitle: "Family Connection Mobile App",
        description:
          "Designed and engineered a cross-platform mobile app to connect families across regions with photo sharing, community boards, and an accessible, easy-to-read interface.",
        highlight: "Built with a single React Native codebase running seamlessly on iOS and Android",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
        tags: ["FAMLINK", "REACT NATIVE", "MOBILE APP", "CROSS-PLATFORM"],
      },
      {
        title: "Operational Field Logging Mobile App",
        subtitle: "Field Team Workflows",
        description:
          "Constructed a focused mobile tool for staff in the field to log operational checks, capture photos with timestamps, and queue entries locally until an internet connection is restored.",
        highlight: "Reliable offline draft saving that syncs automatically when online",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
        tags: ["FIELD TEAMS", "OFFLINE SYNC", "CAMERA LOGGING"],
      },
    ],
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "React Native Reanimated",
      "NativeWind / Tailwind",
      "Expo EAS",
      "REST / GraphQL APIs",
    ],
    deliverables: [
      "Ready-to-test Expo / React Native project repository with clear build instructions",
      "Standalone Android APK and iOS build configurations for device testing",
      "Offline caching layer with database migration utilities",
      "Reusable UI components adhering to your brand's styling guidelines",
      "Step-by-step documentation for App Store and Google Play deployment",
    ],
    processSteps: [
      {
        step: "01",
        title: "Wireframes & Interactive Flows",
        desc: "We map out user flows, screen hierarchies, and touch interactions before writing code.",
      },
      {
        step: "02",
        title: "Core App & Local Data Setup",
        desc: "We build navigation structures, local database schemas, and API integration layers.",
      },
      {
        step: "03",
        title: "Device Testing & Polishing",
        desc: "We test on real iOS and Android devices to verify performance, safe areas, and touch ergonomics.",
      },
      {
        step: "04",
        title: "Store Readiness & Handover",
        desc: "We prepare app assets, bundle identifiers, and release documentation for app store publishing.",
      },
    ],
  },
  {
    id: "ai",
    slug: "ai",
    aliases: ["ai-driven", "ai-systems"],
    label: "AI-Driven",
    title: "Intelligence embedded,\nnot bolted on.",
    tagline: "AI systems integrated at the architecture level, not afterthoughts, but load-bearing pillars.",
    headline: "Practical AI integrations embedded directly into your core business applications.",
    body: "AI systems integrated at the architecture level, not afterthoughts, but load-bearing pillars.",
    heroDescription:
      "We integrate artificial intelligence at the architectural layer to solve tangible business problems. From retrieval-augmented generation (RAG) and semantic search to computer vision and custom model fine-tuning, our focus is on accuracy, cost efficiency, and data privacy.",
    altColorIndex: "4",
    icon: "/images/icons/brain3d.png",
    iconType: "3d",
    metrics: [
      { value: "Private", label: "Data Protection", detail: "Proprietary client data is never used to train external models" },
      { value: "Grounded", label: "RAG Retrieval", detail: "Vector search grounded in verified internal documents" },
      { value: "Fast", label: "Streaming UX", detail: "Sub-second token streaming via Vercel AI SDK" },
      { value: "Targeted", label: "Cost-Effective LLMs", detail: "Right-sized models optimized for specific tasks" },
    ],
    pillars: [
      {
        title: "Retrieval-Augmented Generation (RAG)",
        description:
          "Connecting language models to your proprietary documentation, knowledge bases, and databases using vector embeddings and similarity search for truthful answers.",
        tags: ["RAG PIPELINES", "VECTOR EMBEDDINGS", "PGVECTOR", "SEMANTIC SEARCH"],
      },
      {
        title: "Computer Vision & Visual Inspection",
        description:
          "Integrating OpenCV and vision models to analyze camera feeds, identify visual patterns, and automate manual image verification workflows.",
        tags: ["COMPUTER VISION", "OPENCV", "IMAGE ANALYSIS"],
      },
      {
        title: "Structured Output & Agentic Workflows",
        description:
          "Guiding models to produce validated JSON schemas, query APIs, and execute multi-step business logic reliably without hallucinations.",
        tags: ["STRUCTURED OUTPUTS", "FUNCTION CALLING", "JSON SCHEMAS"],
      },
      {
        title: "Privacy & Data Boundary Controls",
        description:
          "Hardened API proxies with rate limiting, prompt hygiene, and enterprise data retention policies so confidential company information stays safe.",
        tags: ["DATA PRIVACY", "API GATEWAY", "PROMPT HYGIENE"],
      },
    ],
    caseStudies: [
      {
        title: "Niena — AI-Driven Career Integration & Interview Simulations",
        subtitle: "Production AI Platform",
        description:
          "Built an interactive interview simulation engine that uses structured prompt chaining and vector search to assess skills, simulate interviewer questions, and provide constructive feedback.",
        highlight: "Real-time streaming feedback tailored to specific job competencies",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80",
        tags: ["NIENA", "STREAMING AI", "INTERVIEW ENGINE", "EMBEDDINGS"],
      },
      {
        title: "Computer Vision for Workflow Inspection",
        subtitle: "Visual Quality Verification",
        description:
          "Constructed automated image analysis routines using computer vision to check photographed items for alignment, detect missing components, and flag anomalies.",
        highlight: "Automated manual image verification with reproducible inspection rules",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
        tags: ["COMPUTER VISION", "IMAGE INSPECTION", "AUTOMATION"],
      },
    ],
    techStack: [
      "Vercel AI SDK",
      "Python",
      "TypeScript",
      "PyTorch",
      "OpenCV",
      "PostgreSQL pgvector",
      "OpenAI / Anthropic APIs",
      "Ollama (Self-Hosted)",
      "LangChain",
    ],
    deliverables: [
      "Production-ready AI integration pipelines with streaming responses",
      "Vector search setup with automated document ingestion and embedding scripts",
      "Prompt evaluation test suites and schema validation safeguards",
      "Admin telemetry dashboard tracking API costs, latency, and token consumption",
      "Documentation outlining model parameters, fallback strategies, and data governance",
    ],
    processSteps: [
      {
        step: "01",
        title: "Use-Case & Data Assessment",
        desc: "We evaluate your documents, target workflows, and accuracy needs to pick the right architecture.",
      },
      {
        step: "02",
        title: "Embedding & Prompt Engineering",
        desc: "We build embedding pipelines, test chunking strategies, and tune prompts against representative test cases.",
      },
      {
        step: "03",
        title: "Integration & Safeguards",
        desc: "We embed the solution into your application with streaming UI, timeout fallbacks, and schema validation.",
      },
      {
        step: "04",
        title: "Evaluation & Handover",
        desc: "We establish monitoring for token usage and latency, handing over full configuration control.",
      },
    ],
  },
  {
    id: "cloud",
    slug: "cloud",
    aliases: ["cloud-infrastructure"],
    label: "Cloud",
    title: "Infrastructure that\ndisappears.",
    tagline: "Cloud architecture so reliable and invisible that your team only thinks about the product.",
    headline: "Reliable, maintainable cloud setups with automated deployments and backups.",
    body: "Cloud architecture so reliable and invisible that your team only thinks about the product.",
    heroDescription:
      "We design and configure cloud infrastructure so you can ship features without worrying about server crashes or manual updates. We emphasize Docker containerization, Infrastructure as Code, automated deployments, and regular encrypted backups.",
    altColorIndex: "3",
    icon: "/images/icons/Cloud3d.png",
    iconType: "3d",
    metrics: [
      { value: "Zero", label: "Manual SSH Deploys", detail: "Automated CI/CD deployments on git push" },
      { value: "Daily", label: "Automated Backups", detail: "Encrypted database snapshots with recovery procedures" },
      { value: "Edge", label: "CDN Acceleration", detail: "Cloudflare global caching and DDoS protection" },
      { value: "Clean", label: "Infrastructure as Code", detail: "Reproducible Terraform and Docker configurations" },
    ],
    pillars: [
      {
        title: "Containerization with Docker",
        description:
          "Standardized Docker container images ensuring applications run identically across local development, staging environments, and production servers.",
        tags: ["DOCKER", "CONTAINERIZATION", "CONSISTENT BUILDS"],
      },
      {
        title: "Continuous Deployment (CI/CD)",
        description:
          "Automated deployment pipelines that test code on pull requests and deploy verified commits directly to staging or production without manual server access.",
        tags: ["CI/CD", "GITHUB ACTIONS", "AUTOMATED DEPLOYS"],
      },
      {
        title: "Edge CDN & Security Caching",
        description:
          "Configuring Cloudflare or AWS CloudFront to serve static assets near users, manage SSL certificates, and protect servers from automated scrapers.",
        tags: ["CLOUDFLARE", "CDN", "SSL/TLS", "EDGE CACHING"],
      },
      {
        title: "Backup Routines & Recovery Plans",
        description:
          "Automated scheduled database backups stored in isolated cloud storage, paired with documented restoration runbooks so your data is protected.",
        tags: ["DATABASE BACKUPS", "DISASTER RECOVERY", "ENCRYPTION"],
      },
    ],
    caseStudies: [
      {
        title: "Automated Containerized Cloud & CI/CD Pipelines",
        subtitle: "Web Application Infrastructure",
        description:
          "Configured containerized Docker setups and GitHub Actions workflows that automatically build, test, and deploy applications to production on push.",
        highlight: "Eliminated manual terminal steps with repeatable automated deploys",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
        tags: ["DOCKER", "GITHUB ACTIONS", "AUTOMATED DEPLOY"],
      },
      {
        title: "Edge CDN & Database Backup Routine",
        subtitle: "Web Platform Reliability",
        description:
          "Implemented Cloudflare edge caching, rate limiting, and nightly encrypted PostgreSQL snapshot backups stored in secure object storage.",
        highlight: "Scheduled daily snapshot backups with verified restoration runbooks",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
        tags: ["CLOUDFLARE", "BACKUP PIPELINES", "POSTGRESQL"],
      },
    ],
    techStack: [
      "Docker",
      "GitHub Actions",
      "Cloudflare",
      "AWS (S3, EC2, RDS)",
      "Vercel",
      "DigitalOcean / Hetzner",
      "Terraform",
      "PostgreSQL",
      "Linux / Ubuntu",
      "Nginx",
    ],
    deliverables: [
      "Production-ready Dockerfiles and docker-compose configurations",
      "GitHub Actions workflow files for automated test runs and deployments",
      "Automated database backup script with offsite storage instructions",
      "Cloudflare DNS, SSL, and caching rule configurations",
      "Clear deployment runbook and credentials handover document",
    ],
    processSteps: [
      {
        step: "01",
        title: "Architecture & Needs Review",
        desc: "We analyze expected traffic, storage needs, and budget to choose a sensible, cost-effective hosting stack.",
      },
      {
        step: "02",
        title: "Docker & Environment Setup",
        desc: "We containerize the application, configure environment variables, and verify builds.",
      },
      {
        step: "03",
        title: "CI/CD & Backup Pipeline",
        desc: "We set up automated deployment triggers, test workflows, and scheduled database backups.",
      },
      {
        step: "04",
        title: "Verification & Handover",
        desc: "We test failover and backup recovery, and document all maintenance steps for your team.",
      },
    ],
  },
  {
    id: "desktop",
    slug: "desktop",
    aliases: ["desktop-apps"],
    label: "Desktop",
    title: "Power without\ncompromise.",
    tagline: "High-performance desktop applications for professionals who demand more from their tools.",
    headline: "Fast, focused desktop applications for demanding offline and local workflows.",
    body: "High-performance desktop applications for professionals who demand more from their tools.",
    heroDescription:
      "For workflows requiring direct filesystem access, local compute, or offline availability, we build desktop software using modern, lightweight frameworks like Tauri, Rust, and Electron.",
    altColorIndex: "2",
    icon: "/images/icons/desktop3d.png",
    iconType: "3d",
    metrics: [
      { value: "Lean", label: "Memory Footprint", detail: "Lightweight native architecture with Tauri and Rust" },
      { value: "Fast", label: "Local Cold Start", detail: "Quick launch times without unnecessary browser bloat" },
      { value: "Direct", label: "Filesystem Access", detail: "Local file manipulation and hardware peripheral support" },
      { value: "3 OS", label: "Universal Distribution", detail: "Cross-platform builds for macOS, Windows, and Linux" },
    ],
    pillars: [
      {
        title: "Lightweight Architecture with Tauri",
        description:
          "Using Tauri and Rust to create small, fast application binaries with low memory overhead, avoiding the excessive RAM usage of heavy desktop wrappers.",
        tags: ["TAURI", "RUST", "LIGHTWEIGHT", "CROSS-PLATFORM"],
      },
      {
        title: "Direct Local Filesystem & Hardware Access",
        description:
          "Interfacing directly with local files, serial ports, and peripherals to process data securely without sending it over the network.",
        tags: ["FILESYSTEM", "LOCAL HARDWARE", "SERIAL PORTS"],
      },
      {
        title: "Offline-First Persistence",
        description:
          "Embedded local SQLite databases and persistent file caches that allow the application to function with 100% reliability offline.",
        tags: ["SQLITE", "OFFLINE OPERATION", "LOCAL PERSISTENCE"],
      },
      {
        title: "Installer Bundling & Auto-Updates",
        description:
          "Packaged installers for macOS (.dmg), Windows (.msi/.exe), and Linux (.deb/.AppImage) with clear update mechanisms.",
        tags: ["PACKAGING", "INSTALLERS", "MACOS", "WINDOWS"],
      },
    ],
    caseStudies: [
      {
        title: "Lightweight Cross-Platform Desktop Client with Tauri",
        subtitle: "Native Desktop Architecture",
        description:
          "Engineered a native cross-platform desktop application using Tauri and Rust, providing direct local file management and low RAM consumption.",
        highlight: "Delivered a lightweight binary that starts fast and uses minimal system memory",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
        tags: ["TAURI", "RUST", "DESKTOP APP", "LOW MEMORY"],
      },
      {
        title: "Offline Local Data Processing Workbench",
        subtitle: "Local Document & File Tools",
        description:
          "Built a desktop tool for reviewing, filtering, and organizing local datasets and files directly on user machines without requiring cloud uploads.",
        highlight: "Processes files privately on the user's computer with zero cloud dependencies",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80",
        tags: ["LOCAL COMPUTE", "OFFLINE WORKBENCH", "SQLITE"],
      },
    ],
    techStack: [
      "Tauri",
      "Rust",
      "Electron",
      "TypeScript",
      "React",
      "SQLite",
      "Tailwind CSS",
      "GitHub Releases",
    ],
    deliverables: [
      "Installer packages for target platforms (.dmg for macOS, .exe/.msi for Windows, .deb for Linux)",
      "Complete application source code with build scripts",
      "Local database schemas and migration handlers",
      "Documentation explaining how to build and package updates",
      "Clean git history and issue tracking handover",
    ],
    processSteps: [
      {
        step: "01",
        title: "Platform & Requirement Scoping",
        desc: "We define target operating systems, filesystem access needs, and local processing requirements.",
      },
      {
        step: "02",
        title: "Native Core & UI Scaffolding",
        desc: "We build the Rust/native backend handlers and develop the interactive frontend UI.",
      },
      {
        step: "03",
        title: "Cross-OS Testing",
        desc: "We test on macOS, Windows, and Linux to ensure consistent behavior and window handling.",
      },
      {
        step: "04",
        title: "Packaging & Handover",
        desc: "We produce clean installer bundles and provide complete build documentation.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  const normalized = slug.toLowerCase().trim();
  return servicesList.find(
    (s) => s.slug === normalized || s.id === normalized || s.aliases.includes(normalized)
  );
}

export function getAllServiceSlugs(): string[] {
  const slugs: string[] = [];
  servicesList.forEach((s) => {
    slugs.push(s.slug);
    s.aliases.forEach((a) => slugs.push(a));
  });
  return slugs;
}
