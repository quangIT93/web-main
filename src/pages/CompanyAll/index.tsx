import React, { useEffect, useState } from 'react';
// @ts-ignore

// import ant
import { Button, Cascader, Divider, Typography, Spin } from 'antd';
import { RootState } from '../../store/reducer/index';
// import component
// import css
import './style.scss';

// import antIcon
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
// scroll data
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import SearchLocationCompany from '#components/Company/SearchLocationCompany';
import SearchSizeCompany from '#components/Company/SearchSizeCompany';
import CompanyCard from '#components/Company/CompanyCard';
import SearchCateCompany from '#components/Company/SearchCateCompany';


const CompanyAll = () => {
    const [listData, setListData] = useState<any>([1, 2, 3, 4, 5, 6, 7, 8]);
    const [addresses, setAddresses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [size, setSize] = useState<number | undefined>();
    const [page, setPage] = React.useState<any>('0');
    const [reset, setReset] = useState(false);
    const [total, setTotal] = useState(0);

    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );

    const [hasMore, setHasMore] = React.useState(true);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

    const getAllCompany = async () => {
        // try {
        //     setHasMore(true);
        //     const result = await candidateSearch.getCandidates(
        //         addresses,
        //         categories,
        //         educations,
        //         18,
        //         page,
        //         languageRedux === 1 ? 'vi' : 'en',
        //     );
        //     if (result) {
        //         setTotal(result.data.total);
        //         setListData(result.data.cvFilters);
        //         if (result.data.cvFilters.length < 18) {
        //             setHasMore(false);
        //             setPage('0');
        //         } else if (result.data.cvFilters.length === 0) {
        //             setHasMore(false);
        //             setPage('0');
        //         } else {
        //             setHasMore(true);
        //         }
        //     }
        // } catch (error) { }
    };
    React.useEffect(() => {
        getAllCompany();
    }, [languageRedux]);

    const [messageApi, contextHolder] = message.useMessage();
    const handleSubmitSearchCompany = async () => {
        console.log("addresses", addresses);
        console.log("categories", categories);
        console.log("size", size);

        // try {
        //     const result = await candidateSearch.getCandidates(
        //         addresses,
        //         categories,
        //         educations,
        //         19,
        //         page,
        //         'vi',
        //     );
        //     setPage('0');
        //     if (result) {
        //         setTotal(result.data.total);
        //         setListData(result.data.cvFilters);
        //         if (result.data.cvFilters.length < 18) {
        //             setHasMore(false);
        //             setPage('0');
        //         } else if (result.data.cvFilters.length === 0) {
        //             setHasMore(false);
        //             setPage('0');
        //         } else {
        //             setHasMore(true);
        //         }
        //     }
        // } catch (error) {
        //     console.log('error', error);
        //     message.error('Lỗi server!');
        //     return;
        // }
    };

    const handleResetSearchCandidate = () => {
        setAddresses([]);
        setCategories([]);
        setSize(undefined);
        setReset(true);
    };

    const fetchMoreData = async () => {
        try {
            const nextPage = parseInt(page) + 1;
            // const url = localStorage.getItem('hotjobApi');
            // const result = await candidateSearch.getCandidates(
            //     addresses,
            //     categories,
            //     educations,
            //     19,
            //     nextPage,
            //     languageRedux === 1 ? 'vi' : 'en',
            // );
            // if (result && result.data.cvFilters.length !== 0) {
            //     setListData((prev: any) => [...prev, ...result?.data.cvFilters]);
            //     setPage(nextPage);
            // } else {
            //     setHasMore(false);
            //     setPage('0');
            // }
        } catch (error) { }
    };
    const analytics: any = getAnalytics();
    React.useEffect(() => {
        // Cập nhật title và screen name trong Firebase Analytics
        // document.title =
        //   language?.company_page?.title_page;
        document.title =
            languageRedux === 1
                ? 'Hijob - Tìm kiếm công ty'
                : 'Hijob - Search for company';
        logEvent(analytics, 'screen_view' as string, {
            // screen_name: screenName as string,
            page_title: '/list-company' as string,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux]);

    return (
        <div className="company-all-container">
            {contextHolder}
            <div className="company">
                <div className="header-company">
                    <h3>
                        {languageRedux === 1
                            ? 'Tìm kiếm công ty'
                            : 'Looking company'}
                    </h3>
                    {/* <Button
                        type="primary"
                        onClick={() => window.open(`/history?company=4`, '_parent')}
                    >
                        {languageRedux === 1
                            ? 'Danh sách ứng viên đã lưu'
                            : 'Saved company list'}
                    </Button> */}
                </div>
                <div className="search-company">
                    <p>
                        {languageRedux === 1
                            ? 'Tìm công ty phù hợp với bạn!'
                            : 'Find the company for your job!'}
                    </p>
                    <div className="list-search">
                        {/* <div className="list-search_top">
            </div>
              */}
                        <div className="list-search-filter">

                            <SearchLocationCompany
                                setAddresses={setAddresses}
                                setReset={setReset}
                                reset={reset}
                                addresses={addresses}
                            />
                            <SearchCateCompany
                                setCategories={setCategories}
                                setReset={setReset}
                                reset={reset}
                                categories={categories}
                            />
                            <SearchSizeCompany
                                setSize={setSize}
                                setReset={setReset}
                                reset={reset}
                            />
                        </div>
                        <div className="submit-search">
                            <div
                                className="submit-seach_button seach-button_Confirm"
                                onClick={handleSubmitSearchCompany}
                            >
                                {languageRedux === 1 ? 'Xác nhận' : 'Confirm'}
                            </div>

                            <div
                                className="submit-seach_button seach-button_Reset"
                                onClick={handleResetSearchCandidate}
                            >
                                {languageRedux === 1 ? 'Đặt lại' : 'Reset'}
                            </div>
                        </div>
                        {/* <div className="list-search_bottom"></div> */}
                    </div>
                </div>
                <div className="list-candidates">
                    <div className="list-candidates_title">
                        <h3>
                            {languageRedux === 1 ? 'Kết quả tìm kiếm:' : 'Found results:'}
                            <span>
                                {` ${total}`}
                                {languageRedux === 1 ? ' công ty' : ' company'}
                            </span>
                        </h3>
                    </div>
                    {/* <InfiniteScroll
                        dataLength={listData && listData?.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
                        style={{ overflow: 'unset' }}
                    > */}
                    <div className="list-company">
                        {listData?.map((item: any) => {
                            return <CompanyCard item={item} />;
                        })}
                    </div>
                    {/* </InfiniteScroll> */}
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default CompanyAll;
