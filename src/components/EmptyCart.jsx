import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import emptyCart from '../assets/empty-cart.json'

//incluir la libreria  lottie-react para animaciones, en este caso se uso para mostrar un carrito vacio, se puede usar para cualquier animacion que se quiera mostrar en la app, solo hay que buscar la animacion en lottiefiles y copiar el link del json para usarlo en el src del Player

const EmptyCart = () => {
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}> 
            <h1>Tu carrito esta vacío!</h1>
            <Player
                autoplay
                loop
                src={emptyCart}
                style={{ width: 250, height: 250 }}
            />
            <h2 style={{marginBottom: '1em'}}>Te invitamos a ver nuestros productos</h2>
            <Link to='/productos' className='btn btn-dark'> Ir a comprar</Link>
        </div>
    )
}

export default EmptyCart