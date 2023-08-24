import React, { useEffect, FormEvent, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { Spin } from 'antd';
import { message } from 'antd';
import { Space } from 'antd';
import RollTop from '#components/RollTop';
import { Stack } from '@mui/material';
// import component
// @ts-ignore
import InfiniteScroll from "react-infinite-scroll-component";
import {
    EysIcon,
    CommentIcon,
    LikeIcon,
    FilterComunity,
    MoreICon
} from '#components/Icons';
import { LoadingOutlined } from '@ant-design/icons';
// @ts-ignore

import { Navbar } from '#components';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import './style.scss';
import communityApi from 'api/apiCommunity';

import HijobNewsCard from '#components/Community/HijobNewsCard';

const ComunityNews = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const [openMenu, setOpenMenu] = React.useState(false);
    const footerRef = React.useRef<any>(null);
    const [language, setLanguage] = React.useState<any>();
    const [hijobNews, setHijobNews] = React.useState<any>([]);
    const [page, setPage] = React.useState<any>("0");
    const [isVisible, setIsVisible] = React.useState(true);
    const [sort, setSort] = React.useState('');
    const [hasMore, setHasMore] = React.useState(true);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    console.log("hijobNews", hijobNews);


    const fetchMoreData = async () => {
        const nextPage = (parseInt(page) + 1).toString()
        const result = await communityApi.getCommunityNews(nextPage, "10", sort, 1);

        //
        if (result && result?.data?.length !== 0) {
            setHijobNews((prev: any) => [...prev, ...result?.data]);
            setPage(nextPage);
        } else {
            setHasMore(false);
            setPage("0");
            message.error("Đã hết bài viết");
            setIsVisible(false);
            // console.log('da het data', result);
        }
    };

    const handleSortBy = (sortString: string) => {
        //cm: comment, l: likes, v: views
        if (sort == sortString) {
            setSort('');
            // console.log(sort);
        } else {
            setHasMore(true)
            setSort(sortString);
        }
    }

    const handleGetAllHijobNews = async () => {
        try {
            const result = await communityApi.getCommunityNews(page, "10", sort, 0);
            if (result) {
                console.log(result?.data);
                setHijobNews(result?.data);
                if (result?.data?.length < 10) {
                    setIsVisible(false);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleGetAllHijobNews()
        setHasMore(true);
    }, [sort])

    const handleChange = async () => {
        const nextPage = (parseInt(page) + 1).toString()
        const result = await communityApi.getCommunityNews(nextPage, "10", sort, 0);

        //
        if (result && result?.data?.length !== 0) {
            setHijobNews((prev: any) => [...prev, ...result?.data]);
            setPage(nextPage);
        } else {
            setPage("0");
            message.error("da het data");
            setIsVisible(false);
            // console.log('da het data', result);
        }

    };

    const getlanguageApi = async () => {
        try {
            const result = await languageApi.getLanguage(
                languageRedux === 1 ? "vi" : "en"
            );
            if (result) {
                setLanguage(result.data);
                // setUser(result);
            }
        } catch (error) {
            // setLoading(false);
        }
    };

    React.useEffect(() => {
        getlanguageApi()
    }, [languageRedux])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (footerRef.current && !footerRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="comunity-news-container">
            <Navbar />
            <div className="comunity-news-content">
                <div className="comunityPostNews">
                    <div className="title-comunity-news">
                        <h3>Hôm nay, HiJob có 10 bài viết mới</h3>
                        <div className="title-comunity-news_icon">
                            <div className="dropdown dropdown-4" ref={footerRef} onClick={() => setOpenMenu(!openMenu)}>
                                <FilterComunity />
                                <ul className="dropdown_menu dropdown_menu-4" >
                                    <li className={sort !== '' && sort == 'l' ?
                                        "dropdown_item-1  active"
                                        : "dropdown_item-1"}
                                        style={{ display: openMenu ? "flex" : "none" }}
                                        onClick={() => { handleSortBy('l') }}>
                                        <LikeIcon />
                                        <p>
                                            {
                                                language?.history_page?.likes
                                            }
                                        </p>
                                    </li>
                                    <li className={sort !== '' && sort == 'v' ?
                                        "dropdown_item-2  active"
                                        : "dropdown_item-2"}
                                        style={{ display: openMenu ? "flex" : "none" }}
                                        onClick={() => { handleSortBy('v') }}>
                                        <EysIcon />
                                        <p>
                                            {
                                                language?.history_page?.views
                                            }
                                        </p>
                                    </li>
                                    <li className={sort !== '' && sort == 'cm' ?
                                        "dropdown_item-3  active"
                                        : "dropdown_item-3"}
                                        style={{ display: openMenu ? "flex" : "none" }}
                                        onClick={() => { handleSortBy('cm') }}>
                                        <CommentIcon />
                                        <p>
                                            {
                                                language?.history_page?.comments
                                            }
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            {/* <EditComunity /> */}
                        </div>
                    </div>
                    <InfiniteScroll
                        dataLength={hijobNews?.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
                    >
                        {
                            hijobNews?.map((item: any, index: any) => (
                                <HijobNewsCard item={item} index={index} />
                            ))
                        }
                    </InfiniteScroll>
                    {/* {
                        hijobNews && hijobNews.map((item: any, index: any) => (
                            <HijobNewsCard item={item} index={index} />
                        ))
                    } */}

                </div>
                {/* <Stack
                    spacing={2}
                    sx={{
                        display: isVisible ? 'flex' : "none",
                        alignItems: 'center',
                        margin: '24px 0',
                    }}
                >
                    <Space
                        className="div-hover-more"
                        onClick={handleChange}
                    >
                        <p>
                            {
                                language?.more
                            }
                        </p>
                        <MoreICon width={20} height={20} />
                    </Space>
                </Stack> */}
            </div>
            <RollTop />
            <Footer />
        </div >
    );
};

export default ComunityNews;
