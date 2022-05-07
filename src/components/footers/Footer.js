import './Footer.css';

const Footer=()=>{
    return(
        <div id='container'>
            <div id="left">
                <div id="top">
                    <img className='companyName' src='imgs/company_name_white.png'/>
                </div>
            </div>
            <div id="right">
                <div id="top">
                    Front-end 신영한, 구현우
                </div>
                <div id="bottom">
                    Back-end 김성은
                </div>
            </div>
        </div>
    )
}

export default Footer