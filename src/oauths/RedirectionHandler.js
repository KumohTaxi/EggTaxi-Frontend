import axios from "axios";
import React, { useEffect } from "react";
import {Spinner} from 'react-bootstrap';
import './RedirectionHandler.css';

const RedirectionHandler = ({ history }) => {
    let code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        axios({
            method: "POST",
            url: "/auth/kakao",
            data:{
                authCode : code,
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then((res)=>{
            console.log(res.data.accessToken);
            console.log(res.data.refreshToken);
            
            const ACCESS_TOKEN = res.data.accessToken;
            const REFRESH_TOKEN = res.data.refreshToken;

            localStorage.setItem("access_token", ACCESS_TOKEN);
            localStorage.setItem("refresh_token", REFRESH_TOKEN);

            history.push('/main');
        })
        .catch(()=>{
            alert("로그인에 실패하였습니다.");
            history.push('/');
        })
    }, []);

    return (
        <div className="spinnerBox">
            <Spinner className="spinner" animation="border" />
        </div>
    );
};

export default RedirectionHandler;