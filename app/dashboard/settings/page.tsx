"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Sliders,
  Shield,
  Cpu,
  Save,
  Building,
  Mail,
  UserCheck,
  Lock,
  Smartphone,
  Globe,
  Loader2,
  Check,
  HelpCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/DashboardLayout";

type SettingsTab = "profile" | "preferences" | "security" | "integrations";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form States
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  // Preference Form States
  const [timezone, setTimezone] = useState("Africa/Lagos");
  const [currency, setCurrency] = useState("NGN");
  const [marketingEmails, setMarketingEmails] = useState(true);

  useEffect(() => {
    async function fetchSettingsData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/");
          return;
        }

        setUserId(user.id);
        setEmail(user.email || "");

        // Fetch user profile from Supabase table or custom /api/profile endpoint
        const { data, error } = await supabase
          .from("profiles")
          .select("username, company_name")
          .eq("id", user.id)
          .single();

        if (data) {
          setUsername(data.username || "");
          setCompanyName(data.company_name || "OFFICE BOX IT LIMITED");
        }
      } catch (err) {
        console.error("Failed to load settings from API:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettingsData();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      // Direct update through Supabase profile system
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          company_name: companyName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error committing settings mutations:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout username={username || "User"}>
      
      {/* Settings Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-[#111A3E] tracking-tight">Platform Configuration</h1>
          <p className="text-xs text-slate-400 font-medium">Update account parameters, identity metadata controls, localization configurations, and gateway credentials.</p>
        </div>
      </div>

      {/* Main Structural Settings Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Hand Tab Navigation Menu Deck */}
        <div className="bg-white border border-slate-100 rounded-2xl p-2 shadow-sm space-y-1">
          <TabButton
            label="Profile Parameters"
            icon={<User size={15} />}
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <TabButton
            label="Localization Options"
            icon={<Sliders size={15} />}
            active={activeTab === "preferences"}
            onClick={() => setActiveTab("preferences")}
          />
          <TabButton
            label="Security & Gateways"
            icon={<Shield size={15} />}
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <TabButton
            label="System Connectors"
            icon={<Cpu size={15} />}
            active={activeTab === "integrations"}
            onClick={() => setActiveTab("integrations")}
          />
        </div>

        {/* Right Hand Dynamic Parameter Mutation Pane Shell */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[420px] transition-all">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-28 text-xs font-bold text-slate-400 gap-3">
              <Loader2 size={20} className="animate-spin text-[#1A56FF]" />
              <span className="tracking-tight uppercase text-[10px] tracking-widest">Parsing Remote Profile Data Structures...</span>
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              
              {/* Tab Case 1: PROFILE DETAILS */}
              {activeTab === "profile" && (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-[#111A3E] tracking-tight">Identity Parameters</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage administrative details used throughout generation variables and document matrices.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <UserCheck size={14} className="text-slate-400" /> Administrative Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3.5 py-2 h-10 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1A56FF] focus:ring-4 focus:ring-[#1A56FF]/5 transition-all"
                        placeholder="e.g. Prince Achoja"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Building size={14} className="text-slate-400" /> Registered Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2 h-10 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1A56FF] focus:ring-4 focus:ring-[#1A56FF]/5 transition-all"
                        placeholder="Legal business name identity"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                        <Mail size={14} /> Bound Primary Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          disabled
                          className="w-full px-3.5 py-2 h-10 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed select-none"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-md">
                          Anchor Lock
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-slate-400 leading-normal pl-0.5">Authorization frameworks protect foundational email scopes from direct inline manipulation.</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4">
                    {saveSuccess ? (
                      <span className="text-xs font-bold text-[#1A56FF] flex items-center gap-1.5 bg-[#F0F4FF] border border-[#DCE4FF] px-3.5 py-1.5 rounded-xl animate-in fade-in slide-in-from-left-2 duration-200">
                        <Check size={14} strokeWidth={3} /> Core values committed successfully.
                      </span>
                    ) : (
                      <div />
                    )}
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-1.5 bg-[#1A56FF] text-white px-4 h-10 rounded-xl text-xs font-bold hover:bg-[#1546CC] active:scale-[0.99] transition shadow-sm disabled:opacity-50"
                    >
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Save Configurations
                    </button>
                  </div>
                </form>
              )}

              {/* Tab Case 2: LOCALIZATION OPTIONS */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-[#111A3E] tracking-tight">Localization Parameters</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Configure spatial temporal synchronization settings and core financial metrics display configurations.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Globe size={14} className="text-slate-400" /> Timezone Integration Zone
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full h-10 px-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1A56FF] transition-all cursor-pointer"
                      >
                        <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        Primary Interface Currency
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full h-10 px-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1A56FF] transition-all cursor-pointer"
                      >
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="USD">United States Dollar ($)</option>
                        <option value="GBP">British Pound Sterling (£)</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-b border-slate-100" />

                  <div className="flex items-center justify-between p-4 bg-slate-50/70 rounded-xl border border-slate-100/80 group">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="text-xs font-bold text-slate-800">Operational Log Reports</h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-normal">Route automated pipeline digests and regulatory transaction audits straight to administrative accounts on an ongoing weekly basis.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketingEmails}
                      onChange={(e) => setMarketingEmails(e.target.checked)}
                      className="rounded-md border-slate-200 text-[#1A56FF] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Tab Case 3: SECURITY & ACCESS */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-[#111A3E] tracking-tight">Security Access Infrastructure</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Safeguard account operational keys and update system authentication parameters.</p>
                  </div>

                  <div className="space-y-4 max-w-lg">
                    <button className="w-full flex items-center justify-between border border-slate-100 bg-white hover:border-[#1A56FF]/30 hover:shadow-sm font-bold text-xs text-slate-700 px-4 py-3.5 rounded-xl shadow-sm transition-all group">
                      <span className="flex items-center gap-3">
                        <Lock size={15} className="text-slate-400 group-hover:text-[#1A56FF] transition-colors" /> 
                        Change Password Signature
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Configured 3mo ago</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-between border border-slate-100 bg-white hover:border-[#1A56FF]/30 hover:shadow-sm font-bold text-xs text-slate-700 px-4 py-3.5 rounded-xl shadow-sm transition-all group">
                      <span className="flex items-center gap-3">
                        <Smartphone size={15} className="text-slate-400 group-hover:text-[#1A56FF] transition-colors" /> 
                        Two-Factor Authentication (2FA)
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100/60">
                        Disabled
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab Case 4: CONNECTED INTEGRATIONS */}
              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-[#111A3E] tracking-tight">Active API Gateway Stacks</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Bridge local transaction streams smoothly with official state reporting servers and infrastructure endpoints.</p>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/40 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1A56FF]" />
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#111A3E] text-white flex items-center justify-center font-black text-xs tracking-wider shadow-sm">
                        FIRS
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-800">FIRS Compliance Engine Sync</h4>
                        <p className="text-[11px] text-slate-400 font-medium max-w-sm leading-normal">Direct operational callback parameters routing electronic documents down to regulatory compliance validation servers.</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#1A56FF] bg-[#F0F4FF] px-2.5 py-1 rounded-md border border-[#DCE4FF] self-start sm:self-center">
                      Live Gateway
                    </span>
                  </div>
                </div>
              )}
              
            </div>
          )}
        </div>

      </div>

    </DashboardLayout>
  );
}

{/* Tab Navigation Primitive Internal Button Sub-component */}
function TabButton({
  label,
  icon,
  active = false,
  onClick
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold tracking-tight transition-all relative border ${
        active
          ? "text-[#1A56FF] bg-[#F0F4FF] font-bold border-[#DCE4FF]/40 shadow-sm"
          : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50 border-transparent"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-md bg-[#1A56FF]" />
      )}
      <span className={active ? "text-[#1A56FF]" : "text-slate-400"}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}