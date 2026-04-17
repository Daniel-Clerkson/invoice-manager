"use client"
import React, { useState, useEffect } from 'react'
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from "next/link"

const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm" 
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 sm:px-6 mx-auto max-w-7xl">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition-colors duration-300 group-hover:bg-[#10B981]">
            <ShieldCheck size={20} className="sm:hidden" strokeWidth={2.5} />
            <ShieldCheck size={22} className="hidden sm:block" strokeWidth={2.5} />
          </div>
          
          <div className="block">
            <h1 className="text-sm sm:text-base font-black leading-tight text-slate-900 tracking-tight">
              Invoice Manager
            </h1>
            <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              FIRS Compliance
            </p>
          </div>
        </Link>
        
        {/* Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-8">
          {/* Sign In: Hidden on mobile to save space */}
          <Link 
            href="/auth" 
            className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          
          <Link 
            href="/auth" 
            className="group flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95"
          >
            <span className="hidden md:inline">Get Started</span>
            <span className="md:hidden">Start</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;