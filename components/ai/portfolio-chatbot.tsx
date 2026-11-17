"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, ChevronDown } from "lucide-react";
import { searchSite, type Hit } from "@/lib/site-search";
import { scrollBehavior, UI_EXIT, UI_TRANSITION } from "@/lib/motion";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  hits?: Hit[];
}

const PRESET_PROMPTS = [
  "How does the knowledge assistant search?",
  "What did Sathwik build at Primesoft?",
  "How accurate is LungAI?",
  "What music does Sathwik listen to?",
];

function answer(query: string): Pick<Message, "text" | "hits"> {
  const hits = searchSite(query);
  if (hits.length === 0) {
    return {
      text: "I couldn't find that on this site. Try asking about a project, his work at Primesoft or Venago, skills, education or music.",
    };
  }
  return { text: hits.length > 1 ? "The closest passages on this site:" : "The closest passage on this site:", hits };
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "ai",
      text: `Hi! Ask anything about Sathwik and I'll find the most relevant passages on this site. It's BM25 keyword search running in your browser, no AI model, so it quotes rather than writes.`,
      timestamp: "",
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
    messagesEndRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
  }, [messages]);

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

    // Search is instant; no pretend "thinking" delay.
    const response = answer(text);
    setMessages((prev) => [
      ...prev,
      {
        id: aiMsgId,
        sender: "ai",
        text: response.text,
        hits: response.hits,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Launcher: bottom right, shown once the hero is out of view; icon-only on small screens */}
      <AnimatePresence>
        {!isOpen && pastHero && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: UI_TRANSITION }}
            exit={{ opacity: 0, y: 8, transition: UI_EXIT }}
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
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: UI_TRANSITION }}
            exit={{ opacity: 0, scale: 0.96, y: 8, transition: UI_EXIT }}
            style={{ transformOrigin: "bottom right" }}
            className={`cut fixed right-4 bottom-6 z-[var(--z-sticky)] flex w-[calc(100vw-32px)] flex-col overflow-hidden bg-paper sm:right-6 sm:w-[400px] ${
              isMinimized ? "h-auto" : "h-[min(560px,calc(100svh-96px))]"
            }`}
            role="dialog"
            aria-label="Search this portfolio"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-rule bg-paper-2 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Bot size={16} aria-hidden="true" className="shrink-0 text-ink-2" />
                <div className="min-w-0">
                  <h3 className="text-[length:var(--text-md)] font-display font-medium text-ink">
                    Quick answers about Sathwik
                  </h3>
                  <p className="label text-xs">BM25 keyword search over this site · no AI model</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="key key--icon"
                  aria-label="Minimise chat"
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
                  aria-label="Close chat"
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
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} ${msg.id === "init-1" ? "" : "pop-in"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[var(--radius-input)] px-3 py-2.5 leading-relaxed text-ink ${
                          msg.sender === "user" ? "bg-paper-3" : "border border-rule bg-paper-2"
                        }`}
                      >
                        <p>{msg.text}</p>
                        {msg.hits && (
                          <ul className="mt-2 grid list-none gap-2.5 p-0">
                            {msg.hits.map((h) => (
                              <li key={h.source + h.text.slice(0, 24)} className="grid gap-1 border-l-2 border-signal pl-2.5">
                                <span className="text-ink-2">{h.text}</span>
                                <a href={h.href} onClick={() => setIsOpen(false)} className="link w-fit text-xs">
                                  {h.source}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {msg.timestamp && (
                        <span className="mt-1 px-1 font-mono text-[11px] text-ink-3">{msg.timestamp}</span>
                      )}
                    </div>
                  ))}

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
                    placeholder="e.g. Has Sathwik used FastAPI?"
                    className="input min-h-10 flex-1 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
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
