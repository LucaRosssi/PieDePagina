import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import loader from '../assets/loader.json'

const LoaderComponent = ({text}) => {
  return (
    <div style={{width:'100%', height: '85vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <Player
            autoplay
            loop
            src={loader }
            style={{ width: 250, height: 250 }}
        />
    </div>
  )
}

export default LoaderComponent