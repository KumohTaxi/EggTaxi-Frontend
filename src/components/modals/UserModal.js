import {Modal, Button, Badge} from 'react-bootstrap';
import './UserModal.css';
import React from 'react'

const UserModal=(props)=>{
    function Yet() {
        alert('서비스 준비 중 입니다.')
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
                    <Modal.Title className='UserTitle' id="contained-modal-title-vcenter">
                    My Page
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='UserNameBox'>
                        <div className='UserSubTitle'>
                            User Name
                        </div>
                        <div className="vr" />
                        <Badge className='userSubContent' style={{fontSize: "4vmin"}} bg="light" text="dark">User Name</Badge>
                    </div>
                    <div className='OpenChatBox'>
                        <div className='UserSubTitle'>
                            Open Chat
                        </div>
                        <div className="vr" />
                        <div className='userSubContent'>
                            <Button className='OpenChatButton' variant='warning'>
                                Open Chat 바로가기
                            </Button>
                            <p className='UserPlusText'>문의사항 및 불편사항을 말씀해주세요.</p>
                        </div>
                    </div>
                    <div className='MyPageButtonGroup'>
                        <Button variant='light' className='MyPageLeftButton' onClick={Yet}>
                            대학교 인증
                        </Button>
                        <Button variant='light' className='MyPageRightButton'>
                            Loge Out
                        </Button>
                    </div>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button variant="dark" className='UserButton' onClick={props.onHide}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default UserModal;