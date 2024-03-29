import React, { useEffect } from 'react';
// import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import CardActions from '@mui/material/CardActions';
// import ImageListItem from '@mui/material/ImageListItem';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import { url } from 'inspector'
// import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
import { AxiosResponse } from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  TopicJobIcon,
  MoreICon,
  QuestionMarkIcon,
  ArrowrightIcon,
} from '#components/Icons';

// @ts-ignore
// import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';

// import { useNavigate } from 'react-router-dom';
// import { MouseEvent, MouseEventHandler } from 'react';

// @ts-ignore
import { useSearchParams } from 'react-router-dom';
// import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// import TurnedInIcon from '@mui/icons-material/TurnedIn';

// import component
import ListCompanyCarousel from '../ListCompanyCarousel';

// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';

import postApi from 'api/postApi';
import themeApi from '../../../api/themesApi';
// import bookMarkApi from 'api/bookMarkApi';

import './style.scss';

// import icon

import { Space } from 'antd';
// interface item post themes

//import jobcard
import JobCard from '../JobCard';
import { Skeleton } from 'antd';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';
import { getCookie } from 'cookies';

interface PostTheme {
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

const ThemesJob: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [page, setPage] = React.useState(1);
  const [automatic, setAutomatic] = React.useState<Boolean>(false);
  const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [loadingCarousel, setLoadingCarousel] = React.useState(true);
  const [loadingThemeList, setLoadingThemeList] = React.useState(true);
  const [loading, setLoadingT] = React.useState(false);

  const [endData, setEndData] = React.useState(0);
  // state redux
  const post = useSelector((state: RootState) => state.post);

  const dispatch = useDispatch();
  const { setPostByTheme, setPostThemeMore } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const themeId = searchParams.get(`theme-id`)
    ? searchParams.get(`theme-id`)
    : listTheme?.data[0]?.id;

  // const handleChange = async (
  //   event: React.ChangeEvent<unknown>,
  //   value: number,
  // ) => {
  //   setPage(value);
  //   setOpenBackdrop(!openBackdrop);
  //   // const test = [1, 2]
  //   // const p = createSearchParams({ page: `${test}`})
  //   // navigate(`/?${p}`);
  //   // console.log(searchParams.get(`page`))
  //   const themeId = searchParams.get(`theme-id`)
  //     ? searchParams.get(`theme-id`)
  //     : listTheme?.data[0].id;

  //   const threshold = post.data.posts[post.data.posts.length - 1].id;
  //   const result = await postApi.getPostByThemeId(
  //     Number(themeId),
  //     9,
  //     threshold,
  //      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //   );

  //   if (result) {
  //     if (result.data.posts.length === 0) {
  //       setEndData(result.data.posts.length);
  //     }
  //     setPostThemeMore(result);

  //     setOpenBackdrop(false);
  //   }
  // };

  // handle click post details
  // const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
  //   window.open(`/post-detail?post-id=${id}`, '_parent');
  // };

  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  // get post by theme id
  const getPostByThemeId = async () => {
    try {
      let storedSettings = JSON.parse(getCookie('hotPlaceId') || '{}');
      setLoadingCarousel(true);
      const result = await themeApi.getThemesEnable(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        setLoadingCarousel(false);
        setListThem(result);
        setLoadingThemeList(true);
        const list = await postApi?.getPostByThemeId(
          storedSettings?.placeId
            ? storedSettings?.placeId
            : result?.data[0]?.id,
          9,
          0,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (list) {
          setPostByTheme(list);
          setAutomatic(true);
          setLoadingThemeList(false);
        }
      }
    } catch (error) {
      setAutomatic(true);
      console.log(error);
    }
  };
  React.useEffect(() => {
    getPostByThemeId();

    // delete param when back to page
    searchParams.delete('theme-id');
    searchParams.delete('categories-id');
    setSearchParams(searchParams);
    // setLoading(true);
    // setTimeout(() => {
    //   if (listTheme) {
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //   }
    // }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  // React.useEffect(() => {
  //   console.log("vap")
  //   getPostByThemeId()
  //   // delete param when back to page
  //   // searchParams.delete("theme-id")
  //   // setSearchParams(searchParams)

  // }, [localStorage.getItem("accessToken")])

  const handleMoveToMoreJob = () => {
    localStorage.setItem('job-type', 'place');
    window.open('/more-jobs', '_parent');
  };

  const handleClickHelpSearch = () => {};
  return (
    <Box
      sx={{ flexGrow: 1, paddingBottom: '24px' }}
      className="theme-job"
      id="job-by-hot-place"
    >
      <div className="title-container">
        <div className="title">
          <TopicJobIcon width={25} height={25} />
          <h2 className="title_home">
            {languageRedux === 1
              ? 'Công việc theo chủ đề'
              : languageRedux === 2
              ? 'Job by hot places'
              : languageRedux === 3
              ? '핫플레이스별작업'
              : 'Công việc theo chủ đề'}
          </h2>
          <div className="help-search" onClick={handleClickHelpSearch}>
            <QuestionMarkIcon />
            <div className={`login__hover__container `}>
              <div className="login__hover">
                <div className="login__hover__p">
                  <p>
                    {languageRedux === 1
                      ? 'Mục này sẽ gợi ý cho bạn việc làm gần các địa điểm nổi tiếng trong thành phố của bạn.'
                      : languageRedux === 2
                      ? 'This section will suggest you some jobs near hot places in your city.'
                      : '이 섹션에서는 귀하의 도시에서 유명한 장소 근처의 일자리를 제안합니다.'}
                  </p>
                </div>
                {/* <Button
            type="primary"
            onClick={() => {
              setOpenModalLogin(true);
            }}
          >
            <LoginArrowBlackIcon />
               {languageRedux === 1
                ? 'Đăng nhập ngay'
                : languageRedux === 2
                  ? 'Sign in'
                  : languageRedux === 3 && '로그인'}
          </Button> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="view-all" onClick={handleMoveToMoreJob}>
          <p> {
              languageRedux === 1 ?
                "Xem tất cả" :
                languageRedux === 2 ?
                  "View all" :
                  languageRedux === 3 &&
                  "모두보기"
            }</p>
          <ArrowrightIcon width={20} height={20} />
        </div> */}
      </div>

      {!localStorage.getItem('accessToken') ? (
        <div className="title-location-job">
          {/* <h3>{language?.home_page?.ideal_job_location}</h3> */}
          {/* <p>{language?.home_page?.search_in_famous_locations_in_your_city}</p> */}
          <p>
            {languageRedux === 1
              ? 'Tìm kiếm việc làm tại các địa điểm nổi tiếng trong thành phố của bạn.'
              : languageRedux === 2
              ? 'Search for jobs in famous locations in your city.'
              : '귀하의 도시 내 인기 있는 장소에서 일자리를 검색해 보세요.'}
          </p>
        </div>
      ) : (
        <></>
      )}
      <Skeleton loading={loadingCarousel} active>
        <ListCompanyCarousel listTheme={listTheme} />
      </Skeleton>

      <Skeleton loading={loadingThemeList} active>
        <>
          {automatic && (
            <>
              <Grid container spacing={3} columns={{ xs: 12, sm: 4, md: 12 }}>
                {post?.data.posts.map((item: PostTheme, index: number) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <JobCard item={item} />
                  </Grid>
                ))}
              </Grid>
              {/* {!post.data.is_over ? (
                <Stack
                  spacing={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '24px 0',
                    marginBottom: '24px',
                  }}
                >
                  <Space
                    className="div-hover-more"
                    onClick={(e) => {
                      handleChange(e, page);
                    }}
                  >
                    <p>{languageRedux === 1 ? 'Xem thêm' : 'More'}</p>
                    <MoreICon width={20} height={20} />
                  </Space>
                </Stack>
              ) : (
                <></>
              )} */}
              <Backdrop
                sx={{
                  color: '#0d99ff ',
                  backgroundColor: 'transparent',
                  zIndex: (theme: any) => theme.zIndex.drawer + 1,
                }}
                open={openBackdrop}
                //   onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </>
          )}
        </>
        <div
          className="view-all-down"
          onClick={handleMoveToMoreJob}
          style={{
            display:
              !post || post.length === 0 || post.length < 10 ? 'none' : 'flex',
          }}
        >
          <p>
            {' '}
            {languageRedux === 1
              ? 'Xem tất cả'
              : languageRedux === 2
              ? 'View all'
              : languageRedux === 3 && '모두보기'}
          </p>
          <ArrowrightIcon width={20} height={20} />
        </div>
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
      <Skeleton loading={loading} active>
        {loading ? <br /> : <></>}
      </Skeleton>
    </Box>
  );
};

export default ThemesJob;
