import '../../styles/pages/BSDMapPage.css'
import GoogleMap from '../maps/GoogleMap';
import BSDHeader from '../headers/BSDHeader.js';
import SearchList from '../lists/SearchList';

import { React, useState } from 'react';

const BSDMapPage=()=>{

    const [onMap, setOnMap] = useState(false);
    const [isFind, setIsFind] = useState(true);

    return(
        <div className='bsdMap'>
            <div className="map_header">
                <BSDHeader onMap={onMap} setOnMap={setOnMap} isFind={isFind} setIsFind={setIsFind}/>
            </div>

            {onMap ? (<div className="map_map"><GoogleMap isFind={isFind}/></div>)
            : (<div className="show_list"><SearchList isFind={isFind}/></div>)}
        </div>
    );
}

export default BSDMapPage;