import './LoginForm.css';
import { KAKAO_AUTH_URL } from '../../oauths/OAuth';
import {Button} from 'react-bootstrap';
import AppGuideModal from '../modals/submodals/guide_modals/AppGuideModal';
import { useState } from 'react';

const LoginForm =()=>{
    const [isAppGuide, setIsAppGuide] = useState(false);
  
    return(
        <div className='buttonGroup'>
            <a href={KAKAO_AUTH_URL}>
                <img src='imgs/kakao_login_large_wide.png' alt='이미지를 불러오지 못했습니다.'></img>
            </a>
            <Button className='AppDownload' onClick={()=>{setIsAppGuide(true)}}>
                App 설치 가이드
            </Button>

            <AppGuideModal
                show = {isAppGuide}
                onHide = {() => setIsAppGuide(false)}
            />
        </div>
    )
}

export default LoginForm;