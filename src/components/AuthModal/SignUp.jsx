import * as St from './styles/Login.style';
import { Background, InputBtnWrapper } from './styles/SignUp.style';
import logo from '../../assets/utrend_logo.png';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api/config';

const SignUp = ({ isSignUpOpen, setIsSignUpOpen, isLoginOpen, setIsLoginOpen }) => {
  const [userId, setUserId] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPw, setUserPw] = useState('');

  // 아이디, 닉네임, 비밀번호 입력값
  const onUserId = (e) => {
    setUserId(e.target.value);
  };

  const onUserNickname = (e) => {
    setUserNickname(e.target.value);
  };

  const onUserPw = (e) => {
    setUserPw(e.target.value);
  };

  // 닫기 버튼 클릭
  const onCloseButtonHandler = () => {
    setIsSignUpOpen((prev) => !prev);
    setUserId('');
    setUserNickname('');
    setUserPw('');
  };

  // 회원가입 클릭
  const onSignUpHandler = () => {
    createUserWithEmailAndPassword(auth, userId, userPw)
      .then((userCredential) => {
        // 회원가입 성공시
        console.log(userCredential);
        console.log('회원가입이 완료되었습니다 🎉');
        setIsSignUpOpen((prev) => !prev);
      })
      .catch((error) => {
        // 회원가입 실패시
        console.error(error);
        alert('입력하신 값을 확인해주세요.');
      });
  };

  // '로그인하기' 클릭
  const onLoginHandler = () => {
    setIsSignUpOpen((prev) => !prev);
    setIsLoginOpen((prev) => !prev);
    setUserId('');
    setUserNickname('');
    setUserPw('');
  };

  return (
    <>
      {isSignUpOpen && (
        <Background $isSignUpOpen={isSignUpOpen}>
          <St.Container>
            <St.LoginWrapper>
              <button onClick={onCloseButtonHandler}>X</button>
              <img src={logo} alt="" />
              <InputBtnWrapper>
                <p>회원가입</p>
                <St.InputContainer>
                  <input placeholder="이메일 (utrend@gmail.com)" value={userId} onChange={onUserId} />
                </St.InputContainer>
                <St.InputContainer>
                  <input placeholder="닉네임" value={userNickname} onChange={onUserNickname} />
                </St.InputContainer>
                <St.InputContainer>
                  <input placeholder="비밀번호 (6글자 이상)" type="password" value={userPw} onChange={onUserPw} />
                </St.InputContainer>
                <button onClick={onSignUpHandler}>회원가입</button>
              </InputBtnWrapper>

              <St.CheckSignUp>
                <span>이미 회원이신가요? </span>
                <p onClick={onLoginHandler}>로그인하기</p>
              </St.CheckSignUp>
            </St.LoginWrapper>
          </St.Container>
        </Background>
      )}
    </>
  );
};

export default SignUp;
