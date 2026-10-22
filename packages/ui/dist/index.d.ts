import React from "react";
import { type ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export declare const Card: React.FC<{
    className?: string;
    children: React.ReactNode;
}>;
export declare const Badge: React.FC<{
    variant?: "success" | "warning" | "danger" | "info" | "neutral";
    children: React.ReactNode;
    className?: string;
}>;
export declare const StatsCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    icon?: React.ReactNode;
    trend?: "up" | "down";
}>;
