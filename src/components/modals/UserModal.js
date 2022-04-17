import {Modal, Button, Badge} from 'react-bootstrap';
import './UserModal.css';

const UserModal=(props)=>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#282828"}}>
                <Modal.Title className='MyTitle' id="contained-modal-title-vcenter">
                My Group
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='MyMiddle'>
                <div className= 'personBox'>
                    <div className='mySubTitle'>
                        <span>
                            인원
                        </span>
                    </div>
                    <div className="vr" />
                    <div className='mySubContent'>
                        <Badge bg="light" text="dark">1 / 4명</Badge>
                    </div>
                </div>
                <div className='destiBox'>
                    <div className='mySubTitle'>
                        <span>
                            목적지
                        </span>
                    </div>
                    <div className="vr" />
                    <div className='mySubContent'>
                        <Badge bg="light" text="dark">목적지</Badge>
                    </div>
                </div>
                <div className='timeBox'>
                    <div className='mySubTitle'>
                        <span>
                            출발시각
                        </span>
                    </div>
                    <div className="vr" />
                    <div className='mySubContent'>
                        <Badge bg="light" text="dark">월 일 시 분</Badge>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className='MyFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button className='MyBottomButtonLeft'>그룹 나가기</Button>
                <Button className='MyBottomButtonRight' onClick={props.onHide}>확인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserModal;