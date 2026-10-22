"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Calendar, 
  Pill, 
  FlaskConical, 
  Download, 
  CreditCard, 
  Building2, 
  LogOut,
  ChevronRight,
  FileText,
  Clock
} from "lucide-react";

export default function PatientDashboard() {
  const [patient] = useState({
    mrn: "HSP-2026-000123",
    name: "Muhammad Usman",
    phone: "+92-321-9876543",
    bloodGroup: "A+",
    allergies: "Penicillin, Dust",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-600 rounded-xl text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Patient Portal & Personal Health Record</h1>
              <p className="text-xs text-rose-400 font-mono">CITY CARE HOSPITAL &bull; MRN: {patient.mrn}</p>
            </div>
          </div>
          <Link href="/login" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* Patient Greeting Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-900/30 via-slate-900 to-slate-900 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Welcome, {patient.name}</h2>
            <p className="text-xs text-slate-300 mt-1">
              MRN: <span className="font-mono text-rose-400 font-bold">{patient.mrn}</span> &bull; Blood Group: <span className="text-rose-400 font-bold">{patient.bloodGroup}</span> &bull; Known Allergies: {patient.allergies}
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-rose-600/20"
          >
            Book New Appointment
          </Link>
        </div>

        {/* 3 Main Health Record Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Appointments */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" /> Active Appointments
            </h3>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-sky-400 font-bold">Today 10:30 AM</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded">
                  CHECKED-IN
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">Dr. Muhammad Ali</h4>
              <p className="text-[10px] text-slate-400">Cardiology &bull; Consultation Room #4</p>
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
              <Pill className="w-4 h-4 text-teal-400" /> Active Prescriptions
            </h3>

            <div className="space-y-2">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-white">Paracetamol 500mg</h4>
                  <p className="text-[10px] text-slate-400">1-0-1 &bull; 5 Days</p>
                </div>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono">
                  DISPENSED
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-white">Atorvastatin 20mg</h4>
                  <p className="text-[10px] text-slate-400">0-0-1 &bull; 30 Days</p>
                </div>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono">
                  DISPENSED
                </span>
              </div>
            </div>
          </div>

          {/* Lab Reports & Downloads */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-indigo-400" /> Lab & Imaging Reports
            </h3>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-white">Complete Blood Count (CBC)</h4>
                <p className="text-[10px] text-slate-400">Order: LAB-2026-000123</p>
              </div>
              <button
                onClick={() => alert("Downloading Verified CBC PDF Lab Report...")}
                className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Patient Health Portal &bull; City Care Hospital (MRN: HSP-2026-000123)
      </footer>
    </div>
  );
}
