"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit, ClipboardCheck, SendHorizontal, Check } from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "Create Invoice",
    icon: <FileEdit size={28} />,
    stepLabel: "STEP 1",
    color: "emerald",
    bg: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
    desc: "Users complete the comprehensive 8-section form with all required information:",
    items: ["Basic invoice information", "Currency and exchange rates", "Party information (buyer/seller)", "Line items with tax calculations"]
  },
  {
    id: "02",
    title: "Admin Review",
    icon: <ClipboardCheck size={28} />,
    stepLabel: "STEP 2",
    color: "blue",
    bg: "bg-blue-500",
    lightBg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
    desc: "Admins review submitted invoices for accuracy and compliance:",
    items: ["Verify all required fields", "Check calculations and totals", "Ensure FIRS compliance", "Approve or reject with feedback"]
  },
  {
    id: "03",
    title: "Final Approval",
    icon: <SendHorizontal size={28} />,
    stepLabel: "STEP 3",
    color: "purple",
    bg: "bg-purple-600",
    lightBg: "bg-purple-50",
    border: "border-purple-100",
    text: "text-purple-600",
    desc: "Super Admins provide final approval and FIRS submission:",
    items: ["Final compliance verification", "Review admin feedback", "Approve for FIRS submission", "Submit via API to FIRS"]
  }
];

export default function How() {
  return (
    <section className="py-24 px-6 bg-slate-50/50">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Simple Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-500 font-medium"
          >
            A streamlined three-step approval process ensures accuracy and 
            FIRS compliance for every invoice.
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Connecting Line (Desktop Only) */}
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 -z-0 hidden lg:block" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`relative z-10 p-8 rounded-[2.5rem] border ${step.border} bg-white shadow-sm hover:shadow-md transition-shadow group`}
            >
              {/* Icon Orb */}
              <div className="flex justify-center -mt-16 mb-8">
                <div className={`relative h-24 w-24 rounded-full ${step.bg} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>
              </div>

              {/* Step Badge */}
              <div className="flex justify-center mb-6">
                <span className={`px-8 py-1.5 rounded-full ${step.lightBg} ${step.text} text-[11px] font-black tracking-[0.2em]`}>
                  {step.stepLabel}
                </span>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 px-2">
                  {step.desc}
                </p>

                {/* Requirements List */}
                <div className="space-y-3 text-left">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-md p-0.5 ${step.lightBg} ${step.text}`}>
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-sm font-semibold text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}