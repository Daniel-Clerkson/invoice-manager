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
  Zap
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function SubscriptionsPage() {
  // Navigation layout control: "plans" or "usage"
  const [activeTab, setActiveTab] = useState<"plans" | "usage">("plans");
  const businessUser = "Prince Achoja";

  // Pricing plans data structures matching your multi-tier frames
  const tiers = [
    {
      name: "Trial Tier",
      price: "₦0",
      period: "per annum",
      description: "30-day trial to explore our platform with limited features.",
      note: "(30-day trial only; Must upgrade to continue Service)",
      features: ["5 invoices/month.", "No ERP integrations."],
      cta: "Current Trial",
      current: true,
      popular: false,
    },
    {
      name: "Basic Tier",
      price: "₦750,000",
      period: "per annum",
      description: "Essential features for small businesses starting their e-invoicing journey.",
      features: ["50 invoices/month.", "No ERP integrations.", "Email support."],
      cta: "Select Plan",
      current: false,
      popular: false,
    },
    {
      name: "Standard Tier",
      price: "₦1,500,000",
      period: "per annum",
      description: "For mid-sized businesses with essential tools for streamlined financial management.",
      features: ["200 invoices/month.", "Basic dashboard/analytics.", "No ERP integrations.", "Priority multi channel support, customisations."],
      cta: "Select Plan",
      current: false,
      popular: true,
    },
    {
      name: "Enterprise Tier",
      price: "₦5,000,000",
      period: "per annum",
      description: "For large corporates, providing advanced tools for enhanced financial control.",
      extra: "ERP Integration Package (optional, one-time): ₦10,000,000",
      features: ["1,000 invoices/month.", "ERP integrations (includes system configuration, testing/UAT, onboarding, and training).", "Real-time fraud alerts.", "White labelling.", "SDK access.", "Dedicated support and customisations."],
      cta: "Select Plan",
      current: false,
      popular: false,
    },
    {
      name: "Unlimited Tier",
      price: "₦25,000,000",
      period: "per annum",
      description: "Ultimate solution for enterprises requiring unlimited invoicing and premium SAP integrations.",
      features: ["Unlimited invoices/month.", "ERP Integration, SAP connector integration, onboarding, and cutover support (SAP-BIZ 1, S4HANA, ECC.etc).", "Real-time fraud alerts.", "White labelling.", "SDK access.", "Dedicated support and customisations."],
      cta: "Select Plan",
      current: false,
      popular: false,
    }
  ];

  const usageMetrics = [
    { label: "User Access", current: "1", max: "Unlimited", icon: <Users size={16} /> },
    { label: "Send Invoices", current: "0", max: "Unlimited", icon: <Send size={16} /> },
    { label: "Company", current: "1", max: "Unlimited", icon: <Building2 size={16} /> },
    { label: "Branch", current: "1", max: "Unlimited", icon: <GitBranch size={16} /> },
    { label: "Archive", current: "12 Months", max: "Unlimited", icon: <Archive size={16} /> },
  ];

  return (
    <DashboardLayout username={businessUser}>
      
      {/* Dynamic Tab Switcher Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Plans & Subscriptions</h1>
          <p className="text-xs text-slate-400 font-medium">Scale your invoice operations and monitor your workspace limitations.</p>
        </div>
        
        {/* Unified clean Segmented Slider Pill */}
        <div className="p-1 bg-slate-100/80 rounded-xl flex items-center w-full sm:w-auto shadow-inner border border-slate-200/40">
          <button
            onClick={() => setActiveTab("plans")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "plans"
                ? "bg-white text-[#00875A] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Zap size={14} /> Available Packages
          </button>
          <button
            onClick={() => setActiveTab("usage")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "usage"
                ? "bg-white text-[#00875A] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShieldCheck size={14} /> My Active usage
          </button>
        </div>
      </div>

      {activeTab === "usage" ? (
        /* Usage Limits Hub View */
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00875A] flex items-center justify-center border border-emerald-100">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Base Plan</span>
                <h3 className="text-base font-bold text-slate-900">Trial Tier System</h3>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
              Postpaid Model
            </span>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Product Usage Bounds</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {usageMetrics.map((metric, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-slate-200 transition">
                  <div className="text-slate-400 mb-3">{metric.icon}</div>
                  <span className="text-xs font-medium text-slate-500 block truncate">{metric.label}</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-900">{metric.current}</span>
                    <span className="text-xs font-semibold text-slate-400">/ {metric.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Enhanced Matrix Layout Pricing Packages */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between relative transition-all group ${
                tier.current 
                  ? "border-[#00875A] ring-2 ring-[#00875A]/5" 
                  : tier.popular
                  ? "border-slate-200 lg:scale-[1.02] shadow-md ring-4 ring-slate-50"
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-6 px-2.5 py-0.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                  Recommended
                </span>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">{tier.name}</h3>
                  {tier.current && (
                    <span className="bg-emerald-50 text-[#00875A] text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                      Active
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-slate-400 font-medium mt-2 min-h-[32px] leading-relaxed">
                  {tier.description}
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">{tier.price}</span>
                  <span className="text-xs font-semibold text-slate-400">{tier.period}</span>
                </div>

                {tier.note && (
                  <p className="text-[10px] font-semibold text-amber-600 mt-1 italic">{tier.note}</p>
                )}
                {tier.extra && (
                  <p className="text-[10px] font-bold text-indigo-600 mt-2 bg-indigo-50 border border-indigo-100 p-2 rounded-xl">
                    {tier.extra}
                  </p>
                )}

                <hr className="my-5 border-slate-50" />

                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Limits & Details</span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs font-medium text-slate-600 leading-normal">
                        <CheckCircle2 size={14} className="text-[#00875A] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                className={`w-full mt-8 flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl transition-all ${
                  tier.current
                    ? "bg-slate-100 text-slate-400 cursor-default"
                    : "bg-[#00875A] text-white hover:bg-[#006F49] shadow-sm hover:shadow"
                }`}
                disabled={tier.current}
              >
                {tier.cta} {!tier.current && <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}