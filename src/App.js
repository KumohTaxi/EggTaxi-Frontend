import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { LatLngContext } from './contexts/LatLngContexts';
import React, { useEffect, useState } from 'react';
import { MakeContext } from './contexts/MakeContext';
import axios from 'axios';
import { GetContext } from './contexts/GetContext';
import RedirectHandler from './components/OAuths/RedirectHandler';

function App() {
  const [isLatLng, setIsLatLng] = useState([36.142410487698, 128.39430145218606])
  const [isMake, setIsMake] = useState([false]);
  const [isGet, setIsGet] = useState([]);

  useEffect(()=>{
    axios.get(`/group`)
            .then(response => {
                setIsGet(response.data);
            });
  }, [isMake]);

  return (
    <LatLngContext.Provider value={{isLatLng, setIsLatLng}}>
      <MakeContext.Provider value={{isMake, setIsMake}}>
        <GetContext.Provider value={{isGet, setIsGet}}>
          <div className="App">
            <Router>
              <Route className= "LoginPage" path="/" component={LoginPage} exact={true}/>
              <Route className= "MainPage" path="/Main" component={MainPage}/>
              <Route className= "RedirectPage" path="/oauth/callback/kakao" component={RedirectHandler}></Route>
            </Router>
          </div>
        </GetContext.Provider>
      </MakeContext.Provider>
    </LatLngContext.Provider>
  );
}


export default App;