import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import '../../styles/offcanvases/DetailCanvas.css';
import axios from "axios";

const DetailCanvas = ({ show, onHide, itemInfo, isFind }) => {
    const [showDetail, setShowDetail] = useState({});
    const [answer, setAnswer] = useState();
    const lookupDetailAPI = () => {
        const ATC_ID = itemInfo.atcId;
        const API_URI = itemInfo.status === "ACQUIRE"?`http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundDetailInfo`:`http://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsDetailInfo`
        let AXIOS_URL = `${API_URI}?serviceKey=${process.env.REACT_APP_PUBLIC_SERVICE_KEY}&ATC_ID=${ATC_ID}`
        if(itemInfo.status === "ACQUIRE") AXIOS_URL += `&FD_SN=${itemInfo.foundOrder}`
        axios.get(AXIOS_URL)
            .then((res) => {
                const ITEMS = res.data.response.body.item;
                setShowDetail({
                    imgSrc: ITEMS.fdFilePathImg,
                    name: ITEMS.fdPrdtNm,
                    category: ITEMS.prdtClNm,
                    date: ITEMS.fdYmd,
                    registrant: ITEMS.depPlace, // 닉네임. 경찰청인 경우 보관 장소
                    address: itemInfo.address,
                    comment: ITEMS.uniq, // comment 정보도 받아올 것
                    contact: ITEMS.tel // 경찰청인 경우 전화번호
                });
            })
            .catch((err) => {
            })
    }

    useEffect(() => {
        if (itemInfo.atcId === 'not police api data') {
            setShowDetail({
                imgSrc: itemInfo.imgSrc ? itemInfo.imgSrc : '/icons/bsd_null.png',
                name: itemInfo.name,
                category: itemInfo.category,
                date: itemInfo.date,
                registrant: '익명' + String(itemInfo.id).split('').slice(7).join(''), // 닉네임. 경찰청인 경우 보관 장소
                address: itemInfo.address,
                comment: itemInfo.comment, // comment 정보도 받아올 것
                contact: 'chat' // 경찰청인 경우 전화번호
            });
        }
        else {
            lookupDetailAPI();
        }
    }, [itemInfo]);

    useEffect(()=>{
        if(answer && answer !== null && answer !== ''){
            if(window.confirm(`입력하신 답이 "${answer}"이 맞나요?\n\n해당 답변은 수정이 어렵습니다.\n신중하게 답해주세요.`)){
                axios.post(`${process.env.REACT_APP_PROXY}/room`,{
                    accessToken: localStorage.getItem('access_token'),
                    itemId: itemInfo.itemId,
                    answer: answer
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }, [answer])

    const answerOfQuestion = () => {
        setAnswer(prompt(showDetail.comment + '\n\n위의 질문에 해당하는 답변을 적어주세요.\n\n습득자의 판단하에 채팅 여부가 결정됩니다.'))
    }

    const showDetailBottom = () => {
        if(showDetail.status === 'LOST'){
            return <button onClick={()=>answerOfQuestion()}>채팅 하기</button>
        }
        if (showDetail.contact === 'chat') {
            return <button onClick={()=>answerOfQuestion()}>질문에 답하기</button>
        }
        return <div>{showDetail.contact}</div>
    }

    return (
        <Offcanvas show={show} onHide={onHide} placement='bottom' backdrop={false} style={{ borderRadius: "20px 20px 0 0", height: "90%", maxWidth: "500px"}}>
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
                            <div>{showDetail.name}</div>
                            <div>{showDetail.category}</div>
                            <div>{showDetail.date}</div>
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