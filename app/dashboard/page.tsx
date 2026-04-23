"use client";

import React, { useState, useEffect } from "react";

import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Edit3,
  X,
  AlertTriangle,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UserDashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [username, setUsername] = useState("Loading...");

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

      // Fetch both Invoices AND the User Profile concurrently
      const [invoicesRes, profileRes] = await Promise.all([
        supabase.from("invoices").select("*").eq("user_id", user.id),
        supabase.from("profiles").select("username").eq("id", user.id).single(),
      ]);

      if (invoicesRes.data) setInvoices(invoicesRes.data);

      console.log(invoicesRes.data);
      // Set the username from profileRes
      setUsername(profileRes.data?.username || "User");

      setLoading(false);
    }

    loadData();
  }, [router]);

  const handleDelete = async () => {
    // Call your new DELETE API route
    setDeleting(true)
    const res = await fetch("/api/invoices/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Required to send the auth cookie
      body: JSON.stringify({ id: deleteTarget.id }),
    });

    if (res.ok) {
      setInvoices(invoices.filter((inv) => inv.id !== deleteTarget.id));
      setDeleteTarget(null);
    } else {
      console.error("Failed to delete invoice");
    }
    setDeleting(false)
  };

  const handleUpdate = async (e: React.FormEvent) => {
    setUpdating(true);
    e.preventDefault();

    // Call your new PATCH API route
    const res = await fetch("/api/invoices/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Required to send the auth cookie
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
      setInvoices(
        invoices.map((inv) => (inv.id === editTarget.id ? editTarget : inv)),
      );
      setEditTarget(null);
    } else {
      console.error("Failed to update invoice");
    }

    setUpdating(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="user" username={username} />

      <main className="mx-auto max-w-7xl p-4 md:p-10">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dashboard
            </h1>

            <p className="text-slate-500 font-medium">
              Manage and track your compliance data
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/create")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-600 shadow-xl transition-all active:scale-95"
          >
            <Plus size={18} /> Create Invoice
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-slate-400">
            Loading your data...
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* The overflow-x-auto allows the table to scroll horizontally on small screens */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  <tr>
                    {/* Use dynamic padding: px-4 on mobile, px-8 on desktop */}
                    <th className="px-4 py-5 md:px-8">Invoice ID & IRN</th>
                    <th className="px-4 py-5 md:px-8">Date</th>
                    <th className="px-4 py-5 md:px-8">Amount</th>
                    <th className="px-4 py-5 md:px-8">Status</th>
                    <th className="px-4 py-5 md:px-8 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-4 py-5 md:px-8">
                        <p className="font-bold text-slate-800">
                          INV-00{inv.id}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[100px]">
                          {inv.irn}
                        </p>
                      </td>
                      <td className="px-4 py-5 md:px-8 text-slate-500 font-medium whitespace-nowrap">
                        {inv.firs_payload.issue_date}
                      </td>
                      <td className="px-4 py-5 md:px-8 font-black text-slate-900 whitespace-nowrap">
                        ₦{inv.total_amount?.toLocaleString()}
                      </td>
                      <td className="px-4 py-5 md:px-8">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${
                            inv.status === "approved"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-900 text-white"
                          }`}
                        >
                          {inv.status || "Submitted"}
                        </span>
                      </td>
                      <td className="px-4 py-5 md:px-8 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditTarget(inv)}
                            className="p-2 text-slate-400 hover:text-indigo-600"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(inv)}
                            className="p-2 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {/* EDIT MODAL */}
        {editTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditTarget(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Edit Invoice
                  </h2>
                  <p className="text-sm text-slate-500">
                    Updating <b>{editTarget.id}</b>
                  </p>
                </div>
                <button
                  onClick={() => setEditTarget(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      value={editTarget?.firs_payload?.issue_date || ""}
                      onChange={(e) =>
                        setEditTarget({
                          ...editTarget,
                          firs_payload: {
                            ...editTarget.firs_payload,
                            issue_date: e.target.value,
                          },
                        })
                      }
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-4 font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">
                      Total Amount (₦)
                    </label>
                    <input
                      type="number"
                      value={editTarget?.total_amount || ""}
                      onChange={(e) =>
                        setEditTarget({
                          ...editTarget,
                          total_amount: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-4 font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">
                    Status Flag
                  </label>
                  <select
                    value={editTarget.status}
                    onChange={(e) =>
                      setEditTarget({ ...editTarget, status: e.target.value })
                    }
                    className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-4 font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all"
                  >
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                {updating ? ( // If updating is true, show Loading
                  <button
                    disabled
                    className="cursor-not-allowed w-full py-5 bg-slate-400 text-white rounded-2xl font-black text-sm mt-4 transition-all flex items-center justify-center gap-2"
                  >
                    Updating...
                  </button>
                ) : (
                  // If updating is false, show the clickable button
                  <button
                    type="submit"
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm mt-4 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Update Invoice Record
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={36} />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2">
                Confirm Removal
              </h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Are you sure you want to delete <b>{deleteTarget.id}</b>? This
                action is permanent and cannot be reversed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                {deleting ? (
                  <button
                    disabled
                    onClick={handleDelete}
                    className="flex-1 py-4 bg-rose-900 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all"
                  >
                    Deleting...
                  </button>
                ) : (
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all"
                  >
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex justify-between items-start hover:border-indigo-100 transition-colors">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <h3 className="mt-4 text-4xl font-black text-slate-900">{value}</h3>
      </div>
      <div className="bg-slate-50 p-3 rounded-2xl">{icon}</div>
    </div>
  );
}
