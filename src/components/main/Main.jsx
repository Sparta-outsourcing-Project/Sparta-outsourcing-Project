import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderSlider from '../sliders/HeaderSlider';
import { useMostPopularVideos } from '../../hooks/useMostPopularChannel';
import { getMostPopularThumbnails } from '../../api/dataApi';
import Thumbnail from '../main/Thumbnail';
import { useNavigate } from 'react-router-dom';
import BodySlider from '../sliders/BodySlider';

export default function Main() {
  const navigate = useNavigate();
  const [thumbnails, setThumbmails] = useState([]);
  const { data: videos, isLoading, isError } = useMostPopularVideos();
  const [searchTerm, setSearchTerm] = useState('');

  const keyWords = ['먹방', '여행', '생활', '운동', '뷰티', '패션'];
  const searchIconSrc = 'https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png';

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

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Enter 키를 눌러 검색 (=> 리스트페이지로 이동)
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      // Enter 키가 눌렸을 때
      navigate(`/list/${searchTerm}`);
    }
  };

  const handleKeyWordClick = async (keyword) => {
    navigate(`/list/${keyword}`);
  };

  if (isLoading) return <div>..Loading</div>;

  if (isError) return <div>{isError.message}</div>;

  return (
    <MainWrap>
      <HeaderSlider />
      <MainSearch>
        <SearchInputBox>
          <input
            id="search-input"
            type="search"
            placeholder="주제를 검색하세요."
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchEnter}
          />
          <img src={searchIconSrc} />
        </SearchInputBox>
        <SearchKeyWord>
          {keyWords.map((keyword) => {
            return (
              <span key={keyword} onClick={() => handleKeyWordClick(keyword)}>
                #{keyword}
              </span>
            );
          })}
        </SearchKeyWord>
      </MainSearch>
      <BodySlider />
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
`;

export const SearchInputBox = styled.div`
  width: 1280px;
  height: 60px;
  display: flex;
  gap: 0.7rem;

  & > input {
    border: 1px solid #212121;
    width: 100%;
    border-radius: 2rem;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  & > input::placeholder {
    text-align: center;
    font-size: 1rem;
  }
  & > img {
    margin-top: 0.3rem;
    height: 2rem;
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
