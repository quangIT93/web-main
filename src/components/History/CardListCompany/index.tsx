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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
    console.log('activeChild', activeChild);
    switch (activeChild) {
      case '5-0':
        handleGetCompany();
        break;

      case '5-1':
        handleGetCompanyView();
        break;

      default:
        break;
    }
  }, [saveCompanyList, newOld, activeChild]);

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
          {languageRedux === 1
            ? 'Danh sách công ty'
            : languageRedux === 2
              ? 'List of companies'
              : '관심한 회사'}
          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            {
              searchParams.get('c') === '5-0'
                ?
                languageRedux === 1
                  ? ' > Công ty đã lưu'
                  : languageRedux === 2
                    ? ' > Saved comopanies'
                    : ' > 저장한 회사'
                : searchParams.get('c') === '5-1'
                  ?
                  languageRedux === 1
                    ?
                    ' > Nhà tuyển dụng xem hồ sơ'
                    : languageRedux === 2
                      ? ' > Employers view resumes'
                      : ' > 고용주는 이력서를 봅니다'
                  : ''
            }
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
          <MenuItem value={1}>{languageRedux === 1
            ? 'Mới nhất'
            : languageRedux === 2
              ? 'Newest'
              : languageRedux === 3 && '최신'}</MenuItem>
          <MenuItem value={0}>{languageRedux === 1
            ? 'Cũ nhất'
            : languageRedux === 2
              ? 'Oldest'
              : languageRedux === 3 && '가장 오래된'}</MenuItem>
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
