/*global kakao*/ 
import React, { useContext, useEffect, useState } from 'react'
import { LatLngContext } from '../../contexts/LatLngContexts';
import { MakeContext } from '../../contexts/MakeContext';
import { GetContext } from '../../contexts/GetContext';


const Map = () =>{
    const { isLatLng, setIsLatLng } = useContext(LatLngContext);
    const { isMake } = useContext(MakeContext);
    const { isGet } = useContext(GetContext);


    useEffect(()=>{
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div  
        var mapOption = { 
            center: new kakao.maps.LatLng(isLatLng[0], isLatLng[1]), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) { 
            hideMarkers();
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

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        isGet.map(RoomInfo =>{
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(26, 40); 

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(RoomInfo.latitude, RoomInfo.longitude), // 마커를 표시할 위치
                title : RoomInfo.destination, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage, // 마커 이미지 
                clickable: true
            });

            // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
            // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var iwContent = '<div style="padding:5px;">목적지<br>'
                                +RoomInfo.destination+
                                '<br>출발시간<br>'
                                +RoomInfo.dateTime[5]+RoomInfo.dateTime[6]+'월 '+RoomInfo.dateTime[8]+RoomInfo.dateTime[9]+'일 '
                                +RoomInfo.dateTime[11]+RoomInfo.dateTime[12]+'시 '+RoomInfo.dateTime[14]+RoomInfo.dateTime[15]+'분'+
                            '</div>', 
                iwRemoveable = true; 
            // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);  
            });
        });

    }, [isMake, isGet]);

    return (
        <div id="map" style={{height: "100%"}}></div> 
    );
};

export default Map;