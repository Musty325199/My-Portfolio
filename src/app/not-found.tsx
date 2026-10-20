import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[100svh] bg-[#0E0D0B] text-[#F2EEE6] flex flex-col justify-between p-6 sm:p-12 md:p-16">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 font-mono text-xs text-[#A39E92]">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
          404 / Page Not Found
        </span>
        <Link href="/" className="hover:text-[#F2EEE6] transition-colors">
          Mustapha Lawal
        </Link>
      </div>

      <div className="my-auto max-w-2xl">
        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-3">
          Error 404
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl text-[#F2EEE6] tracking-tight mb-4">
          Route Does Not Exist
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#A39E92] leading-relaxed mb-8">
          The requested path was moved, deleted, or does not exist on this portfolio. Return to the selected works or explore Tessel.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>

      <div className="border-t border-white/[0.08] pt-4 font-mono text-[11px] text-[#6B665C]">
        Lagos, Nigeria · Full-Stack Developer
      </div>
    </main>
  );
}
