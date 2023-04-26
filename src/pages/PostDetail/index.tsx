import React from 'react'
// @ts-ignore

import NaviBar from "../../components/Navbar/index"
import Footer from "../../components/Footer/index"
import { useSearchParams } from "react-router-dom";
import postApi from '../../api/postApi';
import ItemSuggest from "./components/ItemSuggest"
// @ts-ignore
import { Carousel } from 'react-carousel-minimal';

import {
    EnvironmentOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    CalendarOutlined,
    CreditCardOutlined
} from '@ant-design/icons';

import './style.scss'

const Landing: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null)


    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('post-id'))
    const [width, setWidth] = React.useState<Number>();

    React.useEffect(() => {

        setWidth(componentRef?.current?.offsetWidth);
        console.log("width", width)


    }, [componentRef?.current?.offsetWidth]);

    React.useEffect(() => {

        const test = async () => {

            const result = await postApi.getById(Number(searchParams.get('post-id')))

            console.log(result)
        }
        test()

    }, []);
    const data = [
        {
            "id": 81,
            "image": "https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg",
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
    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '15px',
        fontWeight: 'bold',
    }
    return (
        <div className="detail">
            <NaviBar />

            {/* <div>sdfds</div> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className='detail-container'>
                    <div ref={componentRef}>
                        <Carousel


                            data={data}
                            time={2000}
                            width="850px"
                            height="500px"
                            captionStyle={captionStyle}
                            radius="10px"
                            slideNumber={true}
                            slideNumberStyle={slideNumberStyle}
                            captionPosition="bottom"
                            automatic={true}
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
                                maxHeight: "500px",
                            }}
                        />
                    </div>
                    < div className='div-job-title'>
                        <div className='title'>
                            <h2>Phục vụ bàn nhà hàng</h2>
                            <h3>Nhà hàng AI works</h3>
                        </div>
                        <div className='job-title-details'>
                            <h4>Thông tin việc làm</h4>
                            <div className='div-detail-row'>
                                <EnvironmentOutlined style={{ color: "#575757" }} />
                                <div style={{ marginLeft: "10px" }}> <p>Địa chỉ</p>
                                    <h4>Quận 1, Hồ Chí Minh</h4>
                                </div>
                            </div>
                            <div className='div-detail-row'>
                                <ClockCircleOutlined style={{ color: "#575757" }} />
                                <div style={{ marginLeft: "10px" }}> <p>Giờ làm việc</p>
                                    <h4>Quận 1, Hồ Chí Minh</h4>
                                </div>
                            </div>
                            <div className='div-detail-row'>
                                <CalendarOutlined style={{ color: "#575757" }} />
                                <div style={{ marginLeft: "10px" }}> <p>Thời gian làm việc</p>
                                    <h4>Quận 1, Hồ Chí Minh</h4>
                                </div>
                            </div>
                            <div className='div-detail-row'>
                                <CalendarOutlined style={{ color: "#575757" }} />
                                <div style={{ marginLeft: "10px" }}> <p>Làm việc cuối tuần</p>
                                    <h4>Quận 1, Hồ Chí Minh</h4>
                                </div>
                            </div>
                            <div className='div-detail-row'>
                                <DollarOutlined style={{ color: "#575757" }} />
                                <div style={{ marginLeft: "10px" }}> <p>Mức lương</p>
                                    <h4>Quận 1, Hồ Chí Minh</h4>
                                </div>
                            </div>
                            <div className='div-detail-row'>
                                <CreditCardOutlined style={{ color: "#575757" }} />
                                <div style={{ marginLeft: "10px" }}> <p>Danh mục</p>
                                    <h4>Quận 1, Hồ Chí Minh</h4>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='description'  >
                        <div style={{ whiteSpace: "pre-line", fontFamily: "Roboto" }}>{"* Quyền lợi:\r\n- Thu nhập cạnh tranh: 10tr/tháng (có thể deal theo năng lực) + Thưởng\r\n- Review tăng lương 2 lần/năm\r\n- Hưởng đầy đủ chế độ của công ty: Du lịch, nghỉ phép, BHXH,…\r\n* Yêu cầu:\r\n- Nhanh nhẹn, chăm chỉ\r\n- Có laptop cá nhân\r\n- Không có kinh nghiệm sẽ được đào tạo"}</div>

                    </div>
                    <div className='div-suggest' >
                        <h4>Việc làm tương tự </h4>
                        <div className='item'>
                            <ItemSuggest />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default Landing
