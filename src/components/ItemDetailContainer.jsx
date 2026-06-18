import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import SkeletonItemDetail from "./SkeletonItemDetail";
import { Navigate } from "react-router-dom";

function ItemDetailContainer() {
    const [detail, setDetail] = useState({});
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    
    useEffect(() => {
        setLoader(true)
        const productRef = doc(db, 'items', id);
        getDoc(productRef) 
            .then((res)=> {
                 if (!res.exists()) {
                    setDetail(null);
                    return;
                }

                setDetail({
                    id: res.id,
                    ...res.data()
                });
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            })
            .finally(()=> setLoader(false))
    }, [id]);

    if (detail === null) {
        return <Navigate to="/404-product" />;
    }

    return (
        loader
        ? <SkeletonItemDetail detail={detail}/>
        :
        <div>
            <ItemDetail detail={detail} />
        </div>
    )
}

export default ItemDetailContainer;