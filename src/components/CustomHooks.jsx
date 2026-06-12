import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader]= useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
      let isMounted = true;
      setLoader(true)
        const prodCollection = collection(db, "items") //Indica con que coleccion vamos a trabajar
        getDocs(prodCollection)
        .then((res)=>{
          if (!isMounted) return;
          const list = res.docs.map((doc)=> {
            return {
              id:doc.id, 
              ...doc.data()
            }
          })
          setProducts(list)
        })
        .catch((error)=> {
          if (!isMounted) return;
          console.error(error)
          setError(error)
        })
        .finally(()=> {
          if (!isMounted) return;
          setLoader(false)
        })

        return () => {
          isMounted = false;
        };
    }, []);

    return {products, loader, error};
}