import * as React from 'react';

// @ts-ignore
import axios from 'axios';
// import icon
import Nodata from 'utils/NoDataPage';
import {
  ShareCvIcon,
  TickIcon,
  UserLineOutCVIcon,
  QuestionMarkIcon,
  SectionEditIcon,
  DownloadCVIcon,
  SectionDeleteIcon,
  CandidateIcon,
  Icon4PointedStar,
} from '#components/Icons';

// import Component

import './style.scss';

import { Modal, Button, Avatar, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { setCookie } from 'cookies';
import {
  UserOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { Backdrop, Box, CircularProgress, Grid } from '@mui/material';
import ModalShare from '#components/CV/ModalShare';
import ModalDeleteCv from '#components/CV/ModalDeleteCv';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { Document, Page } from 'react-pdf';

import ModalShowCv from '#components/Profile/ModalShowCv';

const ProfileCv: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [selectedId, setSelectedId] = React.useState<any>(0);

  const [linkPdfUrl, setLinkPdfUrl] = React.useState('');

  const [openModalShare, setOpenModalShare] = React.useState<any>(false);
  const [openBackdrop, setOpenBackdrop] = React.useState<any>(false);

  const [modalShowPdf, setModalShowCvPdf] = React.useState({
    open: false,
    urlPdf: '',
  });

  const [openModalDeleteCv, setOpenModalDeleteCv] = React.useState<{
    open: boolean;
    item: {
      id: null | number;
      imageURL: string;
      name: string;
      pdfURL: string;
      status: number | null;
    };
  }>({
    open: false,
    item: {
      id: null,
      imageURL: '',
      name: '',
      pdfURL: '',
      status: null,
    },
  });
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem('accessToken') || profileV3.typeRoleData === 1)
      profileV3.typeRoleData === 1 && window.open(`/`, '_parent');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelecCv = async (item: any) => {
    try {
      const result = await apiCv.putThemeCv(item?.id, 1);
      if (result) {
        const resultProfileV3 = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        dispatch(setProfileV3(resultProfileV3));
      }
    } catch (error) {}

    // setSelectedId(id);
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
  const [pageNumber, setNumPages] = React.useState(1);
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  React.useEffect(() => {
    setOpenBackdrop(true);
    if (profileV3?.profilesCvs?.length > 0) {
      setOpenBackdrop(false);
    }
    if (profileV3?.profilesCvs?.length === 0) {
      setTimeout(() => {
        setOpenBackdrop(false);
      }, 1000);
    }
  }, [profileV3]);

  console.log(profileV3);

  return (
    <div className="profile-cv-container">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <div className="profile-cv-content">
        <div className="profile-cv-title">
          <div className="profile-cv-title_left">
            <p>
              {languageRedux === 1
                ? 'Số CV của bạn:'
                : 'Number of your resume:'}
            </p>
            {profileV3.profilesCvs ? (
              <h3>{profileV3.profilesCvs.length}</h3>
            ) : (
              <></>
            )}
          </div>
          <div className="profile-cv-title_right">
            <Button
              type="primary"
              onClick={() => {
                window.open(`/templates-cv`, '_parent');
              }}
            >
              {/* <UserLineOutCVIcon /> */}
              {languageRedux === 1 ? 'Tạo mới CV' : 'Create a new CV'}
            </Button>
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
        {profileV3?.profilesCvs?.length !== 0 ? (
          <Box
            sx={{ flexGrow: 1 }}
            className="profile-cv-list"
            id="profile-cv-list"
          >
            <Grid container spacing={3} columns={{ xs: 12, sm: 4, md: 12 }}>
              {profileV3?.profilesCvs
                ?.slice() // Tạo một bản sao của mảng để không ảnh hưởng đến mảng gốc
                .sort((a: any, b: any) => {
                  return -1;
                })
                ?.map((item: any, index: number) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <div className="cv-item">
                      <div
                        className="cv-item_left"
                        onClick={() => {
                          // setModalShowCvPdf({
                          //   open: true,
                          //   urlPdf: item.pdfURL,
                          // });
                          window.open(`/pdfView?idPdf=${item.id}`);
                          setLinkPdfUrl(item.pdfURL);
                        }}
                      >
                        <Avatar
                          shape="square"
                          icon={<UserOutlined />}
                          src={item?.imageURL}
                        />
                      </div>
                      <div className="cv-item_right">
                        <div className="cv-item_right__title">
                          <h3>
                            {/* {languageRedux === 1
                          ? `Hồ sơ số ${index + 1}`
                          : `Resume No.${index + 1}`} */}
                            {item?.name}
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
                            onClick={() => handleSelecCv(item)}
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
                          {/* <div
                        className="action-item"
                        onClick={() => handleEditCv(item.id)}
                      >
                        <div className="action-icon">
                          <SectionEditIcon width={24} height={24} />
                        </div>
                        <p>{languageRedux === 1 ? 'Chỉnh sửa' : 'Editor'}</p>
                      </div> */}
                          {/* <div
                        className="action-item"
                        onClick={() => setOpenModalShare(true)}
                      >
                        <div className="action-icon">
                          <ShareCvIcon width={24} height={24} />
                        </div>
                        <p>{languageRedux === 1 ? 'Chia sẻ' : 'Share'}</p>
                      </div> */}
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
                            onClick={() =>
                              setOpenModalDeleteCv({ open: true, item })
                            }
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
            <Backdrop
              sx={{
                color: '#0d99ff ',
                backgroundColor: 'transparent',
                zIndex: (theme: any) => theme.zIndex.drawer + 1,
              }}
              open={openBackdrop}
              //  onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        ) : (
          <Nodata />
        )}

        <div className="banner-containter">
          <div className="banner-content">
            <div className="banner-image">
              <CandidateIcon width={262} height={209} />
            </div>
            <div className="banner-contents">
              <div className="banner-contents_title">
                {languageRedux === 1
                  ? 'Thiết kế CV trên HiJob, bạn có thể:'
                  : 'Designing your CV on HiJob, you can:'}
              </div>
              <div className="banner-content_detail">
                <div className="banner-content_detail_wraper">
                  <div className="banner-content_detail_item">
                    <div className="item_icon">
                      <Icon4PointedStar />
                    </div>
                    <p>
                      {languageRedux === 1
                        ? 'Tạo bản CV chuyên nghiệp và hấp dẫn (tối đa đến 10 bản).'
                        : 'Create a professional and attractive CV (up to 10 copies).'}
                    </p>
                  </div>
                  <div className="banner-content_detail_item">
                    <div className="item_icon">
                      <Icon4PointedStar />
                    </div>
                    <p>
                      {languageRedux === 1
                        ? 'Khả năng thu hút sự chú ý của nhà tuyển dụng.'
                        : 'Ability to attract employer attention.'}
                    </p>
                  </div>
                </div>
                <div className="banner-content_detail_wraper">
                  <div className="banner-content_detail_item">
                    <div className="item_icon">
                      <Icon4PointedStar />
                    </div>
                    <p>
                      {languageRedux === 1
                        ? 'Tiết kiệm thời gian.'
                        : 'Save time.'}
                    </p>
                  </div>
                  <div className="banner-content_detail_item">
                    <div className="item_icon">
                      <Icon4PointedStar />
                    </div>
                    <p>
                      {languageRedux === 1
                        ? 'Cập nhật và chỉnh sửa dễ dàng.'
                        : 'Update and edit easily.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {linkPdfUrl ? (
          <div className="show-cv">
            <div onClick={() => setLinkPdfUrl('')} className="close-show_cv">
              <CloseOutlined style={{ fontSize: '16px', color: '#999999' }} />
            </div>
            <Document
              file={linkPdfUrl} // Thay đổi đường dẫn tới file PDF của bạn
              loading={<Spin indicator={antIcon} />}
              noData={<Spin indicator={antIcon} />}
              onLoadSuccess={onDocumentLoadSuccess}
              className="page-cv-wrapper"
            >
              {Array.apply(null, Array(pageNumber))
                .map((x, i) => i + 1)
                .map((page) => (
                  <Page
                    className="page-cv"
                    loading={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                    noData={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                    pageNumber={page}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                ))}
            </Document>
          </div>
        ) : (
          <></>
        )} */}

        <ModalShowCv
          setModalShowCvPdf={setModalShowCvPdf}
          modalShowCvPDF={modalShowPdf}
        />

        <ModalShare
          openModalShare={openModalShare}
          setOpenModalShare={setOpenModalShare}
        />
        <ModalDeleteCv
          openModalDeleteCv={openModalDeleteCv}
          setOpenModalDeleteCv={setOpenModalDeleteCv}
        />
      </div>
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default ProfileCv;
