import '../../styles/pages/BSDMapPage.css'
import GoogleMap from '../maps/GoogleMap';
import BSDHeader from '../headers/BSDHeader.js';
import SearchList from '../lists/SearchList';

import { React, useEffect, useState } from 'react';
import axios from 'axios';

const BSDMapPage = () => {
    const [onMap, setOnMap] = useState(true);
    const [isFind, setIsFind] = useState(true);
    const [InitData, setInitData] = useState([]);
    const [isUseData, setIsUseData] = useState([]);
    const [showCondition, setShowCondition] = useState({
        current: true,
        allofDate: true,
        category: '',
        name: ''
    });

    const sortAry = (ary, current) => {
        return ary.sort((a, b) => {
            let aDate = parseInt(a.date.split('-').join(''));
            let bDate = parseInt(b.date.split('-').join(''));
            return current ? bDate - aDate : aDate - bDate;
        });
    }

    useEffect(() => {
        const setIsItems = (isItems) => {
            let tempList = [];
            console.log(isItems);
            if (isItems.length > 0) {
                isItems.map(x => {
                    const tempCategory = x.category.split(' ')[0];
                    let temp = {
                        atcId: x.atcId,
                        category: tempCategory,
                        imgSrc: x.img,
                        address: x.location,
                        date: x.lostDate,
                        name: x.name,
                        comment: x.comment,
                        id: x.identityNum,
                        radius: x.radius,
                        latlng: {lat: x.lat, lng: x.lng},
                        status: x.status,
                        foundOrder: x.foundOrder,
                        itemId : x.itemId
                    };
                    tempList.push(temp);
                    return x;
                })
            }
            setInitData(tempList);
            setIsUseData(sortAry(tempList, true));
        }

        const status = isFind ? 'ACQUIRE' : 'LOST';

        const addressFilter = (data) => {
            const tempData = data.filter(x=>{
                const xList = x.location.split(' ')
                if(xList.includes('양포동') || xList.includes('거의동') || xList.includes('옥계동')) return x;
            })
            setIsItems(tempData);
        }

        axios.get(`${process.env.REACT_APP_PROXY}/item?location=구미시&status=${status}`)
            .then((res) => {
                addressFilter(res.data);
            })
            .catch((err) => {
                alert('데이터를 불러오지 못했습니다. 새로고침을 해보세요.');
            })
    }, [isFind]);

    useEffect(() => {
        const filteringDate = (ary) => {
            let filterList = [];
            const tempMonth = showCondition.month < 10 ? '0' + showCondition.month : showCondition.month;
            const tempDay = showCondition.day < 10 ? '0' + showCondition.day : showCondition.day;
            let targetDate = showCondition.year + '-' + tempMonth + '-' + tempDay;
            ary.map(x => {
                if (x.date === targetDate) filterList.push(x);
                return x;
            })
            return filterList;
        }
        const filteringCategory = (ary) => {
            let filterList = [];
            ary.map(x => {
                if (x.category === showCondition.category) filterList.push(x);
                return x;
            })
            return filterList;
        }
        const filteringName = (ary) => {
            let filterList = [];
            ary.map(x => {
                if (x.name === showCondition.name) filterList.push(x);
                return x;
            })
            return filterList;
        }
        
        let filterList = InitData.slice();
        if (showCondition.name !== '') filterList = filteringName(filterList);
        if (showCondition.category !== '') filterList = filteringCategory(filterList);
        if (!showCondition.allofDate) filterList = filteringDate(filterList);
        filterList = sortAry(filterList, showCondition.current);

        setIsUseData(filterList);
    }, [InitData, showCondition]);

    return (
        <div className='bsdMap'>
            <div className="map_header">
                <BSDHeader onMap={onMap} setOnMap={setOnMap} isFind={isFind} setIsFind={setIsFind} setShowCondition={setShowCondition} />
            </div>

            {onMap ? (<div className="map_map"><GoogleMap isFind={isFind} isUseData={isUseData} /></div>)
                : (<div className="show_list"><SearchList isFind={isFind} isUseData={isUseData} /></div>)}
        </div>
    );
}

export default BSDMapPage;