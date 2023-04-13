import {Modal, CloseButton} from 'react-bootstrap';
import '../../../../styles/components/modals/submodals/guide_modals/AppGuideModal.css';

const AppGuideModal=(props)=>{
    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='AppGuideTitle' id="contained-modal-title-vcenter">
                App Install
                </Modal.Title>
                <CloseButton variant='white' onClick={props.onHide}/>
            </Modal.Header>

            <Modal.Body className='AppGuideMiddle'>
                <img src='imgs/App_Guide.png' alt='이미지를 불러오지 못했습니다.'/>
            </Modal.Body>
        </Modal>
    );
}

export default AppGuideModal;