import React, { useEffect, useState } from 'react';
// import moment, { Moment } from 'moment';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import { Space, Tooltip, message, Button } from 'antd';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// import ImageListItem from '@mui/material/ImageListItem';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Typography, MenuItem, TextField } from '@mui/material';
// import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons';

import { Skeleton } from 'antd';

import 'intl';
import 'intl/locale-data/jsonp/en';

// import data
import historyApplicator from 'api/historyApplicator';
import sortData from 'utils/SortDataHistory/sortData';
import NoDataComponent from 'utils/NoDataPage';

import JobCardHistory from '../JobCardHistory';

interface ICardsAppliedPending {
  activeChild: string;
}

const CardsAppliedPending: React.FC<ICardsAppliedPending> = (props) => {
  // const { activeChild } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [dataApplied, setDataApplied] = useState<any>(null);
  const [newOld, setnewOld] = React.useState('Mới nhất');
  // const [count, setCount] = useState(5);
  const [lastPostId, setLastPostId] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);

  //get post to check if length <= 10
  const getAllPostToCheck = async () => {
    const result = await historyApplicator.getAllSubmitedApplied(
      lastPostId,
      11,
      1,
    );
    if (result.data.length <= 10) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    getAllPostToCheck();
  }, []);

  const getAllPending = async () => {
    try {
      const result = await historyApplicator.getAllSubmitedApplied(null, 10, 1);

      if (result) {
        setDataApplied(result.data);
        setLastPostId(result.data[result.data.length - 1].id);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getAllPending().then(() => {
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
    setDataApplied(sortData.sortDataByDate(event.target.value, dataApplied));
  };

  const handleClickAddItem = async () => {
    try {
      setUploading(true);
      const result = await historyApplicator.getAllSubmitedApplied(
        lastPostId,
        10,
        1,
      );
      if (result) {
        setUploading(false);
        if (result.data.length == 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content: 'Đã hết công việc để hiển thị',
          });
          return;
        }
        setLastPostId(result.data[result.data.length - 1].id);
        setDataApplied((prev: any) => {
          const array = [...prev, ...result.data];
          return sortData.sortDataByDate(newOld, array);
        });
      }
    } catch (error) { }
  };

  // click card
  // const handleClickCard = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   postId: number,
  // ) => {
  //   window.open(`/post-detail?post-id=${postId}`, '_parent');
  // };

  // Sắp xếp mảng dữ liệu khi state `oldDate` thay đổi

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
          Các công việc ứng tuyển đang chờ duyệt
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
        {dataApplied?.length > 0 ? (
          <div className="history-post">
            <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
              {dataApplied?.map((posted: any, i: number) => (
                <JobCardHistory item={posted} />
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
                  marginBottom: '2rem',
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
          <NoDataComponent />
        )}
      </Skeleton>
    </>
  );
};

export default CardsAppliedPending;
