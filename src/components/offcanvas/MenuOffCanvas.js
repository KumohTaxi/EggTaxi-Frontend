import {Offcanvas, Nav} from 'react-bootstrap';
import './MenuOffCanvas.css'
import UserModal from '../modals/UserModal.js';
import { useState } from 'react';

const MenuOffCanvas=(props)=>{
    const [userView, setUserView] = useState(false);

    return(
        <div>
            <Offcanvas show={props.show} onHide={props.onHide} className="offcanvasNavbar" placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>MENU</Offcanvas.Title>                        
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link className='MenuObject' onClick={() => {props.onHide(); setUserView(true);}}>My Group</Nav.Link>
                        <Nav.Link className='MenuObject' onClick={props.onHide}>대학교 인증</Nav.Link>
                        <Nav.Link className='MenuObject' onClick={props.onHide}>Loge Out</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <UserModal
            show = {userView}
            onHide = {() => setUserView(false)}
            />
        </div>
    );
}

export default MenuOffCanvas;