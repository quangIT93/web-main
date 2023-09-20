import * as React from 'react';

// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
// import icon
import {
  ShareCvIcon,
  TickIcon,
  UserLineOutCVIcon,
  QuestionMarkIcon,
  SectionEditIcon,
  DownloadCVIcon,
  SectionDeleteIcon,
} from '#components/Icons';

// import Component

import './style.scss';

import { Modal, Button, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { setCookie } from 'cookies';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Box, Grid } from '@mui/material';
import ModalShare from '#components/CV/ModalShare';
import RollTop from '#components/RollTop';
import ModalDeleteCv from '#components/CV/ModalDeleteCv';

const ProfileCv: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [selectedId, setSelectedId] = React.useState<any>(0);
  const [openModalShare, setOpenModalShare] = React.useState<any>(false);
  const [openModalDeleteCv, setOpenModalDeleteCv] = React.useState<any>(false);

  React.useEffect(() => {
    roleRedux === 1 && window.open(`/`, '_parent');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelecCv = (id: number) => {
    setSelectedId(id);
  };

  const handleEditCv = (id: any) => {
    localStorage.setItem('cv-id', id);
    window.open(`/templates-cv/`, '_parent');
  };

  const handleDownloadCV = async (pdfUrl: any, name: string) => {
    try {
      const response = await axios.get(pdfUrl, {
        responseType: 'blob', // Để nhận dạng kiểu dữ liệu là blob (binary data)
      });

      // Tạo URL tạm thời cho tệp PDF
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);

      // Tạo một thẻ <a> để tải xuống tệp
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}.pdf`; // Đặt tên cho tệp khi tải xuống
      a.click();

      // Giải phóng URL tạm thời
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="profile-cv-container">
      <Navbar />
      <div className="profile-cv-content">
        <div className="profile-cv-title">
          <div className="profile-cv-title_left">
            <p>
              {languageRedux === 1
                ? 'Số cv của bạn:'
                : 'Number of your resume:'}
            </p>
            <h3>04</h3>
          </div>
          <div className="profile-cv-title_right">
            <Button
              type="primary"
              onClick={() => {
                window.open(`/profile`, '_parent');
              }}
            >
              <UserLineOutCVIcon />
              {languageRedux === 1
                ? 'Cập nhật thông tin của bạn'
                : 'Update your profile'}
            </Button>
          </div>
        </div>
        <Box
          sx={{ flexGrow: 1 }}
          className="profile-cv-list"
          id="profile-cv-list"
        >
          <Grid container spacing={3} columns={{ xs: 12, sm: 4, md: 12 }}>
            {profileV3?.profilesCvs?.map((item: any, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <div className="cv-item">
                  <div className="cv-item_left">
                    <Avatar
                      shape="square"
                      icon={<UserOutlined />}
                      src={item?.imageURL}
                    />
                  </div>
                  <div className="cv-item_right">
                    <div className="cv-item_right__title">
                      <h3>
                        {languageRedux === 1
                          ? `Hồ sơ số ${index + 1}`
                          : `Resume No.${index + 1}`}
                      </h3>
                      <p>
                        {languageRedux === 1
                          ? 'Cập nhật cuối: ' +
                            moment(new Date()).format('HH:mm') +
                            ', ' +
                            moment(new Date()).format('DD/MM/YYYY')
                          : 'Last update: ' +
                            moment(new Date()).format('HH:mm') +
                            ', ' +
                            moment(new Date()).format('DD/MM/YYYY')}
                      </p>
                    </div>
                    <div className="cv-item_right__actions">
                      <div
                        className="action-item"
                        onClick={() => handleSelecCv(index)}
                      >
                        <div
                          className={
                            item?.status === 1
                              ? 'action-icon selected'
                              : 'action-icon'
                          }
                        >
                          <TickIcon></TickIcon>
                        </div>
                        <p>
                          {languageRedux === 1
                            ? 'Chọn CV để ứng tuyển'
                            : 'Select CV to apply'}
                        </p>
                        {/* <QuestionMarkIcon width={16} height={16} /> */}
                      </div>
                      <div
                        className="action-item"
                        onClick={() => handleEditCv(index + 1)}
                      >
                        <div className="action-icon">
                          <SectionEditIcon width={24} height={24} />
                        </div>
                        <p>{languageRedux === 1 ? 'Chỉnh sửa' : 'Editor'}</p>
                      </div>
                      <div
                        className="action-item"
                        onClick={() => setOpenModalShare(true)}
                      >
                        <div className="action-icon">
                          <ShareCvIcon width={24} height={24} />
                        </div>
                        <p>{languageRedux === 1 ? 'Chia sẻ' : 'Share'}</p>
                      </div>
                      <div
                        className="action-item"
                        onClick={() =>
                          handleDownloadCV(item?.pdfURL, item?.name)
                        }
                      >
                        <div className="action-icon">
                          <DownloadCVIcon width={24} height={24} />
                        </div>
                        <p>{languageRedux === 1 ? 'Tải CV' : 'Download'}</p>
                      </div>
                      <div
                        className="action-item"
                        onClick={() => setOpenModalDeleteCv(true)}
                      >
                        <div className="action-icon">
                          <SectionDeleteIcon width={24} height={24} />
                        </div>
                        <p>{languageRedux === 1 ? 'Xóa CV' : 'Delete'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
        <ModalShare
          openModalShare={openModalShare}
          setOpenModalShare={setOpenModalShare}
        />
        <ModalDeleteCv
          openModalDeleteCv={openModalDeleteCv}
          setOpenModalDeleteCv={setOpenModalDeleteCv}
        />
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default ProfileCv;
