"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FlaskConical, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Printer, 
  Building2, 
  LogOut,
  User,
  Shield,
  ChevronRight
} from "lucide-react";

export default function LabDashboard() {
  const [labOrders, setLabOrders] = useState([
    { id: "lab-01", orderNumber: "LAB-2026-000123", patientName: "Muhammad Usman", mrn: "HSP-2026-000123", testName: "Complete Blood Count (CBC)", sampleType: "Whole Blood (EDTA)", status: "PROCESSING", doctor: "Dr. Muhammad Ali", hb: "14.2", wbc: "7,500", refHb: "13.5 - 17.5 g/dL", refWbc: "4,000 - 11,000 /mcL" },
    { id: "lab-02", orderNumber: "LAB-2026-000124", patientName: "Ayesha Khan", mrn: "HSP-2026-000124", testName: "Lipid Profile", sampleType: "Serum", status: "PENDING_SAMPLE", doctor: "Dr. Fatima Zahra", hb: "-", wbc: "-", refHb: "-", refWbc: "-" },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(labOrders[0]);
  const [hbValue, setHbValue] = useState(selectedOrder.hb);
  const [wbcValue, setWbcValue] = useState(selectedOrder.wbc);

  const handleVerifyReport = () => {
    setLabOrders(
      labOrders.map((o) => (o.id === selectedOrder.id ? { ...o, status: "VERIFIED", hb: hbValue, wbc: wbcValue } : o))
    );
    setSelectedOrder({ ...selectedOrder, status: "VERIFIED", hb: hbValue, wbc: wbcValue });
    alert(`Lab Report ${selectedOrder.orderNumber} Verified & Published to Patient EMR & Patient Portal!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 p-2 mb-6 border-b border-slate-800 pb-4">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Laboratory LIS</h2>
              <p className="text-[10px] text-indigo-400 font-mono">CITY CARE HOSPITAL</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 bg-indigo-600/20 text-indigo-300 font-semibold rounded-lg border border-indigo-500/30">
              <FlaskConical className="w-4 h-4" /> Sample Queue & Verification
            </a>
            <Link href="/reception/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <User className="w-4 h-4" /> Patient Timeline Search
            </Link>
            <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Building2 className="w-4 h-4" /> Admin Dashboard
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Zainab (Lab Senior Tech)</span>
          <Link href="/login" className="text-rose-400 hover:text-rose-300">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main LIS Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              LIS SAMPLE QUEUE & VERIFICATION
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">Laboratory Information System</h1>
            <p className="text-xs text-slate-400">Collect samples, input test result parameters, and publish verified reports.</p>
          </div>

          <button
            onClick={handleVerifyReport}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" /> Verify & Publish Lab Report
          </button>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Queue */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl h-fit">
            <h3 className="font-bold text-xs text-white uppercase tracking-wider mb-4">
              Pending Lab Orders
            </h3>

            <div className="space-y-3">
              {labOrders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSelectedOrder(o);
                    setHbValue(o.hb);
                    setWbcValue(o.wbc);
                  }}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                    selectedOrder.id === o.id
                      ? "bg-indigo-900/30 border-indigo-500 text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-indigo-400 font-bold">{o.orderNumber}</span>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      o.status === "VERIFIED" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                    }`}>
                      {o.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-200 mt-1">{o.patientName}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{o.testName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Test Parameter Intake Form */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs text-indigo-400 font-bold">
                  {selectedOrder.orderNumber} &bull; Sample: {selectedOrder.sampleType}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">{selectedOrder.testName}</h2>
                <p className="text-xs text-slate-400">
                  Patient: <span className="text-slate-200 font-semibold">{selectedOrder.patientName} ({selectedOrder.mrn})</span> &bull; Ref Doctor: {selectedOrder.doctor}
                </p>
              </div>

              <button
                onClick={() => alert(`Printing Official PDF Report for ${selectedOrder.orderNumber}`)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-indigo-400" /> Print PDF
              </button>
            </div>

            {/* Test Parameters */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white">Enter Analytical Result Values</h3>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <span className="font-semibold text-xs text-white block">Hemoglobin (Hb)</span>
                    <span className="text-[10px] text-slate-400">Ref: {selectedOrder.refHb}</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={hbValue}
                      onChange={(e) => setHbValue(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Normal (In Range)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-3 border-t border-slate-800/60">
                  <div>
                    <span className="font-semibold text-xs text-white block">WBC Total Count</span>
                    <span className="text-[10px] text-slate-400">Ref: {selectedOrder.refWbc}</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={wbcValue}
                      onChange={(e) => setWbcValue(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Normal (In Range)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
