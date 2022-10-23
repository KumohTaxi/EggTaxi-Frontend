import '../../styles/lists/Item.css';
import React from 'react';

const Item = ({ itemInfo, setDetail, setDetailData }) => {
    const setDetailwindow = () => {
        setDetailData(itemInfo);
        setDetail(true);
    }

    return (
        <div className="item-box" onClick={()=>setDetailwindow()}>
            <div className="item-image-box">
                <img className="item-image" src={itemInfo.imgSrc ? itemInfo.imgSrc : '/icons/bsd_null.png'} alt='이미지' />
            </div>

            <div className="item-name">{itemInfo.name}</div>

            <div className="item-sub-box">
                <div className="item-sub-date">{itemInfo.date}</div>
                <div className="item-sub-location">{itemInfo.address}</div>
            </div>
        </div>
    )
}

export default Item;