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

    return (
        <div className='item-detail-container'>
            <h1>Detalle del producto</h1>
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
                            <Counter detail={detail} onAdd={onAdd} /> 
{/* // onAdd es una prop que se pasa de un componente padre a uno hijo, para manejar la adicion de items a una lista o estado en el componente padre. En este caso, se utiliza para agregar un producto al carrito de compras cuando se hace clic en el botón de agregar. */}
                        </div>
                        {purchase ? confirmPurchase() : <></>}
                    </div>
                </div>
            </div>
            <p>Descripción</p>
            <p>{detail.descripcion}</p>
        </div>
    )
}