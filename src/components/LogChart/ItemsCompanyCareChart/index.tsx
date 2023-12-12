import React from 'react';
import { Col, Row } from 'antd';
import {
  EyeChart,
  BagChart,
  SearchedChart,
  RightChart,
  ChartCompanyView,
  ChartCompanySave,
  ChartPostSave,
  ChartPostCreate,
} from '#components/Icons';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
const ItemsCompanyCareChart = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const profileV3 = useSelector((state: RootState) => state.dataProfileInformationV3.data)
  return (
    <div className={styles.container}>
      <Row className={styles.row} align="top">
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartCompanyView />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>
                {
                  profileV3.typeRoleData === 0 ?
                    languageRedux === 1 ?
                      "Lượt công ty xem hồ sơ" :
                      languageRedux === 2 ?
                        "Number of companies that viewed the profile" :
                        "내 이력서를 본 회사 조회 수"
                    :
                    languageRedux === 1 ?
                      "Lượt ứng viên xem công ty" :
                      languageRedux === 2 ?
                        "Number of candidates viewing the company" :
                        "내 회사정보를 본 구직자 조회 수"
                }
              </p>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartCompanySave />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>
                {
                  profileV3.typeRoleData === 0 ?
                    languageRedux === 1 ?
                      "Lượt công ty lưu hồ sơ" :
                      languageRedux === 2 ?
                        "The number of times the company keeps records" :
                        "내 이력서를 본 회사 조회 수"
                    :
                    languageRedux === 1 ?
                      "Lượt ứng viên theo dõi công ty" :
                      languageRedux === 2 ?
                        "Number of candidates following the company" :
                        "내 회사 관심하는 구직자 조회 수"
                }
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className={styles.row} align="top">
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartPostSave />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>
                {
                  languageRedux === 1 ?
                    "Bài viết đã lưu" :
                    languageRedux === 2 ?
                      "Saved article" :
                      "커뮤니티의 저장한 글쓰기"
                }
              </p>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartPostCreate />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>
                {
                  languageRedux === 1 ?
                    "Bài viết đã tạo trên HiJob" :
                    languageRedux === 2 ?
                      "Article created on HiJob" :
                      "커뮤니티의 등록한 글쓰기"
                }
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ItemsCompanyCareChart;
