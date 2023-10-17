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

import RollTop from '#components/RollTop';

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

import Footer from '../../components/Footer/Footer';

// import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore
import { Navbar } from '#components';

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
import CategoryDropdown from '#components/CategoryDropdown';

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
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
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
        : 'HiJob - Hot Job Post';
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

      const url = localStorage.getItem('hotjobApi');
      let hotjob: any = await hotJobApi.getHotJobById(
        url,
        pageNumber,
        searchParams.get('hotjob-id') === '1' ? 18 : 20,
        languageRedux === 1 ? 'vi' : 'en',
        // idFilterProvinces && provinceId,
        idFilterProvinces,
      );

      // console.log('hotjob.data.total', hotjob['total'] as any);
      const hotjobtype = Number(searchParams.get('hotjob-type'));
      // const hotjobtotal = Number(searchParams.get('hotjob-total'));
      const hotjobtotal = getCookie('hotjobTotal');

      // hotjobtotal / 20

      setHotJobTotal(hotjob.total);

      setHasMore(true);
      if (hotjob && hotjob.data.length < 18 && hotjobtype === 3) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
        // setHotJobTotal(hotjob.data.length);
        setHasMore(false);
        setPage('0');
        return;
      } else if (hotjob && hotjob.data.length >= 18 && hotjobtype === 3) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
        // setHotJobTotal(hotjob.data.length);
        setLoading(false);
        return;
      }

      if (hotjob && hotjob.data.length < 20 && hotjobtype !== 3) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
        // setHotJobTotal(hotjob.data.length);
        setHasMore(false);
        setPage('0');
        setLoading(false);
        return;
      } else if (hotjob && hotjob.data.length !== 0) {
        setHotJob(hotjob.data);
        setHotJobType(hotjobtype);
        setIsVisible(true);
        // setHotJobTotal(hotjob.data.length);
        setLoading(false);
        return;
      } else {
        setHotJob([]);
        setHasMore(false);
        setPage('0');
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
  //       languageRedux === 1 ? 'vi' : 'en',
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
    // setTimeout(() => {
    //   if (hotjob.length !== 0) {
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //   }
    // }, 1000);
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
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setProvincesData(result.data);
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
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = parseInt(page) + 1;
      const url = localStorage.getItem('hotjobApi');
      const result = await hotJobApi.getHotJobById(
        url,
        nextPage,
        searchParams.get('hotjob-id') === '1' ? 18 : 20,
        languageRedux === 1 ? 'vi' : 'en',
        idFilterProvinces,
      );

      if (result && result.data.length !== 0) {
        setHotJob((prev: any) => [...prev, ...result?.data]);
        setPage(nextPage);
      } else {
        setHasMore(false);
        setPage('0');
      }
    } catch (error) {}
  };
  // console.log('hothob', hotjob);

  return (
    <>
      {contextHolder}
      <Navbar />
      <CategoryDropdown />

      <div className="hot-job-page-container">
        <Box sx={{ flexGrow: 1 }} ref={listRef}>
          <div
            style={{
              display: 'flex',
              // flexDirection: 'column',
              margin: '20px 0',
              alignItems: 'center',
              justifyContent: 'space-between',
              // background: '#aaaaaa',
              padding: '8px 0',
            }}
          >
            <div className="hot-job-title-container">
              <h3>
                {/* {language?.title_hot_jobs}{' '} */}
                {hotJobType === 1
                  ? language?.remote_work
                  : hotJobType === 3
                  ? 'Influencer'
                  : hotJobType === 4
                  ? language?.hot_job_page?.short_time
                  : hotJobType === 5
                  ? language?.hot_job_page?.job_today
                  : hotJobType === 6
                  ? 'Freelancer'
                  : hotJobType === 7
                  ? 'Delivery/Driver'
                  : 'Loading...'}{' '}
                {languageRedux === 1 ? 'có' : 'has'}{' '}
                {hotjob.length !== 0
                  ? // ? Number(hotJobTotal.toLocaleString())
                    new Intl.NumberFormat('en-US').format(hotJobTotal)
                  : languageRedux === 1
                  ? '0 kết quả'
                  : '0 result'}
                <span>
                  {' '}
                  {
                    // language?.hot_job_page?.result
                    languageRedux === 1 && hotjob.length !== 0
                      ? 'kết quả'
                      : hotJobTotal >= 2 && hotjob.length !== 0
                      ? 'results'
                      : hotJobTotal < 2 && hotjob.length !== 0
                      ? 'result'
                      : ''
                  }
                </span>
              </h3>
              <div className="filter-hotjob" onClick={handleClickFilterHotjob}>
                <div className="filter-provinces">
                  {optionsProvinces.length !== 0 ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={'01'}
                      defaultValue={profileV3.addressText.id}
                      onChange={handleChangeFilterHotjob}
                      placeholder={
                        languageRedux === 1 ? 'Chọn địa chỉ' : 'Select Address'
                      }
                    >
                      {optionsProvinces.map((v: any) => {
                        return <MenuItem value={v.value}>{v.label}</MenuItem>;
                      })}
                      <MenuItem value={10}>Ten</MenuItem>
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
            //       <p>{language?.more}</p>
            //       <MoreICon width={20} height={20} />
            //     </Space>
            //   </Stack>
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
                        md={hotJobType === 3 ? 4 : 6}
                        lg={4}
                        key={index}
                      >
                        {hotJobType === 3 ? (
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
      <RollTop />
      <Footer />
    </>
  );
};
export default React.memo(HotJobpage);
