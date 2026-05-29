"use client";
import React, { useEffect, useState } from "react";
import {
  Save,
  Send,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateInvoice() {
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });
  const [lineItems, setLineItems] = useState([
    { id: 1, desc: "", qty: 1, price: 0, tax: 7.5 },
  ]);
  const [formData, setFormData] = useState({
    supplier_name: "",
    invoice_type: "Standard Invoice (388)",
  });

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
      } else {
        setAuthChecked(true);
      }
    }
    checkAuth();
  }, [router]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addLineItem = () =>
    setLineItems([
      ...lineItems,
      { id: Date.now(), desc: "", qty: 1, price: 0, tax: 7.5 },
    ]);
  const removeLineItem = (id: number) =>
    setLineItems(lineItems.filter((item) => item.id !== id));

  const submitInvoice = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      showToast("You must be logged in to submit an invoice.", "error");
      setLoading(false);
      return;
    }

    const payload = {
      irn: "IRN-" + Date.now(),
      issue_date: new Date().toISOString().split("T")[0],
      invoice_type_code: "381",
      supplier_name: formData.supplier_name,
      total_amount: 50000,
      user_id: user.id,
    };

    const res = await fetch("/api/invoices/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    try {
      if (res.ok) {
        showToast("Invoice submitted with FIRS schema structure!", "success");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        showToast("Failed to save.", "error");
      }
    } catch (error) {
      throw error;
    }

    setLoading(false);
  };

  if (!authChecked) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <p className="font-bold text-slate-400">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1E293B]">
      <Navbar userRole="user" username="User" />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-xl ${
              toast.type === "success" ? "bg-[#10B981]" : "bg-rose-500"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-Header Navigation */}
      <div className="border-b border-slate-100 bg-white px-8 py-4 flex items-center gap-3">
        <span className="text-slate-400 font-medium cursor-pointer" onClick={() => router.back()}>←</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">InvoiceMe</span>
          <span className="text-xs font-medium text-slate-400">Official Supplier Portal</span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto p-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
            <h1 className="text-xl font-bold text-slate-900">Generate an Invoice to Customer</h1>
            <button className="text-slate-400 hover:text-slate-600 text-lg">×</button>
          </div>

          {/* Top Metadata Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Logo Box */}
            <div className="border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 min-h-[160px]">
              <div className="w-10 h-10 bg-[#00875A]/10 rounded-xl flex items-center justify-center text-[#00875A] mb-3">
                <Upload size={18} />
              </div>
              <p className="text-xs text-slate-400 font-medium mb-3">Your logo will be displayed here<br/>(128 × 128)</p>
              <button className="text-xs font-bold text-[#00875A] bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-lg hover:bg-slate-50 transition-all">
                Add Logo
              </button>
            </div>

            {/* Fields Right */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Customer <span className="text-rose-500">*</span></label>
                <select className="form-select-custom">
                  <option value="">Select or search customers...</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Invoice Type <span className="text-rose-500">*</span></label>
                <select 
                  name="invoice_type" 
                  className="form-select-custom"
                  value={formData.invoice_type}
                  onChange={handleInputChange}
                >
                  <option>Standard Invoice (388)</option>
                  <option>Credit Note (381)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Invoice Date <span className="text-rose-500">*</span></label>
                <input type="date" className="form-input-flat" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Due Date <span className="text-rose-500">*</span></label>
                <input type="date" className="form-input-flat" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Currency <span className="text-rose-500">*</span></label>
                <select className="form-select-custom">
                  <option>Nigerian Naira</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Payment Means <span className="text-rose-500">*</span></label>
                <select className="form-select-custom">
                  <option>--Select Payment Means--</option>
                  <option>Bank Transfer (42)</option>
                  <option>Credit Card (48)</option>
                  <option>Cash (10)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <button className="text-xs font-bold text-[#00875A] border border-[#00875A]/20 bg-[#00875A]/5 px-4 py-2 rounded-lg hover:bg-[#00875A]/10 transition-all">
              + Add extra fields
            </button>
          </div>

          {/* Split Parties Info Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-8 mb-8">
            {/* Bill To */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Bill To</h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Company Name <span className="text-rose-500">*</span></label>
                <input type="text" className="form-input-flat" placeholder="Enter Company Name" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Company Email Address <span className="text-rose-500">*</span></label>
                <input type="email" className="form-input-flat" placeholder="Type email address" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Billing Address <span className="text-rose-500">*</span></label>
                <textarea className="form-textarea-flat" rows={2} placeholder="Type address information" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Contact Person Name <span className="text-rose-500">*</span></label>
                <input type="text" className="form-input-flat" placeholder="Type Contact Person Name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Branch or Division</label>
                  <select className="form-select-custom">
                    <option>--Select Branch or Division--</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Contact Person's Departments</label>
                  <select className="form-select-custom">
                    <option>--Select Contact Person's Department--</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Invoice Purpose <span className="text-rose-500">*</span></label>
                <textarea className="form-textarea-flat" rows={2} placeholder="Type detailed purchase information" />
              </div>
            </div>

            {/* Your Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Your Details</h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Company Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  name="supplier_name"
                  className="form-input-flat bg-slate-50 font-semibold" 
                  value={formData.supplier_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Email Address <span className="text-rose-500">*</span></label>
                <input type="email" className="form-input-flat bg-slate-50 text-slate-500" value="princejosephpj56@gmail.com" readOnly />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Phone Number <span className="text-rose-500">*</span></label>
                <input type="text" className="form-input-flat bg-slate-50 text-slate-500" value="08162224407" readOnly />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Shipping Address <span className="text-rose-500">*</span></label>
                <textarea className="form-textarea-flat bg-slate-50 text-slate-500" rows={2} value="NO.65 AHMADU BELLO WAY, , , Nigeria," readOnly />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="border-t border-slate-100 pt-8 mb-8">
            <h3 className="text-base font-bold text-slate-900 mb-4">Items</h3>
            
            <div className="flex gap-3 mb-6">
              <button 
                onClick={addLineItem}
                className="text-xs font-bold bg-[#00875A] text-white px-4 py-2 rounded-lg hover:bg-[#006F49] transition-all flex items-center gap-1.5"
              >
                <Plus size={14} /> Add Item
              </button>
              <button className="text-xs font-bold bg-[#0A2540] text-white px-4 py-2 rounded-lg hover:bg-[#051424] transition-all flex items-center gap-1.5">
                <Upload size={14} /> Upload Bulk Items
              </button>
            </div>

            {/* Table Dynamic Layout */}
            <div className="space-y-4">
              {lineItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50/50 p-4 rounded-xl border border-slate-100 relative group">
                  <div className="md:col-span-6 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 md:hidden">Description</label>
                    <input type="text" className="form-input-flat bg-white" placeholder="Item description..." />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 md:hidden">Qty</label>
                    <input type="number" className="form-input-flat bg-white" placeholder="1" />
                  </div>
                  <div className="md:col-span-3 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 md:hidden">Unit Price</label>
                    <input type="number" className="form-input-flat bg-white" placeholder="0.00" />
                  </div>
                  <div className="md:col-span-1 flex justify-center pb-2">
                    <button 
                      onClick={() => removeLineItem(item.id)}
                      className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Calculations Blocks */}
            <div className="flex flex-col items-end gap-3 mt-8 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-10 w-full max-w-sm justify-between">
                <span className="text-sm font-medium text-slate-500">Subtotal</span>
                <span className="text-sm font-bold text-slate-800 bg-slate-100/80 px-4 py-1.5 rounded-lg min-w-[120px] text-right">NGN 0.00</span>
              </div>
              <div className="flex items-center gap-10 w-full max-w-sm justify-between">
                <span className="text-sm font-medium text-slate-500">Total Tax</span>
                <span className="text-sm font-bold text-slate-800 bg-slate-100/80 px-4 py-1.5 rounded-lg min-w-[120px] text-right">NGN 0.00</span>
              </div>
              <div className="flex items-center gap-10 w-full max-w-sm justify-between">
                <span className="text-sm font-bold text-slate-900">Total (NGN)</span>
                <span className="text-sm font-bold text-slate-900 border border-slate-200 px-4 py-1.5 rounded-lg min-w-[120px] text-right">NGN 0.00</span>
              </div>
            </div>
          </div>

          {/* Bottom Optional Context Fields */}
          <div className="space-y-5 border-t border-slate-100 pt-8 mb-8">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Payment Note <span className="text-rose-500">*</span></label>
              <textarea className="form-textarea-flat" rows={3} placeholder="Type something.." />
            </div>

            <button className="text-xs font-bold text-[#00875A] border border-[#00875A]/20 bg-[#00875A]/5 px-4 py-2 rounded-lg hover:bg-[#00875A]/10 transition-all">
              Add extra field
            </button>

            {/* Signature Area */}
            <div className="flex flex-col gap-1.5 max-w-xs">
              <label className="text-xs font-bold text-slate-700">Authorized Signature</label>
              <div className="border border-dashed border-slate-200 rounded-xl p-6 flex items-center justify-center bg-slate-50/50 min-h-[100px]">
                <button className="text-xs font-bold text-[#00875A] bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-lg hover:bg-slate-50 transition-all">
                  Add a signature
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 max-w-sm">
              <label className="text-xs font-bold text-slate-700">Name of Authorizer <span className="text-rose-500">*</span></label>
              <input type="text" className="form-input-flat" placeholder="Enter name of authorizer" />
            </div>
          </div>

          {/* Compliance Info Badge & CTA Actions Panel */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-slate-100 pt-8 gap-6">
            
            {/* NRS Stamp Box */}
            <div className="flex items-center gap-3">
              <div className="bg-[#1E293B] text-white font-black px-3 py-1 rounded text-base tracking-tighter flex items-center gap-1.5">
                NRS <span className="text-[9px] text-slate-400 font-normal leading-3 border-l border-slate-600 pl-1.5 uppercase">Nigeria<br/>Revenue<br/>Service</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium max-w-[180px] leading-tight">
                This Invoice will be Digitally Signed By NRS
              </p>
            </div>

            {/* Submissions Control Panel */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button className="text-xs font-bold text-slate-600 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all">
                Save as Draft
              </button>
              
              {loading ? (
                <button className="text-xs font-bold bg-[#00875A]/60 text-white px-8 py-3 rounded-xl cursor-not-allowed" disabled>
                  Proceeding...
                </button>
              ) : (
                <button 
                  onClick={submitInvoice}
                  className="text-xs font-bold bg-[#00875A] text-white px-8 py-3 rounded-xl hover:bg-[#006F49] transition-all shadow-md shadow-[#00875A]/10"
                >
                  Proceed
                </button>
              )}
            </div>

          </div>

        </div>
      </main>

      <style jsx global>{`
        .form-input-flat {
          width: 100%;
          height: 2.75rem;
          background: #white;
          border: 1px solid #E2E8F0;
          border-radius: 0.5rem;
          padding: 0 1rem;
          font-size: 0.85rem;
          color: #1E293B;
          outline: none;
          transition: all 0.2s;
        }
        .form-input-flat:focus {
          border-color: #00875A;
          box-shadow: 0 0 0 3px rgba(0, 135, 90, 0.05);
        }
        .form-textarea-flat {
          width: 100%;
          background: #white;
          border: 1px solid #E2E8F0;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: #1E293B;
          outline: none;
          resize: none;
          transition: all 0.2s;
        }
        .form-textarea-flat:focus {
          border-color: #00875A;
          box-shadow: 0 0 0 3px rgba(0, 135, 90, 0.05);
        }
        .form-select-custom {
          width: 100%;
          height: 2.75rem;
          background: #white;
          border: 1px solid #E2E8F0;
          border-radius: 0.5rem;
          padding: 0 1rem;
          font-size: 0.85rem;
          color: #4A5568;
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23718096'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
        }
        .form-select-custom:focus {
          border-color: #00875A;
          box-shadow: 0 0 0 3px rgba(0, 135, 90, 0.05);
        }
      `}</style>
    </div>
  );
}