import {Modal, Button, Badge} from 'react-bootstrap';
import './UserModal.css';
import React, { useEffect, useState } from 'react'
import LogeOutModal from '../submodals/LogeOutModal';
import { PROXY } from '../../../contexts/ProxyContext';
import axios from 'axios';

const UserModal=(props)=>{
    const [isLogeOut, setIsLogeOut] = useState(false);
    const [isUserCode, setIsUserCode] = useState();

    var OpenChatLink = 'https://open.kakao.com/o/s2mNNVde';

    function Yet(){
        alert('서비스 준비 중 입니다.')
    }
    function OpenChat(){
        window.location.href=OpenChatLink;
    }

    function getUserCode(){
        axios({
            method:'get',
            url:`${PROXY}/member/id`,
            data:{
                accessToken: localStorage.getItem('access_token'),
            },
            headers:{
                'ContentType':'appliction/json'
            },
        })
        .then((res) => {
            setIsUserCode(res.data.identityNum);
        })
    }

    useEffect(()=>{
        getUserCode();
    },[])

    return(
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header style={{backgroundColor: "#282828"}}>
                    <Modal.Title className='UserTitle' id="contained-modal-title-vcenter">
                    My Page
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='UserNameBox'>
                        <div className='UserSubTitle'>
                            User Code
                        </div>
                        <div className="vr" />
                        <Badge className='userSubContent' style={{fontSize: "4vmin"}} bg="light" text="dark">
                           {isUserCode}
                        </Badge>
                    </div>
                    <div className='OpenChatBox'>
                        <div className='UserSubTitle'>
                            Questions
                        </div>
                        <div className="vr" />
                        <div className='userSubContent'>
                            <Button className='OpenChatButton' variant='warning' onClick={OpenChat}>
                                Kakao Open Chat
                            </Button>
                            <p className='UserPlusText'>문의사항 및 불편사항을 말씀해주세요.</p>
                        </div>
                    </div>
                    <div className='MyPageButtonGroup'>
                        <Button variant='light' className='MyPageLeftButton' onClick={Yet}>
                            대학교 인증
                        </Button>
                        <Button variant='light' className='MyPageRightButton' onClick={()=>{props.onHide(); setIsLogeOut(true);}}>
                            LogOut
                        </Button>
                    </div>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button variant="dark" className='UserButton' onClick={props.onHide}>닫기</Button>
                </Modal.Footer>
            </Modal>

            <LogeOutModal
                show={isLogeOut}
                onHide={()=>{setIsLogeOut(false)}}
            />
        </div>
    );
}

export default UserModal;