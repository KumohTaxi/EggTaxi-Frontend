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
            <Modal.Header style={{backgroundColor: "#282828"}}>
                <Modal.Title className='MyTitle' id="contained-modal-title-vcenter">
                My Room
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='MyMiddle'>
                <div className= 'personBox'>
                    <div className='mySubTitle'>
                        1
                    </div>
                    <div className='mySubContent'>
                        2
                    </div>
                </div>
                <div className='timeBox'>
                    <div className='mySubTitle'>
                        3
                    </div>
                    <div className='mySubContent'>
                        4
                    </div>
                </div>
                <div className='destiBox'>
                    <div className='mySubTitle'>
                        5
                    </div>
                    <div className='mySubContent'>
                        6
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className='MyFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button className='MyBottomButtonLeft'>방 삭제</Button>
                <Button className='MyBottomButtonRight' onClick={props.onHide}>확인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;