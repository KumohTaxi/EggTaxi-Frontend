import {Modal, Button} from 'react-bootstrap';
import './GroupInfoModal.css';
import React, { useEffect, useState } from 'react'

const GroupInfoModal=(props)=>{

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
                    그룹 정보
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='GroupInfoBody'>
                        <p>
                            {props.destination}
                        </p>
                        <p>
                            {props.month}
                        </p>
                        <p>
                            {props.day}
                        </p>
                        <p>
                            {props.hour}
                        </p>
                        <p>
                            {props.minute}
                        </p>
                    </div>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button className='GroupInfoButtonLeft' onClick={props.onHide}>취소</Button>
                    <Button className='GroupInfoButtonRight' 
                        onClick={() => {
                            props.onHide();
                            }}>참가</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default GroupInfoModal;