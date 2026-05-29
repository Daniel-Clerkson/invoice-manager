"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Edit3, Trash2, X, Save, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/DashboardLayout";

export default function UserDashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      const [invoicesRes, profileRes] = await Promise.all([
        supabase.from("invoices").select("*").eq("user_id", user.id),
        supabase.from("profiles").select("username").eq("id", user.id).single(),
      ]);

      if (invoicesRes.data) setInvoices(invoicesRes.data);
      setUsername(profileRes.data?.username || "User");
      setLoading(false);
    }

    loadData();
  }, [router]);

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch("/api/invoices/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id: deleteTarget.id }),
    });

    if (res.ok) {
      setInvoices(invoices.filter((inv) => inv.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
    setDeleting(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    setUpdating(true);
    e.preventDefault();

    const res = await fetch("/api/invoices/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: editTarget.id,
        updateData: {
          status: editTarget.status,
          total_amount: editTarget.total_amount,
          firs_payload: editTarget.firs_payload,
        },
      }),
    });

    if (res.ok) {
      setInvoices(invoices.map((inv) => (inv.id === editTarget.id ? editTarget : inv)));
      setEditTarget(null);
    }
    setUpdating(false);
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (activeTab === "pending") return inv.status === "pending" || !inv.status;
    return true;
  });

  return (
    <DashboardLayout username={username} onNewInvoiceClick={() => router.push("/dashboard/create")}>
      
      {/* Section Dynamic Header Identity */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Welcome to InvoiceMe</h1>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition">
          <Sliders size={13} /> Customize Invoice Portal
        </button>
      </div>

      {/* Interactive Custom Banner Frame */}
      <div className="bg-[#EAFDF3] border border-emerald-100/60 rounded-xl p-5 sm:p-6 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 z-10 max-w-xl">
          <h3 className="text-sm font-bold text-emerald-950">Create Your Custom Invoice Portal</h3>
          <p className="text-xs text-emerald-800/80 leading-relaxed font-normal">
            You haven't set up your customized supplier portal yet. Customize your portal to simplify invoice collection from vendors and suppliers seamlessly.
          </p>
          <div className="pt-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm transition active:scale-95">
              Customize Portal
            </button>
          </div>
        </div>

        {/* Embedded Decorative Block */}
        <div className="hidden sm:block relative w-32 h-20 opacity-90 flex-shrink-0">
          <div className="absolute inset-0 bg-white shadow-md border border-slate-100 rounded-lg p-2 text-[8px] font-bold space-y-1.5">
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <span className="text-slate-400">Invoice Ref</span>
              <span className="text-emerald-600">30,000.00 NGN</span>
            </div>
            <div className="h-2 w-16 bg-slate-100 rounded-sm" />
            <div className="h-2 w-10 bg-slate-50 rounded-sm" />
            <div className="flex justify-end pt-1">
              <span className="bg-emerald-50 text-emerald-600 px-1 py-0.5 rounded text-[6px]">Paid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Filter Control Strip */}
      <div className="flex border-b border-slate-200/60 gap-4 text-xs font-semibold pt-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 px-1 relative transition-colors ${activeTab === "all" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
        >
          All Incoming Invoices
          {activeTab === "all" && (
            <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 px-1 relative transition-colors ${activeTab === "pending" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
        >
          Pending Invoices
          {activeTab === "pending" && (
            <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
          )}
        </button>
      </div>

      {/* Ledger Presentation View */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-xs font-semibold text-slate-400 bg-white border border-slate-100 rounded-xl shadow-sm">
          <div className="animate-pulse">Synchronizing ledger data...</div>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-slate-100 rounded-xl text-center shadow-sm">
          <h4 className="text-xs font-bold text-slate-700">No New Invoices</h4>
          <p className="text-[11px] text-slate-400 max-w-xs mt-0.5">Your record queue is clear.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-4 sm:px-6 py-3.5">Invoice ID & IRN</th>
                  <th className="px-4 sm:px-6 py-3.5">Issue Date</th>
                  <th className="px-4 sm:px-6 py-3.5">Total Amount</th>
                  <th className="px-4 sm:px-6 py-3.5">Status Flag</th>
                  <th className="px-4 sm:px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-600">
                {filteredInvoices.map((inv) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-4 sm:px-6 py-4">
                      <span className="font-bold text-slate-900 block">INV-00{inv.id}</span>
                      <span className="text-[10px] font-mono text-slate-400 block truncate max-w-[100px] sm:max-w-[140px] mt-0.5">{inv.irn || "N/A"}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-slate-500 font-normal whitespace-nowrap">
                      {inv.firs_payload?.issue_date || "Not Listed"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                      ₦{inv.total_amount?.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        inv.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : inv.status === "rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {inv.status || "Submitted"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5 lg:opacity-60 lg:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditTarget(inv)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded transition">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => setDeleteTarget(inv)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- MODAL LAYER --- */}
      <AnimatePresence>
        {editTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditTarget(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }} className="relative w-full max-w-md bg-white border border-slate-100 rounded-xl shadow-xl p-5 sm:p-6">
              <div className="flex justify-between items-center mb-5 border-b border-slate-50 pb-3">
                <h2 className="text-base font-bold text-slate-900">Edit Invoice</h2>
                <button onClick={() => setEditTarget(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded">
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Issue Date</label>
                    <input
                      type="date"
                      value={editTarget?.firs_payload?.issue_date || ""}
                      onChange={(e) => setEditTarget({ ...editTarget, firs_payload: { ...editTarget.firs_payload, issue_date: e.target.value } })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Amount (₦)</label>
                    <input
                      type="number"
                      value={editTarget?.total_amount || ""}
                      onChange={(e) => setEditTarget({ ...editTarget, total_amount: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Status State</label>
                  <select value={editTarget.status} onChange={(e) => setEditTarget({ ...editTarget, status: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition">
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <button type="submit" disabled={updating} className="w-full h-10 bg-emerald-600 text-white rounded-lg text-xs font-semibold mt-2 flex items-center justify-center gap-1.5 shadow-sm">
                  <Save size={14} /> {updating ? "Saving..." : "Update Invoice Record"}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="relative w-full max-w-xs bg-white border border-slate-100 rounded-xl shadow-xl p-5 text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-sm font-bold text-slate-900">Confirm Deletion</h2>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">Are you sure you want to delete invoice record <b>{deleteTarget.id}</b>?</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 h-9 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">Cancel</button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 h-9 bg-rose-600 text-white text-xs font-semibold rounded-lg shadow-sm">{deleting ? "Removing..." : "Delete"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}