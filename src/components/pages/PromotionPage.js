import '../../styles/components/pages/PromotionPage.css';
import { useEffect, useState } from 'react';
import { PROXY } from '../../contexts/ProxyContext';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import PromotionMap from '../maps/PromotionMap';
import { useParams } from 'react-router-dom';

const PromotionPage=()=> {
    let {groupid} = useParams();

    const [isMemberCount, setIsMemberCount] = useState();
    const [isMonth, setIsMonth] = useState();
    const [isDay, setIsDay] = useState();
    const [isHour, setIsHour] = useState();
    const [isMinute, setIsMinutes] = useState();
    const [isDestination, setIsDestination] = useState();
    const [isLat, setIsLat] = useState();
    const [isLng, setIsLng] = useState();

    useEffect(()=>{
        if(!localStorage.getItem("access_token")){
            localStorage.setItem("promotion", true);
            localStorage.setItem("promotionLink", document.location.href);
        }
        axios({
            method:'get',
            url:`${PROXY}/group/${groupid}`,
            headers:{
                'ContentType':'application/json'
            },
        })
        .then((res) => {
            setIsMemberCount(res.data.memberCount);
            setIsMonth(res.data.dateTime[5]+res.data.dateTime[6]);
            setIsDay(res.data.dateTime[8]+res.data.dateTime[9]);
            setIsHour(res.data.dateTime[11]+res.data.dateTime[12]);
            setIsMinutes(res.data.dateTime[14]+res.data.dateTime[15]);
            setIsDestination(res.data.destination);
            setIsLat(res.data.latitude);
            setIsLng(res.data.longitude);
        })
    }, [])

    function Cancel(){
        window.location.replace('/');
    }
    function CheckAgree(){
        if(!localStorage.getItem("access_token")){
            if(window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하겠습니까?") == true){
                window.location.replace('/');
            }
        }
        else{
            localStorage.removeItem("promotion");
            localStorage.removeItem("promotionLink");
            Agree();
        }
    }
    function Agree(){
        if(localStorage.getItem("mygroupid")){
            alert("이미 참가한 그룹이 있습니다.");
            window.location.replace('/main');
        }
        else{
            axios({
                method:'post',
                url:`${PROXY}/./group/${groupid}`,
                data:{
                    accessToken: localStorage.getItem('access_token'),
                },
                headers:{
                    'ContentType':'application/json'
                },
            })
            .then(() => {
                window.location.replace('/main');
            })
            .catch(() => {
                alert("성별이 다른 그룹이거나, 인원이 가득차 참가가 어렵습니다. 죄송합니다.");
                window.location.replace('/');
            })
        }
    }

    return(
        <div className='PromotionModal'>
            <div className='proTop'>
                <div className='proInfo'>
                    <div className='proInfoName'>
                        인원
                    </div>
                    <div className='proInfoContent'>
                        <span className='proSpan'>
                        {isMemberCount} / 4명
                        </span>
                    </div>
                </div>
                <div className='proInfo'> 
                    <div className='proInfoName'>
                        목적지
                    </div>
                    <div className='proInfoContent'>
                        <span className='proSpan'>
                        {isDestination}
                        </span>
                    </div>
                </div>
                <div className='proInfo'>
                    <div className='proInfoName'>
                        출발시간
                    </div>
                    <div className='proInfoContent'>
                        <span className='proSpan'>
                        {isMonth}월 {isDay}일 &nbsp;/&nbsp; {isHour}시 {isMinute}분
                        </span>
                    </div>
                </div>
                <div className='proInfoSub'>
                ▼ 출발 위치 ▼
                </div>
            </div>
            <div className='proMiddle'>
                <PromotionMap 
                proLat = {isLat}
                proLng = {isLng}
                />
            </div>
            <div className='proBottom'>
                <Button variant='dark' className='proleftbutton' onClick={Cancel}>
                    취소
                </Button>
                <Button variant='light' className='prorightbutton' onClick={CheckAgree}>
                    그룹 참가
                </Button>
            </div>
        </div>
    );
}

export default PromotionPage;