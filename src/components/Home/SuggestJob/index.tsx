import React, { useEffect } from 'react';
// import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
// import { url } from 'inspector'
// import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
// import { AxiosResponse } from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MoreICon, SuggestIcon, LoginArrowIcon } from '#components/Icons';

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
// import ListCompanyCarousel from '../ListCompanyCarousel';

// import redux
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';

import { Button } from 'antd';

// import postApi from 'api/postApi';
import nearByApi from 'api/apiNearBy';
// import bookMarkApi from 'api/bookMarkApi';

import './style.scss';

// import icon

import { Space } from 'antd';
// interface item post themes

//import jobcard
import JobCard from '../JobCard';
import ModalLogin from '../../../components/Home/ModalLogin';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';

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
  // const [page, setPage] = React.useState(1);
  const [automatic, setAutomatic] = React.useState<Boolean>(false);
  // const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);

  const [nearJob, setNearJob] = React.useState<any>([]);

  // state redux
  // const { post } = useSelector((state: RootState) => state);
  // const dispatch = useDispatch();
  // const { setPostByTheme, setPostThemeMore } = bindActionCreators(
  //   actionCreators,
  //   dispatch,
  // );

  const handleChange = async () => {
    // setPage(value);
    setOpenBackdrop(!openBackdrop);
    // const test = [1, 2]
    // const p = createSearchParams({ page: `${test}`})
    // navigate(`/?${p}`);
    // console.log(searchParams.get(`page`))
    // const themeId = searchParams.get(`theme-id`)
    //   ? searchParams.get(`theme-id`)
    //   : listTheme?.data[0].id;

    const threshold = nearJob[nearJob.length - 1]?.id;

    const result = await nearByApi.getNearByJob(
      userProfile?.address?.id,
      11,
      threshold,
      languageRedux === 1 ? 'vi' : 'en',
    );
    // const result = await postApi.getPostByThemeId(
    //   Number(themeId),
    //   9,
    //   threshold,
    // );

    if (result) {
      // setPostThemeMore(result);
      setNearJob([...nearJob, ...result.data.posts]);

      setOpenBackdrop(false);
    }
  };

  // handle click post details
  // const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
  //   window.open(`/post-detail?post-id=${id}`, '_parent');
  // };

  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  const userProfile = useSelector((state: RootState) => state.profile.profile);

  // get post by theme id
  const getPostByThemeId = async () => {
    try {
      const result = await nearByApi.getNearByJob(
        userProfile?.address?.id,
        11,
        null,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        // (result);

        // const list = await postApi.getPostByThemeId(
        //   result.data[0].id,
        //   19,
        //   null,
        // );
        // if (list) {
        //   setPostByTheme(list);
        setAutomatic(true);
        // }
        setNearJob(result.data.posts);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, languageRedux]);

  const listSuggestJob = () => {
    try {
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    listSuggestJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // React.useEffect(() => {
  //   console.log("vap")
  //   getPostByThemeId()
  //   // delete param when back to page
  //   // searchParams.delete("theme-id")
  //   // setSearchParams(searchParams)

  // }, [localStorage.getItem("accessToken")])

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', margin: '5px 0' }}>
        <SuggestIcon width={25} height={25} />
        <h2>
          {languageRedux === 1
            ? home.suggested_jobs_in_your_city
            : homeEn.suggested_jobs_in_your_city}
        </h2>
      </div>

      <>
        {automatic && (
          <>
            <Grid
              container
              spacing={3}
              columns={{ xs: 12, sm: 4, md: 12 }}
              sx={{ marginTop: '-8px' }}
            >
              {nearJob.map((item: PostTheme, index: number) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                  <JobCard item={item} />
                </Grid>
              ))}
            </Grid>
            <Stack
              spacing={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '24px 0',
                marginBottom: '50px',
              }}
            >
              {/* <Pagination count={10} shape="rounded" /> */}
              {/* Test page: {page} */}
              {/* <Pagination
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={handleChange}
                /> */}
              <Space
                className="div-hover-more-suggest-job"
                style={{ width: '100%' }}
              >
                {localStorage.getItem('accessToken') ? (
                  <div className="more-job">
                    <p onClick={handleChange}>
                      {languageRedux === 1 ? home.more : homeEn.more}
                    </p>
                    <MoreICon width={20} height={20} />
                  </div>
                ) : (
                  <div className="suggest-job-not-loging">
                    <div className="suggest-job-not-loging_left">
                      <h3>
                        {languageRedux === 1
                          ? 'Hijob gợi ý công việc cho bạn'
                          : 'Hijob suggests a job for you'}
                      </h3>
                      <p>
                        {languageRedux === 1
                          ? 'Nhanh chóng tìm được việc làm phù hợp với nhu cầu của bạn.'
                          : 'Quickly find a job that fits your needs.'}
                      </p>
                    </div>
                    <div className="suggest-job-not-loging_right">
                      <Button
                        type="primary"
                        onClick={() => {
                          setOpenModalLogin(true);
                        }}
                      >
                        <LoginArrowIcon />
                        {languageRedux === 1 ? home.sign_in : homeEn.sign_in}
                      </Button>
                    </div>
                  </div>
                )}
              </Space>
            </Stack>
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
            <ModalLogin
              openModalLogin={openModalLogin}
              setOpenModalLogin={setOpenModalLogin}
            />
          </>
        )}
      </>
    </Box>
  );
};

export default ThemesJob;
