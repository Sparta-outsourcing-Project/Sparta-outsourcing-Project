import styled from 'styled-components';
import Footer from '../layout/Footer';
import Header from '../layout/Header';

export default function CardList() {
  return (
    <ListContent>
      <Header />
      <ListHeaer>
        <p>순위</p>
        <p>채널 명</p>
        <p>구독자 수</p>
        <p>광고영상 평균 조회수</p>
      </ListHeaer>

      <Footer />
    </ListContent>
  );
}

const ListContent = styled.div`
  height: 100%;
  margin-left: 10%;
  margin-right: 10%;
`;

const ListHeaer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10%;
  border-bottom: 1px solid black;
  padding-bottom: 1%;
  padding-left: 1%;
  padding-right: 1%;
`;
