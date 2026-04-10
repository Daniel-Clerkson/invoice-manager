"use client"
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Save, 
  Send, 
  FileText, 
  LayoutDashboard, 
  Plus, 
  LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

// --- Components ---

const AccordionSection = ({ 
  number, 
  title, 
  description, 
  children, 
  isOpen, 
  onToggle 
}: { 
  number: number; 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button 
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left transition-hover hover:bg-slate-50/50"
      >
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-900">{number}. {title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="border-t border-slate-100 p-6 pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputGroup = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">
      {label} {required && <span className="text-slate-400">*</span>}
    </label>
    {children}
  </div>
);

// --- Main Page ---

export default function CreateInvoice() {
  const [openSection, setOpenSection] = useState<number | null>(1);

  const toggleSection = (id: number) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    { id: 1, title: "Basic Invoice Information", desc: "Essential invoice details and metadata" },
    { id: 2, title: "Currency & Financial Info", desc: "Currency codes and financial references" },
    { id: 3, title: "Delivery & References", desc: "Order references and document links" },
    { id: 4, title: "Parties (Supplier & Customer)", desc: "Supplier and customer information" },
    { id: 5, title: "Payment Means & Charges", desc: "Payment methods and allowances/charges" },
    { id: 6, title: "Tax Information", desc: "Tax totals and subtotals" },
    { id: 7, title: "Legal Monetary Total", desc: "Invoice totals and payable amount" },
    { id: 8, title: "Invoice Line Items", desc: "Products or services being invoiced" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar userRole="user" />

      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        {/* Header with Actions */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Create Invoice</h1>
            <p className="mt-1 text-slate-500">Fill in the invoice details below</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
              <Save size={18} /> Save Draft
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition-all">
              <Send size={18} /> Submit Invoice
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="mx-auto max-w-6xl">
          <AccordionSection 
            number={1} 
            title={sections[0].title} 
            description={sections[0].desc}
            isOpen={openSection === 1}
            onToggle={() => toggleSection(1)}
          >
            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
              <InputGroup label="Business ID" required>
                <input type="text" placeholder="UUID format" className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
              </InputGroup>
              <InputGroup label="IRN (Invoice Reference Number)" required>
                <input type="text" defaultValue="IRN-1775834878724" className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
              </InputGroup>
              <InputGroup label="Issue Date" required>
                <input type="date" defaultValue="2026-04-10" className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
              </InputGroup>
              <InputGroup label="Due Date">
                <input type="date" className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
              </InputGroup>
              <InputGroup label="Issue Time">
                <input type="time" className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
              </InputGroup>
              <InputGroup label="Invoice Type Code" required>
                <select className="w-full appearance-none rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all">
                  <option>Select Code</option>
                </select>
              </InputGroup>
              <InputGroup label="Invoice Kind" required>
                <select className="w-full appearance-none rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all">
                  <option>B2B (Business to Business)</option>
                  <option>B2C (Business to Consumer)</option>
                </select>
              </InputGroup>
              <InputGroup label="Payment Status">
                <select className="w-full appearance-none rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all">
                  <option>Pending</option>
                  <option>Paid</option>
                </select>
              </InputGroup>
              <div className="md:col-span-2">
                <InputGroup label="Note (Encrypted before submission)">
                  <textarea 
                    rows={4} 
                    placeholder="Additional notes..." 
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                  />
                </InputGroup>
              </div>
            </div>
          </AccordionSection>

          {/* Render remaining collapsed sections */}
          {sections.slice(1).map((section) => (
            <AccordionSection
              key={section.id}
              number={section.id}
              title={section.title}
              description={section.desc}
              isOpen={openSection === section.id}
              onToggle={() => toggleSection(section.id)}
            >
              <div className="py-10 text-center text-slate-400">
                Form fields for {section.title.toLowerCase()}...
              </div>
            </AccordionSection>
          ))}

          {/* Sticky Footer Actions for Mobile */}
          <div className="mt-8 flex justify-end gap-3 sm:hidden">
            <button className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold">Save</button>
            <button className="flex-1 rounded-lg bg-[#0F172A] px-4 py-3 text-sm font-bold text-white">Submit</button>
          </div>
        </div>
      </main>
    </div>
  );
}