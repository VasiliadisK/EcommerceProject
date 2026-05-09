import { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllCategories, deleteCategory } from "../../../http/categoryRequests";
import { ModalContext } from "../../../store/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import CategoriesTable from "./CategoriesTable";
import CategoryFormModal from "./CategoryFormModal";
import CategoryDeleteModal from "./CategoryDeleteModal";

export default function CategoriesPage() {

    const queryClient = useQueryClient();
    const {
        openAdminCategoryAddModal,
        openAdminCategoryEditModal,
        openAdminCategoryDeleteModal,
        isAdminCategoryAddModalOpen,
        isAdminCategoryEditModalOpen,
        isAdminCategoryDeleteModalOpen,
        getModalData,
        closeModal,
    } = useContext(ModalContext);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getAllCategories"],
        queryFn: getAllCategories,
        retry: false,
    });

    const categories = data?.data?.categories ?? [];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl font-semibold tracking-wide">Categories</h1>
                <button
                    onClick={openAdminCategoryAddModal}
                    className="flex items-center gap-2 bg-white text-brand font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition cursor-pointer text-sm"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Category
                </button>
            </div>

            <CategoriesTable
                categories={categories}
                isLoading={isLoading}
                isError={isError}
                error={error}
                onEdit={openAdminCategoryEditModal}
                onDelete={openAdminCategoryDeleteModal}
            />

            {isAdminCategoryAddModalOpen() && (
                <CategoryFormModal
                    category={null}
                    onClose={closeModal}
                />
            )}

            {isAdminCategoryEditModalOpen() && (
                <CategoryFormModal
                    category={getModalData()}
                    onClose={closeModal}
                />
            )}

            {isAdminCategoryDeleteModalOpen() && (
                <CategoryDeleteModal
                    category={getModalData()}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}