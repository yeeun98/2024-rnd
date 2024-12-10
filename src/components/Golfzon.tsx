import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';

const Wrapper = styled(Frame)`
  display: flex;
  flex-direction: column;
  background-color: #03045E;
  color: white;
  height: auto;
`;

const Decoration = styled.div`
  position: absolute;
  background: url(/images/snow-short.png) no-repeat;
  background-size: contain;
  opacity: 0.5;
  width: 100%;
  height: 100px;
`;

const Container = styled.div<{ isVisible: boolean }>`
  transform: ${({ isVisible }) => isVisible ? "translateY(0)" : "translateY(50px)"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: transform 0.9s ease-out, opacity 0.9s ease-out;
  margin-top: -40px;

  @media (max-width: 768px) {
    margin: 35px 20px;
  }

  @media (min-width: 769px) {
    margin: 55px 45px;
  }
`;

const CardContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  max-width: 850px;
  margin: 50px auto 0 auto;
  border-radius: 15px;
  background-color: rgba(0, 119, 182, 0.2);
  padding: 15px;
  box-sizing: border-box;
  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    height: 535px;
  }

  @media (min-width: 769px) {
    height: 840px;
  }
`;

export const CardContainer = styled.div<{ shape: string }>`
  perspective: 1000px;
  pointer-events: all;
  user-select: all;
  display: flex;
  
  ${({ shape }) => {
    switch (shape) {
      case 'circle':
        return `
          justify-content: center;
          align-items: center;
          grid-column : 1 / 3;
          grid-row : 1 / 5;
          z-index: 1;
        `;
      case 'star':
        return `
          justify-content: right;
          grid-column : 2 / -1;
          grid-row : 1 / 3;
        `;
      case 'clover':
        return `
          grid-column : 2 / -1;
          grid-row : 3 / 6;
          z-index: 2;
        `;
      case 'triangle':
        return `
          align-items: center;
          grid-column : 1 / 3;
          grid-row : 4 / -1;
          z-index: 2;
        `;
      case 'diamond':
        return `
          justify-content: center;
          grid-column : 2 / 5;
          grid-row : 5 / -1;

          @media (max-width: 768px) {
            align-items: center;
          }

          @media (min-width: 769px) {
            align-items: end;
          }
        `;
      
      default:
        return;
    }
  }}
`;

export const CardShape = styled.div<{ shape: string; isVisible: boolean }>`
  aspect-ratio: 1 / 1;

  ${({ shape, isVisible }) => {
    switch (shape) {
      case 'circle':
        return `
          transform: ${isVisible ? "translateY(0)" : "translateY(50px)"};
          transition: transform 0.5s ease-out, opacity 0.5s ease-out;
          background: url(/images/golfzon/circle.png) no-repeat;
          background-size: contain;

          @media (max-width: 768px) {
            width: 100%;
          }

          @media (min-width: 769px) {
            width: 70%;
          }
        `;
      case 'star':
        return `
          transform: ${isVisible ? "translateY(0)" : "translateY(30px)"};
          transition: transform 1s ease-out, opacity 1s ease-out;
          background: url(/images/golfzon/star.png) no-repeat;
          background-size: contain;
        `;
      case 'clover':
        return `
          transform: ${isVisible ? "translateY(0)" : "translateY(50px)"};
          transition: transform 1.1s ease-out, opacity 1s ease-out;
          background: url(/images/golfzon/clover.png) no-repeat;
          background-size: contain;
          @media (max-width: 768px) {
            width: 90%;
          }

          @media (min-width: 769px) {
            width: 70%;
          }
        `;
      case 'triangle':
        return `
          background: url(/images/golfzon/triangle.png) no-repeat;
          background-size: contain;
          width: 90%;
        `;
      case 'diamond':
        return `
          aspect-ratio: 19 / 13;
          background: url(/images/golfzon/diamond.png) no-repeat;
          background-size: contain;
          width: 100%;
        `;
      default:
        return `
          background-color: #000;
        `;
    }
  }}
`;


function Golfzon() {
  const golfzonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const shapes = ['circle', 'triangle', 'star', 'clover', 'diamond'];

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
      <Decoration></Decoration>
      <Container isVisible={isVisible}>
        <h1>올해 골프존은요 !</h1>

        <CardContainerWrapper>
          {shapes.map((shape, index) => (
            <CardContainer key={index} shape={shape}>
              <CardShape shape={shape} isVisible={isVisible} />
            </CardContainer>
          ))}
        </CardContainerWrapper>
      </Container>
    </Wrapper>
  );
}

export default Golfzon;
