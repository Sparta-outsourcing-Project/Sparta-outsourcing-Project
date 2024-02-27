import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import Loading from '../layout/Loading';
import { readSearchKeyWord } from '../../api/dataApi';

export default function CardList() {
  const [sortBy, setSortBy] = useState('subscriberCount');
  const [sortedAndUniqueData, setSortedAndUniqueData] = useState([]);
  const { keyword } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['keyword', keyword, sortBy],
    queryFn: () => readSearchKeyWord(keyword),
    keepPreviousData: true
  });

  useEffect(() => {
    if (!data) return;

    const uniqueChannelTitles = Array.from(new Set(data.map((item) => item.channelTitle)));
    const uniqueData = uniqueChannelTitles.map((channelTitle) =>
      data.find((item) => item.channelTitle === channelTitle)
    );
    const sortedData = uniqueData.sort((a, b) => parseInt(b[sortBy], 10) - parseInt(a[sortBy], 10));

    setSortedAndUniqueData(sortedData);
  }, [data, sortBy]);

  // 페이지네이션
  const [page, setPage] = useState(1); // 현재 페이지 수
  const pageRange = 10; // 페이지당 보여줄 게시물 수
  const btnRange = 3; // 보여질 페이지 버튼 수
  const totalPost = sortedAndUniqueData.length; // 총 게시물 수
  const currentSet = Math.ceil(page / btnRange); // 현재 페이지 세트
  const startPage = (currentSet - 1) * btnRange + 1; // 시작 페이지 번호
  const endPage = Math.min(startPage + btnRange - 1, Math.ceil(totalPost / pageRange)); // 마지막 페이지 번호
  const indexOfLastPost = page * pageRange;
  const indexOfFirstPost = indexOfLastPost - pageRange;
  const currentPosts = sortedAndUniqueData.slice(indexOfFirstPost, indexOfLastPost);

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageNum = (pageNum) => {
    setPage(pageNum);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

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
            {currentPosts.map((channel, index) => (
              <tr key={index}>
                <td>{(page - 1) * pageRange + index + 1}위</td>
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
        <PageButtonBox>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
            <PageButton
              key={pageNum}
              onClick={() => handlePageNum(pageNum)}
              style={{ fontWeight: page === pageNum ? 'bold' : 'normal' }}
            >
              {pageNum}
            </PageButton>
          ))}
        </PageButtonBox>
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

const PageButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
  background-color: transparent;
`;

const PageButton = styled.button`
  justify-content: center;
  align-items: center;
`;
