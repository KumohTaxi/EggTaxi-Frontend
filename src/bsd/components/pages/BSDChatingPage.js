import '../../styles/pages/BSDChatingPage.css'
import { useNavigate } from 'react-router-dom'

const BSDChatingPage = () => {
    const navi = useNavigate();

    // 임시데이터
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

    // 채팅 방 여는 함수
    const openChatRoom = (id) => {
        // 모바일인디 데스크탑인지 판단
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
        // 반환할 채팅방 배열
        let chatlist = [];
        // 메세지가 가장 최근인 방을 상단에 띄우기 위해 정렬을 할 배열
        let sortChat = [];

        // 임시 데이터를 순회 
        for (let i = 0; i < chatData.length; i++) {
            // 임시 데이터에서 채팅 기록을 저장
            let tempChat = chatData[i].chating;
            // chatid(채팅방 아이디), opponent(상대방 이름), recentText(최근 채팅 내용), recentDate(최근 채팅 날짜) 저장
            sortChat.push(
                {
                    chatid: chatData[i].chatid,
                    opponent: chatData[i].opponent,
                    recentText: tempChat[tempChat.length - 1].contents,
                    recentDate: tempChat[tempChat.length - 1].date
                }
            );
        }
        // 저장한 정보를 시간을 기준으로 최신순으로 정렬
        sortChat.sort((a, b) => {
            let aTemp = a.recentDate.split(':').map(Number);
            let bTemp = b.recentDate.split(':').map(Number);
            
            // 시간이 다르면 시간으로 내림차순
            if(aTemp[0] !== bTemp[0]) return bTemp[0] - aTemp[0];
            // 시간이 같으면 분으로 내림차순
            else return bTemp[1] - aTemp[1];
        })

        // 정렬된 배열을 순회하며 반환할 배열에 저장
        for (let i = 0; i < sortChat.length; i++) {
            chatlist.push(
                <div key={i} className="chatRoom" onClick={()=>openChatRoom(sortChat[i].chatid)}>
                    <div>
                        {sortChat[i].opponent}님
                    </div>
                    <div>
                        <div>
                            {sortChat[i].recentDate}
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

    return (
        <div className='BSDChatingPage'>
            <div className='bsd_chat_header'>
                채팅
            </div>
            <div className='bsd_chat_body'>
                {chatList()}
            </div>
        </div>
    );
}

export default BSDChatingPage;