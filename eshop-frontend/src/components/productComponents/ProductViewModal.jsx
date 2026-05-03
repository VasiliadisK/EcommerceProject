import { useContext, useState } from "react";
import { ModalContext } from "../../store/ModalContext";
import Modal from "../sharedComponents/utilComponents/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBan, faPlus, faMinus, faTag, faEuroSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../store/CartContext";

export default function ProductViewModal({
    productId,
    productName,
    image,
    description,
    availableQuantity,
    price,
    hasDiscount,
    discount,
    finalPrice
}) {

    const { addItem } = useContext(CartContext);

    function handleAddItem(item) {
        addItem({ item, quantity: 1 });
        closeModal();
    }

    const { isProductViewModalOpen, closeModal } = useContext(ModalContext);
    const [quantity, setQuantity] = useState(1);
    const isAvailable = availableQuantity && Number(availableQuantity) > 0;
    const maxQty = Number(availableQuantity) || 0;

    function increment() {
        setQuantity((q) => Math.min(q + 1, maxQty));
    }

    function decrement() {
        setQuantity((q) => Math.max(q - 1, 1));
    }

    return (
        <Modal
            className="modal product-modal"
            open={isProductViewModalOpen()}
            onClose={closeModal}
        >
            <style>{`
                .product-modal {
                    max-width: 480px !important;
                    width: calc(100% - 2rem) !important;
                    padding: 0 !important;
                    overflow: hidden;
                    background: #FAF6F1 !important;
                }
                @media (max-width: 480px) {
                    .product-modal {
                        width: calc(100% - 2rem) !important;
                        border-radius: 16px !important;
                        overflow-y: auto;
                        max-height: 90vh;
                    }
                }
            `}</style>

            <div className="relative">
                <img
                    src={image}
                    alt={productName}
                    className="w-full block object-cover"
                    style={{ aspectRatio: "4/3" }}
                />
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center transition-colors cursor-pointer border-none"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                {hasDiscount && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#5C3D2E] text-white text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full font-medium">
                        <FontAwesomeIcon icon={faTag} className="text-[10px]" />
                        -{discount}%
                    </div>
                )}
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                    <h2
                        className="text-[#2C1810] text-xl font-semibold leading-snug"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        {productName}
                    </h2>
                    <div className="text-right shrink-0">
                        {hasDiscount && (
                            <p className="text-[#8C7B73] text-sm line-through">
                                {Number(price).toFixed(2)}<FontAwesomeIcon icon={faEuroSign} className="ml-0.5" />
                            </p>
                        )}
                        <p className="text-[#5C3D2E] text-xl font-bold">
                            {Number(finalPrice).toFixed(2)}<FontAwesomeIcon icon={faEuroSign} className="ml-0.5" />
                        </p>
                    </div>
                </div>

                <p className="text-[#8C7B73] text-sm leading-relaxed border-t border-[#E8DDD5] pt-4">
                    {description}
                </p>

                <div className="flex items-center justify-between border-t border-[#E8DDD5] pt-4">
                    <span className={`text-xs uppercase tracking-widest font-medium ${isAvailable ? "text-emerald-600" : "text-red-500"}`}>
                        {isAvailable ? `${maxQty} in stock` : "Out of Stock"}
                    </span>
                    {isAvailable && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={decrement}
                                disabled={quantity <= 1}
                                className="w-8 h-8 rounded-full border border-[#E8DDD5] flex items-center justify-center text-[#5C3D2E] hover:bg-[#F5EDE4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faMinus} className="text-xs" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-[#2C1810]">
                                {quantity}
                            </span>
                            <button
                                onClick={increment}
                                disabled={quantity >= maxQty}
                                className="w-8 h-8 rounded-full border border-[#E8DDD5] flex items-center justify-center text-[#5C3D2E] hover:bg-[#F5EDE4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            </button>
                        </div>
                    )}
                </div>

                <button
                    disabled={!isAvailable}
                    onClick={() => handleAddItem({
                        productId,
                        productName,
                        image,
                        description,
                        availableQuantity,
                        price,
                        hasDiscount,
                        discount,
                        finalPrice,
                    })}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white text-sm uppercase tracking-widest font-medium transition-colors
                        ${isAvailable
                            ? "bg-[#5C3D2E] hover:bg-[#7A5244] cursor-pointer"
                            : "bg-[#5C3D2E] opacity-50 cursor-not-allowed"
                        }`}
                >
                    <FontAwesomeIcon icon={isAvailable ? faShoppingCart : faBan} />
                    {isAvailable ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </Modal>
    );
}