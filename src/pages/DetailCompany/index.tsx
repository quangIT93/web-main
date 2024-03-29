import React, { useEffect, useState } from 'react';

import styles from './style.module.scss';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

import unLogo from '../../img/male_null_avatar.png';
import {
  IconBellNewestCompany,
  IconBellSaveNewestCompany,
  LocationHomeIcon,
} from '#components/Icons';
import { CateIcon } from '#components/Icons/iconCandidate';
import { Skeleton, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ContactInfo from '#components/DetailCompany/ContactInfo';
import ApplyPosition from '#components/DetailCompany/ApplyPosition';
import ReviewCompany from '#components/DetailCompany/ReviewCompany';
import apiCompanyV3 from 'api/apiCompanyV3';
import queryString from 'query-string';
import ModalFollowSuccess from '#components/DetailCompany/ModalFollowSuccess';
import ModalLogin from '../../components/Home/ModalLogin';
import { setAlertCancleSave, setAlertSave } from 'store/reducer/alertReducer';
import ShowCancleSave from '#components/ShowCancleSave';
import ShowNotificativeSave from '#components/ShowNotificativeSave';
const DetailCompany = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileCompanyV3.data,
  );
  const [applyPostitions, setApplyPositions] = useState(0);
  const [company, setCompanyData] = useState<any>();
  const [postOfCompany, setPostOfCompany] = useState<any>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState<any>('0');
  const [loading, setLoading] = React.useState(true);
  const [openModalFollowSuccess, setOpenModalFollowSuccess] =
    useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);

  const dispatch = useDispatch();
  const queryParams = queryString.parse(window.location.search);
  const companyId = Number(queryParams['companyId']);

  const getCompanyInfo = async () => {
    try {
      setLoading(true);
      const result = await apiCompanyV3.getCompanyById(
        companyId,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result.status === 200) {
        setLoading(false);
        setCompanyData(result.data);
        setBookmarked(result.data.isBookmarked);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getApplicationPositionCount = async () => {
    try {
      setLoading(true);
      const result = await apiCompanyV3.getPostOfCompany(
        companyId,
        0,
        20,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result.status === 200 && result.data.posts.length === 20) {
        setLoading(false);
        setApplyPositions(result.data.total);
        setPostOfCompany(result.data.posts);
        setHasMore(true);
      } else if (
        result.data.posts.length < 20 &&
        result.data.posts.length > 0
      ) {
        setHasMore(false);
        setApplyPositions(result.data.total);
        setPostOfCompany(result.data.posts);
        setPage('0');
      } else {
        setHasMore(false);
        setApplyPositions(result.data.total);
        setPostOfCompany(result.data.posts);
        setPage('0');
      }
    } catch (error) {
      window.open('/', '_parent');
    }
  };

  const handleFollowCompany = async () => {
    try {
      if (!localStorage.getItem('accessToken')) {
        setOpenModalLogin(true);
      }

      if (bookmarked === true) {
        const result = await apiCompanyV3.postBookmarkCompany(companyId);
        if (result) {
          setBookmarked(false);
          dispatch<any>(setAlertCancleSave(true));
        }
      } else if (bookmarked === false) {
        const result = await apiCompanyV3.postBookmarkCompany(companyId);
        if (result) {
          dispatch<any>(setAlertSave(true));
          setOpenModalFollowSuccess(true);
          setBookmarked(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !companyId && window.open(`/`, '_parent');
  }, []);

  useEffect(() => {
    getCompanyInfo();
  }, [languageRedux]);

  useEffect(() => {
    getApplicationPositionCount();
  }, [languageRedux]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <p>
          {languageRedux === 1
            ? 'Thông tin liên hệ'
            : languageRedux === 2
              ? 'Contact Info'
              : languageRedux === 3 && '회사 정보'}
        </p>
      ),
      children: <ContactInfo company={company} />,
    },
    {
      key: '2',
      label: (
        <p>
          {languageRedux === 1
            ? 'Tin tuyển dụng'
            : languageRedux === 2
              ? 'Opening Jobs'
              : languageRedux === 3 && '등록 채용공고'}
          <span style={{ color: '#0D99FF' }}>
            {' '}
            {'('}
            {applyPostitions}
            {')'}
          </span>
        </p>
      ),
      children: (
        <ApplyPosition
          postOfCompany={postOfCompany}
          setPostOfCompany={setPostOfCompany}
          hasMore={hasMore}
          setHasMore={setHasMore}
          page={page}
          setPage={setPage}
          companyId={companyId}
          accountId={company?.accountId}
        />
      ),
    },
    {
      key: '3',
      label: (
        <p>
          {languageRedux === 1
            ? 'Đánh giá'
            : languageRedux === 2
              ? 'Review'
              : languageRedux === 3 && '리뷰'}
        </p>
      ),
      children: <ReviewCompany company={company} companyId={companyId} />,
    },
  ];

  return (
    <div className={styles.detail_company_container}>
      <div className={styles.detail_company_content}>
        <div className={styles.detail_company_title}>
          <h3>
            {languageRedux === 1
              ? 'Chi tiết công ty'
              : languageRedux === 2
                ? 'Detail Company'
                : languageRedux === 3 && '자세한 회사 정보'}
          </h3>
        </div>
        <Skeleton loading={loading} active>
          <div className={styles.detail_company_intro}>
            <div className={styles.logo_company}>
              <img
                src={company?.logoPath ? company.logoPath : unLogo}
                alt=""
                loading="lazy"
              />
            </div>
            <div className={styles.info_company}>
              <div className={styles.company_name}>
                <h3>
                  {company?.name
                    ? company.name
                    : languageRedux === 1
                      ? 'Thông tin công ty chưa cập nhật'
                      : languageRedux === 2
                        ? 'Company information not updated yet'
                        : languageRedux === 3 &&
                        '회사정보가 업데이트되지 않았습니다.'}
                </h3>
                <div
                  className={styles.company_bell}
                  onClick={handleFollowCompany}
                  style={{
                    display:
                      localStorage.getItem('accountId') === company?.accountId
                        ? 'none'
                        : 'flex',
                  }}
                >
                  {bookmarked ? (
                    <IconBellSaveNewestCompany width={24} height={24} />
                  ) : (
                    <IconBellNewestCompany width={24} height={24} />
                  )}
                  <p>
                    {languageRedux === 1
                      ? 'Theo dõi'
                      : languageRedux === 2
                        ? 'Follow'
                        : languageRedux === 3 && '팔로우'}
                  </p>
                </div>
              </div>
              <div className={styles.company_address}>
                <div className={styles.address_item}>
                  <LocationHomeIcon />
                  <p>
                    {company?.companyLocation?.district?.province?.fullName
                      ? company.companyLocation.district.province.fullName
                      : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : languageRedux === 2
                          ? 'Company information not updated yet'
                          : languageRedux === 3 &&
                          '회사정보가 업데이트되지 않았습니다.'}
                  </p>
                </div>
                <div className={styles.address_item}>
                  <CateIcon />
                  <p>
                    {languageRedux === 1
                      ? `${applyPostitions} tin tuyển dụng`
                      : languageRedux === 2
                        ? `${applyPostitions} opening jobs`
                        : languageRedux === 3 &&
                        `${applyPostitions} 등록 채용공고`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="detail_company_tabs">
            <Tabs defaultActiveKey="1" items={items} animated={false} />
          </div>
        </Skeleton>
      </div>
      <ShowCancleSave />
      <ShowNotificativeSave />
      <ModalFollowSuccess
        openModalFollowSuccess={openModalFollowSuccess}
        setOpenModalFollowSuccess={setOpenModalFollowSuccess}
      />
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </div>
  );
};

export default DetailCompany;
