import logo from "../../assets/images/common/logo.png";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ModalContext } from "../../store/ModalContext";
import { useContext } from "react";
import LoginInfoForModal from "./auth/LoginInfoForModal";
import RegisterInfoForModal from "./auth/RegisterInfoForModal";

export default function Header() {

  const { openLoginModal, isLoginModalOpen, isRegisterModalOpen} =
    useContext(ModalContext);

  function handleLoginModalOpen() {
    openLoginModal();
  }


  return (
    <header className="flex justify-between items-center bg-white px-8 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-36 h-36 object-contain -my-6" />
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 font-medium transition"
        >
          Home
        </Link>
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 font-medium transition"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-gray-900 font-medium transition"
        >
          About Fwde
        </Link>
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 font-medium transition"
        >
          Jewel Tips
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-gray-900 font-medium transition"
        >
          Contact
        </Link>
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 font-medium transition"
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <div className="relative">
            <span className="absolute -top-8 -right-3 bg-brand text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </Link>
        <button
          onClick={handleLoginModalOpen}
          className="bg-linear-to-r cursor-pointer from-brand to-brand-dark hover:from-brand/80 hover:to-brand-dark/80 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          Login
        </button>
      </div>
      {isLoginModalOpen() && <LoginInfoForModal />}
      {isRegisterModalOpen() && <RegisterInfoForModal />}
    </header>
  );
}
