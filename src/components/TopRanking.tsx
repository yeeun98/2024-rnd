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
  titlePosition: number;
}
interface BoxDivProps {
  isAtTop?: boolean;
  isAtSecondTop?: boolean;
  isAtThirdTop?: boolean;
  firstBoxTop: string;
  boxPosition: string[];
  order: 'first' | 'second' | 'third'
}
//#endregion

//#region style-component
const Wrap = styled(Frame)`
  position: relative;
  min-height: 300vh;
  overflow: hidden;

  @media (max-width: 768px) {
    h1 {
      font-size: 23px;
      
      strong {
        font-family: 'GmarketSansMedium', sans-serif; /* 글로벌 폰트 사용 */
        font-size: 24px;
      }
    }
  }
`;
const Title = styled.h1<StickyDivProps>`
  text-align: center;
  position: ${({ isAtTop }) => (isAtTop ? "fixed" : "absolute")};
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
    top: ${({ titlePosition }) => (`${titlePosition + 100}px`)};
    font-size: 23px;
    
    strong {
      font-weight: 900;
      font-size: 24px;
    }
  }

  @media (min-width: 769px) {
    top: ${({ titlePosition }) => (`${titlePosition + 150}px`)};

    strong {
      font-weight: 900;
      font-size: 36px;
    }
  }
`;
const Content = styled.ul`
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

  ${({ order, isAtTop, isAtSecondTop, isAtThirdTop, firstBoxTop, boxPosition }) => {
    switch (order) {
      case 'first':
        return `
          background-color: #77CDFF;
          position: ${isAtTop ? 'fixed': 'absolute'};
          top: ${isAtTop ? `${firstBoxTop}px` : boxPosition[0]};
          z-index: 1;
        `;
      case 'second':
        return `
          background-color: #B3FDFE;
          position: ${isAtSecondTop ? 'fixed' : 'absolute'};
          top: ${isAtSecondTop ? `${firstBoxTop}px` : boxPosition[1]};
          z-index: 2;
          margin-top: 50px;
        `;
      case 'third':
        return `
          background-color: #A5D3F7;
          position: ${isAtThirdTop ? 'fixed' : 'absolute'};
          top: ${isAtThirdTop ? `${firstBoxTop}px` : boxPosition[2]};
          z-index: 3;
          margin-top: 100px;
        `;
      
      default:
        return;
    }
  }}

  div {
    width: 100%;
    height: 100%;
    background: url(/images/ranking/hio.jpg) no-repeat bottom;
    background-size: contain;
    padding: 30px 40px;
    border-radius: 0 0 20px 20px;

    * {
      font-family: 'GmarketSansBold', sans-serif;
    }

    h2 {
      font-size: 22px;
      text-align: center;
      
      @media (max-width: 768px) {
        margin-bottom: 20px;
      }
      
      @media (min-width: 769px) {
        margin-bottom: 30px;
      }
    }

    ul {
      li {
        display: grid;
        grid-template-columns: 3fr 7fr;
        grid-template-rows: repeat(2, 1fr);
        padding: 10px 10px;
        box-sizing: border-box;
        margin-bottom: 15px;
        background-color: #444444;

        &:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          height: 60px;
        }
        
        @media (min-width: 769px) {
          height: 110px;
        }

        img {
          grid-row: 1 / -1;
          grid-column: 1 / 2;
          width: 100%;
          height: 100%;
          overflow: hidden;
          object-fit: contain;
        }
        span {
          padding-left: 10px;
          color: #ffffff;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;
//#endregion

function Golfzon() {
  const rankWrapRef = useRef<HTMLDivElement>(null);
  const firstBoxRef = useRef<HTMLLIElement>(null);
  const secondBoxRef = useRef<HTMLLIElement>(null);
  const thirdBoxRef = useRef<HTMLLIElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtSecondTop, setIsAtSecondTop] = useState(false);
  const [isAtThirdTop, setIsAtThirdTop] = useState(false);
  const [isShowSection, setIsShowSection] = useState(false);

  const [firstBoxTop, setFirstBoxTop] = useState('');
  const [boxPosition, setBoxPosition] = useState(['10%', '100vh', '200vh']);
  const [titlePosition, setTitlePosition] = useState(0);

  const showUserSecton = useRecoilValue(isShowUserSecton);

  const prevShowUserSection = useRef<boolean | null>(null);

  const { isLoading, data } = useQuery<IBestCourse[]>({
    queryKey: ['bestCC'],
    queryFn: () => fetchBestCC()
  });
  
  const scrollEvent = ()=> {
    if(showUserSecton) return;

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

  console.log(isLoading)
  console.log(data)

  useEffect(() => {
    if(prevShowUserSection.current !== showUserSecton) {
      if (prevShowUserSection.current === false && showUserSecton) {
        if (rankWrapRef.current && titleRef.current) {
          const rect = rankWrapRef.current.getBoundingClientRect();
          const titleTopPosition = window.innerWidth <= 768 ? 100 : 150;
          const titleHeight = titleRef.current.getBoundingClientRect().height;
          const boxPosition = `${-rect.top + titleTopPosition + titleHeight + (window.innerHeight * 0.1)}px`;

          setTitlePosition(-rect.top);
          setBoxPosition([boxPosition, boxPosition, boxPosition]);
          setIsAtTop(false);
          setIsAtSecondTop(false);
          setIsAtThirdTop(false);
        }
      }else if (prevShowUserSection.current && !showUserSecton) {
        setTitlePosition(0);
      }
    }

    prevShowUserSection.current = showUserSecton;
  }, [showUserSecton]);

  return (
    <Wrap ref={rankWrapRef}>
      <Title ref={titleRef} isAtTop={isAtTop} titlePosition={titlePosition}>
        올해 <strong><em></em>TOP 랭킹</strong>들을 모아봤어요 !
      </Title>

      <Content>
        <Box
          order="first"
          ref={firstBoxRef}
          isAtTop={isAtTop}
          firstBoxTop={firstBoxTop}
          boxPosition={boxPosition}
        ></Box>
        <Box
          order="second"
          ref={secondBoxRef}
          isAtSecondTop={isAtSecondTop}
          firstBoxTop={firstBoxTop}
          boxPosition={boxPosition}
        ></Box>
        <Box
          order="third"
          ref={thirdBoxRef}
          isAtThirdTop={isAtThirdTop}
          firstBoxTop={firstBoxTop}
          boxPosition={boxPosition}
        >
          <div>
            <h2>
              <strong>최다 홀인원 CC<br/>BEST TOP 3</strong>
            </h2>

            <ul>
              {
                data?.slice(0,3).map((item, idx) => {
                  return <li key={idx}>
                    <img src="/images/ranking/camera.png" />
                    <span>[ {item.ccName} ]</span>
                    <span>{item.ccName}</span>
                  </li>
                }) ?? ''
              }
            </ul>
          </div>
        </Box>
      </Content>  
    </Wrap>
  );
}

export default Golfzon;
