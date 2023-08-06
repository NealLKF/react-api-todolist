import { createContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import TodoList from './TodoList';
import Login from './Login/Login.js';
import Register from './Login/Register.js';
import ErrorPage from './Error/ErrorPage.js';
import MyToaster from '../global/MyToast';
import MyReactSpinners from '../global/MyReactSpinners';


const AppContext = createContext();

const App = () => {

    let [email, setEmail] = useState("");
    let [nickname, setNickname] = useState("");
    let [password, setPassword] = useState("");
    let [token, setToken] = useState();
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
        {/* Context 是一種利用向下廣播來傳遞資料的方式，此方法可以解決 props 必須要一層層向下傳遞的缺點。
        建議使用於全域性資料（e.g. 使用者資訊、時區設定、語系、UI 主題 ...etc） */}
        <AppContext.Provider value={{ email, setEmail, nickname, setNickname, password, setPassword, token, setToken }}>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="todolist" element={<TodoList />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <MyToaster />

        </AppContext.Provider>

    </div>
}

export { App as default, AppContext };