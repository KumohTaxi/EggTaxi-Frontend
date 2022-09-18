import {Modal, CloseButton, Form} from 'react-bootstrap';
import './GuideModal.css';
import { useEffect, useState } from 'react';

const GuideModal=(props)=>{
    const [isCheck, setIsCheck] = useState(true);

    function Checked(){
        setIsCheck(!isCheck);
    }
    function GuideOnHide(){
        if(isCheck === false){
            localStorage.setItem("guide_check", false);
        }
        props.onHide();
    }

    useEffect(()=>{
        if(localStorage.getItem("guide_check") === "false"){
            props.onHide();
        }
    })

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='GuideTitle' id="contained-modal-title-vcenter">
                Guide
                </Modal.Title>
                <div className='checkBox'>
                    <Form.Check className='NoShowCheck' type="checkbox" label="다시는 보지 않기"
                    onChange={(e)=>Checked(e)}/>
                </div>
                <CloseButton variant='white' onClick={GuideOnHide}/>
            </Modal.Header>

            <Modal.Body className='GuideMiddle'>
                <img src='imgs/EggTaxi-Guide-Long.png' alt='이미지를 불러오지 못했습니다.'/>
            </Modal.Body>
        </Modal>
    );
}

export default GuideModal;