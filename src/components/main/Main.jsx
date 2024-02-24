import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMostPopularVideos } from '../../hooks/useMostPopularChannel';
import { getMostPopularThumbnails } from '../../api/dataApi';
import Thumbnail from '../main/Thumbnail';

export default function Main() {
  const [thumbnails, setThumbmails] = useState([]);
  const { data: videos, isLoading, isError } = useMostPopularVideos();

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

  if (isLoading) return <div>..Loading</div>;

  if (isError) return <div>{isError.message}</div>;

  return (
    <MainWrap>
      <MainSlider>
        <div>Main Slider</div>
      </MainSlider>
      <MainSearch>
        <input type="search" placeholder="주제를 검색하세요." />
        <SearchKeyWord>
          <span>#먹방</span>
          <span>#여행</span>
          <span>#생활</span>
          <span>#운동</span>
          <span>#뷰티</span>
          <span>#패션</span>
        </SearchKeyWord>
      </MainSearch>
      <MainYoutuberSlider>
        <SliderWrap>
          <SliderItem>
            <SliderItemImgWrap>
              <img src="" alt="" />
            </SliderItemImgWrap>
            <SliderItemInfo>
              <SliderItemInfoTop>
                <h3>Youtuber</h3>
                <span>20만</span>
              </SliderItemInfoTop>
              <p>분야</p>
              <p>view</p>
            </SliderItemInfo>
          </SliderItem>
          <SliderItem>
            <SliderItemImgWrap>
              <img src="" alt="" />
            </SliderItemImgWrap>
            <SliderItemInfo>
              <SliderItemInfoTop>
                <h3>Youtuber</h3>
                <span>20만</span>
              </SliderItemInfoTop>
              <p>분야</p>
              <p>view</p>
            </SliderItemInfo>
          </SliderItem>
          <SliderItem>
            <SliderItemImgWrap>
              <img src="" alt="" />
            </SliderItemImgWrap>
            <SliderItemInfo>
              <SliderItemInfoTop>
                <h3>Youtuber</h3>
                <span>20만</span>
              </SliderItemInfoTop>
              <p>분야</p>
              <p>view</p>
            </SliderItemInfo>
          </SliderItem>
        </SliderWrap>
      </MainYoutuberSlider>
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
    margin-bottom: 3rem;
  }
`;

//main slider
export const MainSlider = styled.section`
  width: 100%;
  height: 400px;
  background-color: #212121;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
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

//youtuberslider
export const MainYoutuberSlider = styled.section`
  width: 1280px;
  height: 300px;
  margin: auto;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;

  @media (max-width: 1300px) {
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }
`;
export const SliderWrap = styled.div`
  width: 100%;
  display: flex;
`;
export const SliderItem = styled.article`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid red; */
`;
export const SliderItemImgWrap = styled.div`
  width: calc(100% - 3rem);
  height: 180px;
  background-color: #febe98;
  border-radius: 1rem;
`;
export const SliderItemInfo = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`;
export const SliderItemInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
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
