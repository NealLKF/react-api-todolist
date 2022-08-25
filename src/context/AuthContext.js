import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    useEffect(()=>{
        if (token){
            window.localStorage.setItem("token", token);
        }else {
            window.localStorage.removeItem("token");
        }
    }, [token]);

}