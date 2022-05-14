import './LoginPage.css';
import LoginForm from "../forms/LoginForm";
import { useEffect, useState } from "react";
import GuideModal from '../modals/submodals/GuideModal';

const LoginPage=()=>{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
        console.log("resize");
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    const [isGuide, setIsGuide] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem('guide_check') === null){
            localStorage.setItem("guide_check", true); 
        }
    })

    return(
        <div id="loginmain">
            <img className="loginLogo" src="imgs/ET_Logo.png" alt="이미지를 불러오지 못했습니다."/>
            <div className="LoginForm">
                {<LoginForm/>}
            </div>
            <img className="loginCompanyName" src="imgs/company_name_white.png" alt="이미지를 불러오지 못했습니다."/>

            <GuideModal
                show = {isGuide}
                onHide = {() => setIsGuide(false)}
            />
        </div>
    );
}

export default LoginPage;