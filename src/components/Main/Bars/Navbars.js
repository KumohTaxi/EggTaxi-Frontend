import {Navbar, Nav, Container} from 'react-bootstrap';
import './Navbars.css';

const Navbars=()=>{
    return(
        <Navbar bg="dark" variant="dark" style={{fontWeight: "bold"}}>
            <Container id='container'>
                <Navbar.Brand style={{color: "#DFE0F8"}}>TAXI</Navbar.Brand>
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