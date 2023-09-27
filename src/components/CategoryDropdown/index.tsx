import React, { useContext, useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Box, Button, Collapse } from '@mui/material';
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { ArrowIcon, IconMenu } from '#components/Icons';
import DropdownRender from './DropdownRender';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
const titleContainer: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
};
const title: React.CSSProperties = {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#000000'
};
const label: React.CSSProperties = {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 400,
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#000000'
};

const CategoryDropdown: React.FC = () => {
    const dropdownRef = React.useRef<HTMLUListElement | null>(null);
    const {
        openCategoryDropdown,
        setOpenCategoryDropdown,
    }:
        {
            openCategoryDropdown: boolean;
            setOpenCategoryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
        } = useContext(HomeValueContext);

    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const location = useLocation();
    const [expand, setExpand] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(false);

    const updateWindowWidth = () => {
        if (window.innerWidth > 560) {
            setWindowWidth(true);
            setExpand([1, 2, 3, 4])
        } else {
            setWindowWidth(false);
            setExpand([])
        }
    };

    useEffect(() => {
        updateWindowWidth();
    }, []);

    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        if (currentWidth > 560) {
            setWindowWidth(true);
            setExpand([1, 2, 3, 4])
        } else {
            setWindowWidth(false);
            setOpen(true);
            setExpand([])
        }
        // console.log('Current window width:', currentWidth);
    });

    const handleExpand = (id: any) => {
        if (expand.includes(id)) {
            setExpand(
                expand.filter((item: any) => {
                    return item !== id;
                }),
            );
            return
        }
        setExpand((prev: any) => [...prev, id]);
        setOpen(!open);
    }

    const moveToSaveJob = () => {
        window.open('/history?saved_jobs=1', '_parent')
    }

    const moveToNewestJob = () => {
        if (location?.pathname === '/') {
            const newestJob = document.querySelector('.new-job');

            if (newestJob) {
                // setReachedEndShowSubjectJob(true);
                document.querySelector('.new-job')?.scrollIntoView({
                    // behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                });
            }
        } else {
            localStorage.setItem('home', 'new');
            window.open('/', '_parent')
        }

    }
    const moveToHotJob = () => {
        if (location?.pathname === '/') {
            const hotJob = document.querySelector('.hot-job-container');

            if (hotJob) {
                // setReachedEndShowSubjectJob(true);
                document.querySelector('.hot-job-container')?.scrollIntoView({
                    // behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                });
            }
        } else {
            localStorage.setItem('home', 'hot');
            window.open('/', '_parent')
        }

    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            type: 'group',
            label:
                <div style={titleContainer}>
                    <h3 style={title}>
                        {languageRedux === 1 ?
                            "Thông tin việc làm" :
                            "Job information"}
                    </h3>
                    <ArrowIcon fill='black' />
                </div>
            ,
            children: [
                {
                    key: '1-1',
                    label: <a style={label} target="_parent" rel="noopener noreferrer" href="/history">
                        {
                            languageRedux === 1 ?
                                "Việc làm đã ứng tuyển" :
                                "Apllied Jobs"
                        }
                    </a>,
                },
                {
                    key: '1-2',
                    label: <a style={label} onClick={moveToSaveJob}>
                        {
                            languageRedux === 1 ?
                                "Việc làm đã lưu" :
                                "Saved jobs"
                        }
                    </a>,
                },
                {
                    key: '1-3',
                    label: <a style={label} onClick={moveToNewestJob}>
                        {
                            languageRedux === 1 ?
                                "Công việc mới nhất" :
                                "Newest jobs"
                        }
                    </a>,
                },
                {
                    key: '1-4',
                    label: <a style={label} onClick={moveToHotJob}>
                        {
                            languageRedux === 1 ?
                                "Công việc nổi bật" :
                                "Hot jobs"
                        }
                    </a>,
                },
                {
                    key: '1-5',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Công việc theo chủ đề" :
                                "Job by hot places"
                        }
                    </a>,
                },
                {
                    key: '1-6',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Công việc gợi ý" :
                                "Suggested jobs"
                        }
                    </a>,
                },
            ],
        },
        {
            key: '2',
            type: 'group',
            label:
                <div style={titleContainer}>
                    <h3 style={title}>
                        {languageRedux === 1 ?
                            "Hồ sơ & CV" :
                            "Resume & CV"}
                    </h3>
                    <ArrowIcon fill='black' />
                </div>
            ,
            children: [
                {
                    key: '2-1',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="/history">
                        {
                            languageRedux === 1 ?
                                "Tạo mới CV" :
                                "Create a new CV"
                        }
                    </a>,
                },
                {
                    key: '2-2',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Quản lý CV" :
                                "CV management"
                        }
                    </a>,
                },
                {
                    key: '2-3',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Hướng dẫn tạo CV" :
                                "Instructions for creating a CV"
                        }
                    </a>,
                },
            ],
        },
        {
            key: '3',
            type: 'group',
            label:
                <div style={titleContainer}>
                    <h3 style={title}>
                        {languageRedux === 1 ?
                            "Cộng đồng HiJob" :
                            "HiJob Community"}
                    </h3>
                    <ArrowIcon fill='black' />
                </div>
            ,
            children: [
                {
                    key: '3-1',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="/history">
                        {
                            languageRedux === 1 ?
                                "Câu chuyện làm việc HiJob" :
                                "HiJob Working story"
                        }
                    </a>,
                },
                {
                    key: '3-2',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Tin tức HiJob" :
                                "HiJob News"
                        }
                    </a>,
                },
                {
                    key: '3-3',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Đăng bài viết mới" :
                                "Post new articles"
                        }
                    </a>,
                },
                {
                    key: '3-4',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Bài viết đã lưu" :
                                "Saved post"
                        }
                    </a>,
                },
            ],
        },
        {
            key: '4',
            type: 'group',
            label:
                <div style={titleContainer}>
                    <h3 style={title}>
                        {languageRedux === 1 ?
                            "Hỗ trợ khách hàng" :
                            "Customer support"}
                    </h3>
                    <ArrowIcon fill='black' />
                </div>
            ,
            children: [
                {
                    key: '4-1',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="/history">
                        {
                            languageRedux === 1 ?
                                "Chính sách bảo mật" :
                                "Privacy Policy"
                        }
                    </a>,
                },
                {
                    key: '4-2',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Điều khoản hỗ trợ" :
                                "Support terms"
                        }
                    </a>,
                },
                {
                    key: '4-3',
                    label: <a style={label} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {
                            languageRedux === 1 ?
                                "Hướng dẫn thành viên" :
                                "Member Guide"
                        }
                    </a>,
                },
            ],
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenCategoryDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`${openCategoryDropdown ? 'show-dropdown' : ''
            }`}>
            <Box
                ref={dropdownRef}
                sx={{
                    // maxWidth: { xs: 320, sm: 480, lg: 1320, xl: 1420, md: 720 },
                    padding: '0 24px',
                    boxShadow: '0px 1px 3px #aaa',
                    zIndex: '10',
                    position: 'fixed',
                    width: '100%',
                    left: '0',
                    right: '0',
                    top: '70px',
                    background: '#ffffff',
                }}
                className="category-dropdown-container"
            >
                <div className="category-dropdown-content"
                    style={{
                        maxWidth: location?.pathname === '/' ? '1280px' : '1080px',
                    }}
                >
                    <div className="category-dropdown-left" onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}>
                        <IconMenu />
                        {/* <Dropdown
                        menu={{
                            items,
                            selectable: true,
                        }}
                        trigger={['click']}
                        arrow={false}
                        dropdownRender={(menu) => {
                            return (
                                <DropdownRender menu={menu} />
                            )
                        }}
                    >
                        <h3 onClick={(e) => e.preventDefault()}>
                            {
                                languageRedux === 1 ?
                                    "Danh mục HiJob" :
                                    "HiJob Category"
                            }
                        </h3>
                    </Dropdown> */}
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Danh mục HiJob" :
                                    "HiJob Category"
                            }
                        </h3>
                    </div>
                    <div className="category-dropdown-line"></div>
                    <div className="category-dropdown-right">
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Thông tin việc làm" :
                                    "Job information"
                            }
                        </h3>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Hồ sơ & CV" :
                                    "Resume & CV"
                            }
                        </h3>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Cộng đồng HiJob" :
                                    "HiJob Community"
                            }
                        </h3>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Hỗ trợ khách hàng" :
                                    "Customer support"
                            }
                        </h3>
                    </div>
                </div>
                <Collapse
                    in={openCategoryDropdown}
                    // sx={collapseCssFilter}
                    sx={
                        location.pathname === '/'
                            ? { maxWidth: '1280px' }
                            : { maxWidth: '1080px' }
                    }
                    className="category-dropdown-collapse"
                >
                    <div className="category-dropdown-wraps">
                        <div className='category-dropdown-item'>
                            <div className='top-item' onClick={() => handleExpand(1)}>
                                <h3 >
                                    {languageRedux === 1 ?
                                        "Thông tin việc làm" :
                                        "Job information"}
                                </h3>
                                <ArrowIcon fill='black' />
                            </div>
                            <div className='bot-item'
                                style={{
                                    height: expand.includes(1) ? 'unset' : 0,
                                    overflow: expand.includes(1) ? 'unset' : 'hidden',
                                    marginTop: expand.includes(1) ? '16px' : '0px'
                                }}
                            >
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Việc làm đã ứng tuyển" :
                                            "Apllied Jobs"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Việc làm đã lưu" :
                                            "Saved jobs"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Công việc mới nhất" :
                                            "Newest jobs"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Công việc nổi bật" :
                                            "Hot jobs"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Công việc theo chủ đề" :
                                            "Job by hot places"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Công việc gợi ý" :
                                            "Suggested jobs"
                                    }
                                </h3>
                            </div>
                        </div>
                        <div className='category-dropdown-item'>
                            <div className='top-item' onClick={() => handleExpand(2)}>
                                <h3 >
                                    {languageRedux === 1 ?
                                        "Hồ sơ & CV" :
                                        "Resume & CV"}
                                </h3>
                                <ArrowIcon fill='black' />
                            </div>
                            <div className='bot-item'
                                style={{
                                    height: expand.includes(2) ? 'unset' : 0,
                                    overflow: expand.includes(2) ? 'unset' : 'hidden',
                                    marginTop: expand.includes(2) ? '16px' : '0px'
                                }}
                            >
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Tạo mới CV" :
                                            "Create a new CV"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Quản lý CV" :
                                            "CV management"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Hướng dẫn tạo CV" :
                                            "Instructions for creating a CV"
                                    }
                                </h3>
                            </div>
                        </div>
                        <div className='category-dropdown-item'>
                            <div className='top-item' onClick={() => handleExpand(3)}>
                                <h3 >
                                    {languageRedux === 1 ?
                                        "Cộng đồng HiJob" :
                                        "HiJob Community"}
                                </h3>
                                <ArrowIcon fill='black' />
                            </div>
                            <div className='bot-item'
                                style={{
                                    height: expand.includes(3) ? 'unset' : 0,
                                    overflow: expand.includes(3) ? 'unset' : 'hidden',
                                    marginTop: expand.includes(3) ? '16px' : '0px'
                                }}
                            >
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Câu chuyện làm việc HiJob" :
                                            "HiJob Working story"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Tin tức HiJob" :
                                            "HiJob News"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Đăng bài viết mới" :
                                            "Post new articles"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Bài viết đã lưu" :
                                            "Saved post"
                                    }
                                </h3>
                            </div>
                        </div>
                        <div className='category-dropdown-item'>
                            <div className='top-item' onClick={() => handleExpand(4)}>
                                <h3 >
                                    {languageRedux === 1 ?
                                        "Hỗ trợ khách hàng" :
                                        "Customer support"}
                                </h3>
                                <ArrowIcon fill='black' />
                            </div>
                            <div className='bot-item'
                                style={{
                                    height: expand.includes(4) ? 'unset' : 0,
                                    overflow: expand.includes(4) ? 'unset' : 'hidden',
                                    marginTop: expand.includes(4) ? '16px' : '0px'
                                }}
                            >
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Chính sách bảo mật" :
                                            "Privacy Policy"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Điều khoản hỗ trợ" :
                                            "Support terms"
                                    }
                                </h3>
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Hướng dẫn thành viên" :
                                            "Member Guide"
                                    }
                                </h3>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </Box>
        </div>
    )
};

export default CategoryDropdown;