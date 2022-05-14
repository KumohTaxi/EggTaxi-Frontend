import {Modal, Button, Badge} from 'react-bootstrap';
import './UserModal.css';
import React, { useEffect, useState } from 'react'
import LogeOutModal from '../submodals/LogeOutModal';
import { PROXY } from '../../../contexts/ProxyContext';
import axios from 'axios';
import WithdrawalModal from '../submodals/WithdrawalModal';

const UserModal=(props)=>{
    const [isLogeOut, setIsLogeOut] = useState(false);
    const [isUserCode, setIsUserCode] = useState();
    const [isWithDrawal, setIsWithDrawal] = useState(false);

    var OpenChatLink = 'https://open.kakao.com/o/s2mNNVde';

    function OpenChat(){
        window.location.href=OpenChatLink;
    }

    function getUserCode(){
        axios({
            method:'post',
            url:`${PROXY}/member/id`,
            data:{
                accessToken: localStorage.getItem('access_token'),
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then((res) => {
            setIsUserCode(res.data);
            localStorage.setItem("my_code", res.data);
        })
    }

    useEffect(()=>{
        getUserCode();
    },[])

    return(
        <div>
            <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header style={{backgroundColor: "#212428"}}>
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
                        <Badge className='userCode' bg="light" text="dark">
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
                        <Button variant='dark' className='MyPageLeftButton' onClick={()=>{props.onHide(); setIsWithDrawal(true);}}>
                            회원 탈퇴
                        </Button>
                        <Button variant='light' className='MyPageRightButton' onClick={()=>{props.onHide(); setIsLogeOut(true);}}>
                            LogOut
                        </Button>
                    </div>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button variant="light" className='UserButton' onClick={props.onHide}>닫기</Button>
                </Modal.Footer>
            </Modal>

            <LogeOutModal
                show={isLogeOut}
                onHide={()=>{setIsLogeOut(false)}}
            />
            <WithdrawalModal
                show={isWithDrawal}
                onHide={()=>{setIsWithDrawal(false)}}
            />
        </div>
    );
}

export default UserModal;