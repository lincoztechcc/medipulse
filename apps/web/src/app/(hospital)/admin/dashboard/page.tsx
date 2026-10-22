"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  Calendar, 
  CreditCard, 
  FlaskConical, 
  Pill, 
  Stethoscope, 
  Clock, 
  ChevronRight, 
  ArrowUpRight, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Settings,
  Globe,
  FileText
} from "lucide-react";

export default function HospitalAdminDashboard() {
  const [stats] = useState({
    todayAppointments: 28,
    todayPatients: 18,
    todayRevenue: "PKR 145,000",
    pendingPayments: "PKR 35,000",
    doctorsAvailable: 6,
    pendingLabReports: 5,
    pharmacySales: "PKR 82,400",
    lowStockMedicines: 3,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          {/* Hospital Header */}
          <div className="flex items-center gap-3 p-2 mb-6 border-b border-slate-800 pb-4">
            <div className="p-2 bg-sky-600 rounded-xl text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">City Care Hospital</h2>
              <p className="text-[10px] text-sky-400 font-mono">TENANT: CITYCARE</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 bg-sky-600/20 text-sky-300 font-semibold rounded-lg border border-sky-500/30">
              <Building2 className="w-4 h-4" /> Admin Dashboard
            </a>
            <Link href="/reception/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Users className="w-4 h-4" /> Patients & MRN
            </Link>
            <Link href="/doctor/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Stethoscope className="w-4 h-4" /> Doctors & EMR
            </Link>
            <Link href="/pharmacy/pos" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Pill className="w-4 h-4" /> Pharmacy POS & Stock
            </Link>
            <Link href="/lab/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <FlaskConical className="w-4 h-4" /> Laboratory LIS
            </Link>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <CreditCard className="w-4 h-4" /> Billing & Invoices
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Globe className="w-4 h-4" /> Website Builder & CMS
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <FileText className="w-4 h-4" /> Audit Logs & Security
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Dr. Tariq (Admin)</span>
          <Link href="/login" className="text-rose-400 hover:text-rose-300">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              TENANT SCOPE: CITYCARE
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">Hospital Operations Dashboard</h1>
            <p className="text-xs text-slate-400">Real-time overview of consultations, pharmacy sales, lab reports, and revenue.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" /> Preview Website
            </Link>
            <Link
              href="/reception/dashboard"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-sky-600/20 flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" /> Reception Register
            </Link>
          </div>
        </div>

        {/* 8 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Today's Appointments</span>
              <Calendar className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{stats.todayAppointments}</p>
            <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 22 Checked-in
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Today's Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{stats.todayRevenue}</p>
            <p className="text-[10px] text-slate-400 mt-1">Consultation & Services</p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Pharmacy Sales</span>
              <Pill className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{stats.pharmacySales}</p>
            <p className="text-[10px] text-teal-400 mt-1">42 Prescriptions Dispensed</p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Pending Lab Reports</span>
              <FlaskConical className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{stats.pendingLabReports}</p>
            <p className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> LIS Processing Queue
            </p>
          </div>
        </div>

        {/* Quick Links & Department Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments & Queue */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-white">Live OPD Consultation Queue</h3>
              <Link href="/reception/dashboard" className="text-xs text-sky-400 hover:text-sky-300 font-semibold">
                View Reception Desk &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg text-xs font-bold font-mono">
                    10:30 AM
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Muhammad Usman (MRN: HSP-2026-000123)</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Doctor: Dr. Muhammad Ali &bull; Cardiology</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded">
                  CHECKED-IN
                </span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg text-xs font-bold font-mono">
                    11:00 AM
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Ayesha Khan (MRN: HSP-2026-000124)</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Doctor: Dr. Fatima Zahra &bull; General Medicine</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded">
                  WAITING
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Pharmacy Alerts */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-base text-white mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" /> Pharmacy Low-Stock Alerts
              </h3>
              <p className="text-xs text-slate-400 mb-4">FEFO Inventory items near reorder threshold:</p>
              
              <div className="space-y-2">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">Atorvastatin 20mg</span>
                    <p className="text-[10px] text-slate-400">Batch: BAT-2026-02</p>
                  </div>
                  <span className="text-amber-400 font-bold font-mono">150 Left</span>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">Amoxicillin 500mg</span>
                    <p className="text-[10px] text-slate-400">Batch: BAT-2026-05</p>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">20 Left</span>
                </div>
              </div>

              <Link
                href="/pharmacy/pos"
                className="mt-4 w-full py-2 bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/30 font-semibold rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
              >
                Open Pharmacy Terminal <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
