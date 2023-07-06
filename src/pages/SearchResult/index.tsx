import React, { useEffect } from 'react';
import Card from '@mui/material/Card';

import Modal from '@mui/material/Modal';

import ImageListItem from '@mui/material/ImageListItem';

import Grid from '@mui/material/Grid';
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
import Footer from '../../components/Footer/index';

import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore
import { Navbar } from '#components';
import { CreateKeywordIconSmall } from '#components/Icons';

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

interface PostNewest {
  id: number;
  post_id: Number;
  title: string;
  company_name: string;
  image: string;
  ward: string;
  district: string;
  province: string;
  end_time: number;
  start_time: number;
  salary_max: number;
  salary_min: number;
  salary_type: string;
  resource: {
    company_icon: string;
  };
  job_type: {
    job_type_name: string;
  };
  created_at_text: string;
  bookmarked: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NewJobs: React.FC = () => {
  // const {
  //   openCollapse,
  //   setOpenCollapse,
  //   height,
  //   setHeight,

  //   setOpenModalLogin,
  // } = useHomeState()

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

  const [valueDistrict, setValueDistrict] = React.useState<string>('');

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

  // handle click post details
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`);
  };

  // handle change paginaton
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    // listRef.current?.scrollIntoView();
    // const array = [1, 2, 3]
    // // const e = createSearchParams({ name: `${array}` })
    // setSearchParams({ 'name': `${array}` })
    // // console.log("newest: ", result)
    // const test = searchParams.get('name')?.toString().split(",").map(Number)
    // console.log(test)
    // //    window.open(`/home?${e}`)
    // const result = await searchApi.getSearchByQueryV2(
    //   !dataProfile && !QUERY //không có profile và value
    //     ? ''
    //     : !dataProfile && QUERY //không có profile nhưng có value
    //     ? QUERY
    //     : dataProfile && !QUERY //Có profile nhưng không có value
    //     ? '' // Lấy profile
    //     : dataProfile && QUERY // Có profile và value
    //     ? QUERY
    //     : '',
    //   page,
    //   !dataProfile && !MONEY_TYPE //không có profile và value
    //     ? 1
    //     : !dataProfile && MONEY_TYPE //không có profile nhưng có value
    //     ? MONEY_TYPE
    //     : dataProfile && !MONEY_TYPE //Có profile nhưng không có value
    //     ? 1 // Lấy profile
    //     : dataProfile && MONEY_TYPE // Có profile và value
    //     ? MONEY_TYPE
    //     : 1,
    //   !dataProfile && !IS_WORKING_WEEKEND //không có profile và value
    //     ? null
    //     : !dataProfile && IS_WORKING_WEEKEND //không có profile nhưng có value
    //     ? IS_WORKING_WEEKEND
    //     : dataProfile && !IS_WORKING_WEEKEND //Có profile nhưng không có value
    //     ? null // Lấy profile
    //     : dataProfile && IS_WORKING_WEEKEND // Có profile và value
    //     ? IS_WORKING_WEEKEND
    //     : null,
    //   !dataProfile && !IS_REMOTELY //không có profile và value
    //     ? null
    //     : !dataProfile && IS_REMOTELY //không có profile nhưng có value
    //     ? IS_REMOTELY
    //     : dataProfile && !IS_REMOTELY //Có profile nhưng không có value
    //     ? null // Lấy profile
    //     : dataProfile && IS_REMOTELY // Có profile và value
    //     ? IS_REMOTELY
    //     : null,
    //   null,
    //   !dataProfile && !SALARY_MIN //không có profile và value
    //     ? 6000000
    //     : !dataProfile && SALARY_MIN //không có profile nhưng có value
    //     ? SALARY_MIN
    //     : dataProfile && !SALARY_MIN //Có profile nhưng không có value
    //     ? 6000000 // Lấy profile
    //     : dataProfile && SALARY_MIN // Có profile và value
    //     ? SALARY_MIN
    //     : 6000000,
    //   !dataProfile && !SALARY_MAX //không có profile và value
    //     ? 12000000
    //     : !dataProfile && SALARY_MAX //không có profile nhưng có value
    //     ? SALARY_MAX
    //     : dataProfile && !SALARY_MAX //Có profile nhưng không có value
    //     ? 12000000 // Lấy profile
    //     : dataProfile && SALARY_MAX // Có profile và value
    //     ? SALARY_MAX
    //     : 12000000,
    //   null,
    //   null,
    //   !dataProfile && !JOB_TYPE //không có profile và value
    //     ? []
    //     : !dataProfile && JOB_TYPE //không có profile nhưng có value
    //     ? JOB_TYPE
    //     : dataProfile && !JOB_TYPE //Có profile nhưng không có value
    //     ? [] // Lấy profile
    //     : dataProfile && JOB_TYPE // Có profile và value
    //     ? JOB_TYPE
    //     : [],
    //   !dataProfile && LIST_CATEGORIES_ID.length === 0 //không có profile và value
    //     ? null
    //     : !dataProfile && LIST_CATEGORIES_ID //không có profile nhưng có value
    //     ? LIST_CATEGORIES_ID
    //     : dataProfile && LIST_CATEGORIES_ID.length === 0 //Có profile nhưng không có value
    //     ? dataProfile.categories.map(
    //         (categorie: any) => categorie.child_category_id
    //       ) || null // Lấy profile
    //     : dataProfile && LIST_CATEGORIES_ID // Có profile và value
    //     ? LIST_CATEGORIES_ID
    //     : null,
    //   !dataProfile && !LIST_DIS_ID //không có profile và value
    //     ? []
    //     : !dataProfile && LIST_DIS_ID //không có profile nhưng có value
    //     ? LIST_DIS_ID
    //     : dataProfile && !LIST_DIS_ID //Có profile nhưng không có value
    //     ? dataProfile.locations.map((location: any) => location.district_id) ||
    //       null // Lấy profile
    //     : dataProfile && LIST_DIS_ID // Có profile và value
    //     ? LIST_DIS_ID
    //     : [],
    //   !dataProfile && !SALARY_TYPE //không có profile và value
    //     ? null
    //     : !dataProfile && SALARY_TYPE //không có profile nhưng có value
    //     ? SALARY_TYPE
    //     : dataProfile && !SALARY_TYPE //Có profile nhưng không có value
    //     ? null // Lấy profile
    //     : dataProfile && SALARY_TYPE // Có profile và value
    //     ? SALARY_TYPE
    //     : null
    // )
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

  const handleClickProvince = (event: any, index: number) => {
    event.stopPropagation();

    const newOpen = open.map((value: boolean, i: number) =>
      i === index ? !value : false,
    );
    console.log('newOpen', newOpen);
    setOpen(newOpen);
  };

  const handleChangeCheckedRadio = (e: any) => {
    console.log('value', e.target.value);
    setValueDistrict(e.target.value);
  };

  const renderOptions = () => {
    return dataAllLocation?.map((item: any, index: number) => (
      <div key={index}>
        <ListItemButton onClick={(event) => handleClickProvince(event, index)}>
          <ListItemText primary={item.province_fullName} />
          {open[index] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open[index]} timeout="auto" unmountOnExit>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={valueDistrict}
            onChange={handleChangeCheckedRadio}
          >
            {item.districts.map((v: any, i: number) => (
              <FormControlLabel
                key={v.district_id} // Thêm key cho FormControlLabel
                value={`${v.district}, ${item.province_fullName}`}
                control={<Radio />}
                label={v.district}
              />
            ))}
          </RadioGroup>
        </Collapse>
      </div>
    ));
  };

  // openModal
  const [openModal, setOpenModal] = React.useState(false);
  const handleShowCreateKeywork = () => setOpenModal(true);
  const handleCloseModalCreateKeyword = () => setOpenModal(false);

  const handleChangeKeywordInput = () => {};

  const getPostSearch = async () => {
    try {
      if (dataProfile) {
        // const result = await searchApi.getSearchByQueryV2(
        //   QUERY,
        //   null,
        //   !dataProfile && !MONEY_TYPE //không có profile và value
        //     ? 1
        //     : !dataProfile && MONEY_TYPE //không có profile nhưng có value
        //     ? MONEY_TYPE
        //     : dataProfile && !MONEY_TYPE //Có profile nhưng không có value
        //     ? 1 // Lấy profile
        //     : dataProfile && MONEY_TYPE // Có profile và value
        //     ? MONEY_TYPE
        //     : 1,
        //   !dataProfile && !IS_WORKING_WEEKEND //không có profile và value
        //     ? null
        //     : !dataProfile && IS_WORKING_WEEKEND //không có profile nhưng có value
        //     ? IS_WORKING_WEEKEND
        //     : dataProfile && !IS_WORKING_WEEKEND //Có profile nhưng không có value
        //     ? null // Lấy profile
        //     : dataProfile && IS_WORKING_WEEKEND // Có profile và value
        //     ? IS_WORKING_WEEKEND
        //     : null,
        //   !dataProfile && !IS_REMOTELY //không có profile và value
        //     ? null
        //     : !dataProfile && IS_REMOTELY //không có profile nhưng có value
        //     ? IS_REMOTELY
        //     : dataProfile && !IS_REMOTELY //Có profile nhưng không có value
        //     ? null // Lấy profile
        //     : dataProfile && IS_REMOTELY // Có profile và value
        //     ? IS_REMOTELY
        //     : null,
        //   null,
        //   !dataProfile && !SALARY_MIN //không có profile và value
        //     ? 6000000
        //     : !dataProfile && SALARY_MIN //không có profile nhưng có value
        //     ? SALARY_MIN
        //     : dataProfile && !SALARY_MIN //Có profile nhưng không có value
        //     ? 6000000 // Lấy profile
        //     : dataProfile && SALARY_MIN // Có profile và value
        //     ? SALARY_MIN
        //     : 6000000,
        //   !dataProfile && !SALARY_MAX //không có profile và value
        //     ? 12000000
        //     : !dataProfile && SALARY_MAX //không có profile nhưng có value
        //     ? SALARY_MAX
        //     : dataProfile && !SALARY_MAX //Có profile nhưng không có value
        //     ? 12000000 // Lấy profile
        //     : dataProfile && SALARY_MAX // Có profile và value
        //     ? SALARY_MAX
        //     : 12000000,
        //   null,
        //   null,
        //   !dataProfile && !JOB_TYPE //không có profile và value
        //     ? []
        //     : !dataProfile && JOB_TYPE //không có profile nhưng có value
        //     ? JOB_TYPE
        //     : dataProfile && !JOB_TYPE //Có profile nhưng không có value
        //     ? [] // Lấy profile
        //     : dataProfile && JOB_TYPE // Có profile và value
        //     ? JOB_TYPE
        //     : [],
        //   !dataProfile && LIST_CATEGORIES_ID.length === 0 //không có profile và value
        //     ? []
        //     : !dataProfile && LIST_CATEGORIES_ID //không có profile nhưng có value
        //     ? LIST_CATEGORIES_ID
        //     : dataProfile && LIST_CATEGORIES_ID.length === 0 //Có profile nhưng không có value
        //     ? dataProfile.categories.map(
        //         (categorie: any) => categorie.child_category_id
        //       ) // Lấy profile
        //     : dataProfile && LIST_CATEGORIES_ID // Có profile và value
        //     ? LIST_CATEGORIES_ID
        //     : [],
        //   !dataProfile && !LIST_DIS_ID //không có profile và value
        //     ? []
        //     : !dataProfile && LIST_DIS_ID //không có profile nhưng có value
        //     ? LIST_DIS_ID
        //     : dataProfile && !LIST_DIS_ID //Có profile nhưng không có value
        //     ? [] // Lấy profile
        //     : dataProfile && LIST_DIS_ID // Có profile và value
        //     ? LIST_DIS_ID
        //     : [],
        //   !dataProfile && !SALARY_TYPE //không có profile và value
        //     ? null
        //     : !dataProfile && SALARY_TYPE //không có profile nhưng có value
        //     ? SALARY_TYPE
        //     : dataProfile && !SALARY_TYPE //Có profile nhưng không có value
        //     ? null // Lấy profile
        //     : dataProfile && SALARY_TYPE // Có profile và value
        //     ? SALARY_TYPE
        //     : null
        // )

        const result = await searchApi.getSearchByQueryV2(
          QUERY,
          null,
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
        if (result) {
          setSearchData(result.data);
        }
      }
    } catch (error) {
      setOpenBackdrop(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPostSearch();
  }, [dataProfile]);

  return (
    <>
      <Navbar />

      <div className="search-result">
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
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Tìm thấy{' '}
                <h4 style={{ margin: '0 10px' }}>
                  {searchData ? searchData?.total : 0}
                </h4>
                công việc phù hợp
              </div>
              <div
                style={{
                  color: '#0d99ff ',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleShowCreateKeywork}
              >
                <CreateKeywordIconSmall />
                Thông tin từ khóa
              </div>
            </div>

            {searchData?.posts.length > 0 ? (
              <>
                <Grid container spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
                  {searchData?.posts.map((item: PostNewest, index: number) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                      <Card
                        sx={{
                          minWidth: '100%',
                          display: 'flex',
                          padding: '12px',
                          cursor: 'pointer',
                          '&:hover': {
                            background: '#E7E7ED',
                            transition: 'all 0.3s linear',
                          },
                          boxShadow: 'none',
                          borderRadius: '5px',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div
                          onClick={(e) => {
                            handleClickItem(e, item.id);
                          }}
                        >
                          <ImageListItem
                            key={item.image}
                            sx={{ flex: 1, display: 'flex' }}
                          >
                            <img
                              src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={item.title}
                              loading="lazy"
                              style={{
                                width: '120px',
                                maxWidth: 'auto',
                                height: '100%',
                                maxHeight: 150,
                                borderRadius: 10,
                                minHeight: 120,
                              }}
                            />
                            <div
                              style={{ padding: '0', marginLeft: '12px' }}
                              className="div-cart-item-post"
                            >
                              {' '}
                              <Tooltip placement="top" title={item.title}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  sx={{
                                    fontSize: '15px',
                                    margin: 0,
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {item?.title.length > 50
                                    ? `${item.title.substring(0, 50)} ...`
                                    : item.title}
                                </Typography>
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                title={item.company_name}
                              >
                                <Typography
                                  gutterBottom
                                  variant="h1"
                                  component="div"
                                  sx={{ fontSize: '12px' }}
                                >
                                  {item?.company_name.length > 50
                                    ? `${item.company_name.substring(
                                        0,
                                        50,
                                      )} ...`
                                    : item.company_name}
                                </Typography>
                              </Tooltip>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  justifyContent: 'center',
                                }}
                              >
                                <EnvironmentFilled className="icon-cart-item-post" />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {`${item.district}, ${item.province}`}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <ClockCircleFilled className="icon-cart-item-post" />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {moment(new Date(item.start_time)).format(
                                    'HH:mm',
                                  )}{' '}
                                  -{' '}
                                  {moment(new Date(item.end_time)).format(
                                    'HH:mm',
                                  )}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <AttachMoneyIcon
                                  sx={{
                                    fontSize: 20,
                                    marginLeft: '-2px',
                                    marginRight: '2px',
                                    color: '#575757',
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {new Intl.NumberFormat('en-US').format(
                                    item.salary_min,
                                  )}{' '}
                                  -{' '}
                                  {new Intl.NumberFormat('en-US').format(
                                    item.salary_max,
                                  ) + `/${item.salary_type}`}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  marginTop: 5,
                                }}
                              >
                                <p
                                  style={{
                                    color: '#AAAAAA',
                                    fontSize: 13,
                                    fontStyle: 'italic',
                                  }}
                                >
                                  {item.created_at_text}
                                </p>
                              </div>
                            </div>
                          </ImageListItem>
                        </div>

                        <Space
                          style={{
                            justifyContent: 'space-between',
                            width: 100,
                          }}
                          direction="vertical"
                          align="center"
                        >
                          <div
                            onClick={async (e) => {
                              try {
                                if (item.bookmarked) {
                                  const result =
                                    await bookMarkApi.deleteBookMark(item.id);
                                  item.bookmarked = false;
                                  if (result) {
                                    setCheckBookMark(!checkBookMark);
                                  }
                                } else {
                                  const result =
                                    await bookMarkApi.createBookMark(item.id);
                                  item.bookmarked = true;
                                  if (result) {
                                    setCheckBookMark(!checkBookMark);
                                  }
                                }
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            {item.bookmarked ? (
                              <TurnedInIcon
                                sx={{ top: 0, right: 0, color: '#0d99ff' }}
                              />
                            ) : (
                              <BookmarkBorderOutlinedIcon
                                sx={{ top: 0, right: 0, color: '' }}
                              />
                            )}
                          </div>
                          <img
                            className="img-resource-company"
                            src={item.resource.company_icon}
                            alt="ảnh"
                          />
                          <p style={{ fontSize: 13, fontStyle: 'italic' }}>
                            {item.job_type.job_type_name}
                          </p>
                        </Space>
                      </Card>
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
                    <CaretDownFilled />
                  </Space>
                </Stack>
              </>
            ) : (
              <></>
            )}
            <Backdrop
              sx={{
                color: '#0d99ff ',
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

        <Modal
          open={openModal}
          onClose={handleCloseModalCreateKeyword}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thống báo từ khóa
            </Typography>

            <TextField
              type="text"
              id="company"
              name="company_name"
              // value={formValues.company_name}
              size="small"
              onChange={handleChangeKeywordInput}
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder="Tên công ty"
              // error={companyError} // Đánh dấu lỗi
            />

            <FormControl
              sx={{ width: '100%', margin: '12px auto' }}
              size="small"
            >
              <Select
                multiple
                displayEmpty
                value={[valueDistrict]}
                input={<OutlinedInput placeholder="Quận, Tỉnh/Thành Phố" />}
                renderValue={(selected) => {
                  console.log('selected', selected);
                  if (selected.length === 0) {
                    return (
                      <p style={{ color: ' #aaaaaa', padding: '4px 0' }}>
                        Quận, Tỉnh/Thành Phố
                      </p>
                    );
                  } else {
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5,
                        }}
                      >
                        {/* {selected.map((value: string, i: number) => (
                  ))} */}
                        <Chip label={`${selected[0]}`} />

                        {/* <p>{value}</p> */}
                      </Box>
                    );
                  }
                }}
                MenuProps={MenuProps}
              >
                {renderOptions()}
              </Select>
            </FormControl>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid red',
                  // color: 'red',
                }}
                onClick={() => {}}
                variant="outlined"
              >
                Hủy
              </Button>
              <Button
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => {}}
                variant="contained"
              >
                Áp dụng
              </Button>
            </div>
          </Box>
        </Modal>
      </div>

      <Footer />
    </>
  );
};
export default NewJobs;
