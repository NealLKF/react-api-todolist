
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="bg-yellow">
            <div className="conatiner loginPage vhContainer">
                <div className="side">
                    <a href="#!"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
                    <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
                </div>
                <div>
                    <form className="formControls" action="index.html">
                        <h1 className="formControls_txt">404 - 無效頁面</h1>
                        <NavLink className="formControls_btnLink" to="/">回到首頁</NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;