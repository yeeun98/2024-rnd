import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { Frame } from '../GlobalStyle';
import { isShowUserSecton } from '../variable/atom';
import { IYearRound, UserInfo } from '../type';
import { fetchUserInfo, fetchUserRound } from '../api';

import ApexChart from "react-apexcharts";
import Single from './user/Single';

//#region styled-component
const Wrap = styled(Frame)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 100vh;
  background-color: #77CDFF;

  @media (max-width: 768px) {
    padding: 35px 20px;
  }

  @media (min-width: 769px) {
    padding: 55px 45px;
  }

  h1 {
    @media (max-width: 768px) {
      font-size: 22px;
    }

    @media (min-width: 769px) {
      font-size: 35px;
    }

    position: relative;
    z-index: 1;

    strong {
      position: relative;
      z-index: 2;

      em {
        position: absolute;
        z-index: -1;
        height: 17px;
        background-color: #B9FFCE;
        width: 102%;
        left: -1%;

        @media (max-width: 768px) {
          top: 15px;
        }

        @media (min-width: 769px) {
          top: 25px;
        }
      }
    }
  }
`;

const ContentBox = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  width: 8%;
  height: 8%;
  max-width: 50px;
  max-height: 50px;
  border: none;
  cursor: pointer;
  padding: 0;
`;
const LeftBtn = styled(Button)`
  left: 0;
  background: url(/images/user/left-btn.png) no-repeat center center;
  background-size: contain;
`;
const RightBtn = styled(Button)`
  right: 0;
  background: url(/images/user/right-btn.png) no-repeat center center;
  background-size: contain;
`;

const SliderWrapper = styled.div`
  height: 100%;
  width: 80%;
  margin: auto;
  background-color: #ffffff;
  border-radius: 20px;
  overflow-x: hidden;
`;
const Slider = styled.ul<{childrenLength : number}>`
  display: flex;
  width: ${({ childrenLength }) => `${childrenLength * 100}%`};
  height: 100%;
  transition: transform 0.3s ease-in-out;
`;
const SlideItem = styled.li`
  width: 33.3%;
  height: 100%;
  flex-shrink: 0;
  margin: auto;
  box-sizing: border-box;
  padding: 20px 20px;
`;
const Card = styled.div`
  display: grid;
  grid-template-rows: 2fr 8fr;
  width: 100%;
  height: 100%;
  border : 3px dashed #000000;
  border-radius: 20px;

  title {
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      font-family: 'GmarketSansBold', sans-serif;
      line-height: 50px;
      text-align: center;

      @media (max-width: 768px) {
        font-size: 20px;
      }

      @media (min-width: 769px) {
        font-size: 35px;
      }

      em {
        color: #00a6fb;
      }
    }
  }
`;
const PlayerCard = styled(Card)`
  section {
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    height: 100%;
    display: grid;
    grid-template-rows: 1fr repeat(2, 2fr);
    gap: 15px;

    img {
      width: 60%;
      height: 60%;
    }

    p {
      font-family: 'SUITE', sans-serif;
      font-size: 37px;
      line-height: 55px;
      text-decoration: underline;
      text-underline-offset: 8px;
      text-decoration-color: #6b6a6a;

      @media (min-width: 769px) {
        margin-top: 30px;
      }
    }
  }
`;
const ChartCard = styled(Card)`
  section {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 30px;
  }

  .apexcharts-canvas {
    max-width: 100%;
    height: auto;
  }
`;
//#endregion

type ShotType = keyof IYearRound['shotLog'];
type SoftwareType = keyof IYearRound['softwareLog'];

function TeeShot() {
  const userWrapRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLUListElement>(null);
  const setIsShowSection = useSetRecoilState(isShowUserSecton);

  const slideCount = 3;
  const [currentSlide, setCurrentSlide] = useState(0); // useState로 상태 관리

  const { data: userInfoData } = useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfo()
  });
  const { data: yearRoundData } = useQuery<IYearRound>({
    queryKey: ['yearRound'],
    queryFn: () => fetchUserRound()
  });

  const handleSlide = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    setCurrentSlide((prev) => {
      let newSlide = prev;

      if (direction === 'left') {
        newSlide = Math.max(prev - 1, 0);
      } else if (direction === 'right') {
        newSlide = Math.min(prev + 1, slideCount - 1);
      }

      if(sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${33.3 * newSlide}%)`;
      }

      return newSlide;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsShowSection(entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    if (userWrapRef.current) {
      observer.observe(userWrapRef.current);
    }

    return () => {
      if (userWrapRef.current) observer.unobserve(userWrapRef.current);
    };
  }, []);

  return (
    <Wrap ref={userWrapRef}>
      <h1>
        올해 <strong><em></em>{userInfoData?.userNickname}</strong> 님은요 !
      </h1>

      <ContentBox>
        {currentSlide !== 0 && <LeftBtn onClick={() => handleSlide('left')} />}
        {currentSlide !== slideCount - 1 && <RightBtn onClick={() => handleSlide('right')} />}

        <SliderWrapper>
          <Slider ref={sliderRef} childrenLength={slideCount}>
            <SlideItem>
              <PlayerCard>
                

                  {
                    yearRoundData?.userPlayType?.toLocaleLowerCase() === 'single' ? <Single /> : ''
                  }
                
              </PlayerCard>
            </SlideItem>
            <SlideItem>
              <ChartCard>
                <title>
                  <h2><em>구질</em>, 나만의 스윙 패턴은?</h2>
                </title>
                <section>
                <ApexChart 
  series={[
    {
      name: 'Shot Type',
      data: yearRoundData?.softwareLog 
        ? (Object.keys(yearRoundData.softwareLog) as SoftwareType[]).map(
            (key) => yearRoundData.softwareLog[key] ?? 0
          )
        : [],
    },
  ]}
  options={{
    chart: {
      type: 'bar',
      // width: '100%',
      // height: '400px', // 웹에서 기본 높이 크게 설정
      toolbar: {
        show: true, // 기본적으로 도구 막대 표시
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
        barHeight: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: yearRoundData?.softwareLog 
        ? (Object.keys(yearRoundData.softwareLog) as SoftwareType[]).map(
            (key) => key ?? ''
          )
        : [],
      labels: {
        style: {
          fontSize: '14px', // 웹에서는 폰트 크기 증가
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px', // 웹에서는 폰트 크기 증가
        },
      },
    },
    grid: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 480, // 모바일 환경
    //     options: {
    //       chart: {
    //         width: '80%',
    //         height: 300, // 모바일 높이 축소
    //         toolbar: {
    //           show: false, // 모바일에서는 도구 막대 숨김
    //         },
    //       },
    //       plotOptions: {
    //         bar: {
    //           // barHeight: '70%',
    //         },
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //             fontSize: '10px',
    //           },
    //         },
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //             fontSize: '10px',
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1024, // 웹 환경 (태블릿 및 데스크톱)
    //     options: {
    //       chart: {
    //         width: '100%',
    //         height: '100%', // 웹 환경에서 높이를 크게 설정
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //             fontSize: '14px', // 웹에서는 폰트 크기 증가
    //           },
    //         },
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //             fontSize: '14px', // 웹에서는 폰트 크기 증가
    //           },
    //         },
    //       },
    //     },
    //   },
    // ],
  }}
  type="bar"
/>
                </section>
              </ChartCard>
            </SlideItem>
            <SlideItem>
              <ChartCard>
                <title>
                  <h2><em>구질</em>, 나만의 스윙 패턴은?</h2>
                </title>
                <section>
                  <ApexChart
                    key={1}
                    series={
                      yearRoundData?.shotLog 
                      ? (Object.keys(yearRoundData.shotLog) as ShotType[]).map(
                          (key) => yearRoundData.shotLog[key] ?? 0
                        )
                      : []}
                    options={{
                      chart: {
                        type: 'donut',
                        // width: '10%', // 최대 크기 설정
                      },
                      labels: yearRoundData?.shotLog ? Object.keys(yearRoundData.shotLog) : [],
                      responsive: [
                        {
                          breakpoint: 480,
                          options: {
                            legend: {
                              position: 'bottom',
                            },
                          },
                        },
                      ],
                    }}
                    type="donut"
                  />
                </section>
              </ChartCard>
            </SlideItem>
          </Slider>
        </SliderWrapper>
      </ContentBox>
    </Wrap>
  );
}

export default TeeShot;

