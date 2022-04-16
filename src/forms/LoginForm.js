import axios from 'axios';
import './LoginForm.css';
import { KAKAO_AUTH_URL } from '../components/OAuths/OAuth';

const LoginForm =()=>{

    const L_function = () =>{
        var setId = 'asd'
        var setPw = 'asd'
        console.log("로그인 시도");
        axios({
            method:'post',
            url:'./start',
            data:{id:setId, password:setPw},
            headers:{
                'ContentType':'appliction/json'
            },
        })
        .then(() => {
            alert("성공");
        })
        .catch(() => {
            alert("실패");
        })
    }
  
    return(
        <div className='buttonGroup'>
            <a href={KAKAO_AUTH_URL}>
                <img src='imgs/kakao_login_large_wide.png' onClick={L_function}></img>
            </a>
        </div>
    )
}

export default LoginForm;