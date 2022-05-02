import {Modal, Button, Badge, InputGroup, FormControl} from 'react-bootstrap';
import './MyGroupModal.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WarningModal from '../submodals/WarningModal';

const MyGroupModal=(props)=>{
    const [isMsg, setIsMsg] = useState('');
    const [isWarningView, setIsWarningView] = useState(false);
    const [isCommentList, setIsCommentList] = useState([]);
    const [isNumList, setIsNumList] = useState([]);

    function ConfirmNum(data) {
        var numList = isNumList;
        
        for (let i = 0; i < data.length; i++){
            if(!isNumList.includes(data[i].identityNum)){
                numList.push(data[i].identityNum);
            }
        };

        setIsNumList(numList);
    };

    function checkComment(){
        axios({
            method:'get',
            url:`/group/${props.myid}/post`,
            headers:{
                'ContentType':'appliction/json'
            },
        })
        .then((res) => {
            setIsCommentList(res.data);
            ConfirmNum(res.data);
        })
    };

    function enterComment(){
        axios({
            method:'post',
            url:`/posts/new`,
            data:{
                accessToken: localStorage.getItem('access_token'),
                msg : isMsg,
                groupId : props.myid,
            },
            headers:{
                'ContentType':'appliction/json'
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
                                익명{isNumList.indexOf(isCommentList[i].identityNum)+1}
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
        var el = document.getElementsByClassName('myCommentInput');

        for(var i = 0; i<el.length; i++){
            el[i].value = '';
        };
    };

    useEffect(()=>{
        checkComment();
    },[props.show])

    return(
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='box'
            >
                <Modal.Header style={{backgroundColor: "#282828"}}>
                    <Modal.Title className='MyTitle' id="contained-modal-title-vcenter">
                    My Group
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='MyMiddle'>
                    <div className='scrollBox'>
                        <div className= 'personBox'>
                            <div className='mySubTitle'>
                                <span>
                                    인원
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='mySubContent'>
                                <Badge bg="light" text="dark">{props.mycount} / 4명</Badge>
                            </div>
                        </div>
                        <div className='destiBox'>
                            <div className='mySubTitle'>
                                <span>
                                    목적지
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='mySubContent'>
                                <Badge bg="light" text="dark">{props.mydestination}</Badge>
                            </div>
                        </div>
                        <div className='timeBox'>
                            <div className='mySubTitle'>
                                <span>
                                    출발시각
                                </span>
                            </div>
                            <div className="vr" />
                            <div className='mySubContent'>
                                <Badge bg="light" text="dark">{props.mymonth}월 {props.myday}일 &nbsp;/&nbsp; {props.myhour}시 {props.myminute}분</Badge>
                            </div>
                        </div>
                        <div className='myComment'>
                            <div className='myCommentHead'>
                                <div className='myCommentTitle'>
                                    Communication
                                </div>
                                <Button className='myRefreshButton' variant="light" onClick={checkComment}>
                                    <img className='refreshImg' src='imgs/Refresh.png'/>
                                </Button>
                            </div>
                            <div className='subScrollBox'>
                                <div>
                                    {reloadComment()}
                                </div>
                            </div>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="그룹원들과 소통해보세요."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                className='myCommentInput'
                                style={{fontSize: "4vmin"}}
                                onChange={(event)=> setIsMsg(event.target.value)}
                                />
                                <Button className='myCommentInputButton' variant="outline-secondary"
                                id="button-addon2" style={{fontSize: "4vmin"}} onClick={()=>{enterComment(); clearInput();}}>
                                    등록
                                </Button>
                            </InputGroup>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className='MyFooter' style={{backgroundColor: "#FFFCEE"}}>
                    <Button variant="dark" className='MyBottomButtonLeft' onClick={()=>{props.onHide(); setIsWarningView(true);}}>그룹 나가기</Button>
                    <Button variant="dark" className='MyBottomButtonRight' onClick={()=>{props.onHide();}}>확인</Button>
                </Modal.Footer>
            </Modal>

            <WarningModal
                show={isWarningView}
                onHide={()=>{setIsWarningView(false)}}
                myid={props.myid}
            />
        </div>
        
    );
}

export default MyGroupModal;