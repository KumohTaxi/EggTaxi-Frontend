import '../../styles/lists/SearchList.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Item from './Item';

const SearchList = ({isFind}) => {

    const [itemsInfo,setItemsInfo] = useState([]);

    const getFoundItems =  async () => {        
        const itemArray = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setItemsInfo(itemArray.data);
    }

    const getLostItems =  async () => {        
        const itemArray = await axios.get("https://jsonplaceholder.typicode.com/albums");
        setItemsInfo(itemArray.data);
    }

    useEffect(()=>{
        {isFind ? 
            getFoundItems() :
            getLostItems();
        }
    },[isFind])

    return (
        <div id="lists" style={{height:"100%"}}> 
            {itemsInfo.length === 0 ?
                (<div className="item-notice-box">
                    <div className="item-notice"> 등록된 {isFind ? "습득물" : "분실물"}이 없습니다 .. 흐엥 </div>
                </div>) :
                (itemsInfo.map((itemInfo)=>{return <div key="itemInfo.id"><Item itemInfo={itemInfo}/></div>}))}
        </div>
    )
}

export default SearchList;