"use client"
import React, { useState } from 'react';
import { 
  ChevronDown, ChevronUp, Save, Send, Plus, Trash2, 
  Building2, CreditCard, Receipt, Truck, Banknote, ShieldCheck, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

// --- Reusable UI Components ---

const AccordionSection = ({ number, title, description, children, isOpen, onToggle }: any) => (
  <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <button onClick={onToggle} className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-slate-900">{number}. {title}</h3>
        <p className="text-sm text-slate-400 font-medium">{description}</p>
      </div>
      {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
          <div className="border-t border-slate-100 p-8 pt-6">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const InputGroup = ({ label, required, children }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
  </div>
);

export default function CreateInvoice() {
  const [openSection, setOpenSection] = useState<number | null>(1);
  const [lineItems, setLineItems] = useState([{ id: 1, desc: '', qty: 1, price: 0, tax: 7.5 }]);

  // Fixed Toggle Logic: Closes if already open
  const handleToggle = (id: number) => {
    setOpenSection(prev => prev === id ? null : id);
  };

  const addLineItem = () => setLineItems([...lineItems, { id: Date.now(), desc: '', qty: 1, price: 0, tax: 7.5 }]);
  const removeLineItem = (id: number) => setLineItems(lineItems.filter(item => item.id !== id));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar userRole="user" />

      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Create Invoice</h1>
            <p className="text-slate-500 font-medium mt-1">FIRS Compliance Gateway — 2026 Standards</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="form-btn-secondary"><Save size={18} /> Save Draft</button>
            <button className="form-btn-primary"><Send size={18} /> Submit Invoice</button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          
          {/* 1. Basic Invoice Information */}
          <AccordionSection number={1} title="Basic Invoice Information" description="Essential invoice details and metadata" isOpen={openSection === 1} onToggle={() => handleToggle(1)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="IRN" required><input type="text" defaultValue="IRN-1775834878724" className="form-input-custom" disabled /></InputGroup>
              <InputGroup label="Issue Date" required><input type="date" className="form-input-custom" /></InputGroup>
              <InputGroup label="Invoice Type" required>
                <select className="form-input-custom"><option>Standard Invoice (388)</option><option>Credit Note (381)</option></select>
              </InputGroup>
              <InputGroup label="Invoice Kind" required>
                <select className="form-input-custom"><option>B2B (Business to Business)</option><option>B2C (Business to Consumer)</option></select>
              </InputGroup>
            </div>
          </AccordionSection>

          {/* 2. Currency & Financial Info */}
          <AccordionSection number={2} title="Currency & Financial Info" description="Currency codes and financial references" isOpen={openSection === 2} onToggle={() => handleToggle(2)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Document Currency" required><select className="form-input-custom"><option>NGN (Nigerian Naira)</option></select></InputGroup>
              <InputGroup label="Tax Currency" required><select className="form-input-custom"><option>NGN (Nigerian Naira)</option></select></InputGroup>
              <InputGroup label="Accounting Cost"><input type="number" className="form-input-custom" placeholder="0" /></InputGroup>
              <InputGroup label="Buyer Reference"><input type="text" className="form-input-custom" placeholder="REF-001" /></InputGroup>
            </div>
          </AccordionSection>

          {/* 3. Delivery & References */}
          <AccordionSection number={3} title="Delivery & References" description="Order references and document links" isOpen={openSection === 3} onToggle={() => handleToggle(3)}>
            <div className="space-y-4">
              <InputGroup label="Order Reference"><input type="text" className="form-input-custom" placeholder="PO-12345" /></InputGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">Billing References</span>
                  <button className="text-[10px] font-bold text-indigo-600">+ Add</button>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">Dispatch References</span>
                  <button className="text-[10px] font-bold text-indigo-600">+ Add</button>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* 4. Parties (Supplier & Customer) */}
          <AccordionSection number={4} title="Parties (Supplier & Customer)" description="Mandatory identity and contact details" isOpen={openSection === 4} onToggle={() => handleToggle(4)}>
            <div className="space-y-6">
                <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-sm"><Building2 size={14} className="text-indigo-600"/> Supplier Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Name" required><input type="text" className="form-input-custom" /></InputGroup>
                        <InputGroup label="TIN" required><input type="text" className="form-input-custom" /></InputGroup>
                        <InputGroup label="Street"><input type="text" className="form-input-custom" /></InputGroup>
                        <InputGroup label="City"><input type="text" className="form-input-custom" /></InputGroup>
                    </div>
                </div>
                <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-sm"><MapPin size={14} className="text-indigo-600"/> Customer Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Name" required><input type="text" className="form-input-custom" /></InputGroup>
                        <InputGroup label="TIN"><input type="text" className="form-input-custom" /></InputGroup>
                    </div>
                </div>
            </div>
          </AccordionSection>

          {/* 5. Payment Means & Charges */}
          <AccordionSection number={5} title="Payment Means & Charges" description="Payment methods and allowances/charges" isOpen={openSection === 5} onToggle={() => handleToggle(5)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Payment Means" required>
                <select className="form-input-custom">
                  <option>Bank Transfer (42)</option>
                  <option>Credit Card (48)</option>
                  <option>Cash (10)</option>
                </select>
              </InputGroup>
              <InputGroup label="Allowance / Charge Amount">
                <input type="number" placeholder="0.00" className="form-input-custom" />
              </InputGroup>
            </div>
          </AccordionSection>

          {/* 6. Tax Information */}
          <AccordionSection number={6} title="Tax Information" description="Tax totals and subtotals" isOpen={openSection === 6} onToggle={() => handleToggle(6)}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputGroup label="Taxable Amt"><input type="number" className="form-input-custom" /></InputGroup>
              <InputGroup label="Tax Amt"><input type="number" className="form-input-custom" /></InputGroup>
              <InputGroup label="Cat ID"><input type="text" defaultValue="S" className="form-input-custom" /></InputGroup>
              <InputGroup label="Percent (%)"><input type="number" defaultValue={7.5} className="form-input-custom" /></InputGroup>
            </div>
          </AccordionSection>

          {/* 7. Legal Monetary Total */}
          <AccordionSection number={7} title="Legal Monetary Total" description="Invoice totals and payable amount" isOpen={openSection === 7} onToggle={() => handleToggle(7)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-900 rounded-3xl text-white">
              <InputGroup label="Line Extension"><div className="text-2xl font-bold">₦ 0.00</div></InputGroup>
              <InputGroup label="Tax Exclusive"><div className="text-2xl font-bold">₦ 0.00</div></InputGroup>
              <InputGroup label="Tax Inclusive"><div className="text-2xl font-bold">₦ 0.00</div></InputGroup>
              <InputGroup label="Payable Amount"><div className="text-4xl font-black text-indigo-400">₦ 0.00</div></InputGroup>
            </div>
          </AccordionSection>

          {/* 8. Invoice Line Items */}
          <AccordionSection number={8} title="Invoice Line Items" description="Products or services being invoiced" isOpen={openSection === 8} onToggle={() => handleToggle(8)}>
            <div className="space-y-4">
              {lineItems.map((item) => (
                <div key={item.id} className="p-6 border border-slate-100 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 relative group">
                   <div className="md:col-span-2"><InputGroup label="Description" required><input type="text" className="form-input-custom" /></InputGroup></div>
                   <InputGroup label="Qty" required><input type="number" className="form-input-custom" /></InputGroup>
                   <InputGroup label="Unit Price" required><input type="number" className="form-input-custom" /></InputGroup>
                   <button onClick={() => removeLineItem(item.id)} className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                </div>
              ))}
              <button onClick={addLineItem} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl font-bold text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                <Plus size={18} /> Add New Line Item
              </button>
            </div>
          </AccordionSection>

        </div>
      </main>

      <style jsx global>{`
        .form-input-custom {
          width: 100%; height: 3.25rem; background: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 1rem;
          padding: 0 1.25rem; font-size: 0.875rem; font-weight: 600; color: #1E293B; outline: none; transition: all 0.2s;
        }
        .form-input-custom:focus { background: white; border-color: #6366F1; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.05); }
        .form-btn-primary {
          display: flex; align-items: center; gap: 0.5rem; background: #0F172A; color: white; padding: 0.75rem 1.75rem;
          border-radius: 0.85rem; font-weight: 700; font-size: 0.875rem; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1);
        }
        .form-btn-primary:hover { background: #4F46E5; transform: translateY(-1px); }
        .form-btn-secondary {
          display: flex; align-items: center; gap: 0.5rem; background: white; color: #475569; padding: 0.75rem 1.75rem;
          border-radius: 0.85rem; font-weight: 700; font-size: 0.875rem; border: 1px solid #E2E8F0; transition: all 0.2s;
        }
        .form-btn-secondary:hover { background: #F8FAFC; border-color: #CBD5E1; }
      `}</style>
    </div>
  );
}