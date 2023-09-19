import {useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";
import {createProduct, getProductById} from "../Services/PostService"
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import useModifyProduct from "../hooks/useModifyProduct";


export default function CreateProduct() {
    const {id} = useParams();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const {name, desc, link, 
        setProduct, loader, onLoading, 
        offLoading, setProd, ModifyProd, 
        product, setDesc, setLink, setName} = useModifyProduct();

    const AlignCenter = {
        textAlign: "center",
        width: "200px"
    }

    useEffect(() => {
        onLoading();
        const request = async() => {
            try {
                let data = await getProductById(id);
                setProduct(data.data());
            } catch (e) {
                console.log(e);
                setErr(true);
            }
        }
        offLoading();
        request();
    }, []);

    setProd();

    const onSubmit = async(data) => {
        if(product) {
            ModifyProd(data);
        } else {
            try {
                await createProduct(data);
                setTimeout(navigate("/"), 2000);
            } catch (e) {
                console.log(e);
            }
            offLoading();
        }
    }

    if(loader) return <Loader />
    else return (
        <div className="form">
            <h1>Registrar un producto!</h1>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        style={AlignCenter}
                        type="text" 
                        onInput={(e) => setName(e.target.value)}
                        value={name}
                        {...register("name", {required: 'Ingrese el nombre del producto!'})} 
                        placeholder="Producto" 
                    />
                    <p className="error">{errors.name?.message}</p>
                </div>
                <div>
                    <textarea
                        style={AlignCenter}
                        {...register("description", {required: 'Ingrese la descripcion del producto!'})} 
                        placeholder="Descripcion" 
                        value={desc}
                        onInput={(e) => setDesc(e.target.value)}
                    />
                    <p className="error">{errors.description?.message}</p>
                </div>
                <div>
                    <textarea
                        style={AlignCenter}
                        {...register("link", {required: 'Ingrese un link de una foto del producto!'})} 
                        placeholder="Link" 
                        value={link}
                        onInput={(e) => setLink(e.target.value)}
                    />
                    <p className="error">{errors.link?.message}</p>
                </div>
                {product ? 
                    <button id="btn" className="button" type="submit">Modificar</button> 
                    : <button id="btn" className="button" type="submit">Crear</button>
                }
                <Link to="/" className="log">Volver al inicio</Link>
            </form>
        </div>
    )
}