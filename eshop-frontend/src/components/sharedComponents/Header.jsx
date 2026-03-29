import logo from "../../assets/images/common/logo.png";
import { faCartShopping, faUser, faArrowRightFromBracket, faRightToBracket, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ModalContext } from "../../store/ModalContext";
import { useContext, useState, useRef, useEffect } from "react";
import LoginInfoForModal from "./auth/LoginInfoForModal";
import RegisterInfoForModal from "./auth/RegisterInfoForModal";
import { AuthContext } from "../../store/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { openLoginModal, isLoginModalOpen, isRegisterModalOpen } = useContext(ModalContext);
  const { isLoggedIn, logout, loggedInUsername } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  function handleLogout() {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
    toast.success("User was signed out successfully");
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Fwde" },
    { to: "/", label: "Jewel Tips" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 relative z-50">
        <div className="flex justify-between items-center px-6 py-3">

          <Link to="/">
            <img src={logo} alt="logo" className="w-28 h-28 md:w-36 md:h-36 object-contain -my-4 md:-my-6" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="text-gray-700 hover:text-gray-900 font-medium">
                {link.label}
              </Link>
            ))}

            <Link to="/cart" className="relative text-gray-700 hover:text-gray-900 font-medium">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="absolute -top-2 -right-3 bg-brand text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>

            {!isLoggedIn ? (
              <button
                onClick={openLoginModal}
                className="bg-linear-to-r cursor-pointer from-brand to-brand-dark hover:from-brand/80 hover:to-brand-dark/80 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
                Login
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="bg-linear-to-r cursor-pointer from-brand to-brand-dark hover:from-brand/80 hover:to-brand-dark/80 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faUser} />
                  {loggedInUsername}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-t-lg transition"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-50 rounded-b-lg transition cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <Link to="/cart" className="relative text-gray-700">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="absolute -top-2 -right-3 bg-brand text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-gray-700 text-xl p-1 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faXmark : faBars}
                className="transition-transform duration-300"
                style={{ transform: isMobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 md:hidden flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ backgroundColor: "var(--color-brand)" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/20">
          <img src={logo} alt="logo" className="w-20 h-20 object-contain -my-2 brightness-0 invert" />
          <button
            onClick={closeMobileMenu}
            className="text-white text-xl cursor-pointer p-1"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <nav className="flex flex-col flex-1 px-6 py-6 gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={closeMobileMenu}
              className="text-white/90 hover:text-white hover:bg-white/10 font-medium py-3.5 px-4 rounded-lg transition-all duration-200"
              style={{
                transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionDuration: "0.3s",
                transitionTimingFunction: "ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-8 border-t border-white/20 pt-6">
          {!isLoggedIn ? (
            <button
              onClick={() => { openLoginModal(); closeMobileMenu(); }}
              className="w-full bg-white text-brand font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2 hover:bg-white/90 cursor-pointer"
            >
              <FontAwesomeIcon icon={faRightToBracket} />
              Login
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] uppercase tracking-widest">Logged in as</span>
                  <span className="text-white font-medium text-sm">{loggedInUsername}</span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-white/10 hover:bg-red-500/30 rounded-lg transition cursor-pointer"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {isLoginModalOpen() && <LoginInfoForModal />}
      {isRegisterModalOpen() && <RegisterInfoForModal />}
    </>
  );
}