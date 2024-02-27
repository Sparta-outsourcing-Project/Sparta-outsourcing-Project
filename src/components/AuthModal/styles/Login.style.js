import styled from 'styled-components';

export const Background = styled.div`
  display: ${(props) => (props.$isLoginOpen ? 'block' : 'none')};
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 12px;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 90%;
  margin: 20px auto;
  gap: 10px;

  & > img {
    width: 60%;
    margin: 20px auto;
  }

  & > button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    border: 2px solid #febe98;
    border-radius: 5px;
    background-color: white;
    color: #febe98;
  }
`;

export const InputBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 80%;
  margin-top: 40px;

  & > p {
    font-size: 30px;
    font-weight: 600;
    color: #febe98;
    text-align: center;
    margin-bottom: 10px;
  }

  & > button {
    background-color: #febe98;
    height: 40px;
    color: white;
    border: none;
    border-radius: 3px;
  }
`;

export const InputContainer = styled.div`
  border: 1.5px solid #febe98;
  border-radius: 3px;
  &:focus-within {
    border: 3px solid #febe98;
  }

  & > input {
    border: none;
    width: 100%;
    height: 40px;
    outline: none;
    color: gray;
    padding-left: 20px;
  }
  & > input::placeholder {
    color: lightgray;
  }
`;

export const CheckSignUp = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  & > span {
    color: lightgray;
  }
  & > p {
    color: gray;
    font-size: 17px;
    text-decoration: underline;
    cursor: pointer;
  }
`;
