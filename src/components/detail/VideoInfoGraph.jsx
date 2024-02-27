import { useChannelDetailInfo } from '../../hooks/useChannelDetailInfo';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function VideoInfoGraph({ channelId }) {
  const { data: channelInfo, isLoading, error } = useChannelDetailInfo(channelId);
  console.log(channelInfo);

  // const formattedViewCount = parseInt(channelInfo.viewCount).toLocaleString();
  const formattedVideoCount = parseInt(channelInfo.videoCount).toLocaleString();
  // console.log(formattedViewCount);
  console.log(formattedVideoCount);

  const initialViewCount = channelInfo.viewCount;
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

  const data = [
    {
      name: '구독자 수',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: '채널 총 영상수',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: '평균 조회수',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: '채널 총 조회수',
      uv: 2780,
      pv: 3908,
      amt: 2000
    }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );

  // return (
  //   <div>
  //     그래프 들어가는 자리입니다.
  //     <p>구독자 수 {channelInfo.subscriberCount}</p>
  //     <p>채널 총 영상수 {formattedVideoCount} 개</p>
  //     <p>평균 조회수 {channelInfo.averageViewCount}</p>
  //     <p>채널 총 조회수 {simpleViewCount(initialViewCount)}</p>
  //   </div>
  // );
}

export default VideoInfoGraph;
