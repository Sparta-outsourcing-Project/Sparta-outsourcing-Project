import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderSlider from '../sliders/HeaderSlider';
import { useMostPopularVideos } from '../../hooks/useMostPopularChannel';
import { getMostChannelInfo, getMostPopularThumbnails } from '../../api/dataApi';
import Thumbnail from '../main/Thumbnail';
import { useNavigate } from 'react-router-dom';
import BodySlider from '../sliders/BodySlider';

export default function Main() {
  const navigate = useNavigate();

  const [channelInfos, setChannelInfos] = useState([]);
  const { data: videos, isLoading, isError } = useMostPopularVideos();
  const [searchTerm, setSearchTerm] = useState('');

  const searchIconSrc = 'https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png';
  const keyWords = ['먹방', '여행', '생활', '운동', '뷰티', '패션'];
  const order = ['1st', '2nd', '3rd', '4th', '5th'];

  useEffect(() => {
    const getThumbnails = async () => {
      if (videos) {
        const newChannelInfos = [];
        for (const video of videos.slice(0, 5)) {
          const channelTitle = video.snippet.channelTitle;
          const channelThumbnail = (await getMostPopularThumbnails(video.snippet.channelId)).high.url;
          const channelCustomUrl = await getMostChannelInfo(video.snippet.channelId);
          const channelUrl = `https://www.youtube.com/${channelCustomUrl}`;
          const channelInfo = { channelTitle, channelThumbnail, channelUrl };
          newChannelInfos.push(channelInfo);
        }
        setChannelInfos(newChannelInfos);
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
      if (!searchTerm.trim()) {
        return alert('검색어를 입력해주세요.');
      }
      navigate(`/list/${searchTerm}`);
    }
  };

  // 검색아이콘 눌러 검색 (=> 리스트페이지로 이동)
  const handleSearchClick = () => {
    if (!searchTerm.trim()) {
      return alert('검색어를 입력해주세요.');
    }
    navigate(`/list/${searchTerm}`);
  };

  const handleKeyWordClick = (keyword) => {
    navigate(`/list/${keyword}`);
  };

  const handleChannelClick = (channelUrl) => {
    window.open(channelUrl, '_blank');
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
            placeholder="원하는 주제를 검색해보세요 !"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchEnter}
          />
          <img src={searchIconSrc} onClick={handleSearchClick} />
        </SearchInputBox>
        <SearchKeyWord>
          {keyWords.map((keyword) => {
            return (
              <KeywordText key={keyword} onClick={() => handleKeyWordClick(keyword)}>
                #{keyword}
              </KeywordText>
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
          {channelInfos.map((channelInfo, index) => (
            <BestYoutuber key={index}>
              <p>{order[index]}</p>
              <Thumbnail
                handleChannelClick={handleChannelClick}
                channelUrl={channelInfo.channelUrl}
                key={index}
                src={channelInfo.channelThumbnail}
                alt={`Thumbnail ${index + 1}`}
              />
              <p>{channelInfo.channelTitle}</p>
            </BestYoutuber>
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
    cursor: pointer;
  }
`;

export const SearchKeyWord = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const KeywordText = styled.div`
  display: block;
  /* font-size: 14px; 기존*/
  font-size: 17px;
  background-color: #7cd8c6;
  border-radius: 1rem;
  padding: 2px 1.2rem;
  margin: 0 8px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
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
  text-align: center;
  gap: 20px;
  margin-bottom: 3rem;
`;

export const BestYoutuber = styled.div``;
