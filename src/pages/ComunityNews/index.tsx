import React, { useEffect, FormEvent, useState } from 'react';
import Footer from '../../components/Footer/Footer';

import { message } from 'antd';
import { Space } from 'antd';
import RollTop from '#components/RollTop';
import { Stack } from '@mui/material';
// import component

import {
    EysIcon,
    CommentIcon,
    LikeIcon,
    FilterComunity,
    MoreICon
} from '#components/Icons';

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
    const [hijobNews, setHijobNews] = React.useState<any>();
    const [page, setPage] = React.useState<any>("0");
    const [isVisible, setIsVisible] = React.useState(true);
    const [sort, setSort] = React.useState('');

    const handleSortBy = (sort: string) => {
        //cm: comment, l: likes, v: views
        setSort(sort);
    }

    const handleGetAllHijobNews = async () => {
        try {
            const result = await communityApi.getCommunitations(page, "9", sort, 0);
            if (result) {
                setHijobNews(result?.data?.communications);
                if (result?.data?.communications?.length < 10) {
                    setIsVisible(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleGetAllHijobNews()
    }, [sort])

    const handleChange = async () => {
        const nextPage = (parseInt(page) + 1).toString()
        const result = await communityApi.getCommunitations(nextPage, "9", sort, 0);

        //
        if (result && result?.data?.communications?.length !== 0) {
            setHijobNews((prev: any) => [...prev, ...result?.data?.communications]);
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
                                    <li className="dropdown_item-1" style={{ display: openMenu ? "flex" : "none" }}
                                        onClick={() => { handleSortBy('l') }}>
                                        <LikeIcon />
                                        <p>
                                            {
                                                language?.history_page?.likes
                                            }
                                        </p>
                                    </li>
                                    <li className="dropdown_item-2" style={{ display: openMenu ? "flex" : "none" }}
                                        onClick={() => { handleSortBy('v') }}>
                                        <EysIcon />
                                        <p>
                                            {
                                                language?.history_page?.views
                                            }
                                        </p>
                                    </li>
                                    <li className="dropdown_item-3" style={{ display: openMenu ? "flex" : "none" }}
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
                    {
                        hijobNews && hijobNews.map((item: any, index: any) => (
                            <HijobNewsCard item={item} index={index} />
                        ))
                    }

                </div>
                <Stack
                    spacing={2}
                    sx={{
                        display: isVisible ? 'flex' : "none",
                        alignItems: 'center',
                        margin: '24px 0',
                    }}
                >
                    {/* <Pagination count={10} shape="rounded" /> */}
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
                </Stack>
            </div>
            <RollTop />
            <Footer />
        </div >
    );
};

export default ComunityNews;
