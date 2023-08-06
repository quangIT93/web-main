import React, { useEffect, useContext } from 'react';
import queryString from 'query-string';
import Modal from '@mui/material/Modal';

import Grid from '@mui/material/Grid';
// import { url } from 'inspector'

import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Cascader, Divider, Typography, Input, Space, message } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

import { Box, Button } from '@mui/material';
// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';
import { RootState } from 'store/reducer';

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';
// import api
// import postApi from 'api/postApi'

import searchApi from 'api/searchApi';
import profileApi from 'api/profileApi';
import locationApi from 'api/locationApi';
import categoriesApi from 'api/categoriesApi';
import Footer from '../../components/Footer/Footer';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore
import { Navbar } from '#components';
import { CreateKeywordIconSmall, MoreICon } from '#components/Icons';
import { CloseOutlined } from '@ant-design/icons';

//import jobcard
import JobCard from '../../components/Home/JobCard';
import ShowCancleSave from '#components/ShowCancleSave';
import ShowNotificativeSave from '#components/ShowNotificativeSave';

// import { useHomeState } from '../Home/HomeState'

// import { AxiosResponse } from 'axios'
// import icon

// import { message } from 'antd';

import { getCookie } from 'cookies';

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider';

import './style.scss';
// import { stringify } from 'query-string/base';
import notificationKeywordApi from 'api/notificationKeyword';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

const { SHOW_CHILD } = Cascader;

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

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

const NewJobs: React.FC = () => {
  const {
    setOpenNotificate,
    // openNotificate,
    search,
  }: // setRefNav,
  {
    setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
    openNotificate: boolean;
    search: boolean;
  } = useContext(HomeValueContext);

  const [page, setPage] = React.useState(2);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [searchData, setSearchData] = React.useState<any>();

  const listRef = React.useRef<HTMLUListElement | null>(null);
  // Lấy query params từ URL
  const queryParams = queryString.parse(window.location.search);

  // Lấy giá trị của tham số cụ thể (ví dụ: post-id)

  // const navigate = useNavigate()
  // const [checkBookMark, setCheckBookMark] = React.useState(true);

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
  const [openModal, setOpenModal] = React.useState(false);
  const QUERY = decodeURIComponent(`${queryParams['q']}`);
  const [valueKeyword, setValueKeyword] = React.useState(QUERY ? QUERY : '');
  // const [districtId, setDistrictId] = React.useState<string>('');

  // const [isSearch, setIsSearch] = React.useState<Boolean>(false);

  const [oenModalCreateSuccess, setOpenModalCreateSuccess] =
    React.useState(false);

  const [disableLocation, setDisableLocation] = React.useState<Boolean>(false);
  const [disableCatelory, setDisableCatelory] = React.useState<Boolean>(false);
  const [locId, setLocId] = React.useState<string[]>([]);

  const [locationOneItem, setLocationOneItem] = React.useState<string[]>([]);
  const [cateloryOneItem, setCateloryOneItem] = React.useState<number[]>([]);

  const [dataAllLocation, setDataAllLocation] = React.useState<any>(null);
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [categoriesId, setCategoriesId] = React.useState<string[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    document.title = 'HiJob - Tìm kiếm công việc';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_search' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------

  const { Text } = Typography;

  // const [messageApi, contextHolder] = message.useMessage();

  // const userProfile = useSelector((state: RootState) => state.profile.profile);

  // state redux
  // const { postNewest } = useSelector((state: RootState) => state)
  const dispatch = useDispatch();
  // const { setPostNewest, setPostNewestMore } = bindActionCreators(
  //     actionCreators,
  //     dispatch
  // )

  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  const dataProfile = useSelector((state: RootState) => state.profileUser);
  // const [userFilteredCookies, setUserFilteredCookies] = React.useState<any>()
  // const [userTypeSalaryFilteredCookies, setUserTypeSalaryFilteredCookies] = React.useState<any>()
  // const [userTypejobFilteredCookies, setUserTypejobFilteredCookies] = React.useState<any>()

  // React.useEffect(() => {
  let userFilteredCookies = JSON.parse(getCookie('userFiltered') || '{}');
  let userTypeSalaryFilteredCookies = JSON.parse(
    getCookie('userTypeSalaryFiltered') || '{}',
  );
  let userTypejobFilteredCookies = JSON.parse(
    getCookie('userTypejobFiltered') || '{}',
  );
  //   setUserFilteredCookies(userFilteredCookies)
  //   setUserTypeSalaryFilteredCookies(userTypeSalaryFilteredCookies)
  //   setUserTypejobFilteredCookies(userTypejobFilteredCookies)
  // }, [])

  // query value

  const SALARY_TYPE = userTypeSalaryFilteredCookies?.id;
  const MONEY_TYPE = userFilteredCookies?.money_type;
  const SALARY_MIN = userFilteredCookies?.salary_min;
  const SALARY_MAX = userFilteredCookies?.salary_max;
  const IS_WORKING_WEEKEND = userFilteredCookies?.is_working_weekend;
  const IS_REMOTELY = userFilteredCookies?.is_remotely;

  // console.log('Salary_Max search params search result: ', SALARY_MAX);

  const JOB_TYPE =
    userTypejobFilteredCookies?.id && userTypejobFilteredCookies?.id! !== 5
      ? [userTypejobFilteredCookies?.id]
      : [];

  const LIST_DIS_ID =
    userFilteredCookies?.list_dis?.length > 0 ||
    userFilteredCookies?.list_dis?.length !== undefined
      ? userFilteredCookies?.list_dis?.map((dis: any) => dis[1])
      : [];

  // console.log('ssssssss', userFilteredCookies?.list_cate);
  // console.log('userFilteredCookies?.list_cate', userFilteredCookies.list_cate);
  // console.log('LIST_DIS_ID', LIST_DIS_ID);
  // searchParams
  //   .getAll('dis-ids')
  //   .map((disId) => disId.split(','))
  //   .map((dis) => dis[1]);
  const LIST_CATEGORIES_ID =
    userFilteredCookies?.list_cate?.length !== 0 ||
    userFilteredCookies?.list_cate !== undefined
      ? userFilteredCookies?.list_cate?.map((cate: any) => cate[1])
      : [];
  // searchParams
  //   .getAll('categories-ids')
  //   .map((cateId) => cateId.split(','))
  //   .map((dis) => dis[1])
  //   .map(Number);

  // console.log(searchParams.getAll('dis-ids'));

  // let userFiltered = JSON.parse(getCookie('userFiltered') || '{}');

  // console.log('userFiltered: ', userFiltered);

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
    // console.log('search parameters: ', Number(searchParams.get('job-type')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise();
      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getCategories();
    // getAllLocations()
    // delete param when back to page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle click post details
  // const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
  //   window.open(`/post-detail?post-id=${id}`);
  // };

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
    // console.log('checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
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

    console.log('checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', result);
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
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  const onChangeLocation = (value: any) => {
    // Xử lý giá trị thay đổi

    setDisableLocation(false);
    const secondValues = value?.map((item: any) => item[1]);
    // console.log('value', value);
    // console.log('secondValues', secondValues);

    if (
      secondValues.length <= 10
      // && listLocation.length <= 3
    ) {
      setLocId(secondValues);
      if (value.length !== 0) {
        setLocationOneItem(value.map((v: any) => v[1]));
      } else {
        setLocationOneItem([]);
      }
      // setListDis(value);
    }
    if (value.length > 9) {
      setDisableLocation(true);
    }
  };

  const onChangeCateLory = (value: any) => {
    setDisableCatelory(false);
    const secondValues = value?.map((item: any) => item[1]);
    // console.log('value', value);
    // console.log('secondValues', secondValues);
    if (secondValues.length <= 10) {
      setCategoriesId(secondValues);
      if (value.length !== 0) {
        // setCateloryOneItem(value[0][0]);
        setCateloryOneItem(value.map((cate: any) => cate[1]));
      } else {
        setCateloryOneItem([]);
      }
    }
    if (value.length > 9) {
      setDisableCatelory(true);
    }
  };

  console.log('loca', locationOneItem);
  console.log('cae', cateloryOneItem);

  const DropdownRenderLocation = (menus: React.ReactNode) => (
    <div style={{ width: '100%' }}>
      <Text className="title-filter_location">Chọn địa điểm</Text>
      {menus}
      <Divider style={{ margin: 5 }}>
        {disableLocation ? 'Chỉ có thể tối đa 10 địa điểm' : ''}
      </Divider>
      {/* <div style={{ padding: 12, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="default" onClick={() => {}}>
          Huỷ
        </Button>
        <Button type="primary" onClick={() => {}}>
          Áp dụng
        </Button>
      </div> */}
    </div>
  );

  const DropdownRenderCategory = (menus: React.ReactNode) => (
    <div style={{ width: '100%' }}>
      <Text className="title-filter_location">Chọn danh mục nghề nghiệp</Text>
      {menus}
      <Divider style={{ margin: 5 }}>
        {disableCatelory ? 'Chỉ có thể tối đa 10 danh mục' : ''}
      </Divider>
    </div>
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (dataAllLocation && dataAllLocation.length > 0) {
  //     setOpen(Array(dataAllLocation.length).fill(false));
  //   }
  // }, [dataAllLocation]);

  // const handleClickProvince = (event: any, index: number) => {
  //   event.stopPropagation();

  //   const newOpen = open.map((value: boolean, i: number) =>
  //     i === index ? !value : false,
  //   );
  //   console.log('newOpen', newOpen);
  //   setOpen(newOpen);
  // };

  // const handleChangeCheckedRadio = (e: any) => {
  //   console.log('value', JSON.parse(e.target.value));
  //   setValueDistrict(JSON.parse(e.target.value));
  //   setDistrictId(JSON.parse(e.target.value).district_id);
  // };

  // openModal
  const handleShowCreateKeywork = () => setOpenModal(true);
  const handleCloseModalCreateKeyword = () => setOpenModal(false);

  const handleChangeKeywordInput = (e: any) => {
    setValueKeyword(e.target.value);
  };

  // const validValue = () => {
  //   if ('') {
  //     return {
  //       message: 'Vui lòng chọn logo công ty',
  //       checkForm: false,
  //     };
  //   }

  //   return {
  //     message: '',
  //     checkForm: true,
  //   };
  // };

  const handleSubmitKeyword = async () => {
    // const { message, checkForm } = validValue();
    try {
      // const result = await notificationKeywordApi.createKeywordNotification(
      //   valueKeyword,
      //   cateloryOneItem,
      //   locationOneItem,
      // );
      // const result = true;
      const result = await notificationKeywordApi.createKeywordNotificationV3(
        valueKeyword,
        cateloryOneItem,
        locationOneItem,
      );

      if (result) {
        setOpenModal(false);
        setOpenModalCreateSuccess(true);
      } else {
        messageApi.open({
          type: 'error',
          content: 'Tạo từ khóa công việc không thành công.',
        });
      }
    } catch (error: any) {
      console.log('error', error);
      if (
        error.response.data.message === 'Create keyword notification failed'
      ) {
        messageApi.open({
          type: 'error',
          content: 'Bạn chỉ có thể tạo 10 từ khóa.',
        });
      }
    }
  };

  // open Modal success
  const handleCloseModalCreateSuccess = () => {
    setOpenModalCreateSuccess(false);
    setOpenNotificate(true);
  };

  const handleOpenNotification = () => {
    setOpenModalCreateSuccess(false);
    setOpenNotificate(true);
  };

  const getPostSearch = async () => {
    try {
      if (dataProfile) {
        setOpenBackdrop(true);
        console.log('QUERY', QUERY);
        console.log('page', page);
        console.log('MONEY_TYPE', MONEY_TYPE);
        console.log('IS_WORKING_WEEKEND', IS_WORKING_WEEKEND);
        console.log('IS_REMOTELY', IS_REMOTELY);
        console.log('SALARY_MIN', SALARY_MIN);
        console.log('SALARY_MAX', SALARY_MAX);
        console.log('JOB_TYPE', JOB_TYPE);
        console.log('LIST_CATEGORIES_ID', LIST_CATEGORIES_ID);
        console.log('LIST_DIS_ID', LIST_DIS_ID);
        console.log('SALARY_TYPE', SALARY_TYPE);
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
        // const result = await searchApi.getSearchByQueryV2(
        //   'null',
        //   null,
        //   MONEY_TYPE,
        //   IS_WORKING_WEEKEND,
        //   IS_REMOTELY,
        //   null,
        //   SALARY_MIN,
        //   SALARY_MAX,
        //   null,
        //   null,
        //   JOB_TYPE,
        //   LIST_CATEGORIES_ID,
        //   null,
        //   SALARY_TYPE,
        // );

        console.log('resut', result);
        if (result) {
          setOpenBackdrop(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProfile, search]);
  // title

  // const [titleFirebase, setTitleFirebase] = React.useState<string>('');
  // const [site, SetSite] = React.useState<any>(null);

  // const getTitle = async () => {
  //   try {
  //     const result = await siteApi.getSalaryType();
  //     if (result) {
  //       SetSite(result);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // React.useEffect(() => {
  //   getTitle();
  // }, []);

  // React.useEffect(() => {
  //   document.title = titleFirebase ? titleFirebase : '/web-search';
  // }, [titleFirebase]);

  // new Promise((resolve, reject) => {
  //   document.title = dataAllLocation ? titleFirebase : '/web-search';
  // });

  // const [disable, setDisable] = React.useState(false);

  useEffect(() => {
    if (!openModal) {
      setLocId([]);
      setLocationOneItem([]);
      setDisableLocation(false);
      //
      setCategoriesId([]);
      setCateloryOneItem([]);
      setDisableCatelory(false);
    }
  }, [openModal]);

  // const onChangeCate = (value: any) => {
  //   console.log(`selected ${value}`);
  //   setCateloryOneItem(value.map((val: any) => val));
  //   console.log('value', value);
  //   // setLocationOneItem()
  // };

  // const onSearch = (value: string) => {
  //   console.log('search:', value);
  // };
  return (
    <>
      <Navbar />

      <div className="search-result">
        {contextHolder}
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
                  // textDecoration: 'underline',
                }}
                onClick={handleShowCreateKeywork}
              >
                {searchData?.posts.length !== 0 && QUERY ? (
                  <>
                    <CreateKeywordIconSmall />
                    <span style={{ marginLeft: '4px', fontSize: '20px' }}>
                      Tạo thông báo từ khóa
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {searchData?.posts.length > 0 ? (
              <>
                <Grid container spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
                  {searchData?.posts.map((item: PostNewest, index: number) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                      <JobCard item={item} />
                    </Grid>
                  ))}
                </Grid>
                <Stack
                  spacing={2}
                  sx={{
                    display: searchData?.is_over ? 'none' : 'flex',
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
        <Modal
          open={openModal}
          onClose={handleCloseModalCreateKeyword}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="create-key-word">
            <div
              style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                cursor: 'pointer',
                // border: '1px solid',
                borderRadius: '50%',
                padding: '1px',
              }}
              onClick={() => setOpenModal(false)}
            >
              <CloseOutlined style={{ fontSize: '30px' }} />
            </div>
            <p className="title-modal_createKey">Thông báo từ khóa</p>
            <Input
              placeholder="Từ khóa"
              // allowClear
              size="large"
              // onChange={onChange}
              type=""
              style={{ marginTop: '12px' }}
              value={valueKeyword}
              // disabled
              // error={companyError} // Đánh dấu lỗi
              onChange={handleChangeKeywordInput}
            />

            <Cascader
              multiple
              maxTagCount="responsive"
              size="large"
              placeholder="Chọn địa điểm"
              inputIcon={<EnvironmentOutlined />}
              dropdownRender={DropdownRenderLocation}
              // defaultValue={
              //   listLocation.length !== 0
              //     ? listLocation
              //     : listLocation.length === 0 &&
              //       location.pathname === '/search-results'
              //     ? []
              //     : userProfile?.locations?.map((profile: any) => [
              //         profile.province_id,
              //         profile.district_id,
              //       ])
              // }
              options={
                dataAllLocation
                  ? dataAllLocation?.map((dataLocation: any) => ({
                      value: dataLocation.province_id,
                      label: dataLocation.province_fullName,
                      children: dataLocation.districts.map(
                        (child: { district_id: string; district: string }) => {
                          var dis = false;
                          // setLocId([]);
                          if (disableLocation) {
                            dis = true;
                            for (const elem of locId) {
                              if (elem === child.district_id) {
                                dis = false;
                                break;
                              }
                            }
                          }
                          return {
                            value: child.district_id,
                            label: child.district,
                            disabled: dis,
                          };
                        },
                      ),
                    }))
                  : []
              }
              onChange={onChangeLocation}
              changeOnSelect
              className="inputFilterLocationNav input-filter_nav"
              showCheckedStrategy={SHOW_CHILD}
              style={{
                width: '100%',
                borderRadius: '2px',
                fontStyle: 'italic',
                margin: '12px 0',
              }}
            />
            {/* 
            <Cascader>

            </Cascader> */}
            <Cascader
              dropdownRender={DropdownRenderCategory}
              options={
                dataCategories
                  ? dataCategories.map((parentCategory: any) => ({
                      value: parentCategory.parent_category_id,
                      label: parentCategory.parent_category,
                      children: parentCategory.childs.map((child: any) => {
                        var dis = false;
                        //check id child  when disable = true
                        if (disableCatelory) {
                          dis = true;
                          for (const elem of categoriesId) {
                            if (elem === child.id) {
                              dis = false;
                              break;
                            }
                          }
                        }
                        return {
                          value: child.id,
                          label: child.name,
                          disabled: dis,
                        };
                      }),
                    }))
                  : []
              }
              onChange={onChangeCateLory}
              multiple
              maxTagCount="responsive"
              size="large"
              className="inputCategories input-filter_nav"
              showCheckedStrategy={SHOW_CHILD}
              style={{
                width: '100%',
                borderRadius: '2px',
                fontStyle: 'italic',
              }}
              placeholder="Chọn danh mục ngành nghề"
            />

            {/* <Select
              // open
              placeholder="Select a person"
              optionFilterProp="children"
              maxTagCount="responsive"
              mode="multiple"
              onChange={onChangeCate}
              onSearch={onSearch}
              allowClear
              // filterOption={(input, option) =>
              //   (option?.label ?? '')
              //     .toLowerCase()
              //     .includes(input.toLowerCase())
              // }
              style={{ width: '100%' }}
              size="large"
              showSearch={false}
              options={
                dataCategories
                  ? dataCategories.map((val: any, num: number) => {
                      return {
                        value: val.parent_category_id,
                        label: val.parent_category,
                      };
                    })
                  : []
              }
              className="ant-selected_cate"
            /> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: '12px',
              }}
            >
              <Button
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '20px',
                  width: '153px',
                  padding: '12px 16px',
                }}
                onClick={handleSubmitKeyword}
                variant="contained"
              >
                Áp dụng
              </Button>
              {/* <Button
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '20px',
                  width: '153px',
                  padding: '12px 16px',
                  // border: '1px solid transparent',
                  color: 'red',
                  border: '1px solid red',
                  // background: 'red',

                  '&:hover': {
                    border: '1px solid red',
                    color: '#ffffff',
                    background: '#c60404',
                  },
                }}
                onClick={() => setOpenModal(false)}
                variant="outlined"
              >
                Hủy
              </Button> */}
            </div>
          </Box>
        </Modal>

        <Modal
          open={oenModalCreateSuccess}
          onClose={handleCloseModalCreateSuccess}
          className="Modal-success_keyword"
        >
          <Box sx={styleSuccess} className="box-modal_successKeyword">
            <IconButton
              aria-label="close"
              onClick={handleCloseModalCreateSuccess}
              sx={{
                position: 'absolute',
                right: '10px',
                top: '10px',
              }}
            >
              <CloseIcon />
            </IconButton>
            <p className="title-modal_createKeySuccess">Hoàn thành</p>
            <p
              className="text-modal_createKeySuccess"
              style={{
                fontFamily: 'Roboto',
                // lineHeight: '16px',
                margin: '12px 0px 4px 0px',
              }}
            >
              Bạn đã thành công thêm từ khoá, có thể các thông báo sẽ làm phiền,
              bạn có thể tắt thông báo trong mục Thông báo từ khoá.
            </p>
            <p className="text-modal_createKeySuccess">
              Bạn có muốn chuyển đến mục thông báo từ khoá không?
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: '12px',
              }}
            >
              <Button
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '20px',
                  width: '153px',
                  padding: '12px 16px',
                }}
                onClick={handleOpenNotification}
                variant="contained"
              >
                Xác nhận
              </Button>
              {/* <Button
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '20px',
                  width: '153px',
                  padding: '12px 16px',
                  // border: '1px solid transparent',
                  color: 'red',
                  border: '1px solid red',
                  // background: 'red',

                  '&:hover': {
                    border: '1px solid red',
                    color: '#ffffff',
                    background: '#c60404',
                  },
                }}
                onClick={() => setOpenModalCreateSuccess(false)}
                variant="outlined"
              >
                Hủy
              </Button> */}
            </div>
          </Box>
        </Modal>
      </div>
      <ShowCancleSave />

      <ShowNotificativeSave />

      <Footer />
    </>
  );
};
export default React.memo(NewJobs);
