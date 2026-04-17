"use client";

import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Check, 
  X, 
  AlertCircle, 
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

// --- Types ---
interface Invoice {
  id: string;
  irn: string;
  business: string;
  date: string;
  amount: number;
  items: { desc: string; qty: number; price: number }[];
}

export default function AdminDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Mock Data
  const stats = [
    { label: 'Awaiting Review', value: '12', icon: <Clock className="text-amber-500" />, bg: 'bg-amber-50' },
    { label: 'Approved Today', value: '8', icon: <CheckCircle className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Rejected', value: '3', icon: <XCircle className="text-rose-500" />, bg: 'bg-rose-50' },
    { label: 'Total Reviewed', value: '47', icon: <FileText className="text-blue-500" />, bg: 'bg-blue-50' },
  ];

  const queue: Invoice[] = [
    { 
      id: 'INV-005', 
      irn: 'IRN-2026-005', 
      business: 'Acme Corp', 
      date: '2026-04-10', 
      amount: 650000,
      items: [
        { desc: "Software Licenses", qty: 5, price: 100000 },
        { desc: "Consultancy Fee", qty: 1, price: 150000 }
      ]
    },
    { 
      id: 'INV-006', 
      irn: 'IRN-2026-006', 
      business: 'Tech Solutions', 
      date: '2026-04-09', 
      amount: 420000,
      items: [{ desc: "Hardware Upgrade", qty: 1, price: 420000 }]
    },
    { 
      id: 'INV-007', 
      irn: 'IRN-2026-007', 
      business: 'Global Trading', 
      date: '2026-04-09', 
      amount: 890000,
      items: [{ desc: "Logistics Service", qty: 1, price: 890000 }]
    },
  ];

  // Function to trigger the first item in queue for "General Review" from Navbar
  const handleOpenGeneralReview = () => {
    if (queue.length > 0) setSelectedInvoice(queue[0]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="admin" onOpenReview={handleOpenGeneralReview} />
      
      <main className="mx-auto max-w-7xl p-4 md:p-10">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500">Review and manage invoice submissions</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex justify-between items-center sm:items-start">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{s.label}</p>
                <h3 className="mt-2 sm:mt-4 text-3xl font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={`${s.bg} p-3 rounded-xl h-fit`}>{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">Review Queue</h2>
            <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search business..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-600 focus:bg-white transition-all" />
                </div>
                <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100">
                    <Filter size={18} />
                </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-slate-50/50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Invoice ID</th>
                  <th className="px-6 py-4 whitespace-nowrap">Business</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.business}</td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">₦{item.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedInvoice(item)}
                        className="px-4 py-2 text-xs font-black bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                      >
                        Review Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- Review Modal --- */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Manual Approval Required</span>
                    <h2 className="text-3xl font-black text-slate-900 mt-3">{selectedInvoice.id}</h2>
                    <p className="text-slate-400 text-xs font-mono mt-1">{selectedInvoice.irn}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedInvoice(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entity Name</p>
                    <p className="text-base font-bold text-slate-800">{selectedInvoice.business}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Submission Date</p>
                    <p className="text-base font-bold text-slate-800">{selectedInvoice.date}</p>
                  </div>
                </div>

                <div className="mb-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Invoice Breakdown</p>
                    <div className="space-y-4">
                        {selectedInvoice.items?.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                                <span className="text-slate-600 font-medium">{item.desc} <span className="text-slate-400 ml-1">x{item.qty}</span></span>
                                <span className="font-bold text-slate-900">₦{(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-4">
                            <span className="font-black text-slate-900 text-lg">Total Due</span>
                            <span className="text-2xl font-black text-indigo-600">₦{selectedInvoice.amount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Final Decision Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setSelectedInvoice(null)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                  >
                    <CheckCircle size={18} /> Approve & Log to FIRS
                  </button>
                  <button 
                    onClick={() => setSelectedInvoice(null)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-100 transition-all active:scale-95"
                  >
                    <XCircle size={18} /> Reject Submission
                  </button>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 rounded-full w-fit mx-auto">
                    <AlertCircle size={12} className="text-slate-400" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Verified by Daniel
                    </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}