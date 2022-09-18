import {Modal, Button} from 'react-bootstrap';
import './LogeOutModal.css';
import { Link } from 'react-router-dom';

const LogeOutModal=(props)=>{

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='LOTitle' id="contained-modal-title-vcenter">
                My Page
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='LOMiddle'>
                로그아웃 하시겠습니까?
            </Modal.Body>

            <Modal.Footer className='LOFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='LOButtonLeft' onClick={props.onHide}>취소</Button>
                <Link className='LogOutLink' to='/'>
                    <Button variant="lgiht" className='LOButtonRight'>Log Out</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default LogeOutModal;