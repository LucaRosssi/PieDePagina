import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Counter = ({ detail, onAdd }) => {
    const stock = detail.stock || 0;
    const [count, setCount] = useState(0);

        const sumar = () => {
            if(count < stock) {
                setCount(count + 1);
            }
        }

        const restar = () => {
            if(count > 0) {
                setCount(count - 1);
            }
        }

        const purchase = () => {
            onAdd(count);
        }

        const total = count * detail.precio;

    return (
        <div>
            <div className='item-buy'>
                <div>
                    <button className='btn btn-danger' onClick={restar} disabled={count === 0}>
                    -
                    </button>
                <span className='btn text-dark counter-value'>{count}</span>
                <button className='btn btn-success' onClick={sumar} disabled={count === stock}>
                    +
                </button>
                </div>
                 <div>
                    <span className='price'>
                        <span className='priceTotal'>Total:</span> 
                        <br/>
                        ${total?.toLocaleString('es-CO')}
                    </span>
                </div>
            </div>
            <div>
                <Button variant="primary" className='btn-carrito' onClick={purchase} disabled={count === 0}>
                    Agregar al carrito
                </Button>
            </div>
        </div>
    )
}

export default Counter
