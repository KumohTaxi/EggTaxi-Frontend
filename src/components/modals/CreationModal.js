import {Modal, Button, Form, Badge} from 'react-bootstrap';
import './CreationModal.css';
import React, { useContext, useState } from 'react';
import { MakeContext } from '../../contexts/MakeContext';
import { LatLngContext } from '../../contexts/LatLngContexts';
import axios from 'axios';

const CreationModal=(props)=>{
    const {isCreation, setIsCreation} = useContext(MakeContext);
    const {isLatLng} = useContext(LatLngContext);

    var todayDate = new Date();

    const [year, setYear] = useState(todayDate.getFullYear());
    const [month, setMonth] = useState(todayDate.getMonth()+1);
    const [day, setDay] = useState(todayDate.getDate());
    const [hour, setHour] = useState(todayDate.getMinutes()+10 >= 60 ? todayDate.getHours()+1 : todayDate.getHours());
    const [minute, setMinute] = useState(todayDate.getMinutes()+10 >= 60 ? todayDate.getMinutes()-50 : todayDate.getMinutes()+10);
    const [destination, setDestination] = useState(null);

    const goToday=()=>{
        if(day !== todayDate.getDate()){
            setYear(todayDate.getFullYear());
            setMonth(todayDate.getMonth()+1);
            setDay(todayDate.getDate());
        }
    }
    const goTomorrow=()=>{
        if(day === todayDate.getDate()){
            var tomorrowDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
            setYear(tomorrowDate.getFullYear());
            setMonth(tomorrowDate.getMonth()+1);
            setDay(tomorrowDate.getDate());
        }
    };

    const transGroupInfoApi = () => {
        
        // 정보 전달 전 데이터 형식 변환
        let conversionMonth = month < 10 ? "0"+month : month;
        let conversionDay = day < 10 ? "0"+day : day;
        let conversionHour = hour < 10 ? "0"+hour : hour;
        let conversionMinute = minute < 10 ? "0"+minute : minute;

        // 포스트 방식 정보 전달
        axios({
            method:'post',
            url:'./group/new',
            data:{
                destination: destination,
                dateTime: year+"-"+conversionMonth+"-"+conversionDay+"T"+conversionHour+":"+conversionMinute,
                latitude: isLatLng[0],
                longitude: isLatLng[1],
            },
            headers:{
                'ContentType':'appliction/json'
            },
        })
        .then(() => {
            alert("Make 성공");
        })
        .catch(() => {
            alert("Make 실패");
        })

        console.log(year+"-"+conversionMonth+"-"+conversionDay+"T"+conversionHour+":"+conversionMinute);
    }

    const exceptionTime=()=>{
        if(destination === null){
            alert("목적지를 입력하여주세요.");
        }
        else if(hour <10 || hour >= 22 || minute < 0 || minute >= 60
            || (day === todayDate.getDate() && hour < todayDate.getHours())
            || (day === todayDate.getDate() && hour === todayDate.getHours() && minute < todayDate.getMinutes()))
        {
            alert("시간을 알맞은 범위 내로 입력하여주세요."); 
        }
        else{
            // 방 정보 전송하는 API
            transGroupInfoApi();  
            props.onHide();
            console.log(year+"\n"+month+"\n"+day+"\n"+hour+"\n"+minute+"\n"+destination+"\n"+isLatLng); 
            setIsCreation(!isCreation);
            console.log("isMake update!");
        }
    }

    return(
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header style={{backgroundColor: "#282828"}}>
                    <Modal.Title className='MakeTitle' id="contained-modal-title-vcenter">
                    Make Group Modal 
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='MakeDate'>
                        <div className='subtitle'>
                            <p>날짜</p>
                        </div>
                        <div className="vr" />
                        <div>
                            <div className='subcontent'>
                                <Badge id='todaydate' bg="light" text="dark">{year}년 {month}월 {day}일</Badge>
                                <div className='buttonDate'>
                                    <Button variant="outline-dark" className='buttonDateLeft' onClick={goToday}>오늘</Button>
                                    <Button variant="outline-dark" className='buttonDateRight' onClick={goTomorrow}>내일</Button>
                                </div>
                            </div>
                            <p className='plusText'>날짜는 오늘과 내일만 선택 가능합니다.</p>
                        </div>
                    </div>
                    <div className='MakeTime'>
                        <div className='subtitle'>
                            <p>출발시각</p>
                        </div>
                        <div className="vr" />
                        <div>
                            <div className='subcontent'>
                                <div className='choiceHour'>
                                    <Form.Control className='inputHour' placeholder={hour} maxLength={2}
                                    onChange={(event)=> setHour(event.target.value)}/>
                                    <Badge className='timeP' bg='light' text='dark'>시</Badge>
                                </div>
                                <div className='choiceMinute'>
                                    <Form.Control className='inputMinute' placeholder={minute} maxLength={2}
                                    onChange={(event)=> setMinute(event.target.value)}/>
                                    <Badge className='timeP' bg='light' text='dark'>분</Badge>
                                </div>
                            </div>
                            <p className='plusText' >EX) 오후 1시 ➤ 13시</p>
                            <p className='plusText' >합승 제도 상 10시부터 22시까지 가능합니다.</p>
                        </div>
                    </div>
                    <div className='MakeDestination'>
                        <div className='subtitle'>
                            <p>목적지</p>
                        </div>
                        <div className="vr" />
                        <div>
                            <div className='subcontent'> 
                                <Form.Control className='inputDestination' placeholder="EX) 구미역 후문" maxLength={30} 
                                onChange={(event)=> setDestination(event.target.value)}/>
                            </div>
                            <p className='plusText'>목적지를 상세하게 입력하여 주세요.</p>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button className='MakeButtonLeft' onClick={props.onHide}>Cancel</Button>
                    <Button className='MakeButtonRight' onClick={exceptionTime}>Make</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreationModal;