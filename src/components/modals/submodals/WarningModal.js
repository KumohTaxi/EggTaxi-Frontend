import {Modal, Button} from 'react-bootstrap';
import './WarningModal.css';
import axios from 'axios';
import { useContext } from 'react';
import { MakeContext } from '../../../contexts/MakeContext';

const WarningModal=(props)=>{
    const {isCreation, setIsCreation} = useContext(MakeContext);

    function exitGroup(){
        axios({
            method:'post',
            url:`./group/${props.myid}/exit`,
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
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='box'
        >
            <Modal.Header style={{backgroundColor: "#282828"}}>
                <Modal.Title className='WarningTitle' id="contained-modal-title-vcenter">
                My Group
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='WarningMiddle'>
                <p className='WarningP'>
                정말 방을 나가시겠습니까?
                </p>
                <p className='WarningP'>
                출발 시각 5분 전에 나가면 사용에 불이익이 있을 수 있습니다.
                </p>
            </Modal.Body>

            <Modal.Footer className='WarningFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='WarningButtonLeft' onClick={props.onHide}>취소</Button>
                <Button variant="dark" className='WarningButtonRight' onClick={()=>{props.onHide(); exitGroup(); setIsCreation(!isCreation);}}>그룹 나가기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WarningModal;