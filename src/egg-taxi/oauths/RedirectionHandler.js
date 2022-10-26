import axios from "axios";
import React, { useEffect } from "react";
import {Spinner} from 'react-bootstrap';
import '../styles/oauths/RedirectionHandler.css';
import { PROXY } from "../contexts/ProxyContext";
import { useNavigate } from "react-router-dom";

const RedirectionHandler = () => {
    const navi = useNavigate();

    let code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        axios({
            method: "POST",
            url: `${PROXY}/auth/kakao`,
            data:{
                authCode : code,
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then((res)=>{
            if(res.data.accessToken === null || res.data.refreshToken === null){
                alert("로그인에 실패하였습니다.");
                navi(`/taxi-login`);
            }
            else if(res.data.accessToken === 'genderless' || res.data.refreshToken === 'genderless'){
                alert("성별 선택을 하지 않으셨습니다.\n 그룹만들기를 눌러 추가 동의를 받으시거나,\n 회원 탈퇴 후 재 동의 부탁드릴게요!");

                const ACCESS_TOKEN = res.data.accessToken;
                const REFRESH_TOKEN = res.data.refreshToken;

                localStorage.setItem("access_token", ACCESS_TOKEN);
                localStorage.setItem("refresh_token", REFRESH_TOKEN);

                navi(`/main`);
            }
            else if(localStorage.getItem("promotion") === 'true'){
                const ACCESS_TOKEN = res.data.accessToken;
                const REFRESH_TOKEN = res.data.refreshToken;

                localStorage.setItem("access_token", ACCESS_TOKEN);
                localStorage.setItem("refresh_token", REFRESH_TOKEN);

                window.location.href= localStorage.getItem("promotionLink");
            }
            else{
                const ACCESS_TOKEN = res.data.accessToken;
                const REFRESH_TOKEN = res.data.refreshToken;
    
                localStorage.setItem("access_token", ACCESS_TOKEN);
                localStorage.setItem("refresh_token", REFRESH_TOKEN);
    
                navi(`/main`);
                alert('맵을 터치하여 그룹을 생성해 보세요!');
            }
        })
        .catch((err)=>{
            alert("로그인에 실패하였습니다.");
            navi(`/taxi-login`);
        });
    }, []);

    return (
        <div className="spinnerBox">
            <Spinner className="spinner" animation="border" />
        </div>
    );
};

export default RedirectionHandler;