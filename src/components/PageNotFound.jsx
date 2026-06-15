import React from 'react'
import pageNotFound from '../assets/page-not-found.json'
import { Player } from '@lottiefiles/react-lottie-player'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{marginTop: '5%'}}>
        <Player
                autoplay
                loop
                src={pageNotFound}
                style={{ width: 500, height: 'auto' }}
        />
         <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to='/' className='btn btn-primary'>
                Ir al inicio
            </Link>
        </div>
    </div>
  )
}

export default NotFound