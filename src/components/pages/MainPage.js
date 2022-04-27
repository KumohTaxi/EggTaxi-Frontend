import Navbars from "../bars/Navbars";
import Map from "../maps/Map";
import Footer from "../footers/Footer";
import MinFooter from "../footers/MinFooter";
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
            <div>
                <div className='Navbars'>
                    {<Navbars/>}
                </div>
                <div className='Map'>
                    {<Map/>}
                </div>
                <div className='Footer'>
                    {isPc && <Footer/>}
                    {isMobile && <MinFooter/>}
                </div>
            </div>
        </div>
    );
}

export default MainPage;