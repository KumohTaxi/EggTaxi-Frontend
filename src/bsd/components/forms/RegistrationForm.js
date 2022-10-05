import React, { useState, useRef } from 'react';
import '../../styles/forms/RegistrationForm.css';

const RegistrationForm=({})=>{
    // 테스트 변수
    let state = 'find'
    const selectFile = useRef();
    const todayDate = new Date();

    const [isData, setIsData] = useState({
        imageFile: '',
        imageSrc: '',
        category: '',
        directInput: '',
        date: {
            year: todayDate.getFullYear(),
            month: todayDate.getMonth() + 1,
            day: todayDate.getDate(),
            hours: todayDate.getHours(),
            minutes: todayDate.getMinutes(),
        },
        address: '',
        latlng: [-1, -1],
        text: ''
    })
    console.log(isData);

    const [isFindTitle, setIsFindTitle] = useState({
        0: ['습득물 이미지', false],
        1: ['카테고리', true],
        2: ['습득 일시', true],
        3: ['습득 장소', true],
        4: ['습득물에 대한 질문', true]
    })
    const [isLostTitle, setIsLostTitle] = useState({
        0: ['분실물 이미지', false],
        1: ['카테고리', true],
        2: ['분실 일시', true],
        3: ['분실 장소', true],
        4: ['전하는 말', false],
    })

    const handleImageUpload = (e) => {
        const fileArr = e.target.files;

        let file;
        for (let i = 0; i < fileArr.length; i++) {
            file = fileArr[i];

            let reader = new FileReader();
            reader.onload = () => {
                setIsData({...isData, imageFile: fileArr, imageSrc: reader.result, imageName: fileArr[0].name});
            }
            reader.readAsDataURL(file);
        }
    }
    const removeImage = () => {
        setIsData({...isData, imageSrc: '', imageFile: ''});
    }

    const checkSubTitle = (idx) => {
        const checkObject = state === 'find'?isFindTitle[idx]:isLostTitle[idx];
        const title = checkObject[0];
        const essential = checkObject[1];
        const plusBtn = idx === 0?true:false;
        const searchBtn = idx===3?true:false;

        return <div className='form_sub_title'>
            <div>
                <div>{title}</div>
                <div>{essential?'*':''}</div>
            </div>
            {plusBtn || searchBtn?
            <button onClick={()=>{
                plusBtn?selectFile.current.click():selectFile.current.click();
            }}>
                {plusBtn && '+'}
                {searchBtn && <img src='/icons/bsd_search_btn.png'/>}
            </button>
            : <div></div>
            }
        </div>
    }

    return(
        <div className='RegistrationForm'>
            <div className='form_header'>
                {state === 'find'?'습득물 등록':'분실물 등록'}
            </div>
            <div className='form_body'>
                <div>
                    {checkSubTitle(0)}
                    <div className='form_img_content'>
                        <div>
                            {isData['imageSrc'] !== ''
                            ?<><img src={isData['imageSrc']}/><button onClick={()=>{removeImage()}}>X</button></>
                            :<img/>}

                            {isData['imageFile'] !== ''
                            ?<div>{isData['imageFile'][0].name}</div>
                            :<div>{state === 'find'?'습득물':'분실물'}의 사진을 등록해 보세요.</div>}
                        </div>
                        <input type='file' style={{display: 'none'}} ref={selectFile}
                        accept="image/jpg, image/png, image/jpeg" onChange={handleImageUpload}/>
                    </div>
                </div>
                <div>
                    {checkSubTitle(1)}
                    <div className='form_category_content'>
                        {isData['category'] !== 'direct'?<div/>:<input value={isData['directInput']} 
                        placeholder='ex) 모자' onChange={(e)=>{setIsData({...isData, directInput: e.target.value})}}/>}
                        <select onChange={(e)=>setIsData({...isData, category: e.target.value})}>
                            <option value=""> ---- 선택 ---- </option>
                            <option value="direct"> --- 직접 작성 --- </option>
                            <option value="bag">가방</option>
                            <option value="cellphone">휴대폰</option>
                            <option value="wallet">지갑</option>
                            <option value="card">카드</option>
                            <option value="IDcard">신분증</option>
                            <option value="cash">현금</option>
                            <option value="Etc">기타</option>
                        </select>
                    </div>
                </div>
                <div>
                    {checkSubTitle(2)}
                    <div className='form_time_content'>
                        <div>
                            <input/><div>년</div>
                            <input/><div>월</div>
                            <input/><div>일</div>
                        </div>
                        <div>
                            <div/><div/>
                            <input/><div>시</div>
                            <input/><div>분</div>
                        </div>
                    </div>
                </div>
                <div>
                    {checkSubTitle(3)}
                    <div className='form_location_content'>{state === 'find'?'습득한':'분실한'}위치를 입력해 주세요.</div>
                </div>
                <div>
                    {checkSubTitle(4)}
                    <div className='form_text_content'><textarea></textarea></div>
                </div>
            </div>
            <div className='form_footer'>
                <button>취소</button>
                <button>등록</button>
            </div>
        </div>
    );
}

export default RegistrationForm;