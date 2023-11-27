import React, { useState, useRef } from 'react';

// import pdfjsLib from 'jspdf';
// import * as pdfjsLib from 'pdfjs-dist';
import CVItem from '#components/Profile/CV';
import { Button, Popconfirm, Skeleton, Space, message } from 'antd';
import { DownloadCVIcon, PencilIcon, TickIcon } from '#components/Icons';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';
// import { Avatar } from '@mui/material';

import { Avatar } from 'antd';

import ItemApply from '../../components/Item';
import {
  PlusCircleOutlined,
  StarFilled,
  EyeOutlined,
  EyeFilled,
} from '@ant-design/icons';
import ModalProfileInfoPerson from '#components/Profile/ModalProfileInfoPerson';
import ModalProfileContact from '#components/Profile/ModalProfileContact';
import ModalProfileCareerObjectice from '#components/Profile/ModalProfileCareerObjectice';
import ModalProfileEducationCreate from '#components/Profile/ModalProfileEducationCreate';
import ModalProfileLocation from '#components/Profile/ModalProfileLocation';
import ModalProfileExperienceCreate from '#components/Profile/ModalProfileExperienceCreate';
import ModalProifileTypeofWork from '#components/Profile/ModalTypeofWork';
import SectionCv from '../SectionCv';
import profileApi from 'api/profileApi';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from 'store';

import { RootState } from '../../../../store/reducer';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from 'axios';
import apiCv from 'api/apiCv';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import ModalShowCv from '#components/Profile/ModalShowCv';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
import ModalCheckInfo from '#components/Profile/ModalCheckInfo';
interface ItemAppy {
  id?: number | null;
  company_name?: string;
  major?: string;
  start_date?: number;
  end_date?: number;
  extra_information?: string;
  title?: string;
}

interface ICategories {
  child_category_id: number;
  parent_category_id: number;
  parent_category: string;
  child_category: string;
}

interface ICandidateProfile {
  display: string;
  profileMore: any;
  profileCompany: any;
  loading: boolean;
  language: any;
  languageRedux: any;
  openModalCareerObjective: boolean;
  openModalLocation: boolean;
  openModalEducationCreate: boolean;
  openModalExperienceCreate: boolean;
  openModalTypeofWork: boolean;
  setOpenModalCareerObjective: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalLocation: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalEducationCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalExperienceCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalTypeofWork: React.Dispatch<React.SetStateAction<boolean>>;
}

const CandidateProfile: React.FC<ICandidateProfile> = (props) => {
  const {
    display,
    profileMore,
    profileCompany,
    loading,
    language,
    languageRedux,
    openModalCareerObjective,
    openModalLocation,
    openModalEducationCreate,
    openModalExperienceCreate,
    openModalTypeofWork,
    setOpenModalCareerObjective,
    setOpenModalLocation,
    setOpenModalEducationCreate,
    setOpenModalExperienceCreate,
    setOpenModalTypeofWork,
  } = props;
  const dispatch = useDispatch();
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [open, setOpen] = useState(false);
  const [openModalCheckInfo, setOpenModalCheckInfo] = useState(false);
  const [typeOfModalCheckInfo, setTypeOfModalCheckInfo] = useState<any>('');

  const [cvHijob, setCvHijob] = useState<any[]>([1, 2]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [scrollHead, setScrollHead] = useState(-1);

  const [listCv, setListCv] = useState<any[]>([
    {
      id: 4,
      name: 'cv4',
    },
    {
      id: 3,
      name: 'cv3',
    },
    {
      id: 2,
      name: 'cv2',
    },
    {
      id: 1,
      name: 'cv1',
    },
  ]);

  const [modalShowCvPDF, setModalShowCvPdf] = React.useState<{
    open: boolean;
    urlPdf: string;
  }>({
    open: false,
    urlPdf: '',
  });

  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const profileV3More = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );
  const swiperRef = useRef<any>(null);
  const handleChooseCv = async (item: any, e: any) => {
    e.stopPropagation();

    setScrollHead(-1);
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(1);
    }
    setListCv((prev: any) => [
      prev.at(prev.indexOf(item)),
      ...prev
        .filter((value: any, index: any) => {
          return index !== prev.indexOf(item);
        })
        .sort((a: any, b: any) => b.id - a.id),
    ]);
    try {
      messageApi.open({
        key,
        type: 'loading',
        content:
          languageRedux === 1 ? 'Đang xử lý ...' : 'Action in progress..',
        duration: 0,
      });
      const result = await apiCv.putThemeCv(item?.id, 1);
      if (result) {
        const resultProfileV3 = await profileApi.getProfileInformationMoreV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        dispatch(setProfileMeInformationMoreV3(resultProfileV3));
        if (resultProfileV3 && resultProfileV3?.data?.profilesCvs?.length > 0) {
          messageApi.open({
            key,
            type: 'success',
            content:
              languageRedux === 1
                ? 'Đổi CV thành công'
                : languageRedux === 2 ? 'Successfully changed CV'
                  : '이력서를 성공적으로 변경했습니다.',
          });
        }
      }
    } catch (error) { }
  };

  // confirm delete cv
  const confirm = async () => {
    try {
      const result = await profileApi.deleteCV();
      if (result) {
        const result = await profileApi.getProfile(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (result) {
          setProfileUser(result.data);
        }
        setOpen(false);
        setFileList([]);
        message.success(language?.profile_page?.alert_delete_cv_success);
      }
    } catch (error) { }
  };

  // cancel delete cv
  const cancel = () => {
    setOpen(false);
    message.error(language?.profile_page?.cancel);
  };

  // const getListCv = async () => {
  //   try {
  //     const result = await
  //   } catch (error) {

  //   }
  // }

  // const

  const handleDownloadCV = async (pdfUrl: any, name: string) => {
    try {
      const response = await axios.get(pdfUrl, {
        responseType: 'blob', // Để nhận dạng kiểu dữ liệu là blob (binary data)
      });

      // console.log('response', response);
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

  const handleClickItemCv = async (id: number) => {
    // setModalShowCvPdf({ open: true, id });
    window.open(`/pdfView?idPdf=${id}`);
  };

  // const handleShow = () => {
  //   var pdfViewer = document.getElementById('pdfViewer');
  //   // Sử dụng PDF.js để hiển thị PDF từ URL
  //   pdfjsLib.getDocument('pdfUrl').promise.then(function (pdfDoc: any) {
  //     var numPages = pdfDoc.numPages;
  //     var currentPage = 1; // Trang mặc định là trang đầu tiên

  //     // Hiển thị trang đầu tiên
  //     pdfDoc.getPage(currentPage).then(function (page: any) {
  //       var canvas = document.createElement('canvas');
  //       var context = canvas.getContext('2d');
  //       var viewport = page.getViewport({ scale: 1.0 }); // Điều chỉnh scale nếu cần
  //       canvas.height = viewport.height;
  //       canvas.width = viewport.width;
  //       if (pdfViewer) {
  //         pdfViewer.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
  //         pdfViewer.appendChild(canvas);
  //         page.render({
  //           canvasContext: context,
  //           viewport: viewport,
  //         });
  //       }

  //       // Vẽ nội dung PDF lên canvas
  //     });
  //   });
  // };

  const moveToCreateCV = () => {
    if (
      profileV3.name === 'Your name' ||
      profileV3.phone === '' ||
      profileV3.birthday === null ||
      profileV3.addressText === null ||
      profileV3.jobTypeName === null ||
      profileV3.jobTypeName === 'null' ||
      profileV3.avatarPath === null ||
      profileV3.email === null ||
      profileV3.introduction === null
    ) {
      setOpenModalCheckInfo(true);
      setTypeOfModalCheckInfo('upInfo');
      return;
    }
    if (
      profileV3More.profilesJobType === null ||
      profileV3More.profilesEducations.length === 0 ||
      profileV3More.profilesExperiences.length === 0 ||
      profileV3More.profilesSkills.length === 0 ||
      profileV3More.profilesLanguages.length === 0 ||
      profileV3More.profileHobbies === null ||
      profileV3More.profilesReferences.length === 0 ||
      profileV3More.profileActivities.length === 0 ||
      profileV3More.profileAwards.length === 0
    ) {
      setOpenModalCheckInfo(true);
      setTypeOfModalCheckInfo('upInfoMore');
      return;
    }
    window.open('/templates-cv', '_parent');
  };

  return (
    <div style={{ display: display, width: '100%' }}>
      {contextHolder}
      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1
              ? 'Lĩnh vực quan tâm'
              : languageRedux === 2
                ? 'Career objective'
                : '관심 분야'}</h3>
            <Space
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenModalCareerObjective(true)}
            >
              <div className="edit-icon">
                <PencilIcon width={15} height={15} />
              </div>

              <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                {languageRedux === 1
                  ? 'Sửa'
                  : languageRedux === 2
                    ? 'Edit'
                    : '고치다'}
              </p>
            </Space>
          </div>
          <Space wrap className="item-info-work">
            {profileV3?.profileCategories?.length !== 0
              ? profileV3?.profileCategories?.map(
                (item: any, index: number) => (
                  <Button key={index} className="btn" type="text">
                    {item.parentCategory.fullName}
                    {'/ '}
                    {item.fullName}
                  </Button>
                ),
              )
              : languageRedux === 1
                ? 'Chưa cập nhật'
                : languageRedux === 2
                  ? 'Not updated yet'
                  : languageRedux === 3 && '업데이트하지 않음'}
          </Space>
        </div>
      </Skeleton>
      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1
              ? 'Khu vực làm việc'
              : languageRedux === 2
                ? 'Working location'
                : languageRedux === 3 &&
                '근무 위치'}</h3>
            <Space
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenModalLocation(true)}
            >
              <div className="edit-icon">
                <PencilIcon width={15} height={15} />
              </div>

              <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                {languageRedux === 1
                  ? 'Sửa'
                  : languageRedux === 2
                    ? 'Edit'
                    : '고치다'}
              </p>
            </Space>
          </div>
          <Space wrap className="item-info-work">
            {profileV3?.profileLocations?.length !== 0
              ? profileV3?.profileLocations?.map((item: any, index: number) => (
                <Button key={index} className="btn" type="text">
                  {item?.fullName}
                  {', '}
                  {item?.province?.fullName}
                </Button>
              ))
              : languageRedux === 1
                ? 'Chưa cập nhật'
                : languageRedux === 2
                  ? 'Not updated yet'
                  : languageRedux === 3 && '업데이트하지 않음'}
          </Space>
        </div>
      </Skeleton>

      {/* vi tri */}

      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>
              {languageRedux === 1
                ? 'Loại hình công việc'
                : languageRedux === 2
                  ? 'Type of work'
                  : languageRedux === 3 && '일의 종류'}
            </h3>
            <Space
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenModalTypeofWork(true)}
            >
              <div className="edit-icon">
                <PencilIcon width={15} height={15} />
              </div>

              <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                {languageRedux === 1
                  ? 'Sửa'
                  : languageRedux === 2
                    ? 'Edit'
                    : '고치다'}
              </p>
            </Space>
          </div>
          <Space wrap className="item-info-work">
            <Button className="btn" type="text">
              {profileV3More.jobTypeId === 1
                ? languageRedux === 1
                  ? 'Toàn thời gian'
                  : languageRedux === 2
                    ? 'Fulltime'
                    : languageRedux === 3 && '풀 타임'
                : profileV3More.jobTypeId === 2
                  ? languageRedux === 1
                    ? 'Bán thời gian'
                    : languageRedux === 2
                      ? 'Part time'
                      : '파트타임'
                  : profileV3More.jobTypeId === 4
                    ? languageRedux === 1
                      ? 'Làm việc tự do'
                      : languageRedux === 2
                        ? 'Freelancer'
                        : languageRedux === 3 && '자유롭게 일하세요'
                    : profileV3More.jobTypeId === 7
                      ? languageRedux === 1
                        ? 'Thực tập'
                        : languageRedux === 2
                          ? 'Intern'
                          : languageRedux === 3 && '인턴'
                      : languageRedux === 1
                        ? 'Chưa cập nhật'
                        : languageRedux === 2
                          ? 'Not updated yet'
                          : languageRedux === 3 && '업데이트하지 않음'}
            </Button>
          </Space>
        </div>
      </Skeleton>

      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>
              {languageRedux === 1
                ? 'Hồ sơ CV/Hồ sơ để ứng tuyển'
                : languageRedux === 2 ?
                  'Profile CV/Resume to apply' :
                  '이력서/지원서'}
            </h3>
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                // display: profileV3?.profilesCvs?.length === 0 ? 'none' : 'flex',
              }}
            // onClick={() => setOpenModalLocation(true)}
            >
              {/* <div className="edit-icon">
                <PencilIcon width={15} height={15} />
              </div> */}

              <Button
                type="primary"
                shape="round"
                style={{ background: '#0D99FF', fontSize: '14px' }}
                onClick={moveToCreateCV}
              >
                {/* {languageRedux === 1
              ? 'Sửa'
              : languageRedux === 2
                ? 'Edit'
                : '고치다'} */}
                {languageRedux === 1 ? 'Tạo mới CV'
                  : languageRedux === 2 ? 'Create a new CV' :
                    '새 이력서 만들기'}
              </Button>
              <p
                style={{
                  color: '#0D99FF',
                  fontSize: '14px',
                  display:
                    profileMore?.profilesCvs?.length === 0 ? 'none' : 'flex',
                }}
                onClick={() => window.open('/profile-cv', '_parent')}
              >
                {/* {languageRedux === 1
              ? 'Sửa'
              : languageRedux === 2
                ? 'Edit'
                : '고치다'} */}
                {languageRedux === 1
                  ? 'Xem tất cả'
                  : languageRedux === 2
                    ? 'View all'
                    : languageRedux === 3 && '다 보기'}
              </p>
            </div>
          </div>
          <div className="list-cv-container">
            {profileMore.profilesCvs?.length !== 0 ? (
              <div className="list-cv-conttent">
                <p>
                  {languageRedux === 1
                    ? 'Chọn HiJob CV/Resume của bạn để Nhà tuyển dụng xem, đánh giá và lựa chọn!'
                    : languageRedux === 2 ?
                      'Choose your HiJob CV/Resume for Employers to view, evaluate and select!'
                      : '고용주가 보고 평가하고 선택할 수 있도록 HiJob 이력서/이력서를 선택하세요!'}
                </p>
                <Swiper
                  // navigation={true}
                  slidesPerView="auto"
                  spaceBetween={17}
                  modules={[Mousewheel, Navigation, Pagination]}
                  className="list-cv-swiper"
                  ref={swiperRef}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                >
                  {profileMore?.profilesCvs
                    ?.slice() // Tạo một bản sao của mảng để không ảnh hưởng đến mảng gốc
                    .sort((a: any, b: any) => {
                      // Sắp xếp mục có status === 1 lên đầu
                      if (a.status === 1 && b.status !== 1) {
                        return -1;
                      }
                      if (a.status !== 1 && b.status === 1) {
                        return 1;
                      }
                      return 0; // Giữ nguyên thứ tự ban đầu cho các mục khác
                    })
                    ?.map((item: any, index: number) => {
                      return (
                        <SwiperSlide
                          key={index}
                          onClick={(event) => {
                            handleClickItemCv(item.id);
                          }}
                        >
                          <div className="slide-item" key={item}>
                            {/* <Avatar src={item?.imageURL}>
                            {`CV ${item.id}`}
                            <div
                              className="choose-cv-container"
                              onClick={(e) => handleChooseCv(item, e)}
                            >
                              <div
                                className={
                                  cvId === item.id
                                    ? 'choose-cv-content checked'
                                    : 'choose-cv-content'
                                }
                              >
                                <TickIcon />
                              </div>
                            </div>
                          </Avatar> */}

                            <div className="wrap-img_cv check-hover-cv">
                              <div className="warp-img"></div>
                              <img src={item?.imageURL} alt={item.name} />

                              <div className="choose-cv-container">
                                {/* <div
                                  className={
                                    item.status === 1
                                      ? 'choose-cv-content checked'
                                      : 'choose-cv-content'
                                  }
                                >
                                  <TickIcon />
                                </div> */}

                                {item?.status === 0 ? (
                                  <div
                                    className="select-cv-defauld"
                                    onClick={(e) => handleChooseCv(item, e)}
                                  >
                                    <span className="text-cv-default">
                                      {languageRedux === 1
                                        ? 'Đặt làm CV chính'
                                        : languageRedux === 2
                                          ? 'Set as main CV'
                                          : '주요 이력서로 설정'}
                                    </span>

                                    <span
                                      style={{ marginLeft: '4px' }}
                                      className="text-cv-icon-star"
                                    >
                                      <StarFilled
                                        style={{ fontSize: '16px' }}
                                      />
                                    </span>
                                  </div>
                                ) : (
                                  <div
                                    className="select-cv-defauld cv-default"
                                    onClick={(e) => handleChooseCv(item, e)}
                                  >
                                    <span
                                      style={{ color: '#ffffff' }}
                                      className="text-cv-default"
                                    >
                                      {languageRedux === 1
                                        ? 'CV chính'
                                        : languageRedux === 2
                                          ? 'Main CV'
                                          : '주요 이력서'}
                                    </span>

                                    <span style={{ marginLeft: '4px' }}>
                                      <StarFilled
                                        style={{
                                          fontSize: '16px',
                                          color: '#ff0',
                                        }}
                                      />
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="slide-item-bottom">
                              <h3>
                                {/* {languageRedux === 1
                                  ? `Hồ sơ số ${item.id}`
                                  : `Resume No.${item.id}`} */}
                                {item.name}
                              </h3>
                              <div
                                // to=""
                                // download={item?.pdfURL}
                                className="download-cv-icon"
                                onClick={() =>
                                  handleDownloadCV(item?.pdfURL, item?.name)
                                }
                              // onClick={handleClickDownloadCv}
                              >
                                <DownloadCVIcon width={14} height={14} />
                              </div>
                              {/* <div onClick={handleShow}>Show</div> */}
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            ) : (
              <Space direction="vertical" align="start">
                <p>
                  {languageRedux === 1
                    ? 'Bạn chưa có HiJob CV/Resume để Nhà tuyển dụng xem, đánh giá và lựa chọn!'
                    : languageRedux === 2 ?
                      "You don't have a HiJob CV/Resume for recruitment to view, evaluate and choose!"
                      : '채용 시 보고 평가하고 선택할 수 있는 HiJob 이력서/이력서가 없습니다!'}
                </p>
                <img style={{ width: 200 }} src="/cv3 1.png" alt="CV" />
              </Space>
            )}
          </div>
        </div>
      </Skeleton>

      <div id="pdfViewer"></div>

      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1
              ? 'Trình độ học vấn'
              : languageRedux === 2
                ? 'Education'
                : languageRedux === 3 && '최종학력'}</h3>
          </div>
          {profileMore?.profilesEducations?.length !== 0 ? (
            profileMore?.profilesEducations?.map(
              (education: ItemAppy, index: number) => (
                <ItemApply item={education} key={index} />
              ),
            )
          ) : (
            <div style={{ marginTop: '16px' }}>{languageRedux === 1
              ? 'Chưa cập nhật'
              : languageRedux === 2
                ? 'Not updated yet'
                : languageRedux === 3 && '업데이트하지 않음'}</div>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Space
              style={{ alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setOpenModalEducationCreate(true)}
            >
              <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

              <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                {languageRedux === 1
                  ? 'Thêm'
                  : languageRedux === 2
                    ? 'Add'
                    : '더'}
              </p>
            </Space>
          </div>
        </div>
      </Skeleton>
      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1
              ? 'Kinh nghiệm làm việc'
              : languageRedux === 2
                ? 'Working experience'
                : '업무 경험'}</h3>
          </div>
          {profileMore?.profilesExperiences?.length !== 0 ? (
            profileMore?.profilesExperiences?.map(
              (item: any, index: number) => (
                <ItemApply typeItem="experiences" key={index} item={item} />
              ),
            )
          ) : (
            <div style={{ marginTop: '16px' }}>{languageRedux === 1
              ? 'Chưa cập nhật'
              : languageRedux === 2
                ? 'Not updated yet'
                : languageRedux === 3 && '업데이트하지 않음'}</div>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Space
              style={{ alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setOpenModalExperienceCreate(true)}
            >
              <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

              <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                {languageRedux === 1
                  ? 'Thêm'
                  : languageRedux === 2
                    ? 'Add'
                    : '더'}
              </p>
            </Space>
          </div>
        </div>

        <ModalProfileCareerObjectice
          openModalCareerObjective={openModalCareerObjective}
          setOpenModalCareerObjective={setOpenModalCareerObjective}
          categories={profileV3?.profileCategories}
        />

        <ModalProfileEducationCreate
          openModalEducationCreate={openModalEducationCreate}
          setOpenModalEducationCreate={setOpenModalEducationCreate}
          typeItem="createEducation"
          educations={profileMore?.profilesEducations}
        />
        <ModalProfileLocation
          openModalLocation={openModalLocation}
          setOpenModalLocation={setOpenModalLocation}
          locations={profileV3?.profileLocations}
        />

        <ModalProifileTypeofWork
          setOpenModalTypeofWork={setOpenModalTypeofWork}
          openModalTypeofWork={openModalTypeofWork}
          jobTypeId={profileV3.jobTypeId}
        />

        <ModalProfileExperienceCreate
          openModalExperienceCreate={openModalExperienceCreate}
          setOpenModalExperienceCreate={setOpenModalExperienceCreate}
          typeItem="createExperience"
          educations={profileMore?.profilesExperiences}
        />

        <ModalShowCv
          modalShowCvPDF={modalShowCvPDF}
          setModalShowCvPdf={setModalShowCvPdf}
        />

        <ModalCheckInfo
          openModalCheckInfo={openModalCheckInfo}
          setOpenModalCheckInfo={setOpenModalCheckInfo}
          type={typeOfModalCheckInfo}
        />
      </Skeleton>
      <SectionCv
        loading={loading}
        languageRedux={languageRedux}
        language={language}
      />
      {profileMore.cv_url ? (
        <Skeleton className="skeleton-item" loading={loading} active>
          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                justifyContent: 'space-between',
              }}
            >
              <h3>
                {languageRedux === 1 ? 'Cv/Hồ sơ của bạn' : 'Your CV/ Resume'}
              </h3>

              <p>
                {languageRedux === 1
                  ? 'CV/Resume của bạn để ứng tuyển cùng HiJob!'
                  : 'Your CV/Resume to apply with HiJob!'}
              </p>
            </div>
            <Space
              wrap
              size={20}
              direction="vertical"
              style={{ marginTop: 20 }}
              className="cv-input-container"
            >
              <div
                // align="center"
                style={{
                  marginLeft: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              // direction="vertical"
              >
                <Popconfirm
                  title={language?.profile_page?.delete_cv}
                  description={language?.profile_page?.alert_delete_cv}
                  open={open}
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText={language?.yes}
                  cancelText={language?.no}
                >
                  <CVItem
                    url={profileMore.cv_url}
                    open={open}
                    setOpen={setOpen}
                    isProfile={true}
                    language={language}
                  />
                </Popconfirm>
              </div>
            </Space>
          </div>
        </Skeleton>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CandidateProfile;
