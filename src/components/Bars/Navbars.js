import {Navbar, Nav, Container} from 'react-bootstrap';
import './Navbars.css';
import React, {useState} from 'react'
import UserModal from '../modals/UserModal.js'
import CheckModal from '../modals/CheckModal';

const Navbars=()=>{
    const [checkView, setCheckView] = useState(false);
    const [userView, setUserView] = useState(false);

    return(
        <div>
            <Navbar bg="dark" variant="dark" style={{fontWeight: "bold"}}>
                <Container id='container'>
                    <Navbar.Brand>
                        <img className='Logo' src="imgs/Taxi-Logo.png"
                        style={{width: "60px", height: "60px"}}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setCheckView(true)}>Make</Nav.Link>
                        <Nav.Link onClick={() => setUserView(true)}>My</Nav.Link>
                    </Nav>
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