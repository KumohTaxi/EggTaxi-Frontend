import {Offcanvas, Button, CloseButton} from 'react-bootstrap';
import '../../styles/components/offcanvas/FilterOffCanvas.css'

const FilterOffCanvas=(props)=>{
    function loadDestination(){
        const destinationList = [];

        if(false){
            destinationList.push(
                <Button variant="secondary" className='trueDes'>
                    전체 보기
                </Button>
            );
            for (let i = 0; i < 40; i++){
                destinationList.push(
                    <Button key={i} variant="secondary" className='trueDes'>
                        {i}
                    </Button>
                    );
            };
        }
        else{
            for (let i = 0; i < 1; i++){
                destinationList.push(
                    <div key={i} className='falseDes'>
                        {/* 현재 존재하는 그룹이 없습니다. */}
                        서비스 준비 중 입니다.
                    </div>
                    );
            };
        }

        return destinationList;
    };

    return(
        <div>
            <Offcanvas show={props.show} onHide={props.onHide} className="filterOffCanvas" placement='start'>
                <Offcanvas.Header>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>Search</Offcanvas.Title>    
                    <CloseButton variant='white' onClick={props.onHide}/>                    
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
                            {loadDestination()}
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default FilterOffCanvas;