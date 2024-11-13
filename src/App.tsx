import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Golfzon from './Golfzon';

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
export const Common = styled.div`
  width: 100%;
  max-width: 580px;
  margin: auto;
`;
const MainImg = styled(Common)`
  position: relative;
  height: 468px;
  /* background: linear-gradient(#C8E9FE 10%, #fff, #fff); */
  background: url(/images/title.png) no-repeat center center;
  background-size: 100% 100%;
  /* background-size: contain; */
  /* background-size: 100% 100%,375px,1250px 567px;
  background: linear-gradient(0deg, #07043a 0, transparent 30px, transparent), url(https://ssl.pstatic.net/static/m/comic/im/title_visual.png) no-repeat top, url(https://ssl.pstatic.net/static/m/comic/im/title_bg.png) no-repeat top; */
`;
const leftSideAni = keyframes`
  0% {top: 10px;}
	100% {top: 15px;}
`;
const TitleDecoration = styled.div`
  right:50px;
  animation: ${leftSideAni} 0.7s linear 0s infinite alternate;
  width: 30px;
  height: 30px;
  position: absolute;
  background-color: red;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  /* background: linear-gradient(90deg, #07043a, rgba(7, 4, 58, 0) 452px, transparent 453px, transparent 828px, rgba(7, 4, 58, 0) 829px, #07043a) no-repeat bottom, linear-gradient(180deg, rgba(107, 29, 203, 0), rgba(27, 14, 119, .5) 50%, #020109) no-repeat bottom;; */
  /* background: linear-gradient(to bottom, #59B7FB, #C8E9FE 300px, #ffffff 300px); */
`;
//#endregion

function App() {
  return (
    <Wrap>
      <GlobalStyle />
      <div style={{ height: '468px', background: 'linear-gradient(#C8E9FE 10%, #fff, #fff)'}}>
        <MainImg>
          {/* <img src="/images/title.png"/> */}
          <TitleDecoration>
            decoration
          </TitleDecoration>
        </MainImg>
      </div>
      <Golfzon />
      <div style={{height:'300vh'}}>
        another section
      </div>
    </Wrap>
  );
}

export default App;
