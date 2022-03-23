import {Navbar, Nav, Container} from 'react-bootstrap';
import './Navbars.css';

const Navbars=()=>{
    return(
        <Navbar bg="dark" variant="dark" style={{fontWeight: "bold"}}>
            <Container id='container'>
                <Navbar.Brand>
                    <img className='Logo' src="imgs/Taxi-Logo.png"
                    style={{width: "60px", height: "60px"}}/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>Make</Nav.Link>
                    <Nav.Link>My</Nav.Link>
                    <Nav.Link>Setting</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navbars;