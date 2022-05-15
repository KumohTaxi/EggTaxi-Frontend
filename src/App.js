import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/pages/MainPage.js';
import LoginPage from './components/pages/LoginPage.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { LatLngContext } from './contexts/LatLngContexts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetContext } from './contexts/GetContext';
import RedirectionHandler from './oauths/RedirectionHandler';
import { CheckLatLngContext } from './contexts/CheckLatLngContext';
import { PROXY } from './contexts/ProxyContext';
import { useMediaQuery } from 'react-responsive';
import MinDisplayPage from './components/pages/MinDisplayPage';
import PromotionPage from './components/pages/PromotionPage.js';

function App() {
  const [isLatLng, setIsLatLng] = useState();
  const [isListInfo, setIsListInfo] = useState([]);
  const [isCheckShow, setIsCheckShow] = useState(false);

  useEffect(()=>{
    axios({
      method:'post',
      url:`${PROXY}/group`,
      data:{
          accessToken: localStorage.getItem('access_token'),
      },
      headers:{
          'ContentType':'application/json'
      },
    })
    .then((response) => {
      setIsListInfo(response.data);
    })
  }, []);

  const isMin = useMediaQuery({
    query : "(min-width:270px)"
  });
  const isMax = useMediaQuery({
    query : "(max-width:269px)"
  });

  const promotionUrl = [];
  isListInfo.map(data=>
    promotionUrl.push(`/promotion/${data.id}`)
  );

  return (
    <LatLngContext.Provider value={{isLatLng, setIsLatLng}}>
      <GetContext.Provider value={{isListInfo, setIsListInfo}}>
        <CheckLatLngContext.Provider value={{isCheckShow, setIsCheckShow}}>
          <div className="App">
            {isMin && <Router>
                <Route className= "LoginPage" path="/" component={LoginPage} exact={true}/>
                <Route className= "MainPage" path="/Main" component={MainPage}/>
                <Route className= "RedirectPage" path="/oauth/callback/kakao" component={RedirectionHandler}></Route>
                {promotionUrl.map(url=>
                  <Route key={url} className= "PromotionPage" path={url} component={PromotionPage}></Route>
                )}
              </Router>}
            {isMax && <MinDisplayPage/>}
          </div>
        </CheckLatLngContext.Provider>
      </GetContext.Provider>
    </LatLngContext.Provider>
  );
}


export default App;