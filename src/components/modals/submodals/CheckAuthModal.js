import {Modal, Button} from 'react-bootstrap';
import './CheckAuthModal.css';
import { GENDER_AUTH_URL } from '../../../oauths/ReAuth';

const LogeOutModal=(props)=>{
    function moveReDirect(){
        window.location.href = GENDER_AUTH_URL;
    }

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='checkAuthTitle' id="contained-modal-title-vcenter">
                성별 정보가 필요합니다.
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='checkAuthContent'>
                <p className='CAP1'>저희 서비스는 합승 제도의 동성 탑승을</p>
                <p className='CAP2'>지키기 위해 성별 정보를 필요로 합니다.</p>
                <p className='CAP3'>성별 추가 동의를 하시겠습니까?</p>
            </Modal.Body>

            <Modal.Footer className='checkAuthFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='authButtonLeft' onClick={props.onHide}>취소</Button>
                <Button variant="light" className='authButtonRight' onClick={moveReDirect}>동의</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogeOutModal;