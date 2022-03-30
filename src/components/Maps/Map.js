/*global kakao*/ 
import React, { useEffect, useState } from 'react'

const Map=()=>{
    const [LatLng, setLatLng] = useState([36.142410487698, 128.39430145218606]);

    useEffect(()=>{
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
        mapOption = { 
            center: new kakao.maps.LatLng(LatLng[0], LatLng[1]), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    })


    return (
        <div id="map" style={{height: "100%"}}></div> 
    )
}

export default Map;