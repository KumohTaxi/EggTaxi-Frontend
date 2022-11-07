import '../../styles/pages/BSDChatingPage.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

// firestore DB
import { dbService } from '../../firebaes/firebaseInfo';
// firestore add data, real time
import { collection, onSnapshot } from 'firebase/firestore';

const BSDChatingPage = () => {

    const navi = useNavigate();
    
    // 채팅 데이터
    const [ chatData, setChatData ] = useState({});
    // 내가 속한 채팅 그룹 데이터
    const [ myGroup, setMyGroup ] = useState([]);
    // 임시로 채팅 담을 곳
    const [temp, setTemp] = useState('');
    
    useEffect(()=>{
        // 해당 유저의 채팅 그룹 조회 임의 데이터
        setMyGroup([1,2,3]);
        // axios.get(`${process.env.REACT_APP_PROXY}/room?token=${localStorage.getItem('access_token')}`)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    },[]);

    // 실시간으로 DB 조회
    useEffect(()=>{

        for (let group of myGroup) 
        {   
            let transGroup = String(group);

            onSnapshot(collection(dbService,`GroupId${transGroup}`), (snapshot) => {
                const chatArray = snapshot.docs.map((doc)=>({
                    id : doc.id,
                    ...doc.data(),
                }));
                setTemp([transGroup, chatArray]);
            });
        }
    },[myGroup]);

    useEffect(()=>{
        setChatData({...chatData, [temp[0]]: temp[1]});
    },[temp]);

    // 채팅 방 여는 함수
    const openChatRoom = (id) => {
        // 모바일인지 데스크탑인지 판단
        const checkDevice = navigator.userAgent;
        let isMobile = false;
        // 모바일이면 true
        if(checkDevice.indexOf("iPhone") > -1 || checkDevice.indexOf("Android") > -1) isMobile = true;
        // 모바일이면 현재 창에서 이동
        if(isMobile) navi(`/bsd/chat/${id}`);
        // 데스크탑이면 새로운 창 생성
        else window.open(`/bsd/chat/${id}`, `_blank`, `height=600, width=350, menubar=0, resizable=0 left=200 top=100`, `false`);
    }

    // 채팅방 목록 불러오기
    const chatList = () => {
        if(myGroup.length < 1) return '현재 채팅이 없습니다.'
        // 반환할 채팅방 배열
        let chatlist = [];
        // 메세지가 가장 최근인 방을 상단에 띄우기 위해 정렬을 할 배열
        let sortChat = [];

        // 모든 채팅 데이터를 순회 
        for (let i = 0; i < myGroup.length; i++) {

            // 채팅방 썸네일을 위해 채팅 기록을 저장
            let tempChat = chatData[myGroup[i]];

            // 채팅 데이터 확인
            if(!tempChat)
            {
                if(myGroup.length === 0) { return "채팅이 없습니다!" }
                else { return; }
            }

            // 채팅방 최근 채팅을 출력하기 위헤 정렬
            tempChat.sort((a,b)=>{
                const aDay = String(a.date.split('T')[0]).split('-').join('');
                const aHour = String(a.date.split('T')[1]).split(':')[0];
                const aMin = String(a.date.split('T')[1]).split(':')[1];
                const aSec = String(a.date.split('T')[1]).split(':')[2].split('.')[0];
                const aDate = Number(aDay + aHour + aMin + aSec);
                
                const bDay = String(b.date.split('T')[0]).split('-').join('');
                const bHour = String(b.date.split('T')[1]).split(':')[0];
                const bMin = String(b.date.split('T')[1]).split(':')[1];
                const bSec = String(b.date.split('T')[1]).split(':')[2].split('.')[0];
                const bDate = Number(bDay + bHour + bMin + bSec);
    
                return aDate - bDate;
            });

            // 각 채팅방 최근 채팅을 저장
            sortChat.push(
                {
                    chatGroup : myGroup[i],
                    recentText: tempChat[tempChat.length - 1].contents,
                    recentDate: tempChat[tempChat.length - 1].date
                }
            );
        }

        // 저장한 정보를 시간을 기준으로 최신순으로 정렬
        sortChat.sort((a, b) => {
            const aDay = String(a.recentDate.split('T')[0]).split('-').join('');
            const aHour = String(a.recentDate.split('T')[1]).split(':')[0];
            const aMin = String(a.recentDate.split('T')[1]).split(':')[1];
            const aSec = String(a.recentDate.split('T')[1]).split(':')[2].split('.')[0];
            const aTemp = Number(aDay + aHour + aMin + aSec);
            
            const bDay = String(b.recentDate.split('T')[0]).split('-').join('');
            const bHour = String(b.recentDate.split('T')[1]).split(':')[0];
            const bMin = String(b.recentDate.split('T')[1]).split(':')[1];
            const bSec = String(b.recentDate.split('T')[1]).split(':')[2].split('.')[0];
            const bTemp = Number(bDay + bHour + bMin + bSec);

            return bTemp - aTemp;
        })

        // 정렬된 배열을 순회하며 반환할 배열에 저장
        for (let i = 0; i < sortChat.length; i++) {
            
            chatlist.push(
                <div key={i} className="chatRoom" onClick={()=>openChatRoom(sortChat[i].chatGroup)}>
                    <div>
                        익명{sortChat[i].chatGroup}
                    </div>
                    <div>
                        <div>
                            {sortChat[i].recentDate.split('T')[1].split('.')[0]}
                        </div>
                        <div>
                            {sortChat[i].recentText}
                        </div>
                    </div>
                </div>
            );
        }

        return chatlist;
    }

    const requestList = () => {
        
        return <div className='chat_null_case'>현재 요청이 없습니다.</div>
    }

    const collectList = () => {
        return <div className='chat_null_case'>회수 처리된 채팅방이 없습니다.</div>
    }

    return (
        <div className='BSDChatingPage'>
            <div className='bsd_chat_header'>
                채팅 목록
            </div>

            <div className='bsd_chat_body'>
                <div className='bsd_chat_body_list'>
                    {chatList()}
                </div>
                <div className='bsd_chat_body_subtitle'>채팅 요청</div>
                <div className='bsd_chat_body_list'>
                    {requestList()}
                </div>
                <div className='bsd_chat_body_subtitle'>회수 목록</div>
                <div className='bsd_chat_body_list'>
                    {collectList()}
                </div>
            </div>
        </div>
    );
}

export default BSDChatingPage;