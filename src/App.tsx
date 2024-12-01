import styled from 'styled-components';
import Golfzon from './components/Golfzon';
import TopRanking from './components/TopRanking';
import { GlobalStyle } from './GlobalStyle';
import User from './components/User';
import TopSection from './components/TopSection';
import TeeShot from './components/TeeShot';

const Wrap = styled.div`
  width: 100%;
  height: auto;
`;

function App() {
  return (
    <Wrap>
      <GlobalStyle />

      <TopSection />
      <Golfzon />
      <TopRanking />
      <User />
      <TeeShot />
    </Wrap>
  );
}

export default App;
