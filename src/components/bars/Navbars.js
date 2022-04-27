import {Navbar, Nav, Container, Offcanvas, NavDropdown, Dropdown} from 'react-bootstrap';
import './Navbars.css';
import React, {useState} from 'react'
import UserModal from '../modals/UserModal.js'
import CheckModal from '../modals/CheckModal';

const Navbars=()=>{
    const [checkView, setCheckView] = useState(false);
    const [userView, setUserView] = useState(false);

    const [leftCanvasShow, setLeftCanvasShow] = useState(false);
    const lefthandleClose = () => setLeftCanvasShow(false);
    const lefthandleShow = () => setLeftCanvasShow(true);

    const [rightCanvasShow, setRightCanvasShow] = useState(false);
    const righthandleClose = () => setRightCanvasShow(false);
    const righthandleshow = () => setRightCanvasShow(true);

    return(
        <div>
            <Navbar  bg="dark" variant="dark"  expand={false} style={{fontWeight: "bold"}}>
                <Container fluid>
                    <div>
                        <Navbar.Brand className='NavTitle'>
                            <img className='Logo' src="imgs/Taxi_Logo.png"/>
                        </Navbar.Brand>

                        <span className='NavbarsMake' onClick={() => setCheckView(true)}>MakeGroup</span>
                        <span className='NavbarsFilter' onClick={lefthandleShow}>Filter</span>
                    </div>
                    
                    <Navbar.Toggle onClick={righthandleshow}/>
                    <Offcanvas show={rightCanvasShow} onHide={righthandleClose} className="offcanvasNavbar" placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>MENU</Offcanvas.Title>                        
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1" onClick={()=>{righthandleClose();}} style={{color: "rgb(185, 185, 185)"}}>My Page</Nav.Link>
                                <Nav.Link onClick={() => {setUserView(true); righthandleClose();}} style={{color: "rgb(185, 185, 185)"}}>My Group</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Offcanvas show={leftCanvasShow} onHide={lefthandleClose} className="filterOffCanvas" placement='start'>
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
                </Container>
            </Navbar>

            <CheckModal
                show = {checkView}
                onHide = {() => setCheckView(false)}
            />

            <UserModal
                show = {userView}
                onHide = {() => setUserView(false)}
            />
        </div>
    )
}

export default Navbars;