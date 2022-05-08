import {Modal, Button} from 'react-bootstrap';
import './WithdrawalModal.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PROXY } from '../../../contexts/ProxyContext';

const WithdrawalModal=(props)=>{
    function removeInfo(){
        axios({
            method:'post',
            url:`${PROXY}/member/unlink`,
            data:{
                accessToken: localStorage.getItem('access_token'),
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then(() => {
            localStorage.clear();
            window.location.replace('/');
        })
        .catch(() => {
            alert("탈퇴에 실패하였습니다.");
            window.location.replace('/main');
        })
    }

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='WDTitle' id="contained-modal-title-vcenter">
                My Page
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='WDMiddle'>
                <p className='WDP1'>회원 탈퇴를 하시겠습니까?</p>
                <p className='WDP2'>회원님의 모든 정보가 사라집니다.</p>
            </Modal.Body>

            <Modal.Footer className='WDFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='WDButtonLeft' onClick={props.onHide}>취소</Button>
                <Button variant="lgiht" className='WDButtonRight' onClick={removeInfo}>회원 탈퇴</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WithdrawalModal;