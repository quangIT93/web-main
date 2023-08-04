import * as React from 'react';

import './styles.scss';

import { UserOutlined } from '@ant-design/icons';
import { Input, Avatar } from 'antd';

import zoro from './zoro.jpg'

const CV1: React.FC = () => {
    const [value, setValue] = React.useState();

    const handleOnChange = (e: any) => {
        setValue(e.target.value)
    }
    return (
        <>
            <Avatar size={200} src={zoro} />
            <h1>This is my component</h1>
            <p>This text will be exported to a PDF file.</p>
            <Input value={value} onChange={handleOnChange} size="large" placeholder="large size" prefix={<UserOutlined />} />
        </>
    )
}

export default CV1;