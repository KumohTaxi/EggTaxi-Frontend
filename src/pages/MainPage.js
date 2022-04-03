import Navbars from "../components/Bars/Navbars";
import Map from "../components/Maps/Map";
import Footer from "../components/Footers/Footer";
import minFooter from "../components/Footers/minFooter";
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
    );
}

export default MainPage;