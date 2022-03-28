import {Modal, Button} from 'react-bootstrap';
import './MyModal.css';

const MyModal=(props)=>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                My Room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                본인의 방 정보입니다.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;