import React from 'react'
import "../css/HomeSection.css"
import CardsHome from './CardsHome';
import { useState, useEffect } from 'react';
import { useProducts } from './CustomHooks';
import LoaderComponent from './LoaderComponent';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';

function HomeSection({ categoria }) {
    const [section, setSection] = useState([]);
    const [loader, setLoader] = useState(false);
    
    useEffect(() => {
        setLoader(true);
        const getProducts = async () => { //Función para obtener los productos de la sección correspondiente, usa async/await para manejar la promesa de getDocs
            try {
                let field = "";

                if (categoria === "mas_vendidos") {
                    field = "masVendidos";
                }else if (categoria === "clasico") {
                    field = "clasico";
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

    return (    
        loader
        ? <LoaderComponent/>
        :
        <div className='home-section'>
            <div className='last-releases'>
                <div className='card-container'>
                    <CardsHome products={section} />
                </div>
            </div>
        </div>
    )
}

export default HomeSection;