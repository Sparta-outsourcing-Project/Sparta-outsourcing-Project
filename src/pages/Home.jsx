import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Main from '../components/main/Main';
import styled from 'styled-components';

export default function Home() {
  return (
    <Wrap>
      <Header />
      <Main />
      <Footer />
    </Wrap>
  );
}

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
