import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../sharedComponents/utilComponents/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductImage } from "../../../http/productRequests";
import toast from "react-hot-toast";

export default function ImageUploadModal({ product, onClose }) {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const inputRef = useRef();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ productId, formData }) => updateProductImage({ productId, imageUrl: formData }),
        onSuccess: () => {
            toast.success("Image updated successfully");
            queryClient.resetQueries({ queryKey: ["products"] });
            onClose();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to upload image");
        },
    });

    function handleFileChange(e) {
        const selected = e.target.files[0];
        if (!selected) return;
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }

    function handleSubmit() {
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        mutate({ productId: product.productId, formData });
    }

    return (
        <Modal open={true} onClose={onClose} className="admin-image-modal">
            <style>{`
                .admin-image-modal {
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
                <h2 className="text-white font-semibold text-lg">Upload Image</h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
                <p className="text-white/50 text-sm">
                    Product: <span className="text-white font-medium">{product?.productName}</span>
                </p>

                <div
                    onClick={() => inputRef.current.click()}
                    className="border-2 border-dashed border-white/20 hover:border-white/40 rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition"
                >
                    {preview ? (
                        <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-lg" />
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faCloudArrowUp} className="text-white/30 text-3xl" />
                            <p className="text-white/40 text-sm">Click to select an image</p>
                        </>
                    )}
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />

                <div className="flex gap-3 pt-1">
                    <button
                        onClick={onClose}
                        disabled={isPending}
                        className="flex-1 px-4 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition text-sm cursor-pointer disabled:opacity-40"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!file || isPending}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-white text-brand font-semibold hover:bg-white/90 transition text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}