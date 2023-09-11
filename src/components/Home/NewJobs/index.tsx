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

import { Space } from 'antd';

import './style.scss';
//@ts-ignore
// import { maxHeight } from '@mui/system';

// import ChildCateloriesArray from 'context/HomeValueContextProvider';

// import { setPostNewestMoreV3, setPostNewestv3 } from 'store/actions';
import {
  setPostNewestApiV3,
  setPostNewestMoreApiV3,
} from 'store/reducer/postReducerV3/newWestReducer';

//import jobcard
import JobCard from '../JobCard';
import JobCardV3 from '../JobCardV3';

import { QuestionMarkIcon } from '#components/Icons';

import { Skeleton } from 'antd';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';
import { getCookie } from 'cookies';

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

export interface PostNewestV3 {
  accountId: number;
  address: string;
  bookmarked: boolean;
  companyName: string;
  companyResourceData: {
    logo: string;
  };
  createdAtText: string;
  id: number;
  image: string;
  jobType: {
    id: number;
    name: string;
  };
  location: {
    district: {
      id: string;
      fullName: string;
    };

    province: {
      fullName: string;
      id: string;
    };
    ward: {
      id: string;
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

interface UserSelected {
  userSelectedId: any;
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
  const postNewestV3: any = useSelector((state: RootState) => {
    // console.log('state', state);
    return state.newWestReducerV3;
  });

  const dispatch = useDispatch();
  const { setPostNewest, setPostNewestMore } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const [loading, setLoading] = React.useState(false);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

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
    const thersholdId = postNewestV3.data[postNewestV3.data.length - 1]?.id;

    // const result = await postApi.getPostNewest(
    //   Number(categoryId),
    //   childCateloriesArray,
    //   null,
    //   9,
    //   thersholdId,
    //   languageRedux === 1 ? 'vi' : 'en',
    // );

    const result2 = await postApi.getPostNewestV3(
      childCateloriesArray,
      Number(categoryId),
      null,
      null,
      10,
      thersholdId,
      languageRedux === 1 ? 'vi' : 'en',
    );

    if (result2) {
      // setPostNewestMore(result);
      dispatch(setPostNewestMoreApiV3(result2));
      setOpenBackdrop(false);
    }
  };
  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  const getPostNewest = async () => {
    try {
      setOpenBackdrop(true);
      // const result = await postApi.getPostNewest(
      //   Number(
      //     JSON.parse(getCookie('userSelected') || '').userSelectedId as any,
      //   ) !== 1
      //     ? Number(
      //         JSON.parse(getCookie('userSelected') || '').userSelectedId as any,
      //       )
      //     : null || null,
      //   childCateloriesArray || null,
      //   null,
      //   20,
      //   null,
      //   languageRedux === 1 ? 'vi' : 'en',
      // );
      // console.log('childCateloriesArray', childCateloriesArray);

      let userSelected = JSON.parse(
        getCookie('userSelected') || '{}',
      ) as UserSelected;

      // console.log('storeduserSelectedSettings', userSelected.userSelectedId);

      const result2 = await postApi.getPostNewestV3(
        childCateloriesArray,
        userSelected.userSelectedId,
        null,
        null,
        20,
        null,
        languageRedux === 1 ? 'vi' : 'en',
      );

      // console.log('result2222222222222222', result2.data);
      // console.log('result111111111111', result.data);

      if (result2) {
        dispatch(setPostNewestApiV3(result2));
        setOpenBackdrop(false);
      }

      // if (result2) {
      // setPostNewest(result);

      // set loading
      // }
    } catch (error) {
      setOpenBackdrop(false);
      console.log(error);
      console.log('loiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', error);
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

  const handleClickHelpSearch = () => { };

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
            <div className="help-search" onClick={handleClickHelpSearch}>
              <QuestionMarkIcon />
              <div className={`login__hover__container `}>
                <div className="login__hover">
                  <div className="login__hover__p">
                    <p>
                      {languageRedux === 1
                        ? 'Công việc mới nhất sẽ xuất hiện dựa theo Lĩnh vực quan tâm của bạn trong phần thông tin cá nhân.'
                        : 'Newest Jobs will show jobs rely on your Career Objective in Profile.'}
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
            </div>
          </div>

          <Grid container spacing={3} columns={{ xs: 12, sm: 4, md: 12 }}>
            {postNewestV3.data.map((item: PostNewestV3, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Skeleton loading={loading} active>
                  <JobCardV3 item={item} />
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
          {/* <Backdrop
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
          </Backdrop> */}
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
