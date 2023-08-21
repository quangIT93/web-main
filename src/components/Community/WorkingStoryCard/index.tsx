import React from "react";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.scss';

import {
    EysIcon,
    CommentIcon,
    LikeIcon,
} from '#components/Icons';

interface IWorkingStoryCard {
    item: any,
    index: any,
    showText: any,
    handleAddText: any
}

const WorkingStoryCard: React.FC<IWorkingStoryCard> = (props) => {
    const { item, showText, index, handleAddText } = props;

    const handleMoveToDetailPage = (id: any) => {
        window.open(`/detail-comunity?post-community=${id}&type=1`, '_parent');
    }

    return (
        <>
            <div className="comunitypostNew-card-wrap_content" key={index}
                onClick={() => handleMoveToDetailPage(item?.id)}
            >
                <div className="comunityPostNew-card-content">
                    <h3>{item?.title}</h3>
                    <div className="comunityPostNew-card-content_info">
                        <ul className={`text-content_postNew ${showText}`}>
                            {item?.content}
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
                        <p>{item?.communicationViewsCount}</p>
                    </div>
                    <div className="status-item">
                        <LikeIcon />
                        <p>{item?.communicationLikesCount}</p>
                    </div>
                    <div className="status-item">
                        <CommentIcon />
                        <p>{item?.communicationCommentsCount}</p>
                    </div>
                </div>

                <div className="comunitypostNew-wrap_actor">
                    <div className="comunitypostNew-wrap">
                        {/* <img src={item?.profileData?.avatarPath} alt="anh loi" /> */}
                        <Avatar size={50} src={item?.profileData?.avatarPath} icon={<UserOutlined />} />
                        <div className="info-actor_comunity">
                            <p>Tác giả</p>
                            <p>{item?.profileData?.name}</p>
                        </div>
                    </div>
                    <p>{item?.createdAtText}</p>
                </div>
            </div>
        </>
    )
}

export default WorkingStoryCard;