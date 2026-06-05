import {CartContext} from '../context/CartContext';
import { useContext } from 'react';
import NavbarCartItem from './NavbarCartItem';
import { Link } from 'react-router-dom';

const NavbarCart = () => {
    const { cart } = useContext(CartContext);

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'400px'}}>
            {
                cart.map((compra)=> <NavbarCartItem key={compra.id} compra={compra} />)
            }
            <Link className="btn btn-primary" style={{marginTop:'10px'}} to="/carrito">
                Ver carrito
            </Link>
        </div>
    )
}

export default NavbarCart