import {Modal, Button, Badge} from 'react-bootstrap';
import './GroupInfoModal.css';
import React from 'react';
import axios from 'axios';

const GroupInfoModal=(props)=>{

    function joinGroup(){
        axios({
            method:'post',
            url:`./group/${props.id}`,
            data:{
                accessToken: localStorage.getItem('access_token'),
            },
            headers:{
                'ContentType':'appliction/json'
            },
        })
        .then(() => {
            alert("입장 성공");
        })
        .catch(() => {
            alert("입장 실패");
        })
    };
    function exitGroup(){
        axios({
            method:'post',
            url:`./group/${props.id}/exit`,
            data:{
                accessToken: localStorage.getItem('access_token'),
            },
            headers:{
                'ContentType':'appliction/json'
            },
        })
        .then(() => {
            alert("퇴장 성공");
        })
        .catch(() => {
            alert("퇴장 실패");
        })
    };

    return(
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header style={{backgroundColor: "#282828"}}>
                    <Modal.Title className='GroupInfoTitle' id="contained-modal-title-vcenter">
                        Group Infomation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className= 'GIpersonBox'>
                        <div className='GISubTitle'>
                            <span>
                                인원
                            </span>
                        </div>
                        <div className="vr" />
                        <div className='GISubContent'>
                            <Badge bg="light" text="dark">{props.count} / 4명</Badge>
                        </div>
                    </div>
                    <div className='GIdestiBox'>
                        <div className='GISubTitle'>
                            <span>
                                목적지
                            </span>
                        </div>
                        <div className="vr" />
                        <div className='GISubContent'>
                            <Badge bg="light" text="dark">{props.destination}</Badge>
                        </div>
                    </div>
                    <div className='GItimeBox'>
                        <div className='GISubTitle'>
                            <span>
                                출발시각
                            </span>
                        </div>
                        <div className="vr" />
                        <div className='GISubContent'>
                            <Badge bg="light" text="dark">{props.month}월 {props.day}일 &nbsp;/&nbsp; {props.hour}시 {props.minute}분</Badge>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button className='GroupInfoButtonLeft' onClick={()=>{props.onHide(); exitGroup();}}>취소</Button>
                    <Button className='GroupInfoButtonRight' 
                        onClick={() => {
                            props.onHide();
                            joinGroup();
                            }}>참가</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default GroupInfoModal;