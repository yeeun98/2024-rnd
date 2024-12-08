import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isShowUserSecton } from '../variable/atom';

const Wrap = styled(Frame)`
  height: 100vh;
  background-color: #77CDFF;

  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 768px) {
    padding: 35px 20px;
  }

  @media (min-width: 769px) {
    padding: 55px 45px;
  }

  h1 {
    strong {
      position: relative;

      em {
        position: absolute;
        top: 15px;
        height: 17px;
        background-color: #B9FFCE;
        width: fit-content;
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
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 스타일 */
  padding: 0; /* 기본 여백 제거 */
`;

function TeeShot() {
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
        올해 <strong>[ask]예은동<em></em></strong>님은요 !
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
