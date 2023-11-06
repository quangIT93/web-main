import React, { useEffect, useState } from 'react';

import styles from './style.module.scss';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

import unLogo from '../../img/male_null_avatar.png';
import { IconBellNewestCompany, LocationHomeIcon } from '#components/Icons';
import { CateIcon } from '#components/Icons/iconCandidate';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ContactInfo from '#components/DetailCompany/ContactInfo';
import ApplyPosition from '#components/DetailCompany/ApplyPosition';
import ReviewCompany from '#components/DetailCompany/ReviewCompany';
const DetailCompany = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileCompanyV3.data,
  );
  const [applyPostitions, setApplyPositions] = useState(4);
  const [company, setCompanyData] = useState<any>();
  console.log('profileV3', profileV3);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setCompany);
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <p>{languageRedux === 1 ? 'Thông tin liên hệ' : 'Contact Info'}</p>
      ),
      children: <ContactInfo company={profileV3} />,
    },
    {
      key: '2',
      label: (
        <p>
          {languageRedux === 1 ? 'Vị trí ứng tuyển' : 'Application positions'}
          <span style={{ color: '#0D99FF' }}>
            {' '}
            {'('}
            {applyPostitions}
            {')'}
          </span>
        </p>
      ),
      children: <ApplyPosition company={company} />,
    },
    {
      key: '3',
      label: <p>{languageRedux === 1 ? 'Đánh giá' : 'Review'}</p>,
      children: <ReviewCompany company={company} />,
    },
  ];

  return (
    <div className={styles.detail_company_container}>
      <div className={styles.detail_company_content}>
        <div className={styles.detail_company_title}>
          <h3>
            {languageRedux === 1 ? 'Chi tiết công ty' : 'View detail Company'}
          </h3>
        </div>
        <div className={styles.detail_company_intro}>
          <div className={styles.logo_company}>
            <img src={unLogo} alt="" loading="lazy" />
          </div>
          <div className={styles.info_company}>
            <div className={styles.company_name}>
              <h3>CÔNG TY TNHH MTV Ô TÔ TRƯỜNG HẢI - PHÚ MỸ HƯNG</h3>
              <div className={styles.company_bell}>
                <IconBellNewestCompany width={24} height={24} />
                <p>{languageRedux === 1 ? 'Theo dõi' : 'Follow'}</p>
              </div>
            </div>
            <div className={styles.company_address}>
              <div className={styles.address_item}>
                <LocationHomeIcon />
                <p>tp.HCM</p>
              </div>
              <div className={styles.address_item}>
                <CateIcon />
                <p>
                  {languageRedux === 1
                    ? `${applyPostitions} vị trí ứng tuyển`
                    : `${applyPostitions} application positions`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="detail_company_tabs">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </div>
  );
};

export default DetailCompany;
