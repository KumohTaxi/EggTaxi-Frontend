import {Offcanvas, Button} from 'react-bootstrap';
import './CheckOffCanvas.css'
import React, { useContext } from 'react'
import { LatLngContext } from '../../contexts/LatLngContexts';
import CreationModal from '../modals/mainmodals/CreationModal';

const CheckOffCanvas=(props)=>{
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
            <Offcanvas backdrop={false} show={props.show} onHide={props.onHide} className="bottomCanvas" placement='bottom'>
                <Offcanvas.Body className='checkCanvasBody'>
                    <Button variant='dark' className='checkLeftButton' onClick={props.onHide}>
                        취소
                    </Button>
                    <Button variant='dark' className='checkRightButton' onClick={()=>{isLatLng?makePossible():makeImpossible();}}>
                        그룹 만들기
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>

            <CreationModal
                show={creationView}
                onHide={() => setCreationView(false)}
            />
        </div>
    );
}

export default CheckOffCanvas;