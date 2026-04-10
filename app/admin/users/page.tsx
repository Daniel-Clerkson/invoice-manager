"use client";

import React from 'react';
import { UserPlus, Search, Edit3, Trash2, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function UserManagement() {
  const users = [
    { name: 'John Doe', email: 'user@business.com', role: 'user', status: 'Active', invoices: 12 },
    { name: 'Jane Smith', email: 'admin@company.com', role: 'admin', status: 'Active', invoices: 0 },
    { name: 'Mike Johnson', email: 'user2@business.com', role: 'user', status: 'Active', invoices: 8 },
    { name: 'Sarah Williams', email: 'super@company.com', role: 'super admin', status: 'Active', invoices: 0 },
    { name: 'Tom Brown', email: 'user3@business.com', role: 'user', status: 'Inactive', invoices: 3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="admin" />
      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">User Management</h1>
            <p className="text-slate-500">Manage users and their access levels</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-800 transition-all">
            <UserPlus size={18} /> Add User
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-lg font-bold">All Users (5)</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-all" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-600">
                All Roles <Filter size={14} />
              </button>
            </div>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[11px] font-black tracking-widest">
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
                <tr key={u.email} className="hover:bg-slate-50/30 transition-colors">
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
                  <td className="px-6 py-5 font-medium text-slate-600">{u.invoices}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3 text-slate-400">
                      <button className="hover:text-indigo-600"><Edit3 size={18} /></button>
                      <button className="hover:text-rose-600"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SmallStat label="Total Users" value="5" sub="Registered users" />
          <SmallStat label="Active Users" value="4" sub="Currently active" />
          <SmallStat label="Admins" value="2" sub="Admin & Super Admin" />
        </div>
      </main>
    </div>
  );
}

function SmallStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <h4 className="text-4xl font-black text-slate-900 mt-4">{value}</h4>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </div>
  );
}