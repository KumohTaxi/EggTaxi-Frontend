import Footer from "../footers/Footer";
import './LoginPage.css';
import LoginForm from "../forms/LoginForm";

const LoginPage=()=>{

    return(
        <div id="loginmain">
            <img className="loginLogo" src="imgs/ET_Logo.png" alt="이미지를 불러오지 못했습니다."/>
            <div className="LoginForm">
                {<LoginForm/>}
            </div>
            <img className="loginCompanyName" src="imgs/company_name_white.png" alt="이미지를 불러오지 못했습니다."/>
        </div>
    );
}

export default LoginPage;