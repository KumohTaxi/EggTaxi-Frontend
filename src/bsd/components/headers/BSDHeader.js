import React, { useState } from 'react'
import '../../styles/headers/BSDHeader.css';

const BSDHeader=({onMap,setOnMap,isFind,setIsFind})=>{

    const changeBtn = () => {
        setIsFind(!isFind);
    }

    const changeMove = () => {
        setOnMap(!onMap);
    }

    return(
        <div className='BSDHeader'>
            <button onClick={()=>{changeMove();}}>
                {onMap ? 
                (<img src='/icons/bsd_list_btn.png' alt='list'/>):
                (<img src='/icons/bsd_map_btn.png' alt='list'/>)
            }
            </button>
            <button onClick={()=>{changeBtn();}}>
                <div className={isFind?'header_clicked_btn':'header_unclicked_btn'}>
                    습득
                </div>
                <div className={isFind?'header_unclicked_btn':'header_clicked_btn'}>
                    분실
                </div>
            </button>
            <button>
                <img src='/icons/bsd_filter_btn.png' alt='filter'/>
            </button>
        </div>
    );
}

export default BSDHeader;