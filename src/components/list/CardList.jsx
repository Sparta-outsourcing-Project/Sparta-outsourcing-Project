import styled from 'styled-components';
export default function CardList() {
  return (
    <main>
      <ListWrapper>
        <select name="" id="">
          <option value="">구독자</option>
          <option value="">영상조회수</option>
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
            <tr>
              <td>1위</td>
              <td>
                <span>
                  <img src="" alt="" />
                </span>
              </td>
              <td>유튜버</td>
              <td>구독자수</td>
              <td>영상 조회수</td>
            </tr>
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
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: tomato;
      margin-right: 1rem;
    }
  }
`;
