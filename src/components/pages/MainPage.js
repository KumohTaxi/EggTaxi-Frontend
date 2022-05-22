import Navbars from "../bars/Navbars";
import Map from "../maps/Map";
import Footer from "../footers/Footer";
import './MainPage.css';
import { useEffect } from "react";

const MainPage=()=>{
    useEffect(()=>{
        if(localStorage.getItem("access_token") === null){
            window.location.replace('/');
        }
    }, [])

    return(
        <div className='Main'>
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