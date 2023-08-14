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

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './style.scss'

const CardListBlogCreate = () => {
    const [showText, setShowText] = React.useState('');
    const [openMenu, setOpenMenu] = React.useState(false);
    const handleAddText = () => {
        setShowText('showText');
    };

    const footerRef = React.useRef<any>(null);

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

    const handleClickItemMenu = () => {
        console.log("hello")
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
                        Bài viết bạn đã lưu
                    </Typography>
                </div>
                <div className="title-comunity_icon">
                    <div className="dropdown dropdown-4" ref={footerRef} onClick={() => setOpenMenu(!openMenu)}>
                        <FilterComunity />
                        <ul className="dropdown_menu dropdown_menu-4">
                            <li className="dropdown_item-1" style={{ display: openMenu ? "flex" : "none" }}>
                                <LikeIcon />
                                <p>Lượt thích</p>
                            </li>
                            <li className="dropdown_item-2" style={{ display: openMenu ? "flex" : "none" }}>
                                <EysIcon />
                                <p>Lượt xem</p>
                            </li>
                            <li className="dropdown_item-3" style={{ display: openMenu ? "flex" : "none" }}>
                                <CommentIcon />
                                <p>Lượt bình luận</p>
                            </li>
                        </ul>
                    </div>
                    <EditComunity />
                </div>
            </Box>
            <div className="list-blog-create-data">
                {[...Array(5)].map((item) => (
                    <div className="community-content-body_item">
                        <div className="community-content-body-item_top">
                            <div className="body-item-title">
                                <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                                <SettingIcon />
                            </div>
                            <p>1 ngày trước</p>
                        </div>
                        <div className="body-item-actions">
                            <div className="action-item">
                                <EysIcon />
                                <p>1234</p>
                            </div>
                            <div className="action-item">
                                <LikeIcon />
                                <p>300</p>
                            </div>
                            <div className="action-item">
                                <CommentIcon />
                                <p>30</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CardListBlogCreate;