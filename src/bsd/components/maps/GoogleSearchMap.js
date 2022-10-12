import React, { useEffect, useState } from 'react'
import CheckSaveCanvas from '../offcanvases/CheckSaveCanvas';

const GoogleSearchMap = ({ canvasOnhide, searchVal, clickSearch, setClickSearch }) => {
    const [position, setPosition] = useState('');
    const [checkCanvas, setCheckCanvas] = useState(false);

    useEffect(() => {
        const google = window.google;
        let markers = [];

        const clearOverlays = () => {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers.length = 0;
        }

        const addMarkers = (map, latlng) => {
            clearOverlays();

            const markerOptions = {
                map: map,
                position: latlng
            }
            const marker = new google.maps.Marker(markerOptions);
            markers.push(marker);
            return markers;
        }

        let map = new google.maps.Map(document.getElementById("search_map"), {
            center: { lat: 36.14511282413091, lng: 128.39342434932092 },
            zoom: 15,
        });

        const geocoder = new google.maps.Geocoder();

        map.addListener('click', (e) => {
            const latlng = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };

            geocoder.geocode({ 'location': latlng }, (results, status) => {
                if (status === 'OK') {
                    let allofAddress = results[0].address_components;
                    let address = allofAddress.length > 4
                        ? allofAddress.slice(0, allofAddress.length - 2).map(x => {
                            return x.long_name;
                        })
                        : allofAddress.map(x => {
                            if (x.long_name !== '대한민국') return x.long_name;
                            return x;
                        });
                    address = address.reverse().join(' ');
                    if (address[0] === ' ') address = address.substr(1);

                    addMarkers(map, latlng);

                    setPosition({
                        lat: latlng.lat,
                        lng: latlng.lng,
                        address: address
                    });

                    setCheckCanvas(true);
                }
                else {
                    clearOverlays();
                    setPosition('');
                    setCheckCanvas(false)
                    alert('주소를 찾을 수 없습니다.');
                }
            })
        })

        if (clickSearch) {
            geocoder.geocode({ 'address': searchVal }, (result, status) => {
                if (status === 'OK') {
                    let idx = 0
                    if (result.length > 1) {
                        let xlocation = searchVal.split(' ');
                        let min = Infinity;
                        result.map((y, i) => {
                            let formatLoc = y.formatted_address.split(' ');
                            const setLen = [...new Set([...xlocation, ...formatLoc])].length;
                            if (min > setLen) {
                                min = setLen;
                                idx = i;
                            }
                            return y;
                        })
                    }
                    const inputlat = result[idx].geometry.location.lat();
                    const inputlng = result[idx].geometry.location.lng();

                    setPosition({
                        lat: inputlat,
                        lng: inputlng,
                        address: searchVal
                    });

                    map.setCenter({ lat: inputlat, lng: inputlng });

                    addMarkers(map,{lat: inputlat, lng: inputlng});

                    setCheckCanvas(true);
                }
                else{
                    alert('주소를 찾을 수 없습니다.');
                    setClickSearch(false);
                }
            });
        }
    }, [clickSearch, setClickSearch]);

    return (
        <>
            <div id="search_map" style={{ height: "100%", width: "100%" }}>
            </div>
            <CheckSaveCanvas
                show={checkCanvas}
                onHide={() => setCheckCanvas(false)}
                position={position}
                setPosition={() => setPosition('')}
                canvasOnhide={canvasOnhide}
            />
        </>
    );
}

export default GoogleSearchMap;