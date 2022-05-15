import {Modal, Button, Badge, InputGroup, FormControl} from 'react-bootstrap';
import './MyGroupModal.css';
import { useState } from 'react';
import WarningModal from '../submodals/WarningModal';

const MyGroupModal=(props)=>{
    const [isWarningView, setIsWarningView] = useState(false);
    return(
        <div>
            <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header style={{backgroundColor: "#212428"}}>
                    <Modal.Title className='MyTitle' id="contained-modal-title-vcenter">
                    My Group
                    </Modal.Title>
                    <button className='CopyUrlButton'>
                        Copy Link
                    </button>
                </Modal.Header>

                <Modal.Body className='MyMiddle'>
                    <div className='scrollBox'>
                        <div className= 'personBox'>
                            <div className='mySubTitle'>
                                <span>
                                    인원
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='mySubContent'>
                                <Badge bg="light" text="dark">{props.mycount} / 4명</Badge>
                            </div>
                        </div>
                        <div className='destiBox'>
                            <div className='mySubTitle'>
                                <span>
                                    목적지
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='mySubContent'>
                                <Badge bg="light" text="dark">{props.mydestination}</Badge>
                            </div>
                        </div>
                        <div className='timeBox'>
                            <div className='mySubTitle'>
                                <span>
                                    출발시각
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='mySubContent'>
                                <Badge bg="light" text="dark">{props.mymonth}월 {props.myday}일 &nbsp;/&nbsp; {props.myhour}시 {props.myminute}분</Badge>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className='MyFooter' style={{backgroundColor: "#FFFCEE"}}>
                    <Button variant="dark" className='MyBottomButtonLeft' onClick={()=>{props.onHide(); setIsWarningView(true);}}>그룹 나가기</Button>
                    <Button variant="light" className='MyBottomButtonRight' onClick={()=>{props.onHide();}}>확인</Button>
                </Modal.Footer>
            </Modal>

            <WarningModal
                show={isWarningView}
                onHide={()=>{setIsWarningView(false)}}
                myid={props.myid}
            />
        </div>
        
    );
}

export default MyGroupModal;