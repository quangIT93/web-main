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

import RollTop from '#components/RollTop';
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
    document.title = 'HiJob - Bài tuyển dụng nổi bật';
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
      const hotjob = await hotJobApi.getHotJobById(
        url,
        pageNumber,
        searchParams.get('hotjob-id') === '1' ? 20 : 19,
        'vi',
      );
      const hotjobtype = Number(searchParams.get('hotjob-type'));
      const hotjobtotal = Number(searchParams.get('hotjob-total'));
      setHotJob(hotjob.data);
      setHotJobType(hotjobtype);
      setHotJobTotal(hotjobtotal);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('getHost', localStorage.getItem('hotjobApi'));

  const getMoreHotJob = async () => {
    try {
      setOpenBackdrop(!openBackdrop);
      const url = localStorage.getItem('hotjobApi');

      const result = await hotJobApi.getHotJobById(
        url,
        pageNumber,
        searchParams.get('hotjob-id') === '1' ? 20 : 19,
        'vi',
      );
      if (result) {
        if (result.data.length === 0) {
          setIsVisible(false);
          setOpenBackdrop(false);
          messageApi.open({
            type: 'error',
            content: 'Đã hết công việc để hiển thị',
          });
          return;
        }

        setHotJob([...hotjob, ...result.data]);
        setOpenBackdrop(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getHotJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    getMoreHotJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  // handle click post details

  // handle change paginaton
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    setPageNumber(pageNumber + 1);
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
                  Việc làm{' '}
                  {hotJobType === 1
                    ? 'Remote'
                    : hotJobType === 3
                    ? 'Influencer'
                    : hotJobType === 4
                    ? 'Short time'
                    : hotJobType === 5
                    ? 'Job today'
                    : hotJobType === 6
                    ? 'Freelancer'
                    : ''}
                </h3>
                <h4>
                  {hotJobTotal ? hotJobTotal : 0}
                  <span> kết quả</span>
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
                    <p>Xem thêm</p>
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
      <RollTop />
      <Footer />
    </>
  );
};
export default React.memo(HotJobpage);
