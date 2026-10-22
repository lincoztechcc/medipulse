import React from "react";
import Link from "next/link";
import { 
  Building2, 
  UserCheck, 
  Stethoscope, 
  Receipt, 
  Pill, 
  FlaskConical, 
  User, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Zap,
  Activity,
  BarChart3,
  Globe2,
  CheckCircle,
  ArrowRight,
  PhoneCall,
  Mail,
  MapPin
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300">
      
      {/* 1. REV-OX STYLE NAVIGATION BAR (LIGHT & DARK THEME SUPPORT) */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">MediPulse</span>
                <span className="text-[10px] bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400 font-mono px-2 py-0.5 rounded border border-sky-300 dark:border-sky-500/30">
                  v2.5 PRO
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enterprise Hospital POS & EMR SaaS</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#modules" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Hospital Modules</a>
            <a href="#features" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Enterprise Features</a>
            <a href="#demo" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Live POS Terminal</a>
            <a href="#pricing" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">SaaS Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2 hover:scale-105"
            >
              Launch Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. REVOX HERO SECTION WITH LIGHT & DARK ACCENTS */}
      <main className="flex-1 w-full">
        <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
          
          {/* Ambient Radial Glow Orbs */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sky-400/20 to-indigo-400/20 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 dark:bg-slate-900/90 border border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-400 text-xs font-extrabold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-500" /> Multi-Tenant Healthcare Operating System & POS SaaS
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              The Next-Generation <span className="bg-gradient-to-r from-sky-600 via-teal-500 to-indigo-600 dark:from-sky-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">Hospital & POS</span> Platform
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl leading-relaxed font-normal mb-10 max-w-3xl mx-auto">
              Empower your healthcare facility with isolated multi-tenant architecture, real-time FEFO Pharmacy POS, LIS Laboratory, Longitudinal EMR timeline, and automated revenue analytics.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <a
                href="#modules"
                className="px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-sky-500/25 flex items-center gap-3 text-base hover:scale-105"
              >
                Explore Hospital Modules <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#demo"
                className="px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold rounded-2xl transition-all shadow-md flex items-center gap-3 text-base hover:border-slate-300"
              >
                <Activity className="w-5 h-5 text-teal-500" /> View POS Terminal Demo
              </a>
            </div>

            {/* High-Tech Dashboard Mockup Card */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 shadow-2xl shadow-sky-500/10 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 px-4 mb-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-slate-700 dark:text-slate-300 font-bold">medipulse-system-terminal.sys</span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" /> Live Server Online
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left p-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">ACTIVE PRESCRIPTIONS</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">1,482 OPD</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">↑ +14% vs yesterday</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">PHARMACY POS REVENUE</span>
                  <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">Rs. 894,500</div>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">FEFO Batch Verified</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">LAB TEST REPORTS</span>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">340 Ready</div>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Verified PDF Reports</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DEDICATED MODULE LOGINS SECTION */}
        <section id="modules" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200 dark:border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hospital Modules & Role Portals
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
              Select any role portal below to test isolated EMR, POS, LIS, and Management features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Doctor Login */}
            <Link href="/doctor/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit mb-4 border border-emerald-200 dark:border-emerald-500/20">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Doctor EMR Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    OPD EMR, E-Prescriptions, Patient Consultation History & Vitals.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-5 flex items-center gap-1">
                  Doctor Login Page <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Pharmacy Login */}
            <Link href="/pharmacy/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl w-fit mb-4 border border-teal-200 dark:border-teal-500/20">
                    <Pill className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Pharmacy POS Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    FEFO Batch Inventory, POS Billing Terminal & Low-stock Alerts.
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-5 flex items-center gap-1">
                  Pharmacy Login Page <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Laboratory Login */}
            <Link href="/lab/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl w-fit mb-4 border border-indigo-200 dark:border-indigo-500/20">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Laboratory LIS Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Diagnostic Sample Tracking, Test Worklists & Verified PDF Reports.
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-5 flex items-center gap-1">
                  Lab LIS Login Page <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Reception Login */}
            <Link href="/reception/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl w-fit mb-4 border border-amber-200 dark:border-amber-500/20">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Reception Desk Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Master Patient Index MRN Search, OPD Tokens & Appointment Booking.
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-5 flex items-center gap-1">
                  Reception Login Page <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Hospital Admin Login */}
            <Link href="/admin/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl w-fit mb-4 border border-sky-200 dark:border-sky-500/20">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Hospital Admin Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Executive Revenue Analytics, Staff Management & CMS Configuration.
                  </p>
                </div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-5 flex items-center gap-1">
                  Admin Login Page <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Super Admin Login */}
            <Link href="/super-admin/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl w-fit mb-4 border border-purple-200 dark:border-purple-500/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Super Admin Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Platform Hospital Tenant Onboarding & Custom Domain Management.
                  </p>
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-5 flex items-center gap-1">
                  Super Admin Login Page <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Patient Login */}
            <Link href="/patient/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-rose-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl w-fit mb-4 border border-rose-200 dark:border-rose-500/20">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Patient Portal Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Personal Medical Timeline, Prescriptions & Lab PDF Downloads.
                  </p>
                </div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-5 flex items-center gap-1">
                  Patient Login Page <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Unified Login */}
            <Link href="/login" className="group">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-500 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl w-fit mb-4 border border-slate-200 dark:border-slate-700">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Unified Login Switcher</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Unified multi-role login interface with instant demo role switcher.
                  </p>
                </div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-5 flex items-center gap-1">
                  Unified Gateway <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* 4. ENTERPRISE FEATURES GRID */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200 dark:border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Enterprise Feature Matrix
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
              Engineered for multi-tenant scalability, strict database isolation, and high-speed POS operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="p-3 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl w-fit mb-6 border border-sky-200 dark:border-sky-500/20">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Multi-Tenant Isolation</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Dedicated database schemas and subdomains per hospital tenant with custom branding and domain resolution.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="p-3 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl w-fit mb-6 border border-teal-200 dark:border-teal-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">FEFO Pharmacy POS</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                First-Expiry-First-Out stock batch tracking, barcode scanning, thermal receipt printing & auto-deduction.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl w-fit mb-6 border border-indigo-200 dark:border-indigo-500/20">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Revenue Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Real-time OPD consultation fees, pharmacy sales, lab test billings, and executive financial dashboards.
              </p>
            </div>
          </div>
        </section>

        {/* 5. REVOX ENTERPRISE SAAS PRICING TIERS */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200 dark:border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Flexible Hospital SaaS Plans
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
              Scale from single clinics to multi-city hospital chains with zero infrastructure overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Clinic Essentials</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-4 mb-2">Rs. 15,000 <span className="text-xs text-slate-400 font-normal">/mo</span></div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Ideal for single OPD clinics & independent pharmacies.</p>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Up to 3 Doctor Accounts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Basic EMR & Prescriptions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Pharmacy POS Terminal</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> OPD Reception Check-in</li>
                </ul>
              </div>
              <Link href="/admin/login" className="w-full py-3 text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl text-xs transition-colors">
                Select Starter Plan
              </Link>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="p-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-sky-950 dark:to-slate-900 border-2 border-sky-500 shadow-xl shadow-sky-500/10 flex flex-col justify-between relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-lg">
                MOST POPULAR
              </span>
              <div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">Hospital Professional</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-4 mb-2">Rs. 45,000 <span className="text-xs text-slate-400 font-normal">/mo</span></div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Comprehensive system for mid-size hospitals & LIS labs.</p>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-500" /> Unlimited Doctor & Staff Accounts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-500" /> Full LIS Diagnostic Laboratory</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-500" /> FEFO Pharmacy Inventory POS</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-500" /> Longitudinal Patient EMR Timeline</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-500" /> Custom Domain & Branding</li>
                </ul>
              </div>
              <Link href="/admin/login" className="w-full py-3 text-center bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-sky-500/25">
                Start Professional Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Enterprise SaaS Chain</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-4 mb-2">Custom <span className="text-xs text-slate-400 font-normal">/annual</span></div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Multi-city hospital chains & custom infrastructure.</p>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Multi-Hospital Tenant Isolation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Custom Server Onboarding</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Dedicated Account Manager</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> 24/7 SLA Technical Support</li>
                </ul>
              </div>
              <Link href="/super-admin/login" className="w-full py-3 text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl text-xs transition-colors">
                Contact Enterprise Sales
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 6. COMPREHENSIVE REVOX ENTERPRISE FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-16 pb-12 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">MediPulse Enterprise</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              The leading multi-tenant hospital management SaaS operating system. Streamline OPD EMR, Pharmacy POS, Laboratory LIS, and Executive Analytics.
            </p>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2"><PhoneCall className="w-3.5 h-3.5 text-sky-500" /> +92-42-35890000</div>
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sky-500" /> support@medipulse-emr.sys</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-sky-500" /> Gulberg Executive Towers, Lahore, Pakistan</div>
            </div>
          </div>

          {/* Module Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Module Portals</h4>
            <ul className="space-y-2.5">
              <li><Link href="/doctor/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Doctor EMR Portal</Link></li>
              <li><Link href="/pharmacy/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Pharmacy POS Terminal</Link></li>
              <li><Link href="/lab/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Laboratory LIS Unit</Link></li>
              <li><Link href="/reception/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Reception Desk Check-in</Link></li>
              <li><Link href="/patient/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Patient Medical Portal</Link></li>
            </ul>
          </div>

          {/* Management Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Administration</h4>
            <ul className="space-y-2.5">
              <li><Link href="/admin/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Hospital Admin Dashboard</Link></li>
              <li><Link href="/super-admin/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Super Admin SaaS Control</Link></li>
              <li><Link href="/login" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Unified Login Switcher</Link></li>
              <li><a href="#pricing" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">SaaS Pricing Plans</a></li>
            </ul>
          </div>

          {/* Platform Status */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">System Status</h4>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> All Systems Operational
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Database Schemas: Isolated</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Uptime: 99.98% SLA</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>&copy; 2026 MediPulse Enterprise SaaS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Security Specification</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
