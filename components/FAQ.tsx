"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is FIRS compliance in 2026?",
    answer:
      "FIRS compliance refers to the updated electronic invoicing standards required for Nigerian businesses. Our system automatically structures your data to meet these technical specifications, including IRN generation and mandatory tax fields.",
  },
  {
    question: "How does the multi-role approval system work?",
    answer:
      "The system uses a three-tier hierarchy: Creators build the invoices, Admins perform the first technical review, and Super Admins provide the final authorization before the data is transmitted to FIRS.",
  },
  {
    question: "Can I edit an invoice after submission?",
    answer:
      "Once an invoice is submitted, it enters a 'Locked' state for review. If an Admin rejects it, it becomes editable again so you can address the feedback and resubmit.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Absolutely. We use end-to-end encryption for all invoice data and maintain a strict audit log of every action taken by every user role to ensure full accountability.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
                <HelpCircle size={14} />
                Common Questions
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                Everything you <br />
                <span className="text-indigo-600">need to know.</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm">
                Can't find what you're looking for? Reach out to our support
                team for specialized assistance with FIRS integration.
              </p>
            </div>
          </div>

          {/* Right Column: Accordions */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`group rounded-[2rem] border transition-all duration-300 ${
                    isOpen
                      ? "border-indigo-100 bg-indigo-50/30"
                      : "border-slate-100 bg-white hover:border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-8 text-left"
                  >
                    <span
                      className={`text-lg font-bold transition-colors ${
                        isOpen
                          ? "text-indigo-900"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        isOpen
                          ? "bg-indigo-600 text-white rotate-0"
                          : "bg-slate-50 text-slate-400 rotate-90"
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={16} strokeWidth={3} />
                      ) : (
                        <Plus size={16} strokeWidth={3} />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-8 pt-0">
                          <p className="text-slate-600 font-medium leading-relaxed border-t border-indigo-100/50 pt-6">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
