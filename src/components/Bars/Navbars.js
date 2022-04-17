import {Navbar, Nav, Container} from 'react-bootstrap';
import './Navbars.css';
import React from 'react'
import CheckModal from '../modals/CheckModal';
import UserModal from '../modals/UserModal';

const Navbars=()=>{
    const [checkView, setCheckView] = React.useState(false);
    const [userView, setUserView] = React.useState(false);

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
                view={checkView}
                onHide={() => setCheckView(false)}
            />

            <UserModal
                view={userView}
                onHide={() => setUserView(false)}
            />
        </div>
    )
}

export default Navbars;