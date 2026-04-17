"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BarChart3, Clock } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  {
    title: "100% FIRS Compliant",
    desc: "Our engine is updated in real-time to match the latest Nigerian tax laws and IRN requirements.",
    detail: "Zero Audit Risks",
    icon: <ShieldCheck size={32} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Lightning Fast Workflow",
    desc: "Generate professional, compliant invoices in under 2 minutes with our structured 8-section form.",
    detail: "Save 4h/week",
    icon: <Zap size={32} />,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Multi-Role Hierarchy",
    desc: "Built-in approval layers for Creators, Admins, and Super Admins to ensure total accuracy.",
    detail: "Team Collaboration",
    icon: <BarChart3 size={32} />,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Real-time Auditing",
    desc: "Every action is logged. Track exactly who created, reviewed, and approved every document.",
    detail: "Full Transparency",
    icon: <Clock size={32} />,
    color: "text-purple-600",
    bg: "bg-purple-50",
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 block mb-4"
            >
              The Advantage
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]"
            >
              Why businesses trust <br />
              <span className="text-slate-400">our compliance engine.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 font-medium max-w-xs text-sm md:text-base leading-relaxed"
          >
            We bridge the gap between complex tax regulations and simple daily operations.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                {benefit.desc}
              </p>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {benefit.detail}
                </span>
                <div className={`h-1.5 w-1.5 rounded-full ${benefit.color.replace('text', 'bg')}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-black mb-2">Ready to stay compliant?</h4>
            <p className="text-slate-400 font-medium">Join 500+ businesses automating their FIRS workflow.</p>
          </div>
          
          <Link href={"/auth"} className="relative z-10 px-8 py-4 bg-[#10B981] hover:bg-emerald-400 text-white rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl shadow-emerald-900/20">
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}