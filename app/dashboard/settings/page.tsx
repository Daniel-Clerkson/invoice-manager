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
  Check
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

      // Optional: Hit your backend REST API pipeline if sync required
      /*
      await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, companyName }),
      });
      */

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-xs text-slate-400 font-medium">Update profile configurations, operational localization, and gateway access credentials.</p>
        </div>
      </div>

      {/* Main Structural Settings Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Hand Tab Navigation Menu Deck */}
        <div className="bg-white border border-slate-100 rounded-2xl p-2.5 shadow-sm space-y-1">
          <TabButton
            label="Profile Details"
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
            label="Security & Access"
            icon={<Shield size={15} />}
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <TabButton
            label="Connected Systems"
            icon={<Cpu size={15} />}
            active={activeTab === "integrations"}
            onClick={() => setActiveTab("integrations")}
          />
        </div>

        {/* Right Hand Dynamic Parameter Mutation Pane Shell */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-xs font-semibold text-slate-400">
              <Loader2 size={16} className="animate-spin text-[#00875A] mr-2" />
              <span>Fetching remote profile payload parameter maps...</span>
            </div>
          ) : (
            <>
              {/* Tab Case 1: PROFILE DETAILS */}
              {activeTab === "profile" && (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">Identity Parameters</h3>
                    <p className="text-xs text-slate-400">Manage basic user workspace attributes used throughout document metadata matrices.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <UserCheck size={13} className="text-slate-400" /> Administrative Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition"
                        placeholder="e.g. Prince Achoja"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Building size={13} className="text-slate-400" /> Registered Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition"
                        placeholder="Legal business name identity"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                        <Mail size={13} /> Bound Primary Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"
                        title="Auth scopes cannot rewrite standard email anchors inline."
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                    {saveSuccess ? (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg">
                        <Check size={13} /> Parameters synced perfectly.
                      </span>
                    ) : (
                      <div />
                    )}
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-1.5 bg-[#00875A] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#006F49] transition shadow-sm disabled:opacity-50"
                    >
                      {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                      Save Profile Updates
                    </button>
                  </div>
                </form>
              )}

              {/* Tab Case 2: LOCALIZATION OPTIONS */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">System Preferences</h3>
                    <p className="text-xs text-slate-400">Configure global timezone parameters and ledger metrics display filters.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Globe size={13} /> Timezone Alignment Scope
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition cursor-pointer"
                      >
                        <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        Primary System Currency
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition cursor-pointer"
                      >
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="USD">United States Dollar ($)</option>
                        <option value="GBP">British Pound Sterling (£)</option>
                      </select>
                    </div>
                  </div>

                  <hr className="border-slate-50" />

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100/60">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-800">Operational Log Reports</h4>
                      <p className="text-[11px] text-slate-400 font-medium">Forward transaction settlement digests to the administrative inbox weekly.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketingEmails}
                      onChange={(e) => setMarketingEmails(e.target.checked)}
                      className="rounded border-slate-200 text-[#00875A] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Tab Case 3: SECURITY & ACCESS */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">Security Access Controllers</h3>
                    <p className="text-xs text-slate-400">Safeguard API parameters and renew operational backend authorization structures.</p>
                  </div>

                  <div className="space-y-4 max-w-md">
                    <button className="w-full flex items-center justify-between border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 px-4 py-3 rounded-xl shadow-sm transition">
                      <span className="flex items-center gap-2"><Lock size={14} className="text-slate-400" /> Rotate Password Signature</span>
                      <span className="text-[10px] text-slate-400 font-normal">Updated 3mo ago</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-between border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 px-4 py-3 rounded-xl shadow-sm transition">
                      <span className="flex items-center gap-2"><Smartphone size={14} className="text-slate-400" /> Setup 2-Factor Authentication (2FA)</span>
                      <span className="text-[10px] text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">Deactivated</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab Case 4: CONNECTED INTEGRATIONS */}
              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">Connected Gateway Systems</h3>
                    <p className="text-xs text-slate-400">Bridge internal ledger pipelines with national tax verification endpoints and infrastructure nodes.</p>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                        F
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">FIRS Payload Processing Sync</h4>
                        <p className="text-[11px] text-slate-400 font-medium">Automatic delivery routing parameters for national compliance engines.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Linked Operational Gateway
                    </span>
                  </div>
                </div>
              )}
            </>
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
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all ${
        active
          ? "text-[#00875A] bg-emerald-50/60 font-bold border border-emerald-100/30"
          : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50 border border-transparent"
      }`}
    >
      <span className={active ? "text-[#00875A]" : "text-slate-400"}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}