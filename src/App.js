import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './egg-taxi/components/pages/MainPage.js';
import LoginPage from './egg-taxi/components/pages/LoginPage.js';
import { Routes, Route } from 'react-router-dom';
import { LatLngContext } from './egg-taxi/contexts/LatLngContexts';
import React, { useState } from 'react';
import { GetContext } from './egg-taxi/contexts/GetContext';
import RedirectionHandler from './egg-taxi/oauths/RedirectionHandler';
import { CheckLatLngContext } from './egg-taxi/contexts/CheckLatLngContext';
import { useMediaQuery } from 'react-responsive';
import MinDisplayPage from './egg-taxi/components/pages/MinDisplayPage';
import PromotionPage from './egg-taxi/components/pages/PromotionPage.js';
import MadeByPage from './egg-taxi/components/pages/MadeByPage.js';
import GlobalStyle from './GlobalStyle.js';
import BSDMapPage from './bsd/components/pages/BSDMapPage.js';
import RegistrationForm from './bsd/components/forms/RegistrationForm.js';
import IndexPage from './IndexPage.js';
import BSDMainPage from './bsd/components/pages/BSDMainPage.js';
import BSDChatingPage from './bsd/components/pages/BSDChatingPage.js';
import BSDChatRoomPage from './bsd/components/pages/BSDChatRoomPage.js';

function App() {
  const [isLatLng, setIsLatLng] = useState();
  const [isListInfo, setIsListInfo] = useState([]);
  const [isCheckShow, setIsCheckShow] = useState(false);

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    console.log("resize");
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  
  const isMin = useMediaQuery({
    query : "(min-width:270px)"
  });
  const isMax = useMediaQuery({
    query : "(max-width:269px)"
  });

  return (
    <LatLngContext.Provider value={{isLatLng, setIsLatLng}}>
      <GetContext.Provider value={{isListInfo, setIsListInfo}}>
        <CheckLatLngContext.Provider value={{isCheckShow, setIsCheckShow}}>
          <GlobalStyle/>
          <div className="App">
            {isMin && <Routes>
                <Route className= "LoginPage" path="/" element={<IndexPage />} exact={true}/>
                <Route className= "LoginPage" path="/taxi-login" element={<LoginPage />}/>
                <Route className= "MainPage" path="/Main" element={<MainPage />}/>
                <Route className= "RedirectPage" path="/oauth/callback/kakao" element={<RedirectionHandler />}></Route>
                <Route className= "PromotionPage" path='/promotion/:groupid' element={<PromotionPage />}></Route>
                <Route className= "MadeByPage" path='/madeby' element={<MadeByPage />}></Route>
                <Route className= "BSDMapPage" path='/bsd/map' element={<BSDMapPage />}></Route>
                <Route className= "BSDRegistrationPage" path='/bsd/Registration/:state' element={<RegistrationForm />}></Route>
                <Route className= "BSDMain" path='/bsd/main' element={<BSDMainPage />}></Route>
                <Route className= "BSDChating" path='/bsd/chating' element={<BSDChatingPage/>}></Route>
                <Route className= "BSDChating" path='/bsd/chat/:id' element={<BSDChatRoomPage/>}></Route>
              </Routes>}
            {isMax && <MinDisplayPage/>}
          </div>
        </CheckLatLngContext.Provider>
      </GetContext.Provider>
    </LatLngContext.Provider>
  );
}


export default App;