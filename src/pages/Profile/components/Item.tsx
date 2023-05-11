
import React from 'react'
// @ts-ignore


import { Button, Space } from 'antd';
import "./styleItem.scss"

interface SuggestItemProps {
    typeItem?: string
    item?: ItemAppy

}
interface ItemAppy {
    company_name?: String
    major?: String
    start_date?: String,
    end_date?: String,
    extra_information?: String
    title?: String
}

const ItemInfoLeft: React.FC<SuggestItemProps> = ({
    typeItem,
    item
}) => {

    return (
        <div className='div-apply-item'>
            <div className='div-item-left'>
                <div className='div-time-line'>
                    <div style={{ height: "10px", width: "10px", borderRadius: "10px", backgroundColor: "#0D99FF" }}>
                    </div>
                    <div style={{ width: "3px", height: "100%", backgroundColor: "#0D99FF" }} >

                    </div>
                </div>
                <div className='div-info-item'>
                    <Space size={4} direction='vertical' style={{ marginLeft: 10 }} >
                        <h3>{item?.company_name}</h3>
                        <p>{typeItem == "experiences" ? item?.title : item?.major}</p>
                        <p>{item?.end_date}</p>
                        <div style={{ whiteSpace: "pre-wrap", marginTop: "15px" }}>
                            {item?.extra_information}
                        </div>
                    </Space>
                </div>
            </div>
            <Space>
                <img src='/images/profile/pen.png' />

                <p style={{ color: '#0D99FF', fontSize: "14px" }}>Sửa</p>
            </Space>
        </div>
    )
}

export default ItemInfoLeft
