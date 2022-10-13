import { useEffect, useState } from 'react';
import '../../styles/guide/LoadingMap.css';

const LoadingMap = () => {
    const [loadText, setLoadText] = useState('데이터를 불러오는 중입니다');
    const [textList] = useState(['.', '..', '...']);
    const [idx, setIdx] = useState(0);
    console.log(idx);

    useEffect(()=>{
        setTimeout(()=>{
            setIdx(idx++);
            if(idx === 3) setIdx(0);
        },100);
    },[]);

    return (
        <div className="LoadingMap">
            <div>
                <div>
                    {loadText + textList[idx]}
                </div>
                <br/><br/><br/>
                <div>
                    네트워크의 상태에 따라 로딩 지연이나,<br/>
                    데이터가 유실될 수 있습니다.<br/>
                    <br/>
                    좀 더 질 좋은 데이터를 원한다면<br/>
                    왼쪽 상단의 리스트로 보기 버튼을 선택해 주세요.
                </div>
            </div>
        </div>
    );
}

export default LoadingMap;