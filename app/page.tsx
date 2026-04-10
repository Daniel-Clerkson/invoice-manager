"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Role = "user" | "admin" | "sadmin";

const MOCK_USERS = [
  { email: "user@business.com", password: "user123", role: "user" as Role, name: "John User" },
  { email: "admin@business.com", password: "admin123", role: "admin" as Role, name: "Jane Admin" },
  { email: "sadmin@business.com", password: "super123", role: "sadmin" as Role, name: "Boss Super" },
];

const QUICK_CREDS: Record<Role, { email: string; password: string }> = {
  user: { email: "user@business.com", password: "user123" },
  admin: { email: "admin@business.com", password: "admin123" },
  sadmin: { email: "sadmin@business.com", password: "super123" },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "" }>({
    message: "",
    type: "",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2500);
  };

  const handleSignIn = async (overrideEmail?: string, overridePassword?: string) => {
    const resolvedEmail = overrideEmail ?? email;
    const resolvedPassword = overridePassword ?? password;

    setError("");
    if (!resolvedEmail || !resolvedPassword) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const user = MOCK_USERS.find((u) => u.email === resolvedEmail && u.password === resolvedPassword);

    if (user) {
      showToast(`Welcome back, ${user.name}!`, "success");
      setTimeout(() => {
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        }
        else if(user.role === "sadmin"){
          router.push("/sadmin/dashboard")
        }
         else {
          router.push("/dashboard");
        }
      }, 1000);
    } else {
      setLoading(false);
      setError("Invalid email or password.");
      showToast("Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F9] flex flex-col items-center justify-center px-4 py-8 font-sans">
      {/* Toast Notification */}
      {toast.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-xl ${
            toast.type === "success" ? "bg-emerald-600" : "bg-rose-500"
          }`}
        >
          {toast.message}
        </motion.div>
      )}

      {/* Main Container - Adjusted for mobile centering */}
      <div className="flex items-center justify-center w-full max-w-6xl lg:gap-20">
        
        {/* Left Panel - Branding (Hidden on mobile/tablet) */}
        <div className="flex-1 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="10" rx="2" fill="white" opacity="0.9" />
                <rect x="13" y="3" width="8" height="6" rx="2" fill="white" opacity="0.5" />
                <rect x="13" y="11" width="8" height="10" rx="2" fill="white" opacity="0.7" />
                <rect x="3" y="15" width="8" height="6" rx="2" fill="white" opacity="0.6" />
              </svg>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Invoice Manager</span>
          </div>

          <h2 className="text-4xl font-black text-slate-900 leading-tight mb-4">
            Simplify your <span className="text-indigo-600">Compliance</span> workflow.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md mb-10">
            Automated invoice creation, real-time admin review, and FIRS-compliant submission tools.
          </p>
        </div>

        {/* Right Panel - Login Card (Centered and Responsive) */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 w-full max-w-[440px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          
          {/* Logo visible only on mobile/tablet */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black">IM</span>
            </div>
            <span className="text-xl font-black text-slate-900">Invoice Manager</span>
          </div>

          <div className="mb-8 text-center sm:text-left">
            <h3 className="text-2xl font-black text-slate-900">Sign In</h3>
            <p className="text-slate-400 text-sm mt-1">Enter your details to access your portal</p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full h-12 border-2 rounded-xl bg-slate-50 px-4 text-sm font-medium outline-none transition-all focus:border-indigo-600 focus:bg-white ${
                  error ? "border-rose-400" : "border-slate-50"
                }`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className={`w-full h-12 border-2 rounded-xl bg-slate-50 px-4 text-sm font-medium outline-none transition-all focus:border-indigo-600 focus:bg-white ${
                  error ? "border-rose-400" : "border-slate-50"
                }`}
              />
            </div>
          </div>

          {error && <p className="text-xs font-bold text-rose-500 mt-3 text-center sm:text-left">{error}</p>}

          <button
            onClick={() => handleSignIn()}
            disabled={loading}
            className="w-full h-12 bg-slate-900 text-white rounded-xl text-sm font-bold mt-8 transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-50 shadow-lg shadow-slate-200"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>

          <div className="mt-8 sm:mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Test Access</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {(["user", "admin", "sadmin"] as Role[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setEmail(QUICK_CREDS[role].email);
                    setPassword(QUICK_CREDS[role].password);
                    handleSignIn(QUICK_CREDS[role].email, QUICK_CREDS[role].password);
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