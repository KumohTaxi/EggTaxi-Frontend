import '../../styles/pages/BSDMainPage.css'
import { useNavigate } from 'react-router-dom';

const BSDMainPage=()=>{
    const navigate = useNavigate();

    return(
        <div className='BSDMainPage'>
            <div className='main_header'>
                <div>
                    분습당
                </div>
                <img src='/icons/bsd_my_icon.png' alt='my'/>
            </div>
            <div className='main_body'>
                <div>
                    <div onClick={()=>navigate(`/bsd/map`)}>
                        <img src='/icons/bsd_loc_icon.png' alt='이미지'/>
                        <div>등록 물품 조회</div>
                    </div>
                    <div>
                        <div onClick={()=>navigate(`/bsd/Registration/lost`)}>
                            <img src='/icons/bsd_lost_icon.png' alt='이미지'/>
                            <div>
                                <div>분실물</div>
                                <div>등록</div>
                            </div>
                        </div>
                        <div onClick={()=>navigate(`/bsd/Registration/find`)}>
                            <img src='/icons/bsd_get_icon.png' alt='이미지'/>
                            <div>
                                <div>습득물</div>
                                <div>등록</div>
                            </div>
                        </div>
                    </div>
                    <div onClick={()=>navigate(`/bsd/chating`)}>
                        <img src='/icons/bsd_chat_icon.png' alt='이미지'/>
                        <div>채팅</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BSDMainPage;