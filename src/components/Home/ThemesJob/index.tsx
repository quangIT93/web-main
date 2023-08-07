import React from 'react';
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
import { TopicJobIcon, MoreICon } from '#components/Icons';

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
}

const ThemesJob: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [automatic, setAutomatic] = React.useState<Boolean>(false);
  const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  // state redux
  const { post } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { setPostByTheme, setPostThemeMore } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    setOpenBackdrop(!openBackdrop);
    // const test = [1, 2]
    // const p = createSearchParams({ page: `${test}`})
    // navigate(`/?${p}`);
    // console.log(searchParams.get(`page`))
    const themeId = searchParams.get(`theme-id`)
      ? searchParams.get(`theme-id`)
      : listTheme?.data[0].id;

    const threshold = post.data.posts[post.data.posts.length - 1].id;
    const result = await postApi.getPostByThemeId(
      Number(themeId),
      9,
      threshold,
    );

    if (result) {
      setPostThemeMore(result);

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

  // get post by theme id
  const getPostByThemeId = async () => {
    try {
      const result = await themeApi.getThemesEnable("vi");

      if (result) {
        setListThem(result);

        const list = await postApi.getPostByThemeId(
          result.data[0].id,
          19,
          null,
        );
        if (list) {
          setPostByTheme(list);
          setAutomatic(true);
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
    setLoading(true);
    setTimeout(() => {
      if (listTheme) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 1000);
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
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ display: 'flex', gap: '0.5rem', margin: '5px 0' }}>
        <TopicJobIcon width={25} height={25} />
        <h2>Công việc theo chủ đề</h2>
      </div>

      {!localStorage.getItem('accessToken') ? (
        <div className="title-location-job">
          <h3>Vị trí công việc lý tưởng</h3>
          <p>
            Tìm kiếm việc làm tại các địa điểm nổi tiếng trong thành phố của
            bạn.
          </p>
        </div>
      ) : (
        <></>
      )}
      <Skeleton loading={loading} active>
        <ListCompanyCarousel listTheme={listTheme} />
      </Skeleton>

      <Skeleton loading={loading} active>
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
              <Stack
                spacing={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '24px 0',
                  marginBottom: '24px',
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
                  className="div-hover-more"
                  onClick={(e) => {
                    handleChange(e, page);
                  }}
                >
                  <p>Xem thêm</p>
                  <MoreICon width={20} height={20} />
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
            </>
          )}
        </>
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
