import '../../styles/pages/BSDChatRoomPage.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BSDChatRoomPage=()=>{
    // useParams를 통해 채팅방 id를 확인
    const {id} = useParams();

    // 임시 데이터
    const chatData = [
        {
            // 채팅방 아이디
            chatid: 1,
            // 상대방 이름
            opponent: '타조알',
            // 채팅 기록
            chating: [
                {
                    // 보낸 사람의 상태
                    sender: 'oppon',
                    // 채팅 내용
                    contents: '안녕하세요.',
                    // 채팅 전송 시간대
                    date: '18:30'
                },
                {
                    sender: 'me',
                    contents: '네 안녕하세요.',
                    date: '18:31'
                },
                {
                    sender: 'oppon',
                    contents: '물건은 잘 있나요?',
                    date: '18:32'
                }
            ]
        },
        {
            chatid: 2,
            opponent: '계란',
            chating: [
                {
                    sender: 'oppon',
                    contents: '야',
                    date: '18:35'
                },
                {
                    sender: 'me',
                    contents: '누구세요?',
                    date: '18:40'
                },
                {
                    sender: 'oppon',
                    contents: '뭐',
                    date: '18:45'
                },
                {
                    sender: 'me',
                    contents: '뭐야 이새끼',
                    date: '18:50'
                },
                {
                    sender: 'oppon',
                    contents: '야',
                    date: '18:51'
                },
                {
                    sender: 'me',
                    contents: '누구세요?',
                    date: '18:52'
                },
                {
                    sender: 'oppon',
                    contents: '뭐',
                    date: '18:53'
                },
                {
                    sender: 'me',
                    contents: '뭐야 이새끼',
                    date: '18:54'
                },
                {
                    sender: 'oppon',
                    contents: '야',
                    date: '18:55'
                },
                {
                    sender: 'me',
                    contents: '누구세요?',
                    date: '18:56'
                },
                {
                    sender: 'oppon',
                    contents: '뭐',
                    date: '18:57'
                },
                {
                    sender: 'me',
                    contents: '뭐야 이새끼',
                    date: '18:58'
                },
                {
                    sender: 'oppon',
                    contents: '야',
                    date: '18:59'
                },
                {
                    sender: 'me',
                    contents: '누구세요?',
                    date: '19:00'
                },
                {
                    sender: 'oppon',
                    contents: '뭐',
                    date: '19:01'
                },
                {
                    sender: 'me',
                    contents: '뭐야 이새끼',
                    date: '19:02'
                },
                {
                    sender: 'oppon',
                    contents: '야',
                    date: '19:03'
                },
                {
                    sender: 'me',
                    contents: '누구세요?',
                    date: '19:04'
                },
                {
                    sender: 'oppon',
                    contents: '뭐',
                    date: '19:05'
                },
                {
                    sender: 'me',
                    contents: '뭐야 이새끼',
                    date: '19:06'
                }
            ]
        },
        {
            chatid: 3,
            opponent: '특란',
            chating: [
                {
                    sender: 'oppon',
                    contents: '뭐하세요',
                    date: '18:40'
                }
            ]
        }
    ]

    // 채팅방의 채팅 기록을 저장할 useState
    const [chatObj, setChatObj] = useState('');

    useEffect(()=>{
        // 채팅기록이 ''라면, 즉 초기 상태라면
        if(chatObj === ''){
            let temp;
            // 채팅 데이터 중 useParams id와 일치하는 객체를 chatObj에 저장
            chatData.map(x=>{
                if(x.chatid === parseInt(id)) temp = {...x};
            })
            setChatObj(temp);
        }
    },[])

    // 채팅 기록을 반환하는 함수
    const showChatRecords = () => {
        // 만약 채팅 기록을 저장하는 chatObj이 존재한다면
        if(chatObj.chating){
            // 키 값을 저장하는 변수
            let keynum = 0;
            // chatRecords 배열에 chatObj의 채팅 배열인 chating을 시간 기준 내림차순으로 정렬
            let chatRecords = chatObj.chating.sort((a, b)=>{
                const adate = a.date.split(':').map(Number);
                const bdate = b.date.split(':').map(Number);
                if(adate[0] !== bdate[0]) return bdate[0] - adate[0];
                else return bdate[1] - adate[1];
            }) // 정렬한 배열을 순회하면서 sender을 확인하여 본인 채팅과 상대방 채팅의 css를 구별
            .map(x=>{
                if(x.sender === 'me'){
                    return <div key={keynum++} className='bsd_chat_me'>
                        <div className='bsd_chat_date'>{x.date}</div>
                        <div className='bsd_chat_content'>{x.contents}</div>
                    </div>
                }
                else{
                    return <div key={keynum++} className='bsd_chat_oppon'>
                        <div className='bsd_chat_content'>{x.contents}</div>
                        <div className='bsd_chat_date'>{x.date}</div>
                    </div>
                }
            });
    
            return chatRecords;
        }
    }

    return(
        <div className='BSDChatRoomPage'>
            <div className='bsd_chatroom_header'>
                {chatObj.opponent}님
            </div>
            <div className='bsd_chatroom_body'>
                <div className='bsd_chatroom_body_div'>
                    {showChatRecords()}
                </div>
            </div>
            <div className='bsd_chatroom_inputbar'>
                <input/>
                <button>
                    <img src='/icons/bsd_send_icon.png'/>
                </button>
            </div>
        </div>
    );
}

export default BSDChatRoomPage;