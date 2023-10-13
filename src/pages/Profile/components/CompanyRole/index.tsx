import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
// import moment, { Moment } from 'moment';
import { Avatar, Skeleton, Space } from 'antd';
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
  PencilIcon,
} from '#components/Icons';
import { RootState } from 'store';
import { Box, TextField, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

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
              <h1>{language?.company_info}</h1>

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
                  {language?.edit}
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
                  : 'You need to fill in your company-role information to post job vacancies, search for candidates.'}
              </p>
            </div>
          </div>

          <div className="edit-logo-company-role-container">
            <div className="edit-logo-company-role-content">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="editJob"
              >
                {languageRedux === 1 ? 'Logo công ty' : "Company's logo"}
              </Typography>
              <div className="company-role-logo">
                <Avatar shape="square" size={160} src={companyData?.logoPath} />
              </div>
            </div>
          </div>

          <div className="edit-name-tax-company-role-container">
            <div className="edit-name-company-role">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="editCompany"
              >
                {language?.company_name}
              </Typography>
              <TextField
                type="text"
                id="editCompany"
                name="title"
                value={companyData?.name}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>
            <div className="edit-tax-company-role">
              <Typography
                sx={{
                  fontWeight: 700,
                  color: '#000000',
                }}
                variant="body1"
                component="label"
                htmlFor="editJob"
              >
                {language?.tax_code}
              </Typography>
              <TextField
                type="text"
                id="editJob"
                name="title"
                value={companyData?.taxCode}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
              />
            </div>
          </div>

          <div className="edit-address-company-role-container">
            <div className="edit-address-company">
              <div className="edit-titleAddress">
                <Typography
                  sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="addressTitle"
                >
                  {language?.post_page?.city}
                </Typography>
                <TextField
                  type="text"
                  id="editJob"
                  name="title"
                  value={
                    companyData?.companyLocation?.district?.province?.fullName
                  }
                  size="small"
                  sx={{ width: '100%', marginTop: '8px' }}
                  disabled={true}
                />
              </div>

              <div className="edit-titleAddress">
                <Typography
                  sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="jobTitle"
                >
                  {language?.post_page?.district}
                </Typography>
                <TextField
                  type="text"
                  id="editJob"
                  name="title"
                  value={companyData?.companyLocation?.district?.fullName}
                  size="small"
                  sx={{ width: '100%', marginTop: '8px' }}
                  disabled={true}
                />
              </div>
            </div>
            <div className="edit-address-company">
              <div className="edit-titleAddress">
                <Typography
                  sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="jobTitle"
                >
                  {language?.post_page?.ward}
                </Typography>
                <TextField
                  type="text"
                  id="editJob"
                  name="title"
                  value={companyData?.companyLocation?.fullName}
                  size="small"
                  sx={{ width: '100%', marginTop: '8px' }}
                  disabled={true}
                />
              </div>

              <div className="edit-titleAddress">
                <Typography
                  sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="jobTitle"
                >
                  {language?.address1}
                </Typography>
                <TextField
                  type="text"
                  id="jobTitle"
                  name="title"
                  value={companyData?.address}
                  size="small"
                  sx={{ width: '100%', marginTop: '8px' }}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          <div className="edit-phone-mail-company-role-container">
            <div className="edit-phone-company">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="editCompany"
              >
                {language?.phone_number}
              </Typography>
              <TextField
                type="text"
                id="editJob"
                name="title"
                value={companyData?.phone}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>
            <div className="edit-mail-company">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="editJob"
              >
                Email
              </Typography>
              <TextField
                type="text"
                id="editJob"
                name="title"
                value={companyData?.email}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>
          </div>

          <div className="edit-role-web-company-role-container">
            <div className="edit-role-company">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="addressTitle"
              >
                {language?.role_at_business}
              </Typography>

              <TextField
                type="text"
                id="editJob"
                name="title"
                value={companyData?.companyRoleInfomation?.nameText}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>

            <div className="edit-web-company">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="jobTitle"
              >
                Website
              </Typography>
              <TextField
                type="text"
                id="editJob"
                name="title"
                value={companyData?.website}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>
          </div>

          <div className="edit-field-scale-company-role-container">
            <div className="edit-field-company">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="addressTitle"
              >
                {language?.company_page?.field}
              </Typography>

              <TextField
                type="text"
                id="editJob"
                name="title"
                value={companyData?.companyCategory?.fullName}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>

            <div className="edit-scale-company">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="jobTitle"
              >
                {language?.company_size}
              </Typography>
              <TextField
                type="text"
                id="editJob"
                name="title"
                value={companyData?.companySizeInfomation?.nameText}
                size="small"
                sx={{ width: '100%', marginTop: '8px' }}
                disabled={true}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>
          </div>

          <div
            className="edit-image-company-role-container"
            style={{
              pointerEvents: 'none',
            }}
          >
            <div className="edit-image-company-role-content">
              <h3>
                <span>
                  {languageRedux === 1 ? 'Hình ảnh công ty' : "Company's image"}
                </span>
              </h3>
              <div
                className="company-role-images"
                style={{
                  height:
                    companyData?.images.length > 0 ? 'fit-content' : '310px',
                  border:
                    companyData?.images.length > 0 ? 'none' : '1px solid #ccc',
                }}
              >
                <Box p="0rem 0">
                  <section className="drag-img-container">
                    <div
                      {...getRootProps({
                        className: 'dropzone',
                      })}
                    >
                      <input {...getInputProps()} />
                      <div
                        className="drag-img-camera"
                        style={{
                          display:
                            companyData?.images.length === 0 ? 'flex' : 'none',
                        }}
                      >
                        <CameraComunityIcon />
                        <p>
                          {languageRedux === 1
                            ? 'Chưa có hình ảnh về công ty'
                            : 'No image of the company yet'}
                        </p>
                      </div>
                    </div>
                  </section>
                  <Box className="list_iamges">
                    {companyData?.images.map((item: any, index: number) => (
                      <div className="item-image" key={index}>
                        <img
                          key={index}
                          src={item?.image}
                          alt={language?.err_none_img}
                        />
                        <div className="deleteButton">
                          <DeleteImageComunityIcon />
                        </div>
                      </div>
                    ))}
                  </Box>
                </Box>
              </div>
            </div>
          </div>

          <div className="edit-des-company-role-container">
            <div className="edit-des-company">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="editCompany"
              >
                {language?.company_description}
              </Typography>
              <TextField
                disabled={true}
                type="text"
                id="editCompany"
                multiline
                rows={12}
                name="title"
                value={companyData?.description}
                sx={{ width: '100%', marginTop: '8px', fontSize: '14px' }}
                placeholder={language?.company_page?.place_des}
                //   error={titleError} // Đánh dấu lỗi
              />
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default CompanyRole;
