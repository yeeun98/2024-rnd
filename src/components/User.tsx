import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isShowUserSecton } from '../variable/atom';
import { useQuery } from '@tanstack/react-query';
import { IYearRound } from '../type';
import { fetchUserRound } from '../api';

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
    position: relative;
    z-index: 1;

    strong {
      position: relative;
      z-index: 2;

      em {
        position: absolute;
        z-index: -1;
        top: 15px;
        height: 17px;
        background-color: #B9FFCE;
        width: 100%;
      }
    }
  }
`;

const ContentBox = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  div {
    height: 100%;
    width: 80%;
    margin: auto;
    background-color: #ffffff;
    border-radius: 20px;
  }
`;

const Button = styled.button<{position: 'left' | 'right'}>`
  position: absolute;
  top: 50%;
  left: ${({ position }) => (position === 'left' ? '0' : 'auto')};
  right: ${({ position }) => (position === 'right' ? '0' : 'auto')};
  width: 50px;
  height: 50px;
  background: ${({ position }) => `url(/image/user/${position}-btn.png) no-repeat center center`};
  background-size: contain;
  border: none;
  cursor: pointer;
  padding: 0;
`;

function TeeShot() {
  const { data } = useQuery<IYearRound[]>({
    queryKey: ['yearRound'],
    queryFn: () => fetchUserRound()
  });

  const userWrapRef = useRef<HTMLDivElement>(null);
  const setIsShowSection = useSetRecoilState(isShowUserSecton);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsShowSection(true);
        }else {
          setIsShowSection(false);
        }
      },
      {
        root: null, // 뷰포트 기준
        threshold: 0, // 상단이 살짝이라도 보이는 순간 감지
      }
    );

    if (userWrapRef.current) {
      observer.observe(userWrapRef.current);
    }

    return () => {
      if (userWrapRef.current) {
        observer.unobserve(userWrapRef.current);
      }
    };
  }, []);
  
  return (
    <Wrap ref={userWrapRef}>
      <h1>
        올해 <strong><em></em>[ask]예은동</strong>님은요 !
      </h1>

      <ContentBox>
        <Button position={'left'}>d</Button>
        <Button position={'right'}>a</Button>
        <div></div>
      </ContentBox>
    </Wrap>
  );
}

export default TeeShot;
