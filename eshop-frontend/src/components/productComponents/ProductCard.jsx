import { useContext } from "react";
import { ModalContext } from "../../store/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEuroSign, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../store/CartContext";
import { AuthContext } from "../../store/AuthContext";

export default function ProductCard({
    productId,
    productName,
    image,
    description,
    availableQuantity,
    price,
    hasDiscount,
    discount,
    finalPrice,
    onView
}) {
    const { addItem } = useContext(CartContext);
    const { isLoggedIn, isAdmin } = useContext(AuthContext);


    function handleAddItem(item) {
        addItem({ item, quantity: 1 });
    }

    const { openProductViewModal, openLoginModal } = useContext(ModalContext);
    const isAvailable = availableQuantity && Number(availableQuantity) > 0;

    function handleProductView() {
        onView({ productId, productName, image, description, availableQuantity, price, hasDiscount, discount, finalPrice });
        openProductViewModal();
    }
    return (
        <div className="relative border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => handleProductView({
                productId,
                productName,
                image,
                description,
                availableQuantity,
                price,
                hasDiscount,
                discount,
                finalPrice
            })} className="w-full aspect-[4/3] overflow-hidden">
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105 object-cover" src={image} alt={productName} />
            </div>
            <div className="p-4">
                <h2 onClick={() => handleProductView({
                    productId,
                    productName,
                    image,
                    description,
                    availableQuantity,
                    price,
                    hasDiscount,
                    discount,
                    finalPrice
                })} className="text-lg font-semibold mb-2 cursor-pointer text-brand">
                    {productName}
                </h2>
                <div className="min-h-20 max-h-20 overflow-hidden mb-4">
                    <p className="text-gray-600 text-sm line-clamp-4">
                        {description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        {hasDiscount &&
                            <div className="flex flex-col text-sm">
                                <span className="text-gray-400 line-through">{Number(price).toFixed(2)}<FontAwesomeIcon icon={faEuroSign} /></span>
                            </div>
                        }
                        <div className="flex flex-col">
                            <span className="text-brand font-bold text-md">{Number(finalPrice).toFixed(2)}<FontAwesomeIcon icon={faEuroSign} /></span>
                        </div>
                    </div>
                    <button disabled={!isAvailable}
                        onClick={() => {
                            isLoggedIn
                                ? handleAddItem({
                                    productId,
                                    productName,
                                    image,
                                    description,
                                    availableQuantity,
                                    price,
                                    hasDiscount,
                                    discount,
                                    finalPrice,
                                }) :
                                openLoginModal()
                        }}
                        className={`bg-brand ${isAvailable ? "opacity-100 hover:bg-brand-dark cursor-pointer" : "opacity-70"}
                                    text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-40 flex justify-center`}>

                        {isAvailable ? (
                            <span >
                                <span className="mr-2">Add to Cart</span> <FontAwesomeIcon icon={faShoppingCart} />
                            </span>
                        ) : (
                            <span>
                                <span className="mr-2">Out of Stock</span> <FontAwesomeIcon icon={faBan} />
                            </span>
                        )}
                    </button>
                </div>
            </div>

        </div>
    )
}