import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import NotFound from "./Errors";
import ToHome from "../Components/ToHome";
import {getProductById} from "../Services/PostService"
import useLoader from "../hooks/useLoader";



export default function ProductById() {
    const [loader, onLoading, offLoading] = useLoader();
    const {id} = useParams();
    const [product, setProduct] = useState();
    const [err, setErr] = useState(false);
    const ImgStyle = {
        maxHeigth: "400px",
        maxWidth: "400px",
        marginTop: "30px"
    }

    useEffect(() => {
        
        const request = async() => {
            onLoading();
            try {
                let data = await getProductById(id);
                setProduct(data.data());
            } catch (e) {
                console.log(e);
                setErr(true);
            }
            offLoading();
        }
        
        request();
    }, []);
    
    
    if(loader) return (<Loader />)
    else if(err) return (<NotFound />)
    else return(
        <div className="prod">
            <h1>{product?.name}</h1>
            <div >
                <h3>{product?.desc}</h3>
                <img style={ImgStyle} src={product?.link} />
            </div>
            <div className="flex">
                <ToHome />
                <Link className="volver" to={`/new_product/${id}`}>Modificar detalle</Link>
            </div>
        </div>)
}