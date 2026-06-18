import NavbarComponent from './components/NavbarComponent'
import BodyContainer from './components/BodyContainer'
import ItemDetailConteiner from './components/ItemDetailContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Productos from './components/Productos'
import { CartProvider } from './context/CartContext'
import { CartContainer } from './components/CartContainer' 
import CheckoutRHF from './components/CheckoutRHF'
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNotFound from './components/PageNotFound'
import ProductNotFound from './components/ProductNotFound'

function App() {
  return (
    <>
    <BrowserRouter>
    <CartProvider>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<BodyContainer/>} />
        <Route path="/item/:id" element={<ItemDetailConteiner/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path='/carrito' element={<CartContainer/>}/>
        <Route path='/checkout' element={<CheckoutRHF/>}/>

        <Route path='*' element={<PageNotFound/>}/>
        <Route path='404-product' element={<ProductNotFound/>}/>
      </Routes>
    </CartProvider>
    </BrowserRouter>
    </>

    //VER DEPLOY AL FINAL DE LA CLASE 8 ANTES DE ENGREGAR EL PROYECTO
  )
}

export default App
