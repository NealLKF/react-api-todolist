import { Routes, Route, Link } from "react-router-dom";
import TodoList from './TodoList';
import Login from './Login/Login.js';
import Register from './Login/Register.js';
import ErrorPage from './Error/ErrorPage.js';


const App = () => {
    return <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="todolist" element={<TodoList/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </div>
}

export default App;