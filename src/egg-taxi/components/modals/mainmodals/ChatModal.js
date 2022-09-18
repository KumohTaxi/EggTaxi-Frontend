import {Modal, Button, InputGroup, FormControl, Badge} from 'react-bootstrap';
import '../../../styles/components/modals/mainmodals/ChatModal.css';import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROXY } from '../../../contexts/ProxyContext';

const ChatModal=(props)=>{
    const [isCommentList, setIsCommentList] = useState([]);

    function saveMsg(){
        var text = document.getElementsByClassName('ChatInput')[0].value;

        clearInput();
        enterComment(text);
    }

    const EnterKeyPress = (e) =>{
        if(e.key==='Enter'){
            saveMsg(); 
        }
    }

    function clearInput(){
        var el = document.getElementsByClassName('ChatInput');

        for(var i = 0; i<el.length; i++){
            el[i].value = '';
        };
    };

    function enterComment(text){
        axios({
            method:'post',
            url:`${PROXY}/posts/new`,
            data:{
                accessToken: localStorage.getItem('access_token'),
                msg : text,
                groupId : localStorage.getItem("mygroupid"),
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then(() => {
            checkComment();
        })
    };

    function checkComment(){
        if(localStorage.getItem("mygroupid")){
            axios({
                method:'get',
                url:`${PROXY}/group/${localStorage.getItem("mygroupid")}/post`,
                headers:{
                    'ContentType':'application/json'
                },
            })
            .then((res) => {
                setIsCommentList(res.data);
            })
        }
    };

    useEffect(()=>{
        checkComment();
    },[props.show])

    function reloadComment(){
        const result = [];
        const order = [];
        for (let i = 0; i < isCommentList.length; i++){

            if(!order.includes(isCommentList[i].identityNum)){
                order.push(isCommentList[i].identityNum);
            }

            result.push(
                        isCommentList[i].identityNum.toString() === localStorage.getItem("my_code")?
                        <div className='MyMessageBox' key={i}>
                            <div className='MyMsgContent'>
                                {isCommentList[i].msg}
                            </div>
                        </div>:
                        <div className='messageBox' key={i}>
                            <div>
                                <Badge bg='light' className='msgName'>
                                    {isCommentList[i].memberStatus === "CAPTAIN"
                                    ?'그룹장'
                                    :'익명'+(order.indexOf(isCommentList[i].identityNum)+1)}
                                </Badge>
                            </div>
                            <div className="vr" />
                            <div className='msgContent'>
                                {isCommentList[i].msg}
                            </div>
                        </div>);
        };
        return result;
    };

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className="ChatTitle" id="contained-modal-title-vcenter">
                Chat
                </Modal.Title>
                <img className='CloseButton' src='imgs/Close.png' onClick={props.onHide} alt='이미지를 불러올 수 없습니다.'/>
            </Modal.Header>

            <Modal.Body className='ChatMiddle'>
                <div>
                {reloadComment()}
                </div>
            </Modal.Body>

            <InputGroup className='chatInputGroup'> 
                <FormControl
                placeholder="그룹원들과 소통해보세요."
                className='ChatInput'
                onKeyPress = {EnterKeyPress}
                />
                <Button className='myCommentInputButton' variant="secondary" onClick={()=>{saveMsg();}}>
                    등록
                </Button>
                <Button className='myRefreshButton' variant="secondary" onClick={checkComment}>
                    <img className='refreshImg' src='imgs/Refresh.png' alt='이미지를 불러올 수 없습니다.'/>
                </Button>
            </InputGroup>
        </Modal>
    );
}

export default ChatModal;