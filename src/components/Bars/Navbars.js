import {Navbar, Nav, Container} from 'react-bootstrap';
import './Navbars.css';
import React from 'react'
import CheckModal from '../../modals/CheckModal';
import MyModal from '../../modals/MyModal';

const Navbars=()=>{
    const [checkShow, setcheckShow] = React.useState(false);
    const [MyShow, setMyShow] = React.useState(false);

    return(
        <div>
            <Navbar bg="dark" variant="dark" style={{fontWeight: "bold"}}>
                <Container id='container'>
                    <Navbar.Brand>
                        <img className='Logo' src="imgs/Taxi-Logo.png"
                        style={{width: "60px", height: "60px"}}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setcheckShow(true)}>Make</Nav.Link>
                        <Nav.Link onClick={() => setMyShow(true)}>My</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <CheckModal
                show={checkShow}
                onHide={() => setcheckShow(false)}
            />

            <MyModal
                show={MyShow}
                onHide={() => setMyShow(false)}
            />
        </div>
    )
}

export default Navbars;