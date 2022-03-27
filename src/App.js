import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import SettingPage from './pages/SettingPage.js';
import SignUpPage from './pages/SignUpPage.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Route className= "LoginPage" path="/" component={LoginPage} exact={true}/>
        <Route className= "MainPage" path="/Main" component={MainPage}/>
        <Route className= "SettingPage" path="/Setting" component={SettingPage}/>
        <Route className= "SignUpPage" path="/SignUp" component={SignUpPage}/>
      </Router>
    </div>
  );
}


export default App;