import React from 'react';
import styled from 'styled-components';

export default function Loading() {
  return (
    <LodingBox>
      <img src="/public/img/loading.png" alt="loading.." />
    </LodingBox>
  );
}

const LodingBox = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
