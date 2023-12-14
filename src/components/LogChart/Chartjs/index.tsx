import React, { useEffect, useRef, useState } from 'react';
// npm chart
import Chart from 'chart.js/auto';
import { DataLog, DataLogRecuiter } from 'pages/LogChart/typeChart';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { getAnalytics, logEvent } from '@firebase/analytics';
interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor?: string; // Tuỳ chọn
  backgroundColor?: string; // Tuỳ chọn
  tension: number;
  borderWidth?: number; // Tuỳ chọn
  hoverBackgroundColor?: string; // Tuỳ chọn
}

// Định nghĩa interface cho cấu trúc của đối tượng datasets
interface Datasets {
  [key: number]: Dataset[];
}

const Chartjs: React.FC<{
  dataLog: DataLog | undefined;
  dataLogRecruiter: DataLogRecuiter | undefined;
}> = ({ ...props }) => {
  const { dataLog, dataLogRecruiter } = props;
  const mixedChartRef = useRef<Chart | null>(null); // Use useRef for chart instance

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const analytics: any = getAnalytics();
  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics

    document.title =
      languageRedux === 1
        ? 'HiJob - Tổng quan hoạt động'
        : languageRedux === 2
        ? 'HiJob - Activity overview'
        : 'HiJob - 활동 대시보드';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_hotJob' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const createChart = (dataLog: DataLog | DataLogRecuiter) => {
    console.log('context', dataLog);
    if (!chartRef.current) return;
    const context = chartRef.current.getContext('2d');
    if (!context) return;
    // Destroy the existing chart if it exists
    if (mixedChartRef.current) {
      mixedChartRef.current.destroy();
    }
    const month = [
      languageRedux === 1
        ? 'Tháng 1'
        : languageRedux === 2
        ? 'January'
        : '1 월',
      languageRedux === 1
        ? 'Tháng 2'
        : languageRedux === 2
        ? 'February'
        : '2 월',
      languageRedux === 1 ? 'Tháng 3' : languageRedux === 2 ? 'March' : '3 월',
      languageRedux === 1 ? 'Tháng 4' : languageRedux === 2 ? 'April' : '4 월',
      languageRedux === 1 ? 'Tháng 5' : languageRedux === 2 ? 'May' : '5 월',
      languageRedux === 1 ? 'Tháng 6' : languageRedux === 2 ? 'June' : '6 월',
      languageRedux === 1 ? 'Tháng 7' : languageRedux === 2 ? 'July' : '7 월',
      languageRedux === 1 ? 'Tháng 8' : languageRedux === 2 ? 'August' : '8 월',
      languageRedux === 1
        ? 'Tháng 9'
        : languageRedux === 2
        ? 'September'
        : '9 월',
      languageRedux === 1
        ? 'Tháng 10'
        : languageRedux === 2
        ? 'October'
        : '10 월',
      languageRedux === 1
        ? 'Tháng 11'
        : languageRedux === 2
        ? 'November'
        : '11 월',
      languageRedux === 1
        ? 'Tháng 12'
        : languageRedux === 2
        ? 'December'
        : '12 월',
    ];

    const datasets: Datasets = {
      2023: [
        {
          label:
            profileV3.typeRoleData === 0
              ? languageRedux === 1
                ? 'Việc làm đã ứng tuyển'
                : languageRedux === 2
                ? 'Applied job'
                : '지원한 채용공고'
              : languageRedux === 1
              ? 'Ứng viên đã tuyển dụng'
              : languageRedux === 2
              ? 'Recruited candidates'
              : '지원한 구직자',
          data:
            dataLog.type === 'Normal' && dataLog
              ? dataLog.applyLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : dataLog.type === 'Recuiter' && dataLog
              ? dataLog.applyLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : [],
          fill: false,
          borderColor: 'rgba(13, 153, 255, 1)',
          backgroundColor: 'rgba(13, 153, 255, 1)',
          tension: 0.5,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(13, 153, 255, 1)', // Màu fill khi hover
        },
        {
          label:
            profileV3.typeRoleData === 0
              ? languageRedux === 1
                ? 'Việc làm đã xem'
                : languageRedux === 2
                ? 'Viewed job'
                : '본 채용공고'
              : languageRedux === 1
              ? 'Ứng viên đã xem'
              : languageRedux === 2
              ? 'Viewed candidates'
              : '본 구지자',
          data:
            dataLog.type === 'Normal' && dataLog
              ? dataLog.viewPostLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : dataLog.type === 'Recuiter' && dataLog
              ? dataLog.viewCandidateLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : [],
          fill: false,
          borderColor: 'rgba(52, 168, 83, 1)',
          backgroundColor: 'rgba(52, 168, 83, 1)',
          tension: 0.5,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)', // Màu fill khi hover
        },
        {
          label:
            profileV3.typeRoleData === 0
              ? languageRedux === 1
                ? 'Lượt công ty xem hồ sơ'
                : languageRedux === 2
                ? 'Number of companies that viewed the profile'
                : '내 이력서를 본 회사 조회 수'
              : languageRedux === 1
              ? 'Ứng viên đã lưu'
              : languageRedux === 2
              ? 'Saved candidates'
              : '저장한 구직자',
          data:
            dataLog.type === 'Normal' && dataLog
              ? dataLog.savePostLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : dataLog.type === 'Recuiter' && dataLog
              ? dataLog.saveCandidateLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : [],
          fill: false,
          borderColor: 'rgba(251, 188, 4, 1)',
          backgroundColor: 'rgba(251, 188, 4, 1)',
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
          backgroundColor: 'rgba(13, 153, 255, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2022',
          data: [23, 31, 41, 15, 51, 23, 12],
          fill: false,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)',
          borderColor: 'rgba(52, 168, 83, 1)',
          backgroundColor: 'rgba(52, 168, 83, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2022',
          data: [12, 32, 43, 21, 22, 23, 11],
          fill: false,
          hoverBackgroundColor: 'rgba(251, 188, 4, 1)',
          borderColor: 'rgba(251, 188, 4, 1)',
          backgroundColor: 'rgba(251, 188, 4, 1)',
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
          backgroundColor: 'rgba(13, 153, 255, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2023',
          data: [32, 43, 23, 33, 21, 32, 32],
          fill: false,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)',
          borderColor: 'rgba(52, 168, 83, 1)',
          backgroundColor: 'rgba(52, 168, 83, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
      ],
    };

    mixedChartRef.current = new Chart(context, {
      type: 'line',
      data: {
        datasets: datasets[selectedYear],
        labels: month,
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
                return `${
                  languageRedux === 1
                    ? 'Kết quả'
                    : languageRedux === 2
                    ? 'Result'
                    : '결과'
                } ${tooltipItems[0].label}`;
              },
            },
            titleAlign: 'center',
          },
          legend: {
            display: true,
            labels: {
              // Thay đổi biểu tượng (icon) thành hình tròn
              usePointStyle: true,
              pointStyle: 'rect',
              pointStyleWidth: 68,
            },
            position: 'bottom',
            // fullSize: true,
          },
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
      },
    });
    // return () => {
    //   // Cleanup to avoid memory leaks when the component unmounts
    //   mixedChartRef?.current?.destroy();
    // };
  };

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.width = 600; // Set the desired width
    chartRef.current.height = 300; // Set the desired height

    if (dataLog) {
      createChart(dataLog);
    } else if (dataLogRecruiter) {
      createChart(dataLogRecruiter);
    }
  }, [selectedYear, dataLog, languageRedux, dataLogRecruiter]);
  return (
    <>
      <canvas
        ref={chartRef}
        style={{ maxHeight: '400px', minHeight: '400px' }}
      ></canvas>
      {/* <button onClick={() => setSelectedYear(2022)}>2022</button>
      <button onClick={() => setSelectedYear(2023)}>2023</button>
      <button onClick={() => setSelectedYear(2024)}>2024</button> */}
    </>
  );
};

export default Chartjs;
