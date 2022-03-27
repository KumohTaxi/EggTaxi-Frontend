import {Modal, Button} from 'react-bootstrap';
import './CheckModal.css';
import MakeModal from './MakeModal';
import React from 'react'

const CheckModal=(props)=>{
    const [makeShow, setmakeShow] = React.useState(false);

    return(
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header style={{backgroundColor: "#282828"}}>
                    <Modal.Title className='checktitle' id="contained-modal-title-vcenter">
                    선택한 위치에 방을 만드시겠습니까?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className='checkbody'>
                    현재 선택한 마커의 위치에 방이 만들어집니다.
                    </p>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button className='checkbuttonLeft' onClick={props.onHide}>취소</Button>
                    <Button className='checkbuttonRight' 
                        onClick={() => {
                            props.onHide();
                            setmakeShow(true);
                            }}>확인</Button>
                </Modal.Footer>
            </Modal>

            <MakeModal
                show={makeShow}
                onHide={() => setmakeShow(false)}
            />
        </div>

    );
}

export default CheckModal;