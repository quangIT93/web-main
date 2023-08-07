import React, { useEffect, useState } from 'react';
import './style.scss';
// import moment from 'moment';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import { Button } from 'antd';
import { message } from 'antd';
// import ImageListItem from '@mui/material/ImageListItem';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Typography, MenuItem, TextField } from '@mui/material';
import {
  // EnvironmentFilled,
  // ClockCircleFilled,
  // MoreOutlined,
  LeftOutlined,
} from '@ant-design/icons';
// import { useSearchParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import 'intl';
import 'intl/locale-data/jsonp/en';

// import { BackIcon } from '#components/Icons';

import sortData from 'utils/SortDataHistory/sortData';

// api
import historyRecruiter from 'api/historyRecruiter';

// import component
import DetailPosted from '../DetailPosted';
import NoData from 'utils/NoDataPage';

import JobCardPostHistory from '../JobCardPostHistory';

interface ICardsPostedAll {
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailPosted: boolean;
}

const CardsPostedAll: React.FC<ICardsPostedAll> = (props) => {
  const { setShowDetailPosted, showDetailPosted } = props;
  const [detailPosted, setDetailPosted] = React.useState<any>(null);
  const [dataPosted, setDataPosted] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newOld, setnewOld] = React.useState('Mới nhất');

  const [uploading, setUploading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);

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
  const getAllPosted = async (postID: number) => {
    try {
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        postID,
        10,
        '-1',
        'vi',
      );

      if (result) {
        setDataPosted(result.data);
        setLastPostId(result.data[result.data.length - 1].id);
        if (result.data.length < 10) {
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
    // setCount(5)
    getAllPosted(0).then(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    };
  }, [showDetailPosted]);

  // click Button
  const handleAddItem = async () => {
    try {
      setUploading(true);
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        lastPostId,
        5,
        '-1',
        'vi',
      );
      if (result) {
        setUploading(false);
        if (result.data.length === 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content: 'Đã hết công việc để hiển thị',
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
              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            Tất cả công việc đã đăng tuyển
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
          <MenuItem value="Mới nhất">Mới nhất</MenuItem>
          <MenuItem value="Cũ nhất">Cũ nhất</MenuItem>
        </TextField>
      </Box>

      {!showDetailPosted ? (
        <>
          <Skeleton loading={loading} active>
            {dataPosted?.length > 0 ? (
              <div className="history-post">
                <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
                  {dataPosted?.map((posted: any, i: number) => (
                    <JobCardPostHistory
                      key={i}
                      item={posted}
                      handleShowDetail={handleShowDetail}
                      isHide={false}
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
                      marginBottom: '2rem',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      display: isVisible ? 'block' : 'none',
                    }}
                    loading={uploading}
                    onClick={handleAddItem}
                  >
                    Xem thêm
                  </Button>
                </Box>
              </div>
            ) : (
              <NoData />
            )}
          </Skeleton>
        </>
      ) : (
        <DetailPosted detailPosted={detailPosted} />
      )}
    </>
  );
};

export default CardsPostedAll;
