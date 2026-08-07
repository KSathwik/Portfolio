"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, RefreshCw, ChevronDown } from "lucide-react";

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
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-foreground text-background shadow-2xl hover:opacity-90 transition-all font-mono text-xs cursor-pointer group"
            aria-label="Open AI Assistant Chatbot"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <Bot size={16} />
            <span className="font-semibold">Ask Sathwik&apos;s AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all ${
              isMinimized ? "h-16" : "h-[520px]"
            }`}
            role="dialog"
            aria-label="AI Portfolio Assistant"
          >
            {/* Chat Header */}
            <div className="p-4 bg-secondary/80 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold font-mono uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    Sathwik AI Assistant
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    RAG + LLM Knowledge Agent
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                  aria-label="Minimize Chat"
                >
                  <ChevronDown size={16} className={`transform transition-transform ${isMinimized ? "rotate-180" : ""}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                  aria-label="Close Chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-foreground text-background rounded-br-none"
                            : "bg-secondary/90 text-foreground border border-border/60 rounded-bl-none leading-relaxed"
                        }`}
                      >
                        <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        {msg.citation && (
                          <a
                            href={msg.citation}
                            onClick={() => setIsOpen(false)}
                            className="inline-block mt-2 font-mono text-[10px] text-emerald-500 underline underline-offset-2 hover:opacity-80"
                          >
                            Jump to section &rarr;
                          </a>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1.5 text-muted-foreground p-2 font-mono text-[10px]">
                      <RefreshCw size={12} className="animate-spin" />
                      <span>Searching RAG vector store...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Preset Prompt Pills */}
                <div className="px-3 py-2 border-t border-border/40 bg-secondary/30 flex gap-1.5 overflow-x-auto no-scrollbar">
                  {PRESET_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="px-2.5 py-1 text-[10px] font-mono whitespace-nowrap bg-card border border-border/60 rounded-full text-muted-foreground hover:text-foreground hover:border-border transition-all shrink-0"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input Footer */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="p-3 border-t border-border flex items-center gap-2 bg-card"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Sathwik's experience..."
                    className="flex-1 px-3 py-2 text-xs bg-secondary/50 border border-border/50 rounded-xl outline-none focus:border-foreground/30 text-foreground placeholder:text-muted-foreground/60"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="p-2 rounded-xl bg-foreground text-background hover:opacity-90 disabled:opacity-40 transition-opacity"
                    aria-label="Send message"
                  >
                    <Send size={14} />
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
