import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return <FooterWrap>FOOTER</FooterWrap>;
}

export const FooterWrap = styled.footer`
  width: 100%;
  height: 60px;
  background-color: #eee;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
