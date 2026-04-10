"use client";

import React from 'react';
import { ShieldCheck, Send, CheckCircle, AlertCircle, Search, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function SuperAdminDashboard() {
  const finalQueue = [
    { id: 'INV-008', irn: 'IRN-2026-008', business: 'Enterprise Ltd', amount: 1250000, approver: 'John Doe' },
    { id: 'INV-009', irn: 'IRN-2026-009', business: 'Manufacturing Co', amount: 980000, approver: 'Jane Smith' },
  ];

  const firsLog = [
    { id: 'INV-002', irn: 'IRN-2026-002', date: '2026-04-08', status: 'Success' },
    { id: 'INV-010', irn: 'IRN-2026-010', date: '2026-04-07', status: 'Success' },
    { id: 'INV-011', irn: 'IRN-2026-011', date: '2026-04-06', status: 'Failed' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Passing superadmin role to Navbar for specialized links */}
      <Navbar userRole="superadmin" />
      
      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={20} className="text-indigo-600" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">System Oversight</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900">Super Admin Console</h1>
            <p className="text-slate-500">Final FIRS compliance authorization and system logs</p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
              System Audit
            </button>
            <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Export Global Report
            </button>
          </div>
        </header>

        {/* Final Approval Queue Section */}
        <section className="mb-10">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800">Final Approval Queue</h2>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold">2 Pending FIRS Submission</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-400 uppercase text-[11px] font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">IRN</th>
                    <th className="px-6 py-4">Business</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Admin Approver</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {finalQueue.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-5 font-bold text-slate-900">{inv.id}</td>
                      <td className="px-6 py-5 text-slate-500 font-mono text-xs">{inv.irn}</td>
                      <td className="px-6 py-5 font-semibold text-slate-700">{inv.business}</td>
                      <td className="px-6 py-5 font-black text-slate-900 text-base">₦{inv.amount.toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                            {inv.approver.charAt(0)}
                          </div>
                          <span className="text-slate-600 font-medium">{inv.approver}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Review</button>
                          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-md">
                            <Send size={14} /> Submit to FIRS
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FIRS Log Section */}
        <section>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-800">Recent FIRS Submissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-400 uppercase text-[11px] font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">IRN</th>
                    <th className="px-6 py-4">Submitted Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {firsLog.map((log) => (
                    <tr key={log.id} className="group">
                      <td className="px-6 py-5 font-bold text-slate-700">{log.id}</td>
                      <td className="px-6 py-5 text-slate-500">{log.irn}</td>
                      <td className="px-6 py-5 text-slate-500">{log.date}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          log.status === 'Success' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-rose-50 text-rose-600'
                        }`}>
                          {log.status === 'Success' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {log.status === 'Success' ? (
                          <button className="text-indigo-600 font-bold text-xs flex items-center gap-1 justify-end ml-auto hover:underline">
                            View Cert <ExternalLink size={12} />
                          </button>
                        ) : (
                          <button className="text-slate-400 font-bold text-xs hover:text-slate-900">Retry</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}