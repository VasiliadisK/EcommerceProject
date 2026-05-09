import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, updateCategory } from "../../../http/categoryRequests";
import FormTextInput from "../../sharedComponents/utilComponents/FormTextInput";
import Modal from "../../sharedComponents/utilComponents/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Spinner from "../../sharedComponents/utilComponents/Spinner";

export default function CategoryFormModal({ category, onClose }) {
    const isEdit = !!category;
    const queryClient = useQueryClient();

    const methods = useForm({
        defaultValues: { categoryName: "" },
    });

    useEffect(() => {
        if (category) {
            methods.reset({ categoryName: category.categoryName });
        }
    }, [category]);

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => {
            if (isEdit) {
                return updateCategory({ categoryId: category.categoryId, categoryName: data.categoryName });
            }
            return createCategory(data.categoryName);
        },
        onSuccess: () => {
            toast.success(isEdit ? "Category updated successfully" : "Category created successfully");
            queryClient.resetQueries({ queryKey: ["getAllCategories"] });
            onClose();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
    });

    return (
        <Modal open={true} onClose={onClose} className="admin-category-modal">
            <style>{`
                .admin-category-modal {
                    max-width: 400px !important;
                    width: calc(100% - 2rem) !important;
                    padding: 0 !important;
                    overflow: hidden;
                    background: var(--color-brand-dark) !important;
                    border-radius: 16px !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                }
            `}</style>

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-white font-semibold text-lg">
                    {isEdit ? "Edit Category" : "Add Category"}
                </h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(mutate)} className="flex flex-col gap-4 px-6 py-5">
                    <FormTextInput
                        inputLabel="Category Name"
                        inputKey="categoryName"
                        inputMinLength={2}
                        inputMaxLength={50}
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="px-5 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition text-sm cursor-pointer disabled:opacity-40"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-5 py-2.5 rounded-lg bg-white text-brand font-semibold hover:bg-white/90 transition text-sm cursor-pointer disabled:opacity-40"
                        >
                            {isPending ? <Spinner size="sm" /> : isEdit ? "Save Changes" : "Add Category"}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
}