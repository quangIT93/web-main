import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';

import './style.scss';
import { DeleteIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ISkillItem {
    item: {
        language: any,
        level: any,
    },
    index: number,
    setLanguageValues: React.Dispatch<React.SetStateAction<any>>;
    languageValues: any;
}

const LanguageItem: React.FC<ISkillItem> = (props) => {
    const language = useSelector((state: RootState) => state.dataLanguage.languages);
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const { item, index, setLanguageValues, languageValues } = props;

    const handleDeleteLanguage = (id: number) => {
        setLanguageValues(languageValues.filter((value: any, index: any) => {
            return index !== id
        }))
        console.log(id);
    }
    return (
        <div className='language-item-container'>
            <div className="div-item-left">
                <div className="div-info-item">
                    <Space size={4} direction="vertical"
                        style={{
                            padding: "8px 12px",
                            border: "0.5px solid #aaaaaa",
                            borderRadius: "10px",
                        }}
                    >
                        <h3>{item?.language}</h3>
                        <p>
                            {
                                item?.level === 1 ?
                                    languageRedux === 1 ? "Sơ cấp" : "Primary" :
                                    item?.level === 2 ?
                                        languageRedux === 1 ? "Trung cấp" : "Intermediate" :
                                        item?.level === 3 ?
                                            languageRedux === 1 ? "Trình độ cao" : "High - level" :
                                            item?.level === 4 ?
                                                languageRedux === 1 ? "Thành thạo" : "Native" :
                                                ""
                            }
                        </p>
                    </Space>
                </div>
            </div>
            <div className="div-item-right">
                <Space
                    onClick={
                        () => handleDeleteLanguage(index)
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

export default LanguageItem;