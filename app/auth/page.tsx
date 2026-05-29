"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Role = "user" | "admin" | "sadmin";

const QUICK_CREDS: Record<Role, { email: string; password: string }> = {
  user: { email: "user@business.com", password: "user123" },
  admin: { email: "admin@business.com", password: "admin123" },
  sadmin: { email: "sadmin@business.com", password: "super123" },
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2500);
  };

  const handleAuth = async (
    overrideEmail?: string,
    overridePassword?: string,
  ) => {
    const emailVal = overrideEmail ?? email;
    const passwordVal = overridePassword ?? password;

    setError("");
    if (!emailVal || !passwordVal) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: emailVal,
        password: passwordVal,
        options: {
          data: { name: name },
        },
      });
      if (error) {
        setError(error.message);
        showToast("Signup failed", "error");
        console.log(error.message);
      } else {
        showToast("Account created! Login to your account.", "success");
        router.push("/auth");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailVal,
        password: passwordVal,
      });

      if (error) {
        setError(error.message);
        showToast("Signup failed", "error");
      } else {
        showToast("Welcome Back.", "success");
        setMode("signin");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setTimeout(() => router.push("/dashboard"), 500);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col md:flex-row font-sans text-slate-900 overflow-x-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-xl border border-white/10 backdrop-blur-md ${
              toast.type === "success" ? "bg-emerald-600/95" : "bg-rose-500/95"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Column: Form Section */}
      <div className="w-full md:w-[55%] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-20 overflow-y-auto min-h-screen">
        
        {/* Header Branding */}
        <div className="flex items-center gap-2 mb-8 md:mb-0">
          <Image src={"/logo.svg"} width={128} height={128} alt="Logo" />
        </div>

        {/* Center Auth Card */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome to InvoiceMe
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Get paid with ease and stay tax compliant
            </p>
          </div>

          {/* Segmented Dynamic Controls */}
          <div className="bg-slate-100 p-1 rounded-xl flex w-full relative mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError("");
              }}
              className={`flex-1 text-center py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors ${
                mode === "signin" ? "text-emerald-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {mode === "signin" && (
                <motion.div 
                  layoutId="activeAuthTab" 
                  className="absolute inset-0 bg-white shadow-sm rounded-lg -z-10" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 text-center py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors ${
                mode === "signup" ? "text-emerald-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {mode === "signup" && (
                <motion.div 
                  layoutId="activeAuthTab" 
                  className="absolute inset-0 bg-white shadow-sm rounded-lg -z-10" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Sign Up
            </button>
          </div>

          {/* Functional Inputs Form */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@mycompany.com"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                  error && !email ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                {mode === "signin" && (
                  <button type="button" className="text-xs font-semibold text-emerald-600 hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signin" ? "••••••••" : "Create password"}
                  onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                  className={`w-full pl-3.5 pr-12 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    error && !password ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xs font-bold text-rose-500 mt-3"
            >
              {error}
            </motion.p>
          )}

          {/* Core Action Button */}
          <button
            onClick={() => handleAuth()}
            disabled={loading}
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold mt-6 transition-all active:scale-[0.99] disabled:opacity-50 shadow-sm"
          >
            {loading ? "Processing..." : mode === "signin" ? "Sign in to your business account" : "Continue to Business Onboarding"}
          </button>

          {/* Test Sandbox Utility */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Quick Test Credentials
              </span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(["user", "admin", "sadmin"] as Role[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setMode("signin");
                    handleAuth(QUICK_CREDS[role].email, QUICK_CREDS[role].password);
                  }}
                  className="py-2 border border-slate-200 hover:border-emerald-500 rounded-lg text-[10px] font-bold uppercase text-slate-500 hover:text-emerald-600 transition-all bg-white shadow-sm"
                >
                  {role === "sadmin" ? "S. Admin" : role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Global Structural Footer */}
        <div className="text-xs text-slate-400 mt-8 md:mt-0 pt-4 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1">
          <span>&copy; {new Date().getFullYear()} InvoiceMe Inc.</span>
          <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600 transition">Terms & Conditions</a>
        </div>
      </div>

      {/* Right Column: Visual Graphic Banner */}
      <div className="hidden md:flex md:w-[45%] bg-[#0B3C1D] relative overflow-hidden flex-col justify-between p-12 lg:p-16 text-white select-none">
        
        {/* Clean Line Vector Layer */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,40 Q30,10 60,80 T100,30" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <path d="M0,70 Q40,30 80,90 T100,50" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </svg>
        </div>

        {/* Scaled Composition Viewport */}
        <div className="relative w-full h-[45%] flex items-center justify-center mt-10">
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80" 
              alt="Business Ecosystem context filler" 
              fill
              priority
              className="object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C1D]/50 via-transparent to-transparent" />
          </div>

          {/* Floating Dashboard Unit */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-1/4 left-6 right-6 backdrop-blur-md bg-white/95 border border-white/30 shadow-xl rounded-xl p-4 text-slate-900 max-w-sm mx-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invoices</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+2.15%</span>
            </div>
            
            <div className="text-xl font-bold tracking-tight text-slate-900 mb-3">
              ₦25.5M
            </div>

            <div className="flex items-end gap-1 h-10 px-0.5">
              {[35, 60, 40, 75, 90, 50, 25, 40, 55, 35].map((val, i) => (
                <div 
                  key={i} 
                  style={{ height: `${val}%` }} 
                  className={`w-full rounded-sm transition-all duration-300 ${i === 4 ? 'bg-emerald-600' : 'bg-slate-200'}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
              <span>Set Goals</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </motion.div>
        </div>

        {/* Informative Display Text block */}
        <div className="space-y-3 max-w-sm">
          <h2 className="text-2xl font-bold tracking-tight leading-snug">
            Innovate with FIRS Merchant Buyers Solution
          </h2>
          <p className="text-emerald-100/70 text-xs leading-relaxed font-normal">
            Tax compliance and e-invoicing just got simpler. Automated verification channels built to align effortlessly with national regulatory standards.
          </p>
        </div>

      </div>
    </div>
  );
}

function ShieldCheck({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}