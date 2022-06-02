import './LoginPage.css';
import LoginForm from "../forms/LoginForm";
import { useEffect, useState } from "react";
import GuideModal from '../modals/submodals/guide_modals/GuideModal';

const LoginPage=()=>{
    const [isGuide, setIsGuide] = useState(true);
    const madebyHref = window.location.href + 'madeby';

    useEffect(()=>{
        if(localStorage.getItem('guide_check') === null){
            localStorage.setItem("guide_check", true); 
        }
    })

    return(
        <div id="loginmain">
            <div className='loginHeader'>
                <img className="loginLogo" src="imgs/ET_Logo.png" alt="이미지를 불러오지 못했습니다."/>
            </div>
            <div className="LoginForm">
                {<LoginForm/>}
            </div>
            <div className='loginFooter'>
                <div className='collaboLogo'>
                    <img className="loginCompanyName" src="imgs/company_name_white.png" alt="이미지를 불러오지 못했습니다."/>
                    <img className='xLogo' src='imgs/Close.png' alt='이미지를 불러오지 못했습니다.'/>
                    <img className='likelionLogo' src='imgs/likelion.png' alt='이미지를 불러오지 못했습니다.'/>
                </div>
                <div className='appInfo'>
                    <div className='version'>
                        v1.3.16-beta
                    </div>
                    <div className='madeby' onClick={()=>{window.location.href = madebyHref;}}>
                        made by
                    </div>
                </div>
            </div>

            <GuideModal
                show = {isGuide}
                onHide = {() => setIsGuide(false)}
            />
        </div>
    );
}

export default LoginPage;