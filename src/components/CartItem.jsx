import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({compra}) => {
    const {removeOneItem} = useContext(CartContext)

    return (
        <div style={{display:'flex', justifyContent: 'space-between', margin: '10px', alignItems: 'center', borderRadius: '10px', padding: '10px', fontSize:'1.3em', backgroundColor: '#e9e4e4'}}>
            <img src={compra.img} alt={compra.nombre} style={{height: '8em'}}/>
            <span style={{width:'477px', alignItems:'center'}}>{compra.nombre} | {compra.autor}</span>
            <span>{compra.quantity}</span>
            <span style={{paddingRight:'5em'}}>$ {compra.precio}</span>
            <button className="btn btn-danger" onClick={() => removeOneItem(compra.id)} style={{marginRight:'20px'}}>X</button>
        </div>
    )
}

export default CartItem