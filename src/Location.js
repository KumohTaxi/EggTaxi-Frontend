/*global kakao*/ 
import React, {useState, useEffect } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';
import './Location.css';

const Location = (props) => {
    const [Lat, setLat] = useState(36.14243941272335);
    const [Lng, setLng] = useState(128.39433251647304);

    useEffect(()=>{

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(Lat, Lng), // 지도의 중심좌표
                
            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {     
            
            setLat(mouseEvent.latLng.getLat());
            setLng(mouseEvent.latLng.getLng());

            // 클릭한 위치에 마커를 표시합니다 
            addMarker(mouseEvent.latLng); 
        });

        // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
        var markers = [];

        // 마커 하나를 지도위에 표시합니다 
        addMarker(new kakao.maps.LatLng(Lat, Lng));

        // 마커를 생성하고 지도위에 표시하는 함수입니다
        function addMarker(position) {
            
            //전의 마크를 삭제합니다
            setMarkers(null); 

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
    }, [Lat, Lng])


    return (
        <div id="map"></div>
    )
};

export default Location;