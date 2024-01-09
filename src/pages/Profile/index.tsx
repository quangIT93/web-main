import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// @ts-ignore
import { CameraIcon, PencilIcon } from '#components/Icons';

import './style.scss';
// import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Space, Skeleton, Row } from 'antd';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { RootState } from '../../store/reducer/index';
// import ItemApply from './components/Item';

// import apiCompany from 'api/apiCompany';

// Import Swiper
// import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
// import { Navigation, Mousewheel, Pagination } from 'swiper';

import ModalProfileInfoPerson from '#components/Profile/ModalProfileInfoPerson';
// import ModalProfileCareerObjectice from '#components/Profile/ModalProfileCareerObjectice';
import ModalProfileContact from '#components/Profile/ModalProfileContact';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import profileApi from 'api/profileApi';
// import { setProfileV3 } from 'store/reducer/profileReducerV3';

// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../store/index';

import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
import {
  setAlertSuccess,
  setAlertLackInfo,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';
import CreateCv from '#components/Profile/CreateCv';
import ChangeRoleButton from './components/ChangeRoleButton';
import CandidateProfile from './components/CandidateProfile';
// import Company from 'pages/Company';
import ModalIntroduceCv from '#components/Profile/ModalIntroduceCv';
// import { prototype } from 'module';
import CompanyRole from './components/CompanyRole';
import { setProfileMeCompanyV3 } from 'store/reducer/profileMeCompanyReducerV3';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
// import Overview from './components/Overview';
import styles from './style.module.scss';
import { CustomSkeleton } from '#components/CustomSkeleton';

import { DataLog, DataLogRecuiter } from 'pages/LogChart/typeChart';
import ItemsChart from '#components/LogChart/ItemsChart';
import { Link } from 'react-router-dom';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// interface ItemAppy {
//   id?: number | null;
//   company_name?: string;
//   major?: string;
//   start_date?: number;
//   end_date?: number;
//   extra_information?: string;
//   title?: string;
// }

// interface ICategories {
//   child_category_id: number;
//   parent_category_id: number;
//   parent_category: string;
//   child_category: string;
// }
const Profile: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const dispatch = useDispatch();
  // const { setProfileUser } = bindActionCreators(actionCreators, dispatch);
  // const [dataProfile, setDataProfile] = useState(null)

  // const { profile, error }: any = useSelector(
  //   (state: RootState) => state.profile
  // )

  // const profile = useSelector((state: RootState) => state.profileUser);
  // const profileUser = useSelector((state: RootState) => state.profile.profile);
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const profileMorev3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );
  const profileComanyV3 = useSelector(
    (state: RootState) => state.dataProfileCompanyV3.data,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [openModelPersonalInfo, setOpenModalPersonalInfo] = useState(false);
  const [openModalContact, setOpenModalContact] = useState(false);
  const [openModalCareerObjective, setOpenModalCareerObjective] =
    useState(false);
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const [openModalEducationCreate, setOpenModalEducationCreate] =
    useState(false);

  const [openModalExperienceCreate, setOpenModalExperienceCreate] =
    useState(false);

  const [openModalTypeofWork, setOpenModalTypeofWork] = React.useState(false);

  // const [imageInfo, setImageInfo] = useState<string>('');
  // const [avatarUrl, setAvatarUrl] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [dataLog, setDataLog] = useState<DataLog | undefined>(undefined);
  const [dataLogRecruiter, setDataLogRecruiter] = useState<
    DataLogRecuiter | undefined
  >(undefined);
  // const [role, setRole] = useState(roleRedux)

  // const [user, setUser] = useState<any>(null);

  const analytics: any = getAnalytics();

  // const handleGetProfileV3 = async () => {
  //   try {
  //     const result = await profileApi.getProfileV3('vi');

  //     if (result) {
  //       dispatch(setProfileV3(result));
  //     }
  //   } catch (error) {}
  // };

  // React.useEffect(() => {
  //   handleGetProfileV3();
  // }, []);

  // console.log('profileV3', profileV3);

  // console.log(listCv);

  // React.useEffect(() => {
  //   // Cập nhật title và screen name trong Firebase Analytics
  //   logEvent(analytics, 'screen_view' as string, {
  //     // screen_name: screenName as string,
  //     page_title: '/web_profile' as string,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics

    document.title =
      languageRedux === 1
        ? 'HiJob - Tìm việc làm, tuyển dụng'
        : languageRedux === 2
        ? 'HiJob - Find a job, recruit'
        : 'HiJob - 일자리 찾기, 채용';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_hotJob' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguage(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);

  // console.log("language", language);

  // fecth data
  useEffect(() => {
    // Gọi action để lấy thông tin profile
    if (!localStorage.getItem('accessToken')) {
      window.location.replace(`/`);
      return;
    }
    // setLoading(true);
    // dispatch<any>(getProfile());
    //   .unwrap()
    //   .catch((err: any) => {

    //   })
    // fecthDataProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileV3]);

  React.useEffect(() => {
    if (profileV3.length !== 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [profileV3]);

  const handleAvatarClick = () => {
    // Khi click vào SmallAvatar, thực hiện hành động tương ứng
    const fileInput = document.getElementById('avatar-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageChange = async (e: any) => {
    // const file = e.target.files[0]
    const files = Array.from(e.target.files); // Chuyển đổi FileList thành mảng các đối tượng file
    if (files) {
      await uploadImage(e, files);

      // window.location.reload();
      // if (imageUrl)
      // Cập nhật URL của ảnh mới vào trạng thái của component
      // setAvatarUrl(imageUrl);
    }
  };

  // upload avatar
  const uploadImage = async (e: any, files: any) => {
    const formData = new FormData();

    files.forEach((file: File) => {
      if (file instanceof File) {
        formData.append(`images`, file);
      }
    });
    try {
      const response = await profileApi.postAvatar(formData);
      if (response) {
        const getProfileV3 = await profileApi.getProfileInformationV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        dispatch(setProfileMeInformationV3(getProfileV3) as any);
        return getProfileV3.data.avatarPath;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error(error);
      // Xử lý lỗi tải lên ảnh
    }
  };

  const getProfileMore = async () => {
    try {
      if (profileV3.typeRoleData === 1) {
        const result = await profileApi.getProfileCompanyV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        dispatch(setProfileMeCompanyV3(result));
      } else if (profileV3.typeRoleData === 0) {
        const result = await profileApi.getProfileInformationMoreV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        dispatch(setProfileMeInformationMoreV3(result));
      }
    } catch (error) {
      dispatch(setProfileMeCompanyV3([]));
    }
  };

  useEffect(() => {
    if (profileV3.length !== 0) getProfileMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileV3]);

  const alert = useSelector((state: any) => state.alertProfile.alert);
  const alertSuccess = useSelector(
    (state: any) => state.alertProfile.alertSuccess,
  );
  const alertLackInfo = useSelector(
    (state: any) => state.alertProfile.alertLackInfo,
  );

  const alertEditInfo = useSelector(
    (state: any) => state.alertProfile.alertEditInfo,
  );

  const handleClose = () => dispatch<any>(setAlert(false));
  const handleCloseAlertCv = () => dispatch<any>(setAlertSuccess(false));
  const handleCloseLackInfo = () => dispatch<any>(setAlertLackInfo(false));
  const handleCloseEditInfo = () => dispatch<any>(setAlertEditInfo(false));

  const handleSendMail = (email: any) => {
    const emailLink = 'mailto:' + email;
    window.location.href = emailLink;
  };

  const handleMoveToLink = (link: any) => {
    if (link) {
      window.open(link);
    }
  };

  const dataChart = async () => {
    const result = await profileApi.activityLog();
    if (result) {
      setDataLog({ type: 'Normal', ...result.data });
      setDataLogRecruiter(undefined);
    }
  };

  const dataChartRecruiter = async () => {
    const result = await profileApi.activityLogRecruiter();
    if (result) {
      setDataLogRecruiter({ type: 'Recuiter', ...result.data });
      setDataLog(undefined);
    }
  };

  useEffect(() => {
    if (profileV3 && profileV3.typeRoleData === 0) {
      dataChart();
    } else {
      dataChartRecruiter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elements: React.ReactNode[] = Array.from({ length: 3 }, (_, index) => (
    <React.Fragment key={index} />
  ));

  return (
    <div className="profile">
      {/* <Navbar />s
      <CategoryDropdown /> */}
      <div className="containerProfile">
        <Skeleton className="skeleton-item" avatar loading={loading} active>
          <div className="div-profile-avatar">
            <div className="div-avatar">
              <div className="div-avatar_profile">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <div style={{ position: 'relative' }}>
                      {/* <SmallAvatar
                        alt="Remy Sharp"
                        src="/logoH2.png"
                        sizes="10"
                        onClick={handleAvatarClick} // Xử lý click vào SmallAvatar
                        sx={{ cursor: 'pointer' }}
                      /> */}
                      {/* <InstagramFilled
                        onClick={handleAvatarClick}
                        style={{ fontSize: 25, color: 'gray' }}
                      /> */}
                      <div
                        onClick={handleAvatarClick}
                        style={{
                          // fontSize: 25,
                          color: 'gray',
                          cursor: 'pointer',
                          background: '#ffffff',
                          // border: '1px solid #0d99ff ',

                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <CameraIcon />
                      </div>

                      <input
                        id="avatar-input"
                        type="file"
                        name="images"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  }
                >
                  <Avatar
                    style={{ height: '70px', width: '70px' }}
                    alt="Ảnh lỗi"
                    src={profileV3?.avatarPath ? profileV3?.avatarPath : ''}
                  />
                </Badge>
                <div className="user-company" style={{ marginLeft: '10px' }}>
                  <h2>
                    {profileV3?.name
                      ? profileV3?.name
                      : languageRedux === 1
                      ? 'Chưa cập nhật'
                      : languageRedux === 2
                      ? 'Not updated yet'
                      : languageRedux === 3 && '업데이트하지 않음'}
                  </h2>
                  <ChangeRoleButton />
                  {/* <Overview /> */}

                  {/* <div className="wrap-company">
                    <div className="wrap-company_info">
                      <h2
                        className={
                          companyName ? 'have-company' : 'company-name'
                        }
                        onClick={() => {
                          window.open('/company-infor', '_self');
                        }}
                      >
                        {companyName ? companyName : language?.company_info}
                      </h2>

                      <h2>|</h2>

                      <h2>
                        {companyName
                          ? language?.profile_page?.can_post_now
                          : language?.profile_page?.should_register}
                      </h2>
                    </div>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (companyName) {
                          window.open('/post', '_self');
                        } else {
                          window.open('/company-infor', '_self');
                        }
                      }}
                    >
                      <LoginArrowIcon />
                      {companyName
                        ? language?.profile_page?.create_post
                        : language?.profile_page?.register_now}
                    </Button>
                  </div> */}
                  {/* <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '5px',
                    }}
                  >
                    <img src="/images/profile/HiCoin.png" alt={languageRedux === 1
                  ? 'Hình ảnh bị lỗi'
                  : languageRedux === 2
                    ? 'Image is corrupted'
                    : '이미지가 손상되었습니다'} />
                    <p style={{ marginLeft: '5px' }}>0</p>
                  </div> */}
                </div>
              </div>
              {/* <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                style={{ backgroundColor: '#FBBC04' }}
              >
                HiCoin
              </Button> */}
            </div>
            <div
              style={{
                whiteSpace: 'pre-wrap',
                marginTop: '20px',
                overflowWrap: 'break-word',
                color: '#575757',
              }}
            >
              {profileV3?.introduction
                ? profileV3?.introduction
                : languageRedux === 1
                ? 'Chưa cập nhật'
                : languageRedux === 2
                ? 'Not updated yet'
                : languageRedux === 3 && '업데이트하지 않음'}
            </div>
          </div>
        </Skeleton>

        <div className={styles.chart_itemsChartProfile}>
          <div className={styles.wrap_title}>
            <h3 className={styles.title_chartProfile}>
              {languageRedux === 1
                ? 'Tổng quan hoạt động'
                : languageRedux === 2
                ? 'Activity overview'
                : '활동 대시보드'}
            </h3>
            <Link to="/profile-chart" className={styles.wrap_title__right}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_13953_66996)">
                  <path
                    d="M8.25 13.5V12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25C9.19891 11.25 9.38968 11.329 9.53033 11.4697C9.67098 11.6103 9.75 11.8011 9.75 12V13.5C9.75 13.6989 9.67098 13.8897 9.53033 14.0303C9.38968 14.171 9.19891 14.25 9 14.25C8.80109 14.25 8.61032 14.171 8.46967 14.0303C8.32902 13.8897 8.25 13.6989 8.25 13.5ZM12 14.25C12.1989 14.25 12.3897 14.171 12.5303 14.0303C12.671 13.8897 12.75 13.6989 12.75 13.5V11.25C12.75 11.0511 12.671 10.8603 12.5303 10.7197C12.3897 10.579 12.1989 10.5 12 10.5C11.8011 10.5 11.6103 10.579 11.4697 10.7197C11.329 10.8603 11.25 11.0511 11.25 11.25V13.5C11.25 13.6989 11.329 13.8897 11.4697 14.0303C11.6103 14.171 11.8011 14.25 12 14.25ZM15 14.25C15.1989 14.25 15.3897 14.171 15.5303 14.0303C15.671 13.8897 15.75 13.6989 15.75 13.5V10.5C15.75 10.3011 15.671 10.1103 15.5303 9.96967C15.3897 9.82902 15.1989 9.75 15 9.75C14.8011 9.75 14.6103 9.82902 14.4697 9.96967C14.329 10.1103 14.25 10.3011 14.25 10.5V13.5C14.25 13.6989 14.329 13.8897 14.4697 14.0303C14.6103 14.171 14.8011 14.25 15 14.25ZM20.25 7.5V16.5H21C21.1989 16.5 21.3897 16.579 21.5303 16.7197C21.671 16.8603 21.75 17.0511 21.75 17.25C21.75 17.4489 21.671 17.6397 21.5303 17.7803C21.3897 17.921 21.1989 18 21 18H12.75V19.6294C13.2504 19.8063 13.6722 20.1544 13.9407 20.6122C14.2093 21.07 14.3073 21.6081 14.2176 22.1312C14.1278 22.6543 13.856 23.1288 13.4502 23.471C13.0444 23.8131 12.5308 24.0007 12 24.0007C11.4692 24.0007 10.9556 23.8131 10.5498 23.471C10.144 23.1288 9.87216 22.6543 9.7824 22.1312C9.69265 21.6081 9.79072 21.07 10.0593 20.6122C10.3278 20.1544 10.7496 19.8063 11.25 19.6294V18H3C2.80109 18 2.61032 17.921 2.46967 17.7803C2.32902 17.6397 2.25 17.4489 2.25 17.25C2.25 17.0511 2.32902 16.8603 2.46967 16.7197C2.61032 16.579 2.80109 16.5 3 16.5H3.75V7.5C3.35218 7.5 2.97064 7.34196 2.68934 7.06066C2.40804 6.77936 2.25 6.39782 2.25 6V4.5C2.25 4.10218 2.40804 3.72064 2.68934 3.43934C2.97064 3.15804 3.35218 3 3.75 3H20.25C20.6478 3 21.0294 3.15804 21.3107 3.43934C21.592 3.72064 21.75 4.10218 21.75 4.5V6C21.75 6.39782 21.592 6.77936 21.3107 7.06066C21.0294 7.34196 20.6478 7.5 20.25 7.5ZM12.75 21.75C12.75 21.6017 12.706 21.4567 12.6236 21.3333C12.5412 21.21 12.4241 21.1139 12.287 21.0571C12.15 21.0003 11.9992 20.9855 11.8537 21.0144C11.7082 21.0433 11.5746 21.1148 11.4697 21.2197C11.3648 21.3246 11.2934 21.4582 11.2644 21.6037C11.2355 21.7492 11.2503 21.9 11.3071 22.037C11.3639 22.1741 11.46 22.2912 11.5833 22.3736C11.7067 22.456 11.8517 22.5 12 22.5C12.1989 22.5 12.3897 22.421 12.5303 22.2803C12.671 22.1397 12.75 21.9489 12.75 21.75ZM3.75 6H20.25V4.5H3.75V6ZM18.75 7.5H5.25V16.5H18.75V7.5Z"
                    fill="#252525"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13953_66996">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h3 className={styles.detail_activities}>Xem chi tiết</h3>
            </Link>
          </div>

          {dataLog ? (
            <ItemsChart dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : dataLogRecruiter ? (
            <ItemsChart dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : (
            <Row className={styles.row}>
              {elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
            </Row>
          )}
        </div>

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
                  ? 'Thông tin cá nhân'
                  : languageRedux === 2
                  ? 'Personal Information'
                  : '개인 정보'}
              </h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalPersonalInfo(true)}
              >
                <div className="edit-icon">
                  <PencilIcon width={15} height={15} />
                </div>
                <p
                  style={{
                    color: '#0D99FF',
                    fontSize: '14px',
                  }}
                >
                  {languageRedux === 1
                    ? 'Sửa'
                    : languageRedux === 2
                    ? 'Edit'
                    : '수정'}
                </p>
              </Space>
            </div>
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>
                  {languageRedux === 1
                    ? 'Ngày sinh'
                    : languageRedux === 2
                    ? 'Date of birth'
                    : '생년월일'}
                </p>
                <p>
                  {languageRedux === 1
                    ? 'Giới tính'
                    : languageRedux === 2
                    ? 'Gender'
                    : '성별'}
                </p>
                <p>
                  {languageRedux === 1
                    ? 'Địa chỉ'
                    : languageRedux === 2
                    ? 'Location'
                    : '주소'}
                </p>
                <p>
                  {languageRedux === 1
                    ? 'Vị trí ứng tuyển'
                    : languageRedux === 2
                    ? 'Position'
                    : languageRedux === 3
                    ? '희망 직업'
                    : 'Vị trí ứng tuyển'}
                </p>
              </div>
              <div className="div-detail-row right">
                <p>
                  {profileV3?.birthday
                    ? moment(new Date(profileV3?.birthday)).format('DD/MM/yyyy')
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>
                <p>
                  {profileV3?.genderText
                    ? profileV3?.genderText
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>
                <p>
                  {profileV3?.addressText?.fullName
                    ? profileV3?.addressText?.fullName
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>
                <p>
                  {profileV3?.jobTypeName
                    ? profileV3?.jobTypeName
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>
              </div>
            </div>
          </div>
          {openModelPersonalInfo ? (
            <ModalProfileInfoPerson
              openModelPersonalInfo={openModelPersonalInfo}
              setOpenModalPersonalInfo={setOpenModalPersonalInfo}
              profile={profileV3}
            />
          ) : (
            <></>
          )}
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
                  ? 'Thông tin liên hệ'
                  : languageRedux === 2
                  ? 'Contact information'
                  : languageRedux === 3
                  ? '연락처'
                  : 'Thông tin liên hệ'}
              </h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalContact(true)}
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
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>
                  {languageRedux === 1
                    ? 'Số điện thoại'
                    : languageRedux === 2
                    ? 'Phone number'
                    : '전화 번호'}
                </p>
                <p>
                  {languageRedux === 1
                    ? 'Email'
                    : languageRedux === 2
                    ? 'Email'
                    : '이메일'}
                </p>

                <p>
                  {languageRedux === 1
                    ? 'Facebook'
                    : languageRedux === 2
                    ? 'Facebook'
                    : '페이스북'}
                </p>

                <p>
                  {languageRedux === 1
                    ? 'LinkedIn'
                    : languageRedux === 2
                    ? 'LinkedIn'
                    : '링크드인'}
                </p>
              </div>
              <div className="div-detail-row right">
                <p>
                  {profileV3?.phone
                    ? profileV3?.phone
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>
                <p
                  onClick={() => handleSendMail(profileV3?.email)}
                  style={
                    profileV3?.email
                      ? { color: '#0d99ff', cursor: 'pointer' }
                      : {}
                  }
                >
                  {profileV3?.email
                    ? profileV3?.email
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>
                <p
                  onClick={() => handleMoveToLink(profileV3?.facebook)}
                  style={
                    profileV3?.facebook
                      ? { color: '#0d99ff', cursor: 'pointer' }
                      : {}
                  }
                >
                  {profileV3?.facebook
                    ? profileV3?.facebook
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>

                <p
                  onClick={() => handleMoveToLink(profileV3?.linkedin)}
                  style={
                    profileV3?.linkedin
                      ? { color: '#0d99ff', cursor: 'pointer' }
                      : {}
                  }
                >
                  {profileV3?.linkedin
                    ? profileV3?.linkedin
                    : languageRedux === 1
                    ? 'Chưa cập nhật'
                    : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
                </p>
              </div>
            </div>
          </div>
          <ModalProfileContact
            openModalContact={openModalContact}
            setOpenModalContact={setOpenModalContact}
            profile={profileV3}
          />
        </Skeleton>

        <CandidateProfile
          display={
            profileV3.length !== 0 && profileV3?.typeRoleData === 0
              ? 'block'
              : 'none'
          }
          profileMore={profileMorev3}
          profileCompany={profileComanyV3}
          loading={loading}
          language={language}
          languageRedux={languageRedux}
          openModalCareerObjective={openModalCareerObjective}
          openModalLocation={openModalLocation}
          openModalEducationCreate={openModalEducationCreate}
          openModalExperienceCreate={openModalExperienceCreate}
          setOpenModalCareerObjective={setOpenModalCareerObjective}
          setOpenModalLocation={setOpenModalLocation}
          setOpenModalEducationCreate={setOpenModalEducationCreate}
          setOpenModalExperienceCreate={setOpenModalExperienceCreate}
          setOpenModalTypeofWork={setOpenModalTypeofWork}
          openModalTypeofWork={openModalTypeofWork}
        />

        {/* <Company
          display={profileV3.typeRoleData === 0 ? 'none' : 'block'}
          is_profile={true}
        /> */}

        <CompanyRole
          display={
            profileV3.length !== 0 && profileV3?.typeRoleData === 1
              ? 'block'
              : 'none'
          }
          companyData={profileComanyV3}
        />

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={alert}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%', backgroundColor: '#000000' }}
            >
              {languageRedux === 1
                ? 'Bạn đã xóa thông tin thành công !'
                : languageRedux === 2
                ? 'You have successfully deleted the information!'
                : '정보를 성공적으로 삭제했습니다!'}
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={alertSuccess}
            autoHideDuration={3000}
            onClose={handleCloseAlertCv}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseAlertCv}
              severity="success"
              sx={{ width: '100%', backgroundColor: '#000000' }}
            >
              {languageRedux === 1
                ? 'Bạn đã thêm thông tin thành công !'
                : languageRedux === 2
                ? 'You have saved the information successfully !'
                : '정보를 성공적으로 추가했습니다!'}
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={alertLackInfo}
            autoHideDuration={3000}
            onClose={handleCloseLackInfo}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseLackInfo}
              severity="error"
              sx={{ width: '100%', backgroundColor: '#000000' }}
            >
              {languageRedux === 1
                ? 'Vui lòng nhập đầy đủ thông tin !'
                : languageRedux === 2
                ? 'Please enter complete information !'
                : '완전한 정보를 입력해주세요!'}
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={alertEditInfo}
            autoHideDuration={3000}
            onClose={handleCloseEditInfo}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseEditInfo}
              severity="error"
              sx={{ width: '100%', backgroundColor: '#000000' }}
            >
              {languageRedux === 1
                ? 'Cập nhật thông tin thành công !'
                : languageRedux === 2
                ? 'Update information successfully !'
                : '성공적으로 업데이트되었습니다!'}
            </Alert>
          </Snackbar>
        </Stack>
        {profileV3.typeRoleData === 0 &&
        profileMorev3?.profilesCvs?.length === 0 ? (
          <ModalIntroduceCv />
        ) : (
          <></>
        )}
      </div>

      {/* <RollTop /> */}
      <CreateCv role={profileV3?.typeRoleData} />
      {/* <Footer /> */}
    </div>
  );
};

export default Profile;
