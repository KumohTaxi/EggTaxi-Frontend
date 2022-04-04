import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { LatLngContext } from './contexts/LatLngContexts';
import React, { useState } from 'react';
import { MakeContext } from './contexts/MakeContext';

function App() {
  const [isLatLng, setIsLatLng] = useState([36.142410487698, 128.39430145218606])
  const [isMake, setIsMake] = useState([false]);

  return (
    <LatLngContext.Provider value={{isLatLng, setIsLatLng}}>
      <MakeContext.Provider value={{isMake, setIsMake}}>
        <div className="App">
          <Router>
            <Route className= "LoginPage" path="/" component={LoginPage} exact={true}/>
            <Route className= "MainPage" path="/Main" component={MainPage}/>
            <Route className= "SignUpPage" path="/SignUp" component={SignUpPage}/>
          </Router>
        </div>
      </MakeContext.Provider>
    </LatLngContext.Provider>
  );
}


export default App;