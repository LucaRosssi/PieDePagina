import "../css/HomeSection.css"
import CardsHome from './CardsHome';
import { useState, useEffect, useRef, useMemo } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import Skeleton from './Skeleton';

function HomeSection({ products, categoria, loader, error }) {

    const categoryFields = {
        mas_vendidos: "masVendidos",
        clasico: "clasico"
    };

    const filteredProducts = useMemo(() => {
        const field = categoryFields[categoria];

        return products.filter(product => product[field]);
    }, [products, categoria]);

    // Funciones para manejar el scroll horizontal de la sección de productos, usando useRef para referenciar el contenedor y scrollBy para desplazarlo suavemente. El scrollAmount se calcula como el 80% del ancho del contenedor para mostrar una cantidad significativa de productos al desplazarse.
    const containerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    
    const checkScrollPosition = () => {
        const container = containerRef.current;

        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);

        setCanScrollRight(
            container.scrollLeft <
            container.scrollWidth - container.clientWidth - 1
        );
    };

    useEffect(() => {
        checkScrollPosition();
    }, [filteredProducts]);

    const scrollAmount = containerRef.current?.offsetWidth * 0.8;

    const scrollLeft = () => {
        containerRef.current?.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
        setTimeout(checkScrollPosition, 350);
    };

    const scrollRight = () => {
        containerRef.current?.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
        setTimeout(checkScrollPosition, 350);
    };

    return (    
        <div className="home-section">
                <button
                    onClick={scrollLeft}
                    aria-label="Productos anteriores"
                    className="chevron"
                    disabled={!canScrollLeft}
                >
                    <ChevronLeft size={30} />
                </button>

            <div
                className="card-container"
                ref={containerRef}
                onScroll={checkScrollPosition}
            >
                {loader ? (
                    Array.from({ length: 8 }, (_, index) => (
                        <Skeleton key={index} />
                    ))
                ) : error ? (
                    <div className="error-container">
                        <p>No pudimos cargar los productos.</p>
                        <button onClick={() => window.location.reload()}>
                            Reintentar
                        </button>
                    </div>
                ) : (
                    filteredProducts.length === 0
                        ? <p>No hay productos disponibles.</p>
                        : <CardsHome products={filteredProducts}/>
                )}
            </div>
                <button
                    onClick={scrollRight}
                    aria-label="Productos siguientes"
                    className="chevron"
                    disabled={!canScrollRight}
                >
                    <ChevronRight size={30} />
                </button>
        </div>
    )
}

export default HomeSection;