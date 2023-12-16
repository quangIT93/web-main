import React from 'react';
import { Col, Row } from 'antd';
import {
  // EyeChart,
  // BagChart,
  // SearchedChart,
  RightChart,
  ChartCompanyView,
  ChartCompanySave,
  ChartPostSave,
  ChartPostCreate,
  SearchedChart,
  ChartPerson,
} from '#components/Icons';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { DataLog, DataLogRecuiter } from 'pages/LogChart/typeChart';
import { PropItemOther, PropItemValue } from '../typeChart';
import { Link } from 'react-router-dom';
import { CustomSkeleton } from '#components/CustomSkeleton';

const ItemsOtherChart: React.FC<{
  dataLog: DataLog | undefined;
  dataLogRecruiter: DataLogRecuiter | undefined;
}> = ({ ...props }) => {
  const { dataLog, dataLogRecruiter } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const elements: React.ReactNode[] = Array.from({ length: 2 }, (_, index) => (
    <React.Fragment key={index} />
  ));

  const itemsOther: PropItemOther = {
    otherTop: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? 'Lượt công ty lưu hồ sơ'
            : languageRedux === 2
            ? 'Number of companies saved the profile'
            : '내 이력서를 저장한 회사 조회 수'
          : languageRedux === 1
          ? 'Lượt ứng viên xem công ty'
          : languageRedux === 2
          ? 'Number of candidates viewed the company'
          : '내 회사정보를 본 구직자 조회 수',
        icon: dataLog ? <ChartCompanyView /> : <ChartPerson />,
        total: dataLog
          ? dataLog?.saveYourProfileLogs
          : dataLogRecruiter?.viewYourCompanyLogs,
        path: dataLog
          ? // '/history?companyView=52'
            ''
          : // '/history?activitiesEmployer=60'
            '',
      },
      {
        id: 2,
        title: dataLog
          ? languageRedux === 1
            ? 'Lượt công ty xem hồ sơ'
            : languageRedux === 2
            ? 'Number of companies that viewed the profile'
            : '내 이력서를 본 회사 조회 수.'
          : languageRedux === 1
          ? 'Lượt ứng viên theo dõi công ty'
          : languageRedux === 2
          ? 'Number of candidates following the company'
          : '내 회사 관심하는 구직자 조회 수',
        icon: dataLog ? <SearchedChart /> : <ChartCompanySave />,
        total: dataLog
          ? dataLog?.viewProfileLogs
          : dataLogRecruiter?.saveYourCompanyLogs,
        path: dataLog
          ? '/history?companyView=51'
          : // '/history?activitiesEmployer=61'
            '',
      },
    ],
    otherMid: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? 'Việc làm đã tìm kiếm'
            : languageRedux === 2
            ? 'Job searched'
            : '검색한 채용공고'
          : '',
        icon: <SearchedChart />,
        total: dataLog?.searchLogs,
        path: '',
      },
    ],
    otherBottom: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? 'Bài viết đã lưu'
            : languageRedux === 2
            ? 'Saved article'
            : '커뮤니티의 저장한 글쓰기'
          : languageRedux === 1
          ? 'Bài viết đã lưu'
          : languageRedux === 2
          ? 'Saved article'
          : '커뮤니티의 저장한 글쓰기',
        icon: <ChartPostSave />,
        total: dataLog
          ? dataLog?.saveCommunityLogs
          : dataLogRecruiter?.saveCommunityLogs,
        path: dataLog
          ? '/history?community_post=30'
          : '/history?community_post=30',
      },
      {
        id: 2,
        title: dataLog
          ? languageRedux === 1
            ? 'Bài viết đã tạo trên HiJob'
            : languageRedux === 2
            ? 'Article created on HiJob'
            : '커뮤니티의 등록한 글쓰기'
          : languageRedux === 1
          ? 'Bài viết đã tạo trên HiJob'
          : languageRedux === 2
          ? 'Article created on HiJob'
          : '커뮤니티의 등록한 글쓰기',
        icon: <ChartPostCreate />,
        total: dataLog
          ? dataLog?.createCommunityLogs
          : dataLogRecruiter?.createCommunityLogs,
        path: dataLog
          ? '/history?community_post=31'
          : '/history?community_post=31',
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap_row}>
        <h3 className={styles.title_chart}>
          {dataLog
            ? languageRedux === 1
              ? 'Công ty quan tâm đến bạn'
              : languageRedux === 2
              ? 'The company cares about you'
              : '나를 관심하는 회사'
            : languageRedux === 1
            ? 'Ứng viên theo dõi công ty của bạn'
            : languageRedux === 2
            ? 'Candidates follow your company'
            : '내 회사를 관심하는 구직자'}
        </h3>
        <Row className={styles.row} align="top">
          {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
            ? itemsOther.otherTop.map((other: PropItemValue) => (
                <Col span={6} className={styles.col}>
                  <div className={`${styles.col_left} col_left__itemsChart`}>
                    {other.icon}
                  </div>
                  <div className={styles.col_right}>
                    <div className={styles.col_right__top}>
                      <span className={styles.col_right__topValue1}>
                        {other.total}
                      </span>
                      {other?.path !== '' ? (
                        <Link
                          className={styles.border_button__right}
                          to={other.path}
                          target={`${other.path === '' ? '_self' : '_blank'}`}
                        >
                          <RightChart />
                        </Link>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.col_right__bottom}>
                      <p className={styles.col_right__bottomText}>
                        {other.title}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            : elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
        </Row>
      </div>
      {dataLog && (
        <div className={styles.wrap_row}>
          <h3 className={styles.title_chart}>
            {languageRedux === 1
              ? 'Tìm kiếm công việc'
              : languageRedux === 2
              ? 'Job Search'
              : '채용 정보 검색'}
          </h3>
          <Row className={styles.row} align="top">
            {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
              ? itemsOther.otherMid.map(
                  (other: PropItemValue, index: number) => (
                    <Col
                      span={6}
                      className={styles.col}
                      pull={index === 1 ? 0 : 12}
                      offset={index === 1 ? 0 : 12}
                    >
                      <div
                        className={`${styles.col_left} col_left__itemsChart`}
                      >
                        {other.icon}
                      </div>
                      <div className={styles.col_right}>
                        <div className={styles.col_right__top}>
                          <span className={styles.col_right__topValue1}>
                            {other.total}
                          </span>
                          {/* <Link
                            className={styles.border_button__right}
                            to={other.path}
                            target={`${other.path === '' ? '_self' : '_blank'}`}
                          >
                            <RightChart />
                          </Link> */}
                        </div>
                        <div className={styles.col_right__bottom}>
                          <p className={styles.col_right__bottomText}>
                            {other.title}
                          </p>
                        </div>
                      </div>
                    </Col>
                  ),
                )
              : elements.map((value, index: number) => (
                  <CustomSkeleton key={index} />
                ))}
          </Row>
        </div>
      )}
      <div className={styles.wrap_row}>
        <h3 className={styles.title_chart}>
          {languageRedux === 1
            ? 'Câu chuyện việc làm HiJob'
            : languageRedux === 2
            ? 'HiJob Community'
            : languageRedux === 3 && 'HiJob 커뮤니티'}
        </h3>
        <Row className={styles.row} align="top">
          {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
            ? itemsOther.otherBottom.map((other: PropItemValue) => (
                <Col span={6} className={styles.col}>
                  <div className={`${styles.col_left} col_left__itemsChart`}>
                    {other.icon}
                  </div>
                  <div className={styles.col_right}>
                    <div className={styles.col_right__top}>
                      <span className={styles.col_right__topValue1}>
                        {other.total}
                      </span>
                      <Link
                        className={styles.border_button__right}
                        to={other.path}
                        target={`${other.path === '' ? '_self' : '_blank'}`}
                      >
                        <RightChart />
                      </Link>
                    </div>
                    <div className={styles.col_right__bottom}>
                      <p className={styles.col_right__bottomText}>
                        {other.title}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            : elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
        </Row>
      </div>
    </div>
  );
};

export default ItemsOtherChart;
