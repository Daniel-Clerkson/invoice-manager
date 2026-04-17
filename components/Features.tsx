"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Users, Zap, ShieldCheck, 
  BarChart3, Database, Globe, Lock 
} from 'lucide-react';

const features = [
  {
    title: "Comprehensive Invoice Form",
    desc: "A structured 8-section journey covering every FIRS requirement from legal totals to delivery links.",
    icon: <FileText size={22} />,
    size: "md:col-span-2",
    color: "bg-blue-50 text-blue-600",
    border: "hover:border-blue-200"
  },
  {
    title: "Multi-Role Workflow",
    desc: "Dedicated flows for Creators, Admins, and Super Admins.",
    icon: <Users size={22} />,
    size: "md:col-span-1",
    color: "bg-emerald-50 text-emerald-600",
    border: "hover:border-emerald-200"
  },
  {
    title: "Real-Time Validation",
    desc: "Instant error feedback that ensures compliance before you even hit submit.",
    icon: <ShieldCheck size={22} />,
    size: "md:col-span-1",
    color: "bg-purple-50 text-purple-600",
    border: "hover:border-purple-200"
  },
  {
    title: "Auto-Calculated Totals",
    desc: "Eliminate manual errors with automatic subtotals, tax adjustments, and grand totals calculated on the fly.",
    icon: <Zap size={22} />,
    size: "md:col-span-2",
    color: "bg-orange-50 text-orange-600",
    border: "hover:border-orange-200"
  },
];

export default function Features() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header - Left Aligned for a more "designed" look */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4">
            Powerful Features
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Everything You Need for <br />
            <span className="text-slate-400">Tax Compliance.</span>
          </h3>
          <p className="mt-6 text-lg text-slate-500 font-medium">
            Built from the ground up to meet Federal Inland Revenue Service requirements 
            with a focus on speed and accuracy.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`group relative p-8 rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all ${f.border} ${f.size}`}
            >
              {/* Subtle Background Glow on Hover */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${f.color} transition-transform group-hover:scale-110`}>
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Minimalist Arrow - only appears on hover */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Feature Bar - Minimalist Footer */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-12 border-t border-slate-50">
           <MiniTag icon={<Lock size={14}/>} text="End-to-End Encryption" />
           <MiniTag icon={<Database size={14}/>} text="Structured JSON Output" />
           <MiniTag icon={<Globe size={14}/>} text="Cloud Sync" />
        </div>
      </div>
    </section>
  );
}

function MiniTag({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <div className="p-1.5 rounded-lg bg-slate-50">{icon}</div>
      <span className="text-[11px] font-bold uppercase tracking-widest">{text}</span>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}