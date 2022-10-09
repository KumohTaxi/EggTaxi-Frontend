import '../../styles/lists/Item.css';
import React from 'react';

const Item = ({itemInfo}) => {

    return (
        <div className="item-box">

            <div className="item-image-box">
                <div className="item-image">이미지</div>
            </div>
            
            <div className="item-name">물건에 대한 내용입니다!</div>
            
            <div className="item-sub-box">
                <div className="item-sub-date">{itemInfo.userId}</div>
                <div className="item-sub-location">{itemInfo.title}</div>
            </div>
        </div>
    )
}

export default Item;