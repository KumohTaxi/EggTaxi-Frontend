import Navbars from "../components/Main/Bars/Navbars";
import Map from "../components/Main/Maps/Map";
import Footer from "../components/Main/Footers/Footer";
import minFooter from "../components/Main/Footers/minFooter";
import './MainPage.css';
import { useMediaQuery } from "react-responsive"

const MainPage=()=>{
    const isPc = useMediaQuery({
        query : "(min-width:351px)"
      });
      const isMobile = useMediaQuery({
        query : "(max-width:350px)"
      });

    return(
        <div id='Main'>
            <div className='Navbars'>
                {Navbars()}
            </div>
            <div className='Map'>
                {Map()}
            </div>
            <div className='Footer'>
                {isPc && Footer()}
                {isMobile && minFooter()}
            </div>
        </div>
        
    )
}

export default MainPage