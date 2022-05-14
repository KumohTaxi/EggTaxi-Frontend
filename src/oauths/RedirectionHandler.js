import axios from "axios";
import React, { useEffect } from "react";
import {Spinner} from 'react-bootstrap';
import './RedirectionHandler.css';
import { PROXY } from "../contexts/ProxyContext";

const RedirectionHandler = ({ history }) => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
        console.log("resize");
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

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
                history.push('/');
            }
            else if(res.data.accessToken === 'genderless' || res.data.refreshToken === 'genderless'){
                alert("성별이 없습니다.");

                const ACCESS_TOKEN = res.data.accessToken;
                const REFRESH_TOKEN = res.data.refreshToken;

                localStorage.setItem("access_token", ACCESS_TOKEN);
                localStorage.setItem("refresh_token", REFRESH_TOKEN);

                history.push('/main');
            }
            else{
                const ACCESS_TOKEN = res.data.accessToken;
                const REFRESH_TOKEN = res.data.refreshToken;
    
                localStorage.setItem("access_token", ACCESS_TOKEN);
                localStorage.setItem("refresh_token", REFRESH_TOKEN);
    
                history.push('/main');
            }
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