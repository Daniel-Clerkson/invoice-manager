"use client";

import React, { useState } from 'react';
import { Search, UserPlus, Filter, Edit3, Trash2, X, ShieldAlert, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function SuperAdminUsers() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const users = [
    { name: 'John Doe', email: 'user@business.com', role: 'user', status: 'Active', invoices: 12 },
    { name: 'Sarah Williams', email: 'super@company.com', role: 'super admin', status: 'Active', invoices: 0 },
    { name: 'Mike Johnson', email: 'mike@tech.io', role: 'admin', status: 'Active', invoices: 4 },
    { name: 'Amaka Chenu', email: 'amaka@firs.gov', role: 'super admin', status: 'Active', invoices: 0 },
    { name: 'Tom Brown', email: 'tom@business.com', role: 'user', status: 'Inactive', invoices: 3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="sadmin" username='sadmin' />
      
      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-500 font-medium">Create, edit, and revoke system access levels</p>
          </div>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-600 transition-all active:scale-95"
          >
            <UserPlus size={18} /> Add New User
          </button>
        </header>

        {/* User List Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-10">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-slate-900">All Users ({users.length})</h2>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search by name..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 ring-indigo-500/20" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="text-slate-400 font-bold border-b border-slate-50 bg-slate-50/30">
                <tr>
                  <th className="px-8 py-5">Name & Email</th>
                  <th className="px-8 py-5">Access Level</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Invoices</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                        u.role === 'super admin' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className="font-bold text-slate-600 text-xs">{u.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">{u.invoices}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3 opacity-0 opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-all"><Edit3 size={18} /></button>
                        <button onClick={() => setDeleteTarget(u)} className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {/* ADD USER MODAL */}
        {isAddOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Provision User</h2>
                  <p className="text-sm text-slate-500">Set up a new system account</p>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
              </div>
              <div className="space-y-5">
                <InputGroup label="Account Name" placeholder="e.g. Daniel Polycarp" />
                <InputGroup label="Corporate Email" placeholder="name@business.com" />
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Permission Level</label>
                  <select className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-4 font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-600/10 focus:border-indigo-600 transition-all">
                    <option>Standard User</option>
                    <option>Administrative Access</option>
                    <option>Root (Super Admin)</option>
                  </select>
                </div>
                <button className="w-full py-5 bg-slate-900 text-white rounded-[1.25rem] font-black text-sm mt-4 hover:bg-indigo-600 shadow-xl shadow-indigo-100 transition-all">Create Account</button>
              </div>
            </motion.div>
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
              <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldAlert size={36}/></div>
              <h2 className="text-xl font-black text-slate-900 mb-2">Revoke Access?</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Are you sure you want to remove <b>{deleteTarget.name}</b>? This action will disable their login immediately.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200">Cancel</button>
                <button className="flex-1 py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 hover:bg-rose-700">Deactivate</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputGroup({ label, placeholder }: any) {
  return (
    <div>
      <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-medium outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 ring-indigo-500/5 transition-all" 
      />
    </div>
  );
}