"use client";

import React, { useState, useEffect } from "react";
import { 
  Search,
  ChevronDown,
  Calendar,
  Upload,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sliders
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/DashboardLayout";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  
  // Filtering states matching the UI design pattern
  const [activeTab, setActiveTab] = useState<"all" | "sent" | "received" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      // Fetch profile context concurrent data
      const profileRes = await supabase.from("profiles").select("username").eq("id", user.id).single();
      setUsername(profileRes.data?.username || "User");

      try {
        // Fetch real-time live data directly from your backend REST API route
        const res = await fetch("/api/invoices");
        if (res.ok) {
          const data = await res.json();
          setInvoices(data);
        } else {
          console.error("API endpoint returned an error status");
        }
      } catch (err) {
        console.error("Failed to fetch invoices dynamically:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  // Dynamic calculated summary metrics for top data badges
  const totalCount = invoices.length;
  const pendingCount = invoices.filter(i => i.status === "pending" || !i.status).length;
  const approvedCount = invoices.filter(i => i.status === "approved").length;
  const pastDueCount = invoices.filter(i => i.status === "rejected").length;

  // Data processing filter mechanism matching search input criteria
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = (inv.supplier_name || inv.firs_payload?.supplier_name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      (inv.irn || "").toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout username={username} onNewInvoiceClick={() => router.push("/dashboard/create")}>
      
      {/* Page Context Toolbar Meta Details */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Invoices Ledger</h2>
          <div className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Realtime View
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition">
            <Upload size={13} /> Upload Invoice
          </button>
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition">
            <Sliders size={13} /> Customize Engine
          </button>
        </div>
      </div>

      {/* 4-Column High Contrast Metric Grid Area */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard label="All Invoices" count={totalCount} trendColor="text-emerald-600" icon={<TrendingUp size={14} />} sparkColor="bg-emerald-600" />
        <MetricCard label="Pending" count={pendingCount} trendColor="text-amber-500" icon={<Clock size={14} />} sparkColor="bg-amber-500" />
        <MetricCard label="Approved" count={approvedCount} trendColor="text-emerald-600" icon={<CheckCircle2 size={14} />} sparkColor="bg-emerald-500" />
        <MetricCard label="Past Due" count={pastDueCount} trendColor="text-rose-500" icon={<AlertCircle size={14} />} sparkColor="bg-rose-500" />
      </div>

      {/* Filtering, Search Tool, Action Bar Controller Sub-system */}
      <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm">
        {/* View Tab Segments */}
        <div className="flex bg-slate-50 p-1 rounded-lg text-xs font-semibold text-slate-500 overflow-x-auto">
          <button onClick={() => setActiveTab("all")} className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-800"}`}>All Invoices</button>
          <button onClick={() => setActiveTab("sent")} className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${activeTab === "sent" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-800"}`}>Sent Invoices</button>
          <button onClick={() => setActiveTab("received")} className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${activeTab === "received" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-800"}`}>Received Invoices</button>
          <button onClick={() => setActiveTab("draft")} className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${activeTab === "draft" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-800"}`}>Draft Invoices</button>
        </div>

        {/* Inputs Control Cluster */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[160px] md:w-48">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Invoices"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition font-medium"
            />
          </div>
          
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-xs font-semibold text-slate-600 pl-3 pr-8 py-1.5 rounded-lg focus:outline-none focus:border-slate-400 cursor-pointer"
            >
              <option value="all">Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
          </div>

          <button className="flex items-center gap-1.5 border border-slate-200 bg-white text-slate-600 font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition">
            <Calendar size={13} /> Date
          </button>
        </div>
      </div>

      {/* Primary Main Data Ledger Shell presentation block */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-xs font-semibold text-slate-400 bg-white border border-slate-100 rounded-xl shadow-sm">
          <div className="animate-pulse">Loading live structural API data context...</div>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-slate-100 rounded-xl text-center shadow-sm">
          <h4 className="text-xs font-bold text-slate-700">No invoice found.</h4>
          <p className="text-[11px] text-slate-400 max-w-xs mt-0.5">Adjust your filters or query params above to parse items.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="w-12 px-4 py-3.5 text-center">
                    <input type="checkbox" className="rounded border-slate-200 text-emerald-600 focus:ring-0" readOnly />
                  </th>
                  <th className="px-4 py-3.5">Supplier Name</th>
                  <th className="px-4 py-3.5">IRN</th>
                  <th className="px-4 py-3.5">Department</th>
                  <th className="px-4 py-3.5">Created</th>
                  <th className="px-4 py-3.5">Amount</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Payment Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-600">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-4 py-4 text-center">
                      <input type="checkbox" className="rounded border-slate-200 text-emerald-600 focus:ring-0" readOnly />
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">
                      {inv.supplier_name || inv.firs_payload?.supplier_name || "Unassigned Vendor"}
                    </td>
                    <td className="px-4 py-4 font-mono text-[10px] text-slate-400">
                      {inv.irn || "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-normal">
                      {inv.department || "General"}
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-normal whitespace-nowrap">
                      {inv.firs_payload?.issue_date || "—"}
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">
                      ₦{inv.total_amount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
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
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === "approved" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                      }`}>
                        {inv.status === "approved" ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-xs text-slate-400 hover:text-slate-900 font-bold px-2 py-1 transition">
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

{/* Reusable internal primitive component modules for Cards */}
function MetricCard({ 
  label, 
  count, 
  trendColor, 
  icon, 
  sparkColor 
}: { 
  label: string; 
  count: number; 
  trendColor: string; 
  icon: React.ReactNode; 
  sparkColor: string;
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-slate-200 transition">
      <div className="flex items-center justify-between gap-2 text-slate-400">
        <span className="text-xs font-bold tracking-tight">{label}</span>
        <div className="p-1 rounded bg-slate-50 text-slate-400 group-hover:bg-slate-100 transition">{icon}</div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{count}</h3>
        <div className={`flex items-center gap-0.5 text-[10px] font-bold ${trendColor}`}>
          <ArrowUpRight size={10} /> 0 <span className="text-slate-300 font-normal ml-0.5">last month</span>
        </div>
      </div>
      
      {/* Spark line metadata indicators */}
      <div className="mt-3 flex items-end gap-0.5 h-6 opacity-40">
        <div className="w-full h-2 bg-slate-50 rounded-sm" />
        <div className="w-full h-4 bg-slate-50 rounded-sm" />
        <div className="w-full h-3 bg-slate-50 rounded-sm" />
        <div className={`w-full h-5 ${sparkColor} rounded-sm opacity-80`} />
      </div>
    </div>
  );
}