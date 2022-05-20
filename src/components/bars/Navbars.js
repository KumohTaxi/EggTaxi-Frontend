import {Navbar, Container} from 'react-bootstrap';
import './Navbars.css';
import React, {useEffect, useState} from 'react'
import FilterOffCanvas from '../offcanvas/FilterOffCanvas';
import CheckOffCanvas from '../offcanvas/CheckOffCanvas';
import { CheckLatLngContext } from '../../contexts/CheckLatLngContext';
import { useContext } from 'react';
import MyGroupModal from '../modals/mainmodals/MyGroupModal.js';
import UserModal from '../modals/mainmodals/UserModal';
import PreMyGroupModal from '../modals/submodals/info_modals/PreMyGroupModal';
import axios from 'axios';
import { PROXY } from '../../contexts/ProxyContext';
import ChatModal from '../modals/mainmodals/ChatModal';
import InfoGuideModal from '../modals/submodals/guide_modals/InfoGuideModal';

const Navbars=({location})=>{
    const [leftCanvasShow, setLeftCanvasShow] = useState(false);
    const lefthandleShow = () => setLeftCanvasShow(true);

    const { isCheckShow, setIsCheckShow } = useContext(CheckLatLngContext);
    const checkHandleOnHide = () => setIsCheckShow(false);

    const [myGroupView, setMyGroupView] = useState(false);
    const [userView, setUserView] = useState(false);
    const [isPreView, setIsPreView] = useState(false);
    const [isChatView, setIsChatView] = useState(false);
    const [isGuideModal, setIsGuideModal] = useState(false);

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
                            <img className='User' src='imgs/User.png' alt='이미지를 불러올 수 없습니다.' onClick={()=>{setUserView(true); checkHandleOnHide();}}/>
                            <img className='taxiInformation' src='imgs/information.png' alt='이미지를 불러올 수 없습니다.'
                            onClick={()=>setIsGuideModal(true)}/>
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
                mydestination={myGroupDestination}
                mymonth={myGroupMonth}
                myday={myGroupDay}
                myhour={myGroupHour}
                myminute={myGroupMinute}
                mycount={myGroupMemberCount}
                myid = {myGroupID}
            />
            <UserModal
                show = {userView}
                onHide = {() => setUserView(false)}
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
            
            <InfoGuideModal
                show={isGuideModal}
                onHide={() => setIsGuideModal(false)}
            />
        </div>
    )
}

export default Navbars;