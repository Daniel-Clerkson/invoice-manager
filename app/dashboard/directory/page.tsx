"use client";

import React, { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Calendar,
  X,
  Building2,
  SlidersHorizontal,
  ChevronDown,
  Eye,
  FileSpreadsheet
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder data for the directory table
  const [suppliers, setSuppliers] = useState([]);

  // Mock profile username context to pass down to the sidebar layout framework
  const businessUser = "Prince Achoja";

  return (
    <DashboardLayout username={businessUser}>
      
      {/* Header Action Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-[#111A3E] tracking-tight">System Directory</h1>
          <p className="text-xs text-slate-400 font-medium">Manage registry connections, maintain supplier records, and track corporate TIN listings.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#1A56FF] text-white text-xs font-bold h-10 px-4 rounded-xl hover:bg-[#1546CC] active:scale-[0.99] transition-all shadow-sm">
            <Plus size={14} /> Add Entity
          </button>
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#F0F4FF] text-[#1A56FF] text-xs font-bold h-10 px-4 rounded-xl hover:bg-[#E2E9FF] active:scale-[0.99] transition-all border border-[#DCE4FF]">
            <Download size={14} /> Import Registers
          </button>
        </div>
      </div>

      {/* Table Container Block */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
        
        {/* Filter controls row */}
        <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          
          <button className="bg-[#111A3E] text-white text-xs font-bold h-9 px-4 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors">
            <SlidersHorizontal size={12} /> All Directories
          </button>

          {/* Search Bar Input */}
          <div className="relative flex-1 min-w-[200px] sm:min-w-[260px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search registry indices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#1A56FF] focus:ring-4 focus:ring-[#1A56FF]/5 transition-all"
            />
          </div>

          {/* Date Filter Input */}
          <div className="relative min-w-[140px]">
            <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by date"
              className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-bold text-slate-700 placeholder-slate-400 outline-none cursor-pointer focus:border-[#1A56FF] transition-all"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>

          {/* Type Select Menu wrapper */}
          <div className="relative">
            <select className="appearance-none h-9 bg-white border border-slate-200 rounded-xl pl-3 pr-8 text-xs font-bold text-slate-600 outline-none cursor-pointer focus:border-[#1A56FF] transition-all">
              <option>All Classifications</option>
              <option>Supplier</option>
              <option>Customer</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Export Dropdown Menu wrapper */}
          <div className="relative">
            <select className="appearance-none h-9 bg-white border border-slate-200 rounded-xl pl-8 pr-8 text-xs font-bold text-slate-600 outline-none cursor-pointer focus:border-[#1A56FF] transition-all">
              <option>Export Ledger</option>
              <option>Export as CSV</option>
              <option>Export as XLSX</option>
            </select>
            <FileSpreadsheet size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Clear Filter Control Button */}
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-rose-500 border border-rose-100 bg-rose-50/50 px-4 h-9 rounded-xl hover:bg-rose-50 transition-all ml-auto flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-start animate-in fade-in zoom-in-95 duration-150"
            >
              <X size={13} /> Clear Filters
            </button>
          )}
        </div>

        {/* Structured Grid Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/70 select-none">
                <th className="py-3.5 px-4 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-[#1A56FF] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer transition-all"
                  />
                </th>
                <th className="py-3.5 px-4 font-black">Corporate Entity</th>
                <th className="py-3.5 px-4 font-black">Tax Identity (TIN)</th>
                <th className="py-3.5 px-4 font-black">Registry Classification</th>
                <th className="py-3.5 px-4 font-black">Sector / Industry</th>
                <th className="py-3.5 px-4 font-black">Registration Timestamp</th>
                <th className="py-3.5 px-4 font-black">Endpoint Email</th>
                <th className="py-3.5 px-4 font-black text-right pr-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-[220px] mx-auto">
                      <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-300 rounded-xl">
                        <Building2 size={16} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-700">Directory Inventory Empty</h4>
                      <p className="text-[10px] font-medium text-slate-400 leading-normal">
                        No registered system records map to the current configuration guidelines.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                suppliers.map((supplier: any, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors text-xs font-semibold text-slate-600">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded border-slate-300 text-[#1A56FF] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer" />
                    </td>
                    <td className="py-4 px-4 font-black text-[#111A3E]">{supplier.name}</td>
                    <td className="py-4 px-4 font-bold text-slate-400 tracking-mono">{supplier.tin || "—"}</td>
                    <td className="py-4 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border border-slate-200/20">
                        {supplier.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-400">{supplier.industry || "—"}</td>
                    <td className="py-4 px-4 text-slate-400">{supplier.created_at}</td>
                    <td className="py-4 px-4 font-medium text-slate-500">{supplier.email}</td>
                    <td className="py-4 px-4 text-right pr-5">
                      <button className="inline-flex items-center gap-1 text-[10px] font-black text-[#1A56FF] bg-[#F0F4FF] hover:bg-[#1A56FF] hover:text-white px-2.5 py-1 rounded-lg border border-[#DCE4FF] shadow-sm transition-all duration-200">
                        <Eye size={11} /> Explore
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}