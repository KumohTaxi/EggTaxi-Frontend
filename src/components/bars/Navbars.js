import {Navbar, Container} from 'react-bootstrap';
import './Navbars.css';
import React, {useState} from 'react'
import FilterOffCanvas from '../offcanvas/FilterOffCanvas';
import CheckOffCanvas from '../offcanvas/CheckOffCanvas';
import { CheckLatLngContext } from '../../contexts/CheckLatLngContext';
import { useContext } from 'react';
import MyGroupModal from '../modals/MyGroupModal.js';
import UserModal from '../modals/UserModal';
import PreMyGroupModal from '../modals/PreMyGroupModal';

const Navbars=({location})=>{
    const [leftCanvasShow, setLeftCanvasShow] = useState(false);
    const lefthandleShow = () => setLeftCanvasShow(true);

    const { isCheckShow, setIsCheckShow } = useContext(CheckLatLngContext);
    const checkHandleOnHide = () => setIsCheckShow(false);

    const [myGroupView, setMyGroupView] = useState(false);
    const [userView, setUserView] = useState(false)
    const [isPreView, setIsPreView] = useState(false)

    function reload(){
        (location || window.location || document.location).reload();
    }

    return(
        <div>
            <Navbar  bg="dark" variant="dark"  expand={false} style={{fontWeight: "bold"}}>
                <Container fluid>
                    <div className='NavBox'>
                        <Navbar.Brand className='NavTitle'>
                            <img className='Logo' src="imgs/Taxi_Logo.png" onClick={reload}/>
                        </Navbar.Brand>

                        <div className='NavContent'>
                            <span className='NavbarsFilter' onClick={()=>{lefthandleShow(); checkHandleOnHide();}}>Filter</span>
                            <span className='NavbarsMyGroup' onClick={()=>{setMyGroupView(true); checkHandleOnHide();}}>MyGroup</span>

                            <img className='User' src='imgs/User.png' onClick={()=>{setUserView(true); checkHandleOnHide();}}/>
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
                show = {myGroupView}
                onHide = {() => setMyGroupView(false)}
            />
            <UserModal
                show = {userView}
                onHide = {() => setUserView(false)}
            />
            <PreMyGroupModal
                show = {isPreView}
                onHide = {() => setIsPreView(false)}
            />
        </div>
    )
}

export default Navbars;