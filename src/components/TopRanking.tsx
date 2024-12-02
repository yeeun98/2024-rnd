import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';

//#region props type
interface StickyDivProps {
  isAtTop: boolean;
}
interface BoxDivProps {
  isAtTop?: boolean;
  isAtSecondTop?: boolean;
  isAtThirdTop?: boolean;
  firstBoxTop?: string;
  thirdBoxTop?: string;
  order: 'first' | 'second' | 'third'
}
//#endregion

//#region style-component
const Wrap = styled(Frame)`
  position: relative;
  min-height: 250dvh;
  overflow: hidden;
`;
const Title = styled.h1<StickyDivProps>`
  text-align: center;
  position: ${({ isAtTop }) => (isAtTop ? "fixed" : "static")};
  width: 100%;
  left: ${({ isAtTop }) => (isAtTop ? "50%" : "auto")};
  transform: ${({ isAtTop }) => (isAtTop ? "translate(-50%, -50%)" : "auto")};
  text-align: center;

  h1 {
      strong {
        position: relative;
        display: inline-block;
        border-bottom: 4px solid #FFEE32;
        padding-bottom: 2px;

        em {
          position: absolute;
          background: url(/images/highlight.png) no-repeat;
          background-size: contain;
          height: 22px;
          aspect-ratio: 1.5 /1;
          left: -15px;
          top: -22px;
        }
      }
    }

  @media (max-width: 768px) {
    margin-top: ${({ isAtTop }) => (isAtTop ? "0" : "100px")};
    top: ${({ isAtTop }) => (isAtTop ? "100px" : "auto")};

    h1 {
      font-size: 23px;
      
      strong {
        font-weight: 900;
        font-size: 24px;
      }
    }
  }

  @media (min-width: 769px) {
    margin-top: ${({ isAtTop }) => (isAtTop ? "0" : "150px")};
    top: ${({ isAtTop }) => (isAtTop ? "150px" : "auto")};

    h1 {
      strong {
        font-weight: 900;
        font-size: 36px;
      }
    }
  }
`;
const Content = styled.ul<StickyDivProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.li<BoxDivProps>`
  width: 80%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  border-radius: 20px;
  pointer-events: none;
  user-select: none;

  ${({ order, isAtTop, isAtSecondTop, isAtThirdTop, firstBoxTop }) => {
    switch (order) {
      case 'first':
        return `
          background-color: #77CDFF;
          position: ${isAtTop ? 'fixed': 'absolute'};
          top: ${isAtTop ? `${firstBoxTop}px` : '10%'};
          z-index: 1;
        `;
      case 'second':
        return `
          background-color: #3993DF;
          position: ${isAtSecondTop ? 'fixed' : 'absolute'};
          top: ${isAtSecondTop ? `${firstBoxTop}px` : '720px'};
          z-index: 2;
          margin-top: 50px;
        `;
      case 'third':
        return `
          background-color: #1864A6;
          position: ${isAtThirdTop ? 'fixed' : 'absolute'};
          top: ${isAtThirdTop ? `${firstBoxTop}px` : '1440px'};
          z-index: 3;
          margin-top: 100px;
        `;
      
      default:
        return;
    }
  }}
`;
//#endregion

function Golfzon() {
  const rankWrapRef = useRef<HTMLDivElement>(null);
  const firstBoxRef = useRef<HTMLLIElement>(null);
  const secondBoxRef = useRef<HTMLLIElement>(null);
  const thirdBoxRef = useRef<HTMLLIElement>(null);

  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtSecondTop, setIsAtSecondTop] = useState(false);
  const [isAtThirdTop, setIsAtThirdTop] = useState(false);

  const [firstBoxTop, setFirstBoxTop] = useState('');
  const [secondBoxTop, setSecondBoxTop] = useState('');
  const [thirdBoxTop, setThirdBoxTop] = useState('');
  const [initScrollY, setInitScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rankWrapRef.current && firstBoxRef.current) {
        const rect = rankWrapRef.current.getBoundingClientRect();
        const rect2 = firstBoxRef.current.getBoundingClientRect();
        const shouldBeFixed = rect.top < 0;

        if (shouldBeFixed !== isAtTop) {
          setFirstBoxTop(rect2.top+'');
          setIsAtTop(shouldBeFixed);
          setInitScrollY(window.scrollY);
        }
      }
      if (secondBoxRef.current) {
        const rect = secondBoxRef.current.getBoundingClientRect();
        const secondBoxTop = Number(firstBoxTop.split('px')[0]) + 50;
        const shouldBeFixed = rect.top < secondBoxTop;
        const over = rect.top > secondBoxTop;

        if (shouldBeFixed !== isAtSecondTop) {
          setIsAtSecondTop(true);
        }
        if (over !== isAtSecondTop) {
          setIsAtSecondTop(false);
        }
      }
      if (rankWrapRef.current && thirdBoxRef.current) {
        const rect = thirdBoxRef.current.getBoundingClientRect();
        const thirdBoxTop = Number(firstBoxTop.split('px')[0]) + (53 * 2);
        const shouldBeFixed = rect.top < thirdBoxTop;
        
        if (shouldBeFixed !== isAtThirdTop) {
          setIsAtThirdTop(shouldBeFixed);
          setThirdBoxTop((window.scrollY - initScrollY)+'');
        }
      }
    };

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsAtTop, setIsAtSecondTop, setIsAtThirdTop, firstBoxTop, initScrollY]);

  return (
    <Wrap ref={rankWrapRef}>
      <Title isAtTop={isAtTop}>
        <h1>올해 <strong><em></em>TOP 랭킹</strong>들을 모아봤어요 !</h1>
      </Title>

      <Content isAtTop={isAtTop}>
        <Box
          order="first"
          ref={firstBoxRef}
          isAtTop={isAtTop}
          firstBoxTop={firstBoxTop}
        />
        <Box
          order="second"
          ref={secondBoxRef}
          isAtSecondTop={isAtSecondTop}
          firstBoxTop={firstBoxTop}
        />
        <Box
          order="third"
          ref={thirdBoxRef}
          isAtThirdTop={isAtThirdTop}
          firstBoxTop={firstBoxTop}
          thirdBoxTop={thirdBoxTop}
        />
      </Content>
    </Wrap>
  );
}

export default Golfzon;
