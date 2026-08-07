import {
  Project,
  ExperienceItem,
  SkillCategory,
  Certification,
  EducationItem,
} from "@/types/portfolio";

export const PERSONAL_INFO = {
  name: "Sathwik Katkam",
  title: "Associate Software Engineer",
  roles: [
    "AI / GenAI Engineer",
    "Backend Developer",
    "Software Engineer",
  ],
  bio: "AI/ML-focused software engineer with hands-on experience in production RAG systems, backend microservices, and generative AI workflows. Experienced in Python, FastAPI, LangChain, FAISS, Next.js, and cloud deployments on AWS and Azure.",
  location: "Hyderabad, India",
  email: "sathwikkatkam@gmail.com",
  phone: "+91 6304651393",
  github: "https://github.com/KSathwik",
  linkedin: "https://linkedin.com/in/katkam-sathwik-5b5285202",
  resumeUrl: "/resume.pdf",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    description:
      "Production-ready Hybrid RAG System (FAISS + BM25) with Context-Aware Generation (CAG) & Multi-Agent Reflection pipelines supporting Claude, OpenAI, Gemini, and local Ollama LLMs.",
    longDescription:
      "Developed an end-to-end enterprise knowledge retrieval platform utilizing Hybrid Search (Dense FAISS vector search combined with Sparse BM25 keyword matching) and Reciprocal Rank Fusion (RRF). Features a multi-agent self-reflection pipeline to evaluate context relevance before LLM answer generation.",
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "FAISS",
      "BM25",
      "React",
      "Docker",
      "Ollama",
      "PostgreSQL",
    ],
    category: "AI/ML",
    highlights: [
      "Hybrid RAG (FAISS + BM25)",
      "Reciprocal Rank Fusion",
      "Multi-Model LLM Support",
      "Self-Reflection Pipeline",
    ],
    metrics: [
      "Sub-250ms retrieval latency across 50,000+ vector chunks",
      "94.2% Context Precision on benchmark evaluations",
      "Zero API cost option via local Ollama execution",
    ],
    architecture: [
      "Document Parsing -> Semantic Chunking -> SentenceTransformers Embeddings",
      "Dual-Index Storage: FAISS (Dense) + BM25 (Sparse)",
      "Reciprocal Rank Fusion (RRF) Reranking -> Context Filtering",
      "Multi-Agent Reflection Loop -> LLM Answer Synthesis",
    ],
    repoUrl: "https://github.com/KSathwik/AI-Knowledge-Assistant",
  },
  {
    id: "support-ticket-ai-assistant",
    title: "Support Ticket AI Assistant",
    description:
      "AI-powered Support Ticket Assistant using RAG, semantic search, and vector databases. Integrates with Salesforce APIs to auto-triage tickets and generate resolution summaries.",
    longDescription:
      "Engineered an automated support ticket response system integrated directly into Salesforce Chatter feeds and REST APIs. Uses vector embeddings to match incoming customer issues against historical resolution databases, boosting support agent productivity.",
    technologies: [
      "Python",
      "LangChain",
      "FAISS",
      "Salesforce API",
      "OpenAI API",
      "Gemini API",
      "Ollama",
      "Streamlit",
    ],
    category: "AI/ML",
    highlights: [
      "Salesforce Chatter Integration",
      "Semantic Resolution Matcher",
      "Multi-LLM Failover Architecture",
    ],
    metrics: [
      "Reduced average ticket response time by 45%",
      "Automated triage accuracy of 91% on test datasets",
      "Seamless failover between OpenAI, Gemini, and Ollama",
    ],
    architecture: [
      "Salesforce OAuth Integration -> Webhook/Poller Ticket Fetcher",
      "LangChain Document Loader -> FAISS Vector Store Indexing",
      "Similarity Search -> Prompt Augmentation -> Resolution Suggestion",
    ],
    repoUrl: "https://github.com/KSathwik/Support-Ticket-AI-Assistant",
  },
  {
    id: "ai-email-orchestration",
    title: "AI Email Orchestration System",
    description:
      "Multi-agent AI email platform with specialized Planning, Generation, and Reflection agents. Features a custom ReAct reasoning workflow with JWT/OAuth authentication.",
    longDescription:
      "Built an autonomous multi-agent email generation and orchestration tool. Employs a custom ReAct (Reason + Act) loop where a Planning Agent outlines email strategy, a Generation Agent drafts customized messages, and a Reflection Agent reviews tone and compliance before sending.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "LangChain",
      "JWT/OAuth",
      "SQLite",
      "AWS",
    ],
    category: "AI/ML",
    highlights: [
      "Multi-Agent ReAct Workflow",
      "Autonomous Reflection Loop",
      "Gmail API Integration",
      "JWT / OAuth Security",
    ],
    metrics: [
      "3x faster email campaign drafting",
      "Automated quality reflection scoring (88%+ pass rate)",
      "Secure token handling with zero secret leaks",
    ],
    architecture: [
      "FastAPI Gateway -> JWT/OAuth Authorization Layer",
      "Planning Agent (Decomposes Prompt) -> Generation Agent (Drafts Content)",
      "Reflection Agent (Critiques & Refines) -> Gmail API Integration",
    ],
    repoUrl: "https://github.com/KSathwik/AI-Email-Orchestration",
  },
  {
    id: "smartfit-enterprise",
    title: "SmartFit – Enterprise Platform",
    description:
      "Enterprise platform hardening, security vulnerability remediation, Twilio SMS OTP delivery fixes, and Next.js frontend performance optimization.",
    longDescription:
      "Contributed to enterprise application reliability, container vulnerability patching (CVE remediation), and third-party API stability. Fixed Twilio SMS OTP delivery failures and optimized Next.js server-side rendering pipelines.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Azure App Services",
      "Twilio API",
      "Docker",
    ],
    category: "Enterprise",
    highlights: [
      "CVE Security Hardening",
      "Twilio OTP Failover",
      "Azure Cloud Deployment",
      "SSR Performance Optimization",
    ],
    metrics: [
      "Remediated 14+ high/medium severity container CVE vulnerabilities",
      "Reduced OTP delivery failure rate from 8% to <0.1%",
      "Improved initial page load time by 35%",
    ],
    architecture: [
      "Next.js App Server -> Azure App Service Container Deployment",
      "Twilio SMS Gateway with Retries & Fallback Logic",
      "Container Image Hardening & Automated Vulnerability Scanning",
    ],
    repoUrl: "https://github.com/KSathwik/SmartFit-Enterprise",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "primesoft",
    company: "Primesoft Solutions Pvt Ltd",
    role: "Associate Software Engineer",
    duration: "June 2025 – Present",
    location: "Hyderabad, India",
    current: true,
    projects: [
      {
        name: "Support Ticket AI Assistant",
        description:
          "Architected and deployed an AI-powered Support Ticket Assistant utilizing RAG, semantic search, and FAISS vector databases to streamline support workflows.",
        technologies: [
          "Python",
          "LangChain",
          "FAISS",
          "Salesforce",
          "OpenAI",
          "Gemini",
          "Ollama",
        ],
        responsibilities: [
          "Developed AI support assistant using Retrieval-Augmented Generation (RAG) architecture",
          "Implemented high-speed semantic search using FAISS vector indexing",
          "Integrated Salesforce APIs to fetch tickets, comments, and Chatter feeds in real-time",
          "Built multi-LLM provider support allowing dynamic switching between OpenAI, Gemini, and Ollama",
        ],
        metrics: [
          "Cut support resolution turnaround time by 45%",
          "Processed 10,000+ support document chunks with sub-second retrieval",
        ],
      },
      {
        name: "AI Email Orchestration System",
        description:
          "Engineered a multi-agent AI orchestration platform automating personalized email drafting and review using ReAct reasoning loops.",
        technologies: [
          "Python",
          "FastAPI",
          "React",
          "TypeScript",
          "LangChain",
          "OAuth 2.0",
          "AWS",
        ],
        responsibilities: [
          "Designed multi-agent workflow featuring Planning, Generation, and Reflection agents",
          "Built custom ReAct (Reason + Act) decision loops to evaluate generated content quality",
          "Implemented JWT authentication and OAuth integration for secure email service access",
          "Deployed microservice backend on AWS cloud infrastructure",
        ],
        metrics: [
          "Reduced draft generation time from minutes to under 5 seconds",
          "Achieved 98.5% uptime on microservices",
        ],
      },
      {
        name: "SmartFit Enterprise Platform",
        description:
          "Led security hardening, CVE vulnerability remediation, and third-party API integration stability improvements.",
        technologies: ["Next.js", "React", "TypeScript", "Azure", "Twilio API"],
        responsibilities: [
          "Resolved critical Twilio SMS integration issues to fix OTP delivery drop-offs",
          "Executed CVE remediation activities across Next.js dependencies and Docker containers",
          "Optimized UI layout responsiveness and client state management",
        ],
        metrics: [
          "Eliminated 100% of reported high-severity container CVE vulnerabilities",
          "Restored SMS OTP delivery success rate to 99.9%",
        ],
      },
    ],
  },
  {
    id: "venago",
    company: "Venago Innovations",
    role: "Python Developer Intern",
    duration: "June 2024 – September 2024",
    location: "Hyderabad, India",
    current: false,
    projects: [
      {
        name: "Cloud-Native Services & REST APIs",
        description:
          "Developed serverless Python microservices and RESTful API endpoints on AWS Lambda and API Gateway.",
        technologies: [
          "Python",
          "Flask",
          "AWS Lambda",
          "API Gateway",
          "DynamoDB",
          "Postman",
        ],
        responsibilities: [
          "Designed and built REST APIs using Python Flask for cloud applications",
          "Implemented serverless event handlers using AWS Lambda and API Gateway",
          "Managed NoSQL data modeling and indexing in Amazon DynamoDB",
          "Created API documentation and Postman collection test suites",
        ],
        metrics: [
          "Delivered 15+ serverless endpoints under budget",
          "Achieved average serverless execution time of <120ms",
        ],
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Generative AI & LLMs",
    icon: "Brain",
    skills: [
      "RAG Architecture",
      "Hybrid Search (FAISS + BM25)",
      "LangChain",
      "Prompt Engineering",
      "Multi-Agent Systems",
      "Semantic Search",
      "OpenAI API",
      "Gemini API",
      "Ollama",
    ],
  },
  {
    title: "Backend Engineering",
    icon: "Server",
    skills: [
      "Python",
      "FastAPI",
      "Flask",
      "RESTful APIs",
      "JWT & OAuth 2.0",
      "Microservices",
      "AsyncIO",
    ],
  },
  {
    title: "Frontend & Full Stack",
    icon: "Monitor",
    skills: [
      "React.js",
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "HTML5 / CSS3",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      "AWS (Lambda, API Gateway, DynamoDB)",
      "Azure App Services",
      "Docker",
      "CI/CD Workflows",
      "Vercel",
    ],
  },
  {
    title: "Databases & Storage",
    icon: "Database",
    skills: [
      "FAISS Vector DB",
      "PostgreSQL",
      "DynamoDB",
      "SQLite",
    ],
  },
  {
    title: "Security & Quality",
    icon: "Shield",
    skills: [
      "CVE Remediation",
      "Vulnerability Scanning",
      "Secure API Design",
      "OAuth Security",
    ],
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    title: "Agentic AI",
    issuer: "DeepLearning.AI – Andrew Ng",
    status: "Completed",
    inProgress: false,
    credentialUrl: "https://www.deeplearning.ai",
    highlights: [
      "Reflection, Tool Use, Planning & Multi-Agent Workflows",
      "AI integration with databases, APIs & web search",
      "Production deployment & evaluation metrics",
    ],
  },
  {
    title: "IBM Generative AI Engineering Professional Certificate",
    issuer: "IBM – Coursera",
    status: "Completed",
    inProgress: false,
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/IBM",
    highlights: [
      "LLM Fine-tuning & Prompt Engineering",
      "RAG architecture with LangChain & Vector Stores",
      "Generative AI application deployment",
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering – Data Science",
    institution: "ACE Engineering College, Hyderabad",
    duration: "2020 – 2024",
    score: "CGPA: 8.33 / 10",
  },
  {
    degree: "Intermediate (10+2)",
    field: "MPC (Maths, Physics, Chemistry)",
    institution: "SR Junior College, Hyderabad",
    duration: "2018 – 2020",
    score: "89.0%",
  },
  {
    degree: "SSC (Secondary School Certificate)",
    field: "General Education",
    institution: "Panchavati Vidyalaya, Mahabubnagar",
    duration: "2017 – 2018",
    score: "95.0%",
  },
];
