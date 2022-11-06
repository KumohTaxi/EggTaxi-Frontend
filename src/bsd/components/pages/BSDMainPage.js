import '../../styles/pages/BSDMainPage.css'
import { useNavigate } from 'react-router-dom';
import MyForm from '../forms/MyForm';
import { useState } from 'react';

const BSDMainPage=()=>{
    const navigate = useNavigate();
    const [myForm, setMyForm] = useState(false);

    const myFormClick = (e) => {
        e.stopPropagation(); 
        setMyForm(true);
    }

    return(
        <div className='BSDMainPage' onClick={()=>setMyForm(false)}>
            <div className='main_header'>
                <div>
                    분습당
                </div>
                <img src='/icons/bsd_my_icon.png' alt='my' onClick={(e)=>myFormClick(e)}/>
            </div>
            <div className='main_body'>
                <div>
                    <div onClick={()=>navigate(`/bsd/map`)} className='bsd_main_box'>
                        <img src='/icons/bsd_loc_icon.png' alt='이미지'/>
                        <div>등록 물품 조회</div>
                    </div>
                    <div>
                        <div onClick={()=>navigate(`/bsd/Registration/lost`)} className='bsd_main_box'>
                            <img src='/icons/bsd_lost_icon.png' alt='이미지'/>
                            <div>
                                <div>분실물</div>
                                <div>등록</div>
                            </div>
                        </div>
                        <div onClick={()=>navigate(`/bsd/Registration/find`)} className='bsd_main_box'>
                            <img src='/icons/bsd_get_icon.png' alt='이미지'/>
                            <div>
                                <div>습득물</div>
                                <div>등록</div>
                            </div>
                        </div>
                    </div>
                    <div onClick={()=>navigate(`/bsd/chating`)} className='bsd_main_box'>
                        <img src='/icons/bsd_chat_icon.png' alt='이미지'/>
                        <div>채팅</div>
                    </div>
                </div>
            </div>

            <MyForm
                show={myForm}
            />
        </div>
    );
}

export default BSDMainPage;