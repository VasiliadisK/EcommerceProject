import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import FadeIn from "../../util/FadeInTag";

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <FadeIn>
            <div className="flex flex-col min-h-screen">

                <div className="md:hidden flex items-center gap-3 bg-brand-dark px-4 py-3 border-b border-white/10">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faBars} className="text-lg" />
                    </button>
                </div>

                <div className="flex flex-1">
                    <div className="hidden md:block">
                        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />
                    </div>

                    <div
                        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                            }`}
                        onClick={() => setMobileOpen(false)}
                    />

                    <div
                        className={`fixed top-0 left-0 h-full z-50 md:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <Sidebar
                            collapsed={false}
                            onToggle={() => setMobileOpen(false)}
                            isMobile
                            onNavClick={() => setMobileOpen(false)}
                        />
                    </div>

                    <main className="flex-1 bg-brand p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </FadeIn>
    );
}