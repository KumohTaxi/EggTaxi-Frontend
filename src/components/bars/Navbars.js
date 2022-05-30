import {Navbar, Container} from 'react-bootstrap';
import './Navbars.css';
import React, {useEffect, useState} from 'react'
import FilterOffCanvas from '../offcanvas/FilterOffCanvas';
import CheckOffCanvas from '../offcanvas/CheckOffCanvas';
import { CheckLatLngContext } from '../../contexts/CheckLatLngContext';
import { useContext } from 'react';
import MyGroupModal from '../modals/mainmodals/MyGroupModal.js';
import PreMyGroupModal from '../modals/submodals/info_modals/PreMyGroupModal';
import axios from 'axios';
import { PROXY } from '../../contexts/ProxyContext';
import ChatModal from '../modals/mainmodals/ChatModal';
import MenuOffCanvas from '../offcanvas/MenuOffCanvas';

const Navbars=({location})=>{
    const [leftCanvasShow, setLeftCanvasShow] = useState(false);
    const lefthandleShow = () => setLeftCanvasShow(true);
    const [isMenu, setIsMenu] = useState(false);
    const MenuShow = () => setIsMenu(true);

    const { isCheckShow, setIsCheckShow } = useContext(CheckLatLngContext);
    const checkHandleOnHide = () => setIsCheckShow(false);

    const [myGroupView, setMyGroupView] = useState(false);
    const [isPreView, setIsPreView] = useState(false);
    const [isChatView, setIsChatView] = useState(false);

    const [myGroupDestination, setMyGroupDestination] = useState('');
    const [myGroupMonth, setMyGroupMonth] = useState('');
    const [myGroupDay, setMyGroupDay] = useState('');
    const [myGroupHour, setMyGroupHour] = useState('');
    const [myGroupMinute, setMyGroupMinute] = useState('');
    const [myGroupMemberCount, setMyGroupMemeberCount] = useState();
    const [myGroupID, setMyGroupID] = useState();
    const [isPossible, setIsPossible] = useState(false);

    function reload(){
        (location || window.location || document.location).reload();
    }

    useEffect(()=>{
        if(localStorage.getItem('createGroup') === 'true'){
            axios({
                method:'get',
                url:`${PROXY}/group/member/${localStorage.getItem('access_token')}`,
                headers:{
                    'ContentType':'application/json'
                },
            })
            .then((res) => {
                setIsPossible(true);
                setMyGroupDestination(res.data.destination);
                setMyGroupMonth(res.data.dateTime[5]+res.data.dateTime[6]);
                setMyGroupDay(res.data.dateTime[8]+res.data.dateTime[9]);
                setMyGroupHour(res.data.dateTime[11]+res.data.dateTime[12]);
                setMyGroupMinute(res.data.dateTime[14]+res.data.dateTime[15]);
                setMyGroupMemeberCount(res.data.memberCount);
                setMyGroupID(res.data.id); 
                localStorage.setItem("mygroupid", res.data.id);
            })
            .catch(() => {
                setIsPossible(false);
            });
        }
    },[])

    return(
        <div>
            <Navbar variant="dark"  expand={false} style={{fontWeight: "bold", backgroundColor: "#212428"}}>
                <Container fluid>
                    <div className='NavBox'>
                        <Navbar.Brand className='NavTitle'>
                            <img className='Logo' src="imgs/ET_Logo.png" alt='이미지를 불러올 수 없습니다.' onClick={reload}/>
                        </Navbar.Brand>

                        <div className='NavContent'>
                            <img className='NavbarsMyGroup' src='imgs/mygroup.png' alt='이미지를 불러올 수 없습니다.'
                                                            onClick={()=>{checkHandleOnHide();
                                                                            isPossible
                                                                            ?setMyGroupView(true)
                                                                            :setIsPreView(true);
                                                                        }}/>
                            <img className='NavbarChat' src='imgs/Chat.png' alt='이미지를 불러올 수 없습니다.' 
                                                            onClick={()=>{checkHandleOnHide();
                                                                            isPossible
                                                                            ?setIsChatView(true)
                                                                            :setIsPreView(true);}}/>
                            <img className='NavbarsFilter' src='imgs/Search.png' alt='이미지를 불러올 수 없습니다.'
                            onClick={()=>{lefthandleShow(); checkHandleOnHide();}}/>

                            <img className='menuButton' src='imgs/menu_button.png'
                            onClick={()=>{MenuShow(); checkHandleOnHide();}}/>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <FilterOffCanvas
                show = {leftCanvasShow}
                onHide = {() => setLeftCanvasShow(false)}
            />
            <MenuOffCanvas
                show = {isMenu}
                onHide = {() => setIsMenu(false)}
            />
            <CheckOffCanvas
                show = {isCheckShow}
                onHide = {() => setIsCheckShow(false)}
            />
            <MyGroupModal
                show = {myGroupView}
                onHide = {() => setMyGroupView(false)}
                mydestination={myGroupDestination}
                mymonth={myGroupMonth}
                myday={myGroupDay}
                myhour={myGroupHour}
                myminute={myGroupMinute}
                mycount={myGroupMemberCount}
                myid = {myGroupID}
            />

            <PreMyGroupModal
                show = {isPreView}
                onHide = {() => setIsPreView(false)}
            />

            <ChatModal
                show = {isChatView}
                onHide = {() => setIsChatView(false)}
                myid = {myGroupID}
            />
        </div>
    )
}

export default Navbars;