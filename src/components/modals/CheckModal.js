import {Modal, Button} from 'react-bootstrap';
import './CheckModal.css';
import CreationModal from './CreationModal';
import React, { useContext } from 'react'
import { LatLngContext } from '../../contexts/LatLngContexts';

const CheckModal=(props)=>{
    const {isLatLng} = useContext(LatLngContext);
    const [creationView, setCreationView] = React.useState(false);

    function makePossible(){
        props.onHide();
        setCreationView(true);
    }
    function makeImpossible(){
        alert("지도에서 출발 위치를 선택하여 주십시오.")
        props.onHide();
    }

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
                    <Button variant="dark" className='checkbuttonLeft' onClick={props.onHide}>취소</Button>
                    <Button variant="dark" className='checkbuttonRight' 
                        onClick={() => {
                                isLatLng?makePossible():makeImpossible()
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