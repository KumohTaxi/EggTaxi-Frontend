import {Modal, Button, Form, Badge} from 'react-bootstrap';
import './MakeModal.css';
import React, { useState } from 'react';

const MakeModal=(props)=>{

    var todayDate = new Date();
    const [today, settoday] = useState(todayDate);

    const goToday=()=>{
        settoday(todayDate);
    }

    const goTomorrow=()=>{
        var tomorrow = new Date(todayDate.setDate(todayDate.getDate() + 1));
        settoday(tomorrow);
    };

    return(
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
                    <div className='subcontent'>
                        <Badge id='todaydate' bg="light" text="dark">{today.getFullYear()}년 {today.getMonth()+1}월 {today.getDate()}일</Badge>
                        <div className='buttonDate'>
                            <Button onClick={goToday}>오늘</Button>
                            <Button onClick={goTomorrow}>내일</Button>
                        </div>
                    </div>
                </div>
                <div className='MakeTime'>
                    <div className='subtitle'>
                        시간
                    </div>
                    <div className="vr" />
                    <div className='subcontent'>
                        <div className='choiceHour'>
                            <Form.Control placeholder={today.getHours()}/>
                            <p>
                                시
                            </p>
                        </div>
                        <div className='choiceMinute'>
                            <Form.Select defaultValue={(parseInt(today.getMinutes()/10+1)*10).toString()}>
                                <option>0</option>
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>
                                <option>50</option>
                            </Form.Select>
                            <p>
                                분
                            </p>
                        </div>
                    </div>
                </div>
                <div className='MakeDestination'>
                    <div className='subtitle'>
                        목적지
                    </div>
                    <div className="vr" />
                    <div className='subcontent'> 
                        <Form.Control placeholder="EX) 구미역 후문"/>
                    </div>
                </div>
                <div className='MakeOther'>
                    <div className='subtitle'>
                        참가자 설정
                    </div>
                    <div className="vr" />
                    <div className='otherContent'>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="학교인증 여부"
                            onChange={()=>console.log("yes")}
                        />
                        <div className='genderchoice'>
                            <p>
                                성별 여부
                            </p>
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="상관없음"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label="남자만"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                    <Form.Check
                                        inline
                                        label="여자만"
                                        name='group1'
                                        type={type}
                                        id={`inline-${type}-3`}
                                    />
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div>               
                </div>
            </Modal.Body>

            <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button onClick={props.onHide}>Make</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MakeModal;