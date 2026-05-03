import { Link } from "react-router-dom";

export const BrandButton = ({ to, children, onClick, type = "button", variant = "primary" }) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-medium";

    const variants = {
        primary: "bg-brand text-white hover:bg-[#865a40] hover:shadow-md",
        secondary: "bg-white text-brand hover:bg-stone-50 shadow-sm",
        outline: "border border-white/30 text-white hover:bg-white/10"
    };

    const content = (
        <>
            {to && <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" /></svg>}
            {children}
        </>
    );

    if (to) return <Link to={to} className={`${baseStyles} ${variants[variant]} group`}>{content}</Link>;

    return <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>{children}</button>;
};