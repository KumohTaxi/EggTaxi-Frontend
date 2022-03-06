/*eslint-disable*/

import React, {useState, useEffect} from 'react';
import './App.css';
import Mainscreen from './MainScreen.js';
import axios from 'axios';
import { Form,Col,Row } from 'react-bootstrap';
import  { Route, Routes } from 'react-router-dom';

function App () {

  function SettingForm()
  {
    return(
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              ID
            </Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
        </Form>
      </div>
    )
  }

  function MainForm()
  {
    const [inputId,setInputId] = useState('');
    const [inputPw,setInputPw] = useState('');
    const handlerId = (e)=>{ setInputId(e.target.value) };
    const handlerPw = (e)=>{ setInputPw(e.target.value) };
    const handlerSubmit = ()=>{ 
      axios({
        method: 'post',
        url: '/start',
        data: { id: inputId, password: inputPw },
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((result)=>{
        if(result.data === 'success')
          {window.location.href = "/Map"}
        else
          {
            alert(result.data);
            window.location.href = "/";
          }
      })
      .catch((e)=>{console.log(e)})
    };

    return(
      <div>
        <Form method='post' onSubmit={handlerSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextId">
            <Form.Label column sm="2">
              ID
            </Form.Label>
            <Col sm="10">
              <Form.Control name='id' type="id" placeholder="Id" required fullwidth='true' autoFocus onChange={handlerId}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              PWD
            </Form.Label>
            <Col sm="10">
              <Form.Control name='pw' type="password" placeholder="Password" required fullwidth='true' onChange={handlerPw}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextSignin">
            <Form.Label column sm="2">
            </Form.Label>
            <Col sm="10">
              <Form.Control type='submit' value='전송'/>
            </Col>
          </Form.Group>
        </Form>
      </div>
    )
  }

  function PageError()
  {
    return(
      <div>
        <h1>Not Found</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <Routes className = "pages" >
        <Route path="/" element={<MainForm/>}/>
        <Route className = "map" path="/Map" element={<Mainscreen/>}/>
        <Route path="/CreateRoom" element={<SettingForm/>}/>
        <Route path="/*" element={<PageError/>}/>
      </Routes>
    </div>
  )
  
}

export default App;