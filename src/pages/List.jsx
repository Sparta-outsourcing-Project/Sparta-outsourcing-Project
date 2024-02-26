import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CardList from '../components/list/CardList';
import styled from 'styled-components';

export default function List() {
  return (
    <Wrap>
      <Header />
      <CardList />
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
