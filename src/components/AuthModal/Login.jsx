import * as St from './styles/Login.style';
import logo from '../../assets/utrend_logo.png';

const Login = ({ isLoginOpen, setIsLoginOpen, setIsSignUpOpen }) => {
  const onCloseButtonHandler = () => {
    setIsLoginOpen(!isLoginOpen);
    !!isLoginOpen && isLoginOpen === false;
  };
  const onSignUpHandler = () => {
    setIsSignUpOpen(!setIsSignUpOpen);
  };

  return (
    <>
      {isLoginOpen ? (
        <St.Background $isLoginOpen={isLoginOpen}>
          <St.Container>
            <St.LoginWrapper>
              <button onClick={onCloseButtonHandler}>X</button>
              <img src={logo} alt="" />
              <St.InputBtnWrapper>
                <p>로그인</p>
                <St.InputContainer>
                  <input placeholder="아이디" />
                </St.InputContainer>
                <St.InputContainer>
                  <input placeholder="비밀번호" />
                </St.InputContainer>
                <button onClick={onSignUpHandler}>로그인</button>
              </St.InputBtnWrapper>

              <St.CheckSignUp>
                <span>아직 회원이 아니신가요? </span>
                <p>회원가입</p>
              </St.CheckSignUp>
            </St.LoginWrapper>
          </St.Container>
        </St.Background>
      ) : (
        <></>
      )}
    </>
  );
};

export default Login;
