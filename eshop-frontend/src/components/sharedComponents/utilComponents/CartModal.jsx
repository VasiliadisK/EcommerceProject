import { faEuroSign, faMinus, faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../store/CartContext";
import { ModalContext } from "../../../store/ModalContext";
import Modal from "../utilComponents/Modal";
export default function CartModal({ onClose }) {
    const { items, total, removeItem, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const {closeModal } = useContext(ModalContext);

    function handleRemoveItem(item) { removeItem(item.productId); }
    function handleClearCart() { clearCart(); }
    function handleIncreaseQuantity(item) { increaseQuantity(item.productId); }
    function handleDecreaseQuantity(item) { decreaseQuantity(item.productId); }

    return (
        <Modal
            className="modal cart-modal"
            open={true}
            onClose={onClose}
        >
            <style>{`
                .cart-modal {
                    max-width: 520px !important;
                    width: calc(100% - 2rem) !important;
                    padding: 0 !important;
                    overflow: hidden;
                    background: #A0654A !important;
                }
                @media (max-width: 520px) {
                    .cart-modal {
                        width: calc(100% - 2rem) !important;
                        border-radius: 16px !important;
                        overflow-y: auto;
                        max-height: 90vh;
                    }
                }
            `}</style>

            <div className="relative px-6 py-5 border-b border-white/20">
                <h2
                    className="text-white text-xl font-semibold text-center"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    Your Cart
                </h2>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border-none"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 max-h-[50vh]">
                {items.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-white/70 text-sm">Your cart is empty</p>
                    </div>
                )}

                {items.map((cartItem) => (
                    <div
                        key={cartItem.productId}
                        className="flex items-center gap-4 border-b border-white/20 pb-4"
                    >
                        <img
                            src={cartItem.image}
                            alt={cartItem.productName}
                            className="w-16 h-16 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-sm font-semibold truncate">
                                {cartItem.productName}
                            </h3>
                            <p className="text-white/80 text-sm font-bold mt-0.5">
                                {Number(cartItem.finalPrice).toFixed(2)}<FontAwesomeIcon icon={faEuroSign} className="ml-0.5 text-xs" />
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleDecreaseQuantity(cartItem)}
                                disabled={cartItem.quantity <= 1}
                                className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faMinus} className="text-xs" />
                            </button>
                            <span className="w-5 text-center text-sm font-medium text-white">
                                {cartItem.requestedQuantity}
                            </span>
                            <button
                                onClick={() => handleIncreaseQuantity(cartItem)}
                                disabled={cartItem.quantity >= cartItem.availableQuantity}
                                className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            </button>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(cartItem)}
                            className="text-white/50 hover:text-red-300 transition-colors cursor-pointer border-none bg-transparent"
                        >
                            <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
                        </button>
                    </div>
                ))}
            </div>

            {items.length > 0 && (
                <div className="px-6 py-5 border-t border-white/20">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-white/70 text-sm uppercase tracking-widest">Total</span>
                        <span className="text-white text-xl font-bold">
                            {total.toFixed(2)}<FontAwesomeIcon icon={faEuroSign} className="ml-0.5 text-base" />
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleClearCart}
                            className="flex-1 flex items-center justify-center gap-2 border border-white/30 text-white/70 hover:bg-white/10 py-3 rounded-lg transition-colors text-sm uppercase tracking-widest font-medium cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                            Clear
                        </button>
                        <Link to="/checkout" onClick={closeModal} className="bg-white text-brand px-8 py-3 font-bold hover:bg-gray-50 transition rounded-lg hover:bg-white/90 transition-colors ">
                            <button
                                className="flex-1 bg-white text-brand hover:bg-white/90 py-3 rounded-lg transition-colors text-sm uppercase tracking-widest font-medium cursor-pointer"
                            >
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </Modal>
    );
}