import React, {useState, useEffect} from 'react'
import './RoomModal.css'
import { Modal, Button, FormControl } from 'react-bootstrap';

function RoomModal(props) {
    const [inputDes , setDes] = useState('');
    const handlerDes = (e) => { setDes(e.target.value)};
    const [inputHour , setHour] = useState(12);
    const handlerHour = (e) => { setHour(1 * e.target.value)};
    const [inputMin , setMin] = useState(0);
    const handlerMin = (e) => { setMin(1 * e.target.value)};

    useEffect(()=> {
        props.parentCallback(inputDes, inputHour, inputMin);
    }, );

    return (
        <Modal id = "Modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
            <Modal.Title id="contained-modal-tit
            le-vcenter">
                New Room
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id = 'modal'>       
                    <h3 id='modaltitle'>☑️ 목적지</h3>
                    <div id = 'input'>
                        <FormControl
                        placeholder="EX) 구미역"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handlerDes}
                        />
                    </div>    
                </div>
                <p>
                    되도록이면, 정확한 목적지를 입력하여 주세요.
                </p>
                <hr></hr>
                <div id = 'modal'>
                    <h3 id='modaltitle'>☑️ 출발 시간</h3>
                    <div id = 'input'>
                        <FormControl id = 'hour'
                        type='number'
                        placeholder="12"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handlerHour}
                        />
                        <h4>시</h4>
                        <FormControl id = 'min'
                        type='number'
                        placeholder="00"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handlerMin}
                        />
                        <h4>분</h4>
                    </div>
                </div>
                <p>
                    시간은 0 ~ 23, 분은 0 ~ 59 범위 내로 입력하여 주세요.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>취소</Button>
                <Button variant='primary' onClick={props.saveInfo} >확인</Button>
            </Modal.Footer>
        </Modal>     
    )
}

export default RoomModal;