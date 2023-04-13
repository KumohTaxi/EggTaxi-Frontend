import {Modal, Button} from 'react-bootstrap';
import '../../../../styles/components/modals/submodals/alert_modals/WithdrawalModal.css';
import axios from 'axios';
import { PROXY } from '../../../../contexts/ProxyContext';

const WithdrawalModal=(props)=>{
    function removeInfo(){
        if(localStorage.getItem("mygroupid")){
            alert("현재 그룹이 존재합니다.\n그룹을 퇴장하시고 진행해주세요.");
        }
        else{
            axios({
                method:'post',
                url:`${PROXY}/member/unlink`,
                data:{
                    accessToken: localStorage.getItem('access_token'),
                },
                headers:{
                    'ContentType':'application/json'
                },
            })
            .then(() => {
                localStorage.clear();
                window.location.replace('/taxi-login');
            })
            .catch(() => {
                alert("탈퇴에 실패하였습니다.");
                window.location.replace('/main');
            })
        }
    }

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className='WDTitle' id="contained-modal-title-vcenter">
                My Page
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='WDMiddle'>
                <p className='WDP1'>회원 탈퇴를 하시겠습니까?</p>
                <p className='WDP2'>혹시 모를 사후 처리를 위해 회원님의 </p>
                <p className='WDP2'>정보는 일주일간 안전하게 보관됩니다.</p>
            </Modal.Body>

            <Modal.Footer className='WDFooter' style={{backgroundColor: "#FFFCEE"}}>
                <Button variant="dark" className='WDButtonLeft' onClick={props.onHide}>취소</Button>
                <Button variant="lgiht" className='WDButtonRight' onClick={()=>{removeInfo(); props.onHide()}}>회원 탈퇴</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WithdrawalModal;