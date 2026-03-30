import { createContext, useState } from "react";

export const ModalContext = createContext({
  activeModal: null,
  openLoginModal: () => { },
  openRegisterModal: () => { },
  openProductViewModal: () => { },
  closeModal: () => { },
  isLoginModalOpen: () => { },
  isRegisterModalOpen: () => { },
  isProductViewModalOpen: () => { },
  openCartModal: () => { },
  openCheckoutModal: () => { },
  isCartModalOpen: () => { },
  isCheckoutModalOpen: () => { },
});


export function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null); // null | 'Login' | 'Register' | 'ProductView' | 'cart' | 'checkout'

  const openLoginModal = () => setActiveModal("Login");
  const openRegisterModal = () => setActiveModal("Register");
  const openProductViewModal = () => setActiveModal("ProductView");
  const openCartModal = () => setActiveModal("cart");
  const openCheckoutModal = () => setActiveModal("checkout");
  const closeModal = () => setActiveModal(null);

  function isLoginModalOpen() {
    return activeModal === 'Login';
  }

  function isRegisterModalOpen() {
    return activeModal === 'Register';
  }

  function isProductViewModalOpen() {
    return activeModal === 'ProductView';
  }

  function isCartModalOpen() {
    return activeModal === 'cart';
  }

  function isCheckoutModalOpen() {
    return activeModal === 'checkout';
  }

  const modalContext = {
    activeModal: activeModal,
    openLoginModal: openLoginModal,
    openRegisterModal: openRegisterModal,
    openProductViewModal: openProductViewModal,
    closeModal: closeModal,
    isLoginModalOpen: isLoginModalOpen,
    isRegisterModalOpen: isRegisterModalOpen,
    isProductViewModalOpen: isProductViewModalOpen,
    openCartModal: openCartModal,
    openCheckoutModal: openCheckoutModal,
    isCartModalOpen: isCartModalOpen,
    isCheckoutModalOpen: isCheckoutModalOpen,
  };

  return (
    <ModalContext.Provider
      value={modalContext}
    >
      {children}
    </ModalContext.Provider>
  );
}
