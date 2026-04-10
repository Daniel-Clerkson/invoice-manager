"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  FileText, 
  LayoutDashboard, 
  Plus, 
  LogOut, 
  Menu, 
  X, 
  Users, 
  ClipboardCheck, 
  ShieldCheck 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ userRole }: { userRole: "user" | "admin" | "superadmin" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Logic to determine navigation links based on role
  const getNavLinks = () => {
    switch (userRole) {
      case 'superadmin':
        return [
          { name: "Dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard },
          { name: "Review Invoices", href: "/superadmin/dashboard", icon: ClipboardCheck },
          { name: "Manage Users", href: "/admin/users", icon: Users },
        ];
      case 'admin':
        return [
          { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
          { name: "Review Invoices", href: "/admin/dashboard", icon: ClipboardCheck },
          { name: "Manage Users", href: "/admin/users", icon: Users },
        ];
      default: // 'user'
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Create Invoice", href: "/dashboard/create", icon: Plus },
        ];
    }
  };

  const navLinks = getNavLinks();

  // Logic to determine where the logo redirects
  const getHomeHref = () => {
    if (userRole === 'superadmin') return "/superadmin/dashboard";
    if (userRole === 'admin') return "/admin/dashboard";
    return "/dashboard";
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={getHomeHref()} className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white group-hover:scale-105 transition-transform">
              <FileText size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Invoice Manager</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  isActive(link.href) ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <link.icon size={16} /> {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              {userRole === 'superadmin' ? 'Super Admin' : userRole}
            </p>
            <p className="text-sm font-bold text-slate-700 leading-none">{userRole}</p>
          </div>
          
          <button 
            onClick={() => router.push("/")} 
            className="hidden md:flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-2 pb-4 pt-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`flex items-center gap-3 rounded-xl px-4 py-4 text-base font-bold transition-colors ${
                    isActive(link.href) ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-600"
                  }`}
                >
                  <link.icon size={20} /> {link.name}
                </Link>
              ))}
              <button 
                onClick={() => router.push("/")} 
                className="flex items-center gap-3 rounded-xl bg-rose-50 px-4 py-4 text-base font-bold text-rose-600 text-left"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}