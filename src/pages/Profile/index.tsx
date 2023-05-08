import React from 'react'
// @ts-ignore
import Navbar from '../Policy/components/Navbar/index'

import './style.scss'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Button, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: "white"
}));
const Profile: React.FC = () => {

    const state = useSelector((state: RootState) => state.post)

    console.log(state)

    return (
        <div className="profile">
            <Navbar />
            <div className='container'>
                <div className='div-profile-avatar'>
                    <div className='div-avatar'>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar alt="Remy Sharp" src="/logoH2.png" sizes='10' />
                                }
                            >
                                <Avatar style={{ height: "70px", width: "70px" }} alt="Travis Howard" src="https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-3eedf311-0479-4ecc-804e-ca810f1b7658.jpg" />
                            </Badge>
                            <div style={{ marginLeft: "10px" }}>
                                <h2>Trần Văn An</h2>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}>
                                    <img src='/images/profile/HiCoin.png' />
                                    <p style={{ marginLeft: "5px" }}>0</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            style={{ backgroundColor: "#FBBC04" }}
                        >
                            HiCoin
                        </Button>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", marginTop: "20px", color: "#575757" }}>

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>

                </div>
                <div className='div-profile-info'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h3>Thông tin cá nhân</h3>
                        <Space>
                            <img src='/images/profile/pen.png' />

                            <p style={{ color: '#0D99FF', fontSize: "14px" }}>Sửa</p>
                        </Space>

                    </div>
                    <div className='info-detail' >
                        <div className='div-detail-row left'>
                            <p >Ngày sinh</p>
                            <p >Ngày sinh</p>

                            <p >Ngày sinh</p>

                            <p >Ngày sinh</p>

                            <p >Ngày sinh</p>
                        </div>
                        <div className='div-detail-row right'>
                            <p>dsf</p>
                            <p>dsf</p>

                            <p>dsf</p>

                            <p>dsf</p>

                            <p>dsf</p>
                        </div>
                    </div>
                </div>

                <div className='div-profile-info'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h3>Thông tin cá nhân</h3>
                        <Space>
                            <img src='/images/profile/pen.png' />

                            <p style={{ color: '#0D99FF', fontSize: "14px" }}>Sửa</p>
                        </Space>

                    </div>
                    <div className='info-detail' >
                        <div className='div-detail-row left'>
                            <p >Ngày sinh</p>
                            <p >Ngày sinh</p>

                            <p >Ngày sinh</p>

                            <p >Ngày sinh</p>

                            <p >Ngày sinh</p>
                        </div>
                        <div className='div-detail-row right'>

                            <p>dsf</p>
                            <p>dsf</p>

                            <p>dsf</p>

                            <p>dsf</p>

                            <p>dsf</p>
                        </div>
                    </div>
                </div>

                <div className='div-profile-info'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h3>Thông tin cá nhân</h3>
                        <Space>
                            <img src='/images/profile/pen.png' />

                            <p style={{ color: '#0D99FF', fontSize: "14px" }}>Sửa</p>
                        </Space>

                    </div>
                    <Space wrap className='item-info-work' >

                        <Button className='btn' type="text">Nha Hang</Button>
                        <Button className='btn' type="text">Phuc Vu</Button>
                        <Button className='btn' type="text">Tai Chinh</Button>
                        <Button className='btn' type="text">Text Button</Button>

                    </Space>
                </div>
                <div className='div-profile-info'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h3>Thông tin cá nhân</h3>
                        <Space>
                            <img src='/images/profile/pen.png' />

                            <p style={{ color: '#0D99FF', fontSize: "14px" }}>Sửa</p>
                        </Space>

                    </div>
                    <Space wrap className='item-info-work' >
                        <Button className='btn' type="text">Nha Hang</Button>
                        <Button className='btn' type="text">Phuc Vu</Button>
                        <Button className='btn' type="text">Tai Chinh</Button>
                        <Button className='btn' type="text">Text Button</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default Profile
