import React from 'react';

import {
    EysIcon,
    CommentIcon,
    LikeIcon,
    EditComunity,
    FilterComunity,
    SaveIconOutline,
    SaveIconFill,
    SettingIcon,
} from '#components/Icons';
import { Box, Typography, MenuItem, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message } from 'antd';
import languageApi from 'api/languageApi';
import './style.scss'
import communityApi from 'api/apiCommunity';
import moment from 'moment';
const CardListBlogCreate = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const [showText, setShowText] = React.useState('');
    const [openMenu, setOpenMenu] = React.useState(false);
    const [page, setPage] = React.useState<any>("0");
    const [sort, setSort] = React.useState('');
    const [createdPost, setCreatedPost] = React.useState<any>();
    const [isVisible, setIsVisible] = React.useState(true);
    const [uploading, setUploading] = React.useState(false);

    const handleGetCreatedPost = async () => {
        try {
            const result = await communityApi.getCommunityByAccount(
                page, "10", sort
            )
            if (result) {
                setCreatedPost(result?.data);
                if (result?.data?.length < 10) {
                    setIsVisible(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleMoveToEdit = (id: any, e: any) => {
        e.stopPropagation();
        window.open(`/comunity_create_post?post-community=${id}`, '_parent');
    }

    const handleMoveToDetail = (id: any) => {
        window.open(`/detail-comunity?post-community=${id}&type=1`, '_parent');
    }

    React.useEffect(() => {
        handleGetCreatedPost();
    }, [sort])

    const handleAddText = () => {
        setShowText('showText');
    };

    const footerRef = React.useRef<any>(null);
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

    React.useEffect(() => {
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

    const handleChange = async () => {
        try {
            setUploading(true)
            const nextPage = (parseInt(page) + 1).toString()
            const result = await communityApi.getCommunityByAccount(nextPage, "10", sort);

            //
            if (result && result?.data?.length !== 0) {
                setUploading(false);
                setCreatedPost((prev: any) => [...prev, ...result?.data]);
                setPage(nextPage);
            } else {
                setPage("0");
                message.error("da het data");
                setIsVisible(false);
                // console.log('da het data', result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleMoveToCreate = () => {
        window.open('/comunity_create_post', '_parent')
    }

    const handleSortBy = (sort: string) => {
        //cm: comment, l: likes, v: views
        setSort(sort);
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                className="list-blog-create-box"
            >
                <div className="back-container">
                    <Typography
                        sx={{
                            fontWeight: '600',
                            fontSize: '16px',
                            lineHeight: '24px',
                        }}
                    >
                        {
                            language?.history_page?.posts_created
                        }
                    </Typography>
                </div>
                <div className="title-comunity_icon">
                    <div className="dropdown dropdown-4" ref={footerRef} onClick={() => setOpenMenu(!openMenu)}>
                        <FilterComunity />
                        <ul className="dropdown_menu dropdown_menu-4">
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
                    <div className="create-community-post" onClick={handleMoveToCreate}>
                        <EditComunity />
                    </div>
                </div>
            </Box>
            <div className="list-blog-create-data">
                {createdPost && createdPost.map((item: any, index: any) => (
                    <div className="community-content-body_item" key={index}
                        onClick={() => handleMoveToDetail(item?.id)}
                    >
                        <div className="community-content-body-item_top">
                            <div className="body-item-title">
                                <h3>{item?.title}</h3>
                                <div className="title-icon" onClick={(e) => handleMoveToEdit(item?.id, e)}>
                                    <SettingIcon />
                                </div>
                            </div>
                            <p>
                                {
                                    item?.createdAtText ? item?.createdAtText :
                                        new Date(item?.createdAt).toLocaleDateString('en-GB') + ', ' +
                                        moment(new Date(item?.createdAt)).format('HH:mm')
                                }
                            </p>
                        </div>
                        <div className="body-item-actions">
                            <div className="action-item">
                                <EysIcon />
                                <p>{item?.totalViews}</p>
                            </div>
                            <div className="action-item">
                                <LikeIcon />
                                <p>{item?.totalLikes}</p>
                            </div>
                            <div className="action-item">
                                <CommentIcon />
                                <p>{item?.totalComments}</p>
                            </div>
                        </div>
                    </div>
                ))}
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
                            backgroundColor: `#0D99FF`,
                            marginBottom: '2rem',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            display: isVisible ? 'block' : 'none',
                        }}
                        loading={uploading}
                        onClick={handleChange}
                    >
                        {language?.more}
                    </Button>
                </Box>
            </div>
        </>
    )
}

export default CardListBlogCreate;