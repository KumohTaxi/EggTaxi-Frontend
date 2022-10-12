import '../../styles/lists/SearchList.css';
import { React } from 'react';
import Item from './Item';

const SearchList = ({isFind, isUseData}) => {
    return (
        <div id="lists" style={{height:"100%"}}> 
            {isUseData.length === 0 ?
                (<div className="item-notice-box">
                    <div className="item-notice"> 등록된 {isFind ? "습득물" : "분실물"}이 없습니다.</div>
                </div>) :
                (isUseData.map((itemInfo, idx)=>{return <div key={idx}><Item itemInfo={itemInfo}/></div>}))}
        </div>
    )
}

export default SearchList;