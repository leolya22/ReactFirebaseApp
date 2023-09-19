import { Link } from "react-router-dom";
import { deleteProduct } from "../Services/PostService";


function Product(props) {
    const smallDesc = props.desc.substr(0, 25) + "…";
    
    const onDelete = function() {
        const count = props.count;
        const res = confirm("Estas seguro que quieres eliminar el producto?");
        if(res) {
            deleteProduct(props.id);
            count();
        } else alert("Ok, la proxima mira a donde le das click! Jaja")
    }
    
    return(
        <div className="prod">
            <h1>{props.name}</h1>
            <h3>{smallDesc}</h3>
            <img className="small_img" src={props.link} alt={props.name} />
            <button>
                <Link to={`/product/${props.id}`}>Ver/Modificar Detalle</Link>
            </button>
            <button onClick={onDelete} className="delete">Eliminar</button>
        </div>
    );
}

export default Product;