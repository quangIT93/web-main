import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';

import './style.scss';
import { DeleteIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ISkillItem {
    item: {
        fullName: any,
        company: any,
    },
    index: number,
    setReferenceValues: React.Dispatch<React.SetStateAction<any>>;
    referenceValues: any;
}

const ReferenceItem: React.FC<ISkillItem> = (props) => {
    const language = useSelector((state: RootState) => state.dataLanguage.languages);
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const { item, index, setReferenceValues, referenceValues } = props;

    const handleDeleteLanguage = (id: number) => {
        setReferenceValues(referenceValues.filter((value: any, index: any) => {
            return index !== id
        }))
        console.log(id);
    }
    return (
        <div className='reference-item-container'>
            <div className="div-item-left">
                <div className="div-info-item">
                    <Space size={4} direction="vertical"
                        style={{
                            padding: "8px 12px",
                            border: "0.5px solid #aaaaaa",
                            borderRadius: "10px",
                        }}
                    >
                        <h3>{item?.fullName}</h3>
                        <p>{item?.company}</p>
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

export default ReferenceItem;