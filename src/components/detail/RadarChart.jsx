import { useEffect, useState } from 'react';
import Radar from 'react-chartjs-2';

function RadarChart() {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    // 방사형 그래프 만들기 예시

    const data = {
      labels: ['항목 1', '항목 2', '항목 3', '항목 4', '항목 5'],
      datasets: [
        {
          label: '데이터셋',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56]
        }
      ]
    };

    const options = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 20
        },
        pointLabels: {
          fontSize: 16
        }
      }
    };
    setChartData(data);
  }, []);
  return (
    <div>
      <Radar data={chartData} options={options} />
    </div>
  );
}

export default RadarChart;
