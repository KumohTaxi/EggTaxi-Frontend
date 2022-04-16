import axios from "axios";
import React, { useEffect } from "react";
import {Spinner} from 'react-bootstrap';
import './RedirectHandler.css';

const RedirectHandler = ({ history }) => {
    let code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {   
        console.log(code);
        
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
            console.log(res);
            history.push('/main');
        })
        .catch(()=>{
            history.push('/');
        })
    }, []);

    return (
        <div className="spinnerBox">
            <Spinner className="spinner" animation="border" />
        </div>
    );
};

export default RedirectHandler;