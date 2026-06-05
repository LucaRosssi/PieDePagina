import { createContext } from "react";
import { useState } from "react";

// Crear el contexto del carrito
export const CartContext = createContext();


// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    //Funciones 
    const addToCart = (item, qty) => {
        if (isInCart(item.id)) {
            setCart(
                cart.map(prod => prod.id === item.id ? { ...prod, quantity: prod.quantity + qty } : prod)
            )
        } else {
            setCart([...cart, { ...item, quantity: qty }]);
        }
    }

    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    }

    const removeFromCart = (item) => {
        setCart(cart.filter(i => i.id !== item.id));
    }

    const removeOneItem = (id) => {
        setCart(cart.filter((prod)=> prod.id !== id))
    }

    const totalPrice = () => {
        return cart.reduce((acc, item) => acc += (item.precio * item.quantity), 0);
    }

    const totalQty = (qty) => {
        return cart.length
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={ { cart, addToCart, removeFromCart, clearCart, removeOneItem, totalPrice, isInCart, totalQty } }>
            {children}
        </CartContext.Provider>
    )
}

