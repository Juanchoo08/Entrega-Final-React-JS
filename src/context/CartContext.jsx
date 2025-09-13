import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItem = (item, qty) => {
        setCartItems(prev => {
            const exist = prev.find(p => p.id === item.id);
            if (exist) {
                return prev.map(p =>
                    p.id === item.id ? { ...p, qty: p.qty + qty } : p
                );
            }
            return [...prev, { ...item, qty }];
        });
    };

    const removeItem = (id) => setCartItems(prev => prev.filter(p => p.id !== id));
    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((acc, i) => acc + i.qty, 0);
    const totalPrice = cartItems.reduce((acc, i) => acc + i.qty * i.price, 0);

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
