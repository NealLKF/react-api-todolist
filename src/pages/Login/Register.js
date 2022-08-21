import './Login.css';
import { useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_register_users } from "../../global/constants";
import Swal from 'sweetalert2';
import {AppContext} from '../App';


const Register = () => {
    const {mail, setMail, nickname, setNickname, pwd, setPwd} = useContext(AppContext);
    const [cfpwd, setCfpwd] = useState(pwd);
    const { register, handleSubmit } = useForm();
    let navigate = useNavigate();
    async function fetchRegisterData() {
        const postData = {
            "user": {
                "email": mail,
                "nickname": nickname,
                "password": pwd
            }
        }
        //可成功呼叫，但回傳422，原因待查
        const { message, error } = await fetch(API_register_users, {
            method: "POST",
            headers: { "Content-type": "application/json", },
            body: JSON.stringify(postData)
        }).then(res => res.json());
        
        if (error) {
            Swal.fire({
                icon: 'error',
                title: message,
                text: error[0]
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: message
            }).then(() => {
                navigate("/");
            });
        }
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
                        <input className="formControls_input" type="email" id="email" name="email" placeholder="請輸入 email" required {...register("mail")} value={mail} onChange={(e) => { setMail(e.target.value) }} />
                        <label className="formControls_label" htmlFor="name">您的暱稱</label>
                        <input className="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" required {...register("nickname")} value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
                        <label className="formControls_label" htmlFor="pwd">密碼</label>
                        <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required {...register("pwd")} value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
                        <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
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