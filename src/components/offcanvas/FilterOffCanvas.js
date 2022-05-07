import {Offcanvas} from 'react-bootstrap';
import './FilterOffCanvas.css'

const FilterOffCanvas=(props)=>{
    return(
        <div>
            <Offcanvas show={props.show} onHide={props.onHide} className="filterOffCanvas" placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>Search</Offcanvas.Title>                        
                </Offcanvas.Header>
                <Offcanvas.Body className='filterBodyBox'>
                    <div className='filterBody'>
                        <div className='filterSubTitle'>
                            <p className='filterSubTitle1'>
                                목적지
                            </p>
                            <p className='filterSubTitle2'>
                                지도에 있는 목적지를 한눈에 파악해 보세요.
                            </p>
                        </div>
                        <div className='filterContent'>
                            서비스 준비 중 입니다.
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default FilterOffCanvas;