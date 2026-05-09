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
  openAdminCategoryAddModal: () => { },
  isAdminCategoryAddModalOpen: () => { },
  openAdminCategoryEditModal: () => { },
  isAdminCategoryEditModalOpen: () => { },
  openAdminCategoryDeleteModal: () => { },
  isAdminCategoryDeleteModalOpen: () => { },
  openAdminUserAddModal: () => { },
  isAdminUserAddModalOpen: () => { },
  openAdminUserEditModal: () => { },
  isAdminUserEditModalOpen: () => { },
  openAdminUserDeleteModal: () => { },
  isAdminUserDeleteModalOpen: () => { },
  openAdminOrderStatusModal:() => { },
  isAdminOrderStatusModalOpen: () => { },
  openAdminOrderDetailsModal:() => { },
  isAdminOrderDetailsModalOpen: () => { },
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

  const openAdminCategoryAddModal = () => { setActiveModal("adminCategoryAdd"); setModalData(null); };
  const openAdminCategoryEditModal = (category) => { setActiveModal("adminCategoryEdit"); setModalData(category); };
  const openAdminCategoryDeleteModal = (category) => { setActiveModal("adminCategoryDelete"); setModalData(category); };

  const isAdminCategoryAddModalOpen = () => activeModal === "adminCategoryAdd";
  const isAdminCategoryEditModalOpen = () => activeModal === "adminCategoryEdit";
  const isAdminCategoryDeleteModalOpen = () => activeModal === "adminCategoryDelete";

  const openAdminUserAddModal = () => { setActiveModal("adminUserAdd"); setModalData(null); };
  const openAdminUserEditModal = (user) => { setActiveModal("adminUserEdit"); setModalData(user); };
  const openAdminUserDeleteModal = (user) => { setActiveModal("adminUserDelete"); setModalData(user); };

  const isAdminUserAddModalOpen = () => activeModal === "adminUserAdd";
  const isAdminUserEditModalOpen = () => activeModal === "adminUserEdit";
  const isAdminUserDeleteModalOpen = () => activeModal === "adminUserDelete";

  
const openAdminOrderStatusModal = (order) => { setActiveModal("adminOrderStatus"); setModalData(order); };
const openAdminOrderDetailsModal = (order) => { setActiveModal("adminOrderDetails"); setModalData(order); };

const isAdminOrderStatusModalOpen = () => activeModal === "adminOrderStatus";
const isAdminOrderDetailsModalOpen = () => activeModal === "adminOrderDetails";
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
    openAdminCategoryAddModal,
    isAdminCategoryAddModalOpen,
    openAdminCategoryEditModal,
    isAdminCategoryEditModalOpen,
    openAdminCategoryDeleteModal,
    isAdminCategoryDeleteModalOpen,
    openAdminUserAddModal,
    isAdminUserAddModalOpen,
    openAdminUserEditModal,
    isAdminUserEditModalOpen,
    openAdminUserDeleteModal,
    isAdminUserDeleteModalOpen,
    openAdminOrderStatusModal,
    isAdminOrderStatusModalOpen,
    openAdminOrderDetailsModal,
    isAdminOrderDetailsModalOpen,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
}