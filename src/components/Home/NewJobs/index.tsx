import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import { url } from 'inspector'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';
// import compornent
import ShowNotificativeSave from '../ShowNotificativeSave';
import ShowCancleSave from '../ShowCancleSave';
// import api
import postApi from 'api/postApi';
import bookMarkApi from 'api/bookMarkApi';

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider';

import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';

import { useSearchParams } from 'react-router-dom';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
// import icon
import {
  EnvironmentFilled,
  ClockCircleFilled,
  EuroCircleFilled,
  CaretDownFilled,
} from '@ant-design/icons';

import { Space, Tooltip } from 'antd';

import './style.scss';
//@ts-ignore
import { maxHeight } from '@mui/system';

import ChildCateloriesArray from 'context/HomeValueContextProvider';

//import jobcard
import JobCard from '../JobCard';

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
}

const NewJobs: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const [showNofySave, setShowNofySave] = React.useState(false);

  const navigate = useNavigate();

  // state redux
  const { postNewest } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { setPostNewest, setPostNewestMore } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const [checkBookMark, setCheckBookMark] = React.useState(true);

  const {
    setChildCateloriesArray,
    childCateloriesArray,
  }: {
    setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>;
    childCateloriesArray: number[];
  } = useContext(HomeValueContext);

  // handle click post details
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`);
  };

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
    );

    if (result) {
      setPostNewestMore(result);
      setOpenBackdrop(false);
    }
  };
  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  const getPostNewest = async () => {
    try {
      setOpenBackdrop(true);
      const result = await postApi.getPostNewest(null, null, null, 19);

      if (result) {
        setPostNewest(result);

        // set loading
        setOpenBackdrop(false);
        setIsLoading(true);
      }
    } catch (error) {
      setOpenBackdrop(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPostNewest();
    // delete param when back to page
    // searchParams.delete("theme-id")
    // setSearchParams(searchParams)
  }, []);

  return (
    <>
      {
        // automatic && (
        <Box sx={{ flexGrow: 1, marginTop: '300px' }} ref={listRef}>
          <h2 style={{ margin: '12px 0' }}>Công việc mới nhất</h2>
          <Grid container spacing={3} columns={{ xs: 12, sm: 4, md: 12 }}>
            {postNewest.data.posts.map((item: PostNewest, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <JobCard item={item} />
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
              <p>Xem thêm</p>
              <CaretDownFilled />
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
