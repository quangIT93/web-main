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

interface ICardsApplied {
  activeChild: string;
}

const CardListCandidate: React.FC = () => {
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

  const dataCandidates = async () => {
    try {
      const result = await candidateSearch.getBookmarkCandidate(
        0,
        10,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setCandidateData(result.data);
        if (result.data.candidateBookmarks.length < 10) {
          setIsVisible(false)
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
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result && result.data.candidateBookmarks.length !== 0) {
        setCandidateData((prev: any) => [...prev, ...result?.data?.candidateBookmarks]);
        setPageNumber(nextPage);
        setUploading(false);
      } else {
        setIsVisible(false);
        setPageNumber(0);
        setUploading(false);
        message.error(languageRedux === 1 ?
          'Không còn ứng cử viên để xem'
          : 'No more candidates to see');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    dataCandidates();
  }, []);

  const hanhleClicKCandleSaveCandidate = async (e: any, accountId: string) => {
    try {
      const result = await candidateSearch.postBookmarkCandidate(accountId);
      if (result) {
        dataCandidates();
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
          {
            languageRedux === 1
              ? 'Danh sách ứng viên đã lưu'
              : 'Saved candidate list'
          }
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
              {language?.more}
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