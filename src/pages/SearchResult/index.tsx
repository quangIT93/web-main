import React, { useEffect, useContext } from 'react';
import queryString from 'query-string';
import Modal from '@mui/material/Modal';

import Grid from '@mui/material/Grid';
// import { url } from 'inspector'

import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {
  Cascader,
  Divider,
  Typography,
  Input,
  Space,
  message,
  Spin,
} from 'antd';

import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';

import { Box, Button } from '@mui/material';
// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';
import { RootState } from 'store/reducer';

import InfiniteScroll from 'react-infinite-scroll-component';

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';
// import api
// import postApi from 'api/postApi'

import searchApi from 'api/searchApi';
import profileApi from 'api/profileApi';
import locationApi from 'api/locationApi';
import categoriesApi from 'api/categoriesApi';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore
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
import languageApi from 'api/languageApi';
// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import { searchResultVi } from 'validations/lang/vi/searchResult';
import { searchResultEn } from 'validations/lang/en/searchResult';

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
  money_type_text: string;
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
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [page, setPage] = React.useState(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [searchData, setSearchData] = React.useState<any>();

  const listRef = React.useRef<HTMLUListElement | null>(null);
  // Lấy query params từ URL
  const queryParams = queryString.parse(window.location.search);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
  encodeURIComponent(`${queryParams['q']}`);
  const [openModal, setOpenModal] = React.useState(false);
  const QUERY = decodeURIComponent(encodeURIComponent(`${queryParams['q']}`));
  const [valueKeyword, setValueKeyword] = React.useState(QUERY ? QUERY : '');
  // const [districtId, setDistrictId] = React.useState<string>('');

  // const [isSearch, setIsSearch] = React.useState<Boolean>(false);

  const [oenModalCreateSuccess, setOpenModalCreateSuccess] =
    React.useState(false);

  const [disableLocation, setDisableLocation] = React.useState<Boolean>(false);
  const [disableCatelory, setDisableCatelory] = React.useState<Boolean>(false);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [locId, setLocId] = React.useState<string[]>([]);

  const [locationOneItem, setLocationOneItem] = React.useState<string[]>([]);
  const [cateloryOneItem, setCateloryOneItem] = React.useState<number[]>([]);

  // const [dataAllLocation, setDataAllLocation] = React.useState<any>(null);
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [categoriesId, setCategoriesId] = React.useState<string[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const analytics: any = getAnalytics();
  // const [language, setLanguage] = React.useState<any>();
  const dataAllLocation = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  const [hasMore, setHasMore] = React.useState(true);
  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguage(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title = language?.search_results_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Tìm kiếm công việc'
        : languageRedux === 2
        ? 'HiJob - Job Search'
        : 'HiJob - 채용 정보 검색';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_search' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

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

  // const allLocation = async () => {
  //   try {
  //     const allLocation = await locationApi.getAllLocation(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );

  //     if (allLocation) {
  //       setDataAllLocation(allLocation.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  // allLocation();
  // getAllLocations()
  // delete param when back to page
  // console.log('search parameters: ', Number(searchParams.get('job-type')));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [languageRedux]);

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise(
        languageRedux === 1
          ? 'vi'
          : languageRedux === 2
          ? 'en'
          : languageRedux === 3
          ? 'ko'
          : 'vi',
      );
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
  }, [languageRedux]);

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
      languageRedux === 1
        ? 'vi'
        : languageRedux === 2
        ? 'en'
        : languageRedux === 3
        ? 'ko'
        : 'vi',
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
      console.log('Đã hết bài viết để hiển thị', result);
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

  // console.log('loca', locationOneItem);
  // console.log('cae', cateloryOneItem);

  const DropdownRenderLocation = (menus: React.ReactNode) => (
    <div style={{ width: '100%' }} className="noti-keyword">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Chọn địa điểm'
          : languageRedux === 2
          ? 'Select location'
          : languageRedux === 3 && '위치를  선택합니다'}
      </Text>
      {menus}
      <Divider style={{ margin: 5 }}>
        {disableLocation
          ? languageRedux === 1
            ? 'Chỉ có thể tối đa 10 khu vực'
            : languageRedux === 2
            ? 'Only up to 10 areas can be'
            : languageRedux === 3 && '최대 10개 영역까지만 가능합니다'
          : ''}
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
    <div style={{ width: '100%' }} className="noti-keyword">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Chọn danh mục nghề nghiệp'
          : languageRedux === 2
          ? 'Select a career category'
          : languageRedux === 3 && '카테고리를 선택합니다'}
      </Text>
      {menus}
      <Divider style={{ margin: 5 }}>
        {disableCatelory
          ? languageRedux === 1
            ? 'Chỉ có thể tối đa 10 danh mục'
            : languageRedux === 2
            ? 'Only up to 10 categories can be'
            : languageRedux === 3 && '최대 10개의 카테고리만 가능합니다'
          : ''}
      </Divider>
    </div>
  );

  const fetchDataProfileUser = async () => {
    try {
      await dispatch(getProfile() as any);
      const result = await profileApi.getProfile(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
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
  }, [languageRedux]);

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
          content:
            languageRedux === 1
              ? 'Tạo từ khóa công việc không thành công.'
              : languageRedux === 2
              ? 'Generate job keyword failed.'
              : '채용정보 키워드 생성에 실패했습니다.',
        });
      }
    } catch (error: any) {
      console.log('error', error);
      if (
        error.response.data.message === 'Create keyword notification failed'
      ) {
        messageApi.open({
          type: 'error',
          content:
            languageRedux === 1
              ? 'Bạn chỉ có thể tạo 10 từ khóa.'
              : languageRedux === 2
              ? 'You can only create 10 keywords.'
              : '키워드는 10개까지만 만들 수 있습니다.',
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
        setLoading(true);
        // console.log('QUERY', QUERY);
        // console.log('page', page);
        // console.log('MONEY_TYPE', MONEY_TYPE);
        // console.log('IS_WORKING_WEEKEND', IS_WORKING_WEEKEND);
        // console.log('IS_REMOTELY', IS_REMOTELY);
        // console.log('SALARY_MIN', SALARY_MIN);
        // console.log('SALARY_MAX', SALARY_MAX);
        // console.log('JOB_TYPE', JOB_TYPE);
        // console.log('LIST_CATEGORIES_ID', LIST_CATEGORIES_ID);
        // console.log('LIST_DIS_ID', LIST_DIS_ID);
        // console.log('SALARY_TYPE', SALARY_TYPE);
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
          JOB_TYPE[0] !== 6 ? JOB_TYPE : [],
          LIST_CATEGORIES_ID,
          LIST_DIS_ID,
          SALARY_TYPE !== -1 ? SALARY_TYPE : null,
          languageRedux === 1
            ? 'vi'
            : languageRedux === 2
            ? 'en'
            : languageRedux === 3
            ? 'ko'
            : 'vi',
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

        // console.log('resut', result);
        setHasMore(true);

        if (result && result.data.posts.length < 20) {
          setSearchData(result.data);
          // setIsVisible(true);
          // setHotJobTotal(hotjob.data.length);
          setHasMore(false);
          setPage(0);
          setOpenBackdrop(false);
          setLoading(false);
          return;
        } else if (result && result.data.posts.length !== 0) {
          setSearchData(result.data);
          // setHotJobType(hotjobtype);
          // setIsVisible(true);
          // setHotJobTotal(hotjob.data.length);
          setOpenBackdrop(false);
          setLoading(false);
          return;
        } else {
          setSearchData({});
          setHasMore(false);
          setPage(0);
        }
        // if (result) {
        //   setOpenBackdrop(false);
        //   setLoading(false);
        //   setSearchData(result.data);
        // }
      }
    } catch (error) {
      setOpenBackdrop(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPostSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, languageRedux]);
  // title

  // const [titleFirebase, setTitleFirebase] = React.useState<string>('');
  // const [site, SetSite] = React.useState<any>(null);

  // const getTitle = async () => {
  //   try {
  //     const result = await siteApi.getSalaryType("vi");
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

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const result = await searchApi.getSearchByQueryV2(
      QUERY,
      nextPage,
      MONEY_TYPE,
      IS_WORKING_WEEKEND,
      IS_REMOTELY,
      null,
      SALARY_MIN,
      SALARY_MAX,
      null,
      null,
      JOB_TYPE[0] !== 6 ? JOB_TYPE : [],
      LIST_CATEGORIES_ID,
      LIST_DIS_ID,
      SALARY_TYPE !== -1 ? SALARY_TYPE : null,
      languageRedux === 1
        ? 'vi'
        : languageRedux === 2
        ? 'en'
        : languageRedux === 3
        ? 'ko'
        : 'vi',
    );

    if (result && result?.data?.length !== 0) {
      // setStories((prev: any) => [...prev, ...result?.data?.communications]);
      setSearchData((prev: any) => {
        return {
          posts: [...prev.posts, ...result.data.posts],
          total: result.data.total,
        };
      });
      setPage(nextPage);
    } else {
      setHasMore(false);
      setPage(0);
      message.config({
        top: 750,
        duration: 2,
        maxCount: 3,
      });
      message.error('Đã hết bài viết');
      // setIsVisible(false);
      // console.log('Đã hết bài viết để hiển thị', result);
    }
  };

  useEffect(() => {
    // Tìm các phần tử có class 'ant-select-dropdown' trong cây DOM
    const dropdownElements = document.querySelectorAll('.ant-select-dropdown');

    // Lặp qua các phần tử và thêm class tùy chỉnh
    dropdownElements.forEach((element) => {
      element.classList.add('my-custom-dropdown-class');
    });
  }, []); // Chạy chỉ một lần sau khi thành phần render

  return (
    <>
      {/* <Navbar />
      <CategoryDropdown /> */}
      <div className="search-result">
        {contextHolder}
        {
          // automatic && (
          <Box sx={{ flexGrow: 1 }} ref={listRef}>
            <div className="title-search">
              <div className="total-search">
                {searchData ? (
                  <>
                    <span>
                      {languageRedux === 1
                        ? 'Tìm thấy'
                        : languageRedux === 2
                        ? 'Found'
                        : languageRedux === 3 && '찾기'}
                    </span>
                    <h4 style={{ margin: '0 10px' }}>
                      {searchData ? searchData?.total?.toLocaleString() : 0}
                    </h4>
                    <span className="title-last-search">
                      {/* {language?.search_results_page.suitable_job} */}
                      {languageRedux === 1
                        ? 'công việc phù hợp'
                        : languageRedux === 2
                        ? 'suitable jobs'
                        : languageRedux === 3 && '어울리는 직업'}
                    </span>
                  </>
                ) : (
                  <span>
                    {languageRedux === 1
                      ? 'Đang tải'
                      : languageRedux === 2
                      ? 'Loading'
                      : languageRedux === 3 && '로드 중'}
                  </span>
                )}
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
                {searchData?.posts?.length !== 0 && QUERY ? (
                  <>
                    <CreateKeywordIconSmall />
                    <span style={{ marginLeft: '4px', fontSize: '20px' }}>
                      {languageRedux === 1
                        ? 'Tạo thông báo từ khóa'
                        : languageRedux === 2
                        ? 'Create keyword notifications'
                        : languageRedux === 3 && '키워드 알림 만들기'}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {searchData?.posts?.length > 0 ? (
              <>
                <InfiniteScroll
                  dataLength={searchData?.posts?.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <Spin style={{ width: '100%' }} indicator={antIcon} />
                  }
                  style={{ overflow: 'unset' }}
                >
                  <Grid
                    container
                    spacing={3}
                    columns={{ xs: 6, sm: 4, md: 12 }}
                  >
                    {searchData?.posts?.map(
                      (item: PostNewest, index: number) => (
                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                          <JobCard item={item} />
                        </Grid>
                      ),
                    )}
                  </Grid>
                </InfiniteScroll>
                {/* <Stack
                  spacing={2}
                  sx={{
                    display: searchData?.is_over ? 'none' : 'flex',
                    alignItems: 'center',
                    margin: '24px 0',
                  }}
                >
                  <Space
                    className="div-hover-more"
                    onClick={(e) => {
                      handleChange(e, page);
                    }}
                  >
                    <p>{languageRedux === 1
            ? 'Xem thêm'
            : languageRedux === 2
              ? 'See more'
              : '더보기'}</p>
                    <MoreICon width={20} height={20} />
                  </Space>
                </Stack> */}
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
            <p className="title-modal_createKey">
              {languageRedux === 1
                ? 'Thông báo từ khóa'
                : languageRedux === 2
                ? 'Keyword announcement'
                : languageRedux === 3 && '키워드 알림'}
            </p>

            {locationOneItem.length !== 0 && cateloryOneItem.length !== 0 ? (
              <p className="title-modal_noteKeyword">
                {languageRedux === 1
                  ? 'Thêm từ khóa liên quan đến công việc hoặc tên công ty bạn muốn'
                  : languageRedux === 2
                  ? 'Add keywords related to the job or company name you want'
                  : languageRedux === 3 &&
                    '원하는 회사 이름이나 업무 관련 키워드를 추가'}
              </p>
            ) : (
              <p className="title-modal_noteKeyword">
                {languageRedux === 1
                  ? 'Vui lòng nhập vị trí và danh mục'
                  : languageRedux === 2
                  ? 'Please enter Location and Category'
                  : '위치와 카테고리를 입력해주세요'}
              </p>
            )}

            {/* {
              valueKeyword
            } */}

            <Input
              placeholder={
                languageRedux === 1
                  ? 'Từ khóa'
                  : languageRedux === 2
                  ? 'Keyword'
                  : '키워드'
              }
              // allowClear
              size="large"
              // onChange={onChange}
              type=""
              style={{ marginTop: '12px', fontSize: '12px' }}
              value={valueKeyword}
              // disabled
              // error={companyError} // Đánh dấu lỗi
              onChange={handleChangeKeywordInput}
            />

            <Cascader
              multiple
              maxTagCount="responsive"
              size="large"
              placeholder={
                languageRedux === 1
                  ? 'Chọn địa điểm'
                  : languageRedux === 2
                  ? 'Select location'
                  : languageRedux === 3 && '위치를  선택합니다'
              }
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
                fontSize: '12px',
              }}
            />

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
                fontSize: '12px',
              }}
              placeholder={
                languageRedux === 1
                  ? 'Chọn danh mục nghề nghiệp'
                  : languageRedux === 2
                  ? 'Select a career category'
                  : languageRedux === 3 && '카테고리를 선택합니다'
              }
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
                {languageRedux === 1
                  ? 'Áp dụng'
                  : languageRedux === 2
                  ? 'Apply'
                  : languageRedux === 3 && '적용'}
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
            <p className="title-modal_createKeySuccess">
              {languageRedux === 1
                ? 'Hoàn thành'
                : languageRedux === 2
                ? 'Complete'
                : languageRedux === 3 && '완성'}
            </p>
            <p
              className="text-modal_createKeySuccess"
              style={{
                fontFamily: 'Roboto',
                // lineHeight: '16px',
                margin: '12px 0px 4px 0px',
              }}
            >
              {languageRedux === 1
                ? 'Bạn đã thành công thêm từ khoá, có thể các thông báo sẽ làm phiền, bạn có thể tắt thông báo trong mục Thông báo từ khoá.'
                : languageRedux === 2
                ? 'You have successfully added keywords, maybe notifications will bother you, you can turn off notifications in Keyword Notifications.'
                : languageRedux === 3 &&
                  '키워드 추가에 성공했고, 알림이 방해가 될 수 있으며, 키워드 알림란의 알림을 키워드 알림란에 알림을 꺼도 됩니다.'}
            </p>
            <p className="text-modal_createKeySuccess">
              {languageRedux === 1
                ? 'Bạn có muốn chuyển đến mục thông báo từ khoá không?'
                : languageRedux === 2
                ? 'Do you want to go to keyword notifications?'
                : languageRedux === 3 &&
                  '키워드 알림 항목으로 이동하시겠습니까?'}
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
                {languageRedux === 1
                  ? 'Xác nhận'
                  : languageRedux === 2
                  ? 'Confirm'
                  : languageRedux === 3 && '확인'}
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
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </>
  );
};
export default React.memo(NewJobs);
