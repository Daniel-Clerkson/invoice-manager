"use client";

import React from 'react';
import { Clock, CheckCircle, XCircle, FileText, Search, Check, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AdminDashboard() {
  const stats = [
    { label: 'Awaiting Review', value: '12', icon: <Clock className="text-amber-500" />, bg: 'bg-amber-50' },
    { label: 'Approved Today', value: '8', icon: <CheckCircle className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Rejected', value: '3', icon: <XCircle className="text-rose-500" />, bg: 'bg-rose-50' },
    { label: 'Total Reviewed', value: '47', icon: <FileText className="text-blue-500" />, bg: 'bg-blue-50' },
  ];

  const queue = [
    { id: 'INV-005', irn: 'IRN-2026-005', business: 'Acme Corp', date: '2026-04-10', amount: 650000 },
    { id: 'INV-006', irn: 'IRN-2026-006', business: 'Tech Solutions', date: '2026-04-09', amount: 420000 },
    { id: 'INV-007', irn: 'IRN-2026-007', business: 'Global Trading', date: '2026-04-09', amount: 890000 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="admin" />
      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500">Review and manage invoice submissions</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex justify-between">
              <div>
                <p className="text-sm font-bold text-slate-400">{s.label}</p>
                <h3 className="mt-4 text-4xl font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={`${s.bg} p-3 rounded-xl h-fit`}>{s.icon}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold">Review Queue</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">IRN</th>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">{item.id}</td>
                  <td className="px-6 py-4 text-slate-500">{item.irn}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{item.business}</td>
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">₦{item.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">Review</button>
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all">
                        <Check size={14} /> Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all">
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}