import { createContext, useState } from "react";

export const ModalContext = createContext({
  activeModal: null,
  modalData: null,
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
  openAdminAddModal: () => { },
  isAdminAddModalOpen: () => { },
  openAdminEditModal: () => { },
  isAdminEditModalOpen: () => { },
  openAdminDeleteModal: () => { },
  isAdminDeleteModalOpen: () => { },
  openAdminImageModal: () => { },
  isAdminImageModalOpen: () => { },
  getModalData: () => { },
});

export function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const openLoginModal = () => setActiveModal("Login");
  const openRegisterModal = () => setActiveModal("Register");
  const openProductViewModal = () => setActiveModal("ProductView");
  const openCartModal = () => setActiveModal("cart");
  const openCheckoutModal = () => setActiveModal("checkout");
  const openAdminAddModal = () => { setActiveModal("adminAdd"); setModalData(null); };
  const openAdminEditModal = (product) => { setActiveModal("adminEdit"); setModalData(product); };
  const openAdminDeleteModal = (product) => { setActiveModal("adminDelete"); setModalData(product); };
  const openAdminImageModal = (product) => { setActiveModal("adminImage"); setModalData(product); };
  const closeModal = () => { setActiveModal(null); setModalData(null); };

  const isLoginModalOpen = () => activeModal === "Login";
  const isRegisterModalOpen = () => activeModal === "Register";
  const isProductViewModalOpen = () => activeModal === "ProductView";
  const isCartModalOpen = () => activeModal === "cart";
  const isCheckoutModalOpen = () => activeModal === "checkout";
  const isAdminAddModalOpen = () => activeModal === "adminAdd";
  const isAdminEditModalOpen = () => activeModal === "adminEdit";
  const isAdminDeleteModalOpen = () => activeModal === "adminDelete";
  const isAdminImageModalOpen = () => activeModal === "adminImage";
  const getModalData = () => modalData;

  const modalContext = {
    activeModal,
    modalData,
    openLoginModal,
    openRegisterModal,
    openProductViewModal,
    closeModal,
    isLoginModalOpen,
    isRegisterModalOpen,
    isProductViewModalOpen,
    openCartModal,
    openCheckoutModal,
    isCartModalOpen,
    isCheckoutModalOpen,
    openAdminAddModal,
    isAdminAddModalOpen,
    openAdminEditModal,
    isAdminEditModalOpen,
    openAdminDeleteModal,
    isAdminDeleteModalOpen,
    openAdminImageModal,
    isAdminImageModalOpen,
    getModalData,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
}