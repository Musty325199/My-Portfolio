"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { Copy, Check, ArrowUpRight, Send, Mail, MessageSquare } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const email = PORTFOLIO_CONTENT.links.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (data.fallbackMailto && data.mailtoUrl) {
        window.location.href = data.mailtoUrl;
        setSubmitStatus({
          type: "success",
          message: "Opening your email client to send message directly.",
        });
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitStatus({
        type: "success",
        message: "Message received! Musty will get back to you shortly.",
      });
      setFormState({ name: "", email: "", company: "", message: "", honeypot: "" });
    } catch (err: any) {
      setSubmitStatus({
        type: "error",
        message: err.message || "Something went wrong. Please use the direct email link above.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.12]">
      {/* Header */}
      <div className="border-b border-white/[0.12] pb-6 mb-12">
        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
          08 / Get in Touch
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight">
          Let&apos;s Build Something Real
        </h2>
        <p className="font-mono text-xs text-[#A39E92] mt-2">
          {PORTFOLIO_CONTENT.identity.availability}
        </p>
      </div>

      {/* Giant Rolling-text Email Link & Copy Button */}
      <div className="mb-16 pb-12 border-b border-white/[0.08]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 min-w-0">
          <div className="min-w-0 max-w-full overflow-hidden py-2">
            <a
              href={`mailto:${email}`}
              className="group font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#F2EEE6] hover:text-[#FF6A2B] transition-colors tracking-tight block truncate sm:whitespace-nowrap"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                {email}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 border border-white/20 hover:border-[#FF6A2B] text-[#F2EEE6] hover:text-[#FF6A2B] font-mono text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy email</span>
                </>
              )}
            </button>
            <a
              href={PORTFOLIO_CONTENT.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-mono text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Quick Form & Social Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#141311] border border-white/[0.08] p-6 sm:p-8 rounded-lg">
          <h3 className="font-serif text-2xl text-[#F2EEE6] tracking-tight mb-2">
            Send a Direct Message
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A39E92] mb-6">
            For freelance projects, full-time engineering roles, or consulting queries.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot anti-spam field (hidden from users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company_honeypot">Leave blank</label>
              <input
                id="company_honeypot"
                type="text"
                tabIndex={-1}
                value={formState.honeypot}
                onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] text-[#A39E92] uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[#0E0D0B] border border-white/[0.12] rounded-xs px-3.5 py-2.5 text-sm text-[#F2EEE6] focus:border-[#FF6A2B] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#A39E92] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-[#0E0D0B] border border-white/[0.12] rounded-xs px-3.5 py-2.5 text-sm text-[#F2EEE6] focus:border-[#FF6A2B] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#A39E92] uppercase tracking-wider mb-1.5">
                Company or Project (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Labs"
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                className="w-full bg-[#0E0D0B] border border-white/[0.12] rounded-xs px-3.5 py-2.5 text-sm text-[#F2EEE6] focus:border-[#FF6A2B] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#A39E92] uppercase tracking-wider mb-1.5">
                Message / Brief *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about what you are building or the role you are hiring for..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-[#0E0D0B] border border-white/[0.12] rounded-xs px-3.5 py-2.5 text-sm text-[#F2EEE6] focus:border-[#FF6A2B] focus:outline-none transition-colors resize-none"
              />
            </div>

            {submitStatus.message && (
              <div
                className={`p-3 rounded-xs font-mono text-xs ${
                  submitStatus.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF6A2B] hover:bg-[#FF854A] text-[#0E0D0B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Channels & Verification */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="font-serif text-2xl text-[#F2EEE6] tracking-tight mb-4">
              Verified Presence
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <a
                href={PORTFOLIO_CONTENT.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-sm border border-white/[0.08] hover:border-[#FF6A2B] bg-[#141311] flex items-center justify-between text-[#F2EEE6] hover:text-[#FF6A2B] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 fill-[#FF6A2B]" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>github.com/Musty325199</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#6B665C]" />
              </a>

              <a
                href={PORTFOLIO_CONTENT.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-sm border border-white/[0.08] hover:border-[#FF6A2B] bg-[#141311] flex items-center justify-between text-[#F2EEE6] hover:text-[#FF6A2B] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>+234 906 532 3916 (WhatsApp)</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#6B665C]" />
              </a>

              <a
                href={PORTFOLIO_CONTENT.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-sm border border-white/[0.08] hover:border-[#FF6A2B] bg-[#141311] flex items-center justify-between text-[#F2EEE6] hover:text-[#FF6A2B] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 fill-[#0077B5]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>linkedin.com/in/mustapha-lawal</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#6B665C]" />
              </a>
            </div>
          </div>

          <div className="p-5 rounded-sm border border-white/[0.08] bg-[#141311] font-mono text-xs text-[#A39E92] space-y-2">
            <span className="text-[#FF6A2B] block uppercase tracking-wider">
              Hiring Note
            </span>
            <p className="text-[#F2EEE6]">
              I work with founders and engineering teams globally on remote full-stack roles and contract builds. Real-time collaboration, complex state machines, and booking architectures are my wheelhouse.
            </p>
          </div>
        </div>
      </div>

      {/* Colophon & Copyright */}
      <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#6B665C]">
        <div>
          <span>© {new Date().getFullYear()} Mustapha Lawal. Built with Next.js & Tailwind.</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO_CONTENT.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F2EEE6] transition-colors"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={PORTFOLIO_CONTENT.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F2EEE6] transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a href="#" className="hover:text-[#F2EEE6] transition-colors">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
