import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderSlider from '../sliders/HeaderSlider';
import BodySlider from '../sliders/BodySlider';
import { useMostPopularVideos } from '../../hooks/useMostPopularChannel';
import { getMostPopularThumbnails } from '../../api/dataApi';
import Thumbnail from '../main/Thumbnail';
import { useNavigate } from 'react-router-dom';
import BodySliderCopy from '../sliders/BodySliderCopy';

export default function Main() {
  const navigate = useNavigate();
  const [thumbnails, setThumbmails] = useState([]);
  const { data: videos, isLoading, isError } = useMostPopularVideos();

  const keyWords = ['먹방', '여행', '생활', '운동', '뷰티', '패션'];

  useEffect(() => {
    const getThumbnails = async () => {
      if (videos) {
        const getFiveThumbnails = videos.slice(0, 5).map((video) => getMostPopularThumbnails(video.snippet.channelId));
        const getOneThumbnail = await Promise.all(getFiveThumbnails);
        setThumbmails(getOneThumbnail);
      }
    };
    getThumbnails();
  }, [videos]);

  const handleKeyWordClick = async (keyword) => {
    navigate(`/list/${keyword}`);
  };

  if (isLoading) return <div>..Loading</div>;

  if (isError) return <div>{isError.message}</div>;

  return (
    <MainWrap>
      <HeaderSlider />
      <MainSearch>
        <input type="search" placeholder="주제를 검색하세요." />
        <SearchKeyWord>
          {keyWords.map((keyword, idx) => {
            return (
              <span key={idx} onClick={() => handleKeyWordClick(keyword)}>
                #{keyword}
              </span>
            );
          })}
        </SearchKeyWord>
      </MainSearch>
      {/* <BodySlider /> */}
      <BodySliderCopy />
      <MainBest>
        <MainBestTitle>
          <h3>Best YouTuber</h3>
          <p>이달의 인기 유튜버</p>
        </MainBestTitle>
        <MainBestContWrap>
          {thumbnails.map((thumbnail, index) => (
            <Thumbnail key={index} src={thumbnail.high.url} alt={`Thumbnail ${index + 1}`} text={`${index + 1}st`} />
          ))}
        </MainBestContWrap>
      </MainBest>
    </MainWrap>
  );
}

// 전체
export const MainWrap = styled.main`
  width: 100%;
  & > section {
    /* margin-bottom: 3rem; */
  }
`;

//search
export const MainSearch = styled.section`
  width: 1280px;
  height: 100px;
  /* background-color: #21212155; */
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1300px) {
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }

  & > input {
    border: 1px solid #212121;
    width: 100%;
    border-radius: 2rem;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }
  & > input::placeholder {
    text-align: center;
    font-size: 1rem;
  }
`;
export const SearchKeyWord = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & > span {
    display: block;
    font-size: 14px;
    background-color: #7cd8c6;
    border-radius: 1rem;
    padding: 2px 1.2rem;
    margin: 0 8px;
  }
`;

// best
export const MainBest = styled.section`
  width: 1280px;
  margin: auto;

  @media (max-width: 1300px) {
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }
`;
export const MainBestTitle = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  & > h3 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.4rem;
  }
  & > p {
    font-weight: 200;
    color: #888;
  }
`;
export const MainBestContWrap = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;
