import React, { useEffect, useState, useContext, useRef } from 'react';
// @ts-ignore
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';
import { PhoneOutlined } from '@ant-design/icons';
import io from 'socket.io-client';

import ModalLogin from '../../components/Home/ModalLogin';
// import ModalLoginNav from '../../components/Navbar/ModalLogin';
// import Skeleton from '@mui/material/Skeleton';

import { setCookie, getCookie } from 'cookies';

// @ts-ignore
import { Logo } from '#components';
// @ts-ignore
import { ChatIcon, BellIcon } from '#components';

import {
  // FlagVNIcon,
  // SearchIcon,
  MailInfoIcon,
  MapInfoIcon,
  BagInfoJob,
  // DownloadIcon,
  // TransalteIcon,
  // LoginArrowIcon,
  // LoginArrowBlackIcon,
  // LoginHomeIcon,
  CompanySubLoginIcon,
  UserPersonSubLoginIcon,
  PaperSubLoginIcon,
  TranslateSubLoginIcon,
  LogoutSubLoginIcon,
  ArrowSubLoginIcon,
  VNSubLoginIcon,
  ENSubLoginIcon,
} from '#components/Icons';
// @ts-ignore
// import { ModalFilter } from '#components'

// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'

import { Collapse } from '@mui/material';
// import styled from '@emotion/styled'
import './style.scss';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { BlackSearchIcon } from '#components/Icons';
// import icon
// import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

import {
  FormOutlined,
  UserOutlined,
  RightOutlined,
  MenuOutlined,
  // SyncOutlined,
  // ClockCircleOutlined,
  // LogoutOutlined,
  // KeyOutlined,
  LoadingOutlined,
  // CloseOutlined,
  MailOutlined,
  HomeOutlined,
} from '@ant-design/icons';

// import component
// import SalaryFilterSubnav from './components/SalaryFilterSubnav'
// import PositionFilterSubnav from './components/PositionFilterSubnav'
// import CareerFilterSubnav from './components/CareerFilterSubnav'
import SearchInput from './SearchInput';
import FilterLocationNav from './FilterLocationNav';
import FilterCateloriesNav from './FilterCateloriesNav';
import FilterTypeJob from './FilterTypeJob';
import FilterTypeSalary from './FilterTypeSalary';
import FilterSalary from './FilterSalary';
import FilterTimeJob from './FilterTimeJob';
import Notificate from './Notificate';
import PostButton from './PostButton';

import { Avatar, Button, Space, Spin, Badge, Radio, Switch } from 'antd';

import authApi from 'api/authApi';
import profileApi from 'api/profileApi';
import messageApi from 'api/messageApi';
import applitedPostedApi from 'api/apiAppliedPosted';
import apiCompany from 'api/apiCompany';

import {
  Container,
  Wrapper,
  // SearchContainer,
  Left,
  Right,
  Center,
  // collapseCssFilter,
} from './Css';

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';

import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { getLanguages } from 'store/reducer/dataLanguage';

import { RootState } from '../../store/reducer';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../store/index';

// import Context
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { ChatContext } from 'context/ChatContextProvider';
import { DivRef1 } from 'context/HomeValueContextProvider';
import { useSearchParams } from 'react-router-dom';
import { setLanguage } from 'store/reducer/changeLanguageReducer';
// import { setLanguageApi } from 'store/reducer/dataLanguage';

import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';
import languageApi from 'api/languageApi';
import ModalTurnOffStatus from '#components/Profile/ModalTurnOffStatus';
import { setRole } from 'store/reducer/roleReducer';
import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';
import notificationApi from 'api/notification';
// import { set } from 'immer/dist/internal';

// import redux

const Navbar: React.FC = () => {
  const {
    openCollapseFilter,
    setOpenCollapseFilter,
    // setHeightNavbar,
    SetRefNav,
    setOpenNotificate,
    openNotificate,
    setSearch,
    search,
  }: // setRefNav,
  {
    openCollapseFilter: boolean;
    setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>;
    // heightNavbar: number
    // setHeightNavbar: React.Dispatch<React.SetStateAction<number>>
    SetRefNav: React.Dispatch<React.SetStateAction<DivRef1>>;
    setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
    openNotificate: boolean;
    setSearch: React.Dispatch<React.SetStateAction<boolean>>;
    search: boolean;
  } = useContext(HomeValueContext);

  const {
    receivedMessages,
    sendMessages,
    setReceivedMessages,
    // setSendMessages,
  } = useContext(ChatContext);

  // const [showTap, setShowTap] = React.useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openInfoUser, setOpenInfoUser] = React.useState(false);
  // const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const [reset, setReset] = React.useState<Boolean>(false);

  // value search
  const [salaryType, setSalaryType] = React.useState<any>();
  const [jobType, setJobType] = React.useState<any>();
  const [valueSearchInput, setValueSearchInput] = useState<
    string | null | undefined
  >(null);
  const [listDis, setListDis] = useState<[]>([]);
  const [listCate, setListCate] = useState<[]>([]);
  const [typeMoney, setTypeMoney] = useState<number | null>(1);
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [salaryMax, setSalaryMax] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  // const [timeJob, setTimeJob] = useState()
  // const [dateBegin, setDateBegin] = useState()
  // const [dateEnd, setDateEnd] = useState()
  const [isRemotely, setIsRemotely] = useState<number>(0);
  const [isWorkingWeekend, setIsWorkingWeekend] = useState<number>(0);
  const [userFiltered, setUserFiltered] = useState<any>();
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const [countChat, setCountChat] = useState<number>(0);
  const [countNoti, setCountNoti] = useState<number>(0);
  const [languageId, setLanguageId] = useState<number>(languageRedux);
  // check search results
  const [checkSeacrh, setCheckSeacrh] = useState<boolean>(false);
  const [openRadioGroup, setOpenRadioGroup] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appliedPostedJob, setAppliedPostedJob] = React.useState<any>([]);
  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState<any>(false);
  // const [isSearch, setIsSearch] = useState<boolean>(false);
  // const [language, setLanguageState] = useState<any>();

  const [searchJob, setSearchJob] = useState<boolean>(true);
  const [openModalTurnOffStatus, setOpenModalTurnOffStatus] =
    useState<boolean>(false);
  const [loadingSwitch, setLoadingSwitch] = useState(false);
  const handleOnchangeSearchJob = async (checked: any) => {
    try {
      if (checked === true) {
        // e.preventDefault();
        const result = await profileApi.putProfileJobV3(null, 1);
        if (result) {
          setSearchJob(true);
          const resultProfileV3 = await profileApi.getProfileV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (resultProfileV3) {
            dispatch(setProfileV3(resultProfileV3));
          }
        }
      } else {
        setLoadingSwitch(true);
        setOpenModalTurnOffStatus(true);
        setSearchJob(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    // if(localStorage.getItem('accessToken')){
    //   set
    // }
    setOpenLogin(true);
    setTimeout(() => {
      setOpenLogin(false);
    }, 7000);
  }, [profileV3?.typeRoleData]);

  const handleOpenRadioGroup = () => {
    setOpenRadioGroup(!openRadioGroup);
  };

  useEffect(() => {
    let userFilteredCookies = JSON.parse(getCookie('userFiltered') || '{}');
    setUserFiltered(userFilteredCookies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let userLanguageSelected = JSON.parse(getCookie('languageId') || '1');
    setLanguageId(userLanguageSelected);
  }, [languageId]);

  // console.log('jobTYpe', jobType);
  // check search
  // console.log('cccccccccccccccccccccccccccccccccccc');

  useEffect(() => {
    if (
      isRemotely !== 0 ||
      isWorkingWeekend !== 0 ||
      listDis?.length > 0 ||
      listCate?.length > 0 ||
      salaryMin !== 0 ||
      salaryMax !== 12000000 ||
      typeMoney === 2 ||
      salaryType ||
      jobType
    ) {
      setCheckSeacrh(true);
    } else {
      setCheckSeacrh(false);
    }
  }, [
    isRemotely,
    isWorkingWeekend,
    listDis?.length,
    listCate?.length,
    salaryMin,
    salaryMax,
    typeMoney,
    salaryType,
    jobType,
  ]);

  const location = useLocation();
  // use Redux manage state

  // value query

  const QUERY = searchParams.get('q');
  // const SALARY_TYPE = userFiltered?.salary_type;
  // const JOB_TYPE = userFiltered?.job_type;
  const DIS_IDS = userFiltered?.list_dis;
  // :
  // searchParams
  //   .getAll('dis-ids')
  //   .map((disId) => disId.split(','));
  // .map((dis) => dis[1])
  const CATE_IDS = userFiltered?.list_cate;
  // searchParams
  //   .getAll('categories-ids')
  //   .map((disId) => disId.split(','));
  // .map((dis) => dis[1])

  // params url
  const params = new URLSearchParams();
  const paramsCate = new URLSearchParams();

  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
  // thay đổi width setState
  // const [windowWidth, setWindowWidth] = useState(false)

  // use redux

  const dispatch = useDispatch();
  // const { setProfileUser } = bindActionCreators(actionCreators, dispatch);
  // const dataProfile = useSelector((state: RootState) => state.profileUser);

  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  // console.log('profileV3', profileV3);

  const roleRedux = useSelector((state: RootState) => state.changeRole.role);

  const languageData = useSelector((state: RootState) => {
    return state.dataLanguage.languages;
  });

  // console.log('state', languageData);

  // handle show tap on screen mobile
  // const handleTap = () => {
  //   setShowTap(!showTap);
  // };

  //  MOdalFilter
  // const [openModalFilter, setOpenModalFilter] = React.useState(false)

  // const handleClickInput = () => {
  //   setOpenCollapse(!openCollapse)
  // }

  // const [role, setRole] = React.useState<any>(roleRedux);
  // console.log('profileV3', profileV3);
  // console.log('profileV3', profileV3);

  const getCompanyInforByAccount = async () => {
    try {
      // const result = await apiCompany.getCampanyByAccountApi(
      //   languageRedux === 1 ? 'vi' : 'en',
      // );
      if (profileV3?.companyInfomation?.id != null) {
        setCompanyName(profileV3?.companyInfomation?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInforByAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, profileV3]);

  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  // fecth data profile with accesstoken

  // log

  // const fecthDataProfileUser = async () => {
  //   try {
  //     await dispatch(getProfile() as any);

  //     const result = await profileApi.getProfile(
  //       languageRedux === 1 ? 'vi' : 'en',
  //     );
  //     if (result) {
  //       dispatch(getProfile() as any);
  //     }
  //   } catch (error) {
  //     // setOpenBackdrop(false);
  //     // error authentication
  //     // setOpenBackdrop(true)
  //     // if (!localStorage.getItem('accessToken')) {
  //     //   setOpenBackdrop(false)
  //     //   return
  //     // }
  //     // const result = await profileApi.getProfile()
  //     // if (result) {
  //     //   setProfileUser(result.data)
  //     //   setOpenBackdrop(false)
  //     // }
  //     // await dispatch(getProfile() as any)
  //   }
  // };

  const getDataProfileV3 = async () => {
    try {
      const result = await profileApi.getProfileV3(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        dispatch(setProfileV3(result));
        setRole(result.data.typeRoleData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    // fecthDataProfileUser();
    getDataProfileV3();
    // dispatch(getProfile() as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  // get count unread
  const getCountUnread = async () => {
    try {
      const result = await messageApi.getUnread(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setCountChat(result.data.quantity);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    localStorage.getItem('accessToken') && getCountUnread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    receivedMessages,
    sendMessages,
    setReceivedMessages,
    setReceivedMessages,
  ]);

  const getCountAppliedNew = async () => {
    try {
      const result = await notificationApi.getNotificationCountNew(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setCountNoti(result.data.total);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    localStorage.getItem('accessToken') && getCountAppliedNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('receivedMessages', receivedMessages)
  // console.log('sendMessages', sendMessages)
  const ref = React.useRef<HTMLDivElement | null>(null);
  const refLogin = React.useRef<HTMLDivElement | null>(null);
  const refInfoUser = React.useRef<HTMLDivElement | null>(null);
  const bellRef = React.useRef<HTMLDivElement | null>(null);

  const handleCollapseEntered = () => {
    if (ref.current) {
      // const height = ref.current.getBoundingClientRect().height
      SetRefNav(ref);
      // setHeightNavbar(height)
    }
  };

  const handleCollapseExited = () => {
    if (ref.current) {
      // const height = ref.current.getBoundingClientRect().height

      // setHeightNavbar(height)
      SetRefNav(ref);
    }
  };

  useEffect(() => {
    // const handleResize = () => {
    //   if (window.innerWidth < 1200) {
    //     setWindowWidth(true)
    //   } else {
    //     setWindowWidth(false)
    //   }
    // }
    SetRefNav(ref);

    // window.addEventListener('resize', handleResize)

    // return () => {
    //   window.removeEventListener('resize', handleResize)
    // }
  }, [SetRefNav]);

  // useEffect(() => {
  //   const handleOutsideClick = (e: any) => {
  //     if (!ref?.current?.contains(e.target)) {
  //       setOpenCollapseFilter(false)
  //     }
  //   }

  //   window.addEventListener('click', handleOutsideClick)

  //   return () => {
  //     window.removeEventListener('click', handleOutsideClick)
  //   }
  // }, [])

  // handle Show modal Filter
  // const handleShowModalFilter = async () => {
  //   if (!openModalFilter) return setOpenModalFilter(true)
  //   setOpenModalFilter(false)
  // }

  // handle click search button

  // // Set the cookie
  // function setCookie(name: string, value: string, days: number) {
  //   let expires = '';
  //   if (days) {
  //     let date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     expires = '; expires=' + date.toUTCString();
  //   }
  //   document.cookie = name + '=' + (value || '') + expires + '; path=/';
  // }

  // // Get the cookie
  // function getCookie(name: string): string | null {
  //   let nameEQ = name + '=';
  //   let ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1, c.length);
  //     }
  //     if (c.indexOf(nameEQ) === 0) {
  //       return c.substring(nameEQ.length, c.length);
  //     }
  //   }
  //   return null;
  // }

  const handleSearch = async (
    event: any,
    valueSearchInput: string | null | undefined,
  ) => {
    event.preventDefault();
    var encode: any;
    // var job_type = jobType;
    var money_type = typeMoney;
    // var salary_type = salaryType;
    var salary_min = salaryMin;
    var salary_max = salaryMax;
    var list_dis = listDis ? listDis : [];
    var list_cate = listCate ? listCate : [];
    var is_working_weekend = isWorkingWeekend;
    var is_remotely = isRemotely;

    let filter = {
      // job_type,
      money_type,
      // salary_type,
      salary_min,
      salary_max,
      list_dis,
      list_cate,
      is_working_weekend,
      is_remotely,
    };
    // console.log('list_dis', list_dis);
    // console.log('listDis', listDis);
    // console.log('list_cate', list_cate);
    // console.log('listCate', listCate);
    // console.log('salary_max', salary_max);
    // console.log('salary_min', salary_min);
    await setCookie('userFiltered', JSON.stringify(filter), 365);

    if (list_dis?.length > 0) {
      list_dis.forEach((item) => {
        params.append(`dis-ids`, `${item}`);
      });
    } else if (list_dis?.length === 0 && DIS_IDS?.length > 0) {
      [].forEach((item) => {
        params.append(`dis-ids`, `${item}`);
      });
    } else if (
      profileV3?.accountId &&
      DIS_IDS?.length === 0 &&
      list_dis?.length !== 0 &&
      location?.pathname !== '/search-results'
    ) {
      // dataProfile.locations.forEach((item: any) => {
      //   params.append(`dis-ids`, `${[item.province_id, item.district_id]}`);
      // });
      list_dis.forEach((item) => {
        params.append(`dis-ids`, `${item}`);
      });
    } else if (
      profileV3?.accountId &&
      DIS_IDS?.length === 0 &&
      list_dis?.length === 0 &&
      location?.pathname !== '/search-results'
    ) {
      [].forEach((item) => {
        params.append(`dis-ids`, `${item}`);
      });
    }
    // lấy từ profile qua

    if (list_cate?.length > 0) {
      list_cate.forEach((item, index) => {
        paramsCate.append(`categories-ids`, `${item}`);
      });
    } else if (list_cate?.length === 0 && CATE_IDS?.length > 0) {
      [].forEach((item) => {
        paramsCate?.append(`categories-ids`, `${item}`);
      });
    } else if (
      profileV3?.accountId &&
      CATE_IDS?.length === 0 &&
      list_cate?.length !== 0 &&
      location?.pathname !== '/search-results'
    ) {
      // dataProfile.categories.forEach((item: any) => {
      //   paramsCate.append(
      //     `categories-ids`,
      //     `${[item.parent_category_id, item.child_category_id]}`,
      //   );
      // });
      list_cate?.forEach((item, index) => {
        paramsCate?.append(`categories-ids`, `${item}`);
      });
    } else if (
      profileV3?.accountId &&
      CATE_IDS?.length === 0 &&
      list_cate?.length === 0 &&
      location?.pathname !== '/search-results'
    ) {
      [].forEach((item) => {
        paramsCate?.append(`categories-ids`, `${item}`);
      });
    }

    if (valueSearchInput === '' && QUERY) {
      encode = encodeURIComponent(`${''}`);
    } else if (!valueSearchInput && QUERY) {
      encode = encodeURIComponent(`${valueSearchInput}`);
    } else if (valueSearchInput && QUERY) {
      encode = encodeURIComponent(`${valueSearchInput}`);
    } else if (valueSearchInput && !QUERY) {
      encode = encodeURIComponent(`${valueSearchInput}`);
    } else if (!valueSearchInput && !QUERY) {
      encode = encodeURIComponent(``);
    }
    // if (!jobType && JOB_TYPE) {
    //   job_type = JOB_TYPE;
    // }

    // console.log('vvvvvvv', valueSearchInput)
    // console.log('encode', encode)
    // else if (jobType && jobType === 5 && JOB_TYPE) {
    //   console.log('ko parma 22222222222', JOB_TYPE)
    //   console.log('ko parma', jobType)

    //   job_type = null
    // } else if (jobType && jobType !== 5) {
    //   console.log('ko parma 33333333333', JOB_TYPE)
    //   console.log('cko parma', jobType)

    //   job_type = jobType
    // } else {
    //   job_type = null
    // }

    // if (!salaryType && SALARY_TYPE) {
    //   salary_type = SALARY_TYPE;
    // }

    setTimeout(() => {
      if (location.pathname !== '/search-results') {
        window.open(
          `/search-results?${encode !== 'undefined' ? `q=${encode}` : ``}`,
          '_parent',
        );
      } else {
        setSearchParams({
          q: encode ? `${encode}` : '',
        });
        setSearch(!search);
        setOpenCollapseFilter(false);
        // window.open(`/search-results`, "_sel")
      }
    }, 100);

    // setTimeout(() => {
    //   window.open(
    //     `/search-results?${encode !== 'undefined' ? `q=${encode}` : ``}` +
    //     `${salary_type ? `&sal-type=${salary_type}` : ''}` +
    //     `${job_type ? `&job-type=${job_type}` : ''}` +
    //     `${params.toString() !== '' ? `&${params.toString()}` : ''}` +
    //     `${list_cate.length > 0
    //       ? `&${paramsCate.toString()}`
    //       : `&${paramsCate.toString()}`
    //     }` +
    //     `${salary_min ? `&salary_min=${salary_min}` : ''}` +
    //     `${salary_max ? `&salary_max=${salary_max}` : ''}` +
    //     `${is_working_weekend
    //       ? `&is_working_weekend=${is_working_weekend}`
    //       : ''
    //     }` +
    //     `${is_remotely ? `&is_remotely=${is_remotely}` : ''}` +
    //     `${money_type ? `&money_type=${money_type}` : ''}`,
    //     '_sel',
    //   );
    // }, 100);
  };

  // login
  const handleClickLogin = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    // console.log('click');
    try {
      if (openInfoUser) {
        setSpinning(false);
        setOpenInfoUser(!openInfoUser);
      } else {
        setSpinning(true);
      }
      var ResuiltGetProfileV3 = null;
      if (localStorage.getItem('refreshToken')) {
        // result = await profileApi.getProfile(languageRedux === 1 ? 'vi' : 'en');
        ResuiltGetProfileV3 = await profileApi.getProfileV3;
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accountId');
      }
      if (ResuiltGetProfileV3) {
        // dispatch(getProfile() as any);
        setSpinning(false);
        setOpenInfoUser(!openInfoUser);
      } else {
        setOpenModalLogin(true);
        setSpinning(false);
      }
    } catch (error) {
      // localStorage.clear();
      if (!localStorage.getItem('refreshToken')) {
        setSpinning(false);
        setOpenInfoUser(false);
        setOpenModalLogin(true);
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setSpinning(false);
        setOpenModalLogin(true);

        // setOpenInfoUser(!openInfoUser);
        setOpenInfoUser(false);
      }
      setSpinning(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refInfoUser.current && !refInfoUser.current.contains(event.target)) {
        setOpenInfoUser(false);
      }

      if (refLogin.current && !refLogin.current.contains(event.target)) {
        setOpenInfoUser(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let socket = useRef<any>();

  React.useEffect(() => {
    if (!socket.current && localStorage.getItem('accessToken')) {
      socket.current = io('https://neoworks.vn', {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      socket.current.on('connect', () => {
        // setIsConnected(true);
      });
    }
  }, []);

  // handle logout
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const result = await authApi.signOut(refreshToken);
        if (result) {
          if (socket.current) {
            console.log('disconnect socket thành công');
            socket.current.disconnect();
            // socket.current.close();
          }
          window.open('/', '_parent');
          // localStorage.clear();
          const exceptionKey = 'persist:root';

          const localStorageKeys = Object.keys(localStorage);

          const keysToRemove = localStorageKeys.filter(
            (key) => key !== exceptionKey,
          );

          await dispatch<any>(setProfileV3([]));

          for (const key of keysToRemove) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      if (socket.current) {
        console.log('disconnect socket thành công');
        socket.current.disconnect();
        // socket.current.close();
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accountId');
      window.open('/', '_parent');
      console.log(error);
    }
  };

  const getAppliedPostedJobs = async () => {
    try {
      const result = await applitedPostedApi.getAllApplitedPostedApi(
        0,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        localStorage.setItem('numberAppliedPostedJobs', result.data.length);

        setAppliedPostedJob(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPropfileV3New = async () => {
    try {
      const result = await profileApi.getProfileV3(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        dispatch(setProfileV3(result));
      }
    } catch (error) {}
  };

  // useEffect(() => {
  //   getPropfileV3New();
  // }, []);

  React.useEffect(() => {
    if (localStorage.getItem('accessToken')) getAppliedPostedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);
  const [waiting, setWaiting] = useState(0);

  useEffect(() => {
    const countApproved = appliedPostedJob.reduce(
      (count: number, applicant: any) => {
        if (applicant.application_status === 2) {
          return count + 1;
        }
        return count;
      },
      0,
    );

    const countPending = appliedPostedJob.reduce(
      (count: number, applicant: any) => {
        if (applicant.application_status === 3) {
          return count + 1;
        }
        return count;
      },
      0,
    );

    const countWaitng = appliedPostedJob.reduce(
      (count: number, applicant: any) => {
        if (
          applicant.application_status === 1 ||
          applicant.application_status === 0
        ) {
          return count + 1;
        }
        return count;
      },
      0,
    );

    setApproved(countApproved);
    setPending(countPending);
    setWaiting(countWaitng);
  }, [appliedPostedJob]);

  const handleResetValue = () => {
    setJobType(null);
    setListDis([]);
    setListCate([]);
    setSalaryMax(12000000);
    setSalaryMin(0);
    setTypeMoney(1);
    setSalaryType('');
    setIsWorkingWeekend(0);
    setIsRemotely(0);
    setReset(true);

    let filter = {
      money_type: 1,
      salary_min: 0,
      salary_max: 12000000,
      list_dis: [],
      list_cate: [],
      is_working_weekend: 0,
      is_remotely: 0,
    };
    setCookie('userFiltered', JSON.stringify(filter), 365);

    let typeJobReset = {
      id: 6,
      name: languageRedux === 1 ? 'Loại công việc' : 'Job type',
    };
    setCookie('userTypejobFiltered', JSON.stringify(typeJobReset), 365);

    let typeSalaryReset = {
      id: -1,
      value: languageRedux === 1 ? 'Trả lương theo' : 'Payment by',
    };
    setCookie('userTypeSalaryFiltered', JSON.stringify(typeSalaryReset), 365);
  };

  const handleChangeLanguage = async (e: any) => {
    // console.log('e.target.value = ' + e.target.value);

    setLanguageId(e.target.value);
    setCookie('languageId', JSON.stringify(e.target.value), 365);
    await dispatch<any>(setLanguage(e.target.value));
    // await dispatch(getLanguages(e.target.value) as any);

    // try {
    //   const result = await languageApi.getLanguage(
    //     languageRedux === 1 ? 'vi' : 'en',
    //   );
    //   if (result) {
    //     setLanguageState(result.data);
    //     // setUser(result);
    //   }
    // } catch (error) {
    //   // setLoading(false);
    // }
  };

  useEffect(() => {
    let userLanguageSelected = JSON.parse(getCookie('languageId') || '1');
    if (userLanguageSelected) {
      setLanguageId(userLanguageSelected);
      dispatch(getLanguages(userLanguageSelected) as any);
    } else {
      setLanguageId(1);
      dispatch(getLanguages('1') as any);
    }
  }, [languageId]);

  React.useEffect(() => {
    const handleCloseFilter = (event: any) => {
      event.stopPropagation();

      if (
        openCollapseFilter &&
        event.target.closest('.show-modal_navbar') &&
        !event.target.closest('.nav')
      ) {
        setOpenCollapseFilter(false);
      }
    };
    window.addEventListener('click', handleCloseFilter);
    return () => {
      window.removeEventListener('click', handleCloseFilter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollapseFilter]);

  // const [isDownloading, setIsDownloading] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsDownloading((prevIsDownloading) => !prevIsDownloading);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);
  // console.log('click');

  const totgleLanguage = async (value: any) => {
    // setLanguageId(e.target.value);
    // let value = 1;
    // value === 1 ? value = 2 : 1;
    setCookie('languageId', JSON.stringify(value), 365);
    await dispatch<any>(setLanguage(value));
    await dispatch(getLanguages(value.toString()) as any);
  };

  const buttons = [
    <div
      key="1"
      className="language"
      onClick={() => {
        languageRedux === 1 ? totgleLanguage(2) : totgleLanguage(1);
      }}
    >
      {languageRedux === 1 ? (
        <VNSubLoginIcon width={24} height={24} />
      ) : (
        <ENSubLoginIcon width={24} height={24} />
      )}
    </div>,
    // <React.Fragment key="2">
    //   {localStorage.getItem('accessToken') ? (
    //     <div className="switch-container">
    //       <div
    //         className="search-job-switch"
    //         style={{
    //           display:
    //             profileV3.length !== 0
    //               ? profileV3?.typeRoleData === 0
    //                 ? 'flex'
    //                 : 'none'
    //               : 'none',
    //         }}
    //       >
    //         {/* <p>
    //       {
    //         searchJob ?
    //           languageRedux === 1 ?
    //             `Trạng thái tìm việc: bật` :
    //             `Job search status is: on` :
    //           languageRedux === 1 ?
    //             `Trạng thái tìm việc: tắt` :
    //             `Job search status is: off`
    //       }
    //     </p> */}
    //         <Switch
    //           checked={profileV3.isSearch === 1}
    //           loading={loadingSwitch}
    //           onChange={handleOnchangeSearchJob}
    //         />
    //         <div className="switch__hover__container">
    //           <div className="switch__hover">
    //             <div className="switch__hover__p">
    //               <p>
    //                 {languageRedux === 1
    //                   ? `Trạng thái tìm kiếm việc làm của bạn được bật để Nhà tuyển dụng có thể tìm thấy bạn dễ dàng, khả năng nhận được công việc phù hợp sẽ cao hơn!`
    //                   : `Your job search status is turned on so that Recruiters can find you easily, the possibility of getting a suitable job is higher!`}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <button
    //         style={{
    //           display:
    //             profileV3.length !== 0
    //               ? profileV3?.typeRoleData === 0
    //                 ? 'none'
    //                 : 'flex'
    //               : 'none',
    //         }}
    //         key="1"
    //         className="btn btn__post"
    //         onClick={() => {
    //           if (profileV3 && localStorage.getItem('refreshToken')) {
    //             if (profileV3.companyInfomation === null) {
    //               setOpenModalNoteCreateCompany(true);
    //             } else {
    //               window.open('/post', '_parent');
    //             }
    //           } else {
    //             setOpenModalLogin(true);
    //           }
    //         }}
    //       >
    //         <FormOutlined style={{ color: 'white' }} />
    //         <p style={{ marginLeft: 10, color: 'white' }}>
    //           {/* {languageData
    //       ? languageData.post
    //       : languageRedux === 1
    //       ? `Đăng bài`
    //       : `Post`} */}
    //           {languageData ? languageData.post : ''}
    //           {/* {languageRedux === 1 ? `Đăng bài` : `Post`} */}
    //         </p>
    //       </button>
    //     </div>
    //   ) : (
    //     <></>
    //   )}
    // </React.Fragment>,
    <div
      className="actions-login"
      ref={refLogin}
      key="3"
      // style={{ pointerEvents: !localStorage.getItem('accessToken') && 'none'}}
      // style={{ pointerEvents: !localStorage.getItem('accessToken') ? "none" : "auto" }}
    >
      <button className="btn btn__login" onClick={handleClickLogin}>
        <div style={{ display: 'flex' }}>
          <div className="login__avatar">
            <Avatar
              style={{ backgroundColor: '#0D99FF' }}
              icon={<UserOutlined />}
              src={profileV3?.avatarPath ? profileV3.avatarPath : ''}
            />
          </div>
          <div className="login__center">
            {localStorage.getItem('accessToken') && profileV3 ? (
              <span>{profileV3?.name}</span>
            ) : (
              // <span>{languageData?.login}</span>
              <span>{languageRedux === 1 ? `Đăng nhập` : `Sign in`}</span>
            )}
          </div>
        </div>
        <div className="login__icon">
          <RightOutlined />
        </div>
      </button>
      <div
        className="login__hover__container"
        style={{
          // visibility: localStorage.getItem('accessToken') ? "hidden" : "visible"
          display:
            !localStorage.getItem('accessToken') &&
            openLogin &&
            location?.pathname === '/'
              ? 'block'
              : 'none',
        }}
      >
        <div className="login__hover">
          <h3>{languageRedux === 1 ? 'Đăng nhập ở đây' : 'Sign in here'}</h3>
          <div className="login__hover__p">
            <p>{languageData?.home_page?.choose_your_location_category}</p>
            <p>
              {
                languageData?.home_page
                  ?.provide_the_best_recruitment_information
              }
            </p>
          </div>
          {/* <Button
            type="primary"
            onClick={() => {
              setOpenModalLogin(true);
            }}
          >
            <LoginArrowBlackIcon />
            {languageRedux === 1 ? home.sign_in : homeEn.sign_in}
          </Button> */}
        </div>
      </div>
      <div
        className="login__hover__container"
        style={{
          // visibility: localStorage.getItem('accessToken') ? "hidden" : "visible"
          display:
            localStorage.getItem('accessToken') &&
            profileV3?.name === 'Your name' &&
            profileV3?.phone === '' &&
            profileV3?.typeRoleData !== null &&
            openLogin &&
            location?.pathname === '/'
              ? 'block'
              : 'none',
        }}
      >
        <div className="login__hover">
          <h3>{languageRedux === 1 ? 'Cập nhật hồ sơ' : 'Update profile'}</h3>
          <div className="login__hover__p">
            <p>
              {languageRedux === 1
                ? 'Hoàn thành hồ sơ và bạn sẽ có cơ hội được nhà tuyển dụng tìm kiếm liên hệ.'
                : "Complete your profile and you'll have a chance to be contacted by the recruiter you're looking for."}
            </p>
          </div>
        </div>
      </div>
      <Spin indicator={antIcon} spinning={spinning}>
        {openInfoUser && (
          <div className="sub-login" ref={refInfoUser}>
            <Space
              className="sub-login_info"
              style={{
                flexDirection: 'column',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(170, 170, 170, 1)',
                width: '100%',
              }}
            >
              <div className="sub-login_info__top">
                <Avatar
                  style={{
                    backgroundColor: '#0D99FF',
                    minWidth: profileV3?.typeRoleData === 1 ? '110px' : '80px',
                    minHeight: profileV3?.typeRoleData === 1 ? '110px' : '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  icon={<UserOutlined style={{ fontSize: 30 }} />}
                  size={50}
                  src={profileV3?.avatarPath ? profileV3.avatarPath : null}
                />
                <div className="sub-login_detail">
                  <h2>
                    {profileV3?.name
                      ? profileV3.name
                      : languageData?.home_page?.un_update_infor}
                  </h2>
                  <span className="sub-login_text">
                    {/* <CompanySubLoginIcon /> */}
                    {/* <MailOutlined /> */}
                    {profileV3?.typeRoleData === 1 ? (
                      <>
                        <HomeOutlined />
                        <p>
                          {companyName
                            ? companyName
                            : languageRedux === 1
                            ? 'Hãy cập nhật thông tin công ty'
                            : 'Please update company information'}
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                  <span className="sub-login_text">
                    <MailOutlined />
                    {/* <PhoneOutlined /> */}
                    <p>
                      {profileV3?.typeRoleData === 1
                        ? profileV3?.companyInfomation?.email
                          ? profileV3?.companyInfomation?.email
                          : languageRedux === 1
                          ? 'Hãy cập nhật thông tin công ty'
                          : 'Please update company information'
                        : profileV3?.email
                        ? profileV3?.email
                        : languageData?.home_page?.un_update_infor}
                    </p>
                  </span>
                  {profileV3?.typeRoleData === 1 ? (
                    <span className="sub-login_text">
                      <PhoneOutlined />
                      <p>
                        {profileV3?.companyInfomation !== null
                          ? profileV3?.companyInfomation?.phone
                          : languageRedux === 1
                          ? 'Hãy cập nhật thông tin công ty'
                          : 'Please update company information'}
                      </p>
                    </span>
                  ) : (
                    <span className="sub-login_text">
                      <PhoneOutlined />
                      <p>
                        {profileV3?.phone
                          ? profileV3?.phone
                          : languageData?.home_page?.un_update_infor}
                      </p>
                    </span>
                  )}
                  {/* <span className="sub-login_text">
                  <LoginHomeIcon />
                  {dataProfile?.email ? dataProfile?.email : ''}
                </span> */}
                </div>
              </div>
              <div className="sub-login_info__bottom">
                {profileV3?.typeRoleData === 0 ? (
                  <div className="sub-login_detail__bottom">
                    <span
                      className="sub-login_text__bottom"
                      onClick={() => window.open(`/profile`, '_parent')}
                    >
                      <MapInfoIcon />
                      <p>
                        {profileV3?.profileLocations?.length > 0
                          ? profileV3?.profileLocations?.map(
                              (location: any) => {
                                return `${location.fullName} , `;
                              },
                            )
                          : languageData?.home_page?.un_update_infor}
                      </p>
                    </span>
                    <span
                      className="sub-login_text__bottom"
                      onClick={() => window.open(`/profile`, '_parent')}
                    >
                      <BagInfoJob />

                      <p>
                        {profileV3 && profileV3?.profileCategories?.length > 0
                          ? profileV3?.profileCategories.map((profile: any) => {
                              return `${profile.parentCategory.fullName} / ${profile.fullName}, `;
                            })
                          : languageData?.home_page?.un_update_infor}
                      </p>
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Space>
            <div className="sub-login_items">
              <Link to="/profile" target="_parent">
                <div className="sub-login_item">
                  <UserPersonSubLoginIcon />
                  <span>{languageData?.home_page?.update_infor}</span>
                </div>
              </Link>
              <Link to="/history" target="_parent">
                <div
                  className="sub-login_item"
                  style={{
                    borderBottom:
                      roleRedux === 0 || profileV3?.typeRoleData === 0
                        ? 'none'
                        : '1px solid rgb(170, 170, 170)',
                  }}
                  // onClick={() => {
                  //   window.open('/history', "_top")
                  // }}
                >
                  <PaperSubLoginIcon />
                  <span>{languageData?.history}</span>
                </div>
              </Link>
              <div
                className="sub-history_status"
                style={{
                  display:
                    roleRedux === 0 || profileV3?.typeRoleData === 0
                      ? 'flex'
                      : 'none',
                }}
              >
                <span>
                  {languageData?.approved} {`${approved}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageData?.home_page?.pending} {`${pending}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageData?.home_page?.waiting} {`${waiting}`}
                </span>
              </div>
              {/* <div className="sub-login_item">
                <KeyOutlined />
                <span>Đổi mật khẩu</span>
              </div> */}
              {/* <div
                className="sub-login_item__translate"
                onClick={handleOpenRadioGroup}
                style={{
                  borderBottom: openRadioGroup
                    ? 'none'
                    : '1px solid rgba(170, 170, 170, 1)',
                }}
              // style={{ display: 'none' }}
              >
                <div className="sub-translate_header_left">
                  <TranslateSubLoginIcon />
                  <span>{languageRedux === 1 ? 'Ngôn ngữ' : 'Language'}</span>
                </div>
                <div
                  className="sub-translate_header_right"
                  style={{
                    transform: openRadioGroup ? 'rotate(-90deg)' : 'unset',
                  }}
                >
                  <ArrowSubLoginIcon />
                </div>
              </div> */}

              <div
                className="sub-translate_status"
                style={
                  {
                    // height: openRadioGroup ? '100%' : '0',
                    // display: 'none',
                  }
                }
              >
                <Radio.Group
                  name="radiogroup"
                  value={languageRedux}
                  defaultValue={languageId}
                  className="sub-login-radio-group"
                  onChange={handleChangeLanguage}
                  // style={{
                  //   display: openRadioGroup ? 'flex' : 'none',
                  // }}
                >
                  <Radio value={1}>
                    <VNSubLoginIcon />
                    <span>Tiếng Việt</span>
                  </Radio>
                  <Radio value={2}>
                    <ENSubLoginIcon />
                    <span>English</span>
                  </Radio>
                  {/* <Radio value={3}>
                    <ENSubLoginIcon />
                    <span>{language?.korean}</span>
                  </Radio> */}
                </Radio.Group>
              </div>

              <div
                className="sub-login_item"
                onClick={handleLogout}
                style={{ borderBottom: 'none' }}
              >
                <LogoutSubLoginIcon />

                <span>{languageData?.sign_out}</span>
              </div>

              {/* <div className="sub-login_item" onClick={handleLogout}>
                <FlagVNIcon />
                <span>Đổi ngôn ngữ</span>
              </div> */}
            </div>
          </div>
        )}
      </Spin>
    </div>,
  ];

  const menu = [
    <Button
      key="1"
      className="btn-filter"
      onClick={() => setOpenCollapseFilter(!openCollapseFilter)}
    >
      <BlackSearchIcon width={20} height={20} />
    </Button>,

    <Badge key="2" count={countChat} className="box-right-responsive_badge">
      <Button
        onClick={() => {
          if (profileV3 && localStorage.getItem('refreshToken')) {
            window.open(`/message`, '_parent');
          } else {
            setOpenModalLogin(true);
          }
        }}
        name="btn-chat"
        type="link"
      >
        <ChatIcon />
      </Button>
    </Badge>,
    <Badge key="3" count={countNoti} className="box-right-responsive_badge">
      <Button
        key="3"
        className="btn-notice"
        name="btn-notice"
        onClick={() => {
          if (profileV3 && localStorage.getItem('accessToken')) {
            setOpenNotificate(!openNotificate);
          } else {
            setOpenModalLogin(true);
          }
        }}
      >
        <BellIcon />
      </Button>
    </Badge>,
    //     <div
    //       key="4"
    //       className="wrap-btn_notice btn-noti_icon
    // border-aniation_download
    // "
    //     >
    //       <Button
    //         className="btn-notice"
    //         // onClick={() => setOpenNotificate(!openNotificate)}
    //         name="btn-down"
    //         ref={bellRef}
    //       >
    //         <div className="button-download">
    //           {/* <DownloadIcon /> */}

    //           <img src="./images/down.gif" alt="" />
    //         </div>
    //         {/* <img src="images/gif/icons8-installing-updates.gif" alt="" /> */}
    //       </Button>
    //       <div className="sub-icon_qr">
    //         <h2>{languageData?.download_hijob_app}</h2>
    //         <img
    //           src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/qr-code.jpg"
    //           alt={languageData?.err_none_img}
    //         />
    //         <div className="sub-icon_apps">
    //           <Link
    //             to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
    //             target="_seft"
    //           >
    //             <img
    //               id="img-gallery"
    //               src={require('../../img/langdingPage/image 43.png')}
    //               alt={languageData?.err_none_img}
    //             />
    //           </Link>
    //           <Link
    //             to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
    //             target="_seft"
    //           >
    //             <img
    //               src={require('../../img/langdingPage/image 45.png')}
    //               alt={languageData?.err_none_img}
    //             />
    //           </Link>
    //         </div>
    //       </div>
    //     </div>,
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        alignItems: 'center',
        marginLeft: '4px',
      }}
      key="5"
    >
      <div
        className="language"
        onClick={() => {
          languageRedux === 1 ? totgleLanguage(2) : totgleLanguage(1);
        }}
      >
        {languageRedux === 1 ? (
          <VNSubLoginIcon width={24} height={24} />
        ) : (
          <ENSubLoginIcon width={24} height={24} />
        )}
      </div>
      {/* <div className="switch-container-responsive">
        <div
          className="search-job-switch-responsive "
          style={{
            display:
              roleRedux === 0 || profileV3?.typeRoleData === 0
                ? 'flex'
                : 'none',
          }}
        >
          <p>
        {
          searchJob ?
            languageRedux === 1 ?
              `Trạng thái tìm việc: bật` :
              `Job search status is: on` :
            languageRedux === 1 ?
              `Trạng thái tìm việc: tắt` :
              `Job search status is: off`
        }
      </p>
          <Switch
            checked={searchJob}
            loading={loadingSwitch}
            onChange={handleOnchangeSearchJob}
          />
          <div className="switch__hover__container">
            <div className="switch__hover">
              <div className="switch__hover__p">
                <p>
                  {languageRedux === 1
                    ? `Trạng thái tìm kiếm việc làm của bạn được bật để Nhà tuyển dụng có thể tìm thấy bạn dễ dàng, khả năng nhận được công việc phù hợp sẽ cao hơn!`
                    : `Your job search status is turned on so that Recruiters can find you easily, the possibility of getting a suitable job is higher!`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>,
    // <div className="switch-container-responsive">
    //   <div className="search-job-switch-responsive " style={{ display: role === 0 ? 'flex' : 'none' }}>
    //     {/* <p>
    //     {
    //       searchJob ?
    //         languageRedux === 1 ?
    //           `Trạng thái tìm việc: bật` :
    //           `Job search status is: on` :
    //         languageRedux === 1 ?
    //           `Trạng thái tìm việc: tắt` :
    //           `Job search status is: off`
    //     }
    //   </p> */}
    //     <Switch onChange={handleOnchangeSearchJob} />
    //     <div className="switch__hover__container">
    //       <div className="switch__hover">
    //         <div className="switch__hover__p">
    //           <p>
    //             {languageRedux === 1
    //               ? `Trạng thái tìm kiếm việc làm của bạn được bật để Nhà tuyển dụng có thể tìm thấy bạn dễ dàng, khả năng nhận được công việc phù hợp sẽ cao hơn!`
    //               : `Your job search status is turned on so that Recruiters can find you easily, the possibility of getting a suitable job is higher!`}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>,
    <div
      className="menu"
      // onClick={handleClickLogin}
      ref={refLogin}
      key="5"
    >
      <Button
        className="menu-button"
        name="menu-button"
        onClick={handleClickLogin}
      >
        <MenuOutlined style={{ fontSize: '1.5em' }} />
      </Button>
      <Spin indicator={antIcon} spinning={spinning}>
        {openInfoUser && (
          <div className="sub-login" ref={refInfoUser}>
            <Space
              className="sub-login_info"
              style={{
                flexDirection: 'column',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(170, 170, 170, 1)',
                width: '100%',
              }}
            >
              <div className="sub-login_info__top">
                <Avatar
                  style={{
                    backgroundColor: '#0D99FF',
                    minWidth: '80px',
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  icon={<UserOutlined style={{ fontSize: 30 }} />}
                  size={50}
                  src={profileV3?.avatarPath ? profileV3.avatarPath : null}
                />
                <div className="sub-login_detail">
                  <h2>{profileV3?.name ? profileV3.name : ''}</h2>
                  <span className="sub-login_text">
                    <CompanySubLoginIcon />
                    <p>{companyName ? companyName : ''}</p>
                  </span>
                  <span className="sub-login_text">
                    <MailInfoIcon />

                    <p>{profileV3?.email ? profileV3?.email : ''}</p>
                  </span>
                  {/* <span className="sub-login_text">
                <LoginHomeIcon />
                {dataProfile?.email ? dataProfile?.email : ''}
              </span> */}
                </div>
              </div>
              <div className="sub-login_info__bottom">
                <div className="sub-login_detail__bottom">
                  <span
                    className="sub-login_text__bottom"
                    onClick={() => window.open(`/profile`, '_parent')}
                  >
                    <MapInfoIcon />
                    <p>
                      {profileV3?.profileLocations?.length > 0
                        ? profileV3?.profileLocations?.map((location: any) => {
                            return `${location.fullName} , `;
                          })
                        : languageData?.home_page?.un_update_infor}
                    </p>
                  </span>
                  <span
                    className="sub-login_text__bottom"
                    onClick={() => window.open(`/profile`, '_parent')}
                  >
                    <BagInfoJob />

                    <p>
                      {profileV3 && profileV3?.profileCategories?.length > 0
                        ? profileV3?.profileCategories.map((profile: any) => {
                            return `${profile.parentCategory.fullName} / ${profile.fullName}, `;
                          })
                        : languageData?.home_page?.un_update_infor}
                    </p>
                  </span>
                </div>
              </div>
            </Space>
            <div className="sub-login_items">
              <Link to="/profile" target="_parent">
                <div className="sub-login_item">
                  <UserPersonSubLoginIcon />
                  <span>{languageData?.home_page?.update_infor}</span>
                </div>
              </Link>
              <Link to="/history" target="_parent">
                <div
                  className="sub-login_item"
                  style={{
                    borderBottom:
                      roleRedux === 0 || profileV3?.typeRoleData === 0
                        ? 'none'
                        : '1px solid rgb(170, 170, 170)',
                  }}
                  // onClick={() => {
                  //   window.open('/history', "_top")
                  // }}
                >
                  <PaperSubLoginIcon />
                  <span>{languageData?.history}</span>
                </div>
              </Link>
              <div
                className="sub-history_status"
                style={{
                  display:
                    roleRedux === 0 || profileV3?.typeRoleData === 0
                      ? 'flex'
                      : 'none',
                }}
              >
                <span>
                  {languageData?.approved} {`${approved}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageData?.home_page?.pending} {`${pending}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageData?.home_page?.waiting} {`${waiting}`}
                </span>
              </div>
              {/* <div className="sub-login_item">
              <KeyOutlined />
              <span>Đổi mật khẩu</span>
            </div> */}
              {/* <div
                className="sub-login_item__translate"
                onClick={handleOpenRadioGroup}
                // style={{
                //   borderBottom: openRadioGroup
                //     ? 'none'
                //     : '1px solid rgba(170, 170, 170, 1)',
                // }}
                // style={{ display: 'none' }}
              >
                <div className="sub-translate_header_left">
                  <TranslateSubLoginIcon />
                  <span>{languageData?.home_page?.languages}</span>
                </div>
                <div
                  className="sub-translate_header_right"
                  style={{
                    transform: openRadioGroup ? 'rotate(-90deg)' : 'unset',
                  }}
                >
                  <ArrowSubLoginIcon />
                </div>
              </div> */}

              <div
                className="sub-translate_status"
                style={{
                  height: openRadioGroup ? '100%' : '100%',
                  // display: 'none',
                }}
              >
                <Radio.Group
                  name="radiogroup"
                  value={languageRedux}
                  defaultValue={languageId}
                  className="sub-login-radio-group"
                  onChange={handleChangeLanguage}
                  style={
                    {
                      // display: openRadioGroup ? 'flex' : 'flex',
                    }
                  }
                >
                  <Radio value={1}>
                    <VNSubLoginIcon />
                    <span>Tiếng Việt</span>
                  </Radio>
                  <Radio value={2}>
                    <ENSubLoginIcon />
                    <span>English</span>
                  </Radio>
                  {/* <Radio value={3}>
                  <ENSubLoginIcon />
                  <span>{language?.korean}</span>
                </Radio> */}
                </Radio.Group>
              </div>

              <div
                className="sub-login_item"
                onClick={handleLogout}
                style={{ borderBottom: 'none' }}
              >
                <LogoutSubLoginIcon />

                <span>{languageData?.sign_out}</span>
              </div>

              {/* <div className="sub-login_item" onClick={handleLogout}>
              <FlagVNIcon />
              <span>Đổi ngôn ngữ</span>
            </div> */}
            </div>
          </div>
        )}
      </Spin>
    </div>,
  ];

  return (
    <div
      className={`modal-navbar ${
        openCollapseFilter ? 'show-modal_navbar' : ''
      }`}
    >
      <Container className="nav" ref={ref}>
        <ModalLogin
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        />

        {/* <ModalNoteCreateCompany
          openModalNoteCreateCompany={openModalNoteCreateCompany}
          setOpenModalNoteCreateCompany={setOpenModalNoteCreateCompany}
        />

        <ModalTurnOffStatus
          openModalTurnOffStatus={openModalTurnOffStatus}
          setOpenModalTurnOffStatus={setOpenModalTurnOffStatus}
          setSearchJob={setSearchJob}
          setLoadingSwitch={setLoadingSwitch}
        /> */}
        {/* <ModalLoginNav
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        /> */}
        {/* <Backdrop
          sx={{
            color: '#0d99ff ',
            backgroundColor: 'transparent',
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={openBackdrop}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <Wrapper
          className="wrap-content_nav"
          style={
            location.pathname === '/'
              ? { maxWidth: '1280px' }
              : { maxWidth: '1080px' }
          }
        >
          <div style={{ display: 'flex' }} className="wrap-left_nav">
            <Left>
              <Logo />
            </Left>
            <Center className="div-nav-center">
              {/* <div>assssssssssssssssssssssssssssssss</div> */}
              {window.innerWidth > 768 ? (
                <SearchInput
                  checkSearch={checkSeacrh}
                  value={valueSearchInput}
                  setValue={setValueSearchInput}
                  setOpenCollapseFilter={setOpenCollapseFilter}
                  openCollapseFilter={openCollapseFilter}
                  handleSearchIcon={handleSearch}
                />
              ) : (
                <></>
              )}
              <Button
                className="btn-search"
                onClick={(event) => handleSearch(event, valueSearchInput)}
              >
                Tìm Kiếm
              </Button>

              <Button
                className="btn-filter"
                onClick={() => setOpenCollapseFilter(!openCollapseFilter)}
              >
                <BlackSearchIcon width={20} height={20} />
              </Button>

              <Badge
                count={window.innerWidth < 426 ? '' : countChat}
                className="btn-badge"
              >
                <Button
                  className="btn-notice"
                  name="btn-chat"
                  onClick={() => {
                    if (profileV3 && localStorage.getItem('refreshToken')) {
                      window.open(`/message`, '_parent');
                    } else {
                      setOpenModalLogin(true);
                    }
                  }}
                  type="link"
                  style={{ border: '1px solid #d9d9d9' }}
                >
                  <ChatIcon />
                </Button>
              </Badge>

              <div className="wrap-btn_notice ">
                <Badge
                  key="3"
                  count={window.innerWidth < 426 ? '' : countNoti}
                  className="box-right-responsive_badge"
                >
                  <Button
                    className="btn-notice"
                    name="btn-notice"
                    onClick={() => {
                      if (profileV3 && localStorage.getItem('accessToken')) {
                        setOpenNotificate(!openNotificate);
                      } else {
                        setOpenModalLogin(true);
                      }
                    }}
                    ref={bellRef}
                  >
                    <BellIcon />
                  </Button>
                </Badge>
                {openNotificate ? <Notificate /> : <></>}
              </div>

              {/* <div
                className="wrap-btn_notice btn-noti_icon 
            border-aniation_download
            "
              >
                <Button
                  className="btn-notice"
                  // onClick={() => setOpenNotificate(!openNotificate)}
                  name="btn-down"
                  ref={bellRef}
                >
                  <div className="button-download">

                    <img src="./images/down.gif" alt="" />
                  </div>
                  <img src="images/gif/icons8-installing-updates.gif" alt="" />
                </Button>
                <div className="sub-icon_qr">
                  <h2>{languageData?.download_hijob_app}</h2>
                  <img
                    src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/qr-code.jpg"
                    alt={languageData?.err_none_img}
                  />
                  <div className="sub-icon_apps">
                    <Link
                      to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                      target="_seft"
                    >
                      <img
                        id="img-gallery"
                        src={require('../../img/langdingPage/image 43.png')}
                        alt={languageData?.err_none_img}
                      />
                    </Link>
                    <Link
                      to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                      target="_seft"
                    >
                      <img
                        src={require('../../img/langdingPage/image 45.png')}
                        alt={languageData?.err_none_img}
                      />
                    </Link>
                  </div>
                </div>
              </div> */}
            </Center>
          </div>
          <Right className="div-nav-right">
            <Box
              className="box-right-responsive"
              sx={{
                display: 'none',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
                [`@media (max-width: 480px)`]: {
                  display: 'flex',
                },
              }}
            >
              <ButtonGroup sx={{ margin: '0', alignItems: 'center' }}>
                {menu}
              </ButtonGroup>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
                [`@media (max-width: 480px)`]: {
                  display: 'none',
                },
              }}
            >
              <ButtonGroup sx={{ margin: '0' }}>{buttons}</ButtonGroup>
            </Box>

            {openNotificate ? <Notificate /> : <></>}
          </Right>
        </Wrapper>
        <Collapse
          in={openCollapseFilter}
          onEnter={handleCollapseEntered}
          onExited={handleCollapseExited}
          // sx={collapseCssFilter}
          sx={
            location.pathname === '/'
              ? { maxWidth: '1280px' }
              : { maxWidth: '1080px' }
          }
          className="nav-collapse"
        >
          {window.innerWidth <= 768 ? (
            <SearchInput
              checkSearch={checkSeacrh}
              value={valueSearchInput}
              setValue={setValueSearchInput}
              setOpenCollapseFilter={setOpenCollapseFilter}
              openCollapseFilter={openCollapseFilter}
              handleSearchIcon={handleSearch}
            />
          ) : (
            <></>
          )}

          {window.innerWidth > 768 ? (
            <div className="filter-wraps">
              <div className="filter-wrap_top">
                <FilterLocationNav
                  listDis={listDis}
                  setListDis={setListDis}
                  reset={reset}
                  setReset={setReset}
                  language={languageData}
                />
                <FilterCateloriesNav
                  listCateProps={listCate}
                  setListCate={setListCate}
                  reset={reset}
                  setReset={setReset}
                  language={languageData}
                />
                <FilterTypeJob
                  valueTypeJob={jobType}
                  setTypeJob={setJobType}
                  reset={reset}
                  setReset={setReset}
                  language={languageData}
                />
              </div>
              <div className="filter-wrap_bottom">
                <FilterTypeSalary
                  setSalaryType={setSalaryType}
                  reset={reset}
                  setReset={setReset}
                />
                <FilterSalary
                  salaryType={salaryType}
                  typeMoney={typeMoney}
                  setTypeMoney={setTypeMoney}
                  salaryMin={salaryMin}
                  salaryMax={salaryMax}
                  setSalaryMin={setSalaryMin}
                  setSalaryMax={setSalaryMax}
                  reset={reset}
                  setReset={setReset}
                />
                <FilterTimeJob
                  setIsWorkingWeekend={setIsWorkingWeekend}
                  isWorkingWeekend={isWorkingWeekend}
                  isRemotely={isRemotely}
                  setIsRemotely={setIsRemotely}
                  reset={reset}
                  setReset={setReset}
                />
              </div>
            </div>
          ) : (
            <></>
          )}

          {window.innerWidth <= 768 ? (
            <div className="filter-wrap_respone">
              <FilterLocationNav
                listDis={listDis}
                setListDis={setListDis}
                reset={reset}
                setReset={setReset}
                language={languageData}
              />
              <FilterCateloriesNav
                listCateProps={listCate}
                setListCate={setListCate}
                reset={reset}
                setReset={setReset}
                language={languageData}
              />
              <FilterTypeJob
                valueTypeJob={jobType}
                setTypeJob={setJobType}
                reset={reset}
                setReset={setReset}
                language={languageData}
              />
              <FilterTypeSalary
                setSalaryType={setSalaryType}
                reset={reset}
                setReset={setReset}
              />
              <div className="filter-wrap-respone_bottom">
                <FilterSalary
                  salaryType={salaryType}
                  typeMoney={typeMoney}
                  setTypeMoney={setTypeMoney}
                  salaryMin={salaryMin}
                  salaryMax={salaryMax}
                  setSalaryMin={setSalaryMin}
                  setSalaryMax={setSalaryMax}
                  reset={reset}
                  setReset={setReset}
                />
                <FilterTimeJob
                  setIsWorkingWeekend={setIsWorkingWeekend}
                  isWorkingWeekend={isWorkingWeekend}
                  isRemotely={isRemotely}
                  setIsRemotely={setIsRemotely}
                  reset={reset}
                  setReset={setReset}
                />
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="btn-filter_nav">
            <Button type="default" onClick={handleResetValue}>
              {/* {languageData?.reset} */}
              {languageRedux === 1 ? 'Đặt lại' : 'Reset'}
            </Button>
            <Button
              type="primary"
              onClick={(e) => handleSearch(e, valueSearchInput)}
            >
              {/* {languageData?.apply} */}
              {languageRedux === 1 ? 'Áp dụng' : 'Apply'}
            </Button>
          </div>
        </Collapse>
        {/* {openNotificate ? <Notificate /> : <></>} */}
      </Container>
      {/* <PostButton setOpenModalLogin={setOpenModalLogin} role={roleRedux} /> */}
    </div>
  );
};

export default React.memo(Navbar);
