import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/utrend_logo.png';
export default function Header() {
  return (
    <HeaderWrap>
      <Logo>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </Logo>
      <Auth>
        <p>로그인</p>
        <p>회원가입</p>
      </Auth>
    </HeaderWrap>
  );
}

export const HeaderWrap = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px #00000011;
`;
export const Logo = styled.h1`
  width: 200px;
  & > a > img {
    width: 100%;
  }
`;

export const Auth = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  right: 0;
  margin-right: 30px;
  & > p {
    color: #febe98;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
