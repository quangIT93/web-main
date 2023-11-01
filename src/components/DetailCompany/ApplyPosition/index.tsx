import { Box, Grid } from '@mui/material';
import { Skeleton, Spin } from 'antd';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import JobOfCompanyCard from '../JobOfCompanyCard';
import { LoadingOutlined } from '@ant-design/icons';

interface IApplyPosition {
    company: any;
}

const ApplyPosition: React.FC<IApplyPosition> = (props) => {
    const { company } = props;
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const language = useSelector((state: RootState) => state.dataLanguage.languages)
    const [companyJob, setCompanyJob] = useState<any>([1, 2, 3, 4])
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [page, setPage] = React.useState<any>('0');
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    console.log("application", 4);


    const getJobOfCompany = async () => {
        try {
            setLoading(true);

            //   const result = await postApi.getPostNewestV3(
            //           childCateloriesArray,
            //           // userSelectedId,
            //           userSelected.userSelectedId,
            //           // null,
            //           // null,
            //           // profile && profile?.profileLocations?.length > 0 &&
            //           profile.length !== 0 ? profile?.profileLocations : null,
            //           profile.length !== 0
            //             ? profile?.profileLocations[0]?.province?.id
            //             : null,
            //           // null,
            //           20,
            //           null,
            //           languageRedux === 1 ? 'vi' : 'en',
            //         );

            setHasMore(true);
            //   if (result) {
            //     setLoading(false);
            //       if (result.data.length < 20) {
            //         setCompanyJob(result.data);
            //         setHasMore(false);
            //         setOpenBackdrop(false);
            //         return;
            //       }

            //     if (result.data.length < 20) {
            //       setCompanyJob(result.data);
            //       setHasMore(false);
            //       setOpenBackdrop(false);
            //       return;
            //     } else if (
            //       result.data &&
            //       (result.data.length)
            //     ) {
            //       setCompanyJob(result.data);
            //       setOpenBackdrop(false);
            //       return;
            //     } else {
            //       setCompanyJob([]);
            //       setHasMore(false);
            //       setOpenBackdrop(false);
            //     }
            //   }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoreData = async () => {
        try {
            const nextPage = parseInt(page) + 1;
            // const url = localStorage.getItem('hotjobApi');

            //   let result: any = await hotJobApi.getHotJobById(
            //     `/v3/posts/topic/${searchParams.get('hotjob-id')}?a=394,370`,
            //     nextPage,
            //     searchParams.get('hotjob-type') === '1' ? 18 : 20,
            //     languageRedux === 1 ? 'vi' : 'en',
            //     // idFilterProvinces && provinceId,
            //     // idFilterProvinces,
            //     !idFilterProvinces && profileV3.length !== 0
            //       ? profileV3.addressText.id
            //       : idFilterProvinces
            //       ? idFilterProvinces
            //       : '79',
            //   );

            //   if (result && result.data.length !== 0) {
            //     setCompanyJob((prev: any) => [...prev, ...result?.data]);
            //     setPage(nextPage);
            //   } else {
            //     setHasMore(false);
            //     setPage('0');
            //   }
        } catch (error) {
            console.log('error', error);
        }
    };

    React.useEffect(() => {
        getJobOfCompany();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux]);

    return (
        <div className="apply-position-container">
            <div className="apply-position-content">
                {/* <InfiniteScroll
                    dataLength={companyJob?.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
                    style={{ overflow: 'unset' }}
                > */}
                <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
                    {companyJob.map((item: any, index: number) => (
                        // <Skeleton loading={loading} active key={index}>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                            key={index}
                        >
                            <JobOfCompanyCard item={item} />
                        </Grid>
                        // </Skeleton>
                    ))}
                </Grid>
                {/* </InfiniteScroll> */}
            </div>
        </div>
    )
}

export default ApplyPosition;