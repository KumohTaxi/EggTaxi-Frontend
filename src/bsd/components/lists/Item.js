import '../../styles/lists/Item.css';
import React, { useState } from 'react';
import DetailCanvas from '../offcanvases/DetailCanvas';

const Item = ({itemInfo}) => {
    const [detail, setDetail] = useState(false);

    return (
        <div className="item-box" onClick={()=>setDetail(true)}>

            <div className="item-image-box">
                <img className="item-image" src={itemInfo.imgSrc} alt='이미지'/>
            </div>
            
            <div className="item-name">{itemInfo.name}</div>
            
            <div className="item-sub-box">
                <div className="item-sub-date">{itemInfo.date}</div>
                <div className="item-sub-location">{itemInfo.address}</div>
            </div>

            <DetailCanvas
                show = {detail}
                onHide = {()=>setDetail(false)}
                itemInfo = {itemInfo}
            />
        </div>
    )
}

export default Item;