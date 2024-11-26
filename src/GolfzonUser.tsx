import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Wrapper = styled.div`
  height: 100vh;
  background-color: #4caf50;
  color: white;
  padding: 35px 25px;
  font-size: 1.5rem;
`;

const Content = styled.div<{ isVisible: boolean }>`
  transform: ${({ isVisible }) => isVisible ? "translateY(0)" : "translateY(50px)"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: transform 0.9s ease-out, opacity 0.9s ease-out;
`;

const Item = styled.div``;

function GolfzonUser() {
  const golfzonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 진입했을 때
          setIsVisible(true);
        }
      },
      {
        root: null, // 뷰포트 기준
        threshold: 0.1, // 요소의 10% 이상이 보이면 트리거
        rootMargin: "0px 0px 0px 0px", // 추가 여백 없음
      }
    );

    if (golfzonRef.current) {
      observer.observe(golfzonRef.current);
    }

    return () => {
      // 컴포넌트 언마운트 시 클린업
      if (golfzonRef.current) {
        observer.unobserve(golfzonRef.current);
      }
    };
  }, []);
  
  return (
    <Wrapper ref={golfzonRef}>
      <Content isVisible={isVisible}>
        <h2>TITLE</h2>
      </Content>
    </Wrapper>
  );
}

export default GolfzonUser;
