import '../css/Productos.css'
import { useProducts } from './CustomHooks'
import { useState, useEffect, useMemo } from 'react';
import CardsHome from './CardsHome';
import ButtonList from './ButtonList';
import Skeleton from './Skeleton';

const Productos = () => {
  const {products, loader, error} = useProducts();

  const allCategories = useMemo(() => 
    ['Todos', ...new Set(products.map(product => product.categoria))], [products]
  ); //Recalcula solo cuando 'products' cambia, evitando cálculos innecesarios en cada renderizado.

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

  const clean = (str) => str.toLowerCase().replace(/\./g, '').replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");


  const handleSearch = (event) => {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
        <div className='form-container'>
            <h1>Productos</h1>
            <form onSubmit={handleSearch}>
              <input type="text" placeholder='Buscar un producto' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            </form>
            <div className='btn-container'>
                <ButtonList  categorias={allCategories} filterCategory={filterCategory} sortProducts={sortProducts}/>
            </div>
        </div>
        <div>
            <div className='products-container' style={{ display: 'flex', flexWrap: 'wrap', gap: '3em', justifyContent: 'center' }}>
                {
                loader ? (
                    Array.from({ length: 20 }, (_, index) => (
                        <Skeleton key={index} />
                    ))
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <CardsHome products={filteredProducts}/>
                )}
            </div>
        </div>
    </div>
  )
}

export default Productos