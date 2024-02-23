import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import styled from 'styled-components';

export default function Home() {
  return (
    <Wrap>
      <Header />
      <main>main</main>
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
