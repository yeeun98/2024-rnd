import styled, { keyframes } from 'styled-components';

//#region styled component
const Wrap = styled.div`
  position: relative;
  background: url(/images/snow.png) no-repeat top, linear-gradient(#a3dbfd, #b5e4ff 10%,#b5e3fd 10%, #fff, #fff, #fff, #fff,  #fff, #fff, #b5e3fd, #b5e4ff);
  background-size: cover;
  padding: 30px 35px 0 35px;
  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    height: 900px;
  }

  @media (min-width: 769px) {
    height: 1200px;
  }
`;
const MainImg = styled.div`
  width: 100%;
  max-width: 555px;
  aspect-ratio: 16 / 9;
  background: url(/images/2024.png) no-repeat top;
  background-size: contain;
  position: relative;
  margin: auto;
  overflow-x: hidden;
`;
const rightSideAni = keyframes`
  0% {top: 20px;}
	100% {top: 25px;}
`;
const leftSideAni = keyframes`
  0% {bottom: 28px;}
	100% {bottom: 23px;}
`;
const TitleDecoration = styled.div`
  width: 90px;
  height: 90px;
  position: absolute;
  background: url(/images/snow-flake.png) no-repeat top;
  background-size: cover;

  @media (max-width: 768px) {
    width: 63px;
    height: 63px;
  }
`;
const RightDecoration = styled(TitleDecoration)`
  right: 25px;
  animation: ${rightSideAni} 0.7s linear 0s infinite alternate;
`;
const LeftDecoration = styled(TitleDecoration)`
  left: 10px;
  animation: ${leftSideAni} 0.7s linear 0s infinite alternate;
`;
const Title = styled.div`
  background: url(/images/title.png) no-repeat top;
  background-size: contain;
  position: relative;
  z-index: 100;
  max-width: 325px;
  aspect-ratio: 16 / 4;
  margin: -35px auto 0 auto;
  
  @media (max-width: 768px) {
    height: 55px;
    margin: -25px auto 0 auto;
  }
`;
const Text = styled.p`
  text-align: center;
  font-family: 'GmarketSansMedium', sans-serif;
  color: #03045E;
  
  @media (max-width: 768px) {
    margin-top: 20%;
    font-size: 15px;
  }
  
  @media (min-width: 769px) {
    margin-top: 10%;
    font-size: 20px;
  }
  
  .spaced-br {
    margin-bottom: 20px; /* 줄바꿈 아래 간격 추가 */
    display: block; /* block으로 설정해야 margin이 적용됨 */
  }
`;
const BottomImg = styled.div`
  position: absolute;
  bottom: 80px;
  background: url(/images/snow-ball.png) no-repeat center center;
  background-size: contain;
  width: 100%;
  max-width: fit-content;
  aspect-ratio: 16 / 9;
  margin: auto;

  /* 모바일 높이 설정 */
  @media (max-width: 768px) {
    height: 30vh;
  }

  /* 데스크톱 높이 설정 */
  @media (min-width: 769px) {
    height: 360px; 
  }
`;
//#endregion

function TopSection() {
  return (
    <Wrap>
      <MainImg>
        <RightDecoration />
        <LeftDecoration />
      </MainImg>

      <Title />

      <Text>
        이번 한해는 당신에게 어떤 한해였나요?<span className="spaced-br"></span>
        소중한 순간들로 채워진<span className="spaced-br"></span>
        당신과의 375일에 감사하며,<span className="spaced-br"></span>
        2024, 당신과의 순간을 돌아보겠습니다.
      </Text>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <BottomImg></BottomImg>
      </div>
    </Wrap>
  );
}

export default TopSection;
