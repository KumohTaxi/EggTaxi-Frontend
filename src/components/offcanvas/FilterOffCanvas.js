import {Offcanvas} from 'react-bootstrap';
import './FilterOffCanvas.css'

const FilterOffCanvas=(props)=>{
    return(
        <div>
            <Offcanvas show={props.show} onHide={props.onHide} className="filterOffCanvas" placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>Filter</Offcanvas.Title>                        
                </Offcanvas.Header>
                <Offcanvas.Body>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default FilterOffCanvas;