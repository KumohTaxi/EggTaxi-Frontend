import { Offcanvas } from "react-bootstrap";
import '../../styles/offcanvases/MapCanvas.css';
import GoogleSearchMap from "../maps/GoogleSearchMap";
import { useEffect, useState } from "react";

const MapCanvas = ({ show, onHide }) => {
    const [searchVal, setSearchVal] = useState('');
    const [clickSearch, setClickSearch] = useState(false);

    useEffect(()=>{
        setSearchVal('');
        setClickSearch(false);
    },[onHide])

    return (
        <Offcanvas show={show} onHide={onHide} placement='bottom' style={{ borderRadius: "20px 20px 0 0", height: "90%" }}>
            <Offcanvas.Body style={{ padding: "0", borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column" }}>
                <div className="mapcv_header" onClick={() => onHide()}>
                    닫기
                </div>
                <div className="mapcv_body" style={{ borderTop: "2px solid #396992" }}>
                    <GoogleSearchMap 
                        canvasOnhide = {onHide}
                        searchVal = {searchVal}
                        clickSearch = {clickSearch}
                        setClickSearch = {setClickSearch}
                    />
                </div>
                <div className="mapcv_inputbar">
                    <input placeholder="주소로 검색해보세요." value={searchVal} onChange={(e)=>setSearchVal(e.target.value)}/>
                    <button onClick={()=>setClickSearch(true)}>
                        <img src="/icons/bsd_search_btn.png" alt="검색"/>
                    </button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default MapCanvas;