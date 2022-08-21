import {createContext, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import TodoList from './TodoList';
import Login from './Login/Login.js';
import Register from './Login/Register.js';
import ErrorPage from './Error/ErrorPage.js';

const AppContext = createContext();

const App = () => {
    
    const [mail, setMail] = useState("onlyonebye@gmail.com");
    const [nickname, setNickname] = useState("Neal");
    const [pwd, setPwd] = useState("123456");
    
    return <div>
        <AppContext.Provider value={{mail, setMail, nickname, setNickname, pwd, setPwd}}>
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