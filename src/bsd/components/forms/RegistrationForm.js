import React, { useState, useRef, useEffect } from 'react';
import '../../styles/forms/RegistrationForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import MapCanvas from '../offcanvases/MapCanvas';
import axios from 'axios';

const RegistrationForm=()=>{
    const {state} = useParams();
    const selectFile = useRef();
    const todayDate = new Date();
    const navi = useNavigate();

    const [showMapCanvas, setShowMapCanvas] = useState(false);
    const [isData, setIsData] = useState({
        imageFile: '',  
        imageSrc: '',
        category: ' ',
        name: ' ',
        date: {
            year: todayDate.getFullYear(),
            month: todayDate.getMonth() + 1,
            day: todayDate.getDate(),
        },
        address: ' ',
        latlng: '',
        text: ' '
    });
    
    useEffect(()=>{
        localStorage.removeItem('position');
    },[]);
    useEffect(()=>{
        if(showMapCanvas === false){
            if(localStorage.getItem('position') && localStorage.getItem('position') !== ""){
                let posiObj = JSON.parse(localStorage.getItem('position'));
                setIsData({...isData, 
                    address: posiObj.address,
                    latlng: {
                        lat: posiObj.lat,
                        lng: posiObj.lng
                    }
                })
            }
        }
    },[showMapCanvas, isData])

    const [isFindTitle] = useState({
        0: ['습득물 이름', true],
        1: ['습득물 이미지', false],
        2: ['카테고리', true],
        3: ['습득 일시', true],
        4: ['습득 장소', true],
        5: ['습득물에 대한 질문', true]
    })
    const [isLostTitle] = useState({
        0: ['분실물 이름', true],
        1: ['분실물 이미지', false],
        2: ['카테고리', true],
        3: ['분실 일시', true],
        4: ['분실 장소', true],
        5: ['전하는 말', false],
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
        const plusBtn = idx === 1?true:false;
        const searchBtn = idx===4?true:false;

        return <div className='form_sub_title'>
            <div>
                <div>{title}</div>
                <div>{essential?'*':''}</div>
            </div>
            {plusBtn || searchBtn?
            <button onClick={()=>{
                plusBtn?selectFile.current.click():setShowMapCanvas(true);
            }}>
                {plusBtn && '+'}
                {searchBtn && <img src='/icons/bsd_search_btn.png' alt='검색'/>}
            </button>
            : <div></div>
            }
        </div>
    }

    const setDate = (e, state) => {
        setIsData({...isData, date: {...isData.date, [state]: e.target.value}})
    }

    const showAddress = () =>{
        if(isData.address === ' ') return ((state === 'find'?'습득한':'분실한') + '위치를 입력해 주세요.');
        return isData.address;
    }

    const sendData = () => {
        if(!window.confirm('등록하시겠습니까?')) return;

        let images = isData.imageFile;
        let jsonData = {
            location: isData.address,
            name: isData.name,
            status: state==='find'?'ACQUIRE':'LOST',
            category: isData.category,
            lostDate: [isData.date.year, isData.date.month, isData.date.day].join('-'),
            lat: isData.latlng.lat,
            lng: isData.latlng.lng,
            comment: isData.text
        }

        let form_data = new FormData();
        form_data.append("img", images[0]);
        form_data.append("itemReqDto", new Blob([JSON.stringify(jsonData)],{
            type: 'application/json'
        }));

        axios.post(`${process.env.REACT_APP_PROXY}/item`, form_data,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            alert('등록되었습니다.');
            navi(`/bsd/main`);
        })
        .catch((err)=>{
            alert('등록에 실패하였습니다. 다시 시도하여 주세요.');
        })
    }

    return(
        <div className='RegistrationForm'>
            <div className='form_header'>
                {state === 'find'?'습득물 등록':'분실물 등록'}
            </div>
            <div className='form_body'>
                <div>
                    {checkSubTitle(0)}
                    <div className='form_name_content'>
                        <input placeholder='ex) 나이키 가방' onChange={(e)=>setIsData({...isData, name: e.target.value})}/>
                    </div>
                </div>
                <div>
                    {checkSubTitle(1)}
                    <div className='form_img_content'>
                        <div>
                            {isData['imageSrc'] !== ''
                            ?<><img src={isData['imageSrc']} alt='이미지'/><button onClick={()=>{removeImage()}}>X</button></>
                            :<img alt='이미지'/>}

                            {isData['imageFile'] !== ''
                            ?<div>{isData['imageFile'][0].name}</div>
                            :<div>{state === 'find'?'습득물':'분실물'}의 사진을 등록해 보세요.</div>}
                        </div>
                        <input type='file' style={{display: 'none'}} ref={selectFile}
                        accept="image/jpg, image/png, image/jpeg" onChange={handleImageUpload}/>
                    </div>
                </div>
                <div>
                    {checkSubTitle(2)}
                    <div className='form_category_content'>
                        <select onChange={(e)=>setIsData({...isData, category: e.target.value})}>
                            <option value=""> ---- 선택 ---- </option>
                            <option value="가방">가방</option>
                            <option value="현금">현금</option>
                            <option value="휴대폰">휴대폰</option>
                            <option value="지갑">지갑</option>
                            <option value="카드">카드</option>
                            <option value="증명서">증명서</option>
                            <option value="귀금속">귀금속</option>
                            <option value="도서용품">도서용품</option>
                            <option value="서류">서류</option>
                            <option value="산업용품">산업용품</option>
                            <option value="쇼핑백">쇼핑백</option>
                            <option value="스포츠용품">스포츠용품</option>
                            <option value="악기">악기</option>
                            <option value="유가증권">유가증권</option>
                            <option value="의류">의류</option>
                            <option value="자동차">자동차</option>
                            <option value="전자기기">전자기기</option>
                            <option value="컴퓨터">컴퓨터</option>
                            <option value="기타물품">기타물품</option>
                        </select>
                    </div>
                </div>
                <div>
                    {checkSubTitle(3)}
                    <div className='form_time_content'>
                        <div>
                            <input placeholder={isData.date.year} onChange={(e)=>setDate(e, 'year')}/><div>년</div>
                            <input placeholder={isData.date.month} onChange={(e)=>setDate(e, 'month')}/><div>월</div>
                            <input placeholder={isData.date.day} onChange={(e)=>setDate(e, 'day')}/><div>일</div>
                        </div>
                    </div>
                </div>
                <div>
                    {checkSubTitle(4)}
                    <div className='form_location_content'>{showAddress()}</div>
                </div>
                <div>
                    {checkSubTitle(5)}
                    <div className='form_text_content'>
                        <textarea placeholder={state==='find'
                        ?'허위 분실자를 판단하기 위해, 분실물에 대한 질문을 작성해주세요.\nex) 스크레치의 위치는 어디에 있나요?'
                        :'당신의 분실물이 얼마나 소중한지, 어떤 답례를 해줄 수 있는지 적어보세요.'}
                        onChange={(e)=>setIsData({...isData, text: e.target.value})}></textarea>
                    </div>
                </div>
            </div>
            <div className='form_footer'>
                <button onClick={()=>{navi(`/bsd/main`); localStorage.removeItem('position')}}>취소</button>
                <button onClick={()=>sendData()}>등록</button>
            </div>

            <MapCanvas
                show = {showMapCanvas}
                onHide = {()=>setShowMapCanvas(false)}
            />
        </div>
    );
}

export default RegistrationForm;