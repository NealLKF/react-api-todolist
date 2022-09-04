import { createContext, useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import TodoList from './TodoList';
import Login from './Login/Login.js';
import Register from './Login/Register.js';
import ErrorPage from './Error/ErrorPage.js';
import MyToaster from '../global/MyToast'

const AppContext = createContext();

const App = () => {

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState();
    let navigate = useNavigate();
    useEffect(() => {
        if (token) {
            window.localStorage.setItem("token", token);
        } else if (window.localStorage.getItem("token")) {
            setToken(window.localStorage.getItem("token"));
        } else {
            window.localStorage.removeItem("token");
            navigate("/");
        }
    }, [token]);

    return <div>
        <AppContext.Provider value={{ email, setEmail, nickname, setNickname, password, setPassword, token, setToken }}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="todolist" element={<TodoList />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <MyToaster/>
        </AppContext.Provider>
       
    </div>
}

export { App as default, AppContext };