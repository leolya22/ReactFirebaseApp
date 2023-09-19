import { Link } from "react-router-dom";


function NewProduct() {
    return(
        <div className="prod">
            <Link className="new" to={'/new_product'}>+</Link>
        </div>
    );
}

export default NewProduct;