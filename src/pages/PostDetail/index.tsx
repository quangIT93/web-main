import React from 'react'
// @ts-ignore
import moment from "moment";
import "intl";
import "intl/locale-data/jsonp/en";
import NaviBar from "../../components/Navbar/index"
import { AxiosResponse } from "axios"
import Footer from "../../components/Footer/index"
// @ts-ignore
import { useSearchParams } from "react-router-dom";
import postApi from '../../api/postApi';
import ItemSuggest from "./components/ItemSuggest"
// @ts-ignore
import { Carousel } from 'react-carousel-minimal';
import { Button, Breadcrumb } from 'antd';

import {
    EnvironmentOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    CalendarOutlined,
    CreditCardOutlined
} from '@ant-design/icons';

import './style.scss'

interface ItemCategories {
    child_category_id?: Number
    parent_category?: string

    child_category?: string
    parent_category_id: Number

}
// page view details post 
const Detail: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null)
    const componentRefJob = React.useRef<HTMLDivElement>(null)

    const [searchParams, setSearchParams] = useSearchParams();

    const [width, setWidth] = React.useState<Number>(1050);
    const [post, setPost] = React.useState<AxiosResponse | null>(null);
    const [automatic, setAutomatic] = React.useState<Boolean>(false);

    const getPostById = async () => {
        const result = await postApi.getById(Number(searchParams.get('post-id')))
        if (result) {
            setPost(result)
        }
    }
    React.useEffect(() => {

        getPostById()

    }, []);
    React.useEffect(() => {
        function handleWindowResize() {
            const w = Number(componentRef?.current?.offsetWidth) + Number(componentRefJob?.current?.offsetWidth);
            setWidth(w);

        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    const data = [
        {
            "id": 81,
            image: "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg",
            "status": 1
        },
        {
            "id": 82,
            "image": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-3eedf311-0479-4ecc-804e-ca810f1b7658.jpg",
            "status": 1
        },
        {
            "id": 83,
            "image": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-8ade830d-f957-4aaa-8fdd-c5035d81d529.jpg",
            "status": 1
        }

    ];

    const dataSuggest = [
        {
            "content": "Quản Lý /Giám Sát Vận Hành Dịch Vụ Rạp Chiếu Phim",
            "imgBackground": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg",
            "describe": "AI Works"
        },
        {
            "content": "Phục vụ bàn lương 6tr/tháng",
            "imgBackground": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg",
            "describe": "AI Works"
        },
        {
            "content": "Phục vụ bàn lương 6tr/tháng",
            "imgBackground": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg",
            "describe": "AI Works"
        },
        {
            "content": "Phục vụ bàn lương 6tr/tháng",
            "imgBackground": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg",
            "describe": "AI Works"
        },
        {
            "content": "Phục vụ bàn lương 6tr/tháng",
            "imgBackground": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg",
            "describe": "AI Works"
        },

    ];
    const onclick = () => {
        window.open(`${post?.data.share_link}`)
    }

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '15px',
        fontWeight: 'bold',
    }

    setTimeout(() => {
        setAutomatic(true)
    }, 500);

    return (
        <>
            {
                automatic &&
                <div className="detail">
                    <NaviBar />
                    <div className='div-include-breadcrumb'>
                        <div className='job-breadcrumb' >
                            <div className='div-breadcrumb' style={{ width: `${width}px` }}>
                                <Breadcrumb
                                    separator=">"
                                    items={[
                                        {
                                            title: 'HiJob',
                                        },
                                        {
                                            title: 'Viec lam',
                                            href: '',
                                        },
                                        {
                                            title: `${post?.data.title}`,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", paddingBottom: "30px", }}>
                        <div className='detail-container' >
                            <div ref={componentRef} >
                                <Carousel
                                    data={post?.data.images ? post.data.images : data}
                                    time={2000}
                                    width="850px"
                                    height="500px"
                                    captionStyle={captionStyle}
                                    radius="10px"
                                    slideNumber={true}
                                    slideNumberStyle={slideNumberStyle}
                                    captionPosition="bottom"
                                    automatic={false}
                                    // dots={true}
                                    pauseIconColor="white"
                                    pauseIconSize="40px"
                                    slideBackgroundColor="darkgrey"
                                    slideImageFit="cover"
                                    thumbnails={true}
                                    thumbnailWidth="100px"
                                    style={{
                                        textAlign: "center",
                                        maxWidth: "850px",
                                        maxHeight: "560px"
                                    }}
                                />
                            </div>
                            < div className='div-job-title' ref={componentRefJob}>
                                <div className='title'>
                                    <h2>{post?.data.title}</h2>
                                    <h3>{post?.data.company_name}</h3>
                                </div>
                                <div className='job-title-details'>
                                    <h4>Thông tin việc làm</h4>
                                    <div className='div-detail-row'>
                                        <EnvironmentOutlined style={{ color: "#575757" }} />
                                        <div style={{ marginLeft: "10px" }}> <p>Địa chỉ</p>
                                            <h4>{post?.data.address}</h4>
                                        </div>
                                    </div>
                                    <div className='div-detail-row'>
                                        <ClockCircleOutlined style={{ color: "#575757" }} />
                                        <div style={{ marginLeft: "10px" }}> <p>Giờ làm việc</p>
                                            <h4>{moment(new Date(post?.data.start_time)).format("HH:mm")} - {moment(new Date(post?.data.end_time)).format("HH:mm")}</h4>
                                        </div>
                                    </div>
                                    <div className='div-detail-row'>
                                        <CalendarOutlined style={{ color: "#575757" }} />
                                        <div style={{ marginLeft: "10px" }}> <p>Thời gian làm việc</p>
                                            <h4>
                                                {moment(new Date(post?.data.start_date)).format("DD/MM/yyyy")} - {moment(new Date(post?.data.end_date)).format("DD/MM/yyyy")}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className='div-detail-row'>
                                        <CalendarOutlined style={{ color: "#575757" }} />
                                        <div style={{ marginLeft: "10px" }}> <p>Làm việc cuối tuần</p>
                                            <h4>{post?.data.is_working_weekend == 0 ? "Có làm việc cuối tuần" : "Khong làm việc cuối tuần"}</h4>
                                        </div>
                                    </div>
                                    <div className='div-detail-row'>
                                        <DollarOutlined style={{ color: "#575757" }} />
                                        <div style={{ marginLeft: "10px" }}> <p>Mức lương</p>
                                            <h4>{new Intl.NumberFormat("en-US").format(post?.data.salary_min) + ` ${post?.data.money_type_text}`}
                                                {" "}  - {new Intl.NumberFormat("en-US").format(post?.data.salary_max) + ` ${post?.data.money_type_text}`}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className='div-detail-row'>
                                        <CreditCardOutlined style={{ color: "#575757" }} />
                                        <div style={{ marginLeft: "10px" }}> <p>Danh mục</p>
                                            {
                                                post?.data.categories.map((item: ItemCategories, index: null | number) =>
                                                    <h4 key={index} >{item.parent_category}/{item.child_category}</h4>
                                                )}
                                        </div>
                                    </div>
                                    <Button onClick={onclick} className='btn-apply' type={"primary"}>
                                        Ứng tuyển
                                    </Button>
                                </div>
                            </div>
                            <div className='div-description-mo' >
                                <div className='description'  >
                                    <h3>Mô tả công việc</h3>
                                    <div style={{ whiteSpace: "pre-line", fontFamily: "Roboto", marginTop: "10px" }}>
                                        {post?.data.description}
                                    </div>
                                </div>
                                <Button onClick={onclick} className='btn-apply btn-for-mo' type={"primary"}>
                                    Ứng tuyển
                                </Button>
                            </div>
                            <div className='div-suggest' >
                                <h3>Việc làm tương tự </h3>
                                <div className='item'>
                                    {dataSuggest.map((item, index) => (
                                        <ItemSuggest
                                            key={index}
                                            content={item.content}
                                            imgBackground={item.imgBackground}
                                            describe={item.describe}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div >
            }
        </>



    )
}

export default Detail
