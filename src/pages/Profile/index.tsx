import React from 'react'
// @ts-ignore
import Navbar from '../Policy/components/Navbar/index'

import './style.scss'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Button, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Footer from "../../components/Footer/index"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import ItemApply from './components/Item'

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: "white"
}));
const Profile: React.FC = () => {

    const dataTest = {
        "code": 200,
        "success": true,
        "data": {
            "id": "a9e5bc4d-823f-4acc-9356-f9e53c611eaf",
            "name": "Nguyen The Truong",
            "birthday": "2001-06-09T17:00:00.000Z",
            "address": {
                "id": 225,
                "name": "Hải Dương"
            },
            "gender": 1,
            "introduction": "My intro",
            "phone": "0919004743",
            "email": "truong@gmail.com",
            "avatar": "https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/1a635477-97a2-4d53-80c5-c56be5729fe5-hou-china-6.jpg",
            "facebook": "facebook.com",
            "linkedin": "linkedin.com",
            "categories": [
                {
                    "child_category_id": 25,
                    "child_category": "Hiệu chỉnh",
                    "parent_category_id": 1,
                    "parent_category": "Công việc giấy tờ, sổ sách"
                }
            ],
            "locations": [
                {
                    "district_id": 1451,
                    "district": "Quận 9",
                    "province_id": 202,
                    "province": "Hồ Chí Minh"
                },
                {
                    "district_id": 1655,
                    "district": "Thành phố Bạc Liêu",
                    "province_id": 200,
                    "province": "Bạc Liêu"
                }
            ],
            "educations": [
                {
                    "id": 5,
                    "company_name": "TDT University - Vietnam",
                    "major": "Computer Science",
                    "start_date": "2019-09-09T17:00:00.000Z",
                    "end_date": "2023-06-11T17:00:00.000Z",
                    "extra_information": "Nothing to tell"
                }
            ],
            "experiences": [
                {
                    "id": 3,
                    "title": "Student",
                    "company_name": "TDT University",
                    "start_date": "2019-09-09T17:00:00.000Z",
                    "end_date": "2023-06-11T17:00:00.000Z",
                    "extra_information": "Nothing to tell"
                },
                {
                    "id": 3,
                    "title": "Student",
                    "company_name": "TDT University",
                    "start_date": "2019-09-09T17:00:00.000Z",
                    "end_date": "2023-06-11T17:00:00.000Z",
                    "extra_information": "Nothing to tell"
                }
            ]
        },
        "message": "Successfully"
    }

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

                        </div>
                        <div className='div-detail-row right'>
                            <p>{dataTest.data.birthday}</p>
                            <p>{dataTest.data.gender == 1 ? "Nam" : "Nu"}</p>

                            <p>{dataTest.data.address.name}</p>

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


                        </div>
                        <div className='div-detail-row right'>

                            <p>{dataTest.data.phone}</p>
                            <p>{dataTest.data.email}</p>

                            <p>{dataTest.data.facebook}</p>

                            <p>{dataTest.data.linkedin}</p>


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


                        {
                            dataTest.data.categories.map((item, index) =>
                                <Button key={index} className='btn' type="text">{item.parent_category}</Button>
                            )
                        }

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
                        {
                            dataTest.data.locations.map((item, index) =>
                                <Button key={index} className='btn' type="text">{item.district}</Button>
                            )
                        }
                    </Space>
                </div>

                <div className='div-profile-info'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h3>Thông tin cá nhân</h3>
                    </div>
                    <ItemApply item={dataTest.data.educations[0]} />

                    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                        <Space style={{ alignItems: "center" }}>
                            <PlusCircleOutlined size={10} style={{ color: "#0D99FF" }} />

                            <p style={{ color: '#0D99FF', fontSize: "14px" }}>Them</p>
                        </Space>
                    </div>

                </div>
                <div className='div-profile-info'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h3>Thông tin cá nhân</h3>
                    </div>
                    {
                        dataTest.data.experiences.map((item, index) =>
                            <ItemApply typeItem='experiences' key={index} item={item} />
                        )
                    }

                    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                        <Space style={{ alignItems: "center" }}>
                            <PlusCircleOutlined size={10} style={{ color: "#0D99FF" }} />

                            <p style={{ color: '#0D99FF', fontSize: "14px" }}>Them</p>
                        </Space>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Profile
