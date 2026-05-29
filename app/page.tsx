"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Users, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Lock 
} from "lucide-react";
import HomeNavbar from "@/components/HomeNavbar";
import Features from "@/components/Features";
import How from "@/components/How";
import Faq from "@/components/FAQ";
import WhyChooseUs from "@/components/Why";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] selection:bg-[#8AE6C2] selection:text-[#004D34] overflow-x-hidden pt-20">
      
      {/* Structural Cross-Hatch Blueprint Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 19V15h2v4h4v2h-4v4h-2v-4h-4v-2h4z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
      />

      <HomeNavbar />

      {/* Hero Structural Content Shell */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-12 md:pt-20 pb-24 text-center">
        
        {/* Certification Context Badge Component */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[#00875A] border border-emerald-100/60 shadow-sm"
        >
          <CheckCircle2 size={13} strokeWidth={2.5} className="text-[#00875A]" />
          <span className="text-[10px] font-black uppercase tracking-wider">FIRS Verified Compliance Engine</span>
        </motion.div>

        {/* Corporate Typography Title Block */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] md:leading-tight"
        >
          E-Invoicing and Tax <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00875A] to-[#006F49]">
            Compliance Infrastructure
          </span>
        </motion.h1>

        {/* Functional Sub-text Explanation Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-xs sm:max-w-md md:max-w-2xl text-sm md:text-base font-medium text-slate-500 leading-relaxed"
        >
          Automate data processing pipelines, audit trailing paths, and enforce multi-role sign-offs 
          across your organization. Seamlessly manage structured directories, invoice validation records, and real-time ledger distributions.
        </motion.p>

        {/* Brand Call-To-Action Interfacing Anchors */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0"
        >
          <Link 
            href="/dashboard" 
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#00875A] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-100/50 hover:bg-[#006F49] transition-all active:scale-[0.98]"
          >
            Open Operational Console
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link 
            href="/subscriptions" 
            className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm"
          >
            Review Subscription Packages
          </Link>
        </motion.div>

        {/* High-Contrast Analytical Mini-Metrics Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <FeatureMini icon={<ShieldCheck size={18}/>} label="100% Secure" sub="Audit Trailed" />
          <FeatureMini icon={<FileText size={18}/>} label="Structured" sub="8-Section Forms" />
          <FeatureMini icon={<Users size={18}/>} label="Multi-Role" sub="Permission Levels" />
          <FeatureMini icon={<Zap size={18}/>} label="194ms" sub="Gateway Execution" />
        </motion.div>
      </main>

      {/* Supporting Sections */}
      <Features />
      <How />
      <WhyChooseUs />
      <Faq />
      <Footer />
    </div>
  );
}

{/* Refactored Functional-Chic Grid Cell Module */}
function FeatureMini({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-emerald-100 hover:shadow-md transition-all group duration-300 flex flex-col items-center justify-center text-center">
      <div className="mb-3 p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-[#00875A] transition-colors duration-300">
        {icon}
      </div>
      <h4 className="text-base font-black text-slate-900 tracking-tight">{label}</h4>
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">{sub}</p>
    </div>
  );
}