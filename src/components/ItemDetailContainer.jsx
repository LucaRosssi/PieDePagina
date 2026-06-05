import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { useState, useEffect } from 'react';
import LoaderComponent from "./LoaderComponent";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebase";

function ItemDetailContainer() {
    const [detail, setDetail] = useState({});
    const [loader, setLoader] = useState(false);

    const { id } = useParams();
    
    useEffect(() => {
        setLoader(true)
        const productRef = doc(db, 'items', id);
        getDoc(productRef) 
            .then((res)=> {
                setDetail({
                    id:res.id,
                    ...res.data()
                })
            })
            .catch((error)=> console.log(error))
            .finally(()=> setLoader(false))
    }, [id]);
    
    //Hacer un componente en caso de que se acceda a un ID que no existe. 

    return (
        loader
        ? <LoaderComponent text="detalle"/>
        :
        <div>
            <ItemDetail detail={detail} />
        </div>
    )
}

export default ItemDetailContainer;