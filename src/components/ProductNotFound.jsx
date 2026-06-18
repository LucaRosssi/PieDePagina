import React from 'react'
import productMissing from '../assets/product-missing.json'
import { Player } from '@lottiefiles/react-lottie-player'

const ProductNotFound = () => {
  return (
    <div style={{display:'flex', margin:'40px', flexDirection:'column'}}>
        <h2 style={{textAlign:'center'}}>No se ha encontrado el producto</h2>
        <Player
                autoplay
                loop
                src={productMissing}
                style={{ width: 400, height: 'auto' }}
            />
    </div>
  )
}

export default ProductNotFound