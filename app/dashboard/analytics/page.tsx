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
  ArrowUpRight
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Today");
  const businessUser = "Prince Achoja";

  // Upper summary statistics cluster configurations
  const performanceCounters = [
    { label: "Total Invoices", count: "0", viewable: true },
    { label: "Incoming Invoices", count: "0", viewable: false },
    { label: "Pending Invoices", count: "0", viewable: false },
    { label: "Approved Invoices", count: "0", viewable: false },
    { label: "Archived Invoices", count: "0", viewable: false },
  ];

  // Base micro-matrix metric variables
  const footerMetrics = [
    { label: "Total VAT Deductions", value: "₦0", sub: "Accumulated tax volume" },
    { label: "Invoice Processing Time", value: "194ms", sub: "Average gateway runtime", highlight: true },
    { label: "Total Suppliers", value: "0", sub: "Active index count" },
    { label: "Average Invoice Amount (monthly)", value: "₦0", sub: "Mean transaction size" },
  ];

  return (
    <DashboardLayout username={businessUser}>
      
      {/* Header Context Actions Toolbar Layer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Analytics</h1>
          <p className="text-xs text-slate-400 font-medium">Monitor financial pipeline velocity and system operation runtimes.</p>
        </div>
        
        {/* Responsive Time Filtering Module */}
        <div className="relative w-full sm:w-auto">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="appearance-none h-9 w-full sm:w-36 bg-white border border-slate-200 rounded-lg pl-9 pr-8 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 focus:border-slate-400 transition cursor-pointer"
          >
            <option value="Today">Today</option>
            <option value="Weekly">This Week</option>
            <option value="Monthly">This Month</option>
            <option value="Yearly">This Year</option>
          </select>
          <Calendar size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Horizontal Scannable Top Metric Row Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {performanceCounters.map((card, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between relative group hover:border-slate-200 transition">
            <div className="flex items-start justify-between text-slate-400">
              <span className="text-[11px] font-bold tracking-tight text-slate-400 truncate pr-2">{card.label}</span>
              <button className="p-1 text-slate-300 hover:text-slate-500 rounded transition shrink-0">
                <MoreVertical size={13} />
              </button>
            </div>
            
            <div className="mt-4 flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.count}</h3>
              {card.viewable && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/60">
                  <Eye size={10} /> View
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Graph and Department Analytics Split Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Core Monthly Chart Window Box */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Timeline Stream</span>
              <h4 className="text-sm font-bold text-slate-800">Monthly Invoice Analytics</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">₦0.00</span>
              <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-400 text-xs font-semibold">
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded shadow-sm text-[10px] font-bold cursor-pointer">1Y</span>
              </div>
            </div>
          </div>

          {/* Clean Vector SVG Chart Display Node */}
          <div className="h-56 w-full bg-slate-50/50 border border-slate-100/70 rounded-xl relative flex flex-col justify-between p-4 overflow-hidden">
            {/* Grid Lines background container */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-40">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="border-b border-dashed border-slate-200 w-full h-0" />
              ))}
            </div>
            
            {/* Empty Slate Placeholder Message or SVG Paths Container Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest tracking-tight">System Standby • Null Pipeline</span>
            </div>

            {/* Simulated X-Axis Labels Row */}
            <div className="mt-auto w-full flex justify-between text-[10px] font-bold text-slate-400 pt-2 z-10">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <span key={m} className="w-full text-center">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel Hierarchy Segment List */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Volume Distribution</span>
                <h4 className="text-sm font-bold text-slate-800">Departments with Highest Invoice Value</h4>
              </div>
              <button className="p-1 text-slate-400 hover:text-slate-600 transition">
                <MoreVertical size={14} />
              </button>
            </div>

            {/* Empty Distribution Context Layer Frame */}
            <div className="py-12 flex flex-col items-center justify-center text-center bg-slate-50/40 rounded-xl border border-dashed border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-slate-100/80 text-slate-400 flex items-center justify-center mb-2">
                <Layers size={14} />
              </div>
              <p className="text-xs font-semibold text-slate-400">No department data available yet</p>
            </div>
          </div>

          <div className="border-t border-slate-50 pt-3 mt-4">
            <button className="w-full text-center text-[11px] font-bold text-slate-400 hover:text-slate-600 transition flex items-center justify-center gap-1">
              Generate Detailed Breakdown <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

      </div>

      {/* Advanced Gateway Performance Processing Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {footerMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between group hover:border-slate-200 transition">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 tracking-tight truncate pr-2">{metric.label}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${metric.highlight ? "bg-emerald-500 animate-pulse" : "bg-slate-200"}`} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight pt-1">{metric.value}</h3>
            </div>
            <p className="text-[10px] font-medium text-slate-400 mt-4 border-t border-slate-50 pt-2">{metric.sub}</p>
          </div>
        ))}
      </div>

    </DashboardLayout>
  );
}