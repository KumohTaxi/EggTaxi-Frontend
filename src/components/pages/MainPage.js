import Navbars from "../bars/Navbars";
import Map from "../maps/Map";
import Footer from "../footers/Footer";
import './MainPage.css';

const MainPage=()=>{

    return(
        <div id='Main'>
            <div className='Navbars'>
                {<Navbars/>}
            </div>
            <div className='Map'>
                {<Map/>}
            </div>
            <div className='Footer'>
                {<Footer/>}
            </div>
        </div>
    );
}

export default MainPage;