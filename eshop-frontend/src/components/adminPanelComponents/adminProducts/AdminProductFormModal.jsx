import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import FormTextInput from "../../sharedComponents/utilComponents/FormTextInput";
import FormSelectInput from "../../sharedComponents/utilComponents/FormSelectInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../sharedComponents/utilComponents/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProduct, createProduct } from "../../../http/productRequests";
import { getAllCategories } from "../../../http/categoryRequests";
import toast from "react-hot-toast";
import Spinner from "../../sharedComponents/utilComponents/Spinner";

export default function ProductFormModal({ product, onClose }) {
    const isEdit = !!product;
    const queryClient = useQueryClient();

    const { data: categoriesData } = useQuery({
        queryKey: ["getAllCategories"],
        queryFn: getAllCategories,
        retry: false,
    });

    const categories = categoriesData?.data?.categories ?? [];

    const categoryOptions = categories.map((cat) => ({
        value: cat.categoryId.toString(),
        label: cat.categoryName,
    }));

    const methods = useForm({
        defaultValues: {
            productName: "",
            price: "",
            discount: "",
            availableQuantity: "",
            categoryId: "",
            description: "",
            hasDiscount: false,
        },
    });

    useEffect(() => {
        if (product) {
            methods.reset({
                productName: product.productName,
                price: product.price,
                discount: product.discount,
                availableQuantity: product.availableQuantity,
                categoryId: product.categoryId.toString(),
                description: product.description,
                hasDiscount: product.hasDiscount,
            });
        }
    }, [product]);

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => {
            const productBody = {
                productName: data.productName,
                price: Number(data.price),
                discount: Number(data.discount),
                availableQuantity: Number(data.availableQuantity),
                description: data.description,
                hasDiscount: Number(data.discount) > 0,
            };

            if (isEdit) {
                return updateProduct({
                    categoryId: data.categoryId,
                    productId: product.productId,
                    productBody,
                });
            }

            return createProduct({
                categoryId: data.categoryId,
                productBody,
            });
        },
        onSuccess: () => {
            toast.success(isEdit ? "Product updated successfully" : "Product created successfully");
            queryClient.resetQueries({ queryKey: ["products"] });
            onClose();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
    });

    return (
        <Modal open={true} onClose={onClose} className="admin-form-modal">
            <style>{`
                .admin-form-modal {
                    max-width: 520px !important;
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
                    {isEdit ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(mutate)} className="flex flex-col gap-4 px-6 py-5">
                    <FormTextInput
                        inputLabel="Product Name"
                        inputKey="productName"
                        inputMinLength={2}
                        inputMaxLength={100}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormTextInput inputLabel="Price (€)" inputKey="price" inputType="number" step="0.01" />
                        <FormTextInput inputLabel="Stock" inputKey="availableQuantity" inputType="number" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormTextInput inputLabel="Discount (%)" inputKey="discount" inputType="number" />
                        <FormSelectInput
                            inputLabel="Category"
                            inputKey="categoryId"
                            options={categoryOptions}
                        />
                    </div>
                    <FormTextInput
                        inputLabel="Description"
                        inputKey="description"
                        inputMinLength={5}
                        inputMaxLength={500}
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
                            className="px-5 py-2.5 rounded-lg bg-white text-brand font-semibold hover:bg-white/90 transition text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {isPending ? <Spinner size="sm" /> : isEdit ? "Save Changes" : "Add Product"}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
}