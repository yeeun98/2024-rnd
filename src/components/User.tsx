import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { Frame } from '../GlobalStyle';
import { isShowUserSecton } from '../variable/atom';
import { IYearRound, UserInfo } from '../type';
import { fetchUserInfo, fetchUserRound } from '../api';

import ApexChart from "react-apexcharts";

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
  width: 100%;
  height: 100%;
  border : 3px dashed #000000;
  border-radius: 20px;
`;
//#endregion

type ShotType = keyof IYearRound['shotLog'];

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
              <Card>
                {
                  // yearRoundData?.
                }
              </Card>
            </SlideItem>
            <SlideItem>
              <Card>2 카드</Card>
            </SlideItem>
            <SlideItem>
              <Card>
                <ApexChart 
                  series={[
                    {
                      name:'shot',
                      data: yearRoundData?.shotLog 
                        ? (Object.keys(yearRoundData.shotLog) as ShotType[]).map(
                            (key) => yearRoundData.shotLog[key] ?? 0
                          )
                        : [], // 데이터가 없으면 빈 배열 반환
                    },
                  ]}
                  options={{
                    chart: {
                      type: 'donut',
                    },
                    responsive: [{
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 200
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }]
                  }}
                  type="donut"
                />
              </Card>
            </SlideItem>
          </Slider>
        </SliderWrapper>
      </ContentBox>
    </Wrap>
  );
}

export default TeeShot;

