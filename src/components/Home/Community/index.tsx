import * as React from 'react';

import { Avatar } from 'antd';

import './style.scss';

import {
    ThinkingIcon,
    NewsPaperIcon,
    UseCircleIcon,
    EysIcon,
    LikeIcon,
    CommentIcon,
} from '#components/Icons';

const Community = () => {
    return (
        <div className="community-container">
            <div className="community-content">
                <div className="community-content_item">
                    <div className="community-content-title">
                        <div className="community-content-title_left">
                            <ThinkingIcon />
                            <h3>HiJob Working story</h3>
                        </div>
                        <p onClick={() => window.open('/new-comunity', '_parent')}>
                            View all
                        </p>
                    </div>
                    <div className="community-content-body">
                        {[...Array(5)].map((item) => (
                            <div className="community-content-body_item">
                                <div className="body-item-title">
                                    <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                                    <p>1 ngày trước</p>
                                </div>
                                <div className="body-item-user">
                                    <UseCircleIcon />
                                    <p>Trần Văn An</p>
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
                </div>
                <div className="community-content_item">
                    <div className="community-content-title">
                        <div className="community-content-title_left">
                            <NewsPaperIcon />
                            <h3>HiJob News</h3>
                        </div>
                        <p onClick={() => window.open('/news-comunity', '_parent')}>
                            View all
                        </p>
                    </div>
                    <div className="community-content-body">
                        {[...Array(5)].map((item) => (
                            <div className="community-content-body-right_item">
                                <div className="community-content-body_left">
                                    <Avatar shape="square" size={88} src="../images/banner.png" />
                                </div>
                                <div className="community-content-body_right">
                                    <div className="body-item-title">
                                        <h3>Gợi ý những câu hỏi khi phỏng vấn công việc kế toán</h3>
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
