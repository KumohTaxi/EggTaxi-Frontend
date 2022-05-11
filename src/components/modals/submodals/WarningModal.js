import {Modal, Button} from 'react-bootstrap';
import './WarningModal.css';
import axios from 'axios';
import { PROXY } from '../../../contexts/ProxyContext';

const WarningModal=(props)=>{
    function exitGroup(){
        axios({
            method:'post',
            url:`${PROXY}/./group/${props.myid}/exit`,
            data:{
                accessToken: localStorage.getItem('access_token'),
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then(() => {
            alert("퇴장 성공");
            window.location.replace('/main');
        })
        .catch(() => {
            alert("퇴장 실패");
        })
    };

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='WarningTitle' id="contained-modal-title-vcenter">
                My Group
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='WarningMiddle'>
                <p className='WarningP1'>
                정말 방을 나가시겠습니까?
                </p>
                <p className='WarningP2'>
                출발 시각 5분 전에 나가면 사용에 
                </p>
                <p className='WarningP3'>  
                    불이익이 있을 수 있습니다.
                </p>
            </Modal.Body>

            <Modal.Footer className='WarningFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='WarningButtonLeft' onClick={props.onHide}>취소</Button>
                <Button variant="light" className='WarningButtonRight' onClick={()=>{props.onHide(); exitGroup();}}>그룹 나가기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WarningModal;