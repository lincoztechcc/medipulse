import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500",
      secondary: "bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-700",
      danger: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
      outline: "border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-sky-500",
      ghost: "hover:bg-slate-100 text-slate-600 focus:ring-slate-400"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// 2. Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white text-slate-900 placeholder:text-slate-400",
            error
              ? "border-emerald-500 focus:ring-emerald-500"
              : "border-slate-300 focus:border-sky-500 focus:ring-sky-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-emerald-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// 3. Card Component
export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => {
  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm p-5", className)}>
      {children}
    </div>
  );
};

// 4. Badge Component
export const Badge: React.FC<{
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}> = ({ variant = "info", children, className }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// 5. Stats Card Component
export const StatsCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down";
}> = ({ title, value, change, icon }) => {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {change && (
          <p className="text-xs font-medium text-emerald-600 mt-1">{change}</p>
        )}
      </div>
      {icon && <div className="p-3 bg-sky-50 text-sky-600 rounded-lg">{icon}</div>}
    </Card>
  );
};
