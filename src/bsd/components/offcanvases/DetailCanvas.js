import { Offcanvas } from "react-bootstrap";
import '../../styles/offcanvases/DetailCanvas.css';

const DetailCanvas = ({ show, onHide, itemInfo }) => {
    if(show) console.log(itemInfo);
    return (
        <Offcanvas show={show} onHide={onHide} placement='bottom' style={{ borderRadius: "20px 20px 0 0", height: "80%" }}>
            <Offcanvas.Body style={{width: "100%", height: "100%"}}>

            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default DetailCanvas;