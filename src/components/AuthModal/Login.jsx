import * as St from './styles/Login.style';
import logo from '../../assets/utrend_logo.png';
import { useState } from 'react';

const Login = ({ isLoginOpen, setIsLoginOpen, isSignUpOpen, setIsSignUpOpen }) => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  // 닫기 버튼 클릭
  const onCloseButtonHandler = () => {
    isLoginOpen((prev) => !prev);
  };

  // '회원가입' 클릭
  const onSignUpHandler = () => {
    setIsLoginOpen((prev) => !prev);
    setIsSignUpOpen((prev) => !prev);
  };

  // 로그인 클릭 - 로그인 로직 추가 예정
  const onLoginHandler = (event) => {
    event.preventDefault();
    setIsLoginOpen((prev) => !prev);
  };

  // 아이디, 비밀번호 입력값
  const onUserId = (e) => {
    setUserId(e.target.value);
  };

  const onUserPw = (e) => {
    setUserPw(e.target.value);
  };

  return (
    <>
      {isLoginOpen && (
        <St.Background $isLoginOpen={isLoginOpen}>
          <St.Container>
            <St.LoginWrapper>
              <button onClick={onCloseButtonHandler}>X</button>
              <img src={logo} alt="" />
              <St.InputBtnWrapper>
                <p>로그인</p>
                <St.InputContainer>
                  <input placeholder="이메일 (utrend@gmail.com)" value={userId} onChange={onUserId} />
                </St.InputContainer>
                <St.InputContainer>
                  <input placeholder="비밀번호 (6글자 이상)" type="password" value={userPw} onChange={onUserPw} />
                </St.InputContainer>
                <button onClick={onLoginHandler}>로그인</button>
              </St.InputBtnWrapper>

              <St.CheckSignUp>
                <span>아직 회원이 아니신가요? </span>
                <p onClick={onSignUpHandler}>회원가입</p>
              </St.CheckSignUp>
            </St.LoginWrapper>
          </St.Container>
        </St.Background>
      )}
    </>
  );
};

export default Login;
