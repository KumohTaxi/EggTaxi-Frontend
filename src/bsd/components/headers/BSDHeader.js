import React, { useState } from 'react'
import '../../styles/headers/BSDHeader.css';
import FilterForm from '../forms/FilterForm';

const BSDHeader=({onMap, setOnMap, isFind, setIsFind, setShowCondition})=>{
    const [isFilter, setIsFilter] = useState(false);
    const [childHeight, setChildHeight] = useState(-1);

    const changeBtn = () => {
        setIsFind(!isFind);
    }

    const changeMove = () => {
        setOnMap(!onMap);
    }

    return(
        <>
            <div className='BSDHeader'>
                <button onClick={()=>{changeMove();}}>
                    {onMap ? 
                    (<img src='/icons/bsd_list_btn.png' alt='list'/>):
                    (<img src='/icons/bsd_map_btn.png' alt='list'/>)
                }
                </button>
                <button onClick={()=>{changeBtn();}}>
                    <div className={['header_clicked_find_btn', !isFind && 'header_unclicked_find_btn'].join(' ')}>
                        습득
                    </div>
                    <div className={['header_clicked_lost_btn', isFind && 'header_unclicked_lost_btn'].join(' ')}>
                        분실
                    </div>
                </button>
                <button onClick={()=>setIsFilter(!isFilter)}>
                    <img src='/icons/bsd_filter_btn.png' alt='filter'/>
                </button>
            </div>
            <div className={['bsd_filter_canvas', isFilter && 'bsd_filter_canvas_open'].join(' ')}
                style={isFilter?{height: childHeight}:{height: "0px"}}>
                <FilterForm isFilter={isFilter} onMap={onMap} setChildHeight={setChildHeight} setShowCondition={setShowCondition} setIsFilter={setIsFilter}/>
            </div>
        </>
    );
}

export default BSDHeader;