import {
  Project,
  ExperienceItem,
  SkillCategory,
  Certification,
  EducationItem,
  MusicArtist,
  GalleryPhoto,
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
  /** WhatsApp number in international format, digits only. */
  whatsapp: "916304651393",
  github: "https://github.com/KSathwik",
  linkedin: "https://linkedin.com/in/katkam-sathwik-5b5285202",
  resumeUrl: "/resume.pdf",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    context: "Personal project",
    description:
      "Upload PDFs or Word files and ask questions in a chat interface. Every answer is grounded in your documents, with claim-level citations, a confidence score and a reflection pass that re-checks the draft before you see it.",
    longDescription:
      "A document Q&A assistant built on hybrid RAG and context-aware generation (CAG). Small documents go straight into the model's context; larger ones fall back to hybrid retrieval, dense FAISS search plus BM25 keyword matching with optional cross-encoder reranking. A multi-agent pipeline (orchestrator, retrieval, knowledge, reflection, memory) drafts each answer, then a reflection agent checks it against the source excerpts. Two deterministic classifiers decide what the question is about and what shape the answer should take (summary, comparison table, flashcards and more) without extra LLM calls.",
    technologies: [
      "Python",
      "FastAPI",
      "FAISS",
      "BM25",
      "SQLAlchemy",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Ollama",
    ],
    category: "AI/ML",
    highlights: [
      "Hybrid RAG (FAISS + BM25) with CAG for small documents",
      "Claim-level citations and confidence scoring",
      "Reflection agent re-checks every draft",
      "Streaming answers over WebSockets",
    ],
    metrics: [
      "350+ automated tests, isolated from real project data",
      "4 LLM providers: Claude, OpenAI, Gemini or local Ollama",
      "0 extra LLM calls to classify intent and answer format",
    ],
    architecture: [
      "Upload (PDF/DOCX) -> parsing -> chunking -> Sentence Transformers embeddings",
      "Small scope: whole document into context (CAG); large scope: FAISS + BM25 hybrid search",
      "Orchestrator -> Retrieval -> Knowledge -> Reflection -> Memory agents",
      "FastAPI + WebSocket streaming; PostgreSQL, Redis and Nginx via Docker Compose",
    ],
    repoUrl: "https://github.com/KSathwik/AI_Knowledge_Assistant",
  },
  {
    id: "support-ticket-ai-assistant",
    title: "Support Ticket AI Assistant",
    context: "Built at Primesoft · private code",
    description:
      "Support agents kept re-solving tickets that had been solved before. I built an assistant that reads a new Salesforce ticket, finds the closest past resolutions with semantic search, and drafts a suggested fix.",
    longDescription:
      "Built at Primesoft for an enterprise support team. Tickets, comments and Chatter feeds come in through the Salesforce APIs; past resolutions are chunked, embedded with Sentence Transformers and indexed in FAISS. When a new ticket arrives, the closest matches are retrieved and passed to the LLM, which drafts a resolution the agent can edit. The model provider (OpenAI, Gemini or a local Ollama model) is a config switch, so the team can run it fully on-prem.",
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
      "Cut average ticket resolution time by 45%",
      "10,000+ support document chunks searched in under a second",
      "Switches between OpenAI, Gemini and Ollama without code changes",
    ],
    architecture: [
      "Salesforce OAuth Integration -> Webhook/Poller Ticket Fetcher",
      "LangChain Document Loader -> FAISS Vector Store Indexing",
      "Similarity Search -> Prompt Augmentation -> Resolution Suggestion",
    ],
  },
  {
    id: "ai-email-orchestration",
    title: "AI Email Orchestration System",
    context: "Built at Primesoft · private code",
    description:
      "Writing a personalised email from a one-line request: a planning agent works out what's needed, a generation agent drafts it, and a reflection agent checks tone and facts before anything is sent.",
    longDescription:
      "Built at Primesoft with Python, FastAPI and React. A request like \"follow up with the vendor about Friday's delivery\" goes through intent detection and recipient resolution, asks a clarifying question when it's ambiguous, then runs a ReAct-style loop: plan, draft, reflect, revise. Drafts stream to the UI as they're written, and every route that touches a mailbox sits behind JWT and OAuth.",
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
      "Draft time down from minutes to under 5 seconds",
      "Every draft reviewed by a reflection agent before it's sent",
      "JWT and OAuth on every route that touches a mailbox",
    ],
    architecture: [
      "FastAPI Gateway -> JWT/OAuth Authorization Layer",
      "Planning Agent (Decomposes Prompt) -> Generation Agent (Drafts Content)",
      "Reflection Agent (Critiques & Refines) -> Gmail API Integration",
    ],
  },
  {
    id: "lungai-chest-xray",
    title: "LungAI: Chest X-Ray Classifier",
    context: "Research project",
    description:
      "A DenseNet-121 model that sorts frontal chest X-rays into six classes, from pneumonia to tuberculosis, served through a FastAPI backend and a React frontend. A research prototype, not a medical device.",
    longDescription:
      "I rebuilt the dataset from public sources (NIH ChestX-ray14, Kermany, Shenzhen, TBX11K and COVID-19 collections) under rules fixed before training: labels come from each source, splits are 70/15/15 by patient, and exact and near-duplicate images are merged so no patient crosses splits. The test set was evaluated once, plus an external Montgomery County cohort the model never saw. Results, the model card and the docs are generated from the evaluation output, not written by hand.",
    technologies: [
      "Python",
      "TensorFlow / Keras",
      "DenseNet-121",
      "OpenCV",
      "FastAPI",
      "React",
    ],
    category: "AI/ML",
    highlights: [
      "Six-class classification",
      "Patient-grouped, de-duplicated splits",
      "External cohort evaluation",
      "Generated model card and results",
    ],
    metrics: [
      "77.4% test accuracy, macro ROC-AUC 0.955 on 2,350 held-out X-rays",
      "External cohort (138 scans): 94.8% of TB scans flagged abnormal, but only 23.8% of normal scans called normal, and none labelled TB specifically",
      "0 patients or near-duplicate images shared across splits",
    ],
    architecture: [
      "Preprocess: Gaussian blur -> CLAHE on L channel -> low-pass -> 224x224 resize",
      "DenseNet-121 (ImageNet) -> pooling -> BatchNorm -> Dense 256 -> Dropout -> 6-way softmax",
      "FastAPI inference API returns class scores with their class order",
      "React frontend reads the class order from the API and renders the scores",
    ],
    repoUrl: "https://github.com/KSathwik/Lung_Disease_Detector",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "primesoft",
    company: "Primesoft Solutions Pvt Ltd",
    logo: "/logos/primesoft.png",
    logoSize: [256, 177],
    website: "https://primesoft.net",
    role: "Associate Software Engineer",
    duration: "June 2025 – Present",
    location: "Hyderabad, India",
    current: true,
    projects: [
      {
        name: "Support Ticket AI Assistant",
        description:
          "Built and shipped an AI support assistant that finds similar past tickets with RAG and FAISS semantic search and drafts a resolution.",
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
          "Cut average ticket resolution time by 45%",
          "10,000+ support document chunks searched in under a second",
        ],
      },
      {
        name: "AI Email Orchestration System",
        description:
          "Built a multi-agent system that turns a one-line request into a reviewed, personalised email draft.",
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
          "Draft time down from minutes to under 5 seconds",
          "Streamed drafts to the UI as they were generated",
        ],
      },
    ],
  },
  {
    id: "venago",
    company: "Venago Innovations",
    logo: "/logos/venago.png",
    logoSize: [256, 256],
    logoFill: true,
    website: "https://www.venagoinnovations.com",
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
          "Delivered 15+ serverless endpoints",
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
      "RAG",
      "Semantic Search",
      "LangChain",
      "LangGraph",
      "FAISS",
      "AI Agents",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "OpenAI",
      "Claude",
      "Gemini",
      "Ollama",
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: ["Python", "SQL", "FastAPI", "Flask", "REST APIs", "JWT / OAuth", "SQLAlchemy", "Microservices"],
  },
  {
    title: "ML & Fine-tuning",
    icon: "Cpu",
    skills: ["PyTorch", "Hugging Face Transformers", "Sentence Transformers", "Model Evaluation", "LoRA", "QLoRA"],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: ["Azure", "AWS", "GCP", "Docker", "Kubernetes", "Helm", "GitHub Actions", "Azure Pipelines", "ACR", "Trivy"],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["PostgreSQL", "Microsoft SQL Server", "SQLite", "Redis", "DynamoDB"],
  },
  {
    title: "Frontend & tools",
    icon: "Monitor",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git", "Postman", "Cursor", "WSL2"],
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    title: "Agentic AI",
    issuer: "DeepLearning.AI – Andrew Ng",
    logo: "/logos/deeplearning-ai.png",
    logoSize: [256, 256],
    status: "Completed",
    inProgress: false,
    highlights: [
      "Reflection, Tool Use, Planning & Multi-Agent Workflows",
      "AI integration with databases, APIs & web search",
      "Production deployment & evaluation metrics",
    ],
  },
  {
    title: "IBM Generative AI Engineering Professional Certificate",
    issuer: "IBM – Coursera",
    logo: "/logos/ibm.svg",
    logoSize: [1075, 401],
    status: "Completed",
    inProgress: false,
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
    duration: "2018",
    score: "95.0%",
  },
];

/* What I listen to. Spotify IDs checked against Spotify's oEmbed API. */
export const MUSIC_ARTISTS: MusicArtist[] = [
  {
    name: "Anirudh Ravichander",
    known: "Composer · Devara, Jailer, Leo",
    spotifyId: "4zCH9qm4R2DADamUHMCa6O",
    image: "https://i.scdn.co/image/ab676161000051740f0be2054fe9594026a6b843",
  },
  {
    name: "Sai Abhyankkar",
    known: "Composer · Katchi Sera, Aasa Kooda",
    spotifyId: "5jJrJU7VVmxQQLcLAmmxXc",
    image: "https://i.scdn.co/image/ab676161000051740a27dbc5eb270fd2e78b9cbb",
  },
  {
    name: "Thaman S",
    known: "Composer · Ala Vaikunthapurramuloo, OG",
    spotifyId: "2FgHPfRprDaylrSRVf1UlN",
    image: "https://i.scdn.co/image/ab676161000051741edc6d40afbea5426d0cfe0f",
  },
  {
    name: "Devi Sri Prasad",
    known: "Composer · Pushpa, Rangasthalam",
    spotifyId: "5sSzCxHtgL82pYDvx2QyEU",
    image: "https://i.scdn.co/image/ab67616100005174aa5350248841ba12e12467af",
  },
  {
    name: "Sid Sriram",
    known: "Singer · Samajavaragamana, Srivalli",
    spotifyId: "7qjJw7ZM2ekDSahLXPjIlN",
    image: "https://i.scdn.co/image/ab67616100005174ef6a8800763bf428e85940a6",
  },
  {
    name: "M. M. Keeravani",
    known: "Composer · RRR, Baahubali",
    spotifyId: "7Mc4SheGrEsan96e4gP4Yq",
    image: "https://i.scdn.co/image/ab6761610000517452d0a69e1840de19b3d651b6",
  },
];

/*
 * Photos I've taken. Drop the files in public/images/gallery/ and add them here;
 * the "Through my lens" gallery appears on its own once this list isn't empty.
 * Example: { src: "/images/gallery/hampi.jpg", alt: "Stone chariot at Hampi at sunset", caption: "Hampi, 2025" }
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: "/images/gallery/waterfall.jpg", alt: "A waterfall spilling over dark rocks into green forest under a cloudy sky", caption: "chasing waterfalls, Aug 2024", width: 675, height: 1200 },
  { src: "/images/gallery/diwali-diya.jpg", alt: "A lit clay diya on a stone ledge at night", caption: "Diwali, 2024", width: 675, height: 1200 },
  { src: "/images/gallery/beach-sunrise.jpg", alt: "The sun rising over the sea with fishing boats on the shore", caption: "up before the sun, Jun 2026", width: 900, height: 1200 },
  { src: "/images/gallery/after-the-rain.jpg", alt: "A red motorcycle parked on a rain-soaked road at night under streetlights", caption: "after the rain, Jul 2026", width: 900, height: 1200 },
  { src: "/images/gallery/open-sky.jpg", alt: "Legs stretched out on a grassy hill under a wide blue sky with clouds", caption: "doing nothing, properly, Jul 2025", width: 675, height: 1200 },
  { src: "/images/gallery/stadium-fireworks.jpg", alt: "Fireworks over a packed stadium at night, seen from the stands", caption: "from the stands, Oct 2026", width: 1200, height: 900 },
  { src: "/images/gallery/lake-at-dusk.jpg", alt: "A lake at dusk with the city skyline silhouetted against a cloudy sky", caption: "the lake at dusk, May 2026", width: 900, height: 1200 },
  { src: "/images/gallery/waves.jpg", alt: "Feet in the foam as a wave washes over the sand", caption: "the sea, up close, Jun 2026", width: 900, height: 1200 },
  { src: "/images/gallery/fireworks.jpg", alt: "A burst of white fireworks against a black night sky", caption: "one good burst, Oct 2026", width: 900, height: 1200 },
];
