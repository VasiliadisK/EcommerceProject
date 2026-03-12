import { createContext, useState } from "react";

export const ModalContext = createContext({
  activeModal: null,
  openLoginModal: () => {},
  openRegisterModal: () => {},
  closeModal: () => {},
  isLoginModalOpen: () => {},
  isRegisterModalOpen: () => {},
});


export function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null); // null | 'Login' | 'Register'

    const openLoginModal = () => setActiveModal("Login");
    const openRegisterModal = () => setActiveModal("Register");
    const closeModal = () => setActiveModal(null);

    function isLoginModalOpen()
    {
        return activeModal === 'Login';
    }

  function isRegisterModalOpen()
    {
        return activeModal === 'Register';
    }

 const modalContext = {
        activeModal: activeModal, 
        openLoginModal: openLoginModal, 
        openRegisterModal: openRegisterModal, 
        closeModal: closeModal,
        isLoginModalOpen: isLoginModalOpen,
        isRegisterModalOpen: isRegisterModalOpen,
  };

  return (
    <ModalContext.Provider
      value={modalContext}
    >
      {children}
    </ModalContext.Provider>
  );
}
