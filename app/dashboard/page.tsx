"use client";

import React from 'react';
import { FileText, Clock, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function UserDashboard() {
  const invoices = [
    { id: 'INV-001', irn: 'IRN-2026-001', date: '2026-04-08', amount: 450000, status: 'submitted' },
    { id: 'INV-002', irn: 'IRN-2026-002', date: '2026-04-07', amount: 280000, status: 'approved' },
    { id: 'INV-003', irn: 'IRN-2026-003', date: '2026-04-05', amount: 125000, status: 'rejected' },
    { id: 'INV-004', irn: 'IRN-2026-004', date: '2026-04-03', amount: 890000, status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="user" />
      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500">Manage and track your invoices</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all">
            <Plus size={18} /> Create Invoice
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-10">
          <StatCard label="Total Invoices" value="4" icon={<FileText size={20} className="text-blue-500" />} />
          <StatCard label="Pending Review" value="2" icon={<Clock size={20} className="text-amber-500" />} />
          <StatCard label="Approved" value="1" icon={<CheckCircle2 size={20} className="text-emerald-500" />} />
          <StatCard label="Rejected" value="1" icon={<XCircle size={20} className="text-rose-500" />} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold">Recent Invoices</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">IRN</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">{inv.id}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.irn}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">₦{inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      inv.status === 'submitted' ? 'bg-slate-900 text-white' : 
                      inv.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                      inv.status === 'rejected' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-600 font-bold hover:text-indigo-600 mr-4">View</button>
                    {inv.status === 'rejected' && <button className="text-slate-600 font-bold hover:text-indigo-600">Edit</button>}
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

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex justify-between items-start">
      <div>
        <p className="text-sm font-bold text-slate-400">{label}</p>
        <h3 className="mt-4 text-4xl font-black text-slate-900">{value}</h3>
      </div>
      <div className="bg-slate-50 p-3 rounded-xl">{icon}</div>
    </div>
  );
}