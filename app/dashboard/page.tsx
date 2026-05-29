"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Edit3, Trash2, X, Save, AlertTriangle, FileText, Plus } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-[#111A3E] tracking-tight">Welcome to Julath Portal</h1>
          <p className="text-xs text-slate-400 font-medium">Monitor your operational pipelines, manage vendor inflows, and track real-time settlement states.</p>
        </div>
        <button className="w-full sm:w-auto h-10 flex items-center justify-center gap-1.5 border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm text-slate-600 px-4 rounded-xl text-xs font-bold transition-all">
          <Sliders size={13} /> Customize Ledger Hub
        </button>
      </div>

      {/* Interactive Custom Banner Frame */}
      <div className="my-6 bg-white border border-slate-100 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm group hover:border-[#1A56FF]/20 transition-all duration-300">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#F0F4FF] text-[#1A56FF] border border-[#DCE4FF]">
            Action Required
          </div>
          <h3 className="text-sm font-black text-[#111A3E]">Configure Your Custom Supplier Pipeline</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Your custom supplier node hasn't been provisioned yet. Finalize your portal path configurations to streamline collection mechanics from external branches and suppliers effortlessly.
          </p>
          <div className="pt-2">
            <button className="bg-[#111A3E] hover:bg-[#1A56FF] text-white font-bold text-xs px-4 h-9 rounded-xl shadow-sm transition-all duration-200 active:scale-95">
              Provision Portal Node
            </button>
          </div>
        </div>

        {/* Embedded Decorative Block */}
        <div className="hidden sm:block relative w-36 h-24 opacity-95 flex-shrink-0">
          <div className="absolute inset-0 bg-slate-50/50 group-hover:bg-white shadow-sm border border-slate-100 rounded-xl p-3 text-[8px] font-black space-y-2 transition-all duration-300">
            <div className="flex justify-between border-b border-slate-100/70 pb-1.5 items-center">
              <span className="text-slate-400 uppercase tracking-wider text-[7px]">Pipeline Ref</span>
              <span className="text-[#1A56FF] font-mono font-bold">₦35,000.00</span>
            </div>
            <div className="h-2 w-20 bg-slate-200/60 rounded-md" />
            <div className="h-2 w-12 bg-slate-100 rounded-md" />
            <div className="flex justify-end pt-1">
              <span className="bg-[#F0F4FF] text-[#1A56FF] border border-[#DCE4FF] px-1.5 py-0.5 rounded-md text-[6px] font-black uppercase tracking-wide">
                Settled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Filter Control Strip */}
      <div className="flex border-b border-slate-100 gap-6 text-xs font-bold select-none pt-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 px-0.5 relative transition-colors ${activeTab === "all" ? "text-[#111A3E]" : "text-slate-400 hover:text-slate-600"}`}
        >
          All Operational Records
          {activeTab === "all" && (
            <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#1A56FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 px-0.5 relative transition-colors ${activeTab === "pending" ? "text-[#111A3E]" : "text-slate-400 hover:text-slate-600"}`}
        >
          Pending Settlements
          {activeTab === "pending" && (
            <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#1A56FF]" />
          )}
        </button>
      </div>

      {/* Ledger Presentation View */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-xs font-bold text-slate-400 bg-white border border-slate-100 rounded-2xl shadow-sm my-6">
          <div className="animate-pulse tracking-tight">Synchronizing ecosystem architecture...</div>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-slate-100 rounded-2xl text-center shadow-sm my-6 gap-2">
          <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-300 rounded-xl">
            <FileText size={16} />
          </div>
          <h4 className="text-xs font-bold text-slate-700">Ledger Index Unpopulated</h4>
          <p className="text-[10px] text-slate-400 max-w-xs mt-0.5 leading-normal">Your functional billing and profile record stream is currently clear.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 select-none">
                  <th className="px-6 py-4">Invoice Handle & IRN</th>
                  <th className="px-6 py-4">Timestamp Line</th>
                  <th className="px-6 py-4">Ecosystem Volume</th>
                  <th className="px-6 py-4">Execution State</th>
                  <th className="px-6 py-4 text-right pr-6">Management Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-600">
                {filteredInvoices.map((inv) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-black text-[#111A3E] block">INV-00{inv.id}</span>
                      <span className="text-[10px] font-mono text-slate-400 block truncate max-w-[100px] sm:max-w-[160px] mt-0.5 tracking-tight">{inv.irn || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">
                      {inv.firs_payload?.issue_date || "Not Listed"}
                    </td>
                    <td className="px-6 py-4 font-black text-[#111A3E] text-sm whitespace-nowrap">
                      ₦{inv.total_amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wide border ${
                        inv.status === "approved"
                          ? "bg-[#F0F4FF] text-[#1A56FF] border-[#DCE4FF]"
                          : inv.status === "rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {inv.status || "Submitted"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right pr-6">
                      <div className="flex justify-end gap-1.5 lg:opacity-50 lg:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditTarget(inv)} className="p-1.5 text-slate-400 hover:text-[#1A56FF] hover:bg-[#F0F4FF] border border-transparent hover:border-[#DCE4FF] rounded-lg transition-all">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => setDeleteTarget(inv)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-all">
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
            <motion.div initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }} className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#111A3E]">Modify Invoice Record</h2>
                <button onClick={() => setEditTarget(null)} className="p-1.5 bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-all">
                  <X size={15} />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Timestamp Frame</label>
                    <input
                      type="date"
                      value={editTarget?.firs_payload?.issue_date || ""}
                      onChange={(e) => setEditTarget({ ...editTarget, firs_payload: { ...editTarget.firs_payload, issue_date: e.target.value } })}
                      className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#1A56FF] focus:ring-4 focus:ring-[#1A56FF]/5 font-semibold text-slate-700 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Volume Allocation (₦)</label>
                    <input
                      type="number"
                      value={editTarget?.total_amount || ""}
                      onChange={(e) => setEditTarget({ ...editTarget, total_amount: parseInt(e.target.value) || 0 })}
                      className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#1A56FF] focus:ring-4 focus:ring-[#1A56FF]/5 font-mono font-bold text-slate-700 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Operational Status State</label>
                  <div className="relative">
                    <select value={editTarget.status} onChange={(e) => setEditTarget({ ...editTarget, status: e.target.value })} className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#1A56FF] focus:ring-4 focus:ring-[#1A56FF]/5 font-bold text-slate-600 transition-all appearance-none cursor-pointer">
                      <option value="pending">Pending Ledger State</option>
                      <option value="submitted">Submitted Target</option>
                      <option value="approved">Approved Verification</option>
                      <option value="rejected">Rejected Conflict</option>
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={updating} className="w-full h-10 bg-[#111A3E] hover:bg-[#1A56FF] text-white rounded-xl text-xs font-bold mt-2 flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200">
                  <Save size={14} /> {updating ? "Writing to Stack..." : "Commit Update Batch"}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="relative w-full max-w-xs bg-white border border-slate-100 rounded-2xl shadow-xl p-6 text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3.5 border border-rose-100/50">
                <AlertTriangle size={18} />
              </div>
              <h2 className="text-sm font-black text-[#111A3E]">Drop Ledger Record</h2>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-medium">Are you certain you want to purge invoice record <b className="text-slate-700 font-mono">INV-00{deleteTarget.id}</b> from database clusters?</p>
              <div className="flex gap-2 mt-5">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all">Abort</button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 h-9 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all">{deleting ? "Purging Stack..." : "Purge Record"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}