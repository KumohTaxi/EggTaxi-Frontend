import {Navbar, Nav, Container, Offcanvas, NavDropdown, FormControl, Button, Form} from 'react-bootstrap';
import './Navbars.css';
import React, {useState} from 'react'
import UserModal from '../modals/UserModal.js'
import CheckModal from '../modals/CheckModal';

const Navbars=()=>{
    const [checkView, setCheckView] = useState(false);
    const [userView, setUserView] = useState(false);

    return(
        <div>
            {/* <Navbar bg="dark" variant="dark" style={{fontWeight: "bold"}}>
                <Container id='container'>
                    <Navbar.Brand>
                        <img className='Logo' src="imgs/Taxi-Logo.png"
                        style={{width: "60px", height: "60px"}}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className='NavbarsMake' onClick={() => setCheckView(true)}>Make</Nav.Link>
                        <Nav.Link className='NavbarsMyGroup' onClick={() => setUserView(true)}>MyGroup</Nav.Link>
                    </Nav>
                </Container>
            </Navbar> */}

            <Navbar  bg="dark" variant="dark"  expand={false} style={{fontWeight: "bold"}}>
                <Container fluid>
                    <Navbar.Brand>
                        <img className='Logo' src="imgs/Taxi-Logo.png"
                        style={{width: "60px", height: "60px"}}/>
                    </Navbar.Brand>

                    <Nav.Link className='NavbarsMake' onClick={() => setCheckView(true)}>Make</Nav.Link>
                    <Nav.Link className='NavbarsMyGroup' onClick={() => setUserView(true)}>MyGroup</Nav.Link>


                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                            Something else here
                            </NavDropdown.Item>
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