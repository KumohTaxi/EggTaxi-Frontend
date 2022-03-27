import './SignUpPage.css';
import Footer from "../components/Footers/Footer";
import minFooter from "../components/Footers/minFooter";
import { useMediaQuery } from "react-responsive";
import SignUpForm from '../forms/SignUpForm';

const SignUpPage = () => {
    const isPc = useMediaQuery({
        query : "(min-width:351px)"
    });
    const isMobile = useMediaQuery({
    query : "(max-width:350px)"
    });

    return(
        <div id="signup">
            <div className='signupmain'>
                <div className='signuptop'>
                    <img className='signupLogo' src="imgs/Taxi-Logo.png"/>
                </div>
                <div className='signupmiddle'>
                    <div className='SignUpForm'>
                        {SignUpForm()}
                    </div>
                </div>
            </div>
            <div className='Footer'>
                {isPc && Footer()}
                {isMobile && minFooter()}
            </div>
        </div>
    );
}

export default SignUpPage;