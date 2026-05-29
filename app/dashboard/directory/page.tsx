"use client";

import React, { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Calendar,
  X,
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-2">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Directory</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#00875A] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#006F49] transition-all shadow-sm">
            <Plus size={14} /> Add Directory
          </button>
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#8AE6C2] text-[#004D34] text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#72D1AD] transition-all shadow-sm">
            <Download size={14} /> Import Directory
          </button>
        </div>
      </div>

      {/* Table Container Block */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
        
        {/* Filter controls row */}
        <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-slate-50">
          
          <button className="bg-[#1E293B] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm">
            All Directories
          </button>

          {/* Search Bar Input */}
          <div className="relative flex-1 min-w-[200px] sm:min-w-[240px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search directory"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 bg-white border border-slate-200 rounded-lg pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#00875A] transition-all"
            />
          </div>

          {/* Date Filter Input */}
          <div className="relative min-w-[130px]">
            <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Date"
              className="w-full h-9 bg-white border border-slate-200 rounded-lg pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none cursor-pointer"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>

          {/* Type Select Menu */}
          <select className="h-9 bg-white border border-slate-200 rounded-lg px-3 text-xs font-semibold text-slate-600 outline-none cursor-pointer focus:border-[#00875A]">
            <option>All</option>
            <option>Supplier</option>
            <option>Customer</option>
          </select>

          {/* Export Dropdown Menu */}
          <select className="h-9 bg-white border border-slate-200 rounded-lg px-3 text-xs font-semibold text-slate-600 outline-none cursor-pointer focus:border-[#00875A]">
            <option>Export Data</option>
            <option>Export CSV</option>
            <option>Export XLSX</option>
          </select>

          {/* Clear Filter Control Button */}
          <button 
            onClick={() => setSearchQuery("")}
            className="text-xs font-bold text-rose-500 border border-rose-100 bg-rose-50/50 px-4 py-2 rounded-lg hover:bg-rose-50 transition-all ml-auto flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-start"
          >
            <X size={12} /> Clear Filters
          </button>
        </div>

        {/* Structured Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-[#00875A] focus:ring-[#00875A] w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 font-bold">Supplier Name</th>
                <th className="py-3 px-4 font-bold">Supplier TIN</th>
                <th className="py-3 px-4 font-bold">Directory Type</th>
                <th className="py-3 px-4 font-bold">Industry</th>
                <th className="py-3 px-4 font-bold">Created</th>
                <th className="py-3 px-4 font-bold">Email</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xs font-semibold text-slate-400">No suppliers found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                suppliers.map((supplier: any, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 transition-colors text-xs font-medium text-slate-700">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded border-slate-300 text-[#00875A] focus:ring-[#00875A] w-3.5 h-3.5" />
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">{supplier.name}</td>
                    <td className="py-4 px-4 text-slate-500">{supplier.tin || "—"}</td>
                    <td className="py-4 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold uppercase">
                        {supplier.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{supplier.industry || "—"}</td>
                    <td className="py-4 px-4 text-slate-500">{supplier.created_at}</td>
                    <td className="py-4 px-4 text-slate-500">{supplier.email}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-xs font-bold text-[#00875A] hover:underline">View</button>
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