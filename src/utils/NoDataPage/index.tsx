import React, { useState } from 'react'
// @ts-ignore

import { Button, Space, Tooltip } from 'antd'
import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons';

import { FundFilled } from '@ant-design/icons'




const NoDataComponent: React.FC = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center", alignItems: "center",
            height: 400, flexDirection: "column"
        }}>
            <p style={{ fontSize: 20, color: "gray", marginBottom: 20 }}>Không có dữ liệu</p>
            <FundFilled style={{ fontSize: 100, color: "gray" }} />
        </div>

    )
}

export default NoDataComponent
