/*global kakao*/ 
import React, { useContext, useEffect, useState } from 'react'
import { LatLngContext } from '../../contexts/LatLngContexts';
import { GetContext } from '../../contexts/GetContext';
import GroupInfoModal from '../modals/mainmodals/GroupInfoModal';
import CheckOffCanvas from '../offcanvas/CheckOffCanvas';
import { CheckLatLngContext } from '../../contexts/CheckLatLngContext';
import LoadingModal from '../modals/submodals/alert_modals/LoadingModal';

const Map = () =>{
    const { isLatLng, setIsLatLng } = useContext(LatLngContext);
    const { isListInfo } = useContext(GetContext);
    const { isCheckShow, setIsCheckShow } = useContext(CheckLatLngContext);
    
    const [groupView, setGroupView] = useState(false);
    const [groupDestination, setGroupDestination] = useState('');
    const [groupMonth, setGroupMonth] = useState('');
    const [groupDay, setGroupDay] = useState('');
    const [groupHour, setGroupHour] = useState('');
    const [groupMinute, setGroupMinute] = useState('');
    const [groupMemberCount, setGroupMemeberCount] = useState();
    const [groupID, setGroupID] = useState();
    const [isLoadingShow, setIsLoadingShow] = useState(true);

    var todayDate = new Date();

    const checkHandleShow = () => setIsCheckShow(true);
    const checkHandleOnHide = () => setIsCheckShow(false);

    useEffect(()=>{
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div  
        var mapOption = { 
            center: new kakao.maps.LatLng(isLatLng?isLatLng[0]: 36.14511282413091, isLatLng?isLatLng[1]:128.39342434932092), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

                map.setCenter(locPosition);  

                setIsLoadingShow(false)
            });
        }
        else{
            alert("위치를 받아올수 없습니다.")
        }

        var LocationMarker = "imgs/LocationMarker.png"

        // 마커 이미지의 이미지 크기 입니다
        var locationimageSize = new kakao.maps.Size(27, 40); 

        // 마커 이미지를 생성합니다    
        var locationmarkerImage = new kakao.maps.MarkerImage(LocationMarker, locationimageSize); 

        // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) { 
            hideMarkers();
            setIsLatLng([mouseEvent.latLng.getLat()
                , mouseEvent.latLng.getLng()]);
            // 클릭한 위치에 마커를 표시합니다 
            addMarker(mouseEvent.latLng); 
            checkHandleShow();
        });

        // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
        var markers = []; 

        // 마커를 생성하고 지도위에 표시하는 함수입니다
        function addMarker(position) {
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: position,
                image: locationmarkerImage
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

        var PossibleMarker = "imgs/PossibleMarker.png";
        var ImpossibleMarker = "imgs/ImpossibleMarker.png";
        var TimeOutMarker = "imgs/TimeOutMarker.png";

        isListInfo.map(groupInfo =>{
            var stringYear = groupInfo.dateTime[0]+groupInfo.dateTime[1]+groupInfo.dateTime[2]+groupInfo.dateTime[3];
            var stringMonth = groupInfo.dateTime[5]+groupInfo.dateTime[6];
            var stringDay = groupInfo.dateTime[8]+groupInfo.dateTime[9];
            var stringHour = groupInfo.dateTime[11]+groupInfo.dateTime[12];
            var stringMinute = groupInfo.dateTime[14]+groupInfo.dateTime[15];
            
            var stringTodayYear = String(todayDate.getFullYear());
            var stringTodayMonth = todayDate.getMonth()+1 < 10 ? '0'+(todayDate.getMonth()+1) : String(todayDate.getMonth()+1);
            var stringTodayDay = todayDate.getDate() < 10 ? '0'+todayDate.getDate() : String(todayDate.getDate());
            var stringTodayHour = todayDate.getHours() < 10 ? '0'+todayDate.getHours() : String(todayDate.getHours());
            var stringTodayMinute = todayDate.getMinutes() < 10 ? '0'+todayDate.getMinutes() : String(todayDate.getMinutes());

            function CheckMarkerImg(){
                if((Number(stringTodayYear+stringTodayMonth+stringTodayDay+stringTodayHour+stringTodayMinute))
                    > (Number(stringYear+stringMonth+stringDay+stringHour+stringMinute)))
                {
                    return TimeOutMarker;
                }
                else if(groupInfo.memberCount === 4){
                    return ImpossibleMarker;
                }
                else{
                    return PossibleMarker;
                }
            };

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(27, 40); 

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(CheckMarkerImg(), imageSize); 

            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(groupInfo.latitude, groupInfo.longitude), // 마커를 표시할 위치
                title : groupInfo.destination, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage, // 마커 이미지 
                clickable: true
            });
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커 클릭시 GroupModal을 생성합니다.
                setGroupView(true);
                setGroupDestination(groupInfo.destination);
                setGroupMonth(stringMonth);
                setGroupDay(stringDay);
                setGroupHour(stringHour);
                setGroupMinute(stringMinute);
                setGroupMemeberCount(String(groupInfo.memberCount));
                setGroupID(groupInfo.id);
                checkHandleOnHide();
            });
        });

    }, [isListInfo]);

    return (
        <div id="map" style={{height: "100%"}}>
            <GroupInfoModal
                show={groupView}
                onHide={() => setGroupView(false)}
                destination={groupDestination}
                month={groupMonth}
                day={groupDay}
                hour={groupHour}
                minute={groupMinute}
                count={groupMemberCount}
                id = {groupID}
            />
            <CheckOffCanvas
                show = {isCheckShow}
                onHide = {()=>setIsCheckShow(false)}
            />

            <LoadingModal
                show = {isLoadingShow}
                onHide = {()=>setIsLoadingShow(false)}
            />
        </div> 
    );

    
};

export default Map;