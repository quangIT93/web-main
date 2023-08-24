import React, { useEffect, useState } from 'react';
// import moment, { Moment } from 'moment';
import Grid from '@mui/material/Grid';

import { Box, Typography, MenuItem, TextField } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss';

import { message, Button } from 'antd';

import 'intl';
import 'intl/locale-data/jsonp/en';
import Nodata from 'utils/NoDataPage';
import sortData from 'utils/SortDataHistory/sortData';

// import data
import historyBookmark from 'api/historyBookmark';
import bookMarkApi from 'api/bookMarkApi';

import { useDispatch } from 'react-redux';

import { setAlertCancleSave } from 'store/reducer/alertReducer';

import JobCardSaveHistory from './JobCardSaveHstory';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';

interface ICardsApplied {
  activeChild: string;
}

const CardsSavedJob: React.FC<ICardsApplied> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const { activeChild } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [dataBookmarks, setDataBookmarks] = useState<any>(null);
  const [newOld, setnewOld] = React.useState('Mới nhất');
  // const [count, setCount] = useState(5);
  const [uploading, setUploading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);
  // const [clicked, setClicked] = useState(false);
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
  //get post to check if length <= 10
  const getAllPostToCheck = async () => {
    const result = await historyBookmark.getAllBookmark(
      lastPostId,
      11,
      languageRedux === 1 ? 'vi' : 'en',
    );
    if (result.data.length <= 10) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    getAllPostToCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyBookmark.getAllBookmark(
        newCount,
        10,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setLastPostId(result.data[result.data.length - 1].bookmark_id);
        setDataBookmarks(sortData.sortDataByDate(newOld, result.data));
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
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    });

    return () => {
      isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBookmarks?.length, languageRedux]);

  const handleChange = (event: any) => {
    setnewOld(event.target.value);

    setDataBookmarks(
      sortData.sortDataByDate(event.target.value, dataBookmarks),
    );
  };

  // click button
  const handleClickAddItem = async () => {
    try {
      setUploading(true);
      const result = await historyBookmark.getAllBookmark(
        lastPostId,
        10,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        // if (result?.data?.is_over === true) {
        // setIsVisible(false);
        // return;
        // }

        setUploading(false);
        if (result.data.length === 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content: language?.history_page?.out_job,
          });
          return;
        }
        setLastPostId(result.data[result.data.length - 1].bookmark_id);
        setDataBookmarks((prev: any) => {
          const array = [...prev, ...result.data];
          return sortData.sortDataByDate(newOld, array);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // click card
  // const handleClickCard = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   bookmarkId: number,
  // ) => {
  //   window.open(`/post-detail?post-id=${bookmarkId}`, '_parent');
  // };

  const handleDeleteBookmark = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    bookmarkId: number,
  ) => {
    const result = await bookMarkApi.deleteBookMark(bookmarkId);

    if (result) {
      // setClicked(!clicked)
      setDataBookmarks((prev: any) => {
        const newData = [...prev];
        newData.splice(index, 1);
        if (newData.length === 0) {
          // console.log("tam het");
          getAllPosted(0);
        }
        return newData;
      });
      dispatch<any>(setAlertCancleSave(true));
    }
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
      >
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
          }}
        >
          {language?.history_page?.saved_jobs}
        </Typography>
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
          <MenuItem value="Mới nhất">{language?.history_page?.latest}</MenuItem>
          <MenuItem value="Cũ nhất">{language?.history_page?.oldest}</MenuItem>
        </TextField>
      </Box>
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
      {dataBookmarks?.length > 0 ? (
        <div className="history-post">
          <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
            {dataBookmarks?.map((dataBookmark: any, i: number) => (
              // <Skeleton loading={loading} active>
              <JobCardSaveHistory
                item={dataBookmark}
                handleDeleteBookmark={handleDeleteBookmark}
                index={i}
                key={i}
                language={language}
                languageRedux={languageRedux}
              />
              //</Skeleton>
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
                marginBottom: '2rem',
                backgroundColor: `#0D99FF`,
                color: '#FFFFFF',
                fontWeight: 'bold',
                display: isVisible ? 'block' : 'none',
              }}
              loading={uploading}
              onClick={handleClickAddItem}
            >
              {language?.more}
            </Button>
          </Box>
        </div>
      ) : (
        <Nodata />
      )}
    </>
  );
};

export default CardsSavedJob;
