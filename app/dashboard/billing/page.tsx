"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  ChevronDown,
  Copy,
  Check,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  SlidersHorizontal,
  FileSpreadsheet
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function BillingPage() {
  const [copied, setCopied] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [transactions, setTransactions] = useState([]); // Array state placeholder for transactional records

  const businessUser = "Prince Achoja";
  const accountNumber = "0000000000";

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout username={businessUser}>
      
      {/* Header Context Action Line */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-2">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Billing & Wallet</h1>
          <p className="text-xs text-slate-400 font-medium">Manage your operational deposit bounds and transactional history logs.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-3.5 py-2 rounded-lg text-xs font-bold shadow-sm transition">
            <SlidersHorizontal size={13} /> Preferences
          </button>
        </div>
      </div>

      {/* Main Structural Balance Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Primary Account Balance Overview Hub Element */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-slate-200/80 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Amount Due</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  Postpaid
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Wallet size={16} />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">₦0.00</h2>
            </div>

            {/* Funding parameters container context fields box */}
            <div className="mt-5 flex flex-wrap items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl max-w-xl">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50 whitespace-nowrap">
                Fund via Bank Transfer
              </span>
              <p className="text-xs text-slate-600 font-medium truncate flex-1 min-w-[200px]">
                Hoptool Technology: <span className="font-bold text-slate-900 font-mono">Providus Bank / {accountNumber}</span>
              </p>
              <button 
                onClick={handleCopyAccount}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-md border border-transparent hover:border-slate-100 transition-all shrink-0"
                title="Copy Account Number"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Graphical Progress Structural Bar Blocks Indicator layout matching frame references */}
          <div className="mt-8">
            <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden bg-slate-50">
              <div className="w-[45%] h-full bg-emerald-400/80 rounded-full" />
              <div className="w-[25%] h-full bg-indigo-400/80 rounded-full" />
              <div className="w-[15%] h-full bg-amber-400/80 rounded-full" />
              <div className="w-[15%] h-full bg-slate-100 rounded-full" />
            </div>
            <div className="flex items-center gap-4 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Allocated bounds</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-400" /> Active settlements</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Processing drafts</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Sub-Grid Counters Cluster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-slate-200 transition">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold tracking-tight">Total Invoices</span>
              <div className="p-1 rounded bg-slate-50 text-slate-400 group-hover:bg-slate-100 transition">
                <CreditCard size={14} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">0</h3>
              <div className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                <ArrowUpRight size={10} /> 0 <span className="text-slate-300 font-normal ml-0.5">last month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm group hover:border-slate-200 transition">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold tracking-tight truncate">Invoices Sent</span>
                <div className="p-1 rounded bg-slate-50 text-slate-400"><ArrowUpRight size={12} className="text-orange-500" /></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-3">0</h3>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm group hover:border-slate-200 transition">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold tracking-tight truncate">Invoices Recieved</span>
                <div className="p-1 rounded bg-slate-50 text-slate-400"><ArrowDownLeft size={12} className="text-orange-500" /></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-3">0</h3>
            </div>
          </div>

        </div>
      </div>

      {/* Transaction Details Filtering and Secondary Matrix Block */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-6">
        
        {/* Filter Toolbar controls action row sub-components */}
        <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-slate-50">
          <button className="bg-[#1E293B] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
            Transaction Details
          </button>

          {/* Date Picker trigger fields interface line */}
          <div className="relative min-w-[130px]">
            <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Date Created"
              className="w-full h-9 bg-white border border-slate-200 rounded-lg pl-9 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none cursor-pointer hover:border-slate-300 focus:border-slate-400 transition"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>

          {/* Transaction Type selection fields element configurations */}
          <div className="relative">
            <select
              value={transactionFilter}
              onChange={(e) => setTransactionFilter(e.target.value)}
              className="appearance-none h-9 bg-white border border-slate-200 text-xs font-semibold text-slate-600 pl-3 pr-8 py-1.5 rounded-lg focus:outline-none focus:border-slate-400 cursor-pointer hover:border-slate-300 transition"
            >
              <option value="all">All Transactions</option>
              <option value="deposits">Deposits</option>
              <option value="payouts">Settlements</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
          </div>

          {/* Data Export Control Modules cluster sets */}
          <div className="relative">
            <select className="appearance-none h-9 bg-white border border-slate-200 text-xs font-semibold text-slate-600 pl-3 pr-8 py-1.5 rounded-lg focus:outline-none focus:border-slate-400 cursor-pointer hover:border-slate-300 transition">
              <option>Export Data</option>
              <option>Export Ledger CSV</option>
              <option>Export Spreadsheet</option>
            </select>
            <FileSpreadsheet size={12} className="absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={() => setTransactionFilter("all")}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 px-3 py-2 rounded-lg transition-all ml-auto"
          >
            Clear Filters
          </button>
        </div>

        {/* Secondary Transaction Records Structured List Table presentation shell */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4 w-10 text-center">
                  <span className="inline-block w-2.5 h-2.5 rounded bg-slate-200" />
                </th>
                <th className="py-3 px-4 font-bold">Payment Reference</th>
                <th className="py-3 px-4 font-bold">Date</th>
                <th className="py-3 px-4 font-bold">Type</th>
                <th className="py-3 px-4 font-bold">Channel</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-600">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <p className="text-xs font-semibold text-slate-400">No transactions found.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-4 text-center">
                      <span className={`w-2 h-2 rounded-full inline-block ${tx.type === "deposit" ? "bg-emerald-500" : "bg-blue-500"}`} />
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 font-mono text-[11px]">{tx.reference}</td>
                    <td className="py-4 px-4 text-slate-500 font-normal">{tx.date}</td>
                    <td className="py-4 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{tx.type}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-normal">{tx.channel || "Bank Transfer"}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">₦{tx.amount?.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {tx.status || "Successful"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination Layout Layer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-xs text-slate-500 font-semibold">
          <span>Page 1 of 1</span>
          <div className="flex items-center gap-1.5">
            <button disabled className="px-3 py-1.5 border border-slate-100 rounded-lg bg-slate-50 text-slate-300 font-bold cursor-not-allowed transition">
              Previous
            </button>
            <button className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg font-bold shadow-sm transition">
              1
            </button>
            <button disabled className="px-3 py-1.5 border border-slate-100 rounded-lg bg-slate-50 text-slate-300 font-bold cursor-not-allowed transition">
              Next
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}