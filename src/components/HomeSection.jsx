import "../css/HomeSection.css"
import CardsHome from './CardsHome';
import { useState, useEffect, useRef } from 'react';
import LoaderComponent from './LoaderComponent';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

function HomeSection({ categoria }) {
    const [section, setSection] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    
    const categoryFields = {
        mas_vendidos: "masVendidos",
        clasico: "clasico"
    };

    useEffect(() => {
        setLoader(true);
        setError(null);

        const getProducts = async () => { //Función para obtener los productos de la sección correspondiente, usa async/await para manejar la promesa de getDocs
            try {
                const field = categoryFields[categoria];

                if (!field) {
                    throw new Error(`Categoría no válida: ${categoria}`);
                }

                const q = query(
                    collection(db, "items"),
                    where(field, "==", true)
                );

                const snapshot = await getDocs(q);
                const products = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSection(products);
            }
            catch (error) {
                    console.error("Error fetching products:", error);
                    setError("Error al cargar productos.");
            }
            finally {                
                setLoader(false);
            }
        };
        getProducts();
    }, [categoria]);

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
    }, [section]);

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
            {canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    aria-label="Productos anteriores"
                    className="chevron"
                    disabled={!canScrollLeft}
                >
                    <ChevronLeft size={30} />
                </button>
            )}

            <div
                className="card-container"
                ref={containerRef}
                onScroll={checkScrollPosition}
            >
                {loader ? (
                    <LoaderComponent />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    section.length === 0
                        ? <p>No hay productos disponibles.</p>
                        : <CardsHome products={section}/>
                )}
            </div>

            {canScrollRight && (
                <button
                    onClick={scrollRight}
                    aria-label="Productos siguientes"
                    className="chevron"
                    disabled={!canScrollRight}
                >
                    <ChevronRight size={30} />
                </button>
            )}
        </div>
    )
}

export default HomeSection;