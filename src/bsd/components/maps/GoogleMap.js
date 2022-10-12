import React, { useEffect, useState } from 'react'
import DetailCanvas from '../offcanvases/DetailCanvas';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const GoogleMap = ({ isFind, isUseData }) => {
  const [detail, setDetail] = useState(false);
  const [datailData, setDetailData] = useState({});

  useEffect(() => {
    const google = window.google
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 36.14511282413091, lng: 128.39342434932092 },
      zoom: 15,
    });
    let itemMarkers = [];

    const conversionAddress = async (address, i) => {
      const geocoder = new google.maps.Geocoder();
      let tempAddress = address;
      const latlng = await geocoder.geocode({ 'address': tempAddress })
        .then((res) => {
          if (res.results.length > 1) {
            let tempAry = tempAddress.split(' ');
            tempAry.pop();
            tempAddress = tempAry.join(' ');
            conversionAddress(tempAddress, i);
          }
          else {
            return { lat: res.results[0].geometry.location.lat(), lng: res.results[0].geometry.location.lng() }
          }
        })
        .catch((err) => console.log(err.message));
      if (latlng) itemMarkers.push(latlng);
    }

    if (isUseData.length > 0) {
      let len = isUseData.length;
      isUseData.map((x, i) => {
        setTimeout(() => {
          conversionAddress(x.address, i);
          if (i === len - 1) console.log('end');
          console.log(itemMarkers);
        }, 600 * i);
        // const markerOptions = {
        //   map: map,
        //   position: { lat: markerposi.lat, lng: markerposi.lng },
        //   icon: {
        //     scaledSize: new google.maps.Size(28, 40)
        //   }
        // }
        // let marker = new google.maps.Marker(markerOptions);
        // marker.addListener('click', () => {
        //   setDetailData(x);
        //   setDetail(true);
        // });
      })
      // new MarkerClusterer({ itemMarkers, map });
    }
  }, [isUseData, isFind]);

  return (
    <>
      <div id="map" style={{
        height: "100%", width: "100%",
        borderTop: "2px solid #396992"
      }}>
      </div>

      <DetailCanvas
        show={detail}
        onHide={() => setDetail(false)}
        itemInfo={datailData}
      />
    </>
  );
}

export default GoogleMap;