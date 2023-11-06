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
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
import candidateSearch from 'api/apiCandidates';
import CompanyCardHistory from './CompanyCardHistory';
import NoCompanyData from 'utils/NoCompanyData';
import CompanyCard from '#components/Company/CompanyCard';

interface ICardsApplied {
    activeChild: string;
}

const CardListCompany: React.FC = () => {
    const [companyData, setCompanyData] = useState<any>([1, 2, 3, 4]);
    const [uploading, setUploading] = useState(false);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [newOld, setnewOld] = React.useState('Mới nhất');
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const language = useSelector(
        (state: RootState) => state.dataLanguage.languages,
    );

    const handleGetCompany = async () => {
        try {
            // const result = await candidateSearch.getBookmarkCandidate(
            //     0,
            //     10,
            //     languageRedux === 1 ? 'vi' : 'en',
            // );

            // if (result) {
            //     setCompanyData(result.data);
            //     if (result.data.candidateBookmarks.length < 10) {
            //         setIsVisible(false)
            //     }
            // }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleGetmoreCompany = async () => {
        try {
            setUploading(true);
            const nextPage = pageNumber + 1;
            const result = await candidateSearch.getBookmarkCandidate(
                nextPage,
                10,
                languageRedux === 1 ? 'vi' : 'en',
            );

            if (result && result.data.candidateBookmarks.length !== 0) {
                setCompanyData((prev: any) => [...prev, ...result?.data?.candidateBookmarks]);
                setPageNumber(nextPage);
                setUploading(false);
            } else {
                setIsVisible(false);
                setPageNumber(0);
                setUploading(false);
                message.error(languageRedux === 1 ?
                    'Không còn công ty để xem'
                    : 'No more company to see');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        handleGetCompany();
    }, []);

    const handleChange = (event: any) => {
        setnewOld(event.target.value);
        setCompanyData(sortData.sortDataByDate(event.target.value, companyData));
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
                    {
                        languageRedux === 1
                            ? 'Danh sách công ty đã lưu'
                            : 'Saved company list'
                    }
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
                        width: '160px',
                        borderRadius: '24px',
                        height: '48px',
                    }}
                >
                    <MenuItem value="Mới nhất">{language?.history_page?.latest}</MenuItem>
                    <MenuItem value="Cũ nhất">{language?.history_page?.oldest}</MenuItem>
                </TextField>
            </Box>
            {companyData.length > 0 ? (
                <div className="history-post" style={{ marginTop: '16px' }}>
                    <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
                        {companyData.map(
                            (dataBookmark: any, index: number) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    key={index}
                                >
                                    <CompanyCard item={dataBookmark} />
                                </Grid>
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
                            onClick={handleGetmoreCompany}
                        >
                            {language?.more}
                            {/* Xem thêm */}
                        </Button>
                    </Box>
                </div>
            ) : (
                <NoCompanyData />
            )}
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
        </>
    );
};

export default CardListCompany;
