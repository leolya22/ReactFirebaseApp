import React, { useContext, useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
        const [login, setLogin] = useState(localStorage.getItem("login") ? true : false);

        const onLogin = () => {
            setLogin(true);
            localStorage.setItem("login", "true");
        }

        const onLogout = () => {
            setLogin(false);
            localStorage.removeItem("login");
        }
    
    return(
        <AuthContext.Provider value={{ login, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);