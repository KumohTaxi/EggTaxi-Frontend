import { Offcanvas } from "react-bootstrap";
import '../../styles/offcanvases/CheckSaveCanvas.css';

const CheckSaveCanvas = ({ show, onHide, position, setPosition, canvasOnhide }) => {
    const saveAddress = () =>{
        localStorage.setItem('position', JSON.stringify(position));
        canvasOnhide();
    }

    return (
        <Offcanvas show={show} onHide={onHide} placement='bottom' style={{ borderRadius: "20px 20px 0 0", height: "20%" }}>
            <Offcanvas.Body style={{width: "100%", height: "100%"}}>
                <div className="bsd_save_address">{position.address}</div>
                <div className="bsd_save_btn_group">
                    <button onClick={()=>{onHide(); setPosition(''); localStorage.removeItem('position')}}>취소</button>
                    <button onClick={()=>{saveAddress()}}>확인</button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default CheckSaveCanvas;