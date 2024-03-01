import * as St from './styles/Login.style';
import { Background, InputBtnWrapper } from './styles/SignUp.style';
import logo from '../../assets/utrend_logo.png';
import { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api/config';
import { addDefaultUserInfo } from '../../api/auth';

const SignUp = ({ isSignUpOpen, setIsSignUpOpen, setIsLoginOpen }) => {
  const [userId, setUserId] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPw, setUserPw] = useState('');
  const backgroundRef = useRef('');

  const onBackgroundClick = (e) => {
    e.target === backgroundRef.current && setIsSignUpOpen((prev) => !prev);
  };

  const onUserId = (e) => {
    setUserId(e.target.value);
  };

  const onUserNickname = (e) => {
    setUserNickname(e.target.value);
  };

  const onUserPw = (e) => {
    setUserPw(e.target.value);
  };

  const onCloseButtonHandler = () => {
    setIsSignUpOpen((prev) => !prev);
    setUserId('');
    setUserNickname('');
    setUserPw('');
  };

  const onSignUpHandler = () => {
    createUserWithEmailAndPassword(auth, userId, userPw)
      .then((userCredential) => {
        console.log(userCredential);
        alert('회원가입이 완료되었습니다 🎉');
        setIsSignUpOpen((prev) => !prev);

        const { uid } = userCredential.user;
        const newUserInfo = {
          uid,
          userId,
          nickname: userNickname,
          image: null,
          favChannels: [],
          intro: '소개를 입력해주세요.'
        };
        addDefaultUserInfo(uid, newUserInfo);
      })
      .catch((error) => {
        console.error(error);
        alert('입력하신 값을 확인해주세요.');
      });
  };

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
        <Background $isSignUpOpen={isSignUpOpen} ref={backgroundRef} onClick={onBackgroundClick}>
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
