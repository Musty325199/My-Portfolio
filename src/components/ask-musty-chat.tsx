"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_CONTENT } from "@/data/content";
import {
  Sparkles,
  X,
  Send,
  CornerDownLeft,
  Mail,
  MessageSquare,
  Bot,
  User,
  AlertCircle,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  isFallback?: boolean;
}

export function AskMustyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-msg",
      sender: "assistant",
      text: PORTFOLIO_CONTENT.aiAssistant.emptyGreeting,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: data.answer || "I could not generate an answer. You can email Musty directly.",
        isFallback: !!data.fallback || !!data.rateLimited,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: "assistant",
          text: "Connection error. You can email Musty directly at mustyflowcrm@gmail.com or via WhatsApp at +234 906 532 3916.",
          isFallback: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI portfolio assistant"
          className="group relative px-4 py-3 bg-[#181714] hover:bg-[#201E1A] text-[#F2EEE6] border border-white/[0.18] hover:border-[#FF6A2B] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A2B] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6A2B]" />
          </span>
          <Sparkles className="w-4 h-4 text-[#FF6A2B]" />
          <span className="font-mono text-xs uppercase tracking-wider hidden sm:inline">
            Ask Musty&apos;s AI
          </span>
        </button>
      </div>

      {/* Interactive Chat Modal / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-20 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[420px] max-h-[80vh] sm:max-h-[620px] bg-[#141311] border border-white/[0.16] rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#1B1A16] border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6A2B]/10 border border-[#FF6A2B]/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#FF6A2B]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#F2EEE6]">
                    {PORTFOLIO_CONTENT.aiAssistant.name}
                  </h4>
                  <p className="font-mono text-[10px] text-[#A39E92]">
                    {PORTFOLIO_CONTENT.aiAssistant.badge}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="text-[#A39E92] hover:text-[#F2EEE6] p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs sm:text-sm ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-[#201E1A] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-[#FF6A2B]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-lg p-3.5 font-sans leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#FF6A2B] text-[#0E0D0B] font-medium"
                        : "bg-[#0E0D0B] text-[#F2EEE6] border border-white/[0.08]"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Quick Direct Actions if fallback occurred */}
                    {msg.isFallback && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2">
                        <a
                          href={`mailto:${PORTFOLIO_CONTENT.links.email}`}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-xs font-mono text-[10px] text-[#F2EEE6] flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-[#FF6A2B]" />
                          <span>Email</span>
                        </a>
                        <a
                          href={PORTFOLIO_CONTENT.links.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 rounded-xs font-mono text-[10px] text-[#25D366] flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-[#F2EEE6]" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 text-xs items-center text-[#A39E92] font-mono">
                  <div className="w-6 h-6 rounded-full bg-[#201E1A] border border-white/10 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-[#FF6A2B]" />
                  </div>
                  <div className="flex items-center gap-1.5 p-3 rounded-lg bg-[#0E0D0B] border border-white/[0.08]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips (Offline Fallback Chips) */}
            <div className="p-3 bg-[#100F0D] border-t border-white/[0.06] overflow-x-auto">
              <span className="font-mono text-[10px] text-[#6B665C] uppercase tracking-wider block mb-1.5">
                Suggested Questions (Works Offline)
              </span>
              <div className="flex gap-2 whitespace-nowrap">
                {PORTFOLIO_CONTENT.aiAssistant.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChipClick(q.chip)}
                    disabled={loading}
                    className="font-mono text-[11px] text-[#A39E92] hover:text-[#FF6A2B] bg-[#161512] hover:bg-[#1E1C18] border border-white/[0.08] px-2.5 py-1 rounded-sm transition-colors cursor-pointer shrink-0 disabled:opacity-40"
                  >
                    {q.chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#1B1A16] border-t border-white/[0.08]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  maxLength={300}
                  placeholder="Ask about Tessel, stack, or availability..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  className="flex-1 bg-[#0E0D0B] border border-white/[0.12] rounded-md px-3 py-2 text-xs text-[#F2EEE6] placeholder:text-[#6B665C] focus:border-[#FF6A2B] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send question"
                  className="p-2 bg-[#FF6A2B] hover:bg-[#FF854A] text-[#0E0D0B] rounded-md transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex justify-between items-center mt-1 px-1 font-mono text-[9px] text-[#6B665C]">
                <span>Grounding: content.ts only</span>
                <span>{input.length}/300</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
