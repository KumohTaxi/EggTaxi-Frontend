import './MadeByPage.css';

const MadeByPage=()=>{
    return(
        <div className='MadeBy'>
            <div className='madebybox'>
                <div className='backButton'>
                    <img className='closeButton' src='imgs/Close.png' alt='취소'
                    onClick={()=>{window.location.replace('/')}}/>
                </div>
                <div className='madebyLogo'>
                    <img className='likelionkit' src='imgs/likelion_kit.png' alt='이미지를 불러올 수 없습니다.'/>
                    <img className='madebycompanyname' src='imgs/company_name_white.png' alt='이미지를 불러올 수 없습니다.'/>
                </div>
                <div>
                    <div className='madebySubTitle'>
                        Operation Team
                    </div>
                    <div className='madebySubContent'>
                        <div className='subContentPerson'>
                            <img className='personImg' src='imgs/Gu.jpeg' alt='이미지를 불러올 수 없습니다.'/>
                            <div className='madebyName'>
                                구현우
                            </div>
                        </div>
                        <div className='subContentInfo'>
                            <div className='madebyDuty'>
                                Front-End Development<br/>
                                UI & UX Design
                            </div>
                            <a href="mailto:ghw9174@gmail.com">
                                <img className='gamil' src="https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white&link=ghw9174@gmail.com" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                            <a href="https://www.instagram.com/hy__wuuuuuuuu/">
                                <img className='insta' src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/hy__wuuuuuuuu/" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                        </div>
                    </div>
                    <div className='madebySubContent'>
                        <div className='subContentPerson'>
                            <img className='personImg' src='imgs/Shin.jpeg' alt='이미지를 불러올 수 없습니다.'/>
                            <div className='madebyName'>
                                신영한
                            </div>
                        </div>
                        <div className='subContentInfo'>
                            <div className='madebyDuty'>
                                Front-End Development<br/>
                                Server Management
                            </div>
                            <a href="mailto:syhan7516@gmail.com">
                                <img className='gamil' src="https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white&link=syhan7516@gmail.com" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                            <a href="https://www.instagram.com/han_sy.dg/">
                                <img className='insta' src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/han_sy.dg/" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                        </div>
                    </div>
                    <div className='madebySubContent'>
                        <div className='subContentPerson'>
                            <img className='personImg' src='imgs/Kim.jpeg' alt='이미지를 불러올 수 없습니다.'/>
                            <div className='madebyName'>
                                김성은
                            </div>
                        </div>
                        <div className='subContentInfo'>
                            <div className='madebyDuty'>
                                Back-End Development<br/>
                                Project Management
                            </div>
                            <a href="mailto:kimse9811@gmail.com">
                                <img className='gamil' src="https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white&link=kimse9811@gmail.com" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                            <a href="https://www.instagram.com/starsil_k/">
                                <img className='insta' src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/starsil_k/" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='madebySubTitle'>
                        Contributor
                    </div>
                    <div className='madebySubContent'>
                        <div className='subContentPerson'>
                            <img className='personImg' src='imgs/Lee.jpeg' alt='이미지를 불러올 수 없습니다.'/>
                            <div className='madebyName'>
                                이서현
                            </div>
                        </div>
                        <div className='subContentInfo'>
                            <div className='madebyDuty'>
                                Server Management
                            </div>
                            <a href="mailto:kathyleesh7@gmail.com">
                                <img className='gamil' src="https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white&link=kathyleesh7@gmail.com" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                            <a href="https://www.instagram.com/seohyun_lee_20/">
                                <img className='insta' src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/seohyun_lee_20/" alt='이미지를 불러올 수 없습니다.'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MadeByPage;