import "./globals.css";
import type { Metadata } from "next";
import { CustomGlowCursor } from "@/components/CustomGlowCursor";

export const metadata: Metadata = {
  title: "MediPulse Enterprise - Multi-Tenant Hospital Operating System & POS SaaS",
  description: "Next-Gen Enterprise Healthcare Management & Pharmacy POS Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
        <CustomGlowCursor />
        {children}
      </body>
    </html>
  );
}
