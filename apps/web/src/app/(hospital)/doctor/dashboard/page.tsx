"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Stethoscope, 
  User, 
  FileText, 
  Pill, 
  FlaskConical, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Building2, 
  LogOut,
  ChevronRight,
  Trash2,
  Activity
} from "lucide-react";

export default function DoctorDashboard() {
  const [patientsQueue] = useState([
    { id: "apt-01", mrn: "HSP-2026-000123", name: "Muhammad Usman", age: 34, gender: "Male", time: "10:30 AM", status: "WAITING", bp: "135/88", temp: "98.6°F", allergies: "Penicillin" },
    { id: "apt-02", mrn: "HSP-2026-000124", name: "Ayesha Khan", age: 28, gender: "Female", time: "11:00 AM", status: "SCHEDULED", bp: "120/80", temp: "98.4°F", allergies: "Dust" },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(patientsQueue[0]);

  // EMR Form State
  const [symptoms, setSymptoms] = useState("Mild chest tightness upon exertion, fatigue");
  const [diagnosis, setDiagnosis] = useState("Essential Hypertension, Mild Stress");
  const [clinicalNotes, setClinicalNotes] = useState("Patient blood pressure is 135/88 mmHg. Advised CBC blood test and low sodium diet.");

  // Prescriptions List State
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, name: "Paracetamol 500mg", dosage: "500mg", frequency: "1-0-1", duration: "5 Days", instructions: "Take after meals" },
    { id: 2, name: "Atorvastatin 20mg", dosage: "20mg", frequency: "0-0-1", duration: "30 Days", instructions: "Take before bedtime" },
  ]);

  const [medName, setMedName] = useState("");
  const [medDosage, setMedDosage] = useState("");
  const [medFreq, setMedFreq] = useState("1-0-1");
  const [medDuration, setMedDuration] = useState("5 Days");

  // Lab Orders State
  const [selectedLabTest, setSelectedLabTest] = useState("Complete Blood Count (CBC)");
  const [orderedLabTests, setOrderedLabTests] = useState(["Complete Blood Count (CBC)"]);

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName) return;
    setPrescriptions([
      ...prescriptions,
      {
        id: Date.now(),
        name: medName,
        dosage: medDosage || "500mg",
        frequency: medFreq,
        duration: medDuration,
        instructions: "As directed",
      },
    ]);
    setMedName("");
    setMedDosage("");
  };

  const handleRemoveMed = (id: number) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  const handleAddLabTest = () => {
    if (!orderedLabTests.includes(selectedLabTest)) {
      setOrderedLabTests([...orderedLabTests, selectedLabTest]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 p-2 mb-6 border-b border-slate-800 pb-4">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Dr. Muhammad Ali</h2>
              <p className="text-[10px] text-emerald-400 font-mono">CARDIOLOGIST &bull; CITY CARE</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 bg-emerald-600/20 text-emerald-300 font-semibold rounded-lg border border-emerald-500/30">
              <Stethoscope className="w-4 h-4" /> OPD EMR Workspace
            </a>
            <Link href="/reception/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <User className="w-4 h-4" /> Patient Timeline Search
            </Link>
            <Link href="/pharmacy/pos" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Pill className="w-4 h-4" /> Pharmacy Inventory Check
            </Link>
            <Link href="/lab/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <FlaskConical className="w-4 h-4" /> LIS Lab Reports
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Consultation Room #4</span>
          <Link href="/login" className="text-rose-400 hover:text-rose-300">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main EMR Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              EMR OPD CONSULTATION WORKSPACE
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">Clinical EMR & Consultation</h1>
            <p className="text-xs text-slate-400">Record symptoms, diagnosis, electronic prescriptions, and laboratory orders.</p>
          </div>

          <button
            onClick={() => alert(`Saved & Printed EMR Consultation for ${selectedPatient.name}`)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Printer className="w-4 h-4" /> Complete Consultation & Print
          </button>
        </div>

        {/* Workspace Layout: Queue + Patient EMR Form */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Waiting Queue List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl h-fit">
            <h3 className="font-bold text-xs text-white uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Today&apos;s Waiting Queue</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
                {patientsQueue.length} Patients
              </span>
            </h3>

            <div className="space-y-3">
              {patientsQueue.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                    selectedPatient.id === p.id
                      ? "bg-emerald-900/30 border-emerald-500 text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold">{p.time}</span>
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-bold rounded">
                      {p.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-200 mt-1">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.mrn} &bull; {p.gender}, {p.age} yrs</p>
                </button>
              ))}
            </div>
          </div>

          {/* Clinical EMR Input Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Patient Header Banner */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {selectedPatient.mrn}
                  </span>
                  <h2 className="text-lg font-bold text-white">{selectedPatient.name}</h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedPatient.gender}, {selectedPatient.age} Years &bull; Blood Group: A+ &bull; Allergies: <span className="text-rose-400 font-semibold">{selectedPatient.allergies}</span>
                </p>
              </div>

              {/* Vitals Summary */}
              <div className="flex items-center gap-4 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">BP Vitals</span>
                  <span className="font-mono font-bold text-white">{selectedPatient.bp} mmHg</span>
                </div>
                <div className="w-px h-6 bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Temperature</span>
                  <span className="font-mono font-bold text-white">{selectedPatient.temp}</span>
                </div>
              </div>
            </div>

            {/* Clinical Intake Notes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Clinical Assessment & Notes
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Chief Symptoms</label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Diagnosis</label>
                  <textarea
                    rows={2}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Clinical Notes</label>
                <textarea
                  rows={2}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Electronic Prescription Builder */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-400" /> Digital Prescription Builder
              </h3>

              {/* Add Medicine Inputs */}
              <form onSubmit={handleAddMedicine} className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Medicine Name (e.g. Paracetamol 500mg)"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Dosage (500mg)"
                    value={medDosage}
                    onChange={(e) => setMedDosage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <select
                    value={medFreq}
                    onChange={(e) => setMedFreq(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="1-0-1">1-0-1 (Twice Daily)</option>
                    <option value="1-1-1">1-1-1 (Thrice Daily)</option>
                    <option value="0-0-1">0-0-1 (Nightly)</option>
                    <option value="1-0-0">1-0-0 (Morning)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Drug
                </button>
              </form>

              {/* Prescription Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                      <th className="pb-2">Medicine Name</th>
                      <th className="pb-2">Dosage</th>
                      <th className="pb-2">Frequency</th>
                      <th className="pb-2">Duration</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {prescriptions.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 font-semibold text-white">{p.name}</td>
                        <td className="py-2.5 text-slate-300">{p.dosage}</td>
                        <td className="py-2.5 text-teal-400 font-mono font-bold">{p.frequency}</td>
                        <td className="py-2.5 text-slate-300">{p.duration}</td>
                        <td className="py-2.5 text-right">
                          <button
                            onClick={() => handleRemoveMed(p.id)}
                            className="text-rose-400 hover:text-rose-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Direct Laboratory Orders Stream */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-indigo-400" /> Order Laboratory Tests (LIS Integration)
              </h3>

              <div className="flex items-center gap-3">
                <select
                  value={selectedLabTest}
                  onChange={(e) => setSelectedLabTest(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC) - PKR 850</option>
                  <option value="Lipid Profile">Lipid Profile - PKR 1,800</option>
                  <option value="Fasting Blood Sugar (FBS)">Fasting Blood Sugar (FBS) - PKR 400</option>
                  <option value="Liver Function Test (LFT)">Liver Function Test (LFT) - PKR 1,500</option>
                </select>
                <button
                  onClick={handleAddLabTest}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Order Test
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {orderedLabTests.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
