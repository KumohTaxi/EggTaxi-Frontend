import {Modal, Button} from 'react-bootstrap';
import './PreMyGroupModal.css';

const PreMyGroupModal=(props)=>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='box'
        >
            <Modal.Header style={{backgroundColor: "#282828"}}>
                <Modal.Title className='PreTitle' id="contained-modal-title-vcenter">
                My Group
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='PreMiddle'>
                "현재 만든 / 입장한 그룹 정보가 없습니다."
            </Modal.Body>

            <Modal.Footer className='PreFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='PreBottomButtonRight' onClick={props.onHide}>닫기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PreMyGroupModal;