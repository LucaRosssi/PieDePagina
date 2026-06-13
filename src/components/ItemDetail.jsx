import '../css/ItemDetail.css'
import Counter from './Counter';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function ItemDetail({ detail }) {
    const [purchase, setPurchase] = useState(false)
    const {cart, addToCart} = useContext(CartContext);
    const navigate = useNavigate();

    const onAdd = (cantidad) => {
        addToCart(detail, cantidad);
        setPurchase(true)
    }

    const confirmPurchase = () => {
            Swal.fire({
                title: "Se ha agregado el producto al carrito",
                text: "Qúe desea hacer ahora?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ir al carrito",
                cancelButtonText: "Seguir comprando"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/carrito')
                }else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/productos')
                }
            });
    }

    const outOfStock = detail.stock === 0;

    return (
        <div className='item-detail-container'>
            <div className='item-info'>
                <div className='item-image-container'>
                    <img src={detail.img} alt={detail.nombre} />
                </div>
                <div className='item-detail'>
                    <div>
                        <div className='title'>
                            <h2>{detail.nombre}</h2>
                            <h3>{detail.autor}</h3>
                            <p className='price'>${detail.precio?.toLocaleString('es-CO')}</p>
                        </div>
                        <div>
                            {outOfStock ? <span style={{width:'60vh', backgroundColor:'#ccc', display:'inline-block', height:'3rem', padding:'10px', textAlign:'center', borderRadius:'10px', marginTop:'140px'}}>Sin Stock</span> : <Counter detail={detail} onAdd={onAdd} /> }
                        </div>
                        {purchase ? confirmPurchase() : <></>}
                    </div>
                </div>
            </div>
            <h2>Sinópsis</h2>
            <p>{detail.descripcion}</p>
        </div>
    )
}