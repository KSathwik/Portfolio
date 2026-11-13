"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  citation?: string;
}

const PRESET_PROMPTS = [
  "What GenAI experience does Sathwik have?",
  "Tell me about his RAG & FAISS projects.",
  "What backend frameworks does he specialize in?",
  "Has Sathwik worked with Salesforce & Cloud?",
];

function generateResponse(query: string): { text: string; citation?: string } {
  const q = query.toLowerCase();

  if (q.includes("rag") || q.includes("faiss") || q.includes("knowledge") || q.includes("vector")) {
    return {
      text: `Sathwik built the **AI Knowledge Assistant** featuring Hybrid RAG (Dense FAISS vector search + Sparse BM25 keyword matching) with Reciprocal Rank Fusion (RRF). He also developed a **Support Ticket AI Assistant** integrated into Salesforce Chatter feeds with sub-250ms retrieval latency across 50,000+ document vectors.`,
      citation: "#projects",
    };
  }

  if (q.includes("agent") || q.includes("email") || q.includes("orchestrat") || q.includes("react")) {
    return {
      text: `Sathwik engineered an autonomous **AI Email Orchestration System** utilizing a Multi-Agent ReAct (Reason + Act) workflow. The system coordinates specialized Planning, Generation, and Reflection agents to autonomously draft and audit personalized emails with 98.5% microservice uptime.`,
      citation: "#projects",
    };
  }

  if (q.includes("backend") || q.includes("python") || q.includes("fastapi") || q.includes("api")) {
    return {
      text: `Sathwik is skilled in Python, FastAPI, Flask, AsyncIO, and REST API design. At Primesoft Solutions, he designs microservices handling authentication (JWT/OAuth), async background pipelines, and enterprise cloud integrations on AWS and Azure.`,
      citation: "#skills",
    };
  }

  if (q.includes("salesforce") || q.includes("cloud") || q.includes("azure") || q.includes("aws") || q.includes("cve")) {
    return {
      text: `Sathwik has hands-on cloud experience deploying serverless microservices on AWS Lambda and Azure App Services. On the **SmartFit Enterprise Platform**, he resolved Twilio SMS OTP delivery issues and remediated 14+ container CVE vulnerabilities.`,
      citation: "#experience",
    };
  }

  return {
    text: `Sathwik Katkam is an Associate Software Engineer specializing in Generative AI, RAG architectures, FastAPI microservices, and Multi-Agent AI workflows. He holds a B.Tech in CSE (Data Science) with an 8.33 CGPA and certifications in Agentic AI (DeepLearning.AI) and IBM GenAI Engineering.`,
    citation: "#about",
  };
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "ai",
      text: `Hi! I'm Sathwik's AI Assistant. Ask me anything about his GenAI projects, Python backend work, or experience!`,
      timestamp: "12:00 PM",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // The launcher waits until the hero heading has scrolled away, so it never sits on the portrait.
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const heading = document.getElementById("about-title");
    if (!heading) return;
    const io = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(heading);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsgId = `usr-${messages.length + 1}`;
    const aiMsgId = `ai-${messages.length + 2}`;

    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const aiMsg: Message = {
        id: aiMsgId,
        sender: "ai",
        text: response.text,
        citation: response.citation,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Launcher: bottom right, shown once the hero is out of view; icon-only on small screens */}
      <AnimatePresence>
        {!isOpen && pastHero && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            className="btn fixed right-4 bottom-4 z-[var(--z-sticky)] shadow-[var(--shadow-lift)] max-sm:w-11 max-sm:px-0 sm:right-6 sm:bottom-6"
            aria-haspopup="dialog"
          >
            <Bot size={16} aria-hidden="true" />
            <span className="max-sm:visually-hidden">Ask about Sathwik</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`cut fixed right-4 bottom-6 z-[var(--z-sticky)] flex w-[calc(100vw-32px)] flex-col overflow-hidden bg-paper sm:right-6 sm:w-[400px] ${
              isMinimized ? "h-auto" : "h-[min(560px,calc(100svh-96px))]"
            }`}
            role="dialog"
            aria-label="AI Portfolio Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-rule bg-paper-2 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Bot size={16} aria-hidden="true" className="shrink-0 text-ink-2" />
                <div className="min-w-0">
                  <h3 className="text-[length:var(--text-md)] font-display font-medium text-ink">
                    Sathwik AI Assistant
                  </h3>
                  <p className="label text-xs">Answers drawn from this portfolio</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="key key--icon"
                  aria-label="Minimize Chat"
                  aria-expanded={!isMinimized}
                >
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`transition-transform duration-[var(--dur-micro)] ${isMinimized ? "rotate-180" : ""}`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="key key--icon"
                  aria-label="Close Chat"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm" aria-live="polite">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[var(--radius-input)] px-3 py-2.5 leading-relaxed text-ink ${
                          msg.sender === "user" ? "bg-paper-3" : "border border-rule bg-paper-2"
                        }`}
                      >
                        <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        {msg.citation && (
                          <a
                            href={msg.citation}
                            onClick={() => setIsOpen(false)}
                            className="link mt-2 inline-block text-xs"
                          >
                            Jump to section
                          </a>
                        )}
                      </div>
                      <span className="mt-1 px-1 font-mono text-[11px] text-ink-3">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isTyping && <p className="label">Writing…</p>}
                  <div ref={messagesEndRef} />
                </div>

                {/* Preset prompts */}
                <div className="flex flex-wrap gap-2 border-t border-rule bg-paper-2 px-3 py-3">
                  {PRESET_PROMPTS.map((prompt) => (
                    <button
                      type="button"
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="key key--sm h-auto justify-start py-1.5 text-left whitespace-normal"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2 border-t border-rule bg-paper p-3"
                >
                  <label htmlFor="chatbot-input" className="visually-hidden">
                    Your question
                  </label>
                  <input
                    id="chatbot-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Sathwik's experience..."
                    className="input min-h-10 flex-1 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="key key--primary key--icon shrink-0"
                    aria-label="Send message"
                  >
                    <Send size={14} aria-hidden="true" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
