import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Badge } from "react-bootstrap"
import { FaCartShopping } from "react-icons/fa6";

const CartWidget = () => {
    const {cart, totalQty} = useContext(CartContext)
    return (
        <div>
            <FaCartShopping />
            {cart.length > 0 && <Badge bg="danger">{totalQty()}</Badge>}
        </div>
    )
}

export default CartWidget