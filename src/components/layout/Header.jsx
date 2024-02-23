import React from 'react';
import styled from 'styled-components';

export default function Header() {
  return (
    <header>
      <a href="#">LOGO</a>
    </header>
  );
}

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
