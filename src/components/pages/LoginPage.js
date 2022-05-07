import Footer from "../footers/Footer";
import './LoginPage.css';
import LoginForm from "../forms/LoginForm";

const LoginPage=()=>{

    return(
        <div id='Login'>
            <div id="loginmain">
                <div className="logintop">
                    <img className='loginLogo' src="imgs/ET_Logo.png" alt="이미지를 불러오지 못했습니다."/>
                </div>
                <div className="loginmiddle">
                    <div className="LoginForm">
                        {<LoginForm/>}
                    </div>
                </div>
            </div>
            <div className='Footer'>
                {<Footer/>}
            </div>
        </div>
    );
}

export default LoginPage;