import './LoginForm.css';
import { KAKAO_AUTH_URL } from '../../oauths/OAuth';

const LoginForm =()=>{
  
    return(
        <div className='buttonGroup'>
            <a href={KAKAO_AUTH_URL}>
                <img src='imgs/kakao_login_large_wide.png' alt='이미지를 불러오지 못했습니다.'></img>
            </a>
        </div>
    )
}

export default LoginForm;