import '../../styles/lists/SearchList.css';
import { React, useState } from 'react';
import Item from './Item';
import DetailCanvas from '../offcanvases/DetailCanvas';

const SearchList = ({ isFind, isUseData }) => {
    const [detail, setDetail] = useState(false);
    const [detailData, setDetailData] = useState({});

    return (
        <>
            <div id="lists" style={{ height: "100%" }}>
                {isUseData.length === 0 ?
                    (<div className="item-notice-box">
                        <div className="item-notice"> 등록된 {isFind ? "습득물" : "분실물"}이 없습니다.</div>
                    </div>) :
                    (isUseData.map((itemInfo, idx) => { return <div key={idx}><Item itemInfo={itemInfo} setDetail={setDetail} setDetailData={setDetailData} /></div> }))}
            </div>

            <DetailCanvas
                show={detail}
                onHide={() => setDetail(false)}
                itemInfo={detailData}
                isFind = {isFind}
            />
        </>
    )
}

export default SearchList;