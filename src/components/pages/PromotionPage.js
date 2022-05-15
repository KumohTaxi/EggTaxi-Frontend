import './PromotionPage.css';
import { useEffect, useState } from 'react';
import { KAKAO_AUTH_URL } from '../../oauths/OAuth';
import { PROXY } from '../../contexts/ProxyContext';
import axios from 'axios';
import {Modal, Button, Badge} from 'react-bootstrap';

const PromotionPage=()=> {
    const [isMemberCount, setIsMemberCount] = useState();
    const [isMonth, setIsMonth] = useState();
    const [isDay, setIsDay] = useState();
    const [isHour, setIsHour] = useState();
    const [isMinute, setIsMinutes] = useState();
    const [isDestination, setIsDestination] = useState();

    useEffect(()=>{
        localStorage.setItem("promotion", true);
        localStorage.setItem("promotionLink", document.location.href);

        if(localStorage.getItem("access_token") === null){
            alert('로그인 정보가 없습니다. 카카오톡 로그인으로 이동합니다.')
            window.location.href= KAKAO_AUTH_URL;
        }
        else{
            localStorage.removeItem("promotion");
            localStorage.removeItem("promotionLink");

            axios({
                method:'get',
                url:`${PROXY}/group/${window.location.pathname[11]}/link`,
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
            })
        }
    }, [])

    function Cancel(){
        window.location.replace('/');
    }
    function Agree(){
        axios({
            method:'post',
            url:`${PROXY}/./group/${window.location.pathname[11]}`,
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
            alert("참가 할 수 없는 방입니다.");
            window.location.replace('/');
        })
    }

    return(
        <div className='PromotionModal'>
            <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            >
                <Modal.Header style={{backgroundColor: "#212428"}}>
                    <Modal.Title className='proTitle' id="contained-modal-title-vcenter">
                    그룹 참가하기
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='proMiddle'>
                    <div className='proscrollBox'>
                        <div className= 'propersonBox'>
                            <div className='proSubTitle'>
                                <span>
                                    인원
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='proSubContent'>
                                <Badge bg="light" text="dark">{isMemberCount} / 4명</Badge>
                            </div>
                        </div>
                        <div className='prodestiBox'>
                            <div className='proSubTitle'>
                                <span>
                                    목적지
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='proSubContent'>
                                <Badge bg="light" text="dark">{isDestination}</Badge>
                            </div>
                        </div>
                        <div className='protimeBox'>
                            <div className='proSubTitle'>
                                <span>
                                    출발시각
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='proSubContent'>
                                <Badge bg="light" text="dark">{isMonth}월 {isDay}일 &nbsp;/&nbsp; {isHour}시 {isMinute}분</Badge>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className='proFooter' style={{backgroundColor: "#FFFCEE"}}>
                    <Button variant="dark" className='proBottomButtonLeft' onClick={Cancel}>취소</Button>
                    <Button variant="light" className='proBottomButtonRight' onClick={Agree}>참가</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PromotionPage;