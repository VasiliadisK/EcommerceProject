import { useState, useEffect, createContext } from "react";

export const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { },
    increaseQuantity: (id) => { },
    decreaseQuantity: (id) => { },
});

export function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        } catch {
            console.error("Failed to save cart to localStorage");
        }
    }, [cartItems]);

    function handleAddItem({ item, quantity }) {

        var itemExists = false;

        const completeItem = {
            item: item,
            quantity: quantity,
        };
                
        if (cartItems.length > 0) {
            itemExists = cartItems.find((cartItem) => {
                return cartItem.item.productId === item.productId;
            });
        }

        if (itemExists) {
            const foundItem = cartItems.map((cartItm) => {
                if (cartItm.item.productId === item.productId)
                    return { ...cartItm, quantity: cartItm.quantity + 1 };
                else return cartItm;
            });

            setCartItems(foundItem);
            itemExists = false;
        } else setCartItems([...cartItems, completeItem]);
    }

    function handleRemoveItem(id) {
        const newCart = cartItems.filter((cartItem) => cartItem.item.productId !== id);
        setCartItems(newCart);
    }

    function handleClearCart() {
        setCartItems([]);
    }

    function handleIncreaseQuantity(id) {
        const updatedItems = cartItems.map((cartItem) => {
            if (cartItem.item.productId === id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            } else return cartItem;
        });
        setCartItems(updatedItems);
    }

    function handleDecreaseQuantity(id) {
        const updatedItems = cartItems.map((cartItem) => {
            if (cartItem.item.productId === id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            } else return cartItem;
        })
            .filter((cartItem) => cartItem.quantity > 0);
        setCartItems(updatedItems);
    }

    const cartContext = {
        items: cartItems,
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