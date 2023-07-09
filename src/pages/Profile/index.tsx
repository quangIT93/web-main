import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// @ts-ignore
import { Navbar } from '#components';
import { CameraIcon } from '#components/Icons';

import './style.scss';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Button, Space, Skeleton, Upload, message, Popconfirm } from 'antd';
import {
  PlusCircleOutlined,
  UploadOutlined,
  InstagramFilled,
} from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { RootState } from '../../store/reducer/index';

import Footer from '../../components/Footer/index';
import ItemApply from './components/Item';

import ModalProfileInfoPerson from '#components/Profile/ModalProfileInfoPerson';
import ModalProfileCareerObjectice from '#components/Profile/ModalProfileCareerObjectice';
import ModalProfileContact from '#components/Profile/ModalProfileContact';
import ModalProfileEducationCreate from '#components/Profile/ModalProfileEducationCreate';
import ModalProfileLocation from '#components/Profile/ModalProfileLocation';
import ModalProfileExperienceUpdate from '#components/Profile/ModalProfileExperienceUpdate';
import ModalProfileExperienceCreate from '#components/Profile/ModalProfileExperienceCreate';
import ModalProfileEducationUpdate from '#components/Profile/ModalProfileEducationUpdate';
import CVItem from '#components/Profile/CV';

// import data
import {
  getProfile,
  resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer';
import profileApi from 'api/profileApi';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';

import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';

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
  const dispatch = useDispatch();
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);
  // const [dataProfile, setDataProfile] = useState(null)

  // const { profile, error }: any = useSelector(
  //   (state: RootState) => state.profile
  // )

  const profile = useSelector((state: RootState) => state.profileUser);
  const profileUser = useSelector((state: RootState) => state.profile.profile);
  console.log('profileUser', profileUser);
  const [openModelPersonalInfo, setOpenModalPersonalInfo] = useState(false);
  const [openModalContact, setOpenModalContact] = useState(false);
  const [openModalCareerObjective, setOpenModalCareerObjective] =
    useState(false);
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const [openModalEducationCreate, setOpenModalEducationCreate] =
    useState(false);

  const [openModalExperienceCreate, setOpenModalExperienceCreate] =
    useState(false);
  const [imageInfo, setImageInfo] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkRemove, setCheckRemove] = useState(2);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const fecthDataProfile = async () => {
    try {
      const result = await profileApi.getProfile();
      if (result) {
        setProfileUser(result.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // fecth data
  useEffect(() => {
    // Gọi action để lấy thông tin profile
    setLoading(true);
    // dispatch<any>(getProfile());
    //   .unwrap()
    //   .catch((err: any) => {

    //   })
    fecthDataProfile();
  }, []);

  useEffect(() => {
    // Gọi action để lấy thông tin profile
    fecthDataProfile();
  }, [
    openModelPersonalInfo,
    openModalContact,
    openModalCareerObjective,
    openModalLocation,
    openModalEducationCreate,
    openModalExperienceCreate,
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
      console.log('file', file);
      const isPNG = file.type === 'application/pdf';
      var checFileSize = true;
      if (!isPNG) {
        message.error(`${file.name} khong phai la file pdf`);
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

  // confirm delete cv
  const confirm = async () => {
    try {
      const result = await profileApi.deleteCV();
      if (result) {
        const result = await profileApi.getProfile();
        if (result) {
          setProfileUser(result.data);
        }
        setOpen(false);
        setFileList([]);
        message.success('Xóa CV thanh cong.');
      }
    } catch (error) {}
  };

  // cancel delete cv
  const cancel = () => {
    setOpen(false);
    message.error('Cancel.');
  };

  // handle upload cv
  const handleUpload = async () => {
    const formData = new FormData();
    console.log(fileList);
    formData.append('pdf', fileList[0] as RcFile);
    setUploading(true);
    var mess = '';
    var result;
    try {
      if (profile.cv_url) {
        result = await profileApi.updateCV(formData);
        mess = 'Cập nhật CV thành công';
      } else {
        result = await profileApi.createCV(formData);
        mess = 'Thêm CV thành công';
      }
      console.log(result);
      if (result) {
        const result = await profileApi.getProfile();
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
      dispatch(getProfile() as any);
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
  console.log('profile', profile.avatar);

  const alert = useSelector((state: any) => state.alertProfile.alert);

  const handleClose = () => dispatch<any>(setAlert(false));
  // console.log('alert', alert)

  return (
    <div className="profile">
      <Navbar />

      <div className="container">
        <Skeleton className="skeleton-item" avatar loading={loading} active>
          <div className="div-profile-avatar">
            <div className="div-avatar">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
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
                <div style={{ marginLeft: '10px' }}>
                  <h2>{profile?.name ? profile?.name : 'Chưa cập nhật'}</h2>
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
                color: '#575757',
              }}
            >
              {profile?.introduction ? profile?.introduction : 'Chưa cập nhật'}
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
              <h3>Thông tin cá nhân</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalPersonalInfo(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />
                <p
                  style={{
                    color: '#0D99FF',
                    fontSize: '14px',
                  }}
                >
                  Sửa
                </p>
              </Space>
            </div>
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>Ngày sinh</p>
                <p>Giới tính</p>
                <p>Địa điểm</p>
              </div>
              <div className="div-detail-row right">
                <p>
                  {profile?.birthday
                    ? moment(new Date(profile?.birthday)).format('DD/MM/yyyy')
                    : 'Chưa cập nhật'}
                </p>
                <p>
                  {profile?.gender
                    ? profile?.gender === 0
                      ? 'Nam'
                      : 'Nữ'
                    : 'Nam'}
                </p>
                <p>
                  {profile?.address?.name
                    ? profile?.address?.name
                    : 'Chưa cập nhật'}
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
              <h3>Thông tin liên hệ</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalContact(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Sửa</p>
              </Space>
            </div>
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>Số điện thoại</p>
                <p>Email</p>

                <p>Facebook</p>

                <p>LinkedIn</p>
              </div>
              <div className="div-detail-row right">
                <p>{profile?.phone ? profile?.phone : 'Chưa cập nhật'}</p>
                <p>{profile?.email ? profile?.email : 'Chưa cập nhật'}</p>

                <p>{profile?.facebook ? profile?.facebook : 'Chưa cập nhật'}</p>

                <p>{profile?.linkedin ? profile?.linkedin : 'Chưa cập nhật'}</p>
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
                  {profile.cv_url ? 'Cập nhật CV (.pdf)' : 'Tải lên CV (.pdf)'}{' '}
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
                {profile.cv_url && fileList?.length == 0 ? (
                  <Popconfirm
                    title="Xóa CV"
                    description="Bạn có muốn xóa CV này"
                    open={open}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Có"
                    cancelText="Không"
                  >
                    <CVItem
                      url={profile.cv_url}
                      open={open}
                      setOpen={setOpen}
                      isProfile={true}
                    />
                  </Popconfirm>
                ) : (
                  fileList?.length <= 0 && (
                    <Space direction="vertical" align="center">
                      <p>Bạn chưa có CV/ Resume để ứng tuyển cùng HiJob!</p>
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
                    backgroundColor: `${
                      fileList?.length !== 0 ? `#0D99FF` : '#f1f0f0'
                    }`,
                    alignItems: 'flex-start',
                  }}
                >
                  {uploading ? 'Đang Lưu' : 'Lưu CV'}
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
              <h3>Lĩnh vực quan tâm</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalCareerObjective(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Sửa</p>
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
                : 'Chưa cập nhật'}
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
              <h3>Khu vực làm việc</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalLocation(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Sửa</p>
              </Space>
            </div>
            <Space wrap className="item-info-work">
              {profile?.locations?.length !== 0
                ? profile?.locations?.map((item: any, index: number) => (
                    <Button key={index} className="btn" type="text">
                      {item?.district}
                    </Button>
                  ))
                : 'Chưa cập nhật'}
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
              <h3>Trình độ học vấn</h3>
            </div>
            {profile?.educations?.length !== 0 ? (
              profile?.educations?.map((education: ItemAppy, index: number) => (
                <ItemApply item={education} key={index} />
              ))
            ) : (
              <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
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

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Thêm</p>
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
              <h3>Kinh nghiệm làm việc</h3>
            </div>
            {profile?.experiences?.length !== 0 ? (
              profile?.experiences?.map((item: any, index: number) => (
                <ItemApply typeItem="experiences" key={index} item={item} />
              ))
            ) : (
              <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
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

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Thêm</p>
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
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Bạn đã xoá thông tin thành công!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
