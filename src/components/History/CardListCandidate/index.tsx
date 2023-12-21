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

import ListCardSaveCandidate from './ListCardSaveCandidate';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
import candidateSearch from 'api/apiCandidates';
import { useSearchParams } from 'react-router-dom';

interface ICardsApplied {
  activeChild: string;
}

const CardListCandidate: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props;
  const [candidateData, setCandidateData] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [searchParams, setSearchParams] = useSearchParams('');
  const dataCandidates = async () => {
    try {
      let result
      activeChild === '4-0' ?
        result = await candidateSearch.getBookmarkCandidate(
          0,
          10,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        )
        :
        result = await candidateSearch.getViewedCandidate(
          0,
          10,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        )
      // console.log('result?.data?.is_over', result?.data?.is_over);

      if (result) {
        setIsVisible(true)
        setCandidateData(
          activeChild === '4-0' ?
            result?.data?.candidateBookmarks
            : result?.data?.data
        );
        if (
          result?.data?.candidateBookmarks ?
            result?.data?.candidateBookmarks.length < 10 :
            result?.data?.data.length < 10
          // result?.data?.is_over
        ) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleGetmoreCandidates = async () => {
    try {
      setUploading(true);
      const nextPage = pageNumber + 1;
      let result: any;
      activeChild === '4-0' ?
        result = await candidateSearch.getBookmarkCandidate(
          nextPage,
          10,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        )
        :
        result = await candidateSearch.getViewedCandidate(
          nextPage,
          10,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        )

      if (
        result?.data?.candidateBookmarks ?
          result?.data?.candidateBookmarks.length !== 0 :
          result?.data?.data.length !== 0
        // !result?.data?.is_over
      ) {
        let newData = activeChild === '4-0' ?
          result?.data?.candidateBookmarks
          : result?.data?.data
        setCandidateData((prev: any) => {
          return [
            ...prev,
            ...newData,
          ]
        });
        setPageNumber(nextPage);
        setUploading(false);
      } else {
        setIsVisible(false);
        setPageNumber(0);
        setUploading(false);
        message.error(
          languageRedux === 1
            ? 'Không còn ứng cử viên để xem.'
            : languageRedux === 2
              ? 'No more candidates to see.'
              : '더 이상 지켜볼 후보자가 없습니다.',
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dataCandidates();
  }, [languageRedux, activeChild]);


  const hanhleClicKCandleSaveCandidate = async (e: any, accountId: string) => {
    try {
      const result = await candidateSearch.postBookmarkCandidate(accountId);
      if (result) {
        dataCandidates();
        dispatch<any>(setAlertCancleSave(true));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {/* {contextHolder} */}
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
          {languageRedux === 1
            ? 'Danh sách ứng viên'
            : languageRedux === 2
              ? 'List of candidates'
              : ' 지원자 리스트'}
          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            {searchParams.get('c') === '4-0'
              ? languageRedux === 1
                ? ' > Ứng viên đã lưu.'
                : languageRedux === 2
                  ? ' > Saved candidates'
                  : ' > 저장한 구직자.'
              :
              languageRedux === 1
                ? ' > Ứng viên đã xem'
                : languageRedux === 2
                  ? ' > Viewed candidates'
                  : languageRedux === 3 && '본 구지자.'
            }
          </span>
        </Typography>
      </Box>
      <Backdrop
        sx={{
          color: '#0d99ff ',
          backgroundColor: 'transparent',
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
        }}
        open={false}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {candidateData?.length > 0 ? (
        <div className="history-post">
          <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
            {candidateData?.map(
              (dataBookmark: any, i: number) => (
                // <Skeleton loading={loading} active>
                <ListCardSaveCandidate
                  item={dataBookmark}
                  handleDeleteBookmark={() => { }}
                  index={i}
                  key={i}
                  language={[]}
                  languageRedux={1}
                  hanhleClicKCandleSaveCandidate={
                    hanhleClicKCandleSaveCandidate
                  }
                />
                //</Skeleton>
              ),
            )}
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
              onClick={handleGetmoreCandidates}
            >
              {languageRedux === 1
                ? 'Xem thêm'
                : languageRedux === 2
                  ? 'See more'
                  : '더보기'}
              {/* Xem thêm */}
            </Button>
          </Box>
        </div>
      ) : (
        <Nodata />
      )}
    </>
  );
};

export default CardListCandidate;
