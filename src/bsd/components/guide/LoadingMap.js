import { useState } from 'react';
import '../../styles/guide/LoadingMap.css';
import useInterval from '../../hooks/useInterval';

const LoadingMap = () => {
    const [loadText] = useState('데이터를 불러오는 중입니다');
    const [textList, setTextList] = useState('.');

    const increaseIdx = () => {
        if(textList==='.') setTextList('..');
        else if(textList==='..') setTextList('...');
        else setTextList('.');
    }

    useInterval(increaseIdx, 500);

    return (
        <div className="LoadingMap">
            <div>
                <div>
                    {loadText + textList}
                </div>
                <br/><br/><br/>
                <div>
                    네트워크의 상태에 따라 로딩 지연이나,<br/>
                    데이터가 유실될 수 있습니다.<br/>
                    <br/>
                    정확한 데이터를 원한다면<br/>
                    왼쪽 상단의 리스트로 보기 버튼을 선택해 주세요.
                </div>
            </div>
        </div>
    );
}

export default LoadingMap;