import Navbars from "../bars/Navbars";
import Map from "../maps/Map";
import Footer from "../footers/Footer";
import './MainPage.css';
import { useEffect, useContext } from "react";
import axios from "axios";
import { PROXY } from "../../contexts/ProxyContext";
import { GetContext } from "../../contexts/GetContext";

const MainPage=()=>{
    const { setIsListInfo } = useContext(GetContext);

    useEffect(()=>{
        if(localStorage.getItem("access_token") === null){
            window.location.replace('/');
        }
    }, [])

    useEffect(()=>{
        axios({
            method:'post',
            url:`${PROXY}/group`,
            data:{
                accessToken: localStorage.getItem('access_token'),
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then((response) => {
            if(response.data[0].errorCode === 1005){
                alert('세션이 만료되었습니다.\n 로그인 페이지로 이동합니다.')
            }
            else{
                setIsListInfo(response.data);
            }
        })
    }, []);

    return(
        <div className='Main'>
            <div className='Navbars'>
                {<Navbars/>}
            </div>
            <div className='Map'>
                {<Map/>}
            </div>
            <div className='Footer'>
                {<Footer/>}
            </div>
        </div>
    );
}

export default MainPage;