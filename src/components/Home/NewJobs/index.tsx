import React, { useContext } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import { url } from 'inspector'
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { NewJobIcon, MoreICon } from '#components/Icons';

// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';
// import compornent

import ShowCancleSave from '../../ShowCancleSave';
import ShowNotificativeSave from '../../ShowNotificativeSave';
// import api
import postApi from 'api/postApi';

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider';

// import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';

import { useSearchParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { AxiosResponse } from 'axios';
// import icon
import languageApi from 'api/languageApi';

import { Space } from 'antd';

import './style.scss';
//@ts-ignore
// import { maxHeight } from '@mui/system';

// import ChildCateloriesArray from 'context/HomeValueContextProvider';

//import jobcard
import JobCard from '../JobCard';

import { Skeleton } from 'antd';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';

export interface PostNewest {
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

const NewJobs: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [page, setPage] = React.useState(1);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // const [isLoading, setIsLoading] = React.useState(false);
  const [isLogined, setIslogined] = React.useState(false);
  const [isAppliedPostedJobs, setIsAppliedPostedJobs] = React.useState(false);

  // const [showNofySave, setShowNofySave] = React.useState(false);

  // const navigate = useNavigate();

  // state redux
  const postNewest = useSelector((state: RootState) => state.postNewest);

  const dispatch = useDispatch();
  const { setPostNewest, setPostNewestMore } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  // const [checkBookMark, setCheckBookMark] = React.useState(true);

  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setLanguage(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi();
  }, [languageRedux]);

  const {
    // setChildCateloriesArray,
    childCateloriesArray,
  }: {
    // setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>;
    childCateloriesArray: number[];
  } = useContext(HomeValueContext);

  // handle click post details
  // const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
  //   window.open(`/post-detail?post-id=${id}`, '_parent');
  // };

  // handle change paginaton
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    // listRef.current?.scrollIntoView();
    setOpenBackdrop(!openBackdrop);
    const categoryId = searchParams.get(`categories-id`)
      ? searchParams.get(`categories-id`)
      : null;
    const thersholdId =
      postNewest.data.posts[postNewest.data.posts.length - 1].id;

    const result = await postApi.getPostNewest(
      Number(categoryId),
      childCateloriesArray,
      null,
      9,
      thersholdId,
      languageRedux === 1 ? 'vi' : 'en',
    );

    if (result) {
      setPostNewestMore(result);
      setOpenBackdrop(false);
    }
  };
  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  const getPostNewest = async () => {
    function getCookie(name: string): string | null {
      let nameEQ = name + '=';
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    }

    try {
      setOpenBackdrop(true);
      const result = await postApi.getPostNewest(
        Number(
          JSON.parse(getCookie('userSelected') || '').userSelectedId as any,
        ) !== 1
          ? Number(
              JSON.parse(getCookie('userSelected') || '').userSelectedId as any,
            )
          : null || null,
        childCateloriesArray || null,
        null,
        19,
        null,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setPostNewest(result);

        // set loading
        setOpenBackdrop(false);
      }
    } catch (error) {
      setOpenBackdrop(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    localStorage.getItem('accessToken') && setIslogined(true);
    getPostNewest();
    // delete param when back to page
    // searchParams.delete("theme-id")
    // setSearchParams(searchParams)
    setLoading(true);
    setTimeout(() => {
      const AppliedPostedJobs = localStorage.getItem('numberAppliedPostedJobs');
      Number(AppliedPostedJobs) > 0 && setIsAppliedPostedJobs(true);
      if (postNewest.data) {
        setLoading(false);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  return (
    <>
      {
        // automatic && (
        <Box
          sx={{
            flexGrow: 1,
            // marginTop: isLogined && isAppliedPostedJobs ? '0' : '15rem',
            ['--mrTopRes']: isLogined && isAppliedPostedJobs ? '0' : '250px',
          }}
          className="new-job"
          ref={listRef}
          id="new-job"
        >
          <div style={{ display: 'flex', gap: '0.5rem', margin: '0 0 16px 0' }}>
            <NewJobIcon width={25} height={25} />
            <h2>{language?.newest_jobs}</h2>
          </div>

          <Grid container spacing={3} columns={{ xs: 12, sm: 4, md: 12 }}>
            {postNewest.data.posts.map((item: PostNewest, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Skeleton loading={loading} active>
                  <JobCard item={item} />
                </Skeleton>
              </Grid>
            ))}
          </Grid>
          <Stack
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}
          >
            {/* <Pagination count={10} shape="rounded" /> */}
            <Space
              className="div-hover-more"
              onClick={(e) => {
                handleChange(e, page);
              }}
            >
              <p>{language?.more}</p>
              <MoreICon width={20} height={20} />
            </Space>
          </Stack>
          <Backdrop
            sx={{
              color: '#0d99ff ',
              backgroundColor: 'transparent',
              // boxShadow: 'none',
              zIndex: (theme: any) => theme.zIndex.drawer + 1,
            }}
            open={openBackdrop}
            //  onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <ShowNotificativeSave
          // setShowNofySave={setShowNofySave}
          // showNofySave={showNofySave}
          />

          <ShowCancleSave />
        </Box>
        // )
      }
    </>
  );
};
export default NewJobs;
