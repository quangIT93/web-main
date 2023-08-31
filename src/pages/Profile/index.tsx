import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// @ts-ignore
import { Navbar } from '#components';
import { CameraIcon, PencilIcon, LoginArrowIcon, SectionLanguageIcon, SectionHobbiesIcon, SectionReferencesIcon, SectionInternshipsIcon, SectionActivitiesIcon, SectionCoursesIcon, SectionAwardsIcon, SectionDeleteIcon, SectionEditIcon } from '#components/Icons';

import './style.scss';
// import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Button, Space, Skeleton, Upload, message, Popconfirm, Switch } from 'antd';
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

import Footer from '../../components/Footer/Footer';
import ItemApply from './components/Item';

import apiCompany from 'api/apiCompany';

import ModalProfileInfoPerson from '#components/Profile/ModalProfileInfoPerson';
import ModalProfileCareerObjectice from '#components/Profile/ModalProfileCareerObjectice';
import ModalProfileContact from '#components/Profile/ModalProfileContact';
import ModalProfileEducationCreate from '#components/Profile/ModalProfileEducationCreate';
import ModalProfileLocation from '#components/Profile/ModalProfileLocation';
// import ModalProfileExperienceUpdate from '#components/Profile/ModalProfileExperienceUpdate';
import ModalProfileExperienceCreate from '#components/Profile/ModalProfileExperienceCreate';

import RollTop from '#components/RollTop';
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

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';

import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
import languageApi from 'api/languageApi';
import { profileEn } from 'validations/lang/en/profile';
import { profileVi } from 'validations/lang/vi/profile';
import SectionCv from './components/SectionCv';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const profile = useSelector((state: RootState) => state.profileUser);
  const profileUser = useSelector((state: RootState) => state.profile.profile);

  const [openModelPersonalInfo, setOpenModalPersonalInfo] = useState(false);
  const [openModalContact, setOpenModalContact] = useState(false);
  const [openModalCareerObjective, setOpenModalCareerObjective] =
    useState(false);
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const [openModalEducationCreate, setOpenModalEducationCreate] =
    useState(false);

  const [openModalExperienceCreate, setOpenModalExperienceCreate] =
    useState(false);
  // const [imageInfo, setImageInfo] = useState<string>('');
  // const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [checkRemove, setCheckRemove] = useState(2);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [language, setLanguage] = useState<any>();

  // const [user, setUser] = useState<any>(null);

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_profile' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setLanguage(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi();
  }, [languageRedux]);

  // console.log("language", language);

  const fecthDataProfile = async () => {
    try {
      const result = await profileApi.getProfile(
        languageRedux === 1 ? 'vi' : 'en',
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
    setLoading(true);
    // dispatch<any>(getProfile());
    //   .unwrap()
    //   .catch((err: any) => {

    //   })
    // fecthDataProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Gọi action để lấy thông tin profile
    if (!localStorage.getItem('accessToken')) {
      window.open('/');
      return;
    }
    fecthDataProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    openModelPersonalInfo,
    openModalContact,
    openModalCareerObjective,
    openModalLocation,
    openModalEducationCreate,
    openModalExperienceCreate,
    languageRedux,
  ]);

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
      const result = await apiCompany.getCampanyByAccountApi(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result && result?.data?.companyInfomation?.id != null) {
        setCompanyName(result?.data?.companyInfomation?.name);
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
          languageRedux === 1 ? 'vi' : 'en',
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

  // handle upload cv
  const handleUpload = async () => {
    const formData = new FormData();

    formData.append('pdf', fileList[0] as RcFile);
    setUploading(true);
    var mess = '';
    var result;
    try {
      if (profile.cv_url) {
        result = await profileApi.updateCV(formData);
        mess = language?.profile_page?.alert_update_cv_success;
      } else {
        result = await profileApi.createCV(formData);
        mess = language?.profile_page?.alert_add_cv_success;
      }

      if (result) {
        const result = await profileApi.getProfile(
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (result) {
          setProfileUser(result.data);
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
      const imageUrl = await uploadImage(e, files);
      if (imageUrl) {
        // dispatch(getProfile() as any);
      }
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
        dispatch(getProfile() as any);
        return profile.avatar;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error(error);
      // Xử lý lỗi tải lên ảnh
    }
  };

  const alert = useSelector((state: any) => state.alertProfile.alert);

  const handleClose = () => dispatch<any>(setAlert(false));

  return (
    <div className="profile">
      <Navbar />

      <div className="container">
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
                    src={profileUser?.avatar ? profileUser?.avatar : ''}
                  />
                </Badge>
                <div className="user-company" style={{ marginLeft: '10px' }}>
                  <h2>{profile?.name ? profile?.name : language?.unupdated}</h2>
                  <div className="wrap-company">
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
                  </div>
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
              {profile?.introduction
                ? profile?.introduction
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
              </div>
              <div className="div-detail-row right">
                <p>
                  {profile?.birthday
                    ? moment(new Date(profile?.birthday)).format('DD/MM/yyyy')
                    : language?.unupdated}
                </p>
                <p>
                  {profile
                    ? profile?.gender === 1
                      ? language?.male
                      : language?.female
                    : language?.male}
                </p>
                <p>
                  {profile?.address?.name
                    ? profile?.address?.name
                    : language?.unupdated}
                </p>
              </div>
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
                <p>{profile?.phone ? profile?.phone : language?.unupdated}</p>
                <p>{profile?.email ? profile?.email : language?.unupdated}</p>

                <p>
                  {profile?.facebook ? profile?.facebook : language?.unupdated}
                </p>

                <p>
                  {profile?.linkedin ? profile?.linkedin : language?.unupdated}
                </p>
              </div>
            </div>
          </div>
        </Skeleton>

        <Skeleton className="skeleton-item" loading={loading} active>
          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                // flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h3>CV/ Resume</h3>
            </div>
            <Space
              wrap
              size={20}
              direction="vertical"
              style={{ marginTop: 20 }}
              className="cv-input-container"
            >
              <Upload {...props}>
                <Button
                  style={{
                    backgroundColor: '#0D99FF',
                    color: 'white',
                    height: 40,
                    marginBottom: 20,
                  }}
                  icon={<UploadOutlined style={{ fontSize: 18 }} />}
                >
                  {profile.cv_url
                    ? language?.profile_page?.update_cv
                    : language?.upload_cv}{' '}
                </Button>
              </Upload>

              <div
                // align="center"
                style={{
                  marginLeft: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              // direction="vertical"
              >
                {profile.cv_url && fileList?.length === 0 ? (
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
                      url={profile.cv_url}
                      open={open}
                      setOpen={setOpen}
                      isProfile={true}
                      language={language}
                    />
                  </Popconfirm>
                ) : (
                  fileList?.length <= 0 && (
                    <Space direction="vertical" align="center">
                      <p>{language?.profile_page?.cv_title}</p>
                      <img style={{ width: 200 }} src="/cv3 1.png" alt="ảnh" />
                    </Space>
                  )
                )}
                <Button
                  type="primary"
                  onClick={handleUpload}
                  disabled={fileList?.length === 0}
                  loading={uploading}
                  style={{
                    marginTop: 16,
                    width: 300,
                    height: 40,
                    backgroundColor: `${fileList?.length !== 0 ? `#0D99FF` : '#f1f0f0'
                      }`,
                    alignItems: 'flex-start',
                  }}
                >
                  {uploading
                    ? language?.profile_page?.saving
                    : language?.profile_page?.save_cv}
                </Button>
              </div>
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
              <h3>{language?.career_objective}</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalCareerObjective(true)}
              >
                <div className="edit-icon">
                  <PencilIcon width={15} height={15} />
                </div>

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.edit}
                </p>
              </Space>
            </div>
            <Space wrap className="item-info-work">
              {profile?.categories?.length !== 0
                ? profile?.categories?.map(
                  (item: ICategories, index: number) => (
                    <Button key={index} className="btn" type="text">
                      {item.child_category}
                    </Button>
                  ),
                )
                : language?.unupdated}
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
              <h3>{language?.working_location}</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalLocation(true)}
              >
                <div className="edit-icon">
                  <PencilIcon width={15} height={15} />
                </div>

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.edit}
                </p>
              </Space>
            </div>
            <Space wrap className="item-info-work">
              {profile?.locations?.length !== 0
                ? profile?.locations?.map((item: any, index: number) => (
                  <Button key={index} className="btn" type="text">
                    {item?.district}
                  </Button>
                ))
                : language?.unupdated}
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
              <h3>{language?.education}</h3>
            </div>
            {profile?.educations?.length !== 0 ? (
              profile?.educations?.map((education: ItemAppy, index: number) => (
                <ItemApply item={education} key={index} />
              ))
            ) : (
              <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
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
                  {language?.add}
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
              <h3>{language?.working_experience}</h3>
            </div>
            {profile?.experiences?.length !== 0 ? (
              profile?.experiences?.map((item: any, index: number) => (
                <ItemApply typeItem="experiences" key={index} item={item} />
              ))
            ) : (
              <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
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
                  {language?.add}
                </p>
              </Space>
            </div>
          </div>

          <ModalProfileInfoPerson
            openModelPersonalInfo={openModelPersonalInfo}
            setOpenModalPersonalInfo={setOpenModalPersonalInfo}
            profile={profile}
          />

          <ModalProfileContact
            openModalContact={openModalContact}
            setOpenModalContact={setOpenModalContact}
            profile={profile}
          />
          <ModalProfileCareerObjectice
            openModalCareerObjective={openModalCareerObjective}
            setOpenModalCareerObjective={setOpenModalCareerObjective}
            categories={profile?.categories}
          />

          <ModalProfileEducationCreate
            openModalEducationCreate={openModalEducationCreate}
            setOpenModalEducationCreate={setOpenModalEducationCreate}
            typeItem="createEducation"
            educations={profile?.educations}
          />
          <ModalProfileLocation
            openModalLocation={openModalLocation}
            setOpenModalLocation={setOpenModalLocation}
            locations={profile?.locations}
          />

          <ModalProfileExperienceCreate
            openModalExperienceCreate={openModalExperienceCreate}
            setOpenModalExperienceCreate={setOpenModalExperienceCreate}
            typeItem="createExperience"
            educations={profile?.educations}
          />
        </Skeleton>
        <SectionCv
          loading={loading}
          languageRedux={languageRedux}
          language={language}
        />
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              {language?.profile_page?.alert_delete_success}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default Profile;
