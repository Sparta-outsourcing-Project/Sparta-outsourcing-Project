import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MyPageSection from '../components/myPage/MyPageSection';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <Wrap>
      <Header />
      <MyPageSection />
      <Footer />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
