import Product from "../Components/Product";
import { useState, useEffect } from "react";
import getProducts from "../Services/PostService";
import NavBar from "../Components/NavBar";
import NotFound from "./Errors";
import NewProduct from "../Components/NewProduct";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import useLoader from "../hooks/useLoader";


export default function Products() {
    const [post, setPost] = useState();
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    const {login} = useAuthContext();
    const [loader, onLoading, offLoading] = useLoader();

    const count = function() {
        setCounter(Math.random());
    }

    useEffect(() => {
        onLoading();
        if(!login) {navigate("/login")}
        const request = async () => {
            try {
                const data = await getProducts();
                setPost(data.docs);
            } catch (e) {
                console.log(e);
                setErr(true);
            }
            offLoading();
        }
        setTimeout(() => request(), 200);
    }, [counter])
    

    if(err) return (<NotFound/>)
    else return (
        <div>
            {loader || 
                <div>
                    <NavBar/>
                    <div className="all">
                        <NewProduct />
                        {post?.map(prod => {
                            return <Product count={count} key={prod.id} {...prod.data()} id={prod.id}/>
                        })} 
                    </div>
                </div>
            }
        </div>
    );
}
