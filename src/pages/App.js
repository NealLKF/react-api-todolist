import {createContext, useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import TodoList from './TodoList';
import Login from './Login/Login.js';
import Register from './Login/Register.js';
import ErrorPage from './Error/ErrorPage.js';

const AppContext = createContext();

const App = () => {
    
    const [email, setEmail] = useState("onlyonebye@gmail.com");
    const [nickname, setNickname] = useState("Neal");
    const [password, setPassword] = useState("123456");
    const [token, setToken] = useState();
    
    useEffect(()=>{
        if (token){
            window.localStorage.setItem("token", token);
        }else {
            window.localStorage.removeItem("token");
        }
    }, [token]);

    return <div>
        <AppContext.Provider value={{email, setEmail, nickname, setNickname, password, setPassword, token, setToken}}>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="todolist" element={<TodoList/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        </AppContext.Provider>
    </div>
}

export {App as default, AppContext};