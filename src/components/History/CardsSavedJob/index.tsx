import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Space, Tooltip, message, Button, Result } from 'antd';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ImageListItem from '@mui/material/ImageListItem';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Typography, MenuItem, TextField } from '@mui/material';
import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons';
import './style.scss';

import { Skeleton } from 'antd';

import { SaveIconFill } from '#components/Icons';

import 'intl';
import 'intl/locale-data/jsonp/en';
import Nodata from 'utils/NoDataPage';
import sortData from 'utils/SortDataHistory/sortData';

// import data
import historyBookmark from 'api/historyBookmark';
import bookMarkApi from 'api/bookMarkApi';

import { useDispatch, useSelector } from 'react-redux';

import { setAlertCancleSave } from 'store/reducer/alertReducer';

import JobCardSaveHistory from './JobCardSaveHstory';

interface ICardsApplied {
  activeChild: string;
}

const CardsSavedJob: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [dataBookmarks, setDataBookmarks] = useState<any>(null);
  const [newOld, setnewOld] = React.useState('Mới nhất');
  const [count, setCount] = useState(5);
  const [uploading, setUploading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);

  //get post to check if length <= 10
  const getAllPostToCheck = async () => {
    const result = await historyBookmark.getAllBookmark(lastPostId, 11);
    if (result.data.length <= 10) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    getAllPostToCheck();
  }, []);

  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyBookmark.getAllBookmark(newCount, 10);

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
        setLoading(false);
      }
    });

    return () => {
      isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    };
  }, []);

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
      const result = await historyBookmark.getAllBookmark(lastPostId, 10);

      if (result) {
        // if (result?.data?.is_over === true) {
        // setIsVisible(false);
        // return;
        // }

        setUploading(false);
        if (result.data.length == 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content: 'Đã hết công việc để hiển thị',
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
  const handleClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    bookmarkId: number,
  ) => {
    window.open(`/post-detail?post-id=${bookmarkId}`);
  };

  const handleDeleteBookmark = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    bookmarkId: number,
  ) => {
    const result = await bookMarkApi.deleteBookMark(bookmarkId);

    if (result) {
      setDataBookmarks((prev: any) => {
        const newData = [...prev];
        newData.splice(index, 1);
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
          Các công việc đã lưu
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
          <MenuItem value="Mới nhất">Mới nhất</MenuItem>
          <MenuItem value="Cũ nhất">Cũ nhất</MenuItem>
        </TextField>
      </Box>
      <Skeleton loading={loading} active>
        {dataBookmarks?.length > 0 ? (
          <div className="history-post">
            <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
              {dataBookmarks?.map((dataBookmark: any, i: number) => (
                <JobCardSaveHistory
                  item={dataBookmark}
                  handleDeleteBookmark={handleDeleteBookmark}
                  index={i}
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
                  marginBottom: '2rem',
                  backgroundColor: `#0D99FF`,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  display: isVisible ? 'block' : 'none',
                }}
                loading={uploading}
                onClick={handleClickAddItem}
              >
                Xem thêm
              </Button>
            </Box>
          </div>
        ) : (
          <Nodata />
        )}
      </Skeleton>
    </>
  );
};

export default CardsSavedJob;
