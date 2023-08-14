import React from 'react';

import {
    EysIcon,
    CommentIcon,
    LikeIcon,
    EditComunity,
    FilterComunity,
    SaveIconOutline,
    SaveIconFill,
} from '#components/Icons';
import { Box, Typography, MenuItem, TextField } from '@mui/material';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './style.scss'

const CardListBlogSave = () => {
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
                className="list-blog-save-box"
            >
                <div className="back-container">
                    {/* <Button
            className="back-button"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={handleHideDetail}
            style={{
              display: showDetailPosted ? 'block' : 'none',
            }}
          /> */}
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
                <div className="title-comunity-news_icon">
                    <div className="dropdown dropdown-4" ref={footerRef} onClick={() => setOpenMenu(!openMenu)}>
                        <FilterComunity />
                        <ul className="dropdown_menu dropdown_menu-4" >
                            <li className="dropdown_item-1" style={{ display: openMenu ? "flex" : "none" }}
                                onClick={handleClickItemMenu}>
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
                    {/* <EditComunity /> */}
                </div>
            </Box>
            <div className="list-blog-save-data">
                <div className="comunitypostNew-wrap_content">
                    <div className="comunityPostNew-content">
                        <div className="comunityPostNew-content-title">
                            <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                            <SaveIconOutline width={24} height={24} />
                        </div>
                        <div className="comunityPostNew-content_info">
                            <ul className={`text-content_postNew ${showText}`}>
                                Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                                <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                <li>Hiểu rõ công việc mình làm</li>
                                <li>Hiểu thực đơn của nhà hàng</li>
                                <li>Hiểu rõ công việc mình làm</li>
                                <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                <li>Hiểu thực đơn của nhà hàng</li>
                            </ul>
                            {!showText ? (
                                <span onClick={handleAddText}>Xem thêm...</span>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="comunitypostNew-wrap_status">
                        <div className="status-item">
                            <EysIcon />
                            <p>123</p>
                        </div>
                        <div className="status-item">
                            <LikeIcon />
                            <p>2321</p>
                        </div>
                        <div className="status-item">
                            <CommentIcon />
                            <p>2321</p>
                        </div>
                    </div>

                    <div className="comunitypostNew-wrap_actor">
                        <div className="comunitypostNew-wrap">
                            <img src="../images/banner.png" alt="anh loi" />

                            <div className="info-actor_comunity">
                                <p>Tác giả</p>
                                <p>Trần Văn An</p>
                            </div>
                        </div>
                        <p>2 tiếng trước</p>
                    </div>
                </div>
                <div className="comunitypostNews-wrap_content">
                    <div className="comunitypostNews-wrap_content__left">
                        <Avatar shape="square" src="../images/banner.png" icon={<UserOutlined />} />
                    </div>
                    <div className="comunitypostNews-wrap_content__right">
                        <div className="comunityPostNews-content">
                            <div className="comunityPostNews-content-title">
                                <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                                <SaveIconOutline width={24} height={24} />
                            </div>
                            <div className="comunityPostNews-content_info">
                                <ul className={`text-content_postNew `}>
                                    Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                                    <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                    <li>Hiểu rõ công việc mình làm</li>
                                    {/* <li>Hiểu thực đơn của nhà hàng</li>
                                        <li>Hiểu rõ công việc mình làm</li>
                                        <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                        <li>Hiểu thực đơn của nhà hàng</li> */}
                                </ul>
                                {/* {!showText ? (
                                        <span onClick={handleAddText}>Xem thêm...</span>
                                    ) : (
                                        <></>
                                    )} */}
                            </div>
                        </div>
                        <div className="comunityPostNews-interaction">
                            <div className="comunitypostNew-wrap_actor">
                                <div className="comunitypostNew-wrap">
                                    {/* <img src="../images/banner.png" alt="anh loi" /> */}
                                    <Avatar size={42} src="../images/banner.png" icon={<UserOutlined />} />
                                    <div className="info-actor_comunity">
                                        <p>Người viết</p>
                                        <p>Trần Văn An</p>
                                    </div>
                                </div>
                                <p>09/08/2023</p>
                            </div>
                            <div className="comunitypostNew-wrap_status">
                                <div className="status-item">
                                    <EysIcon />
                                    <p>123</p>
                                </div>
                                <div className="status-item">
                                    <LikeIcon />
                                    <p>2321</p>
                                </div>
                                <div className="status-item">
                                    <CommentIcon />
                                    <p>2321</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comunitypostNew-wrap_content">
                    <div className="comunityPostNew-content">
                        <div className="comunityPostNew-content-title">
                            <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                            <SaveIconOutline width={24} height={24} />
                        </div>
                        <div className="comunityPostNew-content_info">
                            <ul className={`text-content_postNew ${showText}`}>
                                Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                                <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                <li>Hiểu rõ công việc mình làm</li>
                                <li>Hiểu thực đơn của nhà hàng</li>
                                <li>Hiểu rõ công việc mình làm</li>
                                <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                <li>Hiểu thực đơn của nhà hàng</li>
                            </ul>
                            {!showText ? (
                                <span onClick={handleAddText}>Xem thêm...</span>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="comunitypostNew-wrap_status">
                        <div className="status-item">
                            <EysIcon />
                            <p>123</p>
                        </div>
                        <div className="status-item">
                            <LikeIcon />
                            <p>2321</p>
                        </div>
                        <div className="status-item">
                            <CommentIcon />
                            <p>2321</p>
                        </div>
                    </div>

                    <div className="comunitypostNew-wrap_actor">
                        <div className="comunitypostNew-wrap">
                            <img src="../images/banner.png" alt="anh loi" />

                            <div className="info-actor_comunity">
                                <p>Tác giả</p>
                                <p>Trần Văn An</p>
                            </div>
                        </div>
                        <p>2 tiếng trước</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardListBlogSave;