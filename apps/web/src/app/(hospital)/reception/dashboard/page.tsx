"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Search, 
  UserPlus, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Receipt, 
  Printer, 
  ChevronRight, 
  History,
  FileText,
  Pill,
  FlaskConical,
  LogOut,
  Plus
} from "lucide-react";

export default function ReceptionDashboard() {
  const [searchQuery, setSearchQuery] = useState("HSP-2026-000123");
  const [activePatient, setActivePatient] = useState<{
    mrn: string;
    fullName: string;
    dob: string;
    gender: string;
    bloodGroup: string;
    phone: string;
    allergies: string;
    medicalHistory: string;
  } | null>({
    mrn: "HSP-2026-000123",
    fullName: "Muhammad Usman",
    dob: "1990-05-15",
    gender: "Male",
    bloodGroup: "A+",
    phone: "+92-321-9876543",
    allergies: "Penicillin, Dust",
    medicalHistory: "Mild Hypertension diagnosed in 2024",
  });

  const [timelineEvents] = useState([
    { type: "APPOINTMENT", date: "Today 10:30 AM", doctor: "Dr. Muhammad Ali (Cardiologist)", detail: "Checked-in for Cardiac OPD", status: "CHECKED-IN" },
    { type: "CONSULTATION", date: "Today 10:45 AM", doctor: "Dr. Muhammad Ali", detail: "Diagnosis: Essential Hypertension. BP: 135/88 mmHg", status: "COMPLETED" },
    { type: "PRESCRIPTION", date: "Today 10:50 AM", doctor: "Dr. Muhammad Ali", detail: "Prescribed Paracetamol 500mg, Atorvastatin 20mg", status: "DISPENSED" },
    { type: "LAB_ORDER", date: "Today 10:52 AM", doctor: "Dr. Muhammad Ali", detail: "Lab Order LAB-2026-000123: Complete Blood Count (CBC)", status: "PROCESSING" },
    { type: "BILLING", date: "Today 10:30 AM", doctor: "Accounts Desk", detail: "Invoice INV-2026-000123: PKR 2,500 Paid", status: "PAID" },
  ]);

  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.includes("123") || searchQuery.toLowerCase().includes("usman")) {
      setActivePatient({
        mrn: "HSP-2026-000123",
        fullName: "Muhammad Usman",
        dob: "1990-05-15",
        gender: "Male",
        bloodGroup: "A+",
        phone: "+92-321-9876543",
        allergies: "Penicillin, Dust",
        medicalHistory: "Mild Hypertension diagnosed in 2024",
      });
    } else {
      setActivePatient(null);
    }
  };

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newMrn = `HSP-2026-00${Math.floor(100 + Math.random() * 900)}`;
    setActivePatient({
      mrn: newMrn,
      fullName: newPatientName,
      dob: "1995-08-20",
      gender: "Male",
      bloodGroup: "B+",
      phone: newPhone || "+92-300-5554433",
      allergies: "None Reported",
      medicalHistory: "New Registration",
    });
    setNewPatientName("");
    setNewPhone("");
    setShowNewPatientModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 p-2 mb-6 border-b border-slate-800 pb-4">
            <div className="p-2 bg-amber-600 rounded-xl text-white">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Reception Desk</h2>
              <p className="text-[10px] text-amber-400 font-mono">CITY CARE HOSPITAL</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 bg-amber-600/20 text-amber-300 font-semibold rounded-lg border border-amber-500/30">
              <Search className="w-4 h-4" /> Patient Search & Timeline
            </a>
            <button onClick={() => setShowNewPatientModal(true)} className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left">
              <UserPlus className="w-4 h-4" /> Register Walk-In Patient
            </button>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Calendar className="w-4 h-4" /> OPD Appointments Queue
            </a>
            <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Building2 className="w-4 h-4" /> Admin Dashboard
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Sarah (Reception)</span>
          <Link href="/login" className="text-rose-400 hover:text-rose-300">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Master Patient Index & Reception Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Search any patient ID (MRN) to view their complete longitudinal healthcare history.</p>
          </div>
          <button
            onClick={() => setShowNewPatientModal(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-600/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Register New Walk-in Patient
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by Patient MRN (e.g. HSP-2026-000123), Full Name, Phone, or CNIC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-amber-600/20 transition-all"
            >
              Search Patient
            </button>
          </form>
        </div>

        {activePatient ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Card: Patient Information Profile */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <span className="font-mono text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                    {activePatient.mrn}
                  </span>
                  <h3 className="font-bold text-lg text-white mt-1">{activePatient.fullName}</h3>
                </div>
                <button
                  onClick={() => alert(`Printing Patient Card Token for ${activePatient.mrn}`)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1"
                  title="Print Patient Card Token"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Gender / DOB:</span>
                  <span className="font-semibold text-slate-200">{activePatient.gender} / {activePatient.dob}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Blood Group:</span>
                  <span className="font-bold text-rose-400">{activePatient.bloodGroup}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Phone Number:</span>
                  <span className="font-semibold text-slate-200">{activePatient.phone}</span>
                </div>
                <div className="border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400 block mb-1">Known Allergies:</span>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-[11px] font-semibold">
                    {activePatient.allergies}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Medical History:</span>
                  <p className="text-[11px] text-slate-300 italic bg-slate-950 p-2 rounded border border-slate-800">
                    {activePatient.medicalHistory}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => alert(`Checked in ${activePatient.fullName} for Dr. Ali`)}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Check-In Patient
                </button>
              </div>
            </div>

            {/* Right Card: Unified Longitudinal Patient Timeline */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                <History className="w-4 h-4 text-amber-400" /> Longitudinal Patient Timeline ({activePatient.mrn})
              </h3>

              <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {timelineEvents.map((ev, i) => (
                  <div key={i} className="pl-10 relative">
                    <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-slate-900" />
                    <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400">{ev.date}</span>
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-800 text-slate-300 rounded">
                          {ev.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">{ev.detail}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">By: {ev.doctor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm">No patient record found matching &quot;{searchQuery}&quot;.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching &quot;HSP-2026-000123&quot; or register a new patient above.</p>
          </div>
        )}

        {/* Modal for Registering New Patient */}
        {showNewPatientModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Register New Walk-in Patient</h3>
              <p className="text-xs text-slate-400 mb-4">
                Assigns a permanent Master Patient Record Number (MRN) for cross-module medical tracking.
              </p>

              <form onSubmit={handleRegisterPatient} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Kamran Akmal"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +92-300-1234567"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowNewPatientModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-all shadow-md shadow-amber-600/30"
                  >
                    Generate Permanent MRN
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
