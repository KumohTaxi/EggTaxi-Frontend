import Footer from "../components/Footers/Footer";
import minFooter from "../components/Footers/minFooter";
import { useMediaQuery } from "react-responsive"
import './LoginPage.css';
import LoginForm from "../forms/LoginForm";

const LoginPage=()=>{
    const isPc = useMediaQuery({
        query : "(min-width:351px)"
    });
    const isMobile = useMediaQuery({
    query : "(max-width:350px)"
    });

    return(
        <div id='Login'>
            <div id="loginmain">
                <div className="logintop">
                    <img className='loginLogo' src="imgs/Taxi-Logo.png"/>
                </div>
                <div className="loginmiddle">
                    <div className="LoginForm">
                        {LoginForm()}
                    </div>
                </div>
            </div>
            <div className='Footer'>
                {isPc && Footer()}
                {isMobile && minFooter()}
            </div>
        </div>
    );
}

export default LoginPage;