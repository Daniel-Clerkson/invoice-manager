"use client";

import React, { useState } from 'react';
import { UserPlus, Search, Edit3, Trash2, Filter, X, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

interface User {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  invoices: number;
}

export default function UserManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const users: User[] = [
    { name: 'John Doe', email: 'user@business.com', role: 'user', status: 'Active', invoices: 12 },
    { name: 'Jane Smith', email: 'admin@company.com', role: 'admin', status: 'Active', invoices: 0 },
    { name: 'Mike Johnson', email: 'user2@business.com', role: 'user', status: 'Active', invoices: 8 },
    { name: 'Sarah Williams', email: 'super@company.com', role: 'super admin', status: 'Active', invoices: 0 },
    { name: 'Tom Brown', email: 'user3@business.com', role: 'user', status: 'Inactive', invoices: 3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="admin" />
      <main className="mx-auto max-w-7xl p-4 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-slate-500">Manage users and their access levels</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
          >
            <UserPlus size={18} /> Add User
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">All Users ({users.length})</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search users..." className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-all" />
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                All Roles <Filter size={14} />
              </button>
            </div>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[900px]">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Invoices</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.email} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 font-bold text-slate-800">{u.name}</td>
                    <td className="px-6 py-5 text-slate-500">{u.email}</td>
                    <td className="px-6 py-5">
                      <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black text-slate-500 uppercase">{u.role}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-600">{u.invoices}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3 text-slate-300">
                        <button 
                            onClick={() => setEditingUser(u)}
                            className="hover:text-indigo-600 transition-colors"
                        >
                            <Edit3 size={18} />
                        </button>
                        <button 
                            onClick={() => setDeletingUser(u)}
                            className="hover:text-rose-600 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SmallStat label="Total Users" value="5" sub="Registered users" />
          <SmallStat label="Active Users" value="4" sub="Currently active" />
          <SmallStat label="Admins" value="2" sub="Admin & Super Admin" />
        </div>
      </main>

      {/* --- Modals Section --- */}
      <AnimatePresence>
        {/* ADD / EDIT MODAL */}
        {(isAddModalOpen || editingUser) && (
          <ModalWrapper onClose={() => { setIsAddModalOpen(false); setEditingUser(null); }}>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h2>
                    <button onClick={() => { setIsAddModalOpen(false); setEditingUser(null); }} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
                </div>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Full Name" placeholder="e.g. Daniel Polycarp" defaultValue={editingUser?.name} />
                        <InputGroup label="Email Address" placeholder="name@company.com" defaultValue={editingUser?.email} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Access Role</label>
                        <select className="w-full h-12 border border-slate-200 rounded-xl bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-600 transition-all">
                            <option>User</option>
                            <option>Admin</option>
                            <option>Super Admin</option>
                        </select>
                    </div>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm mt-4 hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100">
                        {editingUser ? 'Update User Access' : 'Create User Account'}
                    </button>
                </div>
            </div>
          </ModalWrapper>
        )}

        {/* DELETE MODAL */}
        {deletingUser && (
            <ModalWrapper onClose={() => setDeletingUser(null)}>
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Delete User?</h2>
                    <p className="text-slate-500 text-sm mb-8 px-4">
                        Are you sure you want to remove <span className="font-bold text-slate-800">{deletingUser.name}</span>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={() => setDeletingUser(null)} className="flex-1 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100">Cancel</button>
                        <button className="flex-1 py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 shadow-lg shadow-rose-200">Yes, Delete</button>
                    </div>
                </div>
            </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Helper Components ---

function SmallStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className="text-4xl font-black text-slate-900 mt-4 tracking-tight">{value}</h4>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </div>
  );
}

function InputGroup({ label, placeholder, defaultValue }: { label: string, placeholder: string, defaultValue?: string }) {
    return (
        <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
            <input 
                type="text" 
                defaultValue={defaultValue}
                placeholder={placeholder} 
                className="w-full h-12 border border-slate-200 rounded-xl bg-slate-50 px-4 text-sm font-medium outline-none focus:bg-white focus:border-indigo-600 transition-all" 
            />
        </div>
    )
}

function ModalWrapper({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                {children}
            </motion.div>
        </div>
    )
}