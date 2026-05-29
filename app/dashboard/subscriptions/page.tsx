"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Users,
  Send,
  Building2,
  GitBranch,
  Archive,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function SubscriptionsPage() {
  // Navigation layout control: "plans" or "usage"
  const [activeTab, setActiveTab] = useState<"plans" | "usage">("plans");
  

  // Pricing plans data structures matching your multi-tier frames
  const tiers = [
    {
      name: "Trial Tier",
      price: "₦0",
      period: "per annum",
      description: "30-day trial evaluation environment built to explore our automation suite with select modules.",
      note: "(30-day evaluation window; requires upgrading to maintain system operational state)",
      features: ["Up to 5 invoices / month", "Standard analytical overview dashboard", "No native external ERP connectors"],
      cta: "Current Status",
      current: true,
      popular: false,
    },
    {
      name: "Basic Tier",
      price: "₦750,000",
      period: "per annum",
      description: "Essential governance layer tailored for scaling operations seeking basic automated verification workflows.",
      features: ["Up to 50 invoices / month", "Standard analytics pipeline access", "No external ERP connector pipelines", "Dedicated standard email support"],
      cta: "Provision Plan",
      current: false,
      popular: false,
    },
    {
      name: "Standard Tier",
      price: "₦1,500,000",
      period: "per annum",
      description: "Optimized architecture providing reliable middleware capabilities for streamlined multi-tenant transaction routing.",
      features: ["Up to 200 invoices / month", "Advanced analytical dashboard & matrix logs", "Priority multi-channel corporate support channels", "Custom report template parameters"],
      cta: "Provision Plan",
      current: false,
      popular: true,
    },
    {
      name: "Enterprise Tier",
      price: "₦5,000,000",
      period: "per annum",
      description: "Robust, deeply integration-ready layer built for corporate environments demanding tight financial controllership.",
      extra: "ERP Integration Package (Optional, single deployment): ₦10,000,000",
      features: ["Up to 1,000 invoices / month", "ERP Integration packages (includes UAT testing, deployment, & onboarding)", "Real-time compliance fraud monitoring tools", "White-labelled distribution nodes & SDK access", "Dedicated account support engineers"],
      cta: "Provision Plan",
      current: false,
      popular: false,
    },
    {
      name: "Unlimited Tier",
      price: "₦25,000,000",
      period: "per annum",
      description: "Ultimate transaction governance framework supporting high-volume pipelines with custom SAP native integration stacks.",
      features: ["Unlimited system invoice processing nodes", "Full enterprise connector architecture (SAP Business One, S4HANA, ECC, etc.)", "Real-time advanced fraud mitigation intelligence", "Bespoke platform white-labelling options", "Priority developer SDK access & custom scripts", "Continuous architecture consultation & customisations"],
      cta: "Contact Enterprise",
      current: false,
      popular: false,
    }
  ];

  const usageMetrics = [
    { label: "User Access Seats", current: "1", max: "Unlimited", icon: <Users size={15} /> },
    { label: "Outbound Invoices", current: "0", max: "Unlimited", icon: <Send size={15} /> },
    { label: "Company Profiles", current: "1", max: "Unlimited", icon: <Building2 size={15} /> },
    { label: "Branch Registers", current: "1", max: "Unlimited", icon: <GitBranch size={15} /> },
    { label: "Archive Ledger Retention", current: "12 Mos", max: "Unlimited", icon: <Archive size={15} /> },
  ];

  return (
    <DashboardLayout username="">
      
      {/* Dynamic Tab Switcher Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-[#111A3E] tracking-tight">Billing Architecture</h1>
          <p className="text-xs text-slate-400 font-medium">Provision transactional bandwidth capabilities, scale tier permissions, or monitor live workspace caps.</p>
        </div>
        
        {/* Unified clean Segmented Slider Pill */}
        <div className="p-1 bg-slate-100/90 rounded-xl flex items-center w-full sm:w-auto shadow-sm border border-slate-200/40">
          <button
            onClick={() => setActiveTab("plans")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "plans"
                ? "bg-white text-[#1A56FF] shadow-sm border border-slate-100"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Zap size={13} /> Available Packages
          </button>
          <button
            onClick={() => setActiveTab("usage")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "usage"
                ? "bg-white text-[#1A56FF] shadow-sm border border-slate-100"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <ShieldCheck size={13} /> Active Operational Usage
          </button>
        </div>
      </div>

      {activeTab === "usage" ? (
        /* Usage Limits Hub View */
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#1A56FF]" />
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4FF] text-[#1A56FF] flex items-center justify-center border border-[#DCE4FF]">
                <Sparkles size={18} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Active Platform Baseline</span>
                <h3 className="text-base font-black text-[#111A3E] tracking-tight">Trial Tier System Suite</h3>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-[#F0F4FF] text-[#1A56FF] border border-[#DCE4FF] tracking-tight">
              Postpaid Model Matrix
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-3 px-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workspace Boundary Metrics</h3>
              <HelpCircle size={11} className="text-slate-300 cursor-help" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {usageMetrics.map((metric, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-[#1A56FF]/20 hover:shadow-md transition-all duration-300 group">
                  <div className="text-slate-300 group-hover:text-[#1A56FF] transition-colors mb-3.5 p-2 bg-slate-50 w-fit rounded-lg border border-slate-100">
                    {metric.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-500 block truncate tracking-tight">{metric.label}</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#111A3E] tracking-tight">{metric.current}</span>
                    <span className="text-xs font-semibold text-slate-400">/ {metric.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Enhanced Matrix Layout Pricing Packages */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start animate-in fade-in duration-200">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between relative transition-all duration-300 h-full group hover:shadow-md ${
                tier.current 
                  ? "border-[#1A56FF] ring-4 ring-[#1A56FF]/5" 
                  : tier.popular
                  ? "border-slate-200 lg:scale-[1.02] shadow-md ring-4 ring-slate-100/70"
                  : "border-slate-100 hover:border-[#1A56FF]/20"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 bg-[#1A56FF] text-white rounded-full text-[9px] font-black uppercase tracking-widest border border-white shadow-sm">
                  Recommended Layout
                </span>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-black text-[#111A3E] tracking-tight">{tier.name}</h3>
                  {tier.current && (
                    <span className="bg-[#F0F4FF] text-[#1A56FF] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#DCE4FF]">
                      Current Scope
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-slate-400 font-medium mt-2 min-h-[48px] leading-relaxed">
                  {tier.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1 bg-slate-50/70 border border-slate-100 p-3 rounded-xl">
                  <span className="text-2xl font-black text-[#111A3E] tracking-tight">{tier.price}</span>
                  <span className="text-xs font-bold text-slate-400 tracking-tight">{tier.period}</span>
                </div>

                {tier.note && (
                  <p className="text-[10px] font-bold text-amber-600 mt-2 bg-amber-50/50 border border-amber-100/60 p-2.5 rounded-xl leading-normal italic">
                    {tier.note}
                  </p>
                )}
                {tier.extra && (
                  <p className="text-[10px] font-bold text-[#1A56FF] mt-2 bg-[#F0F4FF] border border-[#DCE4FF] p-2.5 rounded-xl leading-normal">
                    <span className="uppercase text-[9px] font-black tracking-widest block mb-0.5 text-[#111A3E]">Optional Module addon:</span>
                    {tier.extra}
                  </p>
                )}

                <div className="my-5 border-b border-slate-100" />

                <div className="space-y-3">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Capabilities & Parameters</span>
                  <ul className="space-y-3">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600 leading-normal">
                        <CheckCircle2 size={14} className="text-[#1A56FF] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                disabled={tier.current}
                className={`w-full mt-8 flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl transition-all duration-200 ${
                  tier.current
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/20"
                    : "bg-[#1A56FF] text-white hover:bg-[#1546CC] shadow-sm active:scale-[0.99]"
                }`}
              >
                <span>{tier.cta}</span>
                {!tier.current && <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}