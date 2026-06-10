import "../css/HomeSection.css"
import CardsHome from './CardsHome';
import { useState, useEffect, useRef } from 'react';
import { useProducts } from './CustomHooks';
import LoaderComponent from './LoaderComponent';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

function HomeSection({ categoria }) {
    const [section, setSection] = useState([]);
    const [loader, setLoader] = useState(false);
    
    useEffect(() => {
        setLoader(true);
        const getProducts = async () => { //Función para obtener los productos de la sección correspondiente, usa async/await para manejar la promesa de getDocs
            try {
                const fields = {
                    mas_vendidos: "masVendidos",
                    clasico: "clasico"
                };
                const field = fields[categoria];
                
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
            }
            finally {                
                setLoader(false);
            }
        };
        getProducts();
    }, [categoria]);

    const containerRef = useRef(null);

    const scrollLeft = () => {
        containerRef.current?.scrollBy({
            left: -500,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        containerRef.current?.scrollBy({
            left: 500,
            behavior: "smooth",
        });
    };

    return (    
        <div className="home-section">
            <ChevronLeft
                size={30}
                onClick={scrollLeft}
            />

            <div
                className="card-container"
                ref={containerRef}
            >
                {loader
                    ? <LoaderComponent />
                    : <CardsHome products={section} />
                }
            </div>

            <ChevronRight
                size={30}
                onClick={scrollRight}
            />
        </div>
    )
}

export default HomeSection;