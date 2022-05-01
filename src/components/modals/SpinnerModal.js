import {Modal, Spinner} from 'react-bootstrap';
import './SpinnerModal.css';

const SpinnerModal=(props)=>{
    function TimeOut(){
        props.onHide();
    }

    if(props.show === true){
        setTimeout(TimeOut, 3000)
    }

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        >
            <Modal.Body className='spinnerBody'>
                <Spinner animation="border" />
            </Modal.Body>
        </Modal>
    );
}

export default SpinnerModal;