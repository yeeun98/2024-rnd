import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';

const Wrapper = styled(Frame)`
  background-color: #03045E;
  color: white;
  height: auto;
`;

const Decoration = styled.div`
  position: relative;
  background: url(/images/snow-short.png) no-repeat;
  background-size: contain;
  margin-top: -55px;
  margin-left: -45px;
  height: 100px;
  opacity: 0.5;

  @media (max-width: 768px) {
    width: calc(100% + 20px);
  }

  @media (min-width: 769px) {
    width: calc(100% + 45px);
  }
`;

const Container = styled.div<{ isVisible: boolean }>`
  transform: ${({ isVisible }) => isVisible ? "translateY(0)" : "translateY(50px)"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: transform 0.9s ease-out, opacity 0.9s ease-out;
  margin-top: -40px;
`;

const CardContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  max-width: 1200px;
  margin: 50px auto 0 auto;
  border-radius: 15px;
  background-color: rgba(0, 119, 182, 0.2);
  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    height: 650px;
  }

  @media (min-width: 769px) {
    height: 800px;
  }
`;

export const CardContainer = styled.div<{ shape: string }>`
  perspective: 1000px;
  cursor: pointer;
  pointer-events: all;
  user-select: all;

  ${({ shape }) => {
    switch (shape) {
      case 'circle':
        return `
          grid-column : 1 / 3;
          grid-row : 1 / 5;
          z-index: 1;
        `;
      case 'star':
        return `
          grid-column : 3 / -1;
          grid-row : 1 / 3;
        `;
      case 'clover':
        return `
          grid-column : 2 / 4;
          grid-row : 3 / 5;
          z-index: 2;
        `;
      case 'triangle':
        return `
          grid-column : 1 / 2;
          grid-row : 4 / 6;
          z-index: 2;
        `;
      case 'diamond':
        return `
          grid-column : 2 / 5;
          grid-row : 5 / -1;
        `;
      
      default:
        return;
    }
  }}
`;

export const Card = styled.div<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

export const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
`;

export const CardFront = styled(CardFace)`
  background: transparent;
`;

export const CardBack = styled(CardFace)`
  background: transparent;
  transform: rotateY(180deg);
`;

export const CardShape = styled.div<{ shape: string }>`
  width: 100%;
  height: 100%;
  position: relative; /* 텍스트와 배경을 분리하는 기준 */

  ${({ shape }) => {
    switch (shape) {
      case 'circle':
        return `
          position: absolute;
          top: 20px;
          border-radius: 50%;
          background-color: pink;
          width: 70%;
          height: 100%;
        `;
      case 'star':
        return `
          background-color: yellow;
           width: 70%;
          height: 100%;
        `;
      case 'clover':
        return `
          background-color: purple;
           width: 70%;
          height: 100%;
        `;
      case 'triangle':
        return `
          width: 0;
          height: 0;
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
          border-bottom: 100px solid #f44336;
          background: none;
           width: 70%;
          height: 100%;
        `;
      case 'diamond':
        return `
        background-color: skyblue;
         width: 70%;
          height: 100%;
        `;
      default:
        return `
          background-color: #000;
        `;
    }
  }}

  p {
    position: absolute; /* 텍스트를 배경과 분리 */
    top: 50%; /* 수직 중앙 정렬 */
    left: 50%; /* 수평 중앙 정렬 */
    transform: translate(-50%, -50%); /* 정확히 중앙에 배치 */
    font-size: 18px;
    color: white;
    z-index: 1; /* 텍스트를 배경 위로 */
  }
`;


function Golfzon() {
  const golfzonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const shapes = ['circle', 'triangle', 'star', 'clover', 'diamond'];

  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false]); // 카드별 상태 배열

  const handleFlip = (index: number) => {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

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
      <Decoration>

      </Decoration>
      <Container isVisible={isVisible}>
        <h1>올해 골프존은요 !</h1>

        <CardContainerWrapper>
          {shapes.map((shape, index) => (
            <CardContainer key={index} shape={shape} onClick={() => handleFlip(index)}>
              <Card flipped={flippedCards[index]}>
                <CardFront>
                  <CardShape shape={shape} />
                </CardFront>
                <CardBack>
                  <p>뒷면 {index + 1}</p>
                  <CardShape shape={shape} />
                </CardBack>
              </Card>
            </CardContainer>
          ))}
        </CardContainerWrapper>
      </Container>
    </Wrapper>
  );
}

export default Golfzon;
