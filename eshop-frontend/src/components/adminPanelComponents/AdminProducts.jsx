import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../store/ModalContext";
import AdminProductsTable from "./AdminProductsTable";
import AdminProductFormModal from "./AdminProductFormModal"
import DeleteConfirmModal from "./DeleteConfirmModal";
import ImageUploadModal from "./ImageUploadModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Filter from "../productComponents/Filter";
import Pagination from "../sharedComponents/Pagination";
import { getAllProductsWithPagination } from "../../http/productRequests";

export default function ProductsPage() {
  const {
    openAdminAddModal,
    openAdminEditModal,
    openAdminDeleteModal,
    openAdminImageModal,
    isAdminAddModalOpen,
    isAdminEditModalOpen,
    isAdminDeleteModalOpen,
    isAdminImageModalOpen,
    getModalData,
    closeModal,
  } = useContext(ModalContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("keyword") || "";
  const category = searchParams.get("categoryId") || null;
  const sortOrder = searchParams.get("sortOrder") || null;
  const pageNumber = Number(searchParams.get("pageNumber")) || 0;
  const pageSize = Number(searchParams.get("pageSize")) || 12;

  // To prevent insta calling the backend. 
  // Add 400 ms delay after user stops typing.
  const [debouncedSearch, setDebouncedSearch] = useState("");

  function updateParam(key, value) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, String(value));
      else next.delete(key);
      if (key !== "pageNumber") next.delete("pageNumber");
      return next;
    });
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pageNumber]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const params = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    keyword: debouncedSearch || null,
    categoryId: category || null,
    sortOrder: sortOrder,
    sortBy: sortOrder ? "price" : null
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProductsWithPagination(params),
    retry: false,
    placeholderData: keepPreviousData,
  });

  const products = data?.data?.products ?? [];


  const totalPages = data?.data?.totalPages ?? 0;

  function handleFormSubmit(data) {
    const isEdit = !!getModalData();
    console.log(isEdit ? "Edit product:" : "Add product:", data);
    closeModal();
  }

  function handleDeleteConfirm() {
    console.log("Delete product:", getModalData());
    closeModal();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <Filter
            onCategoryChange={(val) => updateParam("categoryId", val)}
            onSearchChange={(val) => updateParam("keyword", val)}
            onSortChange={(val) => updateParam("sortOrder", val)}
            inputClasses="border border-white/20 text-white bg-white/5 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-white/30 transition duration-200 placeholder-white/30"
            buttonClasses="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
            dropdownClasses="bg-brand-dark border border-white/10 rounded-lg shadow-lg z-50 py-1 w-52 max-h-64 overflow-y-auto"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold tracking-wide">Products</h1>
        <button
          onClick={openAdminAddModal}
          className="flex items-center gap-2 bg-white text-brand font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition cursor-pointer text-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Product
        </button>
      </div>

      <AdminProductsTable
        products={products}
        onEdit={openAdminEditModal}
        onDelete={openAdminDeleteModal}
        onImage={openAdminImageModal}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      {isAdminAddModalOpen() && (
        <AdminProductFormModal
          product={null}
          onSubmit={handleFormSubmit}
          onClose={closeModal}
        />
      )}

      {isAdminEditModalOpen() && (
        <AdminProductFormModal
          product={getModalData()}
          onSubmit={handleFormSubmit}
          onClose={closeModal}
        />
      )}

      {isAdminDeleteModalOpen() && (
        <DeleteConfirmModal
          productName={getModalData()?.productName}
          productId={getModalData()?.productId}
          onConfirm={handleDeleteConfirm}
          onClose={closeModal}
        />
      )}

      {isAdminImageModalOpen() && (
        <ImageUploadModal
          product={getModalData()}
          onClose={closeModal}
        />
      )}

      {products.length !== 0 &&
        <Pagination
          totalPages={totalPages}
          currentPage={pageNumber}
          onPageChange={(newPage) => updateParam("pageNumber", newPage)}
          activeClasses={"bg-white text-brand"}
          inactiveClasses={"text-white"}
        />
      }

    </div>
  );
}