import React, { useEffect, useMemo } from 'react';
// import moment, { Moment } from 'moment';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import { Space, Tooltip } from 'antd';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// import ImageListItem from '@mui/material/ImageListItem';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import { Box, Typography, MenuItem, TextField, Button } from '@mui/material';
// import {
//   EnvironmentFilled,
//   ClockCircleFilled,
//   MoreOutlined,
// } from '@ant-design/icons';
// import { useSearchParams } from 'react-router-dom';
// import { Skeleton } from 'antd';

// import data
// import historyRecruiter from 'api/historyRecruiter';
// import DetailPosted from '../DetailPosted';

// import component
import CardsPostedAll from '../CardsPostedAll';
import CardsPostedClose from '../CardsPostedClose';
import CardsPostedOpen from '../CardsPostedOpen';

import './style.scss';

interface ICardsApplied {
  activeChild: string;
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailPosted: boolean;
}

const CardsPosted: React.FC<ICardsApplied> = (props) => {
  const { activeChild, setShowDetailPosted, showDetailPosted } = props;
  // const [loading, setLoading] = useState<boolean>(true);
  // const [dataPosted, setDataPosted] = useState<any>(null);
  // const [newOld, setnewOld] = React.useState('Mới nhất');

  // const [detailPosted, setDetailPosted] = React.useState<any>(null);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const [count, setCount] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getAllPosted = async (newCount: number) => {
  //   try {
  //     const result = await historyRecruiter.GetInformationAndCandidatesCount(
  //       0,
  //       newCount,
  //       ' -1',
  //     );

  //     if (result) {
  //       setDataPosted(result.data);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   let isMounted = true;
  //   setLoading(true);
  //   getAllPosted(10).then(() => {
  //     if (isMounted) {
  //       setLoading(false);
  //     }
  //   });

  //   return () => {
  //     isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
  //   };
  // }, [showDetailPosted]);

  // const handleChange = (event: any) => {
  //   setnewOld(event.target.value);
  // };
  // console.log('dataPosted', dataPosted)

  // const handleShowDetail = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   posted: any,
  // ) => {
  //   event.stopPropagation();
  //   setShowDetailPosted(true);
  //   setDetailPosted(posted);
  // };

  // // click Button
  // const handleAddItem = async () => {
  //   const newCount = count + 6;
  //   setCount(newCount);
  //   await getAllPosted(newCount);
  // };

  // show posted All or posted closed || posted open
  const PostedAll = useMemo(() => {
    if (activeChild === '2-0') {
      return (
        <CardsPostedAll
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild, showDetailPosted]);

  const PostedClose = useMemo(() => {
    if (activeChild === '2-2') {
      return (
        <CardsPostedClose
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild, showDetailPosted]);

  const PostedOpen = useMemo(() => {
    if (activeChild === '2-1') {
      return (
        <CardsPostedOpen
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild, showDetailPosted]);

  return (
    <>
      <>
        {PostedAll}
        {PostedClose}
        {PostedOpen}
      </>
    </>
  );
};

export default CardsPosted;
