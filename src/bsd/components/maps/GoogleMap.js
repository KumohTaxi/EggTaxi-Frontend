import React, { useEffect, useState } from 'react'
import DetailCanvas from '../offcanvases/DetailCanvas';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import LoadingMap from '../guide/LoadingMap';

const GoogleMap = ({ isFind, isUseData }) => {
  const [detail, setDetail] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
  },[isFind, isUseData])

  useEffect(() => {
    const google = window.google
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 36.14511282413091, lng: 128.39342434932092 },
      zoom: 15,
    });
    let itemMarkers = [];
    let latList = [];
    let markerCircles = [];

    const deleteCircle = () => {
      markerCircles.forEach(circle=>{
        circle.setMap(null);
      });
    }

    map.addListener('click', ()=>{
      deleteCircle();
    })

    const checkLatLng = (latlng) => {
      let tempLat = latlng.lat;
      let tempLng = latlng.lng;

      if(latList.length > 0){
        latList.map(x => {
          if(x.lat === tempLat && x.lng === tempLng){
            let ranLat, ranLng;
            while(1){
              ranLat = tempLat + ((Math.floor(Math.random() * 9)+2) / 100000);
              ranLng = tempLng + ((Math.floor(Math.random() * 9)+2) / 100000);
              
              let end = true;
              latList.map(x => {
                if(x.lat === ranLat && x.lng === ranLng) end = false;
                return x;
              })
              if(end) break;
            }
            tempLat = ranLat;
            tempLng = ranLng;
          }
          return x;
        })
      }

      latList.push({lat: tempLat, lng: tempLng});
      return ({lat: tempLat, lng: tempLng});
    }

    const setMarkerClusterer = (map) => {
      new MarkerClusterer({ markers: itemMarkers, map: map });
    }

    const createCircle = (radius, latlng) => {
      const CENTER = latlng;
      const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: CENTER,
        radius: radius,
      });
      markerCircles.push(circle);
    }

    const conversionAddress = async (x, i, map) => {
      const geocoder = new google.maps.Geocoder();
      let tempAddress = x.address;

      const latlng = x.latlng.lat !== null ? {...x.latlng} 
        :await geocoder.geocode({ 'address': tempAddress })
        .then((res) => {
          if (res.results.length > 1) {
            let tempAry = tempAddress.split(' ');
            tempAry.pop();
            tempAddress = tempAry.join(' ');
            conversionAddress(tempAddress, i, map);
          }
          else {
            return { lat: res.results[0].geometry.location.lat(), lng: res.results[0].geometry.location.lng() }
          }
        })
        .catch((err) => console.log(err.message));
      if (latlng){
        let checkPosi = checkLatLng(latlng);
        const markerOptions = {
          map: map,
          position: checkPosi
        }
        let marker = new google.maps.Marker(markerOptions);
        marker.addListener('click', () => {
          setDetailData(x);
          setDetail(true);
          deleteCircle();
          if(x.radius) createCircle(x.radius, latlng);
        });
        itemMarkers.push(marker);
      }
    }

    if (isUseData.length > 0) {
      let len = isUseData.length;
      isUseData.map((x, i) => {
        setTimeout(() => {
          conversionAddress(x, i, map);
          if (i === len - 1){
            setLoading(false);
            setMarkerClusterer(map);
          } 
        }, 100 * i);
        return x;
      })
    }
  }, [isUseData]);

  return (
    <>
      <div id="map" style={{
        height: "100%", width: "100%",
        borderTop: "2px solid #396992"
      }}>
      </div>
      {loading&&<LoadingMap/>}

      <DetailCanvas
        show={detail}
        onHide={() => setDetail(false)}
        itemInfo={detailData}
      />
    </>
  );
}

export default GoogleMap;