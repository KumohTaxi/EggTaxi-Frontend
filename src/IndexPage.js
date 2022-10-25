import './IndexPage.css';
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();

  const gotoTaxi = () => {
    navigate(`/taxi-login`);
  }
  const gotoBSD = () => {
    alert('서비스 준비 중 입니다.');
    // navigate(`/bsd/main`);
  }

  return (
    <div className='IndexPage'>
      <div className='index_header'>
        <img src='imgs/logo.png' />
      </div>
      <div className='index_body'>
        <div>
          <div onClick={()=>gotoTaxi()}><div>EGG</div><div>TAXI</div></div>
          <div/>
          <div/>
          <div onClick={()=>gotoBSD()}>분습당</div>
        </div>
      </div>
      <div className='index_footer'>
        v2.0.0-beta
      </div>
    </div>
  );
}


export default IndexPage;