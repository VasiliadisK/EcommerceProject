import logo from "../../assets/images/common/logo.png";
import { faCartShopping, faUser, faArrowRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
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


  const { openLoginModal, isLoginModalOpen, isRegisterModalOpen, closeModal } = useContext(ModalContext);
  const { isLoggedIn, logout, loggedInUsername } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  function handleLogout() {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
    toast.success("User was signed out successfully");
  }

  return (
    <header className="flex justify-between items-center bg-white px-8 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-36 h-36 object-contain -my-6" />
      </div>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition">Home</Link>
        <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition">Products</Link>
        <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium transition">About Fwde</Link>
        <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition">Jewel Tips</Link>
        <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition">Contact</Link>

        <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
          <FontAwesomeIcon icon={faCartShopping} />
          <div className="relative">
            <span className="absolute -top-8 -right-3 bg-brand text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </Link>

        {!isLoggedIn ?
          (
            <button
              onClick={openLoginModal}
              className="bg-linear-to-r cursor-pointer from-brand to-brand-dark hover:from-brand/80 hover:to-brand-dark/80 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRightToBracket} />
              Login
            </button>
          ) :
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
          </div>}
      </div>

      {isLoginModalOpen() && <LoginInfoForModal />}
      {isRegisterModalOpen() && <RegisterInfoForModal />}
    </header>
  );
}