import styled from 'styled-components';

export default function Thumbnail({ handleChannelClick, channelUrl, src, alt, text }) {
  return (
    <MainBestContents>
      <div onClick={() => handleChannelClick(channelUrl)}>
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
    cursor: pointer;
  }

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  & > span {
  }
`;
