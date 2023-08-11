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

import { Box } from '@mui/material';
// import redux

// import { bindActionCreators } from 'redux';
// import { actionCreators } from 'store/index';
// import { RootState } from 'store/reducer';

// import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';
import { message } from 'antd';
// import api
// import postApi from 'api/postApi'

import Footer from '../../components/Footer/Footer';

// import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore
import { Navbar } from '#components';
import { MoreICon } from '#components/Icons';

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

import { Space } from 'antd';

import './style.scss';
// import { stringify } from 'query-string/base';
// import notificationKeywordApi from 'api/notificationKeyword';

import ShowNotificativeSave from '#components/ShowNotificativeSave';
import ShowCancleSave from '#components/ShowCancleSave';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import languageApi from 'api/languageApi';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
import { hotjobPage } from 'validations/lang/vi/hotjobPage';
import { hotjobPageEn } from 'validations/lang/en/hotjobPage';

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
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language,);
  const [hotjob, setHotJob] = React.useState<any>([]);
  const [hotJobType, setHotJobType] = React.useState<any>([]);
  const [hotJobTotal, setHotJobTotal] = React.useState<any>([]);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = React.useState(true);

  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate()
  // const [checkBookMark, setCheckBookMark] = React.useState(true);

  const [pageNumber, setPageNumber] = React.useState(0);
  const [language, setLanguage] = React.useState<any>();
  const [totalPage, setTotalPage] = React.useState<any>(
    Math.round(Number(searchParams.get('hotjob-total')) / 21) + 1)
    ;

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? "vi" : "en"
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
    getlanguageApi()
  }, [languageRedux])

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
    document.title = languageRedux === 1 ?
      hotjobPage.title_page :
      hotjobPageEn.title_page;
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_hotJob' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // state redux
  // const { postNewest } = useSelector((state: RootState) => state)

  const getHotJob = async () => {
    try {
      const url = localStorage.getItem('hotjobApi');
      let hotjob = await hotJobApi.getHotJobById(url, pageNumber,
        searchParams.get('hotjob-id') === '1' ? 20 : 19,
        languageRedux === 1 ? "vi" : "en");
      const hotjobtype = Number(searchParams.get('hotjob-type'));
      const hotjobtotal = Number(searchParams.get('hotjob-total'));
      // hotjobtotal / 20
      setHotJob(hotjob.data);
      setHotJobType(hotjobtype);
      setHotJobTotal(hotjobtotal);
      setIsVisible(true);
      // setTotalPage(Math.round(hotjobtotal / 20) + 1);
    } catch (error) {
      console.log(error);
    }
  };


  const getMoreHotJob = async () => {
    try {
      if (pageNumber + 1 === totalPage) {
        setIsVisible(false);
        setOpenBackdrop(false);
        setPageNumber(0)
        messageApi.open({
          type: 'error',
          content: languageRedux === 1 ?
            historyVi.out_job :
            historyEn.out_job,

        });
        return;
      }
      setOpenBackdrop(true);
      setPageNumber(pageNumber + 1);
      const url = localStorage.getItem('hotjobApi');
      const result = await hotJobApi.getHotJobById(url, pageNumber,
        searchParams.get('hotjob-id') === '1' ? 20 : 19,
        languageRedux === 1 ? "vi" : "en");
      if (result) {
        setHotJob([...hotjob, ...result.data]);
        setOpenBackdrop(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // setPageNumber(0)
    getHotJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  // React.useEffect(() => {
  //   getMoreHotJob();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageNumber]);

  // handle click post details
  console.log("page number", pageNumber);
  console.log("totalPage", totalPage);


  // handle change paginaton
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    // pageNumber === totalPage ?
    //   setPageNumber(pageNumber - 1) :
    getMoreHotJob()
    // setPageNumber(pageNumber + 1);
  };

  // handle close backdrop

  // title

  return (
    <>
      {contextHolder}
      <Navbar />

      <div className="hot-job-page-container">
        {
          // automatic && (
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
                  {language?.title_hot_jobs}{' '}
                  {hotJobType === 1
                    ? language?.remote_work
                    : hotJobType === 3
                      ? 'Influencer'
                      : hotJobType === 4
                        ? languageRedux === 1 ?
                          hotjobPage.short_time :
                          hotjobPageEn.short_time
                        : hotJobType === 5
                          ? languageRedux === 1 ?
                            hotjobPage.job_today :
                            hotjobPageEn.job_today
                          : hotJobType === 6
                            ? 'Freelancer'
                            : ''}
                </h3>
                <h4>
                  {hotJobTotal ? hotJobTotal : 0}
                  <span>
                    {' '}
                    {
                      languageRedux === 1 ?
                        hotjobPage.result :
                        hotjobPageEn.result
                    }
                  </span>
                </h4>
              </div>
            </div>

            {hotjob.length > 0 ? (
              <>
                <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
                  {hotjob.map((item: PostHotJob, index: number) => (
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
                  ))}
                </Grid>
                <Stack
                  spacing={2}
                  sx={{
                    display: isVisible ? 'flex' : 'none',
                    alignItems: 'center',
                    margin: '24px 0',
                  }}
                >
                  {/* <Pagination count={10} shape="rounded" /> */}
                  <Space
                    className="div-hover-more"
                    onClick={(e) => {
                      handleChange(e, pageNumber);
                    }}
                  >
                    <p>
                      {language?.more}
                    </p>
                    <MoreICon width={20} height={20} />
                  </Space>
                </Stack>
              </>
            ) : (
              <></>
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
          // )
        }
      </div>
      <ShowNotificativeSave />
      <ShowCancleSave />
      <Footer />
    </>
  );
};
export default React.memo(HotJobpage);
