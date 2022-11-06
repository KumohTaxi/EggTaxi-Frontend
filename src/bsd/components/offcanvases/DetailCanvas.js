import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import '../../styles/offcanvases/DetailCanvas.css';

const DetailCanvas = ({ show, onHide, itemInfo }) => {
    const [showDetail, setShowDetail] = useState({});

    console.log(showDetail);

    useEffect(() => {
        if (itemInfo.atcId === 'not police api data') {
            setShowDetail({
                imgSrc: itemInfo.imgSrc ? itemInfo.imgSrc : '/icons/bsd_null.png',
                name: itemInfo.name,
                category: itemInfo.category,
                date: itemInfo.date,
                registrant: 'nickname', // 닉네임. 경찰청인 경우 보관 장소
                address: itemInfo.address,
                comment: 'comment', // comment 정보도 받아올 것
                contact: 'chat' // 경찰청인 경우 전화번호
            });
        }
        else {
            // 경찰청 상세 정보 받아오기
        }
    }, [itemInfo]);

    const showDetailBottom = () => {
        if (showDetail.contact === 'chat') {
            return <button>질문에 답하기</button>
        }
        return <div>xxx-xxxx-xxxx</div>
    }

    return (
        <Offcanvas show={show} onHide={onHide} placement='bottom' style={{ borderRadius: "20px 20px 0 0", height: "90%", maxWidth: "500px"}}>
            <Offcanvas.Body style={{
                width: "100%", height: "100%",
                display: 'flex', flexDirection: 'column'
            }}>
                <div id="bsd_detail_top" onClick={() => onHide()}>
                    닫기
                </div>
                <div id="bsd_detail_body">
                    <div>
                        <img src={showDetail.imgSrc} alt='img'/>
                        <div>
                            <div>
                                {showDetail.name}
                            </div>
                            <div>
                                {showDetail.category} / {showDetail.date}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>등록자</div>
                            <div>{showDetail.registrant}</div>
                        </div>
                        <div>
                            <div>주소</div>
                            <div>{showDetail.address}</div>
                        </div>
                        <div>
                            <div>comment</div>
                            <div>{showDetail.comment}</div>
                        </div>
                    </div>
                </div>
                <div id="bsd_detail_bottom">
                    {showDetailBottom()}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default DetailCanvas;