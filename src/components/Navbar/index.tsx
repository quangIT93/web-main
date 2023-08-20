import React, { useEffect, useState, useContext } from 'react';
// @ts-ignore
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';

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

import { Avatar, Button, Space, Spin, Badge, Radio } from 'antd';

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

import { RootState } from '../../store/reducer';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../store/index';

// import Context
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { ChatContext } from 'context/ChatContextProvider';
import { DivRef1 } from 'context/HomeValueContextProvider';
import { useSearchParams } from 'react-router-dom';
import { setLanguage } from 'store/reducer/changeLanguageReducer';

import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';
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

  // const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openInfoUser, setOpenInfoUser] = React.useState(false);
  // const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(true);
  const [spinning, setSpinning] = React.useState(false);
  const [reset, setReset] = React.useState<Boolean>(false);

  // value search
  const [salaryType, setSalaryType] = React.useState<any>();
  const [jobType, setJobType] = React.useState<any>();
  const [valueSearchInput, setValueSearchInput] = useState<
    string | undefined
  >();
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

  const [countChat, setCountChat] = useState<number>(0);
  const [languageId, setLanguageId] = useState<number>(1);
  // check search results
  const [checkSeacrh, setCheckSeacrh] = useState<boolean>(false);
  const [openRadioGroup, setOpenRadioGroup] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appliedPostedJob, setAppliedPostedJob] = React.useState<any>([]);
  // const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    // if(localStorage.getItem('accessToken')){
    //   set
    // }
    setTimeout(() => {
      setOpenLogin(false);
    }, 5000);
  }, []);

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
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // handle show tap on screen mobile
  // const handleTap = () => {
  //   setShowTap(!showTap);
  // };

  //  MOdalFilter
  // const [openModalFilter, setOpenModalFilter] = React.useState(false)

  // const handleClickInput = () => {
  //   setOpenCollapse(!openCollapse)
  // }

  const getCompanyInforByAccount = async () => {
    try {
      const result = await apiCompany.getCampanyByAccountApi(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result && result?.data?.companyInfomation?.id != null) {
        setCompanyName(result?.data?.companyInfomation?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInforByAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

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
  const fecthDataProfileUser = async () => {
    try {
      await dispatch(getProfile() as any);

      const result = await profileApi.getProfile(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        dispatch(getProfile() as any);
      }
    } catch (error) {
      // setOpenBackdrop(false);
      // error authentication
      // setOpenBackdrop(true)
      // if (!localStorage.getItem('accessToken')) {
      //   setOpenBackdrop(false)
      //   return
      // }
      // const result = await profileApi.getProfile()
      // if (result) {
      //   setProfileUser(result.data)
      //   setOpenBackdrop(false)
      // }
      // await dispatch(getProfile() as any)
    }
  };

  useEffect(() => {
    fecthDataProfileUser();
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
    getCountUnread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    receivedMessages,
    sendMessages,
    setReceivedMessages,
    setReceivedMessages,
  ]);

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
    valueSearchInput: string | undefined,
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
      dataProfile?.id &&
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
      dataProfile?.id &&
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
      dataProfile?.id &&
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
      dataProfile?.id &&
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
      var result = null;
      if (localStorage.getItem('accessToken')) {
        result = await profileApi.getProfile('vi');
      }
      if (result) {
        dispatch(getProfile() as any);
        setSpinning(false);
        setOpenInfoUser(!openInfoUser);
      } else {
        setOpenModalLogin(true);
        setSpinning(false);
      }
    } catch (error) {
      // localStorage.clear();
      if (!localStorage.getItem('accessToken')) {
        setSpinning(false);
        setOpenInfoUser(false);
        setOpenModalLogin(true);
      } else {
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
      // console.log('e.tảtget', refInfoUser?.current)
      // console.log('e.tảtget', refInfoUser?.current?.contains(event.target))
      // console.log('e.tảtget', refLogin?.current?.contains(event.target))
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

  // handle logout
  const handleLogout = async () => {
    try {
      // console.log('logout thành công');
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const result = await authApi.signOut(refreshToken);

        if (result) {
          window.location.replace('/');
          // localStorage.clear();
          const exceptionKey = 'persist:root';

          const localStorageKeys = Object.keys(localStorage);

          const keysToRemove = localStorageKeys.filter(
            (key) => key !== exceptionKey,
          );

          for (const key of keysToRemove) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAppliedPostedJobs = async () => {
    try {
      const result = await applitedPostedApi.getAllApplitedPostedApi(0, 'vi');
      if (result) {
        localStorage.setItem('numberAppliedPostedJobs', result.data.length);

        setAppliedPostedJob(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAppliedPostedJobs();
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
      id: 5,
      name: 'Tất cả',
    };
    setCookie('userTypejobFiltered', JSON.stringify(typeJobReset), 365);

    let typeSalaryReset = {
      id: 4,
      value: 'Tháng',
    };
    setCookie('userTypeSalaryFiltered', JSON.stringify(typeSalaryReset), 365);
  };

  const handleChangeLanguage = (e: any) => {
    setLanguageId(e.target.value);
    // setCookie('languageId', JSON.stringify(e.target.value), 365);
    dispatch<any>(setLanguage(e.target.value));
  };

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

  const buttons = [
    <button
      key="1"
      className="btn btn__post"
      onClick={() => {
        if (dataProfile && localStorage.getItem('refreshToken')) {
          window.open('/post', '_parent');
        } else {
          setOpenModalLogin(true);
        }
      }}
    >
      <FormOutlined style={{ color: 'white' }} />
      <p style={{ marginLeft: 10, color: 'white' }}>
        {languageRedux === 1 ? home.post : homeEn.post}
      </p>
    </button>,
    <div
      className="actions-login"
      ref={refLogin}
      key="2"
      // style={{ pointerEvents: !localStorage.getItem('accessToken') && 'none'}}
      // style={{ pointerEvents: !localStorage.getItem('accessToken') ? "none" : "auto" }}
    >
      <button className="btn btn__login" onClick={handleClickLogin}>
        <div style={{ display: 'flex' }}>
          <div className="login__avatar">
            <Avatar
              style={{ backgroundColor: '#0D99FF' }}
              icon={<UserOutlined />}
              src={dataProfile?.avatar ? dataProfile.avatar : ''}
            />
          </div>
          <div className="login__center">
            {localStorage.getItem('accessToken') && dataProfile ? (
              <span>{dataProfile?.name}</span>
            ) : (
              <span>{languageRedux === 1 ? 'Đăng nhập' : homeEn.sign_in}</span>
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
            <p>
              {languageRedux === 1
                ? 'Chọn vị trí và danh mục của bạn'
                : 'Choose your location and category'}
            </p>
            <p>
              {languageRedux === 1
                ? 'Chúng tôi sẽ cung cấp thông tin tuyển dụng tốt nhất'
                : 'We will provide the best recruitment information'}
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
      <Spin indicator={antIcon} spinning={spinning}>
        {openInfoUser && (
          <div className="sub-login" ref={refInfoUser}>
            <Space
              className="sub-login_info"
              style={{
                flexDirection: 'column',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(170, 170, 170, 1)',
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
                  src={dataProfile?.avatar ? dataProfile.avatar : null}
                />
                <div className="sub-login_detail">
                  <h2>{dataProfile?.name ? dataProfile.name : ''}</h2>
                  <span className="sub-login_text">
                    <CompanySubLoginIcon />
                    {companyName ? companyName : ''}
                  </span>
                  <span className="sub-login_text">
                    <MailInfoIcon />
                    {dataProfile?.email ? dataProfile?.email : ''}
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
                      {dataProfile?.locations.length > 0
                        ? dataProfile?.locations.map((location: any) => {
                            return `${location.district} , `;
                          })
                        : languageRedux === 1
                        ? 'Chưa cập nhật thông tin'
                        : 'The information has not been updated'}
                    </p>
                  </span>
                  <span
                    className="sub-login_text__bottom"
                    onClick={() => window.open(`/profile`, '_parent')}
                  >
                    <BagInfoJob />

                    <p>
                      {dataProfile?.categories.length > 0
                        ? dataProfile?.categories.map((profile: any) => {
                            return `${profile.parent_category} / ${profile.child_category}, `;
                          })
                        : languageRedux === 1
                        ? 'Chưa cập nhật thông tin'
                        : 'The information has not been updated'}
                    </p>
                  </span>
                </div>
              </div>
            </Space>
            <div className="sub-login_items">
              <Link to="/profile" target="_sel">
                <div className="sub-login_item">
                  <UserPersonSubLoginIcon />
                  <span>
                    {languageRedux === 1
                      ? 'Cập nhật thông tin'
                      : 'Update information'}
                  </span>
                </div>
              </Link>
              <Link to="/history" target="_sel">
                <div
                  className="sub-login_item"
                  style={{
                    borderBottom: 'none',
                  }}
                  // onClick={() => {
                  //   window.open('/history', "_top")
                  // }}
                >
                  <PaperSubLoginIcon />
                  <span>{languageRedux === 1 ? 'Lịch sử' : 'History'}</span>
                </div>
              </Link>
              <div className="sub-history_status">
                <span>
                  {languageRedux === 1 ? home.approved : homeEn.approved}{' '}
                  {`${approved}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageRedux === 1 ? home.pending : homeEn.pending}{' '}
                  {`${pending}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageRedux === 1 ? home.waiting : homeEn.waiting}{' '}
                  {`${waiting}`}
                </span>
              </div>
              {/* <div className="sub-login_item">
                <KeyOutlined />
                <span>Đổi mật khẩu</span>
              </div> */}
              <div
                className="sub-login_item__translate"
                onClick={handleOpenRadioGroup}
                // style={{
                //   borderBottom: openRadioGroup
                //     ? 'none'
                //     : '1px solid rgba(170, 170, 170, 1)',
                // }}
                style={{ display: 'none' }}
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
              </div>

              <div
                className="sub-translate_status"
                style={{
                  height: openRadioGroup ? '100%' : '0',
                }}
              >
                <Radio.Group
                  name="radiogroup"
                  value={languageRedux}
                  defaultValue={languageId}
                  className="sub-login-radio-group"
                  onChange={handleChangeLanguage}
                  style={{
                    display: openRadioGroup ? 'flex' : 'none',
                  }}
                >
                  <Radio value={1}>
                    <VNSubLoginIcon />
                    <span>
                      {languageRedux === 1 ? 'Tiếng Việt' : 'Vietnamese'}
                    </span>
                  </Radio>
                  <Radio value={2}>
                    <ENSubLoginIcon />
                    <span>{languageRedux === 1 ? 'Tiếng Anh' : 'English'}</span>
                  </Radio>
                  {/* <Radio value={3}>
                    <ENSubLoginIcon />
                    <span>{languageRedux === 1 ? 'Tiếng Hàn' : 'Korean'}</span>
                  </Radio> */}
                </Radio.Group>
              </div>

              <div
                className="sub-login_item"
                onClick={handleLogout}
                style={{ borderBottom: 'none' }}
              >
                <LogoutSubLoginIcon />

                <span>{languageRedux === 1 ? 'Đăng xuất' : 'Log out'}</span>
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
          if (dataProfile && localStorage.getItem('refreshToken')) {
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
    <Badge key="3" count={countChat} className="box-right-responsive_badge">
      <Button
        key="3"
        className="btn-notice"
        name="btn-notice"
        onClick={() => {
          if (dataProfile && localStorage.getItem('accessToken')) {
            setOpenNotificate(!openNotificate);
          } else {
            setOpenModalLogin(true);
          }
        }}
      >
        <BellIcon />
      </Button>
    </Badge>,

    <div
      className="menu"
      // onClick={handleClickLogin}
      ref={refLogin}
      key="4"
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
                  src={dataProfile?.avatar ? dataProfile.avatar : null}
                />
                <div className="sub-login_detail">
                  <h2>{dataProfile?.name ? dataProfile.name : ''}</h2>
                  <span className="sub-login_text">
                    <CompanySubLoginIcon />
                    {companyName ? companyName : ''}
                  </span>
                  <span className="sub-login_text">
                    <MailInfoIcon />
                    {dataProfile?.email ? dataProfile?.email : ''}
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
                      {dataProfile?.locations.length > 0
                        ? dataProfile?.locations.map((location: any) => {
                            return `${location.district} , `;
                          })
                        : languageRedux === 1
                        ? 'Chưa cập nhật thông tin'
                        : 'The information has not been updated'}
                    </p>
                  </span>
                  <span
                    className="sub-login_text__bottom"
                    onClick={() => window.open(`/profile`, '_parent')}
                  >
                    <BagInfoJob />

                    <p>
                      {dataProfile?.categories.length > 0
                        ? dataProfile?.categories.map((profile: any) => {
                            return `${profile.parent_category} / ${profile.child_category}, `;
                          })
                        : languageRedux === 1
                        ? 'Chưa cập nhật thông tin'
                        : 'The information has not been updated'}
                    </p>
                  </span>
                </div>
              </div>
            </Space>
            <div className="sub-login_items">
              <Link to="/profile" target="_sel">
                <div className="sub-login_item">
                  <UserPersonSubLoginIcon />
                  <span>
                    {languageRedux === 1
                      ? 'Cập nhật thông tin'
                      : 'Update information'}
                  </span>
                </div>
              </Link>
              <Link to="/history" target="_sel">
                <div
                  className="sub-login_item"
                  style={{
                    borderBottom: 'none',
                  }}
                  // onClick={() => {
                  //   window.open('/history', "_top")
                  // }}
                >
                  <PaperSubLoginIcon />
                  <span>{languageRedux === 1 ? 'Lịch sử' : 'History'}</span>
                </div>
              </Link>
              <div className="sub-history_status">
                <span>
                  {languageRedux === 1 ? home.approved : homeEn.approved}{' '}
                  {`${approved}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageRedux === 1 ? home.pending : homeEn.pending}{' '}
                  {`${pending}`}
                </span>
                {/* <span>|</span> */}
                <span>
                  {languageRedux === 1 ? home.waiting : homeEn.waiting}{' '}
                  {`${waiting}`}
                </span>
              </div>
              {/* <div className="sub-login_item">
              <KeyOutlined />
              <span>Đổi mật khẩu</span>
            </div> */}
              <div
                className="sub-login_item__translate"
                onClick={handleOpenRadioGroup}
                // style={{
                //   borderBottom: openRadioGroup
                //     ? 'none'
                //     : '1px solid rgba(170, 170, 170, 1)',
                // }}
                style={{ display: 'none' }}
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
              </div>

              <div
                className="sub-translate_status"
                style={{
                  height: openRadioGroup ? '100%' : '0',
                }}
              >
                <Radio.Group
                  name="radiogroup"
                  value={languageRedux}
                  defaultValue={languageId}
                  className="sub-login-radio-group"
                  onChange={handleChangeLanguage}
                  style={{
                    display: openRadioGroup ? 'flex' : 'none',
                  }}
                >
                  <Radio value={1}>
                    <VNSubLoginIcon />
                    <span>
                      {languageRedux === 1 ? 'Tiếng Việt' : 'Vietnamese'}
                    </span>
                  </Radio>
                  <Radio value={2}>
                    <ENSubLoginIcon />
                    <span>{languageRedux === 1 ? 'Tiếng Anh' : 'English'}</span>
                  </Radio>
                  {/* <Radio value={3}>
                  <ENSubLoginIcon />
                  <span>{languageRedux === 1 ? 'Tiếng Hàn' : 'Korean'}</span>
                </Radio> */}
                </Radio.Group>
              </div>

              <div
                className="sub-login_item"
                onClick={handleLogout}
                style={{ borderBottom: 'none' }}
              >
                <LogoutSubLoginIcon />

                <span>{languageRedux === 1 ? 'Đăng xuất' : 'Log out'}</span>
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
        <Wrapper>
          <Left>
            <Logo />
          </Left>
          <Center className="div-nav-center">
            {/* <div>assssssssssssssssssssssssssssssss</div> */}
            <SearchInput
              checkSearch={checkSeacrh}
              value={valueSearchInput}
              setValue={setValueSearchInput}
              setOpenCollapseFilter={setOpenCollapseFilter}
              openCollapseFilter={openCollapseFilter}
              handleSearchIcon={handleSearch}
            />
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

            <Badge count={countChat} className="btn-badge">
              <Button
                className="btn-notice"
                name="btn-chat"
                onClick={() => {
                  if (dataProfile && localStorage.getItem('refreshToken')) {
                    window.open(`/message`, '_sel');
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
              <Button
                className="btn-notice"
                name="btn-notice"
                onClick={() => {
                  if (dataProfile && localStorage.getItem('accessToken')) {
                    setOpenNotificate(!openNotificate);
                  } else {
                    setOpenModalLogin(true);
                  }
                }}
                ref={bellRef}
              >
                <BellIcon />
              </Button>
              {openNotificate ? <Notificate /> : <></>}
            </div>
            <div
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
                  {/* <DownloadIcon /> */}

                  <img src="./images/down.gif" alt="" />
                </div>
                {/* <img src="images/gif/icons8-installing-updates.gif" alt="" /> */}
              </Button>
              <div className="sub-icon_qr">
                <h2>
                  {languageRedux === 1
                    ? 'Tải Ứng dụng HiJob!'
                    : 'Download the HiJob App!'}
                </h2>
                <img
                  src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/qr-code.jpg"
                  alt={languageRedux === 1 ? 'Ảnh lỗi' : 'Error photo'}
                />
                <div className="sub-icon_apps">
                  <Link
                    to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                    target="_seft"
                  >
                    <img
                      id="img-gallery"
                      src={require('../../img/langdingPage/image 43.png')}
                      alt={languageRedux === 1 ? 'Ảnh lỗi' : 'Error photo'}
                    />
                  </Link>
                  <Link
                    to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                    target="_seft"
                  >
                    <img
                      src={require('../../img/langdingPage/image 45.png')}
                      alt={languageRedux === 1 ? 'Ảnh lỗi' : 'Error photo'}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Center>
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
                [`@media (max-width: 426px)`]: {
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
                [`@media (max-width: 426px)`]: {
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
          sx={{ borderTop: '1px solid #ccc' }}
        >
          <SearchInput
            checkSearch={checkSeacrh}
            value={valueSearchInput}
            setValue={setValueSearchInput}
            setOpenCollapseFilter={setOpenCollapseFilter}
            openCollapseFilter={openCollapseFilter}
            handleSearchIcon={handleSearch}
          />
          <div className="filter-wraps">
            <div className="filter-wrap_top">
              <FilterLocationNav
                listDis={listDis}
                setListDis={setListDis}
                reset={reset}
                setReset={setReset}
              />
              <FilterCateloriesNav
                listCateProps={listCate}
                setListCate={setListCate}
                reset={reset}
                setReset={setReset}
              />
              <FilterTypeJob
                valueTypeJob={jobType}
                setTypeJob={setJobType}
                reset={reset}
                setReset={setReset}
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

          <div className="filter-wrap_respone">
            <FilterLocationNav
              listDis={listDis}
              setListDis={setListDis}
              reset={reset}
              setReset={setReset}
            />
            <FilterCateloriesNav
              listCateProps={listCate}
              setListCate={setListCate}
              reset={reset}
              setReset={setReset}
            />
            <FilterTypeJob
              valueTypeJob={jobType}
              setTypeJob={setJobType}
              reset={reset}
              setReset={setReset}
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

          <div className="btn-filter_nav">
            <Button type="default" onClick={handleResetValue}>
              {languageRedux === 1 ? 'Đặt Lại' : 'Reset'}
            </Button>
            <Button
              type="primary"
              onClick={(e) => handleSearch(e, valueSearchInput)}
            >
              {languageRedux === 1 ? 'Áp dụng' : 'Apply'}
            </Button>
          </div>
        </Collapse>
        {/* {openNotificate ? <Notificate /> : <></>} */}
        <PostButton setOpenModalLogin={setOpenModalLogin} />
      </Container>
    </div>
  );
};

export default React.memo(Navbar);
