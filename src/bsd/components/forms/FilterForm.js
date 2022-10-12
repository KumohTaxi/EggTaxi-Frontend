import React, { useEffect, useRef, useState } from 'react';
import '../../styles/forms/FilterForm.css';

const FilterForm = ({ isFilter, setIsFilter, onMap, setChildHeight, setShowCondition}) => {
    const divRef = useRef();
    const today = new Date();

    const [filterData, setFilterData] = useState({
        current: true,
        allofDate: true,
        year: '',
        month: '',
        day: '',
        category: '',
        name: ''
    })

    useEffect(() => {
        filterData.allofDate
        ?setChildHeight(divRef.current.offsetHeight - 30)
        :setChildHeight(divRef.current.offsetHeight + 30);
    }, [filterData.allofDate, setChildHeight]);
    useEffect(()=>{
        setChildHeight(divRef.current.offsetHeight)
    },[onMap, setChildHeight]);

    const setFilterDate = (e, state) => {
        setFilterData({...filterData, [state]: e.target.value});
    }

    const searchDataSet = () => {
        let year = filterData.year === ''?today.getFullYear():filterData.year;
        let month = filterData.month === ''?today.getMonth()+1:filterData.month;
        let day = filterData.day === ''?today.getDate():filterData.day;

        setShowCondition({...filterData, year: year, month: month, day: day});
        setIsFilter(false);
    }

    return (
        <div className="FilterForm" ref={divRef}>
            {!onMap &&
                <div className='bsd_filter_horizon'>
                    <div>정렬</div>
                    <button onClick={()=>setFilterData({...filterData, current: !filterData.current})}>
                        <div className={['filter_clicked_recent', !filterData.current && 'filter_unclicked_recent'].join(' ')}>최신순</div>
                        <div className={['filter_clicked_old', filterData.current && 'filter_unclicked_old'].join(' ')}>과거순</div>
                    </button>
                </div>
            }
            <div>
                <div className='bsd_filter_horizon'>
                    <div>날짜</div>
                    <div className='bsd_filter_allofdate' onClick={()=>setFilterData({...filterData, allofDate: !filterData.allofDate})}>
                        <button className='bsd_filter_setAll_btn'>
                            <div className={['bsd_filter_circle', !filterData.allofDate && 'bsd_filter_right_circle'].join(' ')}/>
                        </button>
                        <div>전체</div>
                    </div>
                </div>
                <div className={['bsd_filter_date_group', !filterData.allofDate && 'bsd_filter_show_date_group'].join(' ')}>
                    <div/>
                    <input placeholder={today.getFullYear()} onChange={(e)=>setFilterDate(e, 'year')}/><div>년</div>
                    <input placeholder={today.getMonth()+1} onChange={(e)=>setFilterDate(e, 'month')}/><div>월</div>
                    <input placeholder={today.getDate()} onChange={(e)=>setFilterDate(e, 'day')}/><div>일</div>
                </div>
            </div>
            <div className='bsd_filter_horizon'>
                <div>카테고리</div>
                <div>
                    <select onChange={(e)=>setFilterData({...filterData, category: e.target.value})}>
                        <option value="">전체</option>
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
            <div className='bsd_filter_horizon'>
                <div>물품 이름</div>
                <input placeholder='ex) 아디다스 신발' onChange={(e)=>setFilterData({...filterData, name: e.target.value})}/>
            </div>
            <div className='bsd_filter_search'>
                <div/>
                <button onClick={()=>searchDataSet()}>검색</button>
            </div>
        </div>
    )
}

export default FilterForm;