import React, { useEffect } from 'react';
import Card from '@mui/material/Card';

import Modal from '@mui/material/Modal';

import ImageListItem from '@mui/material/ImageListItem';

import Grid from '@mui/material/Grid';
import hotJobApi from 'api/hotJobApi';
// import { url } from 'inspector'

import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// icon material
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  NativeSelect,
  ListSubheader,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Autocomplete,
  Box,
  Chip,
  ListItemButton,
  Collapse,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@mui/material';
// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';
import { RootState } from 'store/reducer';

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';
// import api
// import postApi from 'api/postApi'
import bookMarkApi from 'api/bookMarkApi';
import searchApi from 'api/searchApi';
import profileApi from 'api/profileApi';
import locationApi from 'api/locationApi';
import Footer from '../../components/Footer/Footer';

import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore
import { Navbar } from '#components';
import { CreateKeywordIconSmall, MoreICon } from '#components/Icons';

//import jobcard
import JobCard from '../../components/Home/JobCard';
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
import {
  EnvironmentFilled,
  ClockCircleFilled,
  // EuroCircleFilled,
  CaretDownFilled,
} from '@ant-design/icons';

import { Space, Tooltip } from 'antd';

import './style.scss';
import { stringify } from 'query-string/base';
import notificationKeywordApi from 'api/notificationKeyword';

import ShowNotificativeSave from '#components/ShowNotificativeSave';
import ShowCancleSave from '#components/ShowCancleSave';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '640px',
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

const styleSuccess = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '440px',
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

const HotJobpage: React.FC = () => {
  const [hotjob, setHotJob] = React.useState<any>([]);
  const [hotJobType, setHotJobType] = React.useState<any>([]);
  const [hotJobTotal, setHotJobTotal] = React.useState<any>([]);
  const [page, setPage] = React.useState(2);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [searchData, setSearchData] = React.useState<any>();

  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate()
  const [checkBookMark, setCheckBookMark] = React.useState(true);

  // modal keyword
  const [dataAllLocation, setDataAllLocation] = React.useState<any>(null);

  const [selectedProvince, setSelectedProvince] = React.useState<any>(null);
  const [value, setValue] = React.useState<string | number>('');

  const [selectedProvinceId, setSelectedProvinceId] = React.useState<
    number | null
  >(null);

  const [open, setOpen] = React.useState<any>([]);
  const locations: any = [];

  const [location, setLocation] = React.useState<any>(
    locations?.map((v: any, i: number) => v.district),
  );

  const [locationId, setLocationId] = React.useState<any>(
    locations?.map((v: any, i: number) => v.district_id),
  );

  const [valueDistrict, setValueDistrict] = React.useState<any>({
    district: '',
    district_id: '',
    wards: [],
  });
  const [openModal, setOpenModal] = React.useState(false);

  const [valueKeyword, setValueKeyword] = React.useState('');
  const [districtId, setDistrictId] = React.useState<string>('');

  const [oenModalCreateSuccess, setOpenModalCreateSuccess] =
    React.useState(false);
  // state redux
  // const { postNewest } = useSelector((state: RootState) => state)
  const dispatch = useDispatch();
  // const { setPostNewest, setPostNewestMore } = bindActionCreators(
  //     actionCreators,
  //     dispatch
  // )

  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  const dataProfile = useSelector((state: RootState) => state.profileUser);

  // query value
  const QUERY = decodeURIComponent(`${searchParams.get('q')}`);

  const SALARY_TYPE = Number(searchParams.get('sal-type'));
  const MONEY_TYPE = Number(searchParams.get('money_type'));
  const SALARY_MIN = Number(searchParams.get('salary_min'));
  const SALARY_MAX = Number(searchParams.get('salary_max'));
  const IS_WORKING_WEEKEND = Number(searchParams.get('is_working_weekend'));
  const IS_REMOTELY = Number(searchParams.get('is_remotely'));

  const JOB_TYPE =
    Number(searchParams.get('job-type')) &&
    Number(searchParams.get('job-type'))! !== 5
      ? [Number(searchParams.get('job-type'))]
      : [];

  const LIST_DIS_ID = searchParams
    .getAll('dis-ids')
    .map((disId) => disId.split(','))
    .map((dis) => dis[1]);
  const LIST_CATEGORIES_ID = searchParams
    .getAll('categories-ids')
    .map((cateId) => cateId.split(','))
    .map((dis) => dis[1])
    .map(Number);

  const allLocation = async () => {
    try {
      const allLocation = await locationApi.getAllLocation();

      if (allLocation) {
        setDataAllLocation(allLocation.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    allLocation();
    // getAllLocations()
    // delete param when back to page
  }, []);

  const getHotJob = async () => {
    try {
      const hotjob = await hotJobApi.getHotJobById(
        Number(searchParams.get('hotjob-id')),
      );
      const hotjobtype = Number(searchParams.get('hotjob-type'));
      const hotjobtotal = Number(searchParams.get('hotjob-total'));
      setHotJob(hotjob.data);
      setHotJobType(hotjobtype);
      setHotJobTotal(hotjobtotal);
      console.log('result', hotjob);
      console.log('type', hotjobtype);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getHotJob();
  }, []);

  console.log(hotjob);

  console.log('type', hotJobType);
  // handle click post details
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`);
  };

  // handle change paginaton
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    const result = await searchApi.getSearchByQueryV2(
      QUERY,
      page,
      MONEY_TYPE,
      IS_WORKING_WEEKEND,
      IS_REMOTELY,
      null,
      SALARY_MIN,
      SALARY_MAX,
      null,
      null,
      JOB_TYPE,
      LIST_CATEGORIES_ID,
      LIST_DIS_ID,
      SALARY_TYPE,
    );

    //
    if (result && result?.data?.posts.length !== 0) {
      setSearchData((prev: any) => {
        return {
          posts: [...prev.posts, ...result.data.posts],
          total: result.data.total,
        };
      });
      setPage(page + 1);
    } else {
      console.log('da het data', result);
    }
  };

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  const fetchDataProfileUser = async () => {
    try {
      await dispatch(getProfile() as any);
      const result = await profileApi.getProfile();
      if (result) {
        setProfileUser(result.data);
      }
    } catch (error) {
      // Xử lý lỗi
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchDataProfileUser();
  }, []);

  useEffect(() => {
    if (dataAllLocation && dataAllLocation.length > 0) {
      setOpen(Array(dataAllLocation.length).fill(false));
    }
  }, [dataAllLocation]);

  // title

  const [titleFirebase, setTitleFirebase] = React.useState<string>('');

  React.useEffect(() => {
    if (dataAllLocation) {
      setTitleFirebase('HiJob - Hot Job');
    }
  }, [dataAllLocation]);

  React.useEffect(() => {
    document.title = titleFirebase ? titleFirebase : 'web-hotjob';
  }, [titleFirebase]);

  return (
    <>
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
                <Grid container spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
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
                    display: 'flex',
                    alignItems: 'center',
                    margin: '24px 0',
                  }}
                >
                  {/* <Pagination count={10} shape="rounded" /> */}
                  <Space
                    className="div-hover-more"
                    onClick={(e) => {
                      handleChange(e, page);
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
      <Footer />
    </>
  );
};
export default React.memo(HotJobpage);
