import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/pages/MainPage.js';
import LoginPage from './components/pages/LoginPage.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { LatLngContext } from './contexts/LatLngContexts';
import React, { useEffect, useState } from 'react';
import { MakeContext } from './contexts/MakeContext';
import axios from 'axios';
import { GetContext } from './contexts/GetContext';
import RedirectionHandler from './oauths/RedirectionHandler';

function App() {
  const [isLatLng, setIsLatLng] = useState([36.142410487698, 128.39430145218606])
  const [isCreation, setIsCreation] = useState([false]);
  const [isListInfo, setIsListInfo] = useState([]);

  useEffect(()=>{
    axios.get(`/group`)
            .then(response => {
                setIsListInfo(response.data);
            });
  }, [isCreation]);

  return (
    <LatLngContext.Provider value={{isLatLng, setIsLatLng}}>
      <MakeContext.Provider value={{isCreation, setIsCreation}}>
        <GetContext.Provider value={{isListInfo, setIsListInfo}}>
          <div className="App">
            <Router>
              <Route className= "LoginPage" path="/" component={LoginPage} exact={true}/>
              <Route className= "MainPage" path="/Main" component={MainPage}/>
              <Route className= "RedirectPage" path="/oauth/callback/kakao" component={RedirectionHandler}></Route>
            </Router>
          </div>
        </GetContext.Provider>
      </MakeContext.Provider>
    </LatLngContext.Provider>
  );
}


export default App;