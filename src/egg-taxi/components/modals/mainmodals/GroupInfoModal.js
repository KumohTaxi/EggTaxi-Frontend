import {Modal, Button, Badge} from 'react-bootstrap';
import './GroupInfoModal.css';
import React from 'react';
import axios from 'axios';
import { PROXY } from '../../../contexts/ProxyContext';

const GroupInfoModal=(props)=>{

    function joinGroup(){
        if(localStorage.getItem("mygroupid")){
            alert("이미 참가한 그룹이 있습니다.")
        }
        else{
            axios({
                method:'post',
                url:`${PROXY}/group/${props.id}`,
                data:{
                    accessToken: localStorage.getItem('access_token'),
                },
                headers:{
                    'ContentType':'application/json'
                },
            })
            .then((res) => {
                alert("그룹에 참가했습니다.:");
                localStorage.setItem("mygroupid", res.data);
                window.location.replace('/main');
            })
            .catch(() => {
                alert("참가 할 수 없는 그룹입니다.");
            })
        }
    };

    return(
        <div>
            <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header style={{backgroundColor: "#212428"}}>
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
                    <Button className='GroupInfoButtonLeft' variant='dark' onClick={()=>{props.onHide();}}>취소</Button>
                    <Button className='GroupInfoButtonRight' variant='light'
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