"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsCard = exports.Badge = exports.Card = exports.Input = exports.Button = void 0;
exports.cn = cn;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.Button = react_1.default.forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
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
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, className: cn(baseStyles, variants[variant], sizes[size], className), ...props, children: children }));
});
exports.Button.displayName = "Button";
exports.Input = react_1.default.forwardRef(({ className, label, error, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [label && ((0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: label })), (0, jsx_runtime_1.jsx)("input", { ref: ref, className: cn("w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white text-slate-900 placeholder:text-slate-400", error
                    ? "border-emerald-500 focus:ring-emerald-500"
                    : "border-slate-300 focus:border-sky-500 focus:ring-sky-500", className), ...props }), error && (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-emerald-600", children: error })] }));
});
exports.Input.displayName = "Input";
// 3. Card Component
const Card = ({ className, children }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: cn("bg-white rounded-xl border border-slate-200 shadow-sm p-5", className), children: children }));
};
exports.Card = Card;
// 4. Badge Component
const Badge = ({ variant = "info", children, className }) => {
    const styles = {
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        danger: "bg-rose-50 text-rose-700 border-rose-200",
        info: "bg-sky-50 text-sky-700 border-sky-200",
        neutral: "bg-slate-100 text-slate-700 border-slate-200"
    };
    return ((0, jsx_runtime_1.jsx)("span", { className: cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[variant], className), children: children }));
};
exports.Badge = Badge;
// 5. Stats Card Component
const StatsCard = ({ title, value, change, icon }) => {
    return ((0, jsx_runtime_1.jsxs)(exports.Card, { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-medium text-slate-500 uppercase tracking-wider", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-slate-900 mt-1", children: value }), change && ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-medium text-emerald-600 mt-1", children: change }))] }), icon && (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-sky-50 text-sky-600 rounded-lg", children: icon })] }));
};
exports.StatsCard = StatsCard;
