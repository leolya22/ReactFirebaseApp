import {useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { fireRegister } from "../Services/AuthService";
import Loader from "../Components/Loader";
import useLoader from "../hooks/useLoader";

function RegistrationForm() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [loader, onLoading, offLoading] = useLoader();

    const onSubmit = async(data) => {
        onLoading();
        try{
            await fireRegister(data);
            navigate("/login");
        } catch (e) {
            if(e.code == "auth/email-already-in-use") alert("Este mail ya esta registrado en el sitio!")
            else alert("Ocurrio un error inesperado!");
        }
        offLoading();
    }

    
    if(loader) return <Loader />
    else return (
        <div className="form">
            <h1>Complete el formulario con sus datos para registrarse!</h1>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text" 
                    {...register("nombre")} 
                    placeholder="Nombre" 
                />
                <input 
                    type="text" 
                    {...register("apellido")} 
                    placeholder="Apellido" 
                />
                <div>
                    <input 
                        type="email"
                        {...register("email", {required: 'El campo "Email" es obligatorio!'})} 
                        placeholder="Email" 
                    />
                    <p className="error">{errors.email?.message}</p>
                </div>
                <input 
                    type="email" 
                    {...register("email2")} 
                    placeholder="Email alternativo" 
                />
                <div>
                    <input 
                        type="text" 
                        {...register("telefono", {required: 'El campo "Telefono" es obligatorio!'})} 
                        placeholder="Telefono" 
                    />
                    <p className="error">{errors.telefono?.message}</p>
                </div>
                <div>
                    <input 
                        type="password" 
                        {...register("password", {
                            required: 'Introduzca una contraseña!',
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener como minimo 6 digitos"
                            },
                            maxLength: {
                                value: 18,
                                message: "La contraseña debe tener como maximo 18 digitos"
                            }
                        })} 
                        placeholder="Password" 
                    />
                    <p className="error">{errors.password?.message}</p>
                </div>
                <div>
                    <input 
                        {...register("confPassword", {
                            required: 'Por favor confirme la contraseña!',
                            validate: (val) => {
                                if (watch('password') != val) {
                                    return "Las contraseñas no coinciden!";
                                }}
                        })} 
                        type="password" 
                        placeholder="Confirmar password" 
                    />
                    <p className="error">{errors.confPassword?.message}</p>
                </div>
                <button id="btn" className="button" type="submit">Registrarse</button>
                <p>Ya estas registrado? <br /> <Link className="log" to="/login">Click aqui para loguearte</Link></p>
            </form>
        </div>
    );
}

export default RegistrationForm;