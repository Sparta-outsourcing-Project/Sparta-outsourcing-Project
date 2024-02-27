import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/utrend_logo.png';
import { useEffect, useState } from 'react';
import Login from '../AuthModal/Login';
import SignUp from '../AuthModal/SignUp';
import { auth } from '../../api/config';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 모달
  const onLoginClickHandler = () => {
    setIsLoginOpen((prev) => !prev);
  };

  // 회원가입 모달
  const onSignUpClickHandler = () => {
    setIsSignUpOpen((prev) => !prev);
  };

  // 로그아웃 클릭
  const onLogoutHandler = () => {
    alert('로그아웃되었습니다.');
    sessionStorage.clear();
    auth.signOut();
    setIsLogin(false);
  };

  // // 렌더링시 sessionStorage 확인
  useEffect(() => {
    sessionStorage.getItem('userId') && setIsLogin(true);
  }, [isLogin]);

  return (
    <HeaderWrap>
      <Logo>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </Logo>
      <Auth>
        {isLogin ? (
          <>
            <p onClick={onLogoutHandler}>로그아웃</p>
          </>
        ) : (
          <>
            <p onClick={onLoginClickHandler}>로그인</p>
            <p onClick={onSignUpClickHandler}>회원가입</p>
          </>
        )}
      </Auth>
      {/* 로그인, 회원가입 모달창 */}
      <Login
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignUpOpen={setIsSignUpOpen}
        setIsLogin={setIsLogin}
      />
      <SignUp isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} setIsLoginOpen={setIsLoginOpen} />
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
      font-weight: bold;
    }
  }
`;
