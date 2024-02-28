import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/utrend_logo.png';
import { useEffect, useState } from 'react';
import Login from '../AuthModal/Login';
import SignUp from '../AuthModal/SignUp';
import { auth } from '../../api/config';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/modules/loginSlice';
import { IoPersonAddSharp } from 'react-icons/io5';

export default function Header() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // login상태 RTK에서 가져오기
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  // 렌더링시 sessionStorage로 로그인상태 확인
  useEffect(() => {
    sessionStorage.getItem('userId') && dispatch(login(true));
  }, [dispatch]);

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
    dispatch(login(false));

    navigate('/');
  };

  const onMypageClickLink = () => {
    navigate(`/mypage`);
  };

  return (
    <HeaderWrap>
      <HeaderWrapInner>
        <Logo>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </Logo>
        <Auth>
          {loginState ? (
            <>
              <p onClick={onMypageClickLink}>마이페이지</p>
              <p onClick={onLogoutHandler}>로그아웃</p>
            </>
          ) : (
            <>
              <p onClick={onLoginClickHandler}>로그인</p>
              <p onClick={onSignUpClickHandler}>
                <IoPersonAddSharp />
              </p>
            </>
          )}
        </Auth>
        {/* 로그인, 회원가입 모달창 */}
        <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen} />
        <SignUp isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} setIsLoginOpen={setIsLoginOpen} />
      </HeaderWrapInner>
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

export const HeaderWrapInner = styled.header`
  width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
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
