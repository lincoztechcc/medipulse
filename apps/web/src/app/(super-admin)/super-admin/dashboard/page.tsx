"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  AlertTriangle,
  Server,
  Activity,
  ChevronRight,
  LogOut
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SuperAdminDashboard() {
  const [tenants, setTenants] = useState([
    { id: "tenant-citycare-123", name: "City Care Hospital", domain: "citycarehospital.com", plan: "Enterprise", status: "ACTIVE", doctors: 12, patients: 450, revenue: "PKR 1,250,000" },
    { id: "tenant-shifa-456", name: "Shifa Health Complex", domain: "shifahealth.com", plan: "Professional", status: "ACTIVE", doctors: 8, patients: 280, revenue: "PKR 820,000" },
    { id: "tenant-alshifa-789", name: "Al-Razi Medical Center", domain: "alrazimedical.com", plan: "Starter", status: "PENDING", doctors: 4, patients: 95, revenue: "PKR 310,000" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newHospitalName, setNewHospitalName] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospitalName) return;
    const newTenant = {
      id: `tenant-${Date.now()}`,
      name: newHospitalName,
      domain: newDomain || `${newHospitalName.toLowerCase().replace(/\s+/g, "")}.com`,
      plan: "Professional",
      status: "ACTIVE",
      doctors: 0,
      patients: 0,
      revenue: "PKR 0",
    };
    setTenants([...tenants, newTenant]);
    setNewHospitalName("");
    setNewDomain("");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans transition-colors">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 p-2 mb-6">
            <div className="p-2 bg-purple-600 rounded-xl text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">Platform Super Admin</h2>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">SAAS CONTROL CENTER</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 bg-purple-50 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 font-semibold rounded-lg border border-purple-200 dark:border-purple-500/30">
              <Building2 className="w-4 h-4" /> Hospitals & Tenants
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Globe className="w-4 h-4" /> Custom Domains & DNS
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <TrendingUp className="w-4 h-4" /> Subscription Plans
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Activity className="w-4 h-4" /> System Telemetry
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/super-admin/login" className="flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">SaaS Multi-Hospital Overview</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage tenant isolation, subscriptions, custom domains, and platform growth.</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
            >
              <Plus className="w-4 h-4" /> Onboard New Hospital Tenant
            </button>
          </div>
        </div>

        {/* Global Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Active Tenants</span>
              <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{tenants.length}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Tenant Isolated
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Platform Doctors</span>
              <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">24</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Across all onboarded hospitals</p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Platform Patients</span>
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">825</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">+14% growth this month</p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total SaaS MRR</span>
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">PKR 2,380,000</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">3 Active Subscription Plans</p>
          </div>
        </div>

        {/* Tenant Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Server className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Onboarded Hospital Tenants
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Hospital Name & ID</th>
                  <th className="pb-3 font-semibold">Primary Domain</th>
                  <th className="pb-3 font-semibold">SaaS Plan</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Doctors</th>
                  <th className="pb-3 font-semibold">Patients</th>
                  <th className="pb-3 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tenants.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5">
                      <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                      <span className="font-mono text-[10px] text-slate-400">{t.id}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="font-mono bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-slate-800">
                        {t.domain}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                        {t.plan}
                      </span>
                    </td>
                    <td className="py-3.5">
                      {t.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-slate-700 dark:text-slate-300 font-medium">{t.doctors}</td>
                    <td className="py-3.5 text-slate-700 dark:text-slate-300 font-medium">{t.patients}</td>
                    <td className="py-3.5 text-slate-900 dark:text-slate-200 font-semibold">{t.revenue}</td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/admin/login"
                        className="text-sky-600 dark:text-sky-400 hover:underline font-semibold flex items-center justify-end gap-1"
                      >
                        Manage Admin <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for adding new hospital */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Onboard New Hospital Tenant</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Creating a new hospital tenant will instantly provision their database scope, white-label website template, and default role permissions.
              </p>

              <form onSubmit={handleAddHospital} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mayo Healthcare Clinic"
                    value={newHospitalName}
                    onChange={(e) => setNewHospitalName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Custom Domain Name</label>
                  <input
                    type="text"
                    placeholder="e.g. mayoclinic.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-md shadow-purple-600/30"
                  >
                    Provision Tenant
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
