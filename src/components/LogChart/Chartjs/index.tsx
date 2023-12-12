import React, { useEffect, useRef, useState } from 'react';
// npm chart
import Chart from 'chart.js/auto';
import { DataLog } from 'pages/LogChart/typeChart';
interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor?: string; // Tuỳ chọn
  tension: number;
  borderWidth?: number; // Tuỳ chọn
  hoverBackgroundColor?: string; // Tuỳ chọn
}

// Định nghĩa interface cho cấu trúc của đối tượng datasets
interface Datasets {
  [key: number]: Dataset[];
}

const Chartjs: React.FC<{ dataLog: DataLog | undefined }> = ({ ...props }) => {
  const { dataLog } = props;
  console.log('dataLog', dataLog);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  useEffect(() => {
    if (!chartRef.current || !dataLog) return;
    chartRef.current.width = 600; // Set the desired width
    chartRef.current.height = 300; // Set the desired height

    const context = chartRef.current.getContext('2d');
    if (!context) return;

    const datasets: Datasets = {
      2023: [
        {
          label: 'Việc làm đã ứng tuyển',
          data: dataLog.applyLogs.activities
            .reverse()
            .map((applyLog: any) => applyLog.count),
          fill: false,
          borderColor: 'rgba(13, 153, 255, 1)',
          tension: 0.5,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(13, 153, 255, 1)', // Màu fill khi hover
        },
        {
          label: 'Việc làm đã xem qua',
          data: dataLog.viewPostLogs.activities
            .reverse()
            .map((applyLog: any) => applyLog.count),
          fill: false,
          borderColor: 'rgba(52, 168, 83, 1)',
          tension: 0.5,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)', // Màu fill khi hover
        },
        {
          label: 'Việc làm đã tìm kiếm',
          data: dataLog.searchLogs.activities
            .reverse()
            .map((applyLog: any) => applyLog.count),
          fill: false,
          borderColor: 'rgba(251, 188, 4, 1)',
          tension: 0.5,
          borderWidth: 1,
          // pointBackgroundColor: 'rgb(75, 192, 192)',
          // pointBorderColor: 'rgb(75, 192, 192)',
          // pointRadius: 5,
          // pointHoverRadius: 8,
          // pointHoverBackgroundColor: 'rgb(75, 192, 192)',
          // pointHoverBorderColor: 'rgb(75, 192, 192)',
          // pointHitRadius: 10,
          // pointBorderWidth: 2,
          hoverBackgroundColor: 'rgba(251, 188, 4, 1)', // Màu fill khi hover
          // hoverBorderColor: 'rgb(75, 192, 192)',
        },
      ],
      2022: [
        {
          label: 'Dataset 2022',
          data: [30, 45, 20, 60, 40, 35, 80],
          fill: false,
          hoverBackgroundColor: 'rgba(13, 153, 255, 1)',
          borderColor: 'rgba(13, 153, 255, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2022',
          data: [23, 31, 41, 15, 51, 23, 12],
          fill: false,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)',
          borderColor: 'rgba(52, 168, 83, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2022',
          data: [12, 32, 43, 21, 22, 23, 11],
          fill: false,
          hoverBackgroundColor: 'rgba(251, 188, 4, 1)',
          borderColor: 'rgba(251, 188, 4, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
      ],
      2024: [
        {
          label: 'Dataset 2023',
          data: [32, 32, 11, 33, 61, 23, 12],
          fill: false,
          hoverBackgroundColor: 'rgba(13, 153, 255, 1)',
          borderColor: 'rgba(13, 153, 255, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2023',
          data: [32, 43, 23, 33, 21, 32, 32],
          fill: false,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)',
          borderColor: 'rgba(52, 168, 83, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
      ],
    };

    const mixedChart = new Chart(context, {
      type: 'line',
      data: {
        datasets: datasets[selectedYear],
        labels: [
          'Tháng 01',
          'Tháng 02',
          'Tháng 03',
          'Tháng 04',
          'Tháng 05',
          'Tháng 06',
          'Tháng 07',
          'Tháng 08',
          'Tháng 09',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12',
        ],
      },
      options: {
        maintainAspectRatio: false, // Tắt tự động duy trì tỷ lệ khung hình
        responsive: true, // Cho phép biểu đồ thích ứng với kích thước của container
        indexAxis: 'x',
        scales: {
          x: {
            stacked: true,
          },
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  return `${label}: ${context.parsed.y}`;
                }
                return '';
              },
              title: (tooltipItems) => {
                return `Kết quả ${tooltipItems[0].label}`;
              },
            },
            // titleAlign: 'left',
          },
          legend: {
            display: true,
            labels: {
              // Thay đổi biểu tượng (icon) thành hình tròn
              usePointStyle: true,
              pointStyle: 'line',
              pointStyleWidth: 80,
            },
            // fullSize: true,
          },
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
      },
    });

    return () => {
      // Cleanup to avoid memory leaks when the component unmounts
      mixedChart.destroy();
    };
  }, [selectedYear, dataLog]);
  return (
    <>
      <canvas ref={chartRef} style={{ maxHeight: '400px' }}></canvas>;
    </>
  );
};

export default Chartjs;
