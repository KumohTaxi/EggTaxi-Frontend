/*global kakao*/ 
import React, { useContext, useEffect, useState } from 'react'
import { LatLngContext } from '../../contexts/LatLngContexts';
import { MakeContext } from '../../contexts/MakeContext';
import axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';

const Map = () =>{
    const { isLatLng, setIsLatLng } = useContext(LatLngContext);
    const { isMake } = useContext(MakeContext);

    const [Data, setData] = useState([]);

    async function get() {
        const result = await axios(`/room`);

        if(true){
            setData(result.data);
            console.log(result);
            console.log(result.data);
        }
    }


    useEffect(()=>{
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div  
        var mapOption = { 
            center: new kakao.maps.LatLng(isLatLng[0], isLatLng[1]), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        get();

        // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) { 
            setIsLatLng([mouseEvent.latLng.getLat(), mouseEvent.latLng.getLng()]);
            // 클릭한 위치에 마커를 표시합니다 
            addMarker(mouseEvent.latLng); 
                
        });

        // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
        var markers = [];

        // 마커 하나를 지도위에 표시합니다 
        addMarker(new kakao.maps.LatLng(isLatLng[0], isLatLng[1]));

        // 마커를 생성하고 지도위에 표시하는 함수입니다
        function addMarker(position) {
            hideMarkers();

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: position
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
            
            // 생성된 마커를 배열에 추가합니다
            markers.push(marker);
        }

        // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
        function setMarkers(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }            
        }

        // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
        function hideMarkers() {
            setMarkers(null);    
        }

    }, [isMake]);

    return (
        <div id="map" style={{height: "100%"}}></div> 
    );
};

export default Map;