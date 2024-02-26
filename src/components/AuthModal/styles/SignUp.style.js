import styled from 'styled-components';

export const Background = styled.div`
  display: ${(props) => (props.$isSignUpOpen ? 'block' : 'none')};
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

export const InputBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 80%;
  margin-top: 20px;

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
