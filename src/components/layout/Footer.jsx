import styled from 'styled-components';
import logo from '../../assets/utrend_logo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <FooterWrap>
      <FooterWrapInner>
        <FooterTop>
          <FooterLogo>
            <Link to="/">
              <img src={logo} alt="Dtrand-logo" />
            </Link>
          </FooterLogo>
          <div>
            <p>
              Dtrand Inc.
              <br />
              123 Gangnam-daero, Gangnam-gu
              <br />
              Seoul, South Korea
              <br />
              Phone: +82 (02) 123-4567
            </p>
          </div>
          <p>123</p>
        </FooterTop>
        <FooterCopyright>© 2024 Dtrand. All rights reserved.</FooterCopyright>
      </FooterWrapInner>
    </FooterWrap>
  );
}

export const FooterWrap = styled.footer`
  width: 100%;
  /* height: 60px; */
  padding: 1rem 0;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
`;
export const FooterWrapInner = styled.div`
  width: 1280px;
  line-height: 1.2rem;
`;
export const FooterTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  & div {
    width: 100%;
  }
`;
export const FooterLogo = styled.h2`
  width: 150px;
  height: 80px;
  margin-right: 2rem;
  margin-bottom: 0.5rem;
  position: relative;
  & > a > img {
    width: 100%;
    filter: grayscale(100%);
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;
export const FooterCopyright = styled.p`
  border-top: 1px solid #ddd;
  padding-top: 6px;
`;
