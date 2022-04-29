import {Offcanvas, Button} from 'react-bootstrap';
import './CheckOffCanvas.css'

const CheckOffCanvas=(props)=>{
    return(
        <div>
            <Offcanvas backdrop={false} show={props.show} onHide={props.onHide} className="bottomCanvas" placement='bottom'>
                <Offcanvas.Body className='checkCanvasBody'>
                    <Button className='checkLeftButton'>
                        취소
                    </Button>
                    <Button className='checkRightButton'>
                        그룹 만들기
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CheckOffCanvas;