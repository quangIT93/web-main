import React, { useEffect } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { UserOutlined } from '@ant-design/icons';
// import moment, { Moment } from 'moment';

// import { Collapse } from 'antd';
import { Avatar, Space, message } from 'antd';
// import component
import { Stack } from '@mui/material';
import {
    EysIcon,
    CommentIcon,
    LikeIcon,
    EditComunity,
    FilterComunity,
    MoreICon
} from '#components/Icons';

// @ts-ignore

import { Navbar } from '#components';
import RollTop from '#components/RollTop';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import './style.scss';
import communityApi from 'api/apiCommunity';

import WorkingStoryCard from '#components/Community/WorkingStoryCard';

// const { Panel } = Collapse;

const Comunity = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const [showText, setShowText] = React.useState('');
    const [openMenu, setOpenMenu] = React.useState(false);
    const [stories, setStories] = React.useState<any>();
    const [page, setPage] = React.useState<any>("0");
    const [isVisible, setIsVisible] = React.useState(true);

    const handleGetAllWorkingStory = async () => {
        try {
            const result = await communityApi.getCommunitations(page, "9", "", 1);
            if (result) {
                setStories(result?.data?.communications);
                if (result?.data?.communications?.length < 10) {
                    setIsVisible(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleGetAllWorkingStory();
    }, [])

    console.log("stories,", stories);

    const handleChange = async () => {
        const nextPage = (parseInt(page) + 1).toString()
        const result = await communityApi.getCommunitations(nextPage, "9", "", 1);

        //
        if (result && result?.data?.communications?.length !== 0) {
            setStories((prev: any) => [...prev, ...result?.data?.communications]);
            setPage(nextPage);
        } else {
            setPage("0");
            message.error("da het data");
            setIsVisible(false);
            // console.log('da het data', result);
        }
    };


    const handleAddText = () => {
        setShowText('showText');
    };
    const [language, setLanguage] = React.useState<any>();

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
    const footerRef = React.useRef<any>(null);

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

    const handleClickItemMenu = () => {
        console.log("hello")
    }

    console.log(openMenu);

    return (
        <div className="comunity-container">
            <Navbar />
            <div className="comunity-content">
                <div className="comunityPostNew">
                    <div className="title-comunity">
                        <h3>Hôm nay, HiJob có 10 bài viết mới</h3>
                        <div className="title-comunity_icon">
                            <div className="dropdown dropdown-4" ref={footerRef} onClick={() => setOpenMenu(!openMenu)}>
                                <FilterComunity />
                                <ul className="dropdown_menu dropdown_menu-4">
                                    <li className="dropdown_item-1" style={{ display: openMenu ? "flex" : "none" }}>
                                        <LikeIcon />
                                        <p>
                                            {
                                                language?.history_page?.likes
                                            }
                                        </p>
                                    </li>
                                    <li className="dropdown_item-2" style={{ display: openMenu ? "flex" : "none" }}>
                                        <EysIcon />
                                        <p>
                                            {
                                                language?.history_page?.views
                                            }
                                        </p>
                                    </li>
                                    <li className="dropdown_item-3" style={{ display: openMenu ? "flex" : "none" }}>
                                        <CommentIcon />
                                        <p>
                                            {
                                                language?.history_page?.comments
                                            }
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <EditComunity />
                        </div>
                    </div>

                    {
                        stories && stories.map((item: any, index: any) => (
                            <WorkingStoryCard
                                item={item}
                                index={index}
                                showText={showText}
                                handleAddText={handleAddText}
                            />
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
        </div>
    );
};

export default Comunity;
