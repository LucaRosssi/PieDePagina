import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem"
import '../css/Cart.css'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const CartView = () => {
    const {cart, clearCart, removeOneItem, totalPrice} = useContext(CartContext)
    const confirmClearCart = () => {
        Swal.fire({
            title: "Desea borrar el carrito?",
            text: "Se eliminaran todos los productos seleccionados",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar carrito",
            cancelButtonText: "Cancelar"
            }).then((result) => {
            if (result.isConfirmed) {
                clearCart()
                Swal.fire(
                "Carrito vaciado",
                "Se han eliminado los productos seleccionados",
                "success"
             )
            }
            });
    }

    return (
        <>
        <h1>Su carrito</h1>
        <div className="cartContainer">
            <div className="cartItem">
                {
                    cart.map((compra)=> <CartItem key={compra.id} compra={compra} />)
                }
            </div>
            <span className="total">Total a pagar: $ {totalPrice()}</span>
            <div className='button-container'>
                <Button as={Link} to='/checkout' className="btn" >Comprar</Button>
                <Button onClick={confirmClearCart} className="btn btn-danger">Vaciar Carrito</Button>
            </div>
        </div>
        </>
    )
}