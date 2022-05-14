import {Modal, Button, InputGroup, FormControl, Badge} from 'react-bootstrap';
import './ChatModal.css';import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROXY } from '../../../contexts/ProxyContext';

const ChatModal=(props)=>{
    const [isCommentList, setIsCommentList] = useState([]);

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
        console.log("resize");
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    function ConfirmNum(data) {
        var numList = [];
        
        for (let i = 0; i < data.length; i++){
            if (data.memberStatus === "CAPTAIN" && !localStorage.getItem('user_code').includes(0)){
                numList.push(0);
            }
            else if(!localStorage.getItem('user_code').includes(data[i].identityNum)){
                numList.push(data[i].identityNum);
            }
        };

        localStorage.setItem('user_code', numList);
    };

    function checkComment(){
        axios({
            method:'get',
            url:`${PROXY}/group/${props.myid}/post`,
            headers:{
                'ContentType':'application/json'
            },
        })
        .then((res) => {
            if(res.data[0].memberStatus === "CAPTAIN"){
                localStorage.setItem('user_code', 0);
            }
            else{
                localStorage.setItem('user_code', res.data[0].identityNum);
            }

            setIsCommentList(res.data);
            ConfirmNum(res.data);
        })
    };

    function saveMsg(){
        var text = document.getElementsByClassName('ChatInput')[0].value;
        clearInput();

        enterComment(text);
    }

    function enterComment(text){
        axios({
            method:'post',
            url:`${PROXY}/posts/new`,
            data:{
                accessToken: localStorage.getItem('access_token'),
                msg : text,
                groupId : props.myid,
            },
            headers:{
                'ContentType':'application/json'
            },
        })
        .then(() => {
            checkComment();
        })
    };

    function reloadComment(){
        const result = [];
        for (let i = 0; i < isCommentList.length; i++){
            result.push(
                        isCommentList[i].identityNum == localStorage.getItem("my_code")?
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
                                    :'익명'+(localStorage.getItem('user_code').indexOf(isCommentList[i].identityNum)+1)}
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

    function clearInput(){
        var el = document.getElementsByClassName('ChatInput');

        for(var i = 0; i<el.length; i++){
            el[i].value = '';
        };
    };

    const EnterKeyPress = (e) =>{
        if(e.key==='Enter'){
            saveMsg(); 
        }
    }

    useEffect(()=>{
        checkComment();
    },[props.show])

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
                <img className='CloseButton' src='imgs/Close.png' onClick={props.onHide}/>
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
                    <img className='refreshImg' src='imgs/Refresh.png'/>
                </Button>
            </InputGroup>
        </Modal>
    );
}

export default ChatModal;