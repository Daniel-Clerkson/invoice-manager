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
  FileSpreadsheet,
  HelpCircle,
  Inbox
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-[#111A3E] tracking-tight">Billing & Wallet Matrix</h1>
          <p className="text-xs text-slate-400 font-medium">Manage your operational deposit bounds, pipeline funding details, and transactional ledger histories.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm text-slate-600 px-3.5 h-10 rounded-xl text-xs font-bold transition-all">
            <SlidersHorizontal size={13} /> Adjust Preferences
          </button>
        </div>
      </div>

      {/* Main Structural Balance Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        
        {/* Primary Account Balance Overview Hub Element */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#1A56FF]/20 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aggregated Amount Due</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#F0F4FF] text-[#1A56FF] border border-[#DCE4FF]">
                  Postpaid Node
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-[#1A56FF] group-hover:bg-[#F0F4FF] group-hover:border-[#DCE4FF] flex items-center justify-center transition-all duration-300">
                <Wallet size={16} />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-4xl font-black tracking-tight text-[#111A3E]">₦0.00</h2>
            </div>

            {/* Funding parameters container context fields box */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 bg-slate-50/70 border border-slate-100 p-3.5 rounded-xl max-w-2xl relative">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#1A56FF] bg-[#F0F4FF] px-2 py-1 rounded-md border border-[#DCE4FF] whitespace-nowrap">
                Bank Wire Settlement
              </span>
              <p className="text-xs text-slate-600 font-semibold truncate flex-1 min-w-[200px] tracking-tight">
                Hoptool Technology: <span className="font-bold text-[#111A3E] font-mono select-all bg-white border border-slate-100 px-1.5 py-0.5 rounded-md">{accountNumber}</span> <span className="text-slate-400 font-normal text-[11px]">(Providus Bank)</span>
              </p>
              <button 
                onClick={handleCopyAccount}
                className="p-1.5 bg-white text-slate-400 hover:text-[#1A56FF] hover:border-[#DCE4FF] rounded-lg border border-slate-200 shadow-sm transition-all shrink-0 active:scale-95"
                title="Copy Account Number"
              >
                {copied ? <Check size={13} className="text-[#1A56FF]" strokeWidth={3} /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Graphical Progress Structural Bar Blocks Indicator layout matching frame references */}
          <div className="mt-8">
            <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden bg-slate-100/70">
              <div className="w-[45%] h-full bg-[#1A56FF]/90 rounded-full" />
              <div className="w-[25%] h-full bg-[#1A56FF]/40 rounded-full" />
              <div className="w-[15%] h-full bg-amber-400/80 rounded-full" />
              <div className="w-[15%] h-full bg-slate-200/50 rounded-full" />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1A56FF]" /> Allocated bounds</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1A56FF]/40" /> Active settlements</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Processing drafts</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Sub-Grid Counters Cluster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#1A56FF]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold tracking-tight text-slate-500">Total Pipeline Invoices</span>
              <div className="p-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 group-hover:text-[#1A56FF] group-hover:bg-[#F0F4FF] group-hover:border-[#DCE4FF] transition-all">
                <CreditCard size={14} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-[#111A3E] tracking-tight">0</h3>
              <div className="flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                0 <span className="text-slate-400 font-semibold ml-0.5 lowercase">this month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm group hover:border-slate-200 transition-all duration-300">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold tracking-tight text-slate-500 truncate">Outbound Sent</span>
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400"><ArrowUpRight size={13} className="text-amber-500" /></div>
              </div>
              <h3 className="text-xl font-black text-[#111A3E] tracking-tight mt-3">0</h3>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm group hover:border-slate-200 transition-all duration-300">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold tracking-tight text-slate-500 truncate">Inbound Recieved</span>
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400"><ArrowDownLeft size={13} className="text-[#1A56FF]" /></div>
              </div>
              <h3 className="text-xl font-black text-[#111A3E] tracking-tight mt-3">0</h3>
            </div>
          </div>

        </div>
      </div>

      {/* Transaction Details Filtering and Secondary Matrix Block */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-6">
        
        {/* Filter Toolbar controls action row sub-components */}
        <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-slate-100">
          <button className="bg-[#111A3E] text-white text-xs font-bold h-9 px-4 rounded-xl shadow-sm tracking-tight">
            Transaction Logs
          </button>

          {/* Date Picker trigger fields interface line */}
          <div className="relative min-w-[140px]">
            <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Date Matrix"
              className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none cursor-pointer focus:border-[#1A56FF] transition-all"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>

          {/* Transaction Type selection fields element configurations */}
          <div className="relative">
            <select
              value={transactionFilter}
              onChange={(e) => setTransactionFilter(e.target.value)}
              className="appearance-none h-9 bg-white border border-slate-200 text-xs font-bold text-slate-600 pl-3 pr-8 py-1.5 rounded-xl focus:outline-none focus:border-[#1A56FF] cursor-pointer focus:ring-4 focus:ring-[#1A56FF]/5 transition-all"
            >
              <option value="all">All Operations</option>
              <option value="deposits">Deposits</option>
              <option value="payouts">Settlements</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Data Export Control Modules cluster sets */}
          <div className="relative">
            <select className="appearance-none h-9 bg-white border border-slate-200 text-xs font-bold text-slate-600 pl-8 pr-8 py-1.5 rounded-xl focus:outline-none focus:border-[#1A56FF] cursor-pointer focus:ring-4 focus:ring-[#1A56FF]/5 transition-all">
              <option>Export Dataset</option>
              <option>Export Ledger CSV</option>
              <option>Export Spreadsheet</option>
            </select>
            <FileSpreadsheet size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={() => setTransactionFilter("all")}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 px-3 py-2 rounded-xl transition-all ml-auto"
          >
            Reset Filters
          </button>
        </div>

        {/* Secondary Transaction Records Structured List Table presentation shell */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/70 select-none">
                <th className="py-3.5 px-4 w-12 text-center">
                  <span className="inline-block w-2.5 h-2.5 rounded bg-slate-200" />
                </th>
                <th className="py-3.5 px-4 font-black">Transaction Reference</th>
                <th className="py-3.5 px-4 font-black">Timestamp</th>
                <th className="py-3.5 px-4 font-black">Direction Type</th>
                <th className="py-3.5 px-4 font-black">Operational Channel</th>
                <th className="py-3.5 px-4 font-black">Settlement Volume</th>
                <th className="py-3.5 px-4 font-black text-right pr-5">Execution Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-600">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-[220px] mx-auto">
                      <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-300 rounded-xl">
                        <Inbox size={16} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-700">Ledger Index Empty</h4>
                      <p className="text-[10px] font-medium text-slate-400 leading-normal">
                        No financial transactions have logged into this ecosystem node yet.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                transactions.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 text-center">
                      <span className={`w-2 h-2 rounded-full inline-block ${tx.type === "deposit" ? "bg-emerald-500" : "bg-[#1A56FF]"}`} />
                    </td>
                    <td className="py-4 px-4 font-black text-[#111A3E] font-mono text-[11px] tracking-tight">{tx.reference}</td>
                    <td className="py-4 px-4 text-slate-400 font-medium">{tx.date}</td>
                    <td className="py-4 px-4">
                      <span className="text-[10px] font-black uppercase tracking-wider">{tx.type}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 font-medium">{tx.channel || "Bank Transfer"}</td>
                    <td className="py-4 px-4 font-black text-[#111A3E]">₦{tx.amount?.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right pr-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wide bg-[#F0F4FF] text-[#1A56FF] border border-[#DCE4FF]">
                        {tx.status || "Completed"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination Layout Layer Controls */}
        <div className="flex items-center justify-between pt-4 text-xs text-slate-400 font-bold select-none">
          <span className="tracking-tight text-[11px]">Displaying Profile Range 1-1</span>
          <div className="flex items-center gap-1.5">
            <button disabled className="px-3 h-8 border border-slate-100 rounded-xl bg-slate-50 text-slate-300 font-bold cursor-not-allowed transition-all">
              Prev
            </button>
            <button className="px-3 h-8 bg-[#111A3E] text-white rounded-xl font-bold shadow-sm transition-all text-xs">
              1
            </button>
            <button disabled className="px-3 h-8 border border-slate-100 rounded-xl bg-slate-50 text-slate-300 font-bold cursor-not-allowed transition-all">
              Next
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}