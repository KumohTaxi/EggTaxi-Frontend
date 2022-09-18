import {Modal, Spinner, Button} from 'react-bootstrap';
import '../../../../styles/components/modals/submodals/alert_modals/LoadingModal.css';

const LoadingModal=(props)=>{
    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        >
            <Modal.Body className='LoadingMiddle'>
                <Spinner className="loadingSpinner" animation="border"/>
                <p className='LoadingP1'>
                    위치를 받아오는 중입니다...
                </p>
                <p className='LoadingP2'>
                    시간이 지연된다면 네트워크 혹은
                </p>
                <p className='LoadingP3'>
                    브라우저의 '위치 액세스 허용'을 확인 해주세요.
                </p>
                <Button className='LoadingButton' variant='light' onClick={props.onHide}>
                    직접 위치 찾기
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default LoadingModal;