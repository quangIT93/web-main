import React, { useContext, useEffect } from 'react';
// import Card from '@mui/material/Card';

// import Modal from '@mui/material/Modal';

// import ImageListItem from '@mui/material/ImageListItem';

import Grid from '@mui/material/Grid';
import hotJobApi from 'api/hotJobApi';
// import { url } from 'inspector'

import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// scroll data
import InfiniteScroll from 'react-infinite-scroll-component';

// import icon

// @ts-ignore
import { BackIcon } from '#components/Icons';

import { Skeleton, message, Spin } from 'antd';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type { SelectProps, RadioChangeEvent } from 'antd';

// import antIcon
import { LoadingOutlined } from '@ant-design/icons';

import { setCookie } from 'cookies';
// import redux

// import { bindActionCreators } from 'redux';
// import { actionCreators } from 'store/index';
// import { RootState } from 'store/reducer';

// import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';

// import api
// import postApi from 'api/postApi'

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
// import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore

//import jobcard
// import JobCard from '../../components/Home/JobCard';
// import JobCardHotJob from './JobCardHotJob';
// import InfluencerCard from './InfluencerCard';

// import { useHomeState } from '../Home/HomeState'

import {
  useLocation,
  // useNavigate,
  // createSearchParams,
  useSearchParams,
} from 'react-router-dom';
// import { AxiosResponse } from 'axios'
// import icon
// import {
//   EnvironmentFilled,
//   ClockCircleFilled,
//   // EuroCircleFilled,
//   CaretDownFilled,
// } from '@ant-design/icons';

import './style.scss';
// import { stringify } from 'query-string/base';
// import notificationKeywordApi from 'api/notificationKeyword';

import ShowNotificativeSave from '#components/ShowNotificativeSave';
import ShowCancleSave from '#components/ShowCancleSave';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import locationApi from 'api/locationApi';
import { getCookie } from 'cookies';
import NoDataComponent from 'utils/NoDataPage';
import HotJob from '#components/Home/HotJob';
import postApi from 'api/postApi';
import JobCardMoreNewJob from './JobCardMoreNewJob';
import nearByApi from 'api/apiNearBy';
import JobCardMoreJob from './JobCardMoreJob';
import { CategoryCarousel } from '#components/index';
import { Breadcrumbs } from '#components/index';
import { HomeValueContext } from 'context/HomeValueContextProvider';
import ListCompanyCarousel from '#components/Home/ListCompanyCarousel';
import { AxiosResponse } from 'axios';
import themesApi from 'api/themesApi';
import { setPalceId } from 'store/reducer/placeIdReducer';

interface UserSelected {
  userSelectedId: any;
}

const MoreJobsPage: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [moreJob, setMoreJob] = React.useState<any>([]);
  const {
    // setChildCateloriesArray,
    childCateloriesArray,
  }: {
    // setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>;
    childCateloriesArray: number[];
  } = useContext(HomeValueContext);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [typeJob, setTypeJob] = React.useState<any>(
    localStorage.getItem('job-type'),
  );
  const [templateId, setTemplateId] = React.useState<any>(
    // localStorage.getItem('job-type'),
    '18',
  );
  const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null);
  const [imageHotPlace, setImageHotPlace] = React.useState<string | undefined>(
    'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/themes/1689146883084-a4dc10cd-ccf9-4ed0-9595-9727dc234ef8.jpg',
  );
  const [titleHotPlace, setTitleHotPlace] = React.useState<string | undefined>(
    'Landmark 81',
  );
  const [numberPostHotPlace, setNumberPostHotPlace] = React.useState<
    string | undefined
  >('5155');
  const [openBackdrop, setOpenBackdrop] = React.useState<any>(false);
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const placeIdRedux = useSelector(
    (state: RootState) => state.placeIdReducer.placeId,
  );

  const [idFilterProvinces, setIdFilterProvinces] = React.useState('');

  const [hasMore, setHasMore] = React.useState(true);
  const [userSelectedId, setUserSelectedId] = React.useState<any>();
  const [placeId, setPlaceId] = React.useState<any>();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const [page, setPage] = React.useState(0);
  const analytics: any = getAnalytics();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const getTemplateId = () => {
    const templateId = localStorage.getItem('job_by_place');
    // if (templateId && templateId !== 'new' && templateId !== 'suggested') {
    //   // console.log('la new');
    //   setTemplateId(templateId && templateId?.split('--').at(1));
    //   setImageHotPlace(templateId?.split('--').at(4));
    //   setTitleHotPlace(templateId?.split('--').at(3));
    //   setNumberPostHotPlace(templateId?.split('--').at(2));
    // }
  };

  useEffect(() => {
    setPlaceId(localStorage.getItem('job_by_place'));
    getTemplateId();
  }, [localStorage.getItem('job_by_place')]);

  // console.log('getTemplateId', localStorage.getItem('job-type'));
  // console.log('getTemplateId', templateId);

  const getPostByThemeId = async () => {
    if (typeJob !== 'place') {
      return;
    }
    let storedSettings = JSON.parse(getCookie('hotPlaceId') || '{}');

    try {
      const result = await themesApi.getThemesEnable(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        setListThem(result);

        if (storedSettings.placeId === undefined) {
          dispatch<any>(setPalceId(result?.data[0]?.id));
          setCookie(
            'hotPlaceId',
            JSON.stringify({
              id: 0,
              placeId: result?.data[0]?.id,
            }),
            365,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setTypeJob(localStorage.getItem('job-type'));
    getPostByThemeId();
  }, []);

  React.useEffect(() => {
    getProvinces();
    document.title =
      typeJob === 'new'
        ? languageRedux === 2
          ? 'HiJob - Newest Jobs'
          : languageRedux === 2
          ? 'HiJob - Newest Jobs'
          : 'HiJob - 최신 직업'
        : typeJob === 'hot-job'
        ? languageRedux === 1
          ? 'HiJob - Xem tất cả loại công việc'
          : languageRedux === 2
          ? 'HiJob - View all category jobs'
          : 'HiJob - 모든 직업 유형 보기'
        : typeJob === 'suggested'
        ? languageRedux === 1
          ? 'HiJob - Công việc gợi ý'
          : languageRedux === 2
          ? 'HiJob - Suggested jobs in your city'
          : 'HiJob - 귀하의 도시에서 추천 직업'
        : languageRedux === 1
        ? 'HiJob - Công việc theo chủ đề'
        : languageRedux === 2
        ? 'HiJob - job by hot places'
        : 'HiJob - 테마 작품';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_hotJob' as string,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  // Lưu vị trí cuộn trước đó
  let lastScrollTop = 0;

  var prevHeight = 300;
  const handleScroll = () => {
    const tabs = document.querySelector('.tabs') as HTMLElement;

    const breadCrumb = document.querySelector(
      '.bread-crumb-container',
    ) as HTMLElement;
    var currentHeight = window.scrollY;
    // console.log('prevHeight=', prevHeight);
    // console.log('currentHeight=', currentHeight);

    // Lấy vị trí cuộn hiện tại

    if (
      currentHeight >= prevHeight &&
      currentHeight > 100 &&
      tabs !== null &&
      breadCrumb !== null
    ) {
      if (
        (location.pathname === '/more-jobs' &&
          localStorage.getItem('job-type') === 'new' &&
          window.innerWidth <= 450) ||
        (location.pathname === '/more-jobs' &&
          localStorage.getItem('job-type') === 'hot-job' &&
          window.innerWidth <= 450)
      ) {
        tabs.style.top = '-155px';
        breadCrumb.style.marginTop = '-203px';
      } else {
        tabs.style.top = '-115px';
        breadCrumb.style.marginTop = '-203px';
      }

      // setTimeout(() => {
      //   currentHeight = 0;
      //   tabs.style.top = '70px';
      //   breadCrumb.style.marginTop = '192px';
      // }, 500);
    } else if (currentHeight === 0) {
      if (
        (location.pathname === '/more-jobs' &&
          localStorage.getItem('job-type') === 'new' &&
          window.innerWidth <= 450) ||
        (location.pathname === '/more-jobs' &&
          localStorage.getItem('job-type') === 'hot-job' &&
          window.innerWidth <= 450)
      ) {
        tabs.style.top = '155px';
        breadCrumb.style.marginTop = '20px';
      } else if (
        (location.pathname === '/more-jobs' &&
          localStorage.getItem('job-type') === 'new' &&
          450 < window.innerWidth &&
          window.innerWidth <= 768) ||
        (location.pathname === '/more-jobs' &&
          localStorage.getItem('job-type') === 'hot-job' &&
          450 < window.innerWidth &&
          window.innerWidth <= 768)
      ) {
        tabs.style.top = '115px';
        breadCrumb.style.marginTop = '-10px';
      } else {
        tabs.style.top = '115px';
        breadCrumb.style.marginTop = '0px';
      }
    } else {
      if (tabs !== null && breadCrumb !== null) {
        if (
          (location.pathname === '/more-jobs' &&
            localStorage.getItem('job-type') === 'new' &&
            window.innerWidth <= 450) ||
          (location.pathname === '/more-jobs' &&
            localStorage.getItem('job-type') === 'hot-job' &&
            window.innerWidth <= 450)
        ) {
          tabs.style.top = '155px';
          breadCrumb.style.marginTop = '20px';
        } else if (
          (location.pathname === '/more-jobs' &&
            localStorage.getItem('job-type') === 'new' &&
            450 < window.innerWidth &&
            window.innerWidth <= 768) ||
          (location.pathname === '/more-jobs' &&
            localStorage.getItem('job-type') === 'hot-job' &&
            450 < window.innerWidth &&
            window.innerWidth <= 768)
        ) {
          tabs.style.top = '115px';
          breadCrumb.style.marginTop = '-10px';
        } else {
          tabs.style.top = '115px';
          breadCrumb.style.marginTop = '0px';
        }
      }
    }
    prevHeight = currentHeight;
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const getMoreJob = async () => {
    // console.log('re');

    try {
      setLoading(true);
      let userSelected = JSON.parse(
        getCookie('userSelected') || '{}',
      ) as UserSelected;
      setOpenBackdrop(true);

      let storedSettings = JSON.parse(getCookie('hotPlaceId') || '{}');

      const result =
        typeJob === 'new' || typeJob === 'hot-job'
          ? await postApi.getPostNewestV3(
              childCateloriesArray,
              // userSelectedId,
              userSelected.userSelectedId,
              // null,
              // null,
              // profile && profile?.profileLocations?.length > 0 &&
              profileV3.length !== 0 ? profileV3?.profileLocations : null,
              profileV3.length !== 0
                ? profileV3?.profileLocations[0]?.province?.id
                : null,
              // null,
              20,
              null,
              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            )
          : typeJob === 'suggested'
          ? await nearByApi.getNearByJobV3(
              !idFilterProvinces && profileV3.length !== 0
                ? profileV3.addressText.id
                : idFilterProvinces
                ? [idFilterProvinces]
                : ['79'],
              null,
              null,
              20,
              null,
              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            )
          : await postApi.getPostByThemeId(
              storedSettings?.placeId ? storedSettings?.placeId : placeIdRedux,
              19,
              0,
              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            );

      setHasMore(true);
      if (result) {
        setLoading(false);
        if (
          typeJob !== 'new' &&
          typeJob !== 'hot-job' &&
          typeJob !== 'suggested'
        ) {
          if (result.data.posts.length < 20) {
            setMoreJob(
              typeJob === 'new' ||
                typeJob === 'hot-job' ||
                typeJob === 'suggested'
                ? result.data
                : result.data.posts,
            );
            setHasMore(false);
            setOpenBackdrop(false);
            return;
          }
        }
        if (result.data.length < 20) {
          setMoreJob(
            typeJob === 'new' ||
              typeJob === 'hot-job' ||
              typeJob === 'suggested'
              ? result.data
              : result.data.posts,
          );
          setHasMore(false);
          setOpenBackdrop(false);
          return;
        } else if (
          result.data &&
          (result.data.length !== 0 || result.data.posts.length !== 0)
        ) {
          setMoreJob(
            typeJob === 'new' ||
              typeJob === 'hot-job' ||
              typeJob === 'suggested'
              ? result.data
              : result.data.posts,
          );
          setOpenBackdrop(false);
          return;
        } else {
          setMoreJob([]);
          setHasMore(false);
          setOpenBackdrop(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('placeIdRedux', placeIdRedux);

  // console.log('more job', moreJob);
  // console.log('typeJob', typeJob);
  // console.log('templateId', templateId);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      let userSelected = JSON.parse(
        getCookie('userSelected') || '{}',
      ) as UserSelected;

      let storedSettings = JSON.parse(getCookie('hotPlaceId') || '{}');

      const thersholdId = moreJob[moreJob.length - 1]?.id;
      const result =
        typeJob === 'new' || typeJob === 'hot-job'
          ? await postApi.getPostNewestV3(
              childCateloriesArray,
              userSelected.userSelectedId,
              // null,
              // null,
              // profile && profile?.profileLocations?.length > 0 &&
              // profile?.profileLocations?.map((item: any) => {
              //     return item.id
              // }),
              null,
              null,
              20,
              thersholdId,
              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            )
          : typeJob === 'suggested'
          ? await nearByApi.getNearByJobV3(
              !idFilterProvinces && profileV3.length !== 0
                ? profileV3.addressText.id
                : idFilterProvinces
                ? [idFilterProvinces]
                : ['79'],
              null,
              null,
              20,
              nextPage,
              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            )
          : await postApi.getPostByThemeId(
              storedSettings?.placeId ? storedSettings?.placeId : placeIdRedux,
              20,
              thersholdId,
              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            );

      if (
        result &&
        (result.data.length !== 0 || result.data.posts.length !== 0)
      ) {
        typeJob === 'new' || typeJob === 'hot-job' || typeJob === 'suggested'
          ? setMoreJob((prev: any) => [...prev, ...result?.data])
          : setMoreJob((prev: any) => [...prev, ...result?.data.posts]);
        if (result.data.posts.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        message.config({
          top: 750,
          duration: 2,
          maxCount: 3,
        });
        message.error(
          languageRedux === 1
            ? 'Không còn công việc để hiện thị'
            : languageRedux === 2
            ? 'No more job to show'
            : languageRedux === 3 && '더 이상 표시할 채용정보가 없습니다.',
        );
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    let userSelected = JSON.parse(
      getCookie('userSelected') || '{}',
    ) as UserSelected;
    setUserSelectedId(userSelected.userSelectedId);

    getMoreJob();
    // setLoading(true);
    // setTimeout(() => {
    //   if (moreJob.length !== 0) {
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //   }
    // }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    languageRedux,
    idFilterProvinces,
    // profileV3,
    typeJob,
    childCateloriesArray,
    placeIdRedux,
    // JSON.parse(
    //   getCookie('userSelected') || '{}',
    // )?.userSelectedId
  ]);

  const [provincesData, setProvincesData] = React.useState<
    [
      {
        id: string;
        name: string;
        name_en: string;
        full_name: string;
        full_name_en: string;
        code_name: string;
        administrative_unit_id: number;
        administrative_region_id: number;
      },
    ]
  >();

  const getProvinces = async () => {
    try {
      const result = await locationApi.getAllProvinces(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        setProvincesData(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [optionsProvinces, setOptionsProvinces] = React.useState<
    SelectProps['options']
  >([]);

  React.useEffect(() => {
    if (provincesData) {
      const newOptionsProvinces = provincesData.map((provinces: any) => {
        if (languageRedux === 1) {
          return {
            value: provinces.id,
            label: provinces.full_name,
          };
        } else {
          return {
            value: provinces.id,
            label: provinces.full_name_en,
          };
        }
      });
      setOptionsProvinces(newOptionsProvinces);
    }
  }, [provincesData, languageRedux]);

  const handleChangeFilterHotjob = (event: SelectChangeEvent) => {
    // localStorage.setItem('filterHotjobProvince', value);
    // setCookie('filterHotjobProvince', value, 365);
    setIdFilterProvinces(event.target.value);
    setPage(0);
  };
  // console.log('moreJob', moreJob);

  return (
    <>
      {/* <Navbar />
      <CategoryDropdown /> */}

      <div
        className="more-job-page-container"
        style={{
          margin:
            typeJob === 'new' || typeJob === 'hot-job'
              ? '300px auto 0px'
              : '0px auto 0px',
        }}
      >
        <div
          style={{
            display:
              typeJob === 'new' || typeJob === 'hot-job' ? 'block' : 'none',
          }}
        >
          <CategoryCarousel />
          <Breadcrumbs />
        </div>
        {
          // automatic && (
          <Box sx={{ flexGrow: 1 }} ref={listRef}>
            <div
              style={{
                display: 'flex',
                // flexDirection: 'column',
                margin: '24px 0',
                alignItems: 'center',
                justifyContent: 'space-between',
                // background: '#aaaaaa',
                // padding: '8px 0',
              }}
            >
              <div
                className="more-job-title-container"
                id="more-job-title-container"
                style={typeJob === 'suggested' ? { flexDirection: 'row' } : {}}
              >
                <h3>
                  {typeJob === 'new'
                    ? languageRedux === 1
                      ? 'Công việc mới nhất'
                      : languageRedux === 2
                      ? 'Newest jobs'
                      : languageRedux === 3 && '최신 작업'
                    : typeJob === 'hot-job'
                    ? languageRedux === 1
                      ? 'Xem tất cả loại công việc'
                      : languageRedux === 2
                      ? 'View all category jobs'
                      : languageRedux === 3 && '모든 유형의 채용정보 보기'
                    : typeJob === 'suggested'
                    ? languageRedux === 1
                      ? 'Công việc gợi ý'
                      : languageRedux === 2
                      ? 'Suggested jobs in your city'
                      : languageRedux === 3 && '지역내 모든 추천'
                    : languageRedux === 1
                    ? 'Công việc theo Chủ đề'
                    : languageRedux === 2
                    ? 'Job by hot places'
                    : languageRedux === 3 && '지역내 모든 추천'}
                </h3>
                {typeJob === 'suggested' ? (
                  <div className="filter-hotjob">
                    <div className="filter-provinces">
                      {optionsProvinces?.length !== 0 ? (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={'01'}
                          defaultValue={
                            Object.keys(profileV3).length !== 0 &&
                            profileV3.addressText !== null
                              ? profileV3.addressText.id
                              : '79'
                          }
                          onChange={handleChangeFilterHotjob}
                          placeholder={
                            languageRedux === 1
                              ? 'Chọn địa chỉ'
                              : languageRedux === 2
                              ? 'Select address'
                              : languageRedux === 3
                              ? '지역내 모든 추천'
                              : 'Chọn địa chỉ'
                          }
                          sx={{
                            fontSize: '14px',
                            height: '32px',
                            minWidth: '85px',
                            width: 'fit-content',
                            borderRadius: '16px !important',
                          }}
                        >
                          {optionsProvinces?.map((v: any) => {
                            return (
                              <MenuItem value={v.value}>{v.label}</MenuItem>
                            );
                          })}
                        </Select>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {typeJob === 'place' ? (
                  <ListCompanyCarousel listTheme={listTheme} />
                ) : (
                  <></>
                )}
                {/* <div
                                    className="filter-moreJob"
                                    onClick={handleClickFilterHotjob}
                                >
                                    <div className="filter-provinces">
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Select
                                                size={'large'}
                                                // defaultValue={idFilterProvinces}
                                                onChange={handleChangeFilterHotjob}
                                                style={{ width: '220px' }}
                                                options={optionsProvinces}
                                                suffixIcon={
                                                    idFilterProvinces ? (
                                                        <LightFilterIcon width={20} height={20} />
                                                    ) : (
                                                        <FilterIcon width={20} height={20} />
                                                    )
                                                }
                                                placeholder={
                                                    languageRedux === 1
                                                        ? 'Lọc theo khu vực'
                                                        : 'Filter by Location'
                                                }
                                            />
                                        </Space>
                                    </div>
                                </div> */}
              </div>
            </div>

            {moreJob && moreJob.length > 0 ? (
              <>
                <InfiniteScroll
                  dataLength={moreJob?.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <Spin style={{ width: '100%' }} indicator={antIcon} />
                  }
                  style={{ overflow: 'unset' }}
                >
                  <Grid
                    container
                    spacing={2}
                    columns={{ xs: 6, sm: 4, md: 12 }}
                  >
                    {moreJob.map((item: any, index: number) => (
                      <Skeleton loading={loading} active>
                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                          {typeJob === 'new' ||
                          typeJob === 'hot-job' ||
                          typeJob === 'suggested' ? (
                            <JobCardMoreNewJob item={item} />
                          ) : (
                            <JobCardMoreJob item={item} />
                          )}
                        </Grid>
                      </Skeleton>
                    ))}
                  </Grid>
                </InfiniteScroll>
              </>
            ) : (
              <NoDataComponent loading={openBackdrop} />
            )}
            {/* <Backdrop
                            sx={{
                                color: '#0d99ff ',
                                backgroundColor: 'transparent',
                                zIndex: (theme: any) => theme.zIndex.drawer + 1,
                            }}
                            open={openBackdrop}
                        //  onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop> */}
          </Box>
          // )
        }
      </div>
      <ShowNotificativeSave />
      <ShowCancleSave />
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </>
  );
};
export default React.memo(MoreJobsPage);
