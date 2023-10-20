import React from 'react';
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import { Radio, Tabs } from 'antd';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Skeleton } from 'antd';
// import { AxiosResponse } from 'axios';
// import api
import applitedPostedApi from 'api/apiAppliedPosted';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination, Autoplay } from 'swiper';
// @ts-ignore
// import { useSearchParams } from 'react-router-dom';

import { Button } from 'antd';
// import { Skeleton } from 'antd';

import { AdsCVIcon, QuestionMarkIcon } from '#components/Icons';

// import redux
// import { useDispatch } from 'react-redux';

// import { RootState } from '../../../store/reducer';

import {
  AppliedPostedIcon,
  // DoubleArrowIcon,
  LoginArrowIcon,
  Advertisement,
} from '#components/Icons';

import AppliedPostedJobCard from './Components/AppliedPostedJobCard';
import banner from '../../../img/Banner/banner-for-candidates-2.png';
import banner_recruit_1 from '../../../img/Banner/banner-for-rescruit-1.png';
import banner_recruit_2 from '../../../img/Banner/banner-for-rescruit-2.png';
import './styles.scss';

import ModalLogin from '../../../components/Home/ModalLogin';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';
import { number } from 'yargs';
import historyApplicator from 'api/historyApplicator';
import historyRecruiter from 'api/historyRecruiter';
import { Avatar } from '@mui/material';

// interface ItemTheme {
//   id: number;
//   title: string;
//   img: string;
//   author: string;
// }

const AppliedPostedJob: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [isLogined, setIslogined] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  // const [index, setIndex] = React.useState(0);
  const [appliedPostedJob, setAppliedPostedJob] = React.useState<any>([]);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [cvHijob, setCvHijob] = React.useState<any>([1]);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  // const [searchParams, setSearchParams] = useSearchParams();
  // const dispatch = useDispatch();
  // const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);

  const handleClickItem = (
    event: any,
    id: number,
    type: number,
    total: number,
    api: string,
    query: any,
  ) => {
    const queyObj = query[0];
    let keyOfQuery = Object.keys(queyObj)[0];
    let url =
      api.replace('/api', '') + '?' + keyOfQuery + '=' + queyObj[keyOfQuery];

    localStorage.setItem('hotjobApi', url);
    window.open(
      `/hotjobs?appliedPostedJob-id=${id}&appliedPostedJob-type=${type}&appliedPostedJob-total=${total}`,
      '_parent',
    );
  };

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  const getAppliedPostedJobs = async () => {
    try {
      setloading(true);
      const result =
        roleRedux === 0
          ? await historyApplicator.getAllSubmitedApplied(
              null,
              10,
              1,
              languageRedux === 1 ? 'vi' : 'en',
            )
          : await historyRecruiter.GetInformationAndCandidatesCount(
              0,
              10,
              '1',
              languageRedux === 1 ? 'vi' : 'en',
            );
      // const result = await applitedPostedApi.getAllApplitedPostedApi(
      //   0,
      //   languageRedux === 1 ? 'vi' : 'en',
      // );
      if (result) {
        localStorage.setItem('numberAppliedPostedJobs', result.data.length);
        setTimeout(() => {
          setloading(false);
        }, 1000);

        setAppliedPostedJob(result.data);
        // roleRedux === 0
        //   ? setAppliedPostedJob(
        //     result.data.filter((job: any) => {
        //       return job.type === 'application';
        //     }),
        //   )
        //   : setAppliedPostedJob(
        //     result.data.filter((job: any) => {
        //       return job.type === 'post';
        //     }),
        //   );
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAppliedPostedJobs();
    localStorage.getItem('accessToken') && setIslogined(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, roleRedux]);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const slidesPerView = windowWidth <= 576 ? 1 : 'auto';

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const slidesPerView = windowWidth <= 576 ? 1 : 'auto';

  // const getPostNewestByThemeId = async () => {
  //     try {
  //         const themeId = searchParams.get(`theme-id`)
  //             ? searchParams.get(`theme-id`)
  //             : listTheme?.data[0].id;

  //         var result;
  //         if (themeId) {
  //             setOpenBackdrop(true);
  //             result = await postApi.getPostByThemeId(Number(themeId), 19, null);
  //         }

  //         if (result) {
  //             setPostByTheme(result);
  //             setOpenBackdrop(false);
  //         }
  //     } catch (error) {
  //         console.error(error);
  //         setOpenBackdrop(false);
  //     }
  // };
  // React.useEffect(() => {
  //     getPostNewestByThemeId();
  //     setValue(Number(searchParams.get('theme-id')));
  // }, [searchParams.get('theme-id')]);

  const handleClickHelpSearch = () => {};

  if (localStorage.getItem('accessToken')) {
    return (
      <>
        <Box
          sx={{
            maxWidth: { xs: 320, sm: 480 },
            bgcolor: 'background.paper',
            position: 'relative',
            paddingBottom: '24px',
            flexDirection: 'column',
            padding:
              roleRedux === 0 && appliedPostedJob.length !== 0
                ? '1px 0 0 0'
                : '1px 0 0 0',
          }}
          className="applied-posted-jobs-container"
        >
          <div
            className="advertisement-job-not-loging"
            style={{
              display: cvHijob.length !== 0 ? 'flex' : 'none',
              marginBottom: appliedPostedJob.length !== 0 ? '24px' : '0',
            }}
          >
            {/* <AdsCVIcon /> */}
            <div className="advertisement-job-not-loging-content">
              {/* <h3 style={{ marginTop: '12px' }}>
                {languageRedux === 1
                  ? 'Dễ dàng tạo cv của riêng bạn'
                  : 'Easily create your own resume'}
              </h3>
              <div className="advertisement-job-content-bottom">
                <p>
                  {languageRedux === 1
                    ? 'Chúng tôi cung cấp cho bạn các mẫu sơ yếu lý lịch được cá nhân hóa:'
                    : 'We offer you personalized resume templates:'}
                </p>
                <ul>
                  <li>
                    {languageRedux === 1
                      ? 'Đa dạng theo chủng loại'
                      : 'Diverse by category'}
                  </li>
                  <li>
                    {languageRedux === 1
                      ? 'Chỉnh sửa thông tin dễ dàng'
                      : 'Edit information easily'}
                  </li>
                  <li>
                    {languageRedux === 1
                      ? 'Chia sẻ nhanh chóng trên nền tảng xã hội'
                      : 'Share quickly on social platforms'}
                  </li>
                </ul>
              </div> */}
              {roleRedux === 0 ? (
                <Avatar
                  sx={{
                    width: '100%',
                    maxHeight: '301px',
                    height: 'auto',
                    cursor: 'pointer',
                  }}
                  variant="square"
                  src={banner}
                  onClick={() => {
                    window.open('/page-cv', '_parent');
                  }}
                >
                  Banner
                </Avatar>
              ) : (
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  // navigation={true}
                  modules={[Autoplay, Navigation]}
                  className="banner-rescruit-swiper"
                  loop={true}
                >
                  <SwiperSlide>
                    <img
                      onClick={() => {
                        window.open('/post', '_parent');
                      }}
                      src={banner_recruit_1}
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      onClick={() => {
                        window.open('/candidatesAll', '_parent');
                      }}
                      src={banner_recruit_2}
                      alt=""
                    />
                  </SwiperSlide>
                </Swiper>
              )}
            </div>
            {/* <Button
              type="primary"
              onClick={() => window.open(`/profile/`, '_parent')}
            >
              {languageRedux === 1 ? 'Tạo cv của bạn' : 'Create Your Resume'}
            </Button> */}
          </div>
          <Skeleton loading={false} active>
            {appliedPostedJob.length !== 0 &&
            localStorage.getItem('accessToken') ? (
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'flex-start',
                }}
              >
                <AppliedPostedIcon width={30} height={30} />
                <h2>
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Công việc đã ứng tuyển'
                      : 'Applied Job'
                    : languageRedux === 1
                    ? 'Công việc đã tuyển'
                    : 'Posted Job'}
                </h2>
                <div className="help-search" onClick={handleClickHelpSearch}>
                  <QuestionMarkIcon />
                  <div className="login__hover__container">
                    <div className="login__hover">
                      <div className="login__hover__p">
                        <p>
                          {languageRedux === 1
                            ? `Công việc đã ứng tuyển/Đăng tuyển sẽ hiển thị trạng thái
                        trong vòng 30 ngày, sau 30 ngày bạn có thể kiểm tra các
                        công việc đã Ứng tuyển/Đăng tuyển trong lịch sử.`
                            : `Applied/Posted Jobs will show the status within 30 days, after 30 days you can check the applied/Posted jobs status in History.`}
                        </p>
                      </div>
                      {/* <Button
            type="primary"
            onClick={() => {
              setOpenModalLogin(true);
            }}
          >
            <LoginArrowBlackIcon />
            {languageRedux === 1 ? home.sign_in : homeEn.sign_in}
          </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* <div
            className="applied-posted-job-not-loging"
            style={{ display: !isLogined ? 'flex' : 'none' }}
          >
            <div className="applied-posted-job-not-loging_left">
              <p>
                {languageRedux === 1
                  ? 'Đăng nhập để đăng ký việc làm miễn phí.'
                  : 'Sign in to apply for free jobs.'}
              </p>
            </div>
            <div className="applied-posted-job-not-loging_right">
              <Button
                type="primary"
                onClick={() => {
                  setOpenModalLogin(true);
                }}
              >
                <LoginArrowIcon />
                {languageRedux === 1 ? home.sign_in : homeEn.sign_in}
              </Button>
            </div>
          </div> */}

            <div
              className="advertisement-job-not-loging"
              style={{ display: !isLogined ? 'flex' : 'none' }}
            >
              {/* <Advertisement /> */}
              {/* <img
              src="../images/absHijob.png"
              alt="Ảnh lỗi"
              className="img-advertisement-job-not-loging"
              // style={{ width: '50%', height: '350px', borderRadius: '20px' }}
            /> */}
              <Advertisement />
              <div className="advertisement-job-not-loging-content">
                <h3 style={{ marginTop: '12px' }}>
                  {language?.applied_posted_jobs?.are_you_a_recruiter}
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  {language?.applied_posted_jobs?.post_now}
                </p>
                <h3>
                  {language?.applied_posted_jobs?.are_you_looking_for_job}
                </h3>
                <p>{language?.applied_posted_jobs?.all_jobs_in_VN}</p>
              </div>
              <Button
                type="primary"
                onClick={() => {
                  setOpenModalLogin(true);
                }}
              >
                <LoginArrowIcon />
                {language?.sign_in}
              </Button>
            </div>

            <Swiper
              navigation={true}
              // mousewheel={true}
              // slidesPerView={1}
              slidesPerView={slidesPerView}
              spaceBetween={24}
              modules={[Mousewheel, Navigation, Pagination]}
              className="applied-posted-jobs_swiper"
              style={{
                display:
                  isLogined && appliedPostedJob.length > 0 ? 'flex' : 'none',
              }}
            >
              {appliedPostedJob?.map((item: any, index: number) => (
                <SwiperSlide
                  key={index}
                  onClick={(event) => {
                    handleClickItem(
                      event,
                      item.id,
                      item.type,
                      item.count,
                      item.api,
                      item.query,
                    );
                  }}
                >
                  <AppliedPostedJobCard
                    item={item}
                    type={roleRedux === 0 ? 'application' : 'post'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Skeleton>

          <Backdrop
            sx={{
              color: '#0d99ff ',
              backgroundColor: 'transparent',
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={openBackdrop}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <ModalLogin
            openModalLogin={openModalLogin}
            setOpenModalLogin={setOpenModalLogin}
          />
        </Box>
      </>
    );
  } else {
    return (
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 480 },
          bgcolor: 'background.paper',
          position: 'relative',
          paddingBottom: '24px',
          flexDirection: 'column',
        }}
        className="applied-posted-jobs-container"
      >
        <div
          className="advertisement-job-not-loging"
          style={{ display: !isLogined ? 'flex' : 'none' }}
        >
          {/* <Advertisement /> */}
          {/* <img
              src="../images/absHijob.png"
              alt="Ảnh lỗi"
              className="img-advertisement-job-not-loging"
              // style={{ width: '50%', height: '350px', borderRadius: '20px' }}
            /> */}
          <Advertisement />
          <div className="advertisement-job-not-loging-content">
            <h3 style={{ marginTop: '12px' }}>
              {language?.applied_posted_jobs?.are_you_a_recruiter}
            </h3>
            <p style={{ marginBottom: '12px' }}>
              {language?.applied_posted_jobs?.post_now}
            </p>
            <h3>{language?.applied_posted_jobs?.are_you_looking_for_job}</h3>
            <p>{language?.applied_posted_jobs?.all_jobs_in_VN}</p>
          </div>
          <Button type="primary" onClick={() => setOpenModalLogin(true)}>
            <LoginArrowIcon />
            {language?.sign_in}
          </Button>
        </div>

        <Avatar
          sx={{
            width: '100%',
            maxHeight: '301px',
            height: 'auto',
            marginTop: '24px',
            cursor: 'pointer',
          }}
          variant="square"
          src={banner}
          onClick={() => {
            window.open('/page-cv', '_parent');
          }}
        >
          Banner
        </Avatar>
        <ModalLogin
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        />
      </Box>
    );
  }
};

export default AppliedPostedJob;
