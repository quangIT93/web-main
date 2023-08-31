import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';

import './styleSkillItem.scss';
import { DeleteIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ISkillItem {
    item: {
        skill: any,
        level: any,
    },
    index: number,
    setSkillValues: React.Dispatch<React.SetStateAction<any>>;
    skillValues: any;
}

const SkillItem: React.FC<ISkillItem> = (props) => {
    const language = useSelector((state: RootState) => state.dataLanguage.languages);
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const { item, index, setSkillValues, skillValues } = props;

    const handleDeleteSkill = (id: number) => {
        setSkillValues(skillValues.filter((value: any, index: any) => {
            return index !== id
        }))
        console.log(id);
    }
    return (
        <div className='skill-item-container'>
            <div className="div-item-left">
                <div className="div-info-item">
                    <Space size={4} direction="vertical"
                        style={{
                            padding: "8px 12px",
                            border: "0.5px solid #aaaaaa",
                            borderRadius: "10px",
                        }}
                    >
                        <h3>{item?.skill}</h3>
                        <p>
                            {
                                item?.level === 1 ?
                                    languageRedux === 1 ? "Người mới" : "Novice" :
                                    item?.level === 2 ?
                                        languageRedux === 1 ? "Người bắt đầu" : "Beginner" :
                                        item?.level === 3 ?
                                            languageRedux === 1 ? "Khéo léo" : "Skillful" :
                                            item?.level === 4 ?
                                                languageRedux === 1 ? "Có kinh nghiệm" : "Experienced" :
                                                item?.level === 5 ?
                                                    languageRedux === 1 ? "Chuyên gia" : "Expert" :
                                                    ""
                            }
                        </p>
                    </Space>
                </div>
            </div>
            <div className="div-item-right">
                <Space
                    onClick={
                        () => handleDeleteSkill(index)
                    }
                    style={{ cursor: 'pointer', marginRight: '16px' }}
                >
                    <div className="edit-icon">
                        <DeleteIcon width={15} height={15} />
                    </div>
                    <p style={{ color: '#575757', fontSize: '14px' }}>
                        {
                            language?.profile_page?.delete
                        }
                    </p>
                </Space>
            </div>
        </div>
    )
}

export default SkillItem;