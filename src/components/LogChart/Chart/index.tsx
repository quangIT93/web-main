import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import profileApi from 'api/profileApi';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
import { RootState } from 'store';
// import GoogleButton from 'react-google-button'
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
declare global {
  interface Window {}
}
const Chart = () => {
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    DataZoomComponent,
  ]);

  type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | LineSeriesOption
    | DataZoomComponentOption
  >;

  var chartDom = document.getElementById('main_echart') as HTMLElement;
  var myChart = chartDom && echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    // title: {
    //   text: 'Stacked Area Chart'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      type: 'scroll',
      data:
        profileV3.typeRoleDate === 0
          ? [
              'Việc làm đã ứng tuyển',
              'Việc làm đã xem qua',
              'Việc làm đã tìm kiếm',
            ]
          : [
              'Ứng viên đã tuyển dụng',
              'Ứng viên đã xem qua',
              'Ứng viên đã lưu lại',
            ],
      // bottom: 0,
      icon: 'rect',
      itemWidth: 70,
      itemHeight: 10,
      itemGap: 70,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter',
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty',
      },
    ],
    xAxis: [
      {
        name: '2023',
        type: 'category',
        boundaryGap: false,
        data: [
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
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name:
          profileV3.typeRoleDate === 0
            ? 'Việc làm đã ứng tuyển'
            : 'Ứng viên đã tuyển dụng',
        type: 'line',
        smooth: true,
        // stack: 'Total',
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgba(13, 153, 255, 1)',
        //     },
        //     {
        //       offset: 1,
        //       color: '#FFFFFF',
        //     },
        //   ]),
        // },
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 400, 134, 90, 230, 210],
      },
      {
        name:
          profileV3.typeRoleDate === 0
            ? 'Việc làm đã xem qua'
            : 'Ứng viên đã xem qua',
        type: 'line',
        smooth: true,
        // stack: 'Total',
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgba(52, 168, 83, 1)',
        //     },
        //     {
        //       offset: 1,
        //       color: '#FFFFFF',
        //     },
        //   ]),
        // },
        emphasis: {
          focus: 'series',
        },
        data: [120, 182, 191, 234, 190, 330, 110],
      },
      {
        name:
          profileV3.typeRoleDate === 0
            ? 'Việc làm đã tìm kiếm'
            : 'Ứng viên đã lưu lại',
        type: 'line',
        smooth: true,
        // stack: 'Total',
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgba(251, 188, 4, 1)',
        //     },
        //     {
        //       offset: 1,
        //       color: '#FFFFFF',
        //     },
        //   ]),
        // },
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190, 130, 110],
      },
    ],
  };

  option && myChart && myChart.setOption(option);
  window.onresize = function () {
    myChart.resize();
  };
  return (
    <div
      id="main_echart"
      style={{
        height: '400px',
        width: '100%',
      }}
    ></div>
  );
};

export default Chart;
