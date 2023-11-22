import React, { useEffect, useState } from 'react';
// import moment, { Moment } from 'moment';
import Grid from '@mui/material/Grid';

import { Box, Typography, MenuItem, TextField } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss';

import { message, Button, Skeleton } from 'antd';

import 'intl';
import 'intl/locale-data/jsonp/en';
import Nodata from 'utils/NoDataPage';
import sortData from 'utils/SortDataHistory/sortData';

// import data
import historyBookmark from 'api/historyBookmark';
import bookMarkApi from 'api/bookMarkApi';

import { useDispatch } from 'react-redux';

import { setAlertCancleSave } from 'store/reducer/alertReducer';

// import ListCardSaveCandidate from './ListCardSaveCandidate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import CompanyCardHistory from './CompanyCardHistory';
import CompanyViewCardHistory from './CompanyViewCardHistory';
import NoCompanyData from 'utils/NoCompanyData';
import apiCompanyV3 from 'api/apiCompanyV3';
import { useSearchParams } from 'react-router-dom';

interface ICardsApplied {
  activeChild: string;
}

const CardListCompany: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props;
  const [companyData, setCompanyData] = useState<any>([]);
  const [companyDataView, setCompanyDataView] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [newOld, setnewOld] = React.useState(1);
  const [saveCompanyList, setSaveCompanyList] = React.useState(false);
  const [saveCompanyListView, setSaveCompanyListView] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const handleGetCompany = async () => {
    try {
      const result = await apiCompanyV3.getBookmarkCompany(
        0,
        20,
        languageRedux === 1 ? 'vi' : 'en',
        newOld === 1 ? 'DESC' : 'ASC',
      );

      if (result) {
        setCompanyData(result.data.bookmarkedCompany);
        if (result.data.bookmarkedCompany.length < 20) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleGetCompanyView = async () => {
    try {
      const result = await apiCompanyV3.getCompanyView(
        0,
        20,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        console.log('result', result);
        setCompanyDataView(result.data.companies);
        if (result.data.companies.length < 20) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // console.log('activeChild', activeChild);

  const handleGetmoreCompany = async () => {
    try {
      setUploading(true);
      const nextPage = pageNumber + 1;
      const result = await apiCompanyV3.getBookmarkCompany(
        nextPage,
        20,
        languageRedux === 1 ? 'vi' : 'en',
        newOld === 1 ? 'DESC' : 'ASC',
      );

      if (result && result.data.bookmarkedCompany.length !== 0) {
        setCompanyData((prev: any) => [
          ...prev,
          ...result?.data?.bookmarkedCompany,
        ]);
        setPageNumber(nextPage);
        setUploading(false);
      } else {
        setIsVisible(false);
        setPageNumber(0);
        setUploading(false);
        message.error(
          languageRedux === 1
            ? 'Không còn công ty để xem'
            : 'No more company to see',
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleGetmoreCompanyView = async () => {
    try {
      setUploading(true);
      const nextPage = pageNumber + 1;
      const result = await apiCompanyV3.getBookmarkCompany(
        nextPage,
        20,
        languageRedux === 1 ? 'vi' : 'en',
        newOld === 1 ? 'DESC' : 'ASC',
      );

      if (result && result.data.bookmarkedCompany.length !== 0) {
        setCompanyDataView((prev: any) => [
          ...prev,
          ...result?.data?.companies,
        ]);
        setPageNumber(nextPage);
        setUploading(false);
      } else {
        setIsVisible(false);
        setPageNumber(0);
        setUploading(false);
        message.error(
          languageRedux === 1
            ? 'Không còn công ty để xem'
            : 'No more company to see',
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleGetCompany();
    handleGetCompanyView();
  }, [saveCompanyList, newOld]);

  const sortDataByDate = (value: any, arrayData: any) => {
    if (value === 1) {
      return arrayData.sort((a: any, b: any) => {
        return (
          Number(b.CompanyData.updatedAt) - Number(a.CompanyData.updatedAt)
        );
      });
    } else {
      return arrayData.sort((a: any, b: any) => {
        return (
          Number(a.CompanyData.updatedAt) - Number(b.CompanyData.updatedAt)
        );
      });
    }
  };

  const handleChange = (event: any) => {
    setnewOld(event.target.value);
    setIsVisible(true);
    setPageNumber(0);
    // setCompanyData(sortDataByDate(event.target.value, companyData));
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
        className="company_list_title_history"
      >
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
          }}
        >
          {languageRedux === 1 ? 'Danh sách công ty' : 'List of companies'}
          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            {searchParams.get('c') === '5-0'
              ? languageRedux === 1
                ? ' > Công ty đã lưu'
                : ' > Saved company'
              : searchParams.get('c') === '5-1'
                ? ' > Nhà tuyển dụng xem hồ sơ'
                : '> Employers view resumes'}
          </span>
        </Typography>
        <TextField
          select
          id="sex"
          value={newOld}
          onChange={handleChange}
          variant="outlined"
          placeholder="Giới tính"
          size="small"
          sx={{
            width: '120px',
            borderRadius: '24px',
            // height: '48px',
          }}
        >
          <MenuItem value={1}>{language?.history_page?.latest}</MenuItem>
          <MenuItem value={0}>{language?.history_page?.oldest}</MenuItem>
        </TextField>
      </Box>
      {activeChild === '5-0' && companyData?.length !== 0 ? (
        <div className="history-post" style={{ marginTop: '16px' }}>
          <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
            {companyData?.map((dataBookmark: any, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                <CompanyCardHistory
                  item={dataBookmark.CompanyData}
                  index={index}
                  saveCompanyList={saveCompanyList}
                  setSaveCompanyList={setSaveCompanyList}
                />
              </Grid>
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
              onClick={handleGetmoreCompany}
            >
              {language?.more}
              {/* Xem thêm */}
            </Button>
          </Box>
        </div>
      ) : activeChild === '5-1' && companyDataView?.length !== 0 ? (
        <div className="history-post" style={{ marginTop: '16px' }}>
          <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
            {companyDataView?.map((dataView: any, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                <CompanyViewCardHistory
                  item={dataView}
                  index={index}
                  saveCompanyList={saveCompanyListView}
                  setSaveCompanyList={setSaveCompanyListView}
                />
              </Grid>
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
              onClick={handleGetmoreCompanyView}
            >
              {language?.more}
              {/* Xem thêm */}
            </Button>
          </Box>
        </div>
      ) : (
        <NoCompanyData />
      )}

      {(activeChild === '5-1' && companyDataView?.length !== 0) ||
      (activeChild === '5-1' && companyData?.length !== 0) ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default CardListCompany;
