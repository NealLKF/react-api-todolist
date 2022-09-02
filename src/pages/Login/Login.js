import './Login.css';
import { useContext } from "react";
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { API_sign_in } from "../../global/constants";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Login = () => {
    const { handleSubmit, register } = useForm();
    const { email, setEmail, password, setPassword, setNickname, setToken } = useContext(AppContext);
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                });
            } else {
                setNickname(data.nickname);
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
                    navigate("/todolist");
                });
            }
        });
    }
    return (
        <div id="loginPage" className="bg-yellow">
            <div className="conatiner loginPage vhContainer ">
                <div className="side">
                    <Link to="/" style={{ pointerEvents: 'none' }}><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></Link >
                    <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
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