import './Login.css';
import { useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_register_users } from "../../global/constants";
import Swal from 'sweetalert2';
import { AppContext } from '../App';


const Register = () => {
    const { email, setEmail, nickname, setNickname, password, setPassword, setToken } = useContext(AppContext);
    const [cfpwd, setCfpwd] = useState(password);
    const { register, handleSubmit } = useForm();
    let navigate = useNavigate();
    async function fetchRegisterData(data) {
        const postData = {
            "user": {
                ...data
            }
        }
        //註冊失敗會回傳422，原因待查
        await fetch(API_register_users, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: ""
            },
            body: JSON.stringify(postData)
        }).then(res => {
            if (res.status === 200) { setToken(res.headers.get('authorization')) };
            return res.json()
        }).then(data => {
            console.log(data);
            if (data.hasOwnProperty('error')) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: data.error
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: data.message
                }).then(() => {
                    navigate("/");
                });
            }
        })
    }
    return (
        <div id="signUpPage" className="bg-yellow">
            <div className="conatiner signUpPage vhContainer">
                <div className="side">
                    <a href="#!"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
                    <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
                </div>
                <div>
                    <form className="formControls" onSubmit={handleSubmit(fetchRegisterData)}>
                        <h2 className="formControls_txt">註冊帳號</h2>
                        <label className="formControls_label" htmlFor="email">Email</label>
                        <input className="formControls_input" type="email" id="email" name="email" placeholder="請輸入 email" required {...register("email")} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
                        <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱" required {...register("nickname")} value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
                        <label className="formControls_label" htmlFor="password">密碼</label>
                        <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" required {...register("password")} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <label className="formControls_label" htmlFor="password">再次輸入密碼</label>
                        <input className="formControls_input" type="password" name="cfpwd" id="cfpwd" placeholder="請再次輸入密碼" required {...register("cfpwd")} value={cfpwd} onChange={(e) => { setCfpwd(e.target.value) }} />
                        <button className="formControls_btnSubmit" type="submit" >註冊帳號</button>
                        <NavLink className="formControls_btnLink" to="/">登入</NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;