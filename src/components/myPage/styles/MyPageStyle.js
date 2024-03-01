import styled from 'styled-components';

export const MypageSection = styled.section`
  min-height: 30rem;
  display: flex;
  /* justify-content: space-between; */
`;

export const ProfileSection = styled.section`
  background-color: #ffd8c1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem;
  gap: 3rem;
  width: 23%;
  height: 100%;
  padding-bottom: 3rem;
  box-shadow: 0px 0px 10px 0px #f7d7c4;
  border-radius: 1rem;

  & > label > img,
  img {
    margin-top: 2rem;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  & > label > p {
    color: white;
    text-align: center;
  }

  & > button {
    background-color: white;
    width: 10rem;
    height: 3rem;
    border: none;
    border-radius: 0.5rem;
  }
`;

export const ThumbnailTd = styled.td`
  cursor: pointer;
`;

export const TitleTd = styled.td`
  cursor: pointer;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
  text-align: center;

  & > input {
    width: 100%;
    height: 40px;
  }
`;

export const UserNickname = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const UserNicknameInput = styled.input`
  font-size: 1.3rem;
`;

export const UserEmail = styled.p`
  /* font-size: 1rem; */
  color: #706d6d;
`;

export const UserIntro = styled.p`
  font-size: 1.2rem;
`;

export const FavoriteSection = styled.section`
  width: 75rem;
  margin: 3rem;
  padding: 1.5rem;
  box-shadow: 0px 0px 3px 0px #e5ab89;
  border-radius: 1rem;
`;

export const FavList = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
  font-size: 17px;
  & > thead > tr {
    background-color: antiquewhite;
  }

  & th {
    text-align: left;
    font-size: 1rem;
    padding: 1rem;
    vertical-align: middle;
  }

  & td {
    border-bottom: 1px solid #e4c1ad;
    padding: 1rem;
    vertical-align: middle;
  }
  /* & th:nth-child(1) {
    width: 100px;
  } */

  /* & th:nth-child(3) {
    margin-right: 10px;
  } */

  & td:nth-child(2) {
    width: 160px;
    & span {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      /* background-color: #febe98; */
      margin-right: 1rem;
      overflow: hidden;
    }
  }
`;

export const FavTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const FavItemBox = styled.tr`
  width: 1000px;
  display: flex;
  flex-direction: row;
  & > img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;

export const ThumbnailImg = styled.img`
  border-radius: 50%;
`;

export const UpdateButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  & > button {
    background-color: white;
    width: 8rem;
    height: 3rem;
    border: none;
    border-radius: 0.5rem;
  }
`;

export const Textarea = styled.textarea`
  font-size: 1.3rem;
  min-height: 70px;
`;

export const EditingImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 30px;
`;
