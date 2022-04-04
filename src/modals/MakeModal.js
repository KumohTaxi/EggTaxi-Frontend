import {Modal, Button, Form, Badge} from 'react-bootstrap';
import './MakeModal.css';
import React, { useContext, useState } from 'react';
import { MakeContext } from '../contexts/MakeContext';

const MakeModal=(props)=>{
    const {isMake, setIsMake} = useContext(MakeContext);

    var todayDate = new Date();

    const [Year, setYear] = useState(todayDate.getFullYear());
    const [Month, setMonth] = useState(todayDate.getMonth()+1);
    const [Day, setDay] = useState(todayDate.getDate());
    const [Hour, setHour] = useState(todayDate.getHours());
    const [Minute, setMinute] = useState((parseInt(todayDate.getMinutes()/10+1)*10).toString());
    const [Destination, setDestination] = useState("");
    // const [Auth, setAuth] = useState("NO");
    // const [Gender, setGender] = useState("");

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

    const exceptionTime=()=>{
        if(parseInt(Hour) >= 10 && parseInt(Hour) <= 22 && parseInt(Minute) >= 0 && parseInt(Minute) <= 59){
            props.onHide();
            console.log(Year+"\n"+Month+"\n"+Day+"\n"+Hour+"\n"+Minute+"\n"+Destination);
            setIsMake(!isMake);
        }
        else{
            alert("시간을 알맞은 범위 내로 설정해주세요.");
        }
    }

    // const CheckANY=()=>{
    //     setGender("ANY")
    // };
    // const CheckMALE=()=>{
    //     setGender("MALE")
    // };
    // const CheckFEMALE=()=>{
    //     setGender("FEMALE")
    // };

    // const FormCheck=()=>{
    //     return(
    //         <div className='genderchoice'>
    //             <p className='genderP'>
    //                 성별 여부
    //             </p>
    //             <Form className='formchecks'>
    //                 {['radio'].map((type) => (
    //                     <div key={`inline-${type}`} className="mb-3">
    //                     <Form.Check
    //                         inline
    //                         onClick={CheckANY}
    //                         label="상관없음"
    //                         name="group1"
    //                         type={type}
    //                         id={`inline-${type}-1`}
    //                     />
    //                     <Form.Check
    //                         inline
    //                         onClick={CheckMALE}
    //                         label="남자만"
    //                         name="group1"
    //                         type={type}
    //                         id={`inline-${type}-2`}
    //                     />
    //                     <Form.Check
    //                         inline
    //                         onClick={CheckFEMALE}
    //                         label="여자만"
    //                         name='group1'
    //                         type={type}
    //                         id={`inline-${type}-3`}
    //                     />
    //                     </div>
    //                 ))}
    //             </Form>
    //         </div>
    //     );
    // };

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
                        <div className='subcontent'>
                            <Badge id='todaydate' bg="light" text="dark">{Year}년 {Month}월 {Day}일</Badge>
                            <div className='buttonDate'>
                                <Button variant="outline-dark" className='buttonDateLeft' onClick={goToday}>오늘</Button>
                                <Button variant="outline-dark" className='buttonDateRight' onClick={goTomorrow}>내일</Button>
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
                                <Form.Control className='inputHour' placeholder={Hour} onChange={(event)=> setHour(event.target.value)}/>
                                <Badge className='timeP' bg='light' text='dark'>시</Badge>
                            </div>
                            <div className='choiceMinute'>
                                <Form.Control className='inputMinute' placeholder={Minute} onChange={(event)=> setMinute(event.target.value)}/>
                                <Badge className='timeP' bg='light' text='dark'>분</Badge>
                            </div>
                        </div>
                    </div>
                    <div className='MakeDestination'>
                        <div className='subtitle'>
                            목적지
                        </div>
                        <div className="vr" />
                        <div className='subcontent'> 
                            <Form.Control className='inputDestination' placeholder="EX) 구미역 후문" onChange={(event)=> setDestination(event.target.value)}/>
                        </div>
                    </div>
                    {/* <div className='MakeOther'>
                        <div className='subtitle' style={{whiteSpace: "pre-wrap"}}>
                            참가자{"\n"}설정
                        </div>
                        <div className="vr" />
                        <div className='otherContent'>
                            <div className='univSwitch'>
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label="학교인증 여부"
                                    onChange={()=>{
                                        setcheckHidden(!checkHidden);
                                        Auth === "YES" ? setAuth("NO") : setAuth("YES");
                                    }}
                                />
                            </div>
                            {checkHidden && <FormCheck />}
                        </div>               
                    </div> */}
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