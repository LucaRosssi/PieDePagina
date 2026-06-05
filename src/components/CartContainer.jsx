import React, { useContext } from "react";
import { CartView } from "./CartView";
import { CartContext } from "../context/CartContext";
import EmptyCart from "./EmptyCart";

export const CartContainer = () => {
const {cart}= useContext(CartContext)

    return (
        <div>
            {cart.length > 0 ? <CartView/> : <EmptyCart/>}
        </div>
    )
}