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
});


export function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null); // null | 'Login' | 'Register' | 'ProductView'

  const openLoginModal = () => setActiveModal("Login");
  const openRegisterModal = () => setActiveModal("Register");
  const openProductViewModal = () => setActiveModal("ProductView");

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

  const modalContext = {
    activeModal: activeModal,
    openLoginModal: openLoginModal,
    openRegisterModal: openRegisterModal,
    openProductViewModal: openProductViewModal,
    closeModal: closeModal,
    isLoginModalOpen: isLoginModalOpen,
    isRegisterModalOpen: isRegisterModalOpen,
    isProductViewModalOpen: isProductViewModalOpen,
  };

  return (
    <ModalContext.Provider
      value={modalContext}
    >
      {children}
    </ModalContext.Provider>
  );
}
