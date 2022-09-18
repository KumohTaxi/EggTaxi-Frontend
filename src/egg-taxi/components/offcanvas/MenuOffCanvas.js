import {Offcanvas,CloseButton} from 'react-bootstrap';
import './MenuOffCanvas.css'
import UserModal from '../modals/mainmodals/UserModal';
import { useState } from 'react';
import InfoGuideModal from '../modals/submodals/guide_modals/InfoGuideModal';
import AppGuideModal from '../modals/submodals/guide_modals/AppGuideModal';

const MenuOffCanvas=(props)=>{
    const [userView, setUserView] = useState(false);
    const [isGuideModal, setIsGuideModal] = useState(false);
    const [isAppGuide, setIsAppGuide] = useState(false);

    return(
        <div>
            <Offcanvas show={props.show} onHide={props.onHide} className="menuOffCanvas" placement='end'>
                <Offcanvas.Header>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: "bold"}}>Menu</Offcanvas.Title>    
                    <CloseButton variant='white' onClick={props.onHide}/>                    
                </Offcanvas.Header>
                <Offcanvas.Body className='menuBodyBox'>
                    <div className='menuSubject'
                    onClick={()=>{setUserView(true); props.onHide();}}>
                        My Page
                    </div>
                    <div className='menuSubject'
                    onClick={()=>{setIsGuideModal(true); props.onHide();}}>
                        User Guide
                    </div>
                    <div className='menuSubject'
                    onClick={()=>{setIsAppGuide(true); props.onHide();}}>
                        Download Guide
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <UserModal
                show = {userView}
                onHide = {() => setUserView(false)}
            />
            <InfoGuideModal
                show={isGuideModal}
                onHide={() => setIsGuideModal(false)}
            />
            <AppGuideModal
                show={isAppGuide}
                onHide={() => setIsAppGuide(false)}
            />
        </div>
    );
}

export default MenuOffCanvas;