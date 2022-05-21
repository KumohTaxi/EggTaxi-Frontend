import Navbars from "../bars/Navbars";
import Map from "../maps/Map";
import Footer from "../footers/Footer";
import './MainPage.css';
import { useEffect } from "react";

const MainPage=()=>{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
        console.log("resize");
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

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