"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Folder,
  CreditCard,
  Layers,
  BarChart3,
  Settings,
  X,
  Menu,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
  username: string;
  onNewInvoiceClick?: () => void;
}

export default function DashboardLayout({
  children,
  username,
  onNewInvoiceClick,
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const navigateTo = (path: string) => {
    router.push(path);
    closeMobileSidebar();
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={16} />, path: "/dashboard" },
    { name: "Invoices", icon: <FileText size={16} />, path: "/dashboard/invoices" },
    { name: "Directory", icon: <Folder size={16} />, path: "/dashboard/directory" },
    { name: "Billing", icon: <CreditCard size={16} />, path: "/dashboard/billing" },
    { name: "Subscriptions", icon: <Layers size={16} />, path: "/dashboard/subscriptions" },
    { name: "Analytics", icon: <BarChart3 size={16} />, path: "/dashboard/analytics" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full p-5">
      <div className="space-y-6">
        {/* Logo Brand Frame */}
        <div className="flex items-center justify-between lg:justify-start gap-2.5 px-2">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo("/dashboard")}>
            <Image src="/logo.svg" alt="logo" width={128} height={128} priority />
          </div>
          <button
            onClick={closeMobileSidebar}
            className="p-1 text-slate-400 hover:text-slate-600 lg:hidden rounded-lg hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Identifier Box */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="truncate min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-800 truncate">{username || "Loading..."}</h4>
            <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-wider">Business Portal</p>
          </div>
        </div>

        {/* Navigation Route Groups */}
        <nav className="space-y-6 pt-2">
          <div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2.5 mb-2">Main Menu</p>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <SidebarLink
                  key={item.path}
                  icon={item.icon}
                  label={item.name}
                  active={pathname === item.path}
                  onClick={() => navigateTo(item.path)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2.5 mb-2">Preference</p>
            <div className="space-y-1">
              <SidebarLink
                icon={<Settings size={16} />}
                label="Settings"
                active={pathname === "/dashboard/settings"}
                onClick={() => navigateTo("/dashboard/settings")}
              />
            </div>
          </div>
        </nav>
      </div>

      <div className="text-[11px] text-slate-400 px-2 border-t border-slate-50 pt-4">
        v2.0.4 Redesign Platform
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex font-sans text-slate-900 selection:bg-emerald-100 overflow-x-hidden relative">
      {/* Permanent Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-slate-100 h-screen sticky top-0 flex-shrink-0 z-20">
        <SidebarContent />
      </aside>

      {/* Responsive Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileSidebar}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="absolute left-0 top-0 bottom-0 w-64 max-w-[80vw] bg-white border-r border-slate-100 shadow-xl"
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Core Main Scroll Wrapper Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden transition"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center lg:hidden gap-2">
              <div className="h-6 w-6 rounded bg-emerald-600 text-white flex items-center justify-center">
                <FileText size={12} />
              </div>
              <span className="font-bold text-sm tracking-tight text-slate-900">InvoiceMe</span>
            </div>
            <div className="hidden lg:block text-xs font-medium text-slate-400">
              System Operational Status: <span className="text-emerald-600 font-semibold">FIRS Framework Engaged</span>
            </div>
          </div>

          <button
            onClick={onNewInvoiceClick || (() => router.push("/dashboard/create"))}
            className="flex items-center gap-1.5 bg-emerald-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition active:scale-95 shadow-sm"
          >
            <Plus size={14} />{" "}
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </button>
        </header>

        <main className="p-4 sm:p-6 md:p-10 max-w-6xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all relative ${
        active
          ? "text-emerald-700 bg-emerald-50/60 font-bold"
          : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}