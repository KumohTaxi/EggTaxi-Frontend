import '../../styles/pages/BSDMapPage.css'
import GoogleMap from '../maps/GoogleMap';
import BSDHeader from '../headers/BSDHeader.js';

const BSDMapPage=()=>{

    return(
        <div className='bsdMain'>
            <div className="main_header">
                <BSDHeader/>
            </div>
            <div className="main_map">
                <GoogleMap/>
            </div>
        </div>
    );
}

export default BSDMapPage;