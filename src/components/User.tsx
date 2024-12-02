import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isShowUserSecton } from '../variable/atom';

const Wrap = styled(Frame)`
  height: 780px;
  background-color: #77CDFF;
`;

function TeeShot() {
  const userWrapRef = useRef<HTMLDivElement>(null);
  const setIsShowSection = useSetRecoilState(isShowUserSecton);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Top of rankWrapRef is now visible!');
          setIsShowSection(true);
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
    <Wrap ref={userWrapRef}></Wrap>
  );
}

export default TeeShot;
