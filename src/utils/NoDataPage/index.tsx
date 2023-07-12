import React, { useState } from 'react'
// @ts-ignore

import { Button, Space, Tooltip } from 'antd'
import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons';

import { FundFilled } from '@ant-design/icons'
// import nodata from '../../../public/images/history/nodata.png'

const NoDataComponent: React.FC = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center", alignItems: "center",
            height: 400, flexDirection: "column"
        }}>
            
            {/* <FundFilled style={{ fontSize: 100, color: "gray" }} /> */}
            <img
                style={{marginTop: '10rem'}}
                src={require('../../img/langdingPage/nodata.png')}
                alt="ảnh bị lỗi"
                width='208px'
                height='245px'
            />
            <p style={{ fontSize: 20, color: "gray", marginBottom: 20 }}>Chưa tìm thấy công việc</p>
        </div>

    )
}

export default NoDataComponent
