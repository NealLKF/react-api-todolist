import './Login.css';
import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { API_sign_in } from "../../global/constants";
import Swal from 'sweetalert2';
import MySwal from '../../global/MySwal';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../img/logo.png';
import todolist from '../../img/todolist.png';

const Login = () => {

    const { handleSubmit, register } = useForm();

    // useContext: 取出上一層建立的Context內容
    const { email, setEmail, password, setPassword, setNickname, setToken } = useContext(AppContext);
    // useNavigate: 控制history stack、傳遞參數、頁面重新導向
    let navigate = useNavigate();
    async function fetchSignin(data) {
        const postData = {
            "user": {
                ...data
            }
        }
        await fetch(API_sign_in, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: ""
            },
            body: JSON.stringify(postData)
        }).then(res => {
            if (res.status === 200) { setToken(res.headers.get('authorization')) };
            return res.json()
        }).then(data => {
            if (data.hasOwnProperty('error')) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                });
            } else {
                setNickname(data.nickname);
                toast.success(data.message);
                MySwal.fire({
                    icon: 'success',
                    title: data.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).then(() => {
                    setTimeout(() => { navigate("/todolist"); }, 3000);

                });
            }
        });
    }
    return (
        <div id="loginPage" className="bg-yellow">
            <div className="conatiner loginPage vhContainer ">
                <div className="side">
                    <Link to="/" style={{ pointerEvents: 'none' }}><img className="logoImg" src={logo} alt="" /></Link >
                    <img className="d-m-n" src={todolist} alt="workImg" />
                </div>
                <div>
                    <form className="formControls" onSubmit={handleSubmit(fetchSignin)}>
                        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                        <label className="formControls_label" htmlFor="email">Email</label>
                        <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required {...register("email")} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <span>此欄位不可留空</span>
                        <label className="formControls_label" htmlFor="password">密碼</label>
                        <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" required {...register("password")} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button className="formControls_btnSubmit" type="submit">登入</button>
                        <NavLink className="formControls_btnLink" to="/register">註冊帳號</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;