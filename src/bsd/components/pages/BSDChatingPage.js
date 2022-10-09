import '../../styles/pages/BSDChatingPage.css'
import { useNavigate } from 'react-router-dom'

const BSDChatingPage = () => {
    const navi = useNavigate();

    const chatData = [
        {
            chatid: 1,
            opponent: '타조알',
            chating: [
                {
                    sender: 'oppon',
                    contents: '안녕하세요.',
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

    const openChatRoom = (id) => {
        const checkDevice = navigator.userAgent;
        let isMobile = false;
        if(checkDevice.indexOf("iPhone") > -1 || checkDevice.indexOf("Android") > -1) isMobile = true;

        if(isMobile) navi(`/bsd/chat/${id}`);
        else window.open(`/bsd/chat/${id}`, `_blank`, `height=600, width=350, menubar=0, resizable=0 left=200 top=100`, `false`);
    }

    const chatList = () => {
        let chatlist = [];
        let sortChat = [];

        for (let i = 0; i < chatData.length; i++) {
            let tempChat = chatData[i].chating;
            sortChat.push(
                {
                    chatid: chatData[i].chatid,
                    opponent: chatData[i].opponent,
                    recentText: tempChat[tempChat.length - 1].contents,
                    recentDate: tempChat[tempChat.length - 1].date
                }
            );
        }
        sortChat.sort((a, b) => {
            let aTemp = a.recentDate.split(':').map(Number);
            let bTemp = b.recentDate.split(':').map(Number);
            
            if(aTemp[0] !== bTemp[0]) return bTemp[0] - aTemp[0];
            else return bTemp[1] - aTemp[1];
        })

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