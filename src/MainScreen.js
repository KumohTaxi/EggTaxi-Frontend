import React, { useState, useRef } from 'react'
import mapData from './Location';
import RoomModal from './RoomModal';
import "./MainScreen.css"

import { Navbar, Container, Nav, ButtonGroup, Button, Offcanvas, DropdownButton, Dropdown} from 'react-bootstrap';
import { render } from '@testing-library/react';

function MainScreen() {
  const [modalShow, setModalShow] = React.useState(false);
  const [Des, sDes] = useState('');
  const [Hour, sHour] = useState(0);
  const [Min, sMin] = useState(0);
  const [Lat, setLat] = useState(0);
  const [Lng, setLng] = useState(0);

  function DHPCallback(inputDes, inputHour, inputMin){
    sDes(inputDes);
    sHour(inputHour);
    sMin(inputMin);
  }

  function LocCallback(saveLat, saveLng){
    setLat(saveLat);
    setLng(saveLng);
  }

  return (
    <div className="MainScreen">

      <Navbar className='menubar' bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Taxi-Share</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">MENU</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">My Room</Nav.Link>
                <Nav.Link href="#action2">Others Room</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <div id = 'map'>
        { mapData() }
      </div>
       
      <ButtonGroup className='buttonGroup' aria-label="Basic example">
        <DropdownButton
          className='choiceTime'
          as={ButtonGroup}
          key="up"
          id={`dropdown-button-drop-up`}
          drop="up"
          variant="secondary"
          title={` 시간대 선택 `}
        >
          <div style = {{height: '300px', overflow: "auto", textAlign: "center"}}>
            <Dropdown.Item eventKey="-1">전 체</Dropdown.Item>
            {reTime()}
          </div>
        </DropdownButton>
        <Button onClick={()=>setModalShow(true)} className='makeRoom' variant="secondary" size="lg">
          방 만들기
        </Button>
      </ButtonGroup>

      <RoomModal
          parentCallback = {DHPCallback}
          show = {modalShow}
          onHide = {() => setModalShow(false)}
          saveInfo = {
            Hour > 23 || Hour < 0 || Min > 59 || Min < 0
            ? () => true
            : () => {setModalShow(false);
            }
          }
      />
      <mapData
        preentLocCallback = {LocCallback}
      />
      
    </div>
  );
}

render(<MainScreen />)

function Time_Line(porps){
  return(
    <>
      <Dropdown.Divider />
      <Dropdown.Item eventKey={porps.chTime}>
        {porps.chTime + '시 ~ ' + (porps.chTime + 1) + '시'}
      </Dropdown.Item>
    </>
  )
}
function reTime(){
  var newArray = [];
  for(var i = 0; i < 24; i++)
  {
    newArray.push(<Time_Line chTime = {i}></Time_Line>)
  }
  return newArray;
}

export default MainScreen;