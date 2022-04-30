import {Navbar, Container} from 'react-bootstrap';
import './Navbars.css';
import React, {useState} from 'react'
import MenuOffCanvas from '../offcanvas/MenuOffCanvas';
import FilterOffCanvas from '../offcanvas/FilterOffCanvas';

const Navbars=()=>{
    const [leftCanvasShow, setLeftCanvasShow] = useState(false);
    const lefthandleShow = () => setLeftCanvasShow(true);

    const [rightCanvasShow, setRightCanvasShow] = useState(false);
    const righthandleshow = () => setRightCanvasShow(true);

    return(
        <div>
            <Navbar  bg="dark" variant="dark"  expand={false} style={{fontWeight: "bold"}}>
                <Container fluid>
                    <div>
                        <Navbar.Brand className='NavTitle'>
                            <img className='Logo' src="imgs/Taxi_Logo.png"/>
                        </Navbar.Brand>

                        <span className='NavbarsFilter' onClick={lefthandleShow}>Filter</span>
                    </div>
                    
                    <Navbar.Toggle onClick={righthandleshow}/>
                </Container>
            </Navbar>

            <MenuOffCanvas
                show = {rightCanvasShow}
                onHide = {() => setRightCanvasShow(false)}
            />

            <FilterOffCanvas
                show = {leftCanvasShow}
                onHide = {() => setLeftCanvasShow(false)}
            />
        </div>
    )
}

export default Navbars;