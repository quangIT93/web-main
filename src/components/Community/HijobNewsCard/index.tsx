import React from "react";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.scss';

import {
    EysIcon,
    CommentIcon,
    LikeIcon,
    SaveIconOutline,
    SaveIconFill
} from '#components/Icons';

interface IHijobNewsCard {
    item: any,
    index: any,
}

const HijobNewsCard: React.FC<IHijobNewsCard> = (props) => {
    const { item, index } = props;

    const handleMoveToDetailPage = (id: any) => {
        window.open(`/detail-comunity?post-community=${id}&type=0`, '_parent');
    }

    return (
        <>
            <div className="comunitypostNews-card-wrap_content" key={index}
                onClick={() => handleMoveToDetailPage(item?.id)}
            >
                <div className="comunitypostNews-card-wrap_content__left">
                    <Avatar shape="square" src={item?.image} icon={<UserOutlined />} />
                </div>
                <div className="comunitypostNews-card-wrap_content__right">
                    <div className="comunityPostNews-card-content">
                        <div className="comunityPostNews-card-content-title">
                            <h3>{item?.title}</h3>
                            <SaveIconOutline width={24} height={24} />
                        </div>
                        <div className="comunityPostNews-card-content_info">
                            <ul className={`text-content_postNew `}>
                                {item?.content}
                            </ul>
                        </div>
                    </div>
                    <div className="comunityPostNews-card-interaction">
                        <div className="comunitypostNew-card-wrap_actor">
                            <div className="comunitypostNew-wrap">
                                {/* <img src="../images/banner.png" alt="anh loi" /> */}
                                <Avatar size={42} src={item?.profileData?.avatarPath} icon={<UserOutlined />} />
                                <div className="info-actor_comunity">
                                    <p>Người viết</p>
                                    <p>{item?.profileData?.name}</p>
                                </div>
                            </div>
                            <p>
                                {
                                    new Date(item?.createdAt).toLocaleDateString('en-GB')
                                }
                            </p>
                        </div>
                        <div className="comunitypostNew-card-wrap_status">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default HijobNewsCard;