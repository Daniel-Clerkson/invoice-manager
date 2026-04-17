"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Users, Zap, ShieldCheck } from 'lucide-react';
import HomeNavbar from '@/components/HomeNavbar';
import Features from "@/components/Features"
import How from "@/components/How"
import Faq from '@/components/FAQ';
import WhyChooseUs from '@/components/Why';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden pt-24">
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 19V15h2v4h4v2h-4v4h-2v-4h-4v-2h4z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
      />

      <HomeNavbar />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-10 md:pt-16 pb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 md:px-3.5 md:py-1.5 text-emerald-700 border border-emerald-100"
        >
          <CheckCircle2 size={12} className="md:w-3.5 md:h-3.5" strokeWidth={2.5} />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">FIRS Certified & Compliant</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] md:leading-tight"
        >
          Effortless Invoice <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
            Management & Compliance
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 md:mt-6 max-w-xs sm:max-w-md md:max-w-xl text-sm md:text-lg font-medium text-slate-500 leading-relaxed"
        >
          Streamline your tax invoice workflow with our comprehensive multi-role system. 
          Create, review, and approve FIRS-compliant invoices with confidence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0"
        >
          <Link href="/dashboard" className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95">
            Start Managing Invoices
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/features" className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Explore Features
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <FeatureMini icon={<ShieldCheck size={18}/>} label="100%" sub="FIRS Compliant" />
          <FeatureMini icon={<FileText size={18}/>} label="8" sub="Form Sections" />
          <FeatureMini icon={<Users size={18}/>} label="3" sub="Role Levels" />
          <FeatureMini icon={<Zap size={18}/>} label="Auto" sub="Calculations" />
        </motion.div>
      </main>
      <Features />
      <How />
      <WhyChooseUs />
      <Faq />
      <Footer />
    </div>
  );
}

function FeatureMini({ icon, label, sub }: { icon: React.ReactNode, label: string, sub: string }) {
  return (
    <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-white/50 p-4 md:p-6 backdrop-blur-sm hover:border-indigo-100 transition-colors">
      <div className="mb-2 md:mb-3 flex justify-center text-indigo-500">{icon}</div>
      <h4 className="text-lg md:text-xl font-black text-slate-900">{label}</h4>
      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">{sub}</p>
    </div>
  );
}