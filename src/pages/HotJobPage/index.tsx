import React from 'react';
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
//@ts-ignore
import {
  FilterIconHotjob,
  MoreICon,
  FilterIcon,
  LightFilterIcon,
} from '#components/Icons';

// import Select from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Skeleton, Space, message, Spin } from 'antd';
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
import JobCardHotJob from './JobCardHotJob';
import InfluencerCard from './InfluencerCard';

// import { useHomeState } from '../Home/HomeState'

import {
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import languageApi from 'api/languageApi';
import locationApi from 'api/locationApi';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
import { hotjobPage } from 'validations/lang/vi/hotjobPage';
import { hotjobPageEn } from 'validations/lang/en/hotjobPage';
import { getCookie } from 'cookies';
import NoDataComponent from 'utils/NoDataPage';
import HotJob from '#components/Home/HotJob';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

export interface PostHotJob {
  id: number;
  address: string;
  bookmarked: boolean;
  companyName: string;
  companyResourceData: {
    id: number;
    logo: string;
    name: string;
  };
  createdAtText: string;
  image: string;
  jobType: {
    id: number;
    name: string;
  };
  location: {
    district: {
      id: number;
      fullName: string;
    };
    province: {
      id: number;
      fullName: string;
    };
    ward: {
      id: number;
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

const HotJobpage: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [hotjob, setHotJob] = React.useState<any>([]);
  const [hotJobType, setHotJobType] = React.useState<any>([]);
  const [hotJobTotal, setHotJobTotal] = React.useState<any>([]);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = React.useState(true);

  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  // const navigate = useNavigate()
  // const [checkBookMark, setCheckBookMark] = React.useState(true);

  const [pageNumber, setPageNumber] = React.useState(0);
  // const [language, setLanguage] = React.useState<any>();
  const [totalPage, setTotalPage] = React.useState<number>(
    Math.round(Number(searchParams.get('hotjob-total')) / 20) + 1,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const [idFilterProvinces, setIdFilterProvinces] = React.useState('');

  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState<any>('0');

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // modal keyword

  // const [selectedProvince, setSelectedProvince] = React.useState<any>(null);
  // const [value, setValue] = React.useState<string | number>('');

  // const [selectedProvinceId, setSelectedProvinceId] = React.useState<
  //   number | null
  // >(null);

  // const [open, setOpen] = React.useState<any>([]);
  // const locations: any = [];

  // const [location, setLocation] = React.useState<any>(
  //   locations?.map((v: any, i: number) => v.district),
  // );

  // const [locationId, setLocationId] = React.useState<any>(
  //   locations?.map((v: any, i: number) => v.district_id),
  // );

  // const [valueDistrict, setValueDistrict] = React.useState<any>({
  //   district: '',
  //   district_id: '',
  //   wards: [],
  // });
  // const [openModal, setOpenModal] = React.useState(false);

  // const [valueKeyword, setValueKeyword] = React.useState('');
  // const [districtId, setDistrictId] = React.useState<string>('');

  // const [oenModalCreateSuccess, setOpenModalCreateSuccess] =
  //   React.useState(false);

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title = language?.hot_job_page?.title_page;
    getProvinces();
    document.title =
      languageRedux === 1
        ? 'HiJob - Bài tuyển dụng nổi bật'
        : languageRedux === 2
          ? 'HiJob - Hot Job Post'
          : 'HiJob - 주요 채용 게시물';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_hotJob' as string,
    });

    setTotalPage(Math.round(hotJobTotal / 20) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);
  // state redux
  // const { postNewest } = useSelector((state: RootState) => state)

  const getHotJob = async () => {
    try {
      // let provinceId = JSON.parse(getCookie('filterHotjobProvince') || '{}');

      // console.log(localStorage.getItem('filterHotjobProvince'));

      // const provinceId = localStorage.getItem('filterHotjobProvince');

      // const url = localStorage.getItem('hotjobApi');

      let hotjob: any = await hotJobApi.getHotJobById(
        `/v3/posts/topic/${searchParams.get('hotjob-id')}?a=394,370`,
        pageNumber,
        searchParams.get('hotjob-type') === '1' ? 18 : 20,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',

        // !idFilterProvinces && profileV3.length !== 0
        //   ? profileV3.addressText.id
        //   : idFilterProvinces
        //   ? idFilterProvinces
        //   : '0',
        idFilterProvinces ? idFilterProvinces : '0',
      );

      // console.log('hotjob.data.total', hotjob['total'] as any);
      const hotjobtype = Number(searchParams.get('hotjob-type'));
      // const hotjobtotal = Number(searchParams.get('hotjob-total'));
      const hotjobtotal = getCookie('hotjobTotal');

      // hotjobtotal / 20

      setHotJobTotal(hotjob.total);

      setHasMore(true);

      if (hotjob && hotjob.data.length === 18 && hotjobtype === 1) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
      } else if (hotjob && hotjob.data.length === 20 && hotjobtype === 2) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
      } else if (hotjob && hotjob.data.length < 18 && hotjobtype === 1) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
        setHasMore(false);
      } else if (hotjob && hotjob.data.length < 20 && hotjobtype === 2) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
        setHasMore(false);
      } else {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
        // setHotJobTotal(hotjob.data.length);
        setHasMore(false);
        setPage('0');
        return;
      }

      setTotalPage(Math.round(Number(hotjobtotal) / 20) + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('getHost', localStorage.getItem('hotjobApi'));

  // const getMoreHotJob = async () => {
  //   try {
  //     const nextPage = pageNumber + 1;
  //     if (pageNumber + 1 === totalPage) {
  //       setIsVisible(false);
  //       setOpenBackdrop(false);
  //       setPageNumber(0);
  //       messageApi.open({
  //         type: 'error',
  //         content: language?.out_job,
  //       });
  //       return;
  //     }
  //     setOpenBackdrop(true);
  //     setPageNumber(nextPage);
  //     const url = localStorage.getItem('hotjobApi');
  //     const result = await hotJobApi.getHotJobById(
  //       url,
  //       nextPage,
  //       searchParams.get('hotjob-id') === '1' ? 18 : 20,
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //       idFilterProvinces,
  //     );
  //     if (result) {
  //       setHotJob([...hotjob, ...result.data]);
  //       setOpenBackdrop(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
    // setPageNumber(0)
    getHotJob();
    setLoading(true);
    setTimeout(() => {
      if (hotjob.length !== 0) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, idFilterProvinces]);

  // React.useEffect(() => {
  //   getMoreHotJob();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageNumber]);

  // handle click post details
  // handle change paginaton

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
      console.log('result', result.data);

      if (result) {
        const itemsAll = {
          administrative_region_id: 0,
          administrative_unit_id: 0,
          code_name: 'All',
          full_name:
            languageRedux === 1
              ? 'Tất cả'
              : languageRedux === 2
                ? 'All'
                : '전부',
          full_name_en:
            languageRedux === 1
              ? 'Tất cả'
              : languageRedux === 2
                ? 'All'
                : '전부',
          id: '0',
          name: 'All',
          name_en: 'All',
        };

        const LocationAll = [itemsAll, ...result.data] as [
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
        ];
        setProvincesData(LocationAll);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    // pageNumber === totalPage ?
    //   setPageNumber(pageNumber - 1) :
    // getMoreHotJob();
    // setPageNumber(pageNumber + 1);
  };

  // handle close backdrop

  // title

  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     value: i.toString(36) + i,
  //     label: i.toString(36) + i,
  //   });
  // }

  // var options: SelectProps['options'] = [];

  const [optionsProvinces, setOptionsProvinces] = React.useState<any>([]);

  React.useEffect(() => {
    const newOptionsProvinces = provincesData?.map((provinces: any) => {
      if (languageRedux && languageRedux === 1) {
        return {
          label: provinces.full_name,
          value: provinces.id,
        };
      } else {
        return {
          label: provinces.full_name_en,
          value: provinces.id,
        };
      }
    });

    if (newOptionsProvinces) {
      setOptionsProvinces(newOptionsProvinces);
    }
  }, [provincesData, languageRedux]);

  const handleClickFilterHotjob = () => {};

  const handleChangeFilterHotjob = (event: SelectChangeEvent) => {
    // localStorage.setItem('filterHotjobProvince', value);
    // setCookie('filterHotjobProvince', value, 365);

    setIdFilterProvinces(event.target.value);
    setPage('0');
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = parseInt(page) + 1;
      // const url = localStorage.getItem('hotjobApi');

      let result: any = await hotJobApi.getHotJobById(
        `/v3/posts/topic/${searchParams.get('hotjob-id')}?a=394,370`,
        nextPage,
        searchParams.get('hotjob-type') === '1' ? 18 : 20,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',

        // !idFilterProvinces && profileV3.length !== 0
        //   ? profileV3.addressText.id
        //   : idFilterProvinces
        //   ? [idFilterProvinces]
        //     : [idFilterProvinces],
        idFilterProvinces ? idFilterProvinces : '0',
      );

      if (result && result.data.length !== 0) {
        setHotJob((prev: any) => [...prev, ...result?.data]);
        setPage(nextPage);
      } else {
        setHasMore(false);
        setPage('0');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  // console.log(profileV3);
  return (
    <>
      {contextHolder}
      {/* <Navbar />
      <CategoryDropdown /> */}

      <div className="hot-job-page-container">
        <Box sx={{ flexGrow: 1 }} ref={listRef}>
          <div
            style={{
              display: 'flex',
              // flexDirection: 'column',
              margin: '0px 0px 24px',
              alignItems: 'center',
              justifyContent: 'space-between',
              // background: '#aaaaaa',
              // padding: '8px 0',
            }}
          >
            <div className="hot-job-title-container">
              <h3>
                {/* {language?.title_hot_jobs}{' '} */}
                {searchParams.get('hotjob-id') === '2'
                  ? languageRedux === 1
                    ? 'Làm việc từ xa'
                    : languageRedux === 2
                      ? 'Remote work'
                      : '원격 근무'
                  : searchParams.get('hotjob-id') === '1'
                    ? languageRedux === 1
                      ? 'Influencer'
                      : languageRedux === 2
                        ? 'Influencer'
                        : '인플루언서'
                    : searchParams.get('hotjob-id') === '3'
                      ? languageRedux === 1
                        ? 'Công việc ngắn hạn'
                        : languageRedux === 2
                          ? 'Short-term job'
                          : '단기 근무'
                      : searchParams.get('hotjob-id') === '4'
                        ? languageRedux === 1
                          ? 'Công việc hôm nay'
                          : languageRedux === 2
                            ? "Today's job"
                            : '오늘의 작업'
                        : searchParams.get('hotjob-id') === '5'
                          ? languageRedux === 1
                            ? 'Làm việc tự do'
                            : languageRedux === 2
                              ? 'Freelancer'
                              : '프리랜서'
                          : searchParams.get('hotjob-id') === '6'
                            ? languageRedux === 1
                              ? 'Tài xế'
                              : languageRedux === 2
                                ? 'Driver'
                                : '운전기사'
                            : searchParams.get('hotjob-id') === '7'
                              ? languageRedux === 1
                                ? 'Dịch vụ nhà hàng'
                                : languageRedux === 2
                                  ? 'Restaurant Service'
                                  : '레스토랑 서비스'
                              : searchParams.get('hotjob-id') === '8'
                                ? languageRedux === 1
                                  ? 'Dịch vụ nhà hàng'
                                  : languageRedux === 2
                                    ? 'Restaurant Service'
                                    : '레스토랑 서비스'
                                : searchParams.get('hotjob-id') === '9'
                                  ? languageRedux === 1
                                    ? 'Bán thời gian'
                                    : languageRedux === 2
                                      ? 'Part time'
                                      : '파트타임'
                                  : searchParams.get('hotjob-id') === '10'
                                    ? languageRedux === 1
                                      ? 'Tiếp thị'
                                      : languageRedux === 2
                                        ? 'Marketing'
                                        : '마케팅'
                                    : searchParams.get('hotjob-id') === '11'
                                      ? languageRedux === 1
                                        ? 'Làm đẹp'
                                        : languageRedux === 2
                                          ? 'Beauty'
                                          : '아름다움'
                                      : languageRedux === 1
                                        ? 'Đang tải'
                                        : languageRedux === 2
                                          ? 'Loading'
                                          : '로드 중'}{' '}
                {languageRedux === 1
                  ? 'có'
                  : languageRedux === 2
                    ? 'has'
                    : languageRedux === 3 && ':'}{' '}
                {hotjob.length !== 0
                  ? // ? Number(hotJobTotal.toLocaleString())
                    new Intl.NumberFormat('en-US').format(hotJobTotal)
                  : languageRedux === 1
                    ? '0 kết quả'
                    : languageRedux === 2
                      ? '0 result'
                      : languageRedux === 3 && '0 결과'}
                <span>
                  {' '}
                  {
                    // language?.hot_job_page?.result
                    languageRedux === 1 && hotjob.length !== 0
                      ? 'kết quả'
                      : languageRedux === 2 &&
                          hotJobTotal >= 2 &&
                          hotjob.length !== 0
                        ? 'results'
                        : languageRedux === 2 &&
                            hotJobTotal < 2 &&
                            hotjob.length !== 0
                          ? 'result'
                          : '건'
                  }
                </span>
              </h3>
              <div className="filter-hotjob">
                <div className="filter-provinces">
                  {optionsProvinces.length !== 0 ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={'01'}
                      defaultValue={'0'}
                      onChange={handleChangeFilterHotjob}
                      placeholder={
                        languageRedux === 1
                          ? 'Chọn địa chỉ'
                          : languageRedux === 2
                            ? 'Select Address'
                            : languageRedux === 3
                              ? '주소 선택'
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
                      {optionsProvinces.map((v: any) => {
                        return <MenuItem value={v.value}>{v.label}</MenuItem>;
                      })}
                    </Select>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* <h4>
                  {hotJobTotal ? hotJobTotal : 0}
                  <span>
                    {' '}
                    {
                      language?.hot_job_page?.result
                    }
                  </span>
                </h4> */}
            </div>
          </div>

          {hotjob.length > 0 ? (
            // <>
            //   <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
            //     {hotjob.map((item: PostHotJob, index: number) => (
            //       <Skeleton loading={loading} active>
            //         <Grid
            //           item
            //           xs={12}
            //           sm={6}
            //           md={hotJobType === 3 ? 4 : 6}
            //           lg={4}
            //           key={index}
            //         >
            //           {hotJobType === 3 ? (
            //             <InfluencerCard item={item} />
            //           ) : (
            //             <JobCardHotJob item={item} />
            //           )}
            //         </Grid>
            //       </Skeleton>
            //     ))}
            //   </Grid>
            //   <Stack
            //     spacing={2}
            //     sx={{
            //       display: isVisible ? 'flex' : 'none',
            //       alignItems: 'center',
            //       margin: '24px 0',
            //     }}
            //   >
            //     {/* <Pagination count={10} shape="rounded" /> */}
            //     <Space
            //       className="div-hover-more"
            //       onClick={(e) => {
            //         handleChange(e, pageNumber);
            //       }}
            //     >
            //       <p>{languageRedux === 1
            // ? 'Xem thêm'
            //   : languageRedux === 2
            //     ? 'See more'
            //     : '더보기'}</p>
            //       <MoreICon width={20} height={20} />
            //     </Space>
            //   </Stack >
            // </>

            <>
              <InfiniteScroll
                dataLength={hotjob?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
                style={{ overflow: 'unset' }}
              >
                <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
                  {hotjob.map((item: PostHotJob, index: number) => (
                    <Skeleton loading={loading} active key={index}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={searchParams.get('hotjob-type') === '2' ? 6 : 6}
                        lg={6}
                        key={index}
                      >
                        {searchParams.get('hotjob-type') === '1' ? (
                          <InfluencerCard item={item} />
                        ) : (
                          <JobCardHotJob item={item} />
                        )}
                      </Grid>
                    </Skeleton>
                  ))}
                </Grid>
              </InfiniteScroll>
            </>
          ) : (
            <NoDataComponent />
          )}
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
      </div>
      <ShowNotificativeSave />
      <ShowCancleSave />
      {/* <RollTop />
      <Footer /> */}
    </>
  );
};
export default React.memo(HotJobpage);
