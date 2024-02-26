import * as St from './styles/Login.style';
import { Background } from './styles/SignUp.style';
import logo from '../../assets/utrend_logo.png';

const SignUp = ({ isSignUpOpen, setIsSignUpOpen, isLoginOpen, setIsLoginOpen }) => {
  // 닫기 버튼 클릭
  const onCloseButtonHandler = () => {
    !!isSignUpOpen && setIsSignUpOpen(isSignUpOpen === false);
  };

  // 회원가입 클릭
  const onSignUpHandler = () => {
    setIsSignUpOpen(!isSignUpOpen);
  };

  // '로그인하기' 클릭
  const onLoginHandler = () => {
    setIsSignUpOpen(!isSignUpOpen);
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      {isSignUpOpen && (
        <Background $isSignUpOpen={isSignUpOpen}>
          <St.Container>
            <St.LoginWrapper>
              <button onClick={onCloseButtonHandler}>X</button>
              <img src={logo} alt="" />
              <St.InputBtnWrapper>
                <p>회원가입</p>
                <St.InputContainer>
                  <input placeholder="아이디" />
                </St.InputContainer>
                <St.InputContainer>
                  <input placeholder="비밀번호" />
                </St.InputContainer>
                <button onClick={onSignUpHandler}>회원가입</button>
              </St.InputBtnWrapper>

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
