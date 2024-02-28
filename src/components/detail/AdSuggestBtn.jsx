import styled from 'styled-components';

function AdSuggestBtn() {
  const adSuggestBtnClickHandler = () => {
    alert('모달이 뜰거에용');
  };

  //   /* 광고 제안하기 모달창 띄우기 */
  //   // 로그인 상태 가져오기
  //   const loginState = useSelector((state) => state.loginReducer);
  //   const [showLoginModal, setShowLoginModal] = useState(false);

  //   console.log(loginState);

  //   // 로그인이 안 된 상태 -> 로그인 모달, 로그인 된 상태 -> 광고 제안 모달창 띄우기
  //   const adSuggestBtnClickHandler = () => {
  //     if (loginState) {
  //       setShowLoginModal(false);
  //     } else {
  //       setShowLoginModal(true);
  //     }
  //   };
  return (
    <div>
      <ButtonStyle onClick={adSuggestBtnClickHandler} style={{ backgroundColor: '#febe98' }}>
        광고 제안 하기
      </ButtonStyle>
    </div>
  );
}

const ButtonStyle = styled.button`
  width: 150px;
  border-color: transparent;
  border-radius: 10px;
  height: 40px;
  margin: 30px 0;
  font-weight: 600;
`;

export default AdSuggestBtn;
