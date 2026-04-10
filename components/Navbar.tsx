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
  ShieldCheck,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  userRole: "user" | "admin" | "sadmin";
  onOpenReview?: () => void;
}

export default function Navbar({ userRole, onOpenReview }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const getNavLinks = () => {
    switch (userRole) {
      case "sadmin":
        return [
          {
            name: "Dashboard",
            href: "/sadmin/dashboard",
            icon: LayoutDashboard,
            type: "link",
          },
          {
            name: "Manage Users",
            href: "/sadmin/users",
            icon: Users,
            type: "link",
          }, 
          {
            name: "Review Queue",
            onClick: onOpenReview,
            icon: ClipboardCheck,
            type: "button",
          },
        ];
      case "admin":
        return [
          {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            type: "link",
          },
          {
            name: "Review Queue",
            onClick: onOpenReview,
            icon: ClipboardCheck,
            type: "button",
          },
          {
            name: "Manage Users",
            href: "/admin/users",
            icon: Users,
            type: "link",
          },
        ];
      default: // 'user'
        return [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            type: "link",
          },
          {
            name: "Create Invoice",
            href: "/dashboard/create",
            icon: Plus,
            type: "link",
          },
        ];
    }
  };

  const navLinks = getNavLinks();

  const getHomeHref = () => {
    if (userRole === "sadmin") return "/sadmin/dashboard";
    if (userRole === "admin") return "/admin/dashboard";
    return "/dashboard";
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={getHomeHref()} className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white group-hover:rotate-6 transition-transform">
              <FileText size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Invoice Manager
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.type === "link" ? (
                <Link
                  key={link.name}
                  href={link.href!}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition-all ${
                    isActive(link.href!)
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <link.icon size={16} /> {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
                >
                  <link.icon size={16} /> {link.name}
                </button>
              ),
            )}
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p
              className={`text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1 ${userRole === "sadmin" ? "text-indigo-600" : "text-slate-400"}`}
            >
              {userRole === "sadmin" ? "System Root" : userRole}
            </p>
            <p className="text-sm font-bold text-slate-700 leading-none">
              {userRole}
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="hidden md:flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 md:hidden"
          >
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
            <div className="flex flex-col gap-2 pb-6 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.type === "link") router.push(link.href!);
                    else link.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 rounded-xl px-4 py-4 text-base font-black transition-all ${
                    link.type === "link" && isActive(link.href!)
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  <link.icon size={20} /> {link.name}
                </button>
              ))}
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-black bg-rose-50 text-rose-600"
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
