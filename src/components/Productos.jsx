import '../css/Productos.css'
import { useProducts } from './CustomHooks'
import { useState, useEffect, use } from 'react';
import CardsHome from './CardsHome';
import ButtonList from './ButtonList';
import LoaderComponent from './LoaderComponent';

const Productos = () => {
  const {products, loader} = useProducts();

  const allCategories = ['Todos', ...new Set(products.map(product => product.categoria))];

  const [filteredProducts, setFilteredProducts] = useState([allCategories[0]]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const filterCategory = (category) => {
    if (category === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.categoria === category));
    }
  }

  const sortProducts = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === 'A/Z') {
        return a.nombre.localeCompare(b.nombre); 
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });
    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (event) => {
    const clean = (str) => str.toLowerCase().replace(/\./g, '').replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    event.preventDefault();
    if (searchText.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => 
        clean(product.nombre).includes(clean(searchText)) ||
        product.tags?.some(tag => clean(tag).includes(clean(searchText))) ||
        clean(product.autor).includes(clean(searchText))));
    }
  };

  return (
        loader
        ? <LoaderComponent/>
        :
    <div>
        <div className='form-container'>
            <h1>Productos</h1>
            <form onSubmit={handleSearch}>
              <input type="text" placeholder='Buscar un producto' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            </form>
            <div className='btn-container'>
                <ButtonList  categorias={allCategories} filterCategory={filterCategory} sortProducts={sortProducts} />
            </div>
        </div>
        <div>
            <div className='products-container' style={{ display: 'flex', flexWrap: 'wrap', gap: '3em', justifyContent: 'center' }}>
                <CardsHome products={filteredProducts} />
            </div>
        </div>
    </div>
  )
}

export default Productos