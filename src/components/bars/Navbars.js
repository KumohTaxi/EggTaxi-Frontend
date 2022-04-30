import {Navbar, Container} from 'react-bootstrap';
import './Navbars.css';
import React, {useState} from 'react'
import FilterOffCanvas from '../offcanvas/FilterOffCanvas';
import CheckOffCanvas from '../offcanvas/CheckOffCanvas';
import { CheckLatLngContext } from '../../contexts/CheckLatLngContext';
import { useContext } from 'react';
import MyGroupModal from '../modals/MyGroupModal.js';

const Navbars=()=>{
    const [leftCanvasShow, setLeftCanvasShow] = useState(false);
    const lefthandleShow = () => setLeftCanvasShow(true);

    const { isCheckShow, setIsCheckShow } = useContext(CheckLatLngContext);
    const checkHandleOnHide = () => setIsCheckShow(false);

    const [userView, setUserView] = useState(false);

    return(
        <div>
            <Navbar  bg="dark" variant="dark"  expand={false} style={{fontWeight: "bold"}}>
                <Container fluid>
                    <div className='NavBox'>
                        <Navbar.Brand className='NavTitle'>
                            <img className='Logo' src="imgs/Taxi_Logo.png"/>
                        </Navbar.Brand>

                        <div className='NavBody'>
                            <span className='NavbarsFilter' onClick={()=>{lefthandleShow(); checkHandleOnHide();}}>Filter</span>
                            <span className='NavbarsMyGroup' onClick={()=>{setUserView(true); checkHandleOnHide();}}>MyGroup</span>

                            <img className='User' src='imgs/User.png'/>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <FilterOffCanvas
                show = {leftCanvasShow}
                onHide = {() => setLeftCanvasShow(false)}
            />

            <CheckOffCanvas
                show = {isCheckShow}
                onHide = {() => setIsCheckShow(false)}
            />

            <MyGroupModal
                show = {userView}
                onHide = {() => setUserView(false)}
            />
        </div>
    )
}

export default Navbars;