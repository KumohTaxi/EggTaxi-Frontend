import axios from 'axios';
import {Button} from 'react-bootstrap';
import './LoginForm.css';

const LoginForm =()=>{

    const L_function = () =>{
        var setId = 'asd'
        var setPw = 'asd'
        console.log("asdasd");
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
            <img src='imgs/kakao_login_large_wide.png' onClick={L_function}></img>
        </div>
    )
}

export default LoginForm;