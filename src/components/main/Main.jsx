import React from 'react';
import styled from 'styled-components';

export default function Main() {
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
      <MainYoutuberSlider></MainYoutuberSlider>
      <MainBest>
        <MainBestTitle>
          <h3>Best YouTuber</h3>
          <p>이달의 인기 유튜버</p>
        </MainBestTitle>
        <MainBestContWrap>
          <MainBestContents>
            <div></div>
            <span>1st</span>
          </MainBestContents>
          <MainBestContents>
            <div></div>
            <span>2st</span>
          </MainBestContents>
          <MainBestContents>
            <div></div>
            <span>3st</span>
          </MainBestContents>
          <MainBestContents>
            <div></div>
            <span>4st</span>
          </MainBestContents>
          <MainBestContents>
            <div></div>
            <span>5st</span>
          </MainBestContents>
        </MainBestContWrap>
      </MainBest>
    </MainWrap>
  );
}

// 전체
export const MainWrap = styled.main`
  width: 100%;
  & > section {
    margin-bottom: 2rem;
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
  height: 400px;
  margin: auto;
  background-color: #212121;

  @media (max-width: 1300px) {
    max-width: calc(100% - 2rem);
    margin: 1rem;
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
  }
  & > p {
  }
`;
export const MainBestContWrap = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MainBestContents = styled.li`
  text-align: center;
  margin: 0.8rem;

  & > div {
    background-color: royalblue;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
  & > span {
  }
`;
