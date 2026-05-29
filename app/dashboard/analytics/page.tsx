"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Eye,
  MoreVertical,
  TrendingUp,
  BarChart3,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  Sparkles,
  Zap,
  Activity,
  ShieldCheck,
  FileSpreadsheet
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Today");
  const businessUser = "Prince Achoja";

  // Upper summary statistics cluster configurations
  const performanceCounters = [
    { label: "Total Invoices", count: "0", viewable: true, trend: "Stable" },
    { label: "Incoming Pipeline", count: "0", viewable: false, trend: "Syncing" },
    { label: "Pending Sign-offs", count: "0", viewable: false, trend: "Awaiting" },
    { label: "Approved Ledgers", count: "0", viewable: false, trend: "Verified" },
    { label: "Archived Clusters", count: "0", viewable: false, trend: "Encrypted" },
  ];

  // Base micro-matrix metric variables
  const footerMetrics = [
    { label: "Total VAT Deductions", value: "₦0.00", sub: "Accumulated tax volume", icon: <FileSpreadsheet size={14} /> },
    { label: "Invoice Processing Time", value: "194ms", sub: "Average gateway runtime", highlight: true, icon: <Zap size={14} /> },
    { label: "Total Active Suppliers", value: "0", sub: "Indexed vendor registers", icon: <Briefcase size={14} /> },
    { label: "Mean Transaction Size", value: "₦0.00", sub: "Monthly baseline value", icon: <Activity size={14} /> },
  ];

  return (
    <DashboardLayout username={businessUser}>
      
      {/* Header Context Actions Toolbar Layer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#111A3E] tracking-tight">System Analytics</h1>
            <span className="bg-[#F0F4FF] text-[#1A56FF] border border-[#DCE4FF] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
              Live Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Monitor execution velocity, transactional pipelines, and multi-role regulatory runtimes.</p>
        </div>
        
        {/* Responsive Time Filtering Module */}
        <div className="relative w-full sm:w-auto shadow-sm rounded-xl">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="appearance-none h-10 w-full sm:w-40 bg-white border border-slate-200 rounded-xl pl-9 pr-10 text-xs font-bold text-slate-700 outline-none hover:border-[#1A56FF]/30 focus:border-[#1A56FF] focus:ring-2 focus:ring-[#1A56FF]/10 transition-all cursor-pointer"
          >
            <option value="Today">Today (Realtime)</option>
            <option value="Weekly">Current Week</option>
            <option value="Monthly">Current Month</option>
            <option value="Yearly">Fiscal Period</option>
          </select>
          <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Horizontal Premium Metric Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {performanceCounters.map((card, i) => (
          <div 
            key={i} 
            className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between relative group hover:border-[#1A56FF]/30 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Design accents: Micro Top Border Fill on Active Group elements */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-100 group-hover:bg-[#1A56FF] transition-colors" />

            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate pr-2">
                {card.label}
              </span>
              <button className="p-1 text-slate-300 hover:text-slate-500 rounded-lg hover:bg-slate-50 transition shrink-0">
                <MoreVertical size={13} />
              </button>
            </div>
            
            <div className="mt-5 flex items-end justify-between">
              <div className="space-y-0.5">
                <h3 className="text-3xl font-black text-[#111A3E] tracking-tight group-hover:scale-[1.02] origin-left transition-transform">
                  {card.count}
                </h3>
                <span className="text-[9px] font-bold text-slate-400 block tracking-tight">
                  Status: <span className="text-slate-500 font-semibold">{card.trend}</span>
                </span>
              </div>

              {card.viewable && (
                <button className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1A56FF] bg-[#F0F4FF] hover:bg-[#1A56FF] hover:text-white px-2 py-1 rounded-lg border border-[#DCE4FF] shadow-sm transition-all duration-200">
                  <Eye size={11} /> Explore
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Interactive Splitting Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Timeline Analytical Monitoring Window */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[9px] font-black text-[#1A56FF] uppercase tracking-widest flex items-center gap-1">
                <Activity size={10} strokeWidth={3} className="animate-pulse" /> Data Stream Pipeline
              </span>
              <h4 className="text-base font-black text-[#111A3E] tracking-tight">Monthly Invoice Performance</h4>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-medium block">Total Value Ledger</span>
                <span className="text-lg font-black text-[#111A3E] tracking-tight">₦0.00</span>
              </div>
              <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-xl text-slate-500">
                <span className="px-2.5 py-1 bg-white text-[#1A56FF] rounded-lg shadow-sm text-[10px] font-black tracking-wider border border-slate-100 cursor-pointer">
                  FY 2026
                </span>
              </div>
            </div>
          </div>

          {/* Technical Blueprint Display Node */}
          <div className="h-60 w-full bg-gradient-to-b from-slate-50/30 to-slate-50/80 border border-slate-100 rounded-xl relative flex flex-col justify-between p-4 overflow-hidden group">
            
            {/* Structured Cross-Hatch Grid Line Containers */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 pointer-events-none opacity-40">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="border-b border-dashed border-slate-200 w-full h-0" />
              ))}
            </div>
            
            {/* Empty Context Overlay State Indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-2">
              <div className="p-2.5 bg-white border border-slate-100 shadow-sm text-slate-300 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <BarChart3 size={16} className="text-[#1A56FF]/40" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                No Transaction Logs Detected
              </span>
            </div>

            {/* Simulated X-Axis Labels Row */}
            <div className="mt-auto w-full flex justify-between text-[10px] font-black text-slate-400 pt-2 z-10 border-t border-slate-100/60 bg-white/40 backdrop-blur-[1px] px-1">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <span key={m} className="w-full text-center transition-colors hover:text-[#1A56FF]">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel: Volumetric Hierarchy Section */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between group/panel">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Volume Topology</span>
                <h4 className="text-base font-black text-[#111A3E] tracking-tight">Value By Department</h4>
              </div>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
                <MoreVertical size={14} />
              </button>
            </div>

            {/* Elevated Dynamic Frame */}
            <div className="py-14 flex flex-col items-center justify-center text-center bg-[#F8FAFC] rounded-xl border border-dashed border-slate-200/80 px-4">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-400 flex items-center justify-center mb-2.5 group-hover/panel:border-[#1A56FF]/20 group-hover/panel:text-[#1A56FF] transition-all">
                <Layers size={14} />
              </div>
              <h5 className="text-xs font-bold text-slate-700">Distribution Mapping Empty</h5>
              <p className="text-[10px] font-medium text-slate-400 max-w-[180px] mt-0.5 leading-normal">
                Departmental metrics populate dynamically following verified multi-role invoice execution.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-4">
            <button className="w-full text-center text-xs font-bold text-[#1A56FF] hover:text-[#1546CC] transition flex items-center justify-center gap-1.5 group">
              Generate Volumetric Analysis 
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Advanced Performance Gateway Matrix Cluster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {footerMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between group hover:border-[#1A56FF]/20 hover:shadow-sm transition-all duration-300 relative overflow-hidden"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 tracking-tight truncate pr-2">
                  {metric.label}
                </span>
                <div className={`p-1.5 rounded-lg transition-colors ${metric.highlight ? "bg-blue-50 text-[#1A56FF]" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"}`}>
                  {metric.icon}
                </div>
              </div>
              
              <div className="flex items-baseline gap-1.5 pt-1">
                <h3 className="text-2xl font-black text-[#111A3E] tracking-tight">
                  {metric.value}
                </h3>
                {metric.highlight && (
                  <span className="w-2 h-2 rounded-full bg-[#1A56FF] animate-pulse" />
                )}
              </div>
            </div>
            
            <p className="text-[10px] font-medium text-slate-400 mt-4 border-t border-slate-50 pt-2.5 flex items-center gap-1">
              {metric.sub}
            </p>
          </div>
        ))}
      </div>

    </DashboardLayout>
  );
}