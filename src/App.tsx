import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Golfzon from './Golfzon';
import GolfzonUser from './GolfzonUser';

//#region styled component
const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro, sans-serif';
  }
  a {
    text-decoration: none;
  }
`;

const TopSection = styled.div`
  height: 860px;
  background: url(/images/snow.png) no-repeat top, linear-gradient(#a3dbfd, #b5e4ff 10%,#b5e3fd 10%, #fff, #fff, #fff, #fff,  #fff, #fff, #b5e3fd, #b5e4ff);
  background-size: cover;
  padding: 30px 35px 0 35px;
`;
const MainImg = styled.div`
  width: 100%;
  max-width: 560px;
  position: relative;
  margin: auto;
  overflow-x: hidden;
`;
const Img = styled.img`
  position: relative;
  width: 100%;
  object-fit: contain;
  margin-top: 20px;
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

  img {
    width: 100%;
  }
`;
const RightDecoration = styled(TitleDecoration)`
  right: 25px;
  animation: ${rightSideAni} 0.7s linear 0s infinite alternate;
`;
const LeftDecoration = styled(TitleDecoration)`
  animation: ${leftSideAni} 0.7s linear 0s infinite alternate;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100vh;
`;
const Title = styled.div`
  background: url(/images/title.png) no-repeat top;
  background-size: contain;
  position: relative;
  z-index: 100;
  min-width: 250px;
  max-width: 500px;
  min-height: 60px;
  max-height: 160px;
  margin-top: -25px;
  margin: -25px auto 0 auto;
`;
//#endregion

function App() {
  return (
    <Wrap>
      <GlobalStyle />
      <TopSection>
        <MainImg>
          <Img src="/images/2024.png"/>
          <RightDecoration>
            <img src="/images/snow-flake.png" />
          </RightDecoration>
          <LeftDecoration>
            <img src="/images/snow-flake.png" />
          </LeftDecoration>
        </MainImg>

        <Title />
      </TopSection>
      <Golfzon />
      <GolfzonUser />
      <div style={{height: '100vh'}}></div>
    </Wrap>
  );
}

export default App;
