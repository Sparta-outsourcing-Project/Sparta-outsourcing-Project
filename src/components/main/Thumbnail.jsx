import styled from 'styled-components';

export default function Thumbnail({ src, alt, text }) {
  return (
    <MainBestContents>
      <div>
        <img src={src} alt={alt} />
      </div>
      <span>{text}</span>
    </MainBestContents>
  );
}

export const MainBestContents = styled.li`
  text-align: center;
  margin: 0.8rem;

  & > div {
    background-color: #febe98;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  & > span {
  }
`;
