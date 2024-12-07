import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';
import { useRecoilValue } from 'recoil';
import { isShowUserSecton } from '../variable/atom';
import { useQuery } from '@tanstack/react-query';
import { fetchBestCC } from '../api';
import { IBestCourse } from '../type';

//#region props type
interface StickyDivProps {
  isAtTop: boolean;
}
interface BoxDivProps {
  isAtTop?: boolean;
  isAtSecondTop?: boolean;
  isAtThirdTop?: boolean;
  firstBoxTop: string;
  order: 'first' | 'second' | 'third'
}
//#endregion

//#region style-component
const Wrap = styled(Frame)`
  position: relative;
  min-height: 300vh;
  overflow: hidden;
`;
const Title = styled.h1<StickyDivProps>`
  text-align: center;
  position: ${({ isAtTop }) => (isAtTop ? "fixed" : "static")};
  width: 100%;
  left: ${({ isAtTop }) => (isAtTop ? "50%" : "auto")};
  transform: ${({ isAtTop }) => (isAtTop ? "translate(-50%, -50%)" : "auto")};
  text-align: center;

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

  @media (max-width: 768px) {
    margin-top: ${({ isAtTop }) => (isAtTop ? "0" : "100px")};
    top: ${({ isAtTop }) => (isAtTop ? "100px" : "auto")};
    font-size: 23px;
    
    strong {
      font-weight: 900;
      font-size: 24px;
    }
  }

  @media (min-width: 769px) {
    margin-top: ${({ isAtTop }) => (isAtTop ? "0" : "150px")};
    top: ${({ isAtTop }) => (isAtTop ? "150px" : "auto")};

    strong {
      font-weight: 900;
      font-size: 36px;
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
          top: ${isAtSecondTop ? `${firstBoxTop}px` : '100vh'};
          // top: ${isAtSecondTop ? `${firstBoxTop}px` : '100vh'};
          z-index: 2;
          margin-top: 50px;
        `;
      case 'third':
        return `
          background-color: #1864A6;
          position: ${isAtThirdTop ? 'fixed' : 'absolute'};
          top: ${isAtThirdTop ? `${firstBoxTop}px` : '200vh'};
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

  const { isLoading, data } = useQuery<IBestCourse[]>({
    queryKey: ['bestCC'],
    queryFn: () => fetchBestCC()
  });

  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtSecondTop, setIsAtSecondTop] = useState(false);
  const [isAtThirdTop, setIsAtThirdTop] = useState(false);
  const [isShowSection, setIsShowSection] = useState(false);

  const [firstBoxTop, setFirstBoxTop] = useState('');

  const showUserSecton = useRecoilValue(isShowUserSecton);
  
  const scrollEvent = ()=> {
    const viewportHeight = window.innerHeight;
    const vhValue = Math.ceil(viewportHeight * 3 * 0.1);

    if (rankWrapRef.current && firstBoxRef.current) {
      const rect = rankWrapRef.current.getBoundingClientRect();
      const shouldBeFixed = rect.top <= vhValue;
      const isShowSection = rect.top <= 0;

      if(isShowSection) {
        setIsShowSection(true);
      }else {
        setIsShowSection(false);
        setIsAtTop(false);
        setFirstBoxTop('0');
        return;
      }

      if(!isShowSection) return;

      if (shouldBeFixed) {
        setIsAtTop(true);
        setFirstBoxTop(vhValue.toString());
      } else {
        setIsAtTop(false);
        setFirstBoxTop('0');
      }
    }

    if (rankWrapRef.current && secondBoxRef.current) {
      const rect = rankWrapRef.current.getBoundingClientRect();
      const shouldBeFixed = rect.top <= -viewportHeight + vhValue;

      if (shouldBeFixed) {
        setIsAtSecondTop(true);
      } else {
        setIsAtSecondTop(false);
      }
    }

    if (rankWrapRef.current && thirdBoxRef.current) {
      const rect = rankWrapRef.current.getBoundingClientRect();
      const shouldBeFixed = rect.top <= (-viewportHeight * 2) + vhValue;

      if (shouldBeFixed) {
        setIsAtThirdTop(true);
      } else {
        setIsAtThirdTop(false);
        return;
      }

      // if(showUserSecton) {
      //   setIsAtTop(false);
      //   setIsAtSecondTop(false);
      //   setIsAtThirdTop(false);
      //   setFirstBoxTop(((-viewportHeight * 2) + vhValue).toString());
      // }
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = (e: Event) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollEvent();
          ticking = false;
        });
    
        ticking = true;
      }
    };

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsAtTop, setIsAtSecondTop, setIsAtThirdTop, firstBoxTop, isShowSection, showUserSecton]);

  return (
    <Wrap ref={rankWrapRef}>
      <Title isAtTop={isAtTop}>
        올해 <strong><em></em>TOP 랭킹</strong>들을 모아봤어요 !
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
        />
      </Content>
    </Wrap>
  );
}

export default Golfzon;
