import { useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getInfo, login } from "../Services/AuthService";
import NavBar from "../Components/NavBar";
import { useAuthContext } from "../Context/AuthContext";
import useLoader from "../hooks/useLoader";

export default function Login() {
    const [loader, onLoading, offLoading] = useLoader();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {onLogin} = useAuthContext();
    localStorage.setItem("user", "Aventurero");

    const onSubmit = async(data) => {
        try {
            onLoading();
            const response = await login(data);
            const userData = await getInfo(response.user.uid);
            localStorage.setItem("user", `${userData.name} ${userData.lastname}`);
            onLogin();
            navigate("/");
        } catch (e) {
            console.log(e);
            if (e.code == "auth/user-not-found") {
                alert("El email no esta registrado en el sitio!")
            } 
            else if (e.code == "auth/wrong-password") {
                alert("La contraseña es incorrecta!")
            } 
            else alert("Ocurrio un error inesperado!");
        }
        offLoading();
    }

    return (
        <>
            {loader || 
                <div>
                    <NavBar />
                        <div className="form">
                            <h1>Ingresar al sitio</h1>
                            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <input 
                                        type="email" 
                                        {...register("email", {required: 'Ingrese un email valido!'})} 
                                        placeholder="Email" 
                                    />
                                    <p className="error">{errors.email?.message}</p>
                                </div>
                                <div>
                                    <input 
                                        type="password" 
                                        {...register("password", {
                                            required: 'Introduzca la contraseña!',
                                            minLength: {
                                                value: 6,
                                                message: "La contraseña es incorrecta"
                                            },
                                            maxLength: {
                                                value: 18,
                                                message: "La contraseña es incorrecta"
                                            }
                                        })} 
                                        placeholder="Password" 
                                    />
                                    <p className="error">{errors.password?.message}</p>
                                    <button id="btn" className="button" type="submit">Login</button>
                                    <br /><br />
                                    <p>Aún no se ha registrado? <br /> 
                                        <Link className="log" to="/registration">Click aqui para registrarse</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                </div>
            }
            
        </>
        
    )
}