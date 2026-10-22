"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Pill, 
  Search, 
  ShoppingCart, 
  Trash2, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  Building2, 
  LogOut,
  User,
  AlertTriangle,
  Plus,
  Minus
} from "lucide-react";

export default function PharmacyPOSPage() {
  const [patientMRN, setPatientMRN] = useState("HSP-2026-000123");
  const [prescriptionLoaded, setPrescriptionLoaded] = useState(true);

  // Cart State
  const [cart, setCart] = useState([
    { id: "med-1", brand: "Panadol 500mg", generic: "Paracetamol", batch: "BAT-2026-01", price: 15, qty: 10, stock: 500 },
    { id: "med-2", brand: "Lipiget 20mg", generic: "Atorvastatin", batch: "BAT-2026-02", price: 45, qty: 30, stock: 150 },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [discount, setDiscount] = useState(0);

  // Medicine Inventory Catalog
  const [inventory] = useState([
    { id: "med-1", brand: "Panadol 500mg", generic: "Paracetamol", batch: "BAT-2026-01", expiry: "2028-12-31", price: 15, stock: 500 },
    { id: "med-2", brand: "Lipiget 20mg", generic: "Atorvastatin", batch: "BAT-2026-02", expiry: "2027-10-31", price: 45, stock: 150 },
    { id: "med-3", brand: "Amoxil 500mg", generic: "Amoxicillin", batch: "BAT-2026-05", expiry: "2026-11-30", price: 35, stock: 20 },
    { id: "med-4", brand: "Risek 20mg", generic: "Omeprazole", batch: "BAT-2026-08", expiry: "2027-05-15", price: 25, stock: 300 },
  ]);

  const handleUpdateQty = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, Math.min(item.stock, item.qty + delta));
            return { ...item, qty: newQty };
          }
          return item;
        })
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const handleAddToCart = (med: typeof inventory[0]) => {
    const existing = cart.find((c) => c.id === med.id);
    if (existing) {
      handleUpdateQty(med.id, 1);
    } else {
      setCart([
        ...cart,
        {
          id: med.id,
          brand: med.brand,
          generic: med.generic,
          batch: med.batch,
          price: med.price,
          qty: 1,
          stock: med.stock,
        },
      ]);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = Math.max(0, subtotal - discount);

  const handleCheckout = () => {
    alert(`Pharmacy Sale Complete! Invoice Total: PKR ${total}. Inventory auto-deducted under FEFO rule.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 p-2 mb-6 border-b border-slate-800 pb-4">
            <div className="p-2 bg-teal-600 rounded-xl text-white">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Pharmacy POS</h2>
              <p className="text-[10px] text-teal-400 font-mono">CITY CARE HOSPITAL</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2 bg-teal-600/20 text-teal-300 font-semibold rounded-lg border border-teal-500/30">
              <ShoppingCart className="w-4 h-4" /> POS Checkout Terminal
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
          <span className="text-[11px] text-slate-400">Usman (Pharmacist)</span>
          <Link href="/login" className="text-rose-400 hover:text-rose-300">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Terminal Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              FEFO INVENTORY & POS TERMINAL
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">Pharmacy Point of Sale</h1>
            <p className="text-xs text-slate-400">Scan prescription, dispense medications, and perform stock deduction.</p>
          </div>

          {/* Patient MRN Prescription Sync */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl">
            <Search className="w-4 h-4 text-slate-500 ml-2" />
            <input
              type="text"
              placeholder="Load Patient MRN (e.g. HSP-2026-000123)"
              value={patientMRN}
              onChange={(e) => setPatientMRN(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none w-48"
            />
            <button
              onClick={() => alert(`Prescription auto-loaded for ${patientMRN} from Dr. Ali!`)}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold"
            >
              Sync EMR
            </button>
          </div>
        </div>

        {/* POS Grid: Catalog + Cart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Medicine Catalog */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">FEFO Inventory Catalog</h3>
              <span className="text-[10px] text-teal-400 font-mono">First Expiry, First Out Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inventory.map((med) => (
                <div key={med.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-white">{med.brand}</h4>
                      <span className="font-mono font-bold text-teal-400 text-xs">PKR {med.price}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{med.generic}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-2 font-mono">
                      <span>Batch: {med.batch}</span>
                      <span>&bull;</span>
                      <span>Exp: {med.expiry}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-bold text-emerald-400">Stock: {med.stock}</span>
                    <button
                      onClick={() => handleAddToCart(med)}
                      className="px-3 py-1 bg-slate-800 hover:bg-teal-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart & Billing Checkout Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-teal-400" /> POS Dispensing Cart
                </h3>
                <span className="text-[10px] font-mono text-slate-400">{cart.length} Items</span>
              </div>

              {/* Cart Table */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-semibold text-white">{item.brand}</h4>
                      <p className="text-[10px] text-slate-400">PKR {item.price} &times; {item.qty}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded px-1">
                        <button onClick={() => handleUpdateQty(item.id, -1)} className="p-1 text-slate-400 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-white px-1">{item.qty}</span>
                        <button onClick={() => handleUpdateQty(item.id, 1)} className="p-1 text-slate-400 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="text-rose-400 hover:text-rose-300 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total & Checkout */}
            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white">PKR {subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Discount (PKR):</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-16 px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-right text-xs text-white focus:outline-none"
                />
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Net Total:</span>
                <span className="text-lg text-teal-400 font-mono">PKR {total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 mt-2"
              >
                <CreditCard className="w-4 h-4" /> Complete POS Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
