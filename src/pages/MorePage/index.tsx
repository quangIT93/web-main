import React from 'react';
// import Card from '@mui/material/Card';

// import Modal from '@mui/material/Modal';

// import ImageListItem from '@mui/material/ImageListItem';

import Grid from '@mui/material/Grid';
import hotJobApi from 'api/hotJobApi';
// import { url } from 'inspector'

import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// scroll data
import InfiniteScroll from 'react-infinite-scroll-component';

import RollTop from '#components/RollTop';

// import icon
//@ts-ignore
import {
    FilterIconHotjob,
    MoreICon,
    FilterIcon,
    LightFilterIcon,
} from '#components/Icons';

import { Skeleton, Radio, Select, Space, message, Spin } from 'antd';
import type { SelectProps, RadioChangeEvent } from 'antd';

// import antIcon
import { LoadingOutlined } from '@ant-design/icons';

import { setCookie } from 'cookies';
// import redux

// import { bindActionCreators } from 'redux';
// import { actionCreators } from 'store/index';
// import { RootState } from 'store/reducer';

// import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';

// import api
// import postApi from 'api/postApi'

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';

import Footer from '../../components/Footer/Footer';

// import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
// @ts-ignore
import { Navbar } from '#components';

//import jobcard
// import JobCard from '../../components/Home/JobCard';
// import JobCardHotJob from './JobCardHotJob';
// import InfluencerCard from './InfluencerCard';

// import { useHomeState } from '../Home/HomeState'

import {
    // useNavigate,
    // createSearchParams,
    useSearchParams,
} from 'react-router-dom';
// import { AxiosResponse } from 'axios'
// import icon
// import {
//   EnvironmentFilled,
//   ClockCircleFilled,
//   // EuroCircleFilled,
//   CaretDownFilled,
// } from '@ant-design/icons';

import './style.scss';
// import { stringify } from 'query-string/base';
// import notificationKeywordApi from 'api/notificationKeyword';

import ShowNotificativeSave from '#components/ShowNotificativeSave';
import ShowCancleSave from '#components/ShowCancleSave';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import locationApi from 'api/locationApi';
import { getCookie } from 'cookies';
import NoDataComponent from 'utils/NoDataPage';
import HotJob from '#components/Home/HotJob';
import CategoryDropdown from '#components/CategoryDropdown';
import postApi from 'api/postApi';
import JobCardMoreNewJob from './JobCardMoreNewJob';
import nearByApi from 'api/apiNearBy';
import JobCardMoreJob from './JobCardMoreJob';

const MoreJobsPage: React.FC = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language,);
    const profile = useSelector((state: RootState) => state.dataProfileV3.data);
    const [moreJob, setMoreJob] = React.useState<any>([]);

    const listRef = React.useRef<HTMLUListElement | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [typeJob, setTypeJob] = React.useState<any>(localStorage.getItem('job-type'));
    const [templateId, setTemplateId] = React.useState<any>(localStorage.getItem('job-type'));

    const language = useSelector((state: RootState) => state.dataLanguage.languages,);

    const [idFilterProvinces, setIdFilterProvinces] = React.useState('');

    const [hasMore, setHasMore] = React.useState(true);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const analytics: any = getAnalytics();

    const getTemplateId = () => {
        const templateId = localStorage.getItem('job-type');
        setTemplateId(templateId?.split('-').at(1));
    }

    React.useEffect(() => {
        setTypeJob(localStorage.getItem('job-type'));
        getTemplateId()
    }, [profile])

    React.useEffect(() => {
        getProvinces();
        document.title =
            typeJob === "new" ?
                languageRedux === 1
                    ? 'HiJob - Công việc mới nhất'
                    : 'HiJob - Newest Jobs' :
                typeJob === 'suggested' ?
                    languageRedux === 1
                        ? 'HiJob - Công việc gợi ý'
                        : 'HiJob - Suggested jobs in your city' :
                    languageRedux === 1
                        ? 'HiJob - Công việc theo chủ đề'
                        : 'HiJob - job by hot places';
        logEvent(analytics, 'screen_view' as string, {
            // screen_name: screenName as string,
            page_title: '/web_hotJob' as string,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux]);

    const getMoreJob = async () => {
        try {
            const result =
                typeJob === "new" ?
                    await postApi.getPostNewestV3(
                        null,
                        null,
                        // profile && profile?.profileLocations?.length > 0 &&
                        // profile?.profileLocations?.map((item: any) => {
                        //     return item.id
                        // }),
                        null,
                        null,
                        20,
                        null,
                        languageRedux === 1 ? 'vi' : 'en',
                    )
                    : typeJob === 'suggested' ?
                        await nearByApi.getNearByJob(
                            profile && profile?.profileLocations?.length > 0 &&
                            profile?.profileLocations?.map((item: any) => {
                                return item.province.id
                            }),
                            null,
                            null,
                            19,
                            null,
                            languageRedux === 1 ? 'vi' : 'en',
                        ) :
                        await postApi.getPostByThemeId(
                            templateId,
                            19,
                            null,
                            languageRedux === 1 ? 'vi' : 'en',
                        );

            setHasMore(true);

            if (result && result.data.length < 20) {
                setMoreJob(
                    typeJob === "new" ?
                        result.data :
                        result.data.posts
                );
                setHasMore(false);
                return;
            } else if (result.data && (result.data.length !== 0 || result.data.posts.length !== 0)) {
                setMoreJob(
                    typeJob === "new" ?
                        result.data :
                        result.data.posts
                );
                return;
            } else {
                setMoreJob([]);
                setHasMore(false);
            }

        } catch (error) {
            console.log(error);
        }
    };

    console.log('more job', moreJob);
    console.log('typeJob', typeJob);
    console.log('templateId', templateId);

    const fetchMoreData = async () => {
        try {
            const thersholdId = moreJob[moreJob.length - 1]?.id;
            const result = typeJob === "new" ?
                await postApi.getPostNewestV3(
                    null,
                    null,
                    // profile && profile?.profileLocations?.length > 0 &&
                    // profile?.profileLocations?.map((item: any) => {
                    //     return item.id
                    // }),
                    null,
                    null,
                    20,
                    thersholdId,
                    languageRedux === 1 ? 'vi' : 'en',
                ) : typeJob === 'suggested' ?
                    await nearByApi.getNearByJob(
                        profile && profile?.profileLocations?.length > 0 &&
                        profile?.profileLocations?.map((item: any) => {
                            return item.province.id
                        }),
                        null,
                        null,
                        19,
                        thersholdId,
                        languageRedux === 1 ? 'vi' : 'en',
                    ) :
                    await postApi.getPostByThemeId(
                        templateId,
                        19,
                        thersholdId,
                        languageRedux === 1 ? 'vi' : 'en',
                    )

            if (result && (result.data.length !== 0 || result.data.posts.length !== 0)) {
                typeJob === "new" ?
                    setMoreJob((prev: any) => [...prev, ...result?.data]) :
                    setMoreJob((prev: any) => [...prev, ...result?.data.posts]);
            } else {
                setHasMore(false);
                message.config({
                    top: 750,
                    duration: 2,
                    maxCount: 3,
                });
                message.error(languageRedux === 1 ? 'Không còn công việc để hiện thị' : 'No more job to show');
            }
        } catch (error) { }
    };

    React.useEffect(() => {
        getMoreJob();
        setLoading(true);
        setTimeout(() => {
            if (moreJob.length !== 0) {
                setLoading(false);
            } else {
                setLoading(false);
            }
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux, idFilterProvinces, profile, typeJob]);

    const [provincesData, setProvincesData] = React.useState<
        [
            {
                id: string;
                name: string;
                name_en: string;
                full_name: string;
                full_name_en: string;
                code_name: string;
                administrative_unit_id: number;
                administrative_region_id: number;
            },
        ]
    >();

    const getProvinces = async () => {
        try {
            const result = await locationApi.getAllProvinces(
                languageRedux === 1 ? 'vi' : 'en',
            );

            if (result) {
                setProvincesData(result.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const [optionsProvinces, setOptionsProvinces] = React.useState<
        SelectProps['options']
    >([]);

    React.useEffect(() => {
        if (provincesData) {
            const newOptionsProvinces = provincesData.map((provinces: any) => {
                if (languageRedux === 1) {
                    return {
                        value: provinces.id,
                        label: provinces.full_name,
                    };
                } else {
                    return {
                        value: provinces.id,
                        label: provinces.full_name_en,
                    };
                }
            });
            setOptionsProvinces(newOptionsProvinces);
        }
    }, [provincesData, languageRedux]);

    const handleChangeFilterHotjob = (value: string) => {
        // localStorage.setItem('filterHotjobProvince', value);
        // setCookie('filterHotjobProvince', value, 365);
        setIdFilterProvinces(value);
    };

    return (
        <>
            <Navbar />
            <CategoryDropdown />

            <div className="hot-job-page-container">
                {
                    // automatic && (
                    <Box sx={{ flexGrow: 1 }} ref={listRef}>
                        <div
                            style={{
                                display: 'flex',
                                // flexDirection: 'column',
                                margin: '20px 0',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                // background: '#aaaaaa',
                                padding: '8px 0',
                            }}
                        >
                            <div className="hot-job-title-container">
                                <h3>
                                    {typeJob === "new" ?
                                        language?.newest_jobs :
                                        typeJob === 'suggested' ?
                                            language?.nearby_jobs :
                                            language?.jobs_by_theme
                                    }
                                </h3>
                                {/* <div
                                    className="filter-moreJob"
                                    onClick={handleClickFilterHotjob}
                                >
                                    <div className="filter-provinces">
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Select
                                                size={'large'}
                                                // defaultValue={idFilterProvinces}
                                                onChange={handleChangeFilterHotjob}
                                                style={{ width: '220px' }}
                                                options={optionsProvinces}
                                                suffixIcon={
                                                    idFilterProvinces ? (
                                                        <LightFilterIcon width={20} height={20} />
                                                    ) : (
                                                        <FilterIcon width={20} height={20} />
                                                    )
                                                }
                                                placeholder={
                                                    languageRedux === 1
                                                        ? 'Lọc theo khu vực'
                                                        : 'Filter by Location'
                                                }
                                            />
                                        </Space>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {moreJob && moreJob.length > 0 ? (
                            <>
                                <InfiniteScroll
                                    dataLength={moreJob?.length}
                                    next={fetchMoreData}
                                    hasMore={hasMore}
                                    loader={
                                        <Spin style={{ width: '100%' }} indicator={antIcon} />
                                    }
                                    style={{ overflow: 'unset' }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        columns={{ xs: 6, sm: 4, md: 12 }}
                                    >
                                        {moreJob.map((item: any, index: number) => (
                                            <Skeleton loading={loading} active>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    key={index}
                                                >
                                                    {typeJob === "new" ? (
                                                        <JobCardMoreNewJob item={item} />
                                                    ) : (
                                                        <JobCardMoreJob item={item} />
                                                    )}
                                                </Grid>
                                            </Skeleton>
                                        ))}
                                    </Grid>
                                </InfiniteScroll>
                            </>
                        ) : (
                            <NoDataComponent />
                        )}
                        {/* <Backdrop
                            sx={{
                                color: '#0d99ff ',
                                backgroundColor: 'transparent',
                                zIndex: (theme: any) => theme.zIndex.drawer + 1,
                            }}
                            open={openBackdrop}
                        //  onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop> */}
                    </Box>
                    // )
                }
            </div>
            <ShowNotificativeSave />
            <ShowCancleSave />
            <RollTop />
            <Footer />
        </>
    );
};
export default React.memo(MoreJobsPage);
