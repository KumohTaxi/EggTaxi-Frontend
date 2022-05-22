import {Offcanvas, Button} from 'react-bootstrap';
import './CheckOffCanvas.css'
import React, { useContext, useState } from 'react'
import { LatLngContext } from '../../contexts/LatLngContexts';
import CreationModal from '../modals/mainmodals/CreationModal';
import CheckAuthModal from '../modals/submodals/alert_modals/CheckAuthModal';

const CheckOffCanvas=(props)=>{
    const {isLatLng} = useContext(LatLngContext);
    const [creationView, setCreationView] = useState(false);
    const [isCheckAuth, setIsCheckAuth] = useState(false);

    function makePossible(){
        props.onHide();
        setCreationView(true);
    }
    function makeImpossible(){
        alert("지도에서 출발 위치를 선택하여 주십시오.")
        props.onHide();
    }

    function viewCreationModal(){
        if (localStorage.getItem('access_token') === 'genderless' 
        || localStorage.getItem('refresh_token') === 'genderless'){
            props.onHide();
            setIsCheckAuth(true);
        }
        else{
            isLatLng?makePossible():makeImpossible();
        }
    }

    return(
        <div>
            <Offcanvas backdrop={false} show={props.show} onHide={props.onHide} className="bottomCanvas" placement='bottom'>
                <Offcanvas.Body className='checkCanvasBody'>
                    <Button variant='dark' className='checkLeftButton' onClick={props.onHide}>
                        취소
                    </Button>
                    <Button variant='light' className='checkRightButton' onClick={viewCreationModal}>
                        그룹 만들기
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>

            <CreationModal
                show={creationView}
                onHide={() => setCreationView(false)}
            />
            <CheckAuthModal
                show={isCheckAuth}
                onHide={() => setIsCheckAuth(false)}
            />
        </div>
    );
}

export default CheckOffCanvas;