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
  /* margin-top: 220px; */
  /* top: 50%; */
  /* margin-top: auto; */
  /* margin-top: ${({ isAtTop }) => (isAtTop ? "220px" : "170px")}; */
  /* position: relative; */
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
          position: ${isAtTop ? 'fixed' : 'absolute'};
          top: ${isAtTop ? `${firstBoxTop}px` : '10%'};
          // top: 10%;
          // top: ${isAtTop ? '358px' : '10%'};
          // transform: ${isAtTop ? '' : 'translate(-50%, -50%)'}; /* 요소의 중심을 기준으로 이동 */
          z-index: 1;
        `;
      case 'second':
        return `
          background-color: #3993DF;
          position: ${isAtSecondTop ? 'fixed' : 'absolute'};
          top: ${isAtSecondTop ? '200px' : '720px'};
          z-index: 2;
          margin-top: 40px;
        `;
      case 'third':
        return `
          background-color: #1864A6;
          position: ${isAtThirdTop ? 'fixed' : 'absolute'};
          top: ${isAtThirdTop ? '240px' : '1440px'};
          z-index: 3;
          margin-top: 50px;
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

  useEffect(() => {
    const handleScroll = () => {
      if (rankWrapRef.current && firstBoxRef.current) {
        const rect = rankWrapRef.current.getBoundingClientRect();
        const rect2 = firstBoxRef.current.getBoundingClientRect();

        const shouldBeFixed = rect.top < 0;

        if (shouldBeFixed !== isAtTop) {
          setFirstBoxTop(rect2.top+'');
          setIsAtTop(shouldBeFixed);
        }
      }
      if (secondBoxRef.current) {
        const rect = secondBoxRef.current.getBoundingClientRect();
        const tmp = Number(firstBoxTop.split('px')[0]) + 40;
        const shouldBeFixed = rect.top < tmp;
        console.log(rect, tmp, firstBoxTop)

        if (shouldBeFixed !== isAtSecondTop) {
          setIsAtSecondTop(shouldBeFixed);
        }
      }
      if (thirdBoxRef.current) {
        const rect = thirdBoxRef.current.getBoundingClientRect();
        const shouldBeFixed = rect.top < 290;

        if (shouldBeFixed !== isAtThirdTop) {
          setIsAtThirdTop(shouldBeFixed);
        }
      }
    };

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsAtTop, setIsAtSecondTop, setIsAtThirdTop]);

  return (
    <Wrap ref={rankWrapRef}>
      <Title isAtTop={isAtTop}>
        <h1>올해 <strong><em></em>TOP 랭킹</strong>들을 모아봤어요 !</h1>
      </Title>

      <Content isAtTop={isAtTop}>
        <Box order="first" ref={firstBoxRef} isAtTop={isAtTop} firstBoxTop={firstBoxTop} className='first'></Box>
        <Box order="second" ref={secondBoxRef} isAtSecondTop={isAtSecondTop}></Box>
        <Box order="third" ref={thirdBoxRef} isAtThirdTop={isAtThirdTop}></Box>
      </Content>
    </Wrap>
  );
}

export default Golfzon;
