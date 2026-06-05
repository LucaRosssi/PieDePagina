import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader]= useState(false)

    useEffect(() => {
      setLoader(true)
        const prodCollection = collection(db, "items") //Indica con que coleccion vamos a trabajar
        getDocs(prodCollection)
        .then((res)=>{
          const list = res.docs.map((doc)=> {
            return {
              id:doc.id, 
              ...doc.data()
            }
          })
          setProducts(list)
        })
        .catch((error)=> console.log(error))
        .finally(()=> setLoader(false))
    }, []);

    return {products, loader};
}