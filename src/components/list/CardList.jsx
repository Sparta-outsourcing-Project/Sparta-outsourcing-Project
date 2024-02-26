import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { readSearchKeyWord } from '../../api/dataApi';
import { useParams } from 'react-router-dom';

export default function CardList() {
  const [channelData, setChannelData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [sortBy, setSortBy] = useState('subscriberCount');
  const { keyword } = useParams();

  // 검색이나 메인에서 클릭한 키워드를 추출
  useEffect(() => {
    const fetchData = async () => {
      // 추출된 키워드 사용 또는 route에서 제공되지 않으면 기본값으로 '뷰티' 사용
      const searchKeyword = keyword;
      const data = await readSearchKeyWord(searchKeyword);

      // 중복 제거 후 정렬된 데이터로 업데이트
      const uniqueSortedData = sortAndRemoveDuplicates(data, sortBy);
      setChannelData(uniqueSortedData);
      setOriginalData(uniqueSortedData); // 원본 데이터 설정
    };

    fetchData();
  }, [keyword, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);

    // 정렬 변경 시 원본 데이터로 다시 정렬
    const sortedData = sortAndRemoveDuplicates(originalData, e.target.value);
    setChannelData(sortedData);
  };

  const sortAndRemoveDuplicates = (data, sortBy) => {
    const uniqueData = Array.from(new Set(data.map((item) => item.channelTitle))).map((channelTitle) =>
      data.find((item) => item.channelTitle === channelTitle)
    );

    const sortedData = uniqueData.sort((a, b) => parseInt(b[sortBy], 10) - parseInt(a[sortBy], 10));
    return sortedData;
  };

  return (
    <main>
      <ListWrapper>
        <select name="" id="" onChange={handleSortChange} value={sortBy}>
          <option value="subscriberCount">구독자</option>
          <option value="averageViewCount">영상조회수</option>
        </select>
        <ListTable>
          <thead>
            <tr>
              <th>순위</th>
              <th colSpan={2}></th>
              <th>구독자</th>
              <th>영상 조회수</th>
            </tr>
          </thead>
          <tbody>
            {channelData.map((channel, index) => (
              <tr key={index}>
                <td>{index + 1}위</td>
                <td>
                  <span key={channel.channelTitle}>
                    <img src={channel.thumbnailUrl} alt={channel.channelTitle} />
                  </span>
                </td>
                <td key={channel.channelTitle}>{channel.channelTitle}</td>
                <td>{channel.subscriberCount}</td>
                <td>{channel.averageViewCount}</td>
              </tr>
            ))}
          </tbody>
        </ListTable>
      </ListWrapper>
    </main>
  );
}
export const ListWrap = styled.main``;
export const ListWrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  @media (max-width: 1300px) {
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }
`;
export const ListTable = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
  & th,
  & td {
    text-align: left;
    border-bottom: 1px solid black;
    padding: 1rem;
    vertical-align: middle;
  }
  & th:nth-child(1) {
    width: 100px;
  }

  & td:nth-child(2) {
    width: 160px;
    & span {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: tomato;
      margin-right: 1rem;
      overflow: hidden;
    }
    & span > img {
      width: 100%;
    }
  }
`;
