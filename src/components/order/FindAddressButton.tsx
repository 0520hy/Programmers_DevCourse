import React, { useEffect } from 'react'
import Button from '../common/Button'

interface Props {
    onCompleted: (address: string) => void;
}

const SCRIPT_URL ="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function FindAddressButton({onCompleted}:Props) {

    const handleOpen = () => {
        new window.daum.Postcode({
            onComplete: (data: any) => {
                onCompleted(data.address as string);
            }
        }).open();
    }
    useEffect(() => {
        const script = document.createElement('script');
        script.src = SCRIPT_URL;
        script.async = true;
        document.head.appendChild(script);
        return () => {
            // 버튼이 사라지면 script도 삭제
            document.head.removeChild(script);
        }
    }, []);

  return (
    <Button type="button" size='medium' scheme='normal' onClick={handleOpen}>
        주소 찾기
    </Button>
  )
}

export default FindAddressButton
