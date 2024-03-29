import React, { useEffect, useState, useMemo } from 'react';
// import moment, { Moment } from 'moment';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import { Space, Tooltip } from 'antd';
import { message, Button } from 'antd';
// import ImageListItem from '@mui/material/ImageListItem';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Typography, MenuItem, TextField } from '@mui/material';
import {
  EnvironmentFilled,
  ClockCircleFilled,
  LeftOutlined,
  MoreOutlined,
} from '@ant-design/icons';
// import { useSearchParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import 'intl';
import 'intl/locale-data/jsonp/en';

import Nodata from 'utils/NoDataPage';
import sortData from 'utils/SortDataHistory/sortData';
import './style.scss';
// api
import historyRecruiter from 'api/historyRecruiter';

// import component
import DetailPosted from '../DetailPosted';

import JobCardPostHistory from '../JobCardPostHistory';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'react-router-dom';

interface ICardsPostedClose {
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailPosted: boolean;
}

const CardsPostedClose: React.FC<ICardsPostedClose> = (props) => {
  const { setShowDetailPosted, showDetailPosted } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [detailPosted, setDetailPosted] = React.useState<any>(null);
  const [dataPosted, setDataPosted] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newOld, setnewOld] = React.useState('Mới nhất');
  const [uploading, setUploading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams('');
  // const [language, setLanguage] = React.useState<any>();

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

  //get post to check if length <= 10
  // const getAllPostToCheck = async () => {
  //   const result = await historyRecruiter.GetInformationAndCandidatesCount(
  //     0,
  //     11,
  //   );
  //   if (result.data.length <= 10) {
  //     setIsVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   getAllPostToCheck();
  // }, []);

  //   getData
  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        newCount,
        10,
        '3',
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        setDataPosted(result.data);
        setLastPostId(result.data[result.data.length - 1].id);
        if (result.data.length) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getAllPosted(0).then(() => {
      if (isMounted) {
        setLoading(false);
      }
    });
    return () => {
      isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    };
  }, [showDetailPosted, languageRedux]);

  // click Button
  const handleAddItem = async () => {
    try {
      setUploading(true);
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        lastPostId,
        5,
        '3',
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setUploading(false);
        if (result.data.length === 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content: languageRedux === 1
              ? 'Đã hết công việc để hiển thị'
              : languageRedux === 2
                ? 'Out of job to display'
                : '보여줄 일이 부족해',
          });
          return;
        }
        setLastPostId(result.data[result.data.length - 1].id);
        setDataPosted((prev: any) => {
          const array = [...prev, ...result.data];
          return sortData.sortDataByDate(newOld, array);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowDetail = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    posted: any,
  ) => {
    event.stopPropagation();
    setShowDetailPosted(true);
    setDetailPosted(posted);
  };

  const handleChange = (event: any) => {
    setnewOld(event.target.value);

    setDataPosted(sortData.sortDataByDate(event.target.value, dataPosted));
  };

  const handleHideDetail = () => {
    setShowDetailPosted(false);
  };

  return (
    <>
      {contextHolder}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="list_close_posted_job_history"
      >
        <div className="back-container">
          <Button
            className="back-button"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={handleHideDetail}
            style={{
              display: showDetailPosted ? 'block' : 'none',
            }}
          />
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '24px',
            }}
          >
            {languageRedux === 1
              ? 'Các công việc đã đăng tuyển'
              : languageRedux === 2
                ? 'Posted jobs'
                : languageRedux === 3 && '게시된 작업'}
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              {searchParams.get('c') === '2-2' && languageRedux === 1
                ? ' > Các công việc đã đóng'
                : languageRedux === 2
                  ? ' > Closed jobs'
                  : languageRedux === 3 && ' > 채용이 마감되었습니다'}
            </span>
          </Typography>
        </div>
        <TextField
          select
          id="sex"
          value={newOld}
          onChange={handleChange}
          variant="outlined"
          placeholder="Giới tính"
          size="small"
          sx={{ width: '120px' }}
        >
          <MenuItem value="Mới nhất">{languageRedux === 1
            ? 'Mới nhất'
            : languageRedux === 2
              ? 'Newest'
              : languageRedux === 3 && '최신'}</MenuItem>
          <MenuItem value="Cũ nhất">{languageRedux === 1
            ? 'Cũ nhất'
            : languageRedux === 2
              ? 'Oldest'
              : languageRedux === 3 && '가장 오래된'}</MenuItem>
        </TextField>
      </Box>

      {!showDetailPosted ? (
        <>
          {/* <Skeleton loading={loading} active> */}
          <Backdrop
            sx={{
              color: '#0d99ff ',
              backgroundColor: 'transparent',
              zIndex: (theme: any) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {dataPosted?.length > 0 ? (
            <div className="history-post">
              <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
                {dataPosted?.map((posted: any, i: number) => (
                  <JobCardPostHistory
                    item={posted}
                    handleShowDetail={handleShowDetail}
                    isHide={true}
                    key={i}
                    language={language}
                    languageRedux={languageRedux}
                  />
                ))}
              </Grid>
              <Box
                sx={{
                  margin: '12px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  style={{
                    width: 130,
                    height: 40,
                    backgroundColor: `#0D99FF`,
                    color: '#FFFFFF',
                    marginBottom: '2rem',
                    fontWeight: 'bold',
                    display: isVisible ? 'block' : 'none',
                  }}
                  loading={uploading}
                  onClick={handleAddItem}
                >
                  {languageRedux === 1
                    ? 'Xem thêm'
                    : languageRedux === 2
                      ? 'See more'
                      : '더보기'}
                </Button>
              </Box>
            </div>
          ) : (
            <Nodata />
          )}
          {/* </Skeleton> */}
        </>
      ) : (
        <DetailPosted detailPosted={detailPosted} />
      )}
    </>
  );
};

export default CardsPostedClose;
