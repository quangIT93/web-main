import React, { useEffect } from 'react';
// import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
// import { url } from 'inspector'
// import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
// import { AxiosResponse } from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  MoreICon,
  SuggestIcon,
  LoginArrowIcon,
  ArrowrightIcon,
} from '#components/Icons';

// @ts-ignore
// import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';

// import { useNavigate } from 'react-router-dom';
// import { MouseEvent, MouseEventHandler } from 'react';

// @ts-ignore
import { useSearchParams } from 'react-router-dom';
// import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// import TurnedInIcon from '@mui/icons-material/TurnedIn';

// import component
// import ListCompanyCarousel from '../ListCompanyCarousel';

// import redux
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';

import { Button, Skeleton } from 'antd';

// import postApi from 'api/postApi';
import nearByApi from 'api/apiNearBy';
// import bookMarkApi from 'api/bookMarkApi';

import './style.scss';

// import icon

import { Space } from 'antd';
// interface item post themes

//import jobcard
import JobCard from '../JobCard';
import ModalLogin from '../../../components/Home/ModalLogin';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';
import JobCardV3 from '../JobCardV3';

// interface PostTheme {
//   id: number;
//   post_id: Number;
//   title: string;
//   company_name: string;
//   image: string;
//   ward: string;
//   district: string;
//   province: string;
//   end_time: number;
//   start_time: number;
//   salary_max: number;
//   salary_min: number;
//   salary_type: string;
//   resource: {
//     company_icon: string;
//   };
//   job_type: {
//     job_type_name: string;
//   };
//   created_at_text: string;
//   bookmarked: boolean;
//   money_type_text: string;
// }

// interface UserSelected {
//   userSelectedId: any;
// }
export interface PostNewestV3 {
  accountId: number;
  address: string;
  bookmarked: boolean;
  companyName: string;
  companyResourceData: {
    logo: string;
  };
  createdAtText: string;
  id: number;
  image: string;
  jobType: {
    id: number;
    name: string;
  };
  location: {
    district: {
      id: string;
      fullName: string;
    };

    province: {
      fullName: string;
      id: string;
    };
    ward: {
      id: string;
      fullName: string;
    };
  };
  moneyType: string;
  salaryMax: number;
  salaryMin: number;
  salaryType: {
    id: number;
    name: string;
  };
  title: string;
}

const ThemesJob: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const [page, setPage] = React.useState(1);
  const [automatic, setAutomatic] = React.useState<Boolean>(false);
  // const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);

  const [nearJob, setNearJob] = React.useState<any>([]);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const profile = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  // state redux
  // const { post } = useSelector((state: RootState) => state);
  // const dispatch = useDispatch();
  // const { setPostByTheme, setPostThemeMore } = bindActionCreators(
  //   actionCreators,
  //   dispatch,
  // );

  // handle click post details
  // const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
  //   window.open(`/post-detail?post-id=${id}`, '_parent');
  // };

  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  // const userProfile = useSelector((state: RootState) => state.profile.profile);

  // get post by theme id

  const getPostByThemeId = async () => {
    try {
      setLoading(true);

      const result = await nearByApi.getNearByJobV3(
        // null,
        // Number(searchParams.get('categories-id')),
        profile.length !== 0 &&
          profile?.profileLocations?.length > 0 &&
          profile?.profileLocations?.map((item: any) => {
            return item.province.id;
          }),
        null,
        null,
        20,
        null,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        // const list = await postApi.getPostByThemeId(
        //   result.data[0].id,
        //   19,
        //   null,
        // );
        // if (list) {
        //   setPostByTheme(list);
        setAutomatic(true);
        // }
        setNearJob(result.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setAutomatic(true);
      console.log(error);
      // setLoading(false);
    }
  };
  React.useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getPostByThemeId();
    }

    // delete param when back to page
    searchParams.delete('theme-id');
    // searchParams.delete('categories-id');
    // setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, searchParams.get('categories-id')]);

  const listSuggestJob = () => {
    try {
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    listSuggestJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   console.log("vap")
  //   getPostByThemeId()
  //   // delete param when back to page
  //   // searchParams.delete("theme-id")
  //   // setSearchParams(searchParams)

  // }, [localStorage.getItem("accessToken")])
  const handleMoveToMoreJob = () => {
    localStorage.setItem('job-type', 'suggested');
    window.open('/more-jobs', '_parent');
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="box-suggestedJob"
      id="box-suggestedJob"
    >
      <div className="title-container">
        <div className="title">
          <SuggestIcon width={25} height={25} />
          <h2>
            {languageRedux === 1
              ? 'Công việc gợi ý'
              : languageRedux === 2
                ? 'Suggested jobs in your city'
                : languageRedux === 3
                  ? '추천 직업'
                  : 'Công việc gợi ý'}
          </h2>
        </div>
        {/* <div
          className="view-all"
          onClick={handleMoveToMoreJob}
          style={{
            display: !localStorage.getItem('accessToken') ? 'none' : 'flex',
          }}
        >
          <p> {
              languageRedux === 1 ?
                "Xem tất cả" :
                languageRedux === 2 ?
                  "View all" :
                  languageRedux === 3 &&
                  "다 보기"
            }</p>
          <ArrowrightIcon width={20} height={20} />
        </div> */}
      </div>

      {!localStorage.getItem('accessToken') ? (
        <div className="suggest-job-not-loging">
          <div className="suggest-job-not-loging_left">
            {/* <h3>
           {languageRedux === 1
             ? 'Hijob gợi ý công việc cho bạn'
             : 'Hijob suggests a job for you'}
         </h3> */}
            <p>
              {languageRedux === 1
                ? 'Nhanh chóng tìm được việc làm phù hợp với nhu cầu của bạn.'
                : languageRedux === 2
                  ? 'Quickly find a job that fits your needs.'
                  : languageRedux === 3 &&
                    '귀하의 필요에 맞는 일자리를 빠르게 찾으십시오.'}
            </p>
          </div>
          <div className="suggest-job-not-loging_right">
            <Button
              type="primary"
              onClick={() => {
                setOpenModalLogin(true);
              }}
            >
              <LoginArrowIcon />
              {languageRedux === 1
                ? 'Đăng nhập ngay'
                : languageRedux === 2
                  ? 'Sign in'
                  : languageRedux === 3 && '로그인'}
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <>
        <Skeleton loading={loading} active>
          {automatic && (
            <>
              <Grid
                container
                spacing={3}
                columns={{ xs: 12, sm: 4, md: 12 }}
                // sx={{ marginTop: '-8px' }}
              >
                {nearJob.map((item: PostNewestV3, index: number) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <JobCardV3 item={item} />
                  </Grid>
                ))}
              </Grid>
              {/* <Stack
              spacing={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '24px 0',
                // marginBottom: '50px',
              }}
            >
              <Space
                className="div-hover-more-suggest-job"
                style={{ width: '100%' }}
              >
                {localStorage.getItem('accessToken') ? (
                  <div className="more-job">
                    <button onClick={handleChange}>
                      <p>{language?.more}</p>
                      <MoreICon width={20} height={20} />
                    </button>
                  </div>
                ) : (
                  <div className="suggest-job-not-loging">
                    <div className="suggest-job-not-loging_left">
                      <h3>{language?.home_page?.hijob_suggest_for_u}</h3>
                      <p>
                        {language?.home_page?.quickly_find_job_fits_your_needs}
                      </p>
                    </div>
                    <div className="suggest-job-not-loging_right">
                      <Button
                        type="primary"
                        onClick={() => {
                          setOpenModalLogin(true);
                        }}
                      >
                        <LoginArrowIcon />
                        {language?.login}
                      </Button>
                    </div>
                  </div>
                )}
              </Space>
            </Stack> */}
              <Backdrop
                sx={{
                  color: '#0d99ff ',
                  backgroundColor: 'transparent',
                  zIndex: (theme: any) => theme.zIndex.drawer + 1,
                }}
                open={openBackdrop}
                //   onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </>
          )}
          <div
            className="view-all-down"
            onClick={handleMoveToMoreJob}
            style={{
              display:
                !nearJob ||
                nearJob.length === 0 ||
                !localStorage.getItem('accessToken')
                  ? 'none'
                  : 'flex',
            }}
          >
            <p>
              {' '}
              {languageRedux === 1
                ? 'Xem tất cả'
                : languageRedux === 2
                  ? 'View all'
                  : languageRedux === 3 && '다 보기'}
            </p>
            <ArrowrightIcon width={20} height={20} />
          </div>
        </Skeleton>
      </>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </Box>
  );
};

export default ThemesJob;
