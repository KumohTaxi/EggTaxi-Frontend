import {Modal, Button, Form, Badge} from 'react-bootstrap';
import './MakeModal.css';
import React, { useContext, useState } from 'react';
import { MakeContext } from '../contexts/MakeContext';
import { LatLngContext } from '../contexts/LatLngContexts';
import axios from 'axios';

const MakeModal=(props)=>{
    const {isMake, setIsMake} = useContext(MakeContext);
    const {isLatLng} = useContext(LatLngContext);

    var todayDate = new Date();

    const [Year, setYear] = useState(todayDate.getFullYear());
    const [Month, setMonth] = useState(todayDate.getMonth()+1);
    const [Day, setDay] = useState(todayDate.getDate());
    const [Hour, setHour] = useState(todayDate.getHours());
    const [Minute, setMinute] = useState((parseInt(todayDate.getMinutes()/10+1)*10).toString());
    const [Destination, setDestination] = useState(null);

    const goToday=()=>{
        if(Day !== todayDate.getDate()){
            setYear(todayDate.getFullYear());
            setMonth(todayDate.getMonth()+1);
            setDay(todayDate.getDate());
        }
    }
    const goTomorrow=()=>{
        if(Day === todayDate.getDate()){
            var tomorrowDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
            setYear(tomorrowDate.getFullYear());
            setMonth(tomorrowDate.getMonth()+1);
            setDay(tomorrowDate.getDate());
        }
    };

    const transRoomInfoApi = () => {
        
        // 정보 전달 전 데이터 형식 변환
        let trMonth = Month < 10 ? "0"+Month : Month;
        let trDay = Day < 10 ? "0"+Day : Day;
        let trHour = Hour < 10 ? "0"+Hour : Hour;
        let trMinute = Minute < 10 ? "0"+Minute : Minute;

        // 포스트 방식 정보 전달
        axios({
            method:'post',
            url:'./room/new',
            data:{
                destination: Destination,
                dateTime: Year+"-"+trMonth+"-"+trDay+"T"+trHour+":"+trMinute,
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

        console.log(Year+"-"+trMonth+"-"+trDay+"T"+trHour+":"+trMinute);
    }

    const exceptionTime=()=>{
        if(parseInt(Hour) >= 10 && parseInt(Hour) < 22 && parseInt(Minute) >= 0 && parseInt(Minute) < 60
        && Destination !== null){
            props.onHide();
            setIsMake(!isMake);
            console.log(Year+"\n"+Month+"\n"+Day+"\n"+Hour+"\n"+Minute+"\n"+Destination+"\n"+isLatLng);
            // 방 정보 전송하는 API
            transRoomInfoApi();   
        }
        else if(Destination === null){
            alert("목적지를 입력하여주세요.");
        }
        else{
            alert("시간을 알맞은 범위 내로 입력하여주세요.");
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
                    Make Room Modal
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='MakeDate'>
                        <div className='subtitle'>
                            날짜
                        </div>
                        <div className="vr" />
                        <div>
                            <div className='subcontent'>
                                <Badge id='todaydate' bg="light" text="dark">{Year}년 {Month}월 {Day}일</Badge>
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
                            시간
                        </div>
                        <div className="vr" />
                        <div>
                            <div className='subcontent'>
                                <div className='choiceHour'>
                                    <Form.Control className='inputHour' placeholder={Hour} maxLength={2}
                                    onChange={(event)=> setHour(event.target.value)}/>
                                    <Badge className='timeP' bg='light' text='dark'>시</Badge>
                                </div>
                                <div className='choiceMinute'>
                                    <Form.Control className='inputMinute' placeholder={Minute===60?0:Minute} maxLength={2}
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
                            목적지
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

export default MakeModal;