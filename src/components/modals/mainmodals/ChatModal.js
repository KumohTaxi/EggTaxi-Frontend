import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import './ChatModal.css';import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROXY } from '../../../contexts/ProxyContext';

const ChatModal=(props)=>{
    const [isCommentList, setIsCommentList] = useState([]);

    function ConfirmNum(data) {
        var numList = [];
        
        for (let i = 0; i < data.length; i++){
            if(!localStorage.getItem('user_code').includes(data[i].identityNum)){
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
            localStorage.setItem('user_code', res.data[0].identityNum);

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
            result.push(<div className='messageBox' key={i}>
                            <div className='msgName'>
                                익명{localStorage.getItem('user_code').indexOf(isCommentList[i].identityNum)+1}
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
        className='ChatModal'
        >
            <Modal.Header style={{backgroundColor: "#212428"}}>
                <Modal.Title className="ChatTitle" id="contained-modal-title-vcenter">
                Chat
                </Modal.Title>
                <img className='CloseButton' src='imgs/Close.png' onClick={props.onHide}/>
            </Modal.Header>

            <Modal.Body className='ChatMiddle'>
                {reloadComment()}
            </Modal.Body>

            <InputGroup> 
                <FormControl
                placeholder="그룹원들과 소통해보세요."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className='ChatInput'
                onKeyPress = {EnterKeyPress}
                />
                <Button className='myCommentInputButton' variant="outline-secondary"
                    id="button-addon2" onClick={()=>{saveMsg();}}>
                    등록
                </Button>
                <Button className='myRefreshButton' variant="outline-secondary" onClick={checkComment}>
                    <img className='refreshImg' src='imgs/Refresh.png'/>
                </Button>
            </InputGroup>
        </Modal>
    );
}

export default ChatModal;