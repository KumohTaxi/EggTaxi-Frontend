import {Modal, Button} from 'react-bootstrap';
import './UserModal.css';
import React from 'react'

const UserModal=(props)=>{
    return(
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header style={{backgroundColor: "#282828"}}>
                    <Modal.Title className='checktitle' id="contained-modal-title-vcenter">
                    해당 위치에 그룹을 만드시겠습니까?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className='checkbody'>
                    생성된 지도의 마커 위치에 그룹이 만들어집니다.
                    </p>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button variant="dark" className='checkbuttonLeft' onClick={props.onHide}>취소</Button>
                    <Button variant="dark" className='checkbuttonRight' >확인</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default UserModal;