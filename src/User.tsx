import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

// Props 타입 정의
interface StickyDivProps {
  isAtTop: boolean;
}

const Common = styled.div`
  max-width: 430px;
  margin: auto;
`;
const Golfzon2024 = styled(Common)<StickyDivProps>`
  height: 100vh;
  /* background-color: lightblue; */
  position: ${({ isAtTop }) => (isAtTop ? "fixed" : "static")};
  top: ${({ isAtTop }) => (isAtTop ? "0" : "auto")};
  left: ${({ isAtTop }) => (isAtTop ? "50%" : "auto")};
  transform: ${({ isAtTop }) => (isAtTop ? "translate(-50%)" : "auto")};
`;
const Wrap = styled.div`
  min-height: 200vh;
`;

function User() {
  const golfzonRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소의 경계가 뷰포트의 맨 위에 닿았는지 확인
        setIsAtTop(entry.boundingClientRect.top === 0 && entry.isIntersecting);
      },
      {
        root: null, // 뷰포트를 기준으로
        threshold: [0, 0.1], // 더 세밀하게 감지
        rootMargin: '0px 0px -90% 0px', // 맨 위보다 조금 더 일찍 감지
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
    <Wrap>
      <Golfzon2024 ref={golfzonRef} isAtTop={isAtTop}>
        <h1>Golfzon Component</h1>
        {/* Golfzon이 보일 때 상태 변화 */}
        {isAtTop && <p>Golfzon이 화면에 보이기 시작했습니다!</p>}
      </Golfzon2024>
    </Wrap>
  );
}

export default User;
