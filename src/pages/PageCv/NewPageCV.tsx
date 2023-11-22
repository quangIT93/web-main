import React, { FormEvent, useEffect, useState } from "react";

import styles from './style.module.scss';
import MagicWand from '../../img/langdingPage/MagicWand.png'
import Atom from '../../img/langdingPage/Atom.png'
import FolderLock from '../../img/langdingPage/FolderLock.png'
import FilePlus from '../../img/langdingPage/FilePlus.png'
import Command from '../../img/langdingPage/Command.png'
import Frame_CVS from '../../img/langdingPage/Frame_CVS.png'
import IllustrationDone from '../../img/langdingPage/IllustrationDone.png'
import IllustrationEmpty from '../../img/langdingPage/IllustrationEmpty.png'
import IllustrationWriting from '../../img/langdingPage/IllustrationWriting.png'
import FrameCv2 from '../../img/langdingPage/FrameCv2.png'
import New_CV_template from '../../img/langdingPage/New_CV_template.png'
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Button, Modal } from "antd";
import ModalLogin from '#components/Home/ModalLogin';
import ModalNoteCreateCompany from "#components/Post/ModalNoteCreateCompany";
import ModalNotiValidateCompany from "#components/Post/ModalNotiValidateCompany";
import { Backdrop, CircularProgress } from "@mui/material";
import Navbar from "#components/Navbar";
import CategoryDropdown from "#components/CategoryDropdown";
import Footer from '#components/Footer/Footer';
import RollTop from "#components/RollTop";
import apiCv from "api/apiCv";
import './style.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Mousewheel, Navigation } from 'swiper';
import { log } from "util";
const NewPageCV = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const profileV3 = useSelector((state: RootState) => state.dataProfileInformationV3.data);
    const profileMoreV3 = useSelector(
        (state: RootState) => state.dataProfileInformationMoreV3.data,
    );
    const [openModalLogin, setOpenModalLogin] = React.useState(false);
    const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
        React.useState<any>(false);
    const [openModalNoteValidateCompany, setOpenModalNoteValidateCompany] =
        React.useState<any>(false);
    const [openModalModalNotCandidate, setOpenModalNotCandidate] = React.useState(false);
    const [getThemeCv, setGetThemeCv] = React.useState<any>([]);
    const handleCancel = () => {
        setOpenModalNotCandidate(false)
    }
    // console.log(profileV3);

    const handleMoveToDoc = () => {
        const url = 'https://docs.google.com/document/d/1TC8bZrS2g4WUF6qtZpg7jLSexyHDkcHv7LjKtpllq9k/edit';
        window.open(url, '_parent')
    }

    const handleMoveToCreateCv = () => {
        if (!localStorage.getItem('accessToken')) {
            setOpenModalLogin(true);
            return;
        }
        if (profileV3 && profileV3.typeRoleData === 1) {
            setOpenModalNotCandidate(true);
            return;
        } else {
            window.open('/templates-cv', '_parent')
        }
    }

    const getTheme = async () => {
        try {
            const result = await apiCv.getThemeCv();
            if (result) {
                setGetThemeCv(result.data);
            }
        } catch (error) { }
    };
    useEffect(() => {
        getTheme();
        // Lấy danh sách các phần tử .slick-active trong Slider
    }, [profileMoreV3]);

    return (
        <div className={styles.new_page_cv_container}>
            <Navbar />
            <CategoryDropdown />
            <div className={styles.new_page_cv_content}>
                <div className={styles.new_page_cv_header}>
                    <div className={styles.new_page_cv_header_content}>
                        <div className={styles.content}>
                            <h3>
                                {
                                    languageRedux === 1 ?
                                        "Chỉ có 2% hồ sơ vượt qua vòng tuyển dụng đầu tiên. Nằm trong top 2%!" :
                                        "Only 2% of applications pass the first recruitment round. In the top 2%!"
                                }
                            </h3>
                            <p>
                                {
                                    languageRedux === 1 ?
                                        "Sử dụng các mẫu sơ yếu lý lịch đã được kiểm tra chuyên nghiệp tại hiện trường tuân theo 'quy tắc sơ yếu lý lịch' chính xác mà nhà tuyển dụng tìm kiếm. Dễ sử dụng và thực hiện trong vòng vài phút - hãy thử miễn phí ngay bây giờ!" :
                                        "Use professionally field-tested resume templates that follow the exact 'resume rules' employers look for. Easy to use and done within minutes - try it for free now!"
                                }
                            </p>
                            <div className={styles.btn_count_cv}>
                                <Button
                                    type="primary"
                                    // shape="round"
                                    onClick={handleMoveToCreateCv}
                                >
                                    {languageRedux === 1 ? 'Tạo CV cho riêng bạn' : 'Create your own CV'}
                                </Button>
                                <div className={styles.count_cv}>
                                    <div className={styles.circle}></div>
                                    <p>

                                        <span>100</span>
                                        {
                                            languageRedux === 1 ?
                                                "CV được tạo ngày hôm nay" :
                                                "CV created today"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <img src={New_CV_template} alt="New_CV_template" />
                    </div>
                </div>
                <div className={styles.new_page_cv_functions}>
                    <div className={styles.new_page_cv_functions_content}>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Các tính năng được thiết kế để giúp bạn giành được công việc mơ ước." :
                                    "Features designed to help you land your dream job."
                            }
                        </h3>
                        <div className={styles.functions_list}>
                            <div className={styles.functions_item}>
                                <div className={styles.icon_item}>
                                    <img src={MagicWand} alt="MagicWand" />
                                </div>
                                <div className={styles.content_item}>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Trình tạo sơ yếu lý lịch trực tuyến dễ dàng" :
                                                "Easy online resume builder"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Tạo một sơ yếu lý lịch tuyệt vời trong vài phút mà không cần rời khỏi trình duyệt web của bạn." :
                                                "Create a great resume in minutes without leaving your web browser."
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={styles.functions_item}>
                                <div className={styles.icon_item}>
                                    <img src={Atom} alt="Atom" />
                                </div>
                                <div className={styles.content_item}>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Tùy chọn sơ yếu lý lịch đa định dạng" :
                                                "Multi-format resume options"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Lưu sơ yếu lý lịch hoàn hảo của bạn ở định dạng PDF chỉ bằng một cú nhấp chuột." :
                                                "Save your perfect resume in PDF format with just one click."
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={styles.functions_item}>
                                <div className={styles.icon_item}>
                                    <img src={Command} alt="Command" />
                                </div>
                                <div className={styles.content_item}>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Sơ yếu lý lịch được tối ưu hóa" :
                                                "Optimized resume"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Các thiết kế được tối ưu hóa cho các thuật toán lọc sơ yếu lý lịch. Đảm bảo mọi người nhìn thấy ứng dụng của bạn!" :
                                                "Designs optimized for resume filtering algorithms. Make sure everyone sees your app!"
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={styles.functions_item}>
                                <div className={styles.icon_item}>
                                    <img src={FolderLock} alt="FolderLock" />
                                </div>
                                <div className={styles.content_item}>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Dữ liệu của bạn được an toàn" :
                                                "Your data is safe"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Dữ liệu của bạn được giữ kín và được bảo vệ bằng mã hóa 256-bit mạnh mẽ." :
                                                "Your data is kept private and protected by strong 256-bit encryption."
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={styles.functions_item}>
                                <div className={styles.icon_item}>
                                    <img src={FilePlus} alt="FilePlus" />
                                </div>
                                <div className={styles.content_item}>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Mẫu đã được phê duyệt" :
                                                "Sample approved"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Các mẫu và ví dụ sơ yếu lý lịch được thiết kế chuyên nghiệp. Chỉ cần chỉnh sửa và tải xuống trong 5 phút." :
                                                "Professionally designed resume templates and examples. Just edit and download in 5 minutes."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.new_page_cv_propose}>
                    <div className={styles.new_page_cv_propose_content}>
                        <img src={Frame_CVS} alt="Frame_CVS" />
                        <div className={styles.new_page_cv_propose_right}>
                            <h3>
                                {
                                    languageRedux === 1 ?
                                        "HiJob Đề xuất" :
                                        "HiJob Proposal"
                                }
                            </h3>
                            <p>
                                {
                                    languageRedux === 1 ?
                                        "HiJob có khả năng phân tích yêu cầu, thói quen, hành vi của nhà tuyển dụng và ứng viên, đồng thời khai thác tối đa lượng dữ liệu lớn, từ đó đưa ra các phán đoán và đề xuất về những việc có thể làm để tuyển dụng hiệu quả hơn, kết nối đúng nhu cầu tuyển dụng của doanh nghiệp với các ứng viên phù hợp." :
                                        "HiJob has the ability to analyze the requirements, habits, and behaviors of employers and candidates, and make the most of large amounts of data, thereby making judgments and recommendations on what can be done to Recruit more effectively, connecting the right recruitment needs of the business with the right candidates."
                                }
                            </p>
                            {/* <Button
                                type="primary"
                                shape="round"
                            // onClick={handleMoveToRegister}
                            >
                                {languageRedux === 1 ? 'Tư vấn tuyển dụng miễn phí' : 'Free recruitment consultation'}
                            </Button> */}
                        </div>
                    </div>
                </div>
                <div className={styles.new_page_cv_templates}>
                    <div className={styles.templates_content}>
                        <div className={styles.new_page_cv_templates_left}>
                            <h3>
                                {
                                    languageRedux === 1 ?
                                        "Mẫu sơ yếu lý lịch đẹp có sẵn để sử dụng" :
                                        "Beautiful resume templates available for use"
                                }
                            </h3>
                            <p>
                                {
                                    languageRedux === 1 ?
                                        "Thu hút các nhà tuyển dụng và nhà tuyển dụng bằng cách sử dụng một trong hơn 20 mẫu sơ yếu lý lịch được thiết kế chuyên nghiệp, trang nhã của chúng tôi. Tải xuống word hoặc PDF." :
                                        "Attract recruiters and recruiters by using one of our 20+ elegant, professionally designed resume templates. Download word or PDF."
                                }
                            </p>
                            <Button
                                type="primary"
                                shape="round"
                                onClick={handleMoveToCreateCv}
                            >
                                {languageRedux === 1 ? 'Chọn mẫu sơ yếu lý lịch' : 'Choose a cv template'}
                            </Button>
                        </div>
                        <div className={styles.new_page_cv_templates_right}>
                            <Swiper
                                slidesPerView={1}
                                breakpoints={{
                                    425: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 2,
                                    },
                                }}
                                spaceBetween={13}
                                // mousewheel={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                navigation={true}
                                loop={true}
                                modules={[
                                    Mousewheel,
                                    Navigation,
                                    Autoplay
                                ]}
                                className="new_page_cv_swipper"
                            >
                                {getThemeCv ? (
                                    getThemeCv.map((item: any, index: number) => {
                                        return (
                                            <SwiperSlide
                                                className="div-job-img-swipper_item"
                                                key={index}
                                            >
                                                <img src={item.image} alt={item.name} />
                                            </SwiperSlide>
                                        );
                                    })
                                ) : (
                                    <SwiperSlide className="new_page_cv_swipper_item">
                                        <img
                                            src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/no-image.png"
                                            alt="image"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className={styles.new_page_cv_create_cv}>
                    <div className={styles.new_page_cv_create_cv_content}>
                        <div className={styles.create_cv_title}>
                            <h3>
                                {
                                    languageRedux === 1 ?
                                        "Tạo sơ yếu lý lịch hoàn hảo cho thị trường việc làm hiện đại" :
                                        "Create the perfect resume for the modern job market"
                                }
                            </h3>
                            <p>
                                {
                                    languageRedux === 1 ?
                                        "Tạo sơ yếu lý lịch chưa bao giờ dễ dàng đến thế! Trong ba bước đơn giản, hãy tạo tài liệu hoàn hảo để gây ấn tượng với người quản lý tuyển dụng và nhà tuyển dụng. Thời gian tối thiểu, chất lượng chuyên nghiệp tối đa." :
                                        "Creating a resume has never been easier! In three simple steps, create the perfect document to impress hiring managers and recruiters. Minimum time, maximum professional quality."
                                }
                            </p>
                            <Button
                                type="primary"
                                // shape="round"
                                onClick={handleMoveToCreateCv}
                            >
                                {languageRedux === 1 ? 'Tạo CV cho riêng bạn' : 'Create your own CV'}
                            </Button>
                        </div>
                        <div className={styles.create_cv_content}>
                            <div className={styles.create_cv_item}>
                                <img src={IllustrationWriting} alt="IllustrationWriting" />
                                <div className={styles.item_bot}>
                                    <h3>01.</h3>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Điền thông tin cá nhân" :
                                                "Fill in personal information"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Thông tin cá nhân, kinh nghiệm làm việc và mong muốn sự nghiệp của bạn cần được cụ thể để việc ứng tuyển và xây dựng CV được đầy đủ, chuyên nghiệp." :
                                                "Your personal information, work experience and career aspirations need to be specific so that your application and CV construction are complete and professional."
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={styles.create_cv_item}>
                                <img src={IllustrationDone} alt="IllustrationDone" />
                                <div className={styles.item_bot}>
                                    <h3>02.</h3>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Tạo CV của riêng bạn" :
                                                "Create your own CV"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "HiJob có nhiều mẫu CV đẹp, chuyên nghiệp để bạn lựa chọn. Với những thao tác đơn giản, dễ sử dụng bạn có thể tạo ra những bản CV của riêng bạn." :
                                                "HiJob has many beautiful, professional CV templates for you to choose from. With simple, easy-to-use operations, you can create your own CV."
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={styles.create_cv_item}>
                                <img src={IllustrationEmpty} alt="IllustrationEmpty" />
                                <div className={styles.item_bot}>
                                    <h3>03.</h3>
                                    <h3>
                                        {
                                            languageRedux === 1 ?
                                                "Tải xuống và chia sẻ CV" :
                                                "Download and share CVs"
                                        }
                                    </h3>
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "HiJob hỗ trợ bạn tải xuống và chia sẻ lên đến 10 CV. Bạn hãy chọn bản CV đẹp, đầy đủ thông tin và chuyên nghiệp để ứng tuyển công việc." :
                                                "HiJob supports you to download and share up to 10 CVs. Please choose a beautiful, informative and professional CV to apply for the job."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.new_page_cv_resume}>
                    <div className={styles.resume_content}>
                        <div className={styles.resume_content_left}>
                            <h3>
                                {
                                    languageRedux === 1 ?
                                        "Sơ yếu lý lịch chuyên nghiệp để phỏng vấn xin việc hiệu quả" :
                                        "Professional resume for effective job interviews"
                                }
                            </h3>
                            <p>
                                {
                                    languageRedux === 1 ?
                                        "Một đơn xin việc tuyệt vời dẫn đến một cuộc phỏng vấn tốt. Một bản lý lịch tuyệt vời là điều khiến tất cả có thể thực hiện được. Hãy bắt đầu mạnh mẽ với người quản lý tuyển dụng bằng cách tạo ra một hình ảnh chuyên nghiệp tích cực. Cuộc phỏng vấn việc làm có thể dễ dàng hơn nhiều nếu họ có cái nhìn thiện cảm về sơ yếu lý lịch của bạn." :
                                        "A great application leads to a good interview. A great resume is what makes it all possible. Start strong with the hiring manager by creating a positive professional image. The job interview can be much easier if they have a favorable view of your resume."
                                }
                            </p>
                            <Button
                                type="primary"
                                shape="round"
                                onClick={handleMoveToCreateCv}
                            >
                                {languageRedux === 1 ? 'Bắt đầu bây giờ' : 'Start now'}
                            </Button>
                        </div>
                        <img src={FrameCv2} alt="FrameCv2" />

                    </div>
                </div>
                <div className={styles.new_page_cv_question}>
                    <div className={styles.new_page_cv_question_content}>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Các câu hỏi thường gặp" :
                                    "Frequently asked Questions"
                            }
                        </h3>
                        <div className={styles.content}>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "CV là gì? Những điều bạn cần lưu ý khi viết CV xin việc?" :
                                            "What is CV? What do you need to keep in mind when writing a CV?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Cách viết CV xin việc chuẩn?" :
                                            "How to write a standard job application CV?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Cách tạo mẫu CV xin việc đơn giản?" :
                                            "How to create a simple CV template?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Một số lưu ý khi viết CV và nộp CV bạn nên nắm rõ?" :
                                            "What are some things to keep in mind when writing and submitting your CV?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Cách gửi CV qua email?" :
                                            "How to send CV via email?"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RollTop />
            <Footer />
            <ModalLogin
                openModalLogin={openModalLogin}
                setOpenModalLogin={setOpenModalLogin}
            />
            <ModalNoteCreateCompany
                openModalNoteCreateCompany={openModalNoteCreateCompany}
                setOpenModalNoteCreateCompany={setOpenModalNoteCreateCompany}
            />
            <ModalNotiValidateCompany
                openModalNoteValidateCompany={openModalNoteValidateCompany}
                setOpenModalNoteValidateCompany={setOpenModalNoteValidateCompany}
            />

            <Modal
                width={450}
                centered
                title={
                    <h3
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '24px',
                            lineHeight: '24px',
                            letterSpacing: '0em',
                            textAlign: 'center',
                        }}
                    >
                        {languageRedux === 1
                            ? 'Bạn không phải là ứng cử viên!'
                            : 'You are not a candidate!'}
                    </h3>
                }
                footer={null}
                open={openModalModalNotCandidate}
                // onOk={handleOk}
                onCancel={handleCancel}
            >
                <p
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '24px',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                    }}
                >
                    {languageRedux === 1
                        ? 'Chỉ ứng cử viên mới thực hiện được thao tác trên!'
                        : 'Only the candidate can perform the above operation'}
                </p>
                <div className={styles.button_send_request_success_modal}>
                    <Button type="primary" shape="round" onClick={handleCancel}>
                        OK
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default NewPageCV;