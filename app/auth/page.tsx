"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
        setTimeout(() => router.push("/dashboard"), 500);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F3F9] flex flex-col items-center justify-center px-4 py-8 font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-xl ${
              toast.type === "success" ? "bg-emerald-600" : "bg-rose-500"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center w-full max-w-6xl lg:gap-20">
        {/* Left Panel - Branding */}
        <div className="flex-1 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition-colors group-hover:bg-[#10B981]">
              <ShieldCheck size={25} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Invoice Manager
            </span>
          </div>

          <h2 className="text-4xl font-black text-slate-900 leading-tight mb-4">
            Simplify your <span className="text-indigo-600">Compliance</span>{" "}
            workflow.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md mb-10">
            Automated invoice creation, real-time admin review, and
            FIRS-compliant submission tools.
          </p>
        </div>

        {/* Right Panel - Auth Card */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 w-full max-w-[440px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition-colors group-hover:bg-[#10B981]">
              <ShieldCheck size={25} />
            </div>
            <span className="text-xl font-black text-slate-900">
              Invoice Manager
            </span>
          </div>

          <div className="mb-8 text-center sm:text-left">
            <h3 className="text-2xl font-black text-slate-900">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {mode === "signin"
                ? "Enter your details to access your portal"
                : "Join us to start managing your invoices"}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="w-full h-12 border-2 border-slate-50 rounded-xl bg-slate-50 px-4 text-sm font-medium outline-none transition-all focus:border-indigo-600 focus:bg-white"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full h-12 border-2 rounded-xl bg-slate-50 px-4 text-sm font-medium outline-none transition-all focus:border-indigo-600 focus:bg-white ${
                  error && !email ? "border-rose-400" : "border-slate-50"
                }`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                className={`w-full h-12 border-2 rounded-xl bg-slate-50 px-4 text-sm font-medium outline-none transition-all focus:border-indigo-600 focus:bg-white ${
                  error && !password ? "border-rose-400" : "border-slate-50"
                }`}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-500 mt-3 text-center sm:text-left">
              {error}
            </p>
          )}

          <button
            onClick={() => handleAuth()}
            disabled={loading}
            className="w-full h-12 bg-slate-900 text-white rounded-xl text-sm font-bold mt-8 transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-50 shadow-lg shadow-slate-200"
          >
            {loading
              ? "Processing..."
              : mode === "signin"
                ? "Sign In to Dashboard"
                : "Get Started"}
          </button>

          <p className="mt-6 text-center text-sm font-medium text-slate-500">
            {mode === "signin" ? "New here?" : "Already have an account?"}
            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
              className="ml-1 font-bold text-indigo-600 hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in instead"}
            </button>
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Test Access
              </span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(["user", "admin", "sadmin"] as Role[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setMode("signin");
                    handleAuth(
                      QUICK_CREDS[role].email,
                      QUICK_CREDS[role].password,
                    );
                  }}
                  className="py-2.5 border border-slate-100 rounded-lg text-[9px] font-black uppercase text-slate-500 hover:border-indigo-600 hover:text-indigo-600 transition-all bg-white"
                >
                  {role === "sadmin" ? "S. Admin" : role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-using the icon component locally
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
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
