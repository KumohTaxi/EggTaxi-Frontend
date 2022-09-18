import {Modal, CloseButton} from 'react-bootstrap';
import './InfoGuideModal.css';

const GuideModal=(props)=>{
    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='infoGuideTitle' id="contained-modal-title-vcenter">
                Guide
                </Modal.Title>
                <CloseButton variant='white' onClick={props.onHide}/>
            </Modal.Header>

            <Modal.Body className='infoGuideMiddle'>
                <img src='imgs/EggTaxi-Guide-Long.png' alt='이미지를 불러오지 못했습니다.'/>
            </Modal.Body>
        </Modal>
    );
}

export default GuideModal;