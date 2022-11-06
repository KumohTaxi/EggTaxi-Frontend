import React, {useState} from 'react';
import '../../styles/forms/MyForm.css';
import axios from 'axios';
import { PROXY } from '../../../egg-taxi/contexts/ProxyContext';
import { useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../../../egg-taxi/oauths/OAuth';
// access_token
const MyForm=({show})=>{
    const navigate = useNavigate();
    const [loginButton] = useState()

    const myFormClick = (e) => {
        e.stopPropagation();
    }

    const myFormButtonText = () => {
        if(localStorage.getItem('access_token')) return '로그아웃'
        return 'Login with Kakao'
    }

    const bsdSignOut = () => {
        if(window.confirm('회원탈퇴를 하시겠습니까?')){
            axios({
                method:'post',
                url:`${PROXY}/member/unlink`,
                data:{
                    accessToken: localStorage.getItem('access_token'),
                },
                headers:{
                    'ContentType':'application/json'
                },
            })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate(`/`);
            })
            .catch(() => {
                alert("탈퇴에 실패하였습니다.");
                window.location.replace('/bsd/main');
            })
        }
    }

    const bsdLoginBtnClick = () => {
        if(localStorage.getItem('access_token')){
            if(window.confirm('로그아웃 하시겠습니까?')){
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate(`/`);
            }
            return;
        }
        if(window.confirm('카카오톡 계정으로 로그인을 시도합니다.\n로그인하시겠습니까?')){
            localStorage.setItem('login_page', 'bsd');
            window.location.replace(`${KAKAO_AUTH_URL}`);
        }
    }

    const myFormButton = () => {
        return(
            <div className='myForm_button_group'>
                <button className={['hideLogin', show && 'showLogin'].join(' ')} onClick={()=>bsdLoginBtnClick()}>
                    {myFormButtonText()}
                </button>
                {localStorage.getItem('access_token') && <button className={['hideSignup', show && 'showSignup'].join(' ')}
                onClick={()=>bsdSignOut()}>
                    회원 탈퇴
                    </button>}
            </div>
        )
    }

    return(
        <div onClick={(e)=>myFormClick(e)} className={['hideMyForm', show && 'showMyForm'].join(' ')}>
            {myFormButton()}
        </div>
    );
}

export default MyForm;