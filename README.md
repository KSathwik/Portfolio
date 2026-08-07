# Sathwik Katkam — AI & Software Engineer Portfolio

![Next.js 16](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)

Production-grade developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **TypeScript**. 

Designed with an Anthropic-inspired aesthetic ("Warm Ivory" / "Deep Charcoal" themes) featuring fluid typography, command palette search (`Cmd+K`), semantic accessibility (a11y), and zero hardcoded data monoliths.

---

## 🌟 Key Features

- 🎨 **Anthropic Design System**: Clean ivory light theme (`#FAF9F5`) and deep charcoal dark theme (`#141413`) with font pairing (Newsreader, Inter, JetBrains Mono).
- 🔍 **Command Palette Search (`Ctrl + K` / `Cmd + K`)**: Sitewide instant search across all projects, skills, certifications, and experience items.
- ⚡ **Production Architecture**: Modular separation of concerns (`types/portfolio.ts`, `data/portfolio-data.ts`, `app/api/contact/route.ts`).
- 🤖 **GenAI & RAG Focus**: Deep dives into Hybrid RAG (FAISS + BM25), Reciprocal Rank Fusion (RRF), Multi-Agent ReAct workflows, and Salesforce API integrations.
- ♿ **WCAG Accessibility Compliance**: Semantic `<article>` project cards, keyboard navigation (`tabIndex`, `onKeyDown`), `Escape` key dialog dismissals, and focus indicators.
- 🛡️ **API Security**: Serverless Next.js API Route for contact submission with honeypot bot trap and strict payload validation.
- 📄 **Verified Resume Assets**: Direct PDF download and inline preview integration.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling & Motion** | Tailwind CSS v4, Framer Motion, `@base-ui/react`, Lucide Icons |
| **Generative AI & LLMs** | LangChain, FAISS Vector DB, BM25, OpenAI API, Gemini, Ollama, ReAct Agents |
| **Backend & Cloud** | Python, FastAPI, Flask, AWS Lambda, Azure App Services, Docker |
| **Databases & Infra** | PostgreSQL, FAISS, Amazon DynamoDB, SQLite |

---

## 📁 Repository Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Contact form API route with honeypot validation
│   ├── globals.css              # Custom Anthropic design system tokens & animations
│   ├── layout.tsx               # Root layout with SEO Metadata & Schema.org JSON-LD
│   └── page.tsx                 # Main application page
├── components/
│   ├── command-palette.tsx       # Cmd+K sitewide search modal
│   ├── navigation.tsx           # Accessible sticky header with theme toggle
│   ├── loading-screen.tsx       # Smooth non-intrusive loading overlay
│   └── sections/
│       ├── hero.tsx             # Hero header with role typing animation
│       ├── about.tsx            # Background summary & highlights
│       ├── experience.tsx       # Quantified work experience breakdown
│       ├── projects.tsx         # Semantic project cards with architecture modals
│       ├── skills.tsx           # Categorized technology stack
│       ├── certifications.tsx   # Verified credentials & highlights
│       ├── education.tsx        # Academic history
│       └── contact.tsx          # Real API-backed contact form
├── data/
│   └── portfolio-data.ts        # Centralized maintainable portfolio content model
├── types/
│   └── portfolio.ts             # TypeScript interfaces & domain models
└── public/
    └── resume.pdf               # Verified candidate resume asset
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KSathwik/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Quality & CI/CD

Run static code verification and linter checks:

```bash
# Type check TypeScript definitions
npx tsc --noEmit

# Run ESLint
npm run lint

# Build production bundle
npm run build
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by [Sathwik Katkam](https://github.com/KSathwik)**
