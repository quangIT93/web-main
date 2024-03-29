import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
// import moment, { Moment } from 'moment';
import { Avatar, Skeleton, Space, Tabs, TabsProps } from 'antd';
import { message } from 'antd';

import { useLocation } from 'react-router-dom';

// import component
import ModalEditSuccess from '#components/EditPosted/ModalEditSuccess';

import { useSelector } from 'react-redux';
import languageApi from 'api/languageApi';

import RollTop from '#components/RollTop';

// import NotFound from 'pages/NotFound';
import './style.scss';

// firebase
import {
  CameraComunityIcon,
  DeleteImageComunityIcon,
  IconBellNewestCompany,
  PencilIcon,
} from '#components/Icons';
import { RootState } from 'store';
import { Box, TextField, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ContactInfo from '#components/DetailCompany/ContactInfo';
import ReviewCompany from '#components/DetailCompany/ReviewCompany';
import unLogo from '../../../../img/building.png';
interface ICompany {
  companyData: any;
  display: string;
}

const CompanyRole: React.FC<ICompany> = (props) => {
  const { companyData, display } = props;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  // const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [loading, setLoading] = useState<boolean>(false);

  const styleLabel = {
    fontWeight: 700,
    color: '#000000',
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    // maxFiles: 5,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDrop: () => {},
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <p>
          {languageRedux === 1
            ? 'Thông tin công ty'
            : languageRedux === 2
              ? "Company's information"
              : '회사 정보'}
        </p>
      ),
      children: <ContactInfo company={companyData} />,
    },
    {
      key: '2',
      label: (
        <p>
          {languageRedux === 1
            ? 'Đánh giá'
            : languageRedux === 2
              ? 'Review'
              : '리뷰'}
        </p>
      ),
      children: (
        <ReviewCompany company={companyData} companyId={companyData.id} />
      ),
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div
        className="company-role-container"
        style={{
          display: display,
          // marginTop: is_profile ? '30px' : '70px',
          marginTop: '30px',
          width: '100%',
        }}
      >
        <div
          className="company-role-content"
          style={{
            padding: '0px',
          }}
        >
          <div
            className="company-role-title"
            style={{
              marginBottom: '24px',
            }}
          >
            <div className="company-role-title_top">
              <h1>
                {languageRedux === 1
                  ? 'Thông tin công ty'
                  : languageRedux === 2
                    ? "Company's information"
                    : '회사 정보'}
              </h1>

              <Space
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                }}
                onClick={() => window.open(`/company-infor`, '_parent')}
              >
                <div className="edit-icon">
                  <PencilIcon width={15} height={15} />
                </div>

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {languageRedux === 1
                    ? 'Sửa'
                    : languageRedux === 2
                      ? 'Edit'
                      : '수정'}
                </p>
              </Space>
            </div>
            <div
              className="company-role-title_bottom"
              style={{ display: 'block' }}
            >
              <p>
                {languageRedux === 1
                  ? 'Bạn cần điền thông tin công ty của mình để đăng tin tuyển dụng, tìm kiếm ứng viên.'
                  : languageRedux === 2
                    ? 'You need to fill in your company-role information to post job vacancies, search for candidates.'
                    : '채용 공고 게시 및 후보자 검색을 위해서는 회사 정보를 입력해야 합니다.'}
              </p>
            </div>
          </div>
          <div className="detail_company_profile_container">
            <div className="detail_company_profile_content">
              <div className="detail_company_profile_intro">
                <div className="logo_company">
                  <img
                    src={companyData?.logoPath ? companyData?.logoPath : unLogo}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="info_company">
                  <div className="company_name">
                    <h3>
                      {companyData?.name
                        ? companyData.name
                        : languageRedux === 1
                          ? 'Thông tin công ty chưa cập nhật'
                          : languageRedux === 2
                            ? 'Company information not updated yet'
                            : languageRedux === 3 &&
                              '회사정보가 업데이트되지 않았습니다.'}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="detail_company_profile_tabs">
                <Tabs defaultActiveKey="1" items={items} animated={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default CompanyRole;
