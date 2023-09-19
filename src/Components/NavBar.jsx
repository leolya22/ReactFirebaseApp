import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

export default function NavBar() {
    const {login, onLogout} = useAuthContext();
    const User = {
        marginTop: "25px",
        fontSize: "25px",
        fontWeight: 700,
        color: "#646cff",
    };
    const Flex= {
        display: "flex",
        justifyContent: "space-between",
        margin: "0px 0px 0px 25px",
    };

    return (
        <div style={Flex}>
            <p style={User}>{`Hola, ${localStorage.getItem("user")}!`}</p>
            <nav className="navbar">
                <Link className="volver" to="/">Home</Link>
                <Link className="volver" to="/aboutus">About us</Link>
                { !login &&
                    <Link className="volver" to="/registration">Registrarse</Link>
                }
                { login && 
                    <Link className="volver" to="/login" onClick={() => onLogout()}>Salir</Link>
                }
            </nav>
        </div>
        
    );
}