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
