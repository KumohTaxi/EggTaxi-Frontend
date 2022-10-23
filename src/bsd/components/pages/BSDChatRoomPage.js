import '../../styles/pages/BSDChatRoomPage.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// firestore DB
import { dbService } from '../../firebaes/firebaseInfo';
// firestore add data, real time
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const BSDChatRoomPage=()=>{
    // useParams를 통해 그룹 ID를 통해 채팅방 식별
    const {id} = useParams();

    // 채팅 입력을 위한 useState
    const [chat,setChat] = useState('');

    // 채팅들을 저장할 useState
    const [chats,setChats] = useState([]);

    // 날짜 변환 함수
    const getDateTrans = (date) => {
        const time = date.split('T')[1];
        const hour = String(time).split(':')[0];
        const min = String(time).split(':')[1];
        return hour + ':' + min;
    }

    // 실시간으로 DB 조회
    useEffect(()=>{
        onSnapshot(collection(dbService, `GroupId${id}`), (snapshot) => {
            const chatArray = snapshot.docs.map((doc)=>({
                id : doc.id,
                ...doc.data(),
            }));
            setChats(chatArray);
        });
    },[])

    // 채팅 제출 함수
    const submitContent = async (event) => {
        
        if(chat.length === 0) { return }
        event.preventDefault();

        // 문서에 내용 추가
        const dateTime = new Date();

        await addDoc(collection(dbService, `GroupId${id}`),
        {   
            UserToken : '메추리알',
            contents : chat,
            date : new Date(dateTime.getTime() - (dateTime.getTimezoneOffset() * 60000)).toISOString(),
        });

        setChat('');
    }

    // 채팅 작성 함수
    const writeContent = (event) => { 
        setChat(event.target.value);
    }

    // 채팅 기록을 반환하는 함수
    const showChatRecords = () => {
        // 만약 채팅 기록을 저장하는 chats이 존재한다면
        if(chats.length !== 0){
            // 채팅 기록 배열에 chats의 채팅 배열인 chating을 시간 기준 내림차순으로 정렬
            let printChats = chats.sort((a, b)=>{
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

                return bDate - aDate;
                
            }) // 정렬한 배열을 순회하면서 sender을 확인하여 본인 채팅과 상대방 채팅의 css를 구별
            .map(chatInfo => {
                console.log(chatInfo.UserToken);
                if(chatInfo.UserToken === '메추리알'){
                    return (<div key={chats.id} className='bsd_chat_me'>
                        <div className='bsd_chat_date'>
                            {getDateTrans(chatInfo.date)}</div>
                        <div className='bsd_chat_content'>{chatInfo.contents}</div>
                    </div>)
                }
                else{
                    return (<div key={chats.id} className='bsd_chat_oppon'>
                        <div className='bsd_chat_content'>{chatInfo.contents}</div>
                        <div className='bsd_chat_date'>{getDateTrans(chatInfo.date)}</div>
                    </div>)
                }
            });

            return printChats;
        }
    }

    return(
        <div className='BSDChatRoomPage'>
            <div className='bsd_chatroom_header'>
                채팅
            </div>
            <div className='bsd_chatroom_body'>
                <div className='bsd_chatroom_body_div'>
                    {showChatRecords()}
                </div>
            </div>

            <div className='bsd_chatroom_inputbar'>
                <input type="text" value={chat} onChange={writeContent}/>
                <button onClick={submitContent}>
                    <img src='/icons/bsd_send_icon.png'/>
                </button>
            </div>
        </div>
    );
}

export default BSDChatRoomPage;