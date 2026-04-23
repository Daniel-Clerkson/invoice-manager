"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileCheck, 
  Activity, 
  ShieldCheck, 
  Lock,
  Search,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function SuperAdminDashboard() {
  // State for the Final Approval Modal
  const [reviewInvoice, setReviewInvoice] = useState<any>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const stats = [
    { label: 'Total System Invoices', value: '156', icon: <FileText className="text-blue-600" size={18} />, bg: 'bg-blue-50' },
    { label: 'Pending FIRS Submission', value: '8', icon: <Send className="text-purple-600" size={18} />, bg: 'bg-purple-50' },
    { label: 'Successfully Submitted', value: '142', icon: <CheckCircle2 className="text-emerald-600" size={18} />, bg: 'bg-emerald-50' },
    { label: 'Failed Submissions', value: '2', icon: <AlertCircle className="text-rose-600" size={18} />, bg: 'bg-rose-50' },
  ];

  const recentSubmissions = [
    { id: 'INV-002', irn: 'IRN-2026-002', date: '2026-04-08', status: 'Success' },
    { id: 'INV-010', irn: 'IRN-2026-010', date: '2026-04-07', status: 'Success' },
    { id: 'INV-011', irn: 'IRN-2026-011', date: '2026-04-06', status: 'Failed' },
  ];

  const handleFinalAuthorization = async () => {
    setIsAuthorizing(true);
    // Simulate FIRS Gateway Handshake
    await new Promise(r => setTimeout(r, 2000));
    setIsAuthorizing(false);
    setReviewInvoice(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="sadmin" username='sadmin' />
      
      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Super Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">System-wide monitoring and FIRS submission</p>
        </header>

        {/* 1. Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-slate-500 leading-tight w-2/3">{stat.label}</span>
                <div className={`${stat.bg} p-2 rounded-lg`}>{stat.icon}</div>
              </div>
              <h3 className="text-4xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* 2. Final Approval Queue */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-10">
          <div className="p-8 border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-900">Final Approval Queue</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-8 py-4">Invoice ID</th>
                  <th className="px-8 py-4">IRN</th>
                  <th className="px-8 py-4">Business</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Admin Approver</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-semibold text-slate-900">INV-008</td>
                  <td className="px-8 py-6 text-slate-500 font-medium">IRN-2026-008</td>
                  <td className="px-8 py-6 text-slate-700 font-medium">Enterprise Ltd</td>
                  <td className="px-8 py-6 font-bold text-slate-900">₦1,250,000</td>
                  <td className="px-8 py-6 text-slate-600 font-medium">John Doe</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setReviewInvoice({ id: 'INV-008', irn: 'IRN-2026-008', business: 'Enterprise Ltd', amount: '₦1,250,000' })}
                        className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => setReviewInvoice({ id: 'INV-008', irn: 'IRN-2026-008', business: 'Enterprise Ltd', amount: '₦1,250,000' })}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all"
                      >
                        <Send size={14} /> Submit to FIRS
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Second Row for Mockup Accuracy */}
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-semibold text-slate-900">INV-009</td>
                  <td className="px-8 py-6 text-slate-500 font-medium">IRN-2026-009</td>
                  <td className="px-8 py-6 text-slate-700 font-medium">Manufacturing Co</td>
                  <td className="px-8 py-6 font-bold text-slate-900">₦980,000</td>
                  <td className="px-8 py-6 text-slate-600 font-medium">Jane Smith</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-all">Review</button>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all">
                        <Send size={14} /> Submit to FIRS
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Recent FIRS Submissions */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-900">Recent FIRS Submissions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-8 py-4">Invoice ID</th>
                  <th className="px-8 py-4">IRN</th>
                  <th className="px-8 py-4">Submitted Date</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-semibold text-slate-700">{sub.id}</td>
                    <td className="px-8 py-6 text-slate-500 font-medium">{sub.irn}</td>
                    <td className="px-8 py-6 text-slate-500 font-medium">{sub.date}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        sub.status === 'Success' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-rose-50 text-rose-600'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* 4. FINAL APPROVAL MODAL */}
      <AnimatePresence>
        {reviewInvoice && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => !isAuthorizing && setReviewInvoice(null)} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="bg-slate-900 p-8 text-white flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-indigo-400">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Compliance Layer</span>
                  </div>
                  <h2 className="text-2xl font-bold">Review & Authorize Submission</h2>
                </div>
                <button onClick={() => setReviewInvoice(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-8 mb-8 border-b border-slate-100 pb-8">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Invoice ID</label>
                    <p className="text-lg font-bold text-slate-900">{reviewInvoice.id}</p>
                    <p className="text-xs font-mono text-slate-500">{reviewInvoice.irn}</p>
                  </div>
                  <div className="text-right">
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Grand Total</label>
                    <p className="text-3xl font-black text-slate-900">{reviewInvoice.amount}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xs font-bold text-slate-900 uppercase mb-4 flex items-center gap-2">
                    <Activity size={14} className="text-indigo-600" /> Gateway Pre-checks
                  </h3>
                  <div className="space-y-3">
                    <ValidationItem label="TIN Verification (FIRS Database)" status="verified" />
                    <ValidationItem label="Tax Calculation (VAT 7.5%)" status="verified" />
                    <ValidationItem label="Business Compliance Status" status="verified" />
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-8">
                  <AlertCircle className="text-amber-600 shrink-0" size={20} />
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    By authorizing, you are digitally signing this transaction for government submission. This process cannot be undone once the IRN is registered.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button 
                    disabled={isAuthorizing}
                    onClick={() => setReviewInvoice(null)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200"
                  >
                    Abort
                  </button>
                  <button 
                    disabled={isAuthorizing}
                    onClick={handleFinalAuthorization}
                    className="flex-[2] py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAuthorizing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Handshaking Gateway...
                      </>
                    ) : (
                      <>
                        <Lock size={16} /> Authorize & Submit to FIRS
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ValidationItem({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
        <CheckCircle2 size={12} />
        <span className="text-[10px] font-black uppercase tracking-wider">{status}</span>
      </div>
    </div>
  );
}