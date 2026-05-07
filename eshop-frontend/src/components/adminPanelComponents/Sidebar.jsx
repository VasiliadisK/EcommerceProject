import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox, faTag, faUsers, faBagShopping, faChevronLeft, faChevronRight, faXmark,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/common/logo.png";
const NAV_ITEMS = [
    { label: "Products", icon: faBox, path: "/admin/products" },
    { label: "Categories", icon: faTag, path: "/admin/categories" },
    { label: "Users", icon: faUsers, path: "/admin/users" },
    { label: "Orders", icon: faBagShopping, path: "/admin/orders" },
    { label: "Home", icon: faArrowLeft, path: "/" },

];

export default function Sidebar({ collapsed, onToggle, isMobile = false, onNavClick }) {
    return (
        <aside
            className="bg-brand-dark border-r border-white/10 flex flex-col transition-all duration-300 shrink-0 h-full"
            style={{ width: isMobile ? "272px" : collapsed ? "72px" : "240px" }}
        >
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/20">
                <img
                    src={logo}
                    alt="logo"
                    className="w-20 h-20 object-contain -my-2 brightness-0 invert"
                />
                {(!collapsed || isMobile) && (
                    <span className="text-sm font-semibold tracking-widest uppercase text-white/80 flex-1">
                        Admin Panel
                    </span>
                )}
                {isMobile && (
                    <button
                        onClick={onToggle}
                        className="text-white text-xl cursor-pointer p-1 ml-auto"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                )}
            </div>

            <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
                {NAV_ITEMS.map(({ label, icon, path }, i) => (
                    <NavLink
                        key={path}
                        to={path}
                        onClick={onNavClick}
                        className={({ isActive }) =>
                            [
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150",
                                isActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/50 hover:text-white hover:bg-white/5",
                            ].join(" ")
                        }
                        style={
                            isMobile
                                ? {
                                    transitionDelay: `${i * 50}ms`,
                                    transitionProperty: "transform, opacity",
                                }
                                : {}
                        }
                    >
                        <FontAwesomeIcon icon={icon} className="w-[18px] shrink-0" />
                        {(!collapsed || isMobile) && (
                            <span className="tracking-wide">{label}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {!isMobile && (
                <button
                    onClick={onToggle}
                    className="flex items-center justify-center h-12 border-t border-white/10 text-white/30 hover:text-white transition-colors cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={collapsed ? faChevronRight : faChevronLeft}
                        className="text-xs"
                    />
                </button>
            )}
        </aside>
    );
}