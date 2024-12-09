import styled, { keyframes, css } from "styled-components";
import { useEffect, useRef, useState } from 'react';
import { Frame } from '../GlobalStyle';

const Wrap = styled(Frame)`
  position: relative;
  height: 100vh;
`;

const Intro = styled.div``;
const Content = styled.div`
  background-color: aliceblue;
  width: 100%;
  height: 100%;
`;
const Button = styled.button``;


function TeeShot() {
  const [isExploding, setIsExploding] = useState(false);
  const [isBackVisible, setIsBackVisible] = useState(false);

  const handleButtonClick = () => {
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
      setTimeout(() => {
        setIsBackVisible(true);
      }, 400);
    }, 4000);
  };

  return (
    <Wrap>
      <Content></Content>
      <Button onClick={handleButtonClick}></Button>
    </Wrap>
  );
}

export default TeeShot;
