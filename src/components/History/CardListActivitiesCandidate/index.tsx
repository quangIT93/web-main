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

const CardListActivitiesCandidate: React.FC<ICardsApplied> = () => {
  const [candidateData, setCandidateData] = useState<any>();
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
      const result = await candidateSearch.getBookmarkCandidate(
        0,
        10,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        setCandidateData(result.data);
        if (result.data.candidateBookmarks.length < 10) {
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
      const result = await candidateSearch.getBookmarkCandidate(
        nextPage,
        10,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result && result.data.candidateBookmarks.length !== 0) {
        setCandidateData((prev: any) => [
          ...prev,
          ...result?.data?.candidateBookmarks,
        ]);
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
  }, [languageRedux]);

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
            ? 'Hoạt động của bạn'
            : languageRedux === 2
            ? 'Your activities'
            : ' 귀하의 활동'}
          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            {searchParams.get('c') === '7-0'
              ? languageRedux === 1
                ? ' > Việc làm đã xem'
                : languageRedux === 2
                ? ' > Viewed job'
                : ' > 본 채용공고.'
              : searchParams.get('c') === '7-1'
              ? languageRedux === 1
                ? ' > Lượt công ty xem hồ sơ'
                : languageRedux === 2
                ? ' > Number of companies that viewed the profile'
                : ' > 내 이력서를 본 회사 조회 수.'
              : searchParams.get('c') === '7-2'
              ? languageRedux === 1
                ? ' > Lượt công ty lưu hồ sơ'
                : languageRedux === 2
                ? ' > Number of companies saved the profile'
                : ' > 내 이력서를 저장한 회사 조회 수.'
              : ''}
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
      {candidateData?.candidateBookmarks?.length > 0 ? (
        <div className="history-post">
          <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
            {candidateData?.candidateBookmarks?.map(
              (dataBookmark: any, i: number) => (
                // <Skeleton loading={loading} active>
                <ListCardSaveCandidate
                  item={dataBookmark}
                  handleDeleteBookmark={() => {}}
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

export default CardListActivitiesCandidate;
