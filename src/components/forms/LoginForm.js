import './LoginForm.css';
import { KAKAO_AUTH_URL } from '../../oauths/OAuth';

const LoginForm =()=>{
  
    return(
        <div className='buttonGroup'>
            <a href={KAKAO_AUTH_URL}>
                <img src='imgs/kakao_login_large_wide.png'></img>
            </a>
        </div>
    )
}

export default LoginForm;