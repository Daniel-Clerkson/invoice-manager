"use client";
import React, { useState, useEffect } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 mx-auto max-w-7xl">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg group-hover:bg-[#10B981] transition-colors duration-300">
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <div className="block">
            <h1 className="text-base font-black leading-tight text-slate-900 tracking-tight">
              Invoice Manager
            </h1>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              FIRS Compliance
            </p>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href="/auth"
            className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/auth"
            className="group flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95"
          >
            Get Started
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
