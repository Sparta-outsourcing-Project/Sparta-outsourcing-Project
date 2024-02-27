import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { readSearchKeyWord } from '../../api/dataApi';
import { useParams, Link } from 'react-router-dom';

export default function CardList() {
  const [channelData, setChannelData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [sortBy, setSortBy] = useState('subscriberCount');
  const { keyword } = useParams();

  const [page, setPage] = useState < number > 1; //현재페이지수
  const totalPost = 13; // 총 개시불
  const pageRange = 5; // 페이지당 보여줄 게시물 수
  const btnRange = 3; // 보여질 페이지 버튼 수

  const currentSet = Math.ceil(page / btnRange); // 버튼이 몇번째 세트인지 나타내는 수
  const startPage = (currentSet - 1) * btnRange + 1; // 현재 보여질 버튼의 첫번 째 슈

  useEffect(() => {
    const fetchData = async () => {
      const searchKeyword = keyword;
      const data = await readSearchKeyWord(searchKeyword);

      // 중복 제거 후 정렬된 데이터로 업데이트
      const uniqueSortedData = sortAndRemoveDuplicates(data, sortBy);
      setChannelData(uniqueSortedData);
      setOriginalData(uniqueSortedData);
    };

    fetchData();
  }, [keyword, sortBy]);

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (e) => {
    setSortBy(e.target.value);

    const sortedData = sortAndRemoveDuplicates(originalData, e.target.value);
    setChannelData(sortedData);
  };

  // 중복 제거 및 정렬 함수
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
                    <Link to={`/list/${keyword}/${channel.channelId}`}>
                      <img src={channel.thumbnailUrl} alt={channel.channelTitle} />
                    </Link>
                  </span>
                </td>
                <td key={channel.channelTitle}>
                  <Link to={`/list/${keyword}/${channel.channelId}`}>{channel.channelTitle}</Link>
                </td>
                <td>{channel.subscriberCount}</td>
                <td>{channel.averageViewCount}</td>
              </tr>
            ))}
          </tbody>
        </ListTable>
        {Array(btnRange)
          .fill(startPage)
          .map((_, i) => {
            return (
              <button key={i} onClick={() => setPage(startPage + 1)} $active={page === startPage + 1}>
                {startPage + 1}
              </button>
            );
          })}
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
    & span img {
      width: 100%;
    }
  }
`;
