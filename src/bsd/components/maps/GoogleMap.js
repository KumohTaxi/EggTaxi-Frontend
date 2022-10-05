import React, { useEffect } from 'react'

const GoogleMap=()=>{
  const google = window.google

  useEffect(()=> {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5400456, lng: 126.9921017 },
      zoom: 10,
    });
  },[]);

  return(
      <div id="map" style={{height : "100%", width: "100%", 
      borderTop: "2px solid #396992"}}>
      </div>
  );
}

export default GoogleMap;