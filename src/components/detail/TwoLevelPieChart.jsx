import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useChannelDetailInfo } from '../../hooks/useChannelDetailInfo';
import Loading from '../layout/Loading';

function TwoLevelPieChart({ channelId, averageCommentCount, averageLikeCount, averageViewCount }) {
  const { data: channelInfo, isLoading, error } = useChannelDetailInfo(channelId);

  // 데이터 준비
  const subscriberNum = Math.round(channelInfo.initSubscriberCount);
  const averageViewNum = Math.round(channelInfo.initAverageViewCount);
  const COLORS01 = ['#bfbebe', '#dadada'];
  const COLORS02 = ['#febe98', '#f9d46e', '#B1C381'];

  // 안쪽 부분의 데이터 (총 조회수)
  const data01 = [
    { name: '평균 댓글수', value: averageCommentCount },
    { name: '평균 좋아요수', value: averageLikeCount }
  ];

  // 바깥쪽 부분의 데이터 (구독자수 대비 영상 평균 조회수 비교)
  const data02 = [
    { name: '구독자 수', value: channelInfo.subscriberCount, realValue: subscriberNum },
    { name: '채널 평균 조회수', value: channelInfo.averageViewCount, realValue: averageViewNum },
    { name: '최근 평균 조회수', value: toString(averageViewCount), realValue: averageViewCount }
  ];

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <>
      <ResponsiveContainer className="recharts-layer" width="100%" height="100%">
        <PieChart width={400} height={400}>
          {/* 안쪽 부분 */}
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={65} fill="#dadada">
            {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS01[index % COLORS01.length]} />
            ))}
          </Pie>
          {/* 테두리 바깥쪽 부분 */}
          <Pie
            data={data02}
            dataKey="realValue"
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={100}
            fill="#979797"
            label={(entry) => `${entry.name} : ${entry.value.toLocaleString()}`}
          >
            {data02.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS02[index % COLORS02.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default TwoLevelPieChart;
