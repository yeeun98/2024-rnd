import styled, { createGlobalStyle } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Common = styled.div`
  max-width: 430px;
  margin: auto;
  background-color: aqua;
`;
const Golfzon2024 = styled(Common)`
  height: 500px;
`;

function Golfzon() {
  const golfzonRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소의 경계가 뷰포트의 맨 위에 닿았는지 확인
        setIsAtTop(entry.boundingClientRect.top === 0 && entry.isIntersecting);
      },
      {
        root: null, // 뷰포트를 기준으로 감지
        threshold: 0, // 요소의 가장자리가 감지되면 트리거
        rootMargin: '0px 0px -100% 0px', // 맨 위만 감지하도록 설정
      }
    );

    if (golfzonRef.current) {
      observer.observe(golfzonRef.current);
    }

    // 클린업
    return () => {
      if (golfzonRef.current) {
        observer.unobserve(golfzonRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      {/* 감지할 컴포넌트 */}
      <div
        ref={golfzonRef}
        style={{ height: '100vh', backgroundColor: 'lightgreen' }}
      >
        <h1>Golfzon Component</h1>
        {/* Golfzon이 보일 때 상태 변화 */}
        {isAtTop && <p>Golfzon이 화면에 보이기 시작했습니다!</p>}
      </div>

    </div>
  );
}

export default Golfzon;
