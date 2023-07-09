import React, { useEffect, useState, useContext } from 'react';
// @ts-ignore
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import ModalLogin from '../../components/Home/ModalLogin';

// @ts-ignore
import { Logo } from '#components';
// @ts-ignore
import { ChatIcon, BellIcon, SearchIcon } from '#components';

import { FlagVNIcon } from '#components/Icons';
// @ts-ignore
// import { ModalFilter } from '#components'

// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'

import { Collapse } from '@mui/material';
// import styled from '@emotion/styled'
import './style.scss';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// import icon
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

import {
  FormOutlined,
  UserOutlined,
  RightOutlined,
  MenuOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  KeyOutlined,
  LoadingOutlined,
  CloseOutlined,
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

import { Avatar, Button, Space, Spin, Badge } from 'antd';

import authApi from 'api/authApi';
import profileApi from 'api/profileApi';
import messageApi from 'api/messageApi';

import {
  Container,
  Wrapper,
  // SearchContainer,
  Left,
  Right,
  Center,
  collapseCssFilter,
} from './Css';

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';

import { RootState } from '../../store/reducer';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';

// import Context
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { ChatContext } from 'context/ChatContextProvider';
import { DivRef1 } from 'context/HomeValueContextProvider';
import { useSearchParams } from 'react-router-dom';

// import redux

const Navbar: React.FC = () => {
  const {
    openCollapseFilter,
    setOpenCollapseFilter,
    // setHeightNavbar,
    SetRefNav,
    setOpenNotificate,
    openNotificate,
  }: // setRefNav,
  {
    openCollapseFilter: boolean;
    setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>;
    // heightNavbar: number
    // setHeightNavbar: React.Dispatch<React.SetStateAction<number>>
    SetRefNav: React.Dispatch<React.SetStateAction<DivRef1>>;
    setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
    openNotificate: boolean;
  } = useContext(HomeValueContext);

  const {
    receivedMessages,
    sendMessages,
    setReceivedMessages,
    // setSendMessages,
  } = useContext(ChatContext);

  const [showTap, setShowTap] = React.useState(false);

  // const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openInfoUser, setOpenInfoUser] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);

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
  // const [timeJob, setTimeJob] = useState()
  // const [dateBegin, setDateBegin] = useState()
  // const [dateEnd, setDateEnd] = useState()
  const [isRemotely, setIsRemotely] = useState<number>(0);
  const [isWorkingWeekend, setIsWorkingWeekend] = useState<number>(0);

  const [countChat, setCountChat] = useState<number>(0);

  // use Redux manage state

  // value query

  const QUERY = searchParams.get('q');
  const SALARY_TYPE = Number(searchParams.get('sal-type'));
  const JOB_TYPE = Number(searchParams.get('job-type'));
  const DIS_IDS = searchParams
    .getAll('dis-ids')
    .map((disId) => disId.split(','));
  // .map((dis) => dis[1])
  const CATE_IDS = searchParams
    .getAll('categories-ids')
    .map((disId) => disId.split(','));
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
  // handle show tap on screen mobile
  const handleTap = () => {
    setShowTap(!showTap);
  };

  //  MOdalFilter
  // const [openModalFilter, setOpenModalFilter] = React.useState(false)

  // const handleClickInput = () => {
  //   setOpenCollapse(!openCollapse)
  // }

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  // fecth data profile with accesstoken
  const fecthDataProfileUser = async () => {
    try {
      await dispatch(getProfile() as any);

      const result = await profileApi.getProfile();
      if (result) {
        dispatch(getProfile() as any);
      }
    } catch (error) {
      setOpenBackdrop(false);
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
  }, []);

  // get count unread
  const getCountUnread = async () => {
    try {
      const result = await messageApi.getUnread();
      if (result) {
        setCountChat(result.data.quantity);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getCountUnread();
  }, [
    receivedMessages,
    sendMessages,
    setReceivedMessages,
    setReceivedMessages,
  ]);

  console.log(receivedMessages, sendMessages);

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
  const handleSearch = (event: any, valueSearchInput: string | undefined) => {
    event.preventDefault();
    var encode: any;
    var job_type = jobType;
    var money_type = typeMoney;
    var salary_type = salaryType;
    var salary_min = salaryMin;
    var salary_max = salaryMax;
    var list_dis = listDis;
    var list_cate = listCate;
    var is_working_weekend = isWorkingWeekend;
    var is_remotely = isRemotely;

    if (list_dis.length > 0) {
      list_dis.forEach((item) => {
        params.append(`dis-ids`, `${item}`);
      });
    } else if (list_dis.length === 0 && DIS_IDS.length > 0) {
      [].forEach((item) => {
        params.append(`dis-ids`, `${item}`);
      });
    } else if (dataProfile.id && DIS_IDS.length === 0) {
      dataProfile.locations.forEach((item: any) => {
        params.append(`dis-ids`, `${[item.province_id, item.district_id]}`);
      });
    }
    // lấy từ profile qua
    if (list_cate.length > 0) {
      list_cate.forEach((item, index) => {
        paramsCate.append(`categories-ids`, `${item}`);
      });
    } else if (list_cate.length === 0 && CATE_IDS.length > 0) {
      [].forEach((item) => {
        paramsCate.append(`categories-ids`, `${item}`);
      });
    } else if (dataProfile.id && CATE_IDS.length === 0) {
      dataProfile.categories.forEach((item: any) => {
        paramsCate.append(
          `categories-ids`,
          `${[item.parent_category_id, item.child_category_id]}`,
        );
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
    if (!jobType && JOB_TYPE) {
      job_type = JOB_TYPE;
    }

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

    if (!salaryType && SALARY_TYPE) {
      salary_type = SALARY_TYPE;
    }

    setTimeout(() => {
      window.open(
        `/search-results?${encode !== 'undefined' ? `q=${encode}` : ``}` +
          `${salary_type ? `&sal-type=${salary_type}` : ''}` +
          `${job_type ? `&job-type=${job_type}` : ''}` +
          `${params.toString() !== '' ? `&${params.toString()}` : ''}` +
          `${
            list_cate.length > 0
              ? `&${paramsCate.toString()}`
              : `&${paramsCate.toString()}`
          }` +
          `${salary_min ? `&salary_min=${salary_min}` : ''}` +
          `${salary_max ? `&salary_max=${salary_max}` : ''}` +
          `${
            is_working_weekend
              ? `&is_working_weekend=${is_working_weekend}`
              : ''
          }` +
          `${is_remotely ? `&is_remotely=${is_remotely}` : ''}` +
          `${money_type ? `&money_type=${money_type}` : ''}`,
        '_self',
      );
    }, 1);
  };

  // login
  const handleClickLogin = async (e: any) => {
    // e.stopPropagation();
    try {
      if (openInfoUser) {
        setSpinning(false);
        setOpenInfoUser(!openInfoUser);
      } else {
        setSpinning(true);
      }
      var result = null;
      if (localStorage.getItem('accessToken')) {
        result = await profileApi.getProfile();
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
      console.log(error);
      // if (!localStorage.getItem("accessToken")) {
      //   setSpinning(false)
      //   setOpenInfoUser(false)
      //   setOpenModalLogin(true)
      // } else {
      //   setSpinning(false)
      //   setOpenInfoUser(!openInfoUser)
      // }
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
  }, []);

  // handle logout
  const handleLogout = async () => {
    try {
      console.log('logout thành công');
      const refreshToken = localStorage.getItem('refreshToken');
      console.log('refreshToken', refreshToken);

      if (refreshToken) {
        const result = await authApi.signOut(refreshToken);
        console.log('result', result);

        if (result) {
          window.location.replace('/home');
          localStorage.clear();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetValue = () => {
    setJobType(null);
    setListDis([]);
    setListCate([]);
    setSalaryMax(null);
    setSalaryMin(null);
    setTypeMoney(1);
    setSalaryType('');

    setIsWorkingWeekend(0);
    setIsRemotely(0);
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
  }, [openCollapseFilter]);

  const buttons = [
    <button
      key="1"
      className="btn btn__post"
      onClick={() => {
        if (dataProfile && localStorage.getItem('refreshToken')) {
          window.open('/post', '_blank');
        } else {
          setOpenModalLogin(true);
        }
      }}
    >
      <FormOutlined style={{ color: 'white' }} />
      <p style={{ marginLeft: 10, color: 'white' }}>Đăng bài</p>
    </button>,
    <div
      className="actions-login"
      onClick={handleClickLogin}
      ref={refLogin}
      key="2"
    >
      <button className="btn btn__login">
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
              <span>Đăng nhập</span>
            )}
          </div>
        </div>
        <div className="login__icon">
          <RightOutlined />
        </div>
      </button>
      <Spin indicator={antIcon} spinning={spinning}>
        {openInfoUser && (
          <div className="sub-login" ref={refInfoUser}>
            <Space className="sub-login_info">
              <Avatar
                style={{ backgroundColor: '#0D99FF' }}
                icon={<UserOutlined style={{ fontSize: 30 }} />}
                size={50}
                src={dataProfile?.avatar ? dataProfile.avatar : null}
              />
              <div>
                <h2>{dataProfile?.name ? dataProfile.name : ''}</h2>
                <span>{dataProfile?.email ? dataProfile?.email : ''}</span>
              </div>
            </Space>
            <div className="sub-login_items">
              <Link to="/profile">
                <div className="sub-login_item">
                  <SyncOutlined />
                  <span>Cập nhật thông tin</span>
                </div>
              </Link>
              <Link to="/history">
                <div
                  className="sub-login_item"
                  // onClick={() => {
                  //   window.open('/history', "_top")
                  // }}
                >
                  <ClockCircleOutlined />
                  <span>Lịch sử</span>
                </div>
              </Link>
              {/* <div className="sub-login_item">
                <KeyOutlined />
                <span>Đổi mật khẩu</span>
              </div> */}
              <div className="sub-login_item" onClick={handleLogout}>
                <LogoutOutlined />
                <span>Đăng xuất</span>
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
      <TuneOutlinedIcon />
    </Button>,

    <Badge key="2" count={countChat} className="box-right-responsive_badge">
      <Button
        onClick={() => {
          if (dataProfile && localStorage.getItem('refreshToken')) {
            window.open(`/message`, '_blank');
          } else {
            setOpenModalLogin(true);
          }
        }}
        type="link"
      >
        <ChatIcon />
      </Button>
    </Badge>,

    <Button
      key="3"
      className="btn-notice"
      onClick={() => setOpenNotificate(!openNotificate)}
    >
      <BellIcon />
    </Button>,

    <div className="menu" onClick={handleClickLogin} ref={refLogin} key="4">
      <Button className="menu-button">
        <MenuOutlined style={{ fontSize: '1.5em' }} />
      </Button>
      <Spin indicator={antIcon} spinning={spinning}>
        {openInfoUser && (
          <div className="sub-login" ref={refInfoUser}>
            <Space className="sub-login_info">
              <Avatar
                style={{ backgroundColor: '#0D99FF' }}
                icon={<UserOutlined style={{ fontSize: 30 }} />}
                size={50}
                src={dataProfile?.avatar ? dataProfile.avatar : null}
              />
              <div>
                <h2>{dataProfile?.name ? dataProfile.name : ''}</h2>
                <span>{dataProfile?.email ? dataProfile?.email : ''}</span>
              </div>
            </Space>
            <div className="sub-login_items">
              <Link to="/profile">
                <div className="sub-login_item">
                  <SyncOutlined />
                  <span>Cập nhật thông tin</span>
                </div>
              </Link>
              <Link to="/history">
                <div
                  className="sub-login_item"
                  // onClick={() => {
                  //   window.open('/history', "_top")
                  // }}
                >
                  <ClockCircleOutlined />
                  <span>Lịch sử</span>
                </div>
              </Link>
              {/* <div className="sub-login_item">
                <KeyOutlined />
                <span>Đổi mật khẩu</span>
              </div> */}
              <div className="sub-login_item" onClick={handleLogout}>
                <LogoutOutlined />
                <span>Đăng xuất</span>
              </div>
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
        <Backdrop
          sx={{
            color: '#0d99ff ',
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={openBackdrop}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Wrapper>
          <Left>
            <Logo />
          </Left>
          <Center className="div-nav-center">
            {/* <div>assssssssssssssssssssssssssssssss</div> */}
            <SearchInput
              value={valueSearchInput}
              setValue={setValueSearchInput}
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
              <TuneOutlinedIcon />
            </Button>

            <Badge count={countChat} className="btn-badge">
              <Button
                onClick={() => {
                  if (dataProfile && localStorage.getItem('refreshToken')) {
                    window.open(`/message`, '_blank');
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

            <Button
              className="btn-notice"
              onClick={() => setOpenNotificate(!openNotificate)}
              ref={bellRef}
            >
              <BellIcon />
            </Button>
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
          </Right>
        </Wrapper>
        <Collapse
          in={openCollapseFilter}
          // timeout={600}
          // unmountOnExit
          onEnter={handleCollapseEntered}
          onExited={handleCollapseExited}
          sx={collapseCssFilter}
        >
          <SearchInput
            value={valueSearchInput}
            setValue={setValueSearchInput}
          />
          <div className="filter-wrap_top">
            <FilterLocationNav setListDis={setListDis} />
            <FilterCateloriesNav setListCate={setListCate} />
            <FilterTypeJob valueTypeJob={jobType} setTypeJob={setJobType} />
          </div>
          <div className="filter-wrap_bottom">
            <FilterTypeSalary setSalaryType={setSalaryType} />
            <FilterSalary
              salaryType={salaryType}
              typeMoney={typeMoney}
              setTypeMoney={setTypeMoney}
              salaryMin={salaryMin}
              salaryMax={salaryMax}
              setSalaryMin={setSalaryMin}
              setSalaryMax={setSalaryMax}
            />
            <FilterTimeJob
              setIsWorkingWeekend={setIsWorkingWeekend}
              isWorkingWeekend={isWorkingWeekend}
              isRemotely={isRemotely}
              setIsRemotely={setIsRemotely}
            />
          </div>

          <div className="filter-wrap_respone">
            <FilterLocationNav setListDis={setListDis} />
            <FilterCateloriesNav setListCate={setListCate} />
            <FilterTypeJob valueTypeJob={jobType} setTypeJob={setJobType} />
            <FilterTypeSalary setSalaryType={setSalaryType} />
            <div className="filter-wrap-respone_bottom">
              <FilterSalary
                salaryType={salaryType}
                typeMoney={typeMoney}
                setTypeMoney={setTypeMoney}
                salaryMin={salaryMin}
                salaryMax={salaryMax}
                setSalaryMin={setSalaryMin}
                setSalaryMax={setSalaryMax}
              />
              <FilterTimeJob
                setIsWorkingWeekend={setIsWorkingWeekend}
                isWorkingWeekend={isWorkingWeekend}
                isRemotely={isRemotely}
                setIsRemotely={setIsRemotely}
              />
            </div>
          </div>

          <div className="btn-filter_nav">
            {/* <Button type="default" onClick={handleResetValue}>
              Đặt Lại
            </Button> */}
            <Button
              type="primary"
              onClick={(e) => handleSearch(e, valueSearchInput)}
            >
              Áp dụng
            </Button>
          </div>
        </Collapse>
        {openNotificate ? <Notificate /> : <></>}
        <PostButton setOpenModalLogin={setOpenModalLogin} />
      </Container>
    </div>
  );
};

export default React.memo(Navbar);
