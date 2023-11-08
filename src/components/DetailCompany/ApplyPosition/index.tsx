import { Box, Grid } from '@mui/material';
import { Skeleton, Spin, message } from 'antd';
import React, { memo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import JobOfCompanyCard from '../JobOfCompanyCard';
import { LoadingOutlined } from '@ant-design/icons';
import apiCompanyV3 from 'api/apiCompanyV3';

interface IApplyPosition {
    postOfCompany: any;
    setPostOfCompany: React.Dispatch<React.SetStateAction<any>>;
    page: any;
    setPage: React.Dispatch<React.SetStateAction<any>>;
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
    companyId: any;
    accountId: any;
}

const ApplyPosition: React.FC<IApplyPosition> = (props) => {
    const {
        postOfCompany,
        setPostOfCompany,
        hasMore,
        setHasMore,
        page,
        setPage,
        companyId,
        accountId } = props;
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const language = useSelector((state: RootState) => state.dataLanguage.languages)
    const [loading, setLoading] = React.useState(false);
    // const [hasMore, setHasMore] = React.useState(true);
    // const [page, setPage] = React.useState<any>('0');
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const fetchMoreData = async () => {
        try {
            const nextPage = parseInt(page) + 1;
            const result = await apiCompanyV3.getPostOfCompany(
                companyId,
                nextPage,
                20,
                languageRedux === 1 ? 'vi' : 'en'
            )

            if (result && result.data.length !== 0) {
                setPostOfCompany((prev: any) => [...prev, ...result?.data?.posts]);
                setPage(nextPage);
            } else {
                setHasMore(false);
                setPage('0');
                message.error(
                    languageRedux === 1 ?
                        "Không còn công việc để xem" :
                        "No more jobs available"
                )
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    React.useEffect(() => {
        // getJobOfCompany();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux]);

    return (
        <div className="apply-position-container">
            <div className="apply-position-content">
                <InfiniteScroll
                    dataLength={postOfCompany?.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
                    style={{ overflow: 'unset' }}
                >
                    <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
                        {postOfCompany.map((item: any, index: number) => (
                            <Skeleton loading={loading} active key={index}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    key={index}
                                >
                                    <JobOfCompanyCard item={item} accountId={accountId} />
                                </Grid>
                            </Skeleton>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default memo(ApplyPosition);