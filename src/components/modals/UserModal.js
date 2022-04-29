import {Modal, Button, Badge, InputGroup, FormControl, Form} from 'react-bootstrap';
import './UserModal.css';

const UserModal=(props)=>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='box'
        >
            <Modal.Header style={{backgroundColor: "#282828"}}>
                <Modal.Title className='MyTitle' id="contained-modal-title-vcenter">
                My Group
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='MyMiddle'>
                <div className='scrollBox'>
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
                            <Badge bg="light" text="dark">월 일 &nbsp;/&nbsp; 시 분</Badge>
                        </div>
                    </div>
                    <div>
                        <div className='myCommentHead'>
                            <div className='mySubTitle'>
                                Comment
                            </div>
                            <Button variant="dark">
                                새로고침
                            </Button>
                        </div>
                        <div className='subScrollBox'>
                        </div>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                            Button
                            </Button>
                        </InputGroup>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className='MyFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='MyBottomButtonLeft'>그룹 나가기</Button>
                <Button variant="dark" className='MyBottomButtonRight' onClick={props.onHide}>확인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserModal;