import * as St from './styles/Login.style';
import logo from '../../assets/utrend_logo.png';
import googleIcon from '../../assets/google.png';
import { useRef, useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../api/config';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/modules/loginSlice';
import { addGoogleUserInfo } from '../../api/auth';

const Login = ({ isLoginOpen, setIsLoginOpen, setIsSignUpOpen }) => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const dispatch = useDispatch();
  const backgroundRef = useRef('');

  const onBackgroundClick = (e) => {
    e.target === backgroundRef.current && setIsLoginOpen((prev) => !prev);
  };

  const onUserId = (e) => {
    setUserId(e.target.value);
  };

  const onUserPw = (e) => {
    setUserPw(e.target.value);
  };

  const onCloseButtonHandler = () => {
    setIsLoginOpen((prev) => !prev);
    setUserId('');
    setUserPw('');
  };

  const onSignUpHandler = () => {
    setIsLoginOpen((prev) => !prev);
    setIsSignUpOpen((prev) => !prev);
    setUserId('');
    setUserPw('');
  };

  const onLoginHandler = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userId, userPw);
      alert('로그인 되었습니다.');
      setIsLoginOpen((prev) => !prev);

      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('uid', userCredential.user.uid);

      dispatch(login(true));

      setUserId('');
      setUserPw('');
    } catch (error) {
      console.log(error);
      alert('입력하신 값을 확인해주세요.');
    }
  };

  const onGoogleLogin = () => {
    setIsLoginOpen((prev) => !prev);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userData) => {
        alert('로그인 되었습니다.');

        sessionStorage.setItem('userId', userData.user.email);
        sessionStorage.setItem('uid', userData.user.uid);

        dispatch(login(true));

        const { uid } = userData.user;
        const newUserInfo = {
          uid,
          userId: userData.user.email,
          nickname: userData.user.displayName,
          image: null,
          favChannels: [],
          intro: '소개를 입력해주세요.'
        };

        addGoogleUserInfo(uid, newUserInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoginOpen && (
        <St.Background $isLoginOpen={isLoginOpen} ref={backgroundRef} onClick={onBackgroundClick}>
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
                <St.DefaultLogin onClick={onLoginHandler}>로그인</St.DefaultLogin>
                <St.GoogleLoginBtn onClick={onGoogleLogin}>
                  <St.GoogleWrapper>
                    <img src={googleIcon} alt="" />
                    <span>Google 로그인</span>
                  </St.GoogleWrapper>
                </St.GoogleLoginBtn>
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
