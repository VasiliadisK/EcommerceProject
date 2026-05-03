import { useState, useEffect, createContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductToUserCart, getUserCart, removeProductFromCart, updateProductQuantityForCart, clearCart } from "../http/productRequests";
import toast from "react-hot-toast";

export const CartContext = createContext({
    items: [],
    total: 0,
    addItem: () => { },
    removeItem: () => { },
    clearCart: () => { },
    increaseQuantity: () => { },
    decreaseQuantity: () => { },
});

export function CartContextProvider({ children }) {
    const queryClient = useQueryClient();

    const { data: cartData } = useQuery({
        queryKey: ["userCart"],
        queryFn: getUserCart,
        retry: false,
    });

    const { mutate: addProductToCart, isPending } = useMutation({
        mutationFn: addProductToUserCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userCart"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong while adding the product");
        },
    });

    const { mutate: updateProductQuantity } = useMutation({
        mutationFn: updateProductQuantityForCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userCart"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong while updating the product");
        },
    });

    const { mutate: clearCartForLoggedInUser } = useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userCart"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong while clearing the cart");
        },
    });

    const { mutate: removeProduct } = useMutation({
        mutationFn: removeProductFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userCart"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong while removing the product");
        },
    });

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (cartData?.data?.productsList) {
            setCartItems(cartData.data.productsList);
        }
    }, [cartData]);

    const total = cartItems.reduce(
        (sum, cartItem) => sum + Number(cartItem.finalPrice) * cartItem.requestedQuantity, 0
    );

    function handleAddItem({ item, quantity }) {
        const itemExists = cartItems.find((cartItem) => cartItem.productId === item.productId);

        if (itemExists) {
            updateProductQuantity({ productId: item.productId, productQuantity: 1 });
        } else {
            addProductToCart({ productId: Number(item.productId), productQuantity: quantity });
            toast.success(`Added item ${item.productName} to cart`);
        }
    }

    function handleRemoveItem(productId) {
        removeProduct({productId: Number(productId)});
    }

    function handleClearCart() {
        clearCartForLoggedInUser();
    }

    function handleIncreaseQuantity(productId) {
        updateProductQuantity({ productId, productQuantity: 1 });
    }

    function handleDecreaseQuantity(productId) {
        updateProductQuantity({ productId, productQuantity: -1 });
    }

    const cartContext = {
        items: cartItems,
        total,
        addItem: handleAddItem,
        removeItem: handleRemoveItem,
        clearCart: handleClearCart,
        increaseQuantity: handleIncreaseQuantity,
        decreaseQuantity: handleDecreaseQuantity,
    };

    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );
}