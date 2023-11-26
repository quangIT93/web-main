import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// @ts-ignore
import {
  CameraIcon,
  PencilIcon,
  // LoginArrowIcon,
  // SectionLanguageIcon,
  // SectionHobbiesIcon,
  // SectionReferencesIcon,
  // SectionInternshipsIcon,
  // SectionActivitiesIcon,
  // SectionCoursesIcon,
  // SectionAwardsIcon,
  // SectionDeleteIcon,
  // SectionEditIcon,
  // DownloadCVIcon,
  // TickIcon,
} from '#components/Icons';

import './style.scss';
// import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {
  Button,
  Space,
  Skeleton,
  Upload,
  message,
  Popconfirm,
  Switch,
} from 'antd';
import {
  PlusCircleOutlined,
  UploadOutlined,
  // InstagramFilled,
} from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { RootState } from '../../store/reducer/index';
import ItemApply from './components/Item';

import apiCompany from 'api/apiCompany';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';

import ModalProfileInfoPerson from '#components/Profile/ModalProfileInfoPerson';
import ModalProfileCareerObjectice from '#components/Profile/ModalProfileCareerObjectice';
import ModalProfileContact from '#components/Profile/ModalProfileContact';
import ModalProfileEducationCreate from '#components/Profile/ModalProfileEducationCreate';
import ModalProfileLocation from '#components/Profile/ModalProfileLocation';
// import ModalProfileExperienceUpdate from '#components/Profile/ModalProfileExperienceUpdate';
import ModalProfileExperienceCreate from '#components/Profile/ModalProfileExperienceCreate';

// import ModalProfileEducationUpdate from '#components/Profile/ModalProfileEducationUpdate';
import CVItem from '#components/Profile/CV';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// import data
import {
  getProfile,
  // resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';

import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
import {
  setAlertSuccess,
  setAlertLackInfo,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';
import languageApi from 'api/languageApi';
import { profileEn } from 'validations/lang/en/profile';
import { profileVi } from 'validations/lang/vi/profile';
import SectionCv from './components/SectionCv';
import CreateCv from '#components/Profile/CreateCv';
import ChangeRoleButton from './components/ChangeRoleButton';
import CandidateProfile from './components/CandidateProfile';
import Company from 'pages/Company';
import ModalIntroduceCv from '#components/Profile/ModalIntroduceCv';
import { prototype } from 'module';
import CompanyRole from './components/CompanyRole';
import { setProfileMeCompanyV3 } from 'store/reducer/profileMeCompanyReducerV3';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
import { color } from 'html2canvas/dist/types/css/types/color';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

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
const Profile: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const dispatch = useDispatch();
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);
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
  const [companyName, setCompanyName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [checkRemove, setCheckRemove] = useState(2);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [language, setLanguage] = useState<any>();
  const [cvHijob, setCvHijob] = useState<any[]>([1, 2]);
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
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [cvId, setCvId] = useState<any>();
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

  const handleChooseCv = (item: any, e: any) => {
    e.stopPropagation();
    setListCv((prev: any) => [
      prev.at(prev.indexOf(item)),
      ...prev
        .filter((value: any, index: any) => {
          return index !== prev.indexOf(item);
        })
        .sort((a: any, b: any) => b.id - a.id),
    ]);
    setCvId(item.id);
  };

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
        : 'HiJob - Find a job, recruit';
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

  const fecthDataProfile = async () => {
    try {
      const result = await profileApi.getProfile(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setProfileUser(result.data);
        setLoading(false);
        // setUser(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

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

  // useEffect(() => {
  //   // Gọi action để lấy thông tin profile
  //   if (!localStorage.getItem('accessToken')) {
  //     window.open('/');
  //     return;
  //   }
  //   // fecthDataProfile();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   // openModelPersonalInfo,
  //   // openModalContact,
  //   // openModalCareerObjective,
  //   // openModalLocation,
  //   // openModalEducationCreate,
  //   // openModalExperienceCreate,
  //   // languageRedux,
  // ]);

  const handleAvatarClick = () => {
    // Khi click vào SmallAvatar, thực hiện hành động tương ứng
    const fileInput = document.getElementById('avatar-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  // props upload cv
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);

      return true;
    },
    beforeUpload: (file) => {
      const isPNG = file.type === 'application/pdf';
      var checFileSize = true;
      if (!isPNG) {
        message.error(`${file.name} không phải là file pdf`);
      } else if (file.size > 1024 * 1024 * 5) {
        checFileSize = false;
        message.error(`File lon hon 5mb`);
      } else {
        setFileList([file]);
        return false;
      }
      return isPNG || Upload.LIST_IGNORE || checFileSize;
    },
    maxCount: 1,
    listType: 'picture',
    fileList,
  };

  const getCompanyInforByAccount = async () => {
    try {
      // const result = await apiCompany.getCampanyByAccountApi(
      //    languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      // );

      if (profileComanyV3?.companyInfomation?.id !== null) {
        setCompanyName(profileComanyV3?.companyInfomation?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInforByAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    } catch (error) {}
  };

  // cancel delete cv
  const cancel = () => {
    setOpen(false);
    message.error(language?.profile_page?.cancel);
  };

  // handle upload cv
  const handleUpload = async () => {
    const formData = new FormData();

    formData.append('pdf', fileList[0] as RcFile);
    setUploading(true);
    var mess = '';
    var result;
    try {
      if (profileMorev3.cvUrlPath !== null) {
        result = await profileApi.updateCV(formData);
        mess = language?.profile_page?.alert_update_cv_success;
      } else {
        result = await profileApi.createCV(formData);
        mess = language?.profile_page?.alert_add_cv_success;
      }

      if (result) {
        const result = await profileApi.getProfileInformationV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (result) {
          setProfileMeInformationV3(result);
          setFileList([]);
          setUploading(false);
          message.success(`${mess}`);
        }
      }
    } catch (error) {
      console.log(error);
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
                    {profileV3?.name ? profileV3?.name : language?.unupdated}
                  </h2>
                  <ChangeRoleButton />
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
                    <img src="/images/profile/HiCoin.png" alt="ảnh" />
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
                : language?.unupdated}
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
              <h3>{language?.personal_information}</h3>
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
                  {language?.edit}
                </p>
              </Space>
            </div>
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>{language?.date_of_birth}</p>
                <p>{language?.sex}</p>
                <p>{language?.location}</p>
                <p>
                  {languageRedux === 1
                    ? 'Vị trí ứng tuyển'
                    : languageRedux === 2
                      ? 'Position'
                      : languageRedux === 3
                        ? '위치'
                        : 'Vị trí ứng tuyển'}
                </p>
              </div>
              <div className="div-detail-row right">
                <p>
                  {profileV3?.birthday
                    ? moment(new Date(profileV3?.birthday)).format('DD/MM/yyyy')
                    : language?.unupdated}
                </p>
                <p>
                  {profileV3?.genderText
                    ? profileV3?.genderText
                    : language?.unupdated}
                </p>
                <p>
                  {profileV3?.addressText?.fullName
                    ? profileV3?.addressText?.fullName
                    : language?.unupdated}
                </p>
                <p>
                  {profileV3?.jobTypeName
                    ? profileV3?.jobTypeName
                    : language?.unupdated}
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
              <h3>{language?.contact_information}</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalContact(true)}
              >
                <div className="edit-icon">
                  <PencilIcon width={15} height={15} />
                </div>

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.edit}
                </p>
              </Space>
            </div>
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>{language?.phone_number}</p>
                <p>Email</p>

                <p>Facebook</p>

                <p>LinkedIn</p>
              </div>
              <div className="div-detail-row right">
                <p>
                  {profileV3?.phone ? profileV3?.phone : language?.unupdated}
                </p>
                <p
                  onClick={() => handleSendMail(profileV3?.email)}
                  style={
                    profileV3?.email
                      ? { color: '#0d99ff', cursor: 'pointer' }
                      : {}
                  }
                >
                  {profileV3?.email ? profileV3?.email : language?.unupdated}
                </p>
                <p>
                  {profileV3?.facebook
                    ? profileV3?.facebook
                    : language?.unupdated}
                </p>

                <p>
                  {profileV3?.linkedin
                    ? profileV3?.linkedin
                    : language?.unupdated}
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
              {language?.profile_page?.alert_delete_success}
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
                : 'You have saved the information successfully !'}
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
                : 'Please enter complete information !'}
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
                : 'Update information successfully !'}
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
