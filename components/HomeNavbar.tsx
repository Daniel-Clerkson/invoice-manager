"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, LayoutDashboard } from 'lucide-react';
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // Import your initialized client
import Image from 'next/image';

const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state

  useEffect(() => {
    // 1. Check for logged in user on mount
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkUser();

    // Scroll listener
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm" 
          : "py-5 bg-transparent border-b border-transparent"
      }`}>
      <div className="flex items-center justify-between px-5 sm:px-6 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2.5 group">
         <Image src={"/logo.svg"} alt='Logo' width={128} height={128} />
        </Link>
        
        <div className="flex items-center gap-3 sm:gap-8">
          {/* Conditional Rendering based on isLoggedIn */}
          {isLoggedIn ? (
            <Link 
              href="/dashboard" 
              className="group flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-100 hover:bg-[#10B981] transition-all"
            >
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link href="/auth" className="group flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95">
                Get Started <ArrowRight size={14} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;