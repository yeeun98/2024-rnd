import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';
import { useRecoilValue } from 'recoil';
import { isShowUserSecton } from '../variable/atom';
import { useQuery } from '@tanstack/react-query';
import { fetchBestCC, fetchHIOTop3, fetchRanking } from '../api';
import { IBestCourse, IHIOTop3, IUserRank } from '../type';

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
        font-family: 'GmarketSansBold', sans-serif;
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
      background: url(/images/ranking/highlight.png) no-repeat;
      background-size: contain;
      height: 22px;
      aspect-ratio: 1.5 / 1;
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
  aspect-ratio: 1 / 1.1;
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
`;

const CardInner = styled.div<{order: 'first' | 'second' | 'third'}>`
  width: 100%;
  height: 100%;

  ${({ order }) => {
    switch (order) {
      case 'first':
        return `
          background: url(/images/ranking/star-confetti.png) no-repeat top;
        `;
      case 'second':
        return `
          background: url(/images/ranking/hio.jpg) no-repeat bottom;
        `;
      case 'third':
        return `
          background: url(/images/ranking/hio.jpg) no-repeat bottom;
        `;
      
      default:
        return;
    }
  }}
  
  background-size: contain;
  padding: 30px 40px;
  border-radius: 0 0 20px 20px;

  h2 {
    font-family: 'GmarketSansBold', sans-serif;
    text-align: center;

    ${({ order }) => {
    switch (order) {
      case 'first':
      case 'third':
        return `
          color: #ffffff;
        `;
      
      default:
        return;
    }
  }} 
    
    @media (max-width: 768px) {
      font-size: 23px;
      margin-bottom: 15px;
    }
    
    @media (min-width: 769px) {
      margin-top: 10px;
      font-size: 30px;
      margin-bottom: 30px;
    }
  }

  ul {
    li {
      * {
        font-family: 'GmarketSansMedium', sans-serif !important;
      }

      display: grid;
      grid-template-columns: 3fr 7fr;
      grid-template-rows: repeat(3, 1fr);
      padding: 10px 10px 10px 0;
      box-sizing: border-box;
      background-color: #444444;
      border-radius: 5px;
      position: relative;

      &:last-child {
        margin-bottom: 0;
      }

      @media (max-width: 768px) {
        height: 75px;
        margin-bottom: 13px;
      }
      
      @media (min-width: 769px) {
        height: 115px;
        margin-bottom: 20px;
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
        display: flex;
        align-items: center;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (max-width: 768px) {
          font-size: 12px;
        }
        
        @media (min-width: 769px) {
          font-size: 19px;
        }
      }

      em {
        position: absolute;
        top: 0;
        left: 5px;
        
        @media (max-width: 768px) {
          width: 25px;
          height: 25px;
        }
        
        @media (min-width: 769px) {
          width: 33px;
          height: 33px;
        }

        &.first { background: url(/images/ranking/1rd.png) no-repeat; background-size: contain;}
        &.second {background: url(/images/ranking/2rd.png) no-repeat; background-size: contain;}
        &.third {background: url(/images/ranking/3rd.png) no-repeat; background-size: contain;}
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
  const [showThisSection, setShowThisSection] = useState(false);

  const [firstBoxTop, setFirstBoxTop] = useState('');
  const [boxPosition, setBoxPosition] = useState(['8%', '100vh', '200vh']);
  const [titlePosition, setTitlePosition] = useState(0);

  const showUserSecton = useRecoilValue(isShowUserSecton);
  const prevShowUserSection = useRef<boolean | null>(null);

  const { data: rankingData } = useQuery<IUserRank[]>({
    queryKey: ['rankingTop3'],
    queryFn: () => fetchRanking()
  });
  const { data } = useQuery<IBestCourse[]>({
    queryKey: ['bestCC'],
    queryFn: () => fetchBestCC()
  });
  const { data: HIOTop3Data } = useQuery<IHIOTop3[]>({
    queryKey: ['hioTop3'],
    queryFn: () => fetchHIOTop3()
  });
  
  const scrollEvent = ()=> {
    if(showUserSecton || !showThisSection) return;

    const viewportHeight = window.innerHeight;
    const vhValue = Math.ceil(viewportHeight * 3 * 0.08);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          setShowThisSection(true);
        } else {
          setShowThisSection(false);
        }
      },
      { root: null, threshold: 0 }
    );

    if (rankWrapRef.current) {
      observer.observe(rankWrapRef.current);
    }
  }, [showThisSection]);

  useEffect(() => {
    // 스크롤 이벤트 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsAtTop, setIsAtSecondTop, setIsAtThirdTop, firstBoxTop, isShowSection, showUserSecton, showThisSection]);

  useEffect(() => {
    if (!showThisSection) return;

    if(prevShowUserSection.current !== showUserSecton) {
      if (prevShowUserSection.current === false && showUserSecton) {
        if (rankWrapRef.current && titleRef.current) {
          const rect = rankWrapRef.current.getBoundingClientRect();
          const titleTopPosition = window.innerWidth <= 768 ? 100 : 150;
          const titleHeight = titleRef.current.getBoundingClientRect().height;
          const boxPosition = `${-rect.top + titleTopPosition + titleHeight + (window.innerHeight * 0.08)}px`;

          setTitlePosition(-rect.top);
          setBoxPosition([boxPosition, boxPosition, boxPosition]);
          setIsAtTop(false);
          setIsAtSecondTop(false);
          setIsAtThirdTop(false);
        }
      }else if (prevShowUserSection.current && !showUserSecton) {
        setTitlePosition(0);
        setBoxPosition(['8%', '100vh', '200vh']);
        setIsAtTop(true);
        setIsAtSecondTop(true);
        setIsAtThirdTop(true);
      }
    }

    prevShowUserSection.current = showUserSecton;
  }, [showUserSecton, showThisSection]);

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
        >
          <CardInner order={'first'}>
            <h2>
              전국 랭킹 TOP 3<br/>명예의 전당
            </h2>

            <ul>
              {
                rankingData?.slice(0,3).map((item, idx) => {
                  return <li key={idx}>
                    <em className={`${idx === 0 ? 'first' : idx === 1 ? 'second' : 'third'}`}></em>
                    <img
                      src={item?.userImage}
                      onError={(e) => {
                        e.currentTarget.src = 'https://i.gzcdn.net/images/v10/common/course_dft.png';
                      }}
                    />
                    <span>{item?.nickname}</span>
                    <span>핸디 : {item?.handy}</span>
                    <span>주이용매장 : {item?.shopName}</span>
                  </li>
                }) ?? ''
              }
            </ul>
          </CardInner>
        </Box>
        <Box
          order="second"
          ref={secondBoxRef}
          isAtSecondTop={isAtSecondTop}
          firstBoxTop={firstBoxTop}
          boxPosition={boxPosition}
        >
          <CardInner order={'second'}>
            <h2>
              올해 인기 CC<br/>BEST TOP 3
            </h2>

            <ul>
              {
                data?.slice(0,3).map((item, idx) => {
                  return <li key={idx}>
                    <em className={`${idx === 0 ? 'first' : idx === 1 ? 'second' : 'third'}`}></em>
                    <img
                      src={item?.emblemImageUrl} 
                      onError={(e) => {
                        e.currentTarget.src = 'https://i.gzcdn.net/images/v10/common/course_dft.png';
                      }}
                    />
                    <span>[ {item.ccName} ]</span>
                    <span>지역 : {item?.address}</span>
                    <span>플레이 횟수 : {(item?.count ?? 0).toLocaleString()}회</span>
                  </li>
                }) ?? ''
              }
            </ul>
          </CardInner>
        </Box>
        <Box
          order="third"
          ref={thirdBoxRef}
          isAtThirdTop={isAtThirdTop}
          firstBoxTop={firstBoxTop}
          boxPosition={boxPosition}
        >
          <CardInner order={'third'}>
            <h2>
              최다 홀인원 CC<br/>BEST TOP 3
            </h2>

            <ul>
              {
                HIOTop3Data?.slice(0,3).map((item, idx) => {
                  return <li key={idx}>
                    <em className={`${idx === 0 ? 'first' : idx === 1 ? 'second' : 'third'}`}></em>
                    <img
                      src={item?.emblemImageUrl} 
                      onError={(e) => {
                        e.currentTarget.src = 'https://i.gzcdn.net/images/v10/common/course_dft.png';
                      }}
                    />
                    <span>[ {item.ccName} ]</span>
                    <span>지역 : {item?.address}</span>
                    <span>홀인원 횟수 : {(item?.holeInOneCount ?? 0).toLocaleString()}회</span>
                  </li>
                }) ?? ''
              }
            </ul>
          </CardInner>
        </Box>
      </Content>  
    </Wrap>
  );
}

export default Golfzon;
