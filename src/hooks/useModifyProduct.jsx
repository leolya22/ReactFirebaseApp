import { useEffect, useState } from "react";
import useLoader from "./useLoader";
import { modifyProduct } from "../Services/PostService";
import { useNavigate, useParams } from "react-router-dom";

export default function useModifyProduct() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [link, setLink] = useState("");
    const [product, setProduct] = useState();
    const [loader, onLoading, offLoading] = useLoader();

    function setProd () {
        useEffect(() => {
            if(product) {
                setName(product.name);
                setDesc(product.desc);
                setLink(product.link);
            }
        }, [product])
    }

    async function ModifyProd (data) {
        onLoading();
            try {
                await modifyProduct(data, id);
                setTimeout(navigate("/"), 2000);
            } catch (e) {
                console.log(e);
            }
        offLoading();
    } 
    return {
        name,
        desc,
        link,
        setProduct,
        loader,
        onLoading,
        offLoading,
        setProd,
        ModifyProd,
        product,
        setDesc,
        setLink,
        setName
    }
}