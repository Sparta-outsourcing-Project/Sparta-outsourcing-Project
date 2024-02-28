import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useChannelDetailInfo } from '../../hooks/useChannelDetailInfo';
import Loading from '../layout/Loading';
function TwoLevelPieChart({ channelId, averageCommentCount, averageLikeCount, averageViewCount }) {
  const { data: channelInfo, isLoading, error } = useChannelDetailInfo(channelId);

  // 데이터 준비
  const subscriberNum = Math.round(channelInfo.initSubscriberCount);
  const averageViewNum = Math.round(channelInfo.initAverageViewCount);

  const totalViewNum = channelInfo.viewCount;

  const initialViewCount = totalViewNum;
  const simpleViewCount = (initialViewCount) => {
    let formattedViewCount;
    if (initialViewCount > 100000000) {
      formattedViewCount = Math.round(initialViewCount / 10000000) / 10 + '억';
    } else if (initialViewCount > 10000) {
      formattedViewCount = Math.round(initialViewCount / 10000) + '만';
    } else if (initialViewCount > 1000) {
      formattedViewCount = Math.round(initialViewCount / 1000) + '천';
    } else {
      formattedViewCount = initialViewCount.toString();
    }
    return formattedViewCount; // 함수가 값을 반환하도록 수정
  };
  console.log(simpleViewCount(initialViewCount));
  console.log(averageViewCount);

  // 안쪽 부분의 데이터 (총 조회수)
  const data01 = [
    { name: '평균 댓글수', value: averageCommentCount },
    { name: '총 조회수', value: averageLikeCount },
    { name: '총 조회수', value: averageViewCount }
  ];
  console.log(averageCommentCount);

  // 바깥쪽 부분의 데이터 (구독자수 대비 영상 평균 조회수 비교)
  const data02 = [
    { name: '구독자 수', value: channelInfo.subscriberCount, realValue: subscriberNum },
    { name: '영상 평균 조회수', value: channelInfo.averageViewCount, realValue: averageViewNum }
  ];
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <>
      <ResponsiveContainer className="recharts-layer" width="100%" height="100%">
        <PieChart width={400} height={400}>
          {/* 안쪽 부분 */}
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={65} fill="#febe98" label>
            <Cell style={{ outline: 'none' }} />
          </Pie>
          {/* 테두리 바깥쪽 부분 */}
          <Pie
            data={data02}
            dataKey="realValue"
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={100}
            fill="#999999"
            label={(entry) => `${entry.name} : ${entry.value.toLocaleString()}`}
          >
            <Cell style={{ outline: 'none ' }} />
          </Pie>
          {/* 총 조회수 표시 */}
          {/* <text x="50%" y="47%" textAnchor="middle" fill="#000" fontWeight={600}>
            {data01[0].name}: {data01[0].value}
          </text> */}
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default TwoLevelPieChart;
