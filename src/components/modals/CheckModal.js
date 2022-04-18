import {Modal, Button} from 'react-bootstrap';
import './CheckModal.css';
import CreationModal from './CreationModal';
import React from 'react'

const CheckModal=(props)=>{
    const [creationView, setCreationView] = React.useState(false);

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
                    해당 위치에 그룹을 만드시겠습니까?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className='checkbody'>
                    생성된 지도의 마커 위치에 그룹이 만들어집니다.
                    </p>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "#FFFCEE"}}>
                    <Button className='checkbuttonLeft' onClick={props.onHide}>취소</Button>
                    <Button className='checkbuttonRight' 
                        onClick={() => {
                            props.onHide();
                            setCreationView(true);
                            }}>확인</Button>
                </Modal.Footer>
            </Modal>

            <CreationModal
                show={creationView}
                onHide={() => setCreationView(false)}
            />
        </div>

    );
}

export default CheckModal;