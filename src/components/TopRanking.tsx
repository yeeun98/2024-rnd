import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSecondView, isThirdView, isViewGolfzonSection } from '../variable/atom';
import { Frame } from '../GlobalStyle';

//#region props type
interface StickyDivProps {
  isAtTop: boolean;
}
interface BoxDivProps {
  isAtTop?: boolean;
  isAtSecondTop?: boolean;
  isAtThirdTop?: boolean;
  order: 'first' | 'second' | 'third'
}
//#endregion

//#region style-component
const Wrap = styled(Frame)`
  min-height: 250dvh;
  overflow: hidden;

  @media (max-width: 768px) {
    h1 {
      font-family: 'GmarketSansMedium', sans-serif; /* 글로벌 폰트 사용 */
      font-size: 23px;

      strong {
        font-weight: 900;
      }
    }
  }
`;
const Common = styled.div`
  max-width: 860px;
  margin: auto;
  text-align: center;
`;
const Title = styled(Common)<StickyDivProps>`
  position: ${({ isAtTop }) => (isAtTop ? "fixed" : "static")};
  margin-top: ${({ isAtTop }) => (isAtTop ? "0" : "80px")};
  top: ${({ isAtTop }) => (isAtTop ? "80px" : "auto")};
  left: ${({ isAtTop }) => (isAtTop ? "50%" : "auto")};
  transform: ${({ isAtTop }) => (isAtTop ? "translate(-50%, -50%)" : "auto")};
  width: 100%;
  text-align: center;
  grid-row: 1/2;
`;
const Content = styled.ul<StickyDivProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ isAtTop }) => (isAtTop ? "220px" : "170px")};
  position: relative;
`;
const Box = styled.li<BoxDivProps>`
  width: 80%;
  max-width: 500px;
  height: 500px;
  border-radius: 20px;
  pointer-events: none;
  user-select: none;

  ${({ order, isAtTop, isAtSecondTop }) => {
    switch (order) {
      case 'first':
        return `
          background-color: #77CDFF;
          position: ${isAtTop ? 'fixed' : 'absolute'};
          top: ${isAtTop ? '200px' : '0'};
          z-index: 1;
        `;
      case 'second':
        return `
          background-color: #3993DF;
          // top: 720px;
          position: ${isAtSecondTop ? 'fixed' : 'absolute'};
          top: ${isAtSecondTop ? '200px' : '720px'};
          z-index: 2;
          margin-top: 35px;
        `;
      case 'third':
        return `
          background-color: #1864A6;
          position: absolute;
          top: 1440px;
          z-index: 3;
        `;
      
      default:
        return;
    }
  }}
`;
//#endregion

function Golfzon() {
  const golfzonRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLLIElement>(null);
  const [isAtTop, setIsAtTop] = useRecoilState(isViewGolfzonSection);
  const [isAtSecondTop, setIsAtSecondTop] = useRecoilState(isSecondView);
  const [isAtThirdTop, setIsAtThirdTop] = useRecoilState(isThirdView);

  useEffect(() => {
    const handleScroll = () => {
      if (golfzonRef.current) {
        const rect = golfzonRef.current.getBoundingClientRect();
        setIsAtTop(rect.top < 0); // 천장에 닿았는지 확인
      }
      if (secondRef.current && !isAtSecondTop) {
        console.log('oin')
        const rect = secondRef.current.getBoundingClientRect();
        const shouldBeFixed = rect.top < 235;

        // 상태가 변경될 필요가 없으면 업데이트를 하지 않음
        if (shouldBeFixed !== isAtSecondTop) {
          setIsAtSecondTop(shouldBeFixed);
        }
      }
    };

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsAtTop, setIsAtSecondTop]);

  return (
    <Wrap ref={golfzonRef}>
      <Title isAtTop={isAtTop}>
        <h1 className={isAtTop ? 'at-top-class' : 'default-class'}>
          올해 <strong>TOP 랭킹</strong>들을 모아봤어요 !  
        </h1>
      </Title>

      <Content isAtTop={isAtTop}>
        <Box isAtTop={isAtTop} order="first"></Box>
        <Box order="second" ref={secondRef} isAtSecondTop={isAtSecondTop}></Box>
        <Box order="third"></Box>
      </Content>
    </Wrap>
  );
}

export default Golfzon;
