/*global kakao*/ 
import React, { useEffect } from 'react'

const PromotionMap = (props) =>{
    useEffect(()=>{
        if(props.proLat && props.proLng){
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = { 
                    center: new kakao.maps.LatLng(props.proLat, props.proLng), // 지도의 중심좌표
                    level: 4 // 지도의 확대 레벨
                };

            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            
            var MarkerImg = "/imgs/PossibleMarker.png"

            // 마커 이미지의 이미지 크기 입니다
            var MarkerSize = new kakao.maps.Size(27, 40); 

            // 마커 이미지를 생성합니다    
            var promotionMarkerImg = new kakao.maps.MarkerImage(MarkerImg, MarkerSize); 

            // 마커가 표시될 위치입니다 
            var markerPosition  = new kakao.maps.LatLng(props.proLat, props.proLng); 

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition,
                image: promotionMarkerImg,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
        }
    }, [props]);

    return (
        <div id="map" style={{height: "100%"}}></div>
    );

    
};

export default PromotionMap;