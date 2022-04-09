import {Modal, Button, Badge} from 'react-bootstrap';
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
                        <p>
                            인원
                        </p>
                    </div>
                    <div className='mySubContent'>
                        <Badge bg="light" text="dark">1명</Badge>
                    </div>
                </div>
                <div className='timeBox'>
                    <div className='mySubTitle'>
                        <p>
                            출발 시각
                        </p>
                    </div>
                    <div className='mySubContent'>
                        <Badge bg="light" text="dark">년 월 일 시 분</Badge>
                    </div>
                </div>
                <div className='destiBox'>
                    <div className='mySubTitle'>
                        <p>
                            목적지
                        </p>
                    </div>
                    <div className='mySubContent'>
                        <Badge bg="light" text="dark">목적지</Badge>
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