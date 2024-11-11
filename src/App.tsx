import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Golfzon from './Golfzon';

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
  max-width: 430px;
  margin: auto;
  background-color: aqua;
`;
const MainImg = styled(Common)`
  height: 500px;
`;
const leftSideAni = keyframes`
  0% {top: 0px; right:50px;}
	100% {top: 15px; right:50px;}
`
const TitleDecoration = styled.div`
  animation: ${leftSideAni} 0.7s linear 0s infinite alternate;
  width: 30px;
  height: 30px;
  position: absolute;
  background-color: red;
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <MainImg>
        React
        <TitleDecoration>
          decoration
        </TitleDecoration>
      </MainImg>
      <Golfzon />
      <div style={{height: '300px'}}></div>
    </div>
  );
}

export default App;
