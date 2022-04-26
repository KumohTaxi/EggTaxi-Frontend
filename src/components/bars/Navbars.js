import {Navbar, Nav, Container, Offcanvas, NavDropdown, Dropdown} from 'react-bootstrap';
import './Navbars.css';
import React, {useState} from 'react'
import UserModal from '../modals/UserModal.js'
import CheckModal from '../modals/CheckModal';

const Navbars=()=>{
    const [checkView, setCheckView] = useState(false);
    const [userView, setUserView] = useState(false);

    return(
        <div>
            <Navbar  bg="dark" variant="dark"  expand={false} style={{fontWeight: "bold"}}>
                <Container fluid>
                    <div>
                        <Navbar.Brand className='NavTitle'>
                            <img className='Logo' src="imgs/Taxi_Logo.png"
                            style={{width: "65px", height: "23px"}}/>
                        </Navbar.Brand>

                        <span className='NavbarsMake' onClick={() => setCheckView(true)}>Make Group</span>
                    </div>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>MENU</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body >
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1" style={{color: "rgb(185, 185, 185)"}}>My Page</Nav.Link>
                                <Nav.Link onClick={() => setUserView(true)} style={{color: "rgb(185, 185, 185)"}}>My Group</Nav.Link>
                                <NavDropdown id="offcanvasNavbarDropdown" title={"Filter"}>
                                    <NavDropdown.Item href="#action3">#1</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action4">#2</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
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