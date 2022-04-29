import {Offcanvas, NavDropdown} from 'react-bootstrap';
import './FilterOffCanvas.css'

const FilterOffCanvas=(props)=>{
    return(
        <div>
            <Offcanvas show={props.show} onHide={props.onHide} className="filterOffCanvas" placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>Filter</Offcanvas.Title>                        
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <NavDropdown id="offcanvasNavbarDropdown" title={"Filter"}>
                        <NavDropdown.Item href="#action3">#1</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action4">#2</NavDropdown.Item>
                    </NavDropdown>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default FilterOffCanvas;