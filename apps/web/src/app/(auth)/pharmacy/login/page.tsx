"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pill, Mail, KeyRound, ArrowRight, CheckCircle2, RefreshCw, Eye, EyeOff, UserPlus, LogIn, User } from "lucide-react";
import { InteractiveLampLoginShell } from "@/components/InteractiveLampLoginShell";

export default function PharmacyLoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  
  // Empty initial state so inputs are blank with light gray placeholders
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pharmacyName, setPharmacyName] = useState("");
  const [otpCode, setOtpCode] = useState("");
  
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [demoCode, setDemoCode] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/v1/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || "pharmacy@citycare.com", roleName: authMode === "SIGN_IN" ? "Pharmacy POS" : "Pharmacy Registration" }),
      });
      const data = await res.json();

      if (data.success) {
        setDemoCode(data.demoCode || "123456");
        setStep("OTP");
        setMessage(`Verification Code sent to ${email || "pharmacy@citycare.com"} via Gmail!`);
      } else {
        setMessage(data.error || "Failed to send OTP code.");
      }
    } catch {
      setMessage("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || "pharmacy@citycare.com", otpCode }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/pharmacy/pos");
      } else {
        setMessage(data.error || "Invalid OTP code.");
      }
    } catch {
      setMessage("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InteractiveLampLoginShell
      roleTitle="Pharmacy Portal POS"
      roleSubtitle="Secure hospital POS inventory access"
      roleIcon={<Pill className="w-6 h-6" />}
      themeColor="teal"
    >
      {/* Sign In / Sign Up Mode Switcher */}
      <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => { setAuthMode("SIGN_IN"); setStep("FORM"); setMessage(""); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            authMode === "SIGN_IN" ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm" : "text-slate-500"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" /> Sign In
        </button>
        <button
          type="button"
          onClick={() => { setAuthMode("SIGN_UP"); setStep("FORM"); setMessage(""); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            authMode === "SIGN_UP" ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm" : "text-slate-500"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" /> Sign Up
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs text-teal-700 dark:text-teal-300">
          {message}
        </div>
      )}

      {step === "FORM" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          {authMode === "SIGN_UP" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pharmacist Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tariq Mahmood"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pharmacist Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {authMode === "SIGN_UP" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pharmacy / Store Name</label>
              <input
                type="text"
                value={pharmacyName}
                onChange={(e) => setPharmacyName(e.target.value)}
                placeholder="City Care Central Pharmacy"
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : authMode === "SIGN_IN" ? "Request Gmail OTP Code" : "Register Pharmacy Account"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs text-teal-700 dark:text-teal-300 flex items-center justify-between">
            <span>Auto-fill Demo OTP:</span>
            <button
              type="button"
              onClick={() => setOtpCode(demoCode)}
              className="font-mono font-bold bg-teal-600 text-white px-2 py-0.5 rounded text-xs"
            >
              {demoCode}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Enter 6-Digit Code</label>
            <input
              type="text"
              placeholder="123456"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-lg font-mono font-bold text-center tracking-widest placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Verify & Open POS"} <CheckCircle2 className="w-4 h-4" />
          </button>
        </form>
      )}
    </InteractiveLampLoginShell>
  );
}
