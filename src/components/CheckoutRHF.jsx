import { useState, useContext } from "react"
import { CartContext } from "../context/CartContext"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../service/firebase"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import {useForm} from "react-hook-form"
import EmptyCart from "./EmptyCart"
import succesfullPurchase from "../assets/succesfull-purchase.json"
import { Player } from '@lottiefiles/react-lottie-player'



const CheckoutRHF = () => {
    const [orderId, setOrderId] = useState('')
    const {cart, totalPrice, clearCart}= useContext(CartContext)
    const [loader, setLoader] = useState(false)
    const {register, handleSubmit, formState: {errors}, getValues} = useForm()

    const terminarCompra = (data)=> {
            const {name, lastname, addres, mail, secondmail} = data
            setLoader(true)
            let orden = {
                comprador: {name, lastname, addres, mail, secondmail},
                carrito: cart,
                total:totalPrice(), 
                fecha:serverTimestamp()
            }

            const orderColl = collection(db, 'orders')

            addDoc(orderColl, orden)
            .then((res)=>{
                clearCart()
                setOrderId(res.id)
            })
            .catch((error)=> console.log(error))
            .finally(()=> setLoader(false))
    }

    if(!cart.length && !orderId) {
        return <EmptyCart/>
    }

    return (
        orderId
        ? <>
            <h1>Gracias por tu compra</h1>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', textAlign: 'center'}}>
                <Player
                    autoplay
                    loop
                    src={succesfullPurchase}
                    style={{ width: 250, height: 250 }}
                />
                <p style={{marginBottom:'40px'}}>El ID de tu compra es {orderId}</p>
                <Button as={Link} to='/'>Volver al inicio</Button>
            </div>
          </>
        :
        <div>
            <h1>Complete sus datos</h1>
            <form className='form-container' onSubmit={handleSubmit(terminarCompra)} >
                {errors?.name?.type === "required" && <p style={{color:'red', fontSize: '1em'}}>El nombre es requerido</p>}
                <input className='form-control' name='name' type='text' placeholder='Ingresa tu nombre' {...register('name', { required: true })} />
                {errors?.lastname?.type === "required" && <p style={{color:'red', fontSize: '1em'}}>El apellido es requerido</p>}
                <input className='form-control' name='lastname' type='text' placeholder='Ingresa tu apellido' {...register('lastname', { required: true })} />
                {errors?.addres?.type === "required" && <p style={{color:'red', fontSize: '1em'}}>La direccion es requerida</p>} 
                <input className='form-control' name='addres' type='text' placeholder='Ingresa tu direccion' {...register('addres', { required: true })} />
                {errors?.mail?.type === "required" && <p style={{color:'red', fontSize: '1em'}}>El correo es requerido</p>}
                <input className='form-control' name='mail' type='email' placeholder='Ingresa tu correo' {...register('mail', { required: true })} />
                {errors?.secondmail?.type === "required" && <p style={{color:'red', fontSize: '1em'}}>Debes repetir tu correo</p>}
                <input className='form-control' name='secondmail' type='email' placeholder='Repeti tu correo' {...register('secondmail', 
                    { required: true, validate:{ isEqual: (value) => getValues('mail') === value || 'Los correos no coinciden' } })} 
                />
                {errors?.secondmail?.type === "isEqual" && <p style={{color:'red', fontSize: '1em'}}>Los correos no coinciden</p>}
                <button type="submit" className='btn btn-success' disabled={loader}>{loader ? 'Cargando Compra' : 'Terminar Compra'}</button>
            </form>
        </div>
    )
}

export default CheckoutRHF