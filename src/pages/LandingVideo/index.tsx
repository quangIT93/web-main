import React, { useState } from 'react';

import './style.scss';
import styles from './style.module.scss';
import Header_create_video from '../../img/langdingPage/Header_create_video.png';
import Illustration_1 from '../../img/langdingPage/Illustration_1.png';
import Illustration_2 from '../../img/langdingPage/Illustration_2.png';
import Illustration_3 from '../../img/langdingPage/Illustration_3.png';
import youtube_shorts from '../../img/langdingPage/youtube_shorts.png';
import tiktok from '../../img/langdingPage/tiktok.png';
import Element_create_video from '../../img/langdingPage/Element_create_video.png';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Button, Modal } from 'antd';

import ModalLogin from '#components/Home/ModalLogin';
import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';
import ModalNotiValidateCompany from '#components/Post/ModalNotiValidateCompany';
import { Backdrop, CircularProgress } from '@mui/material';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { Curve, Triangle } from './icon';
import { Link } from 'react-router-dom';
const LandingVideo = () => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const profileV3 = useSelector(
        (state: RootState) => state.dataProfileInformationV3.data,
    );
    const [openModalLogin, setOpenModalLogin] = React.useState(false);
    const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
        React.useState<any>(false);
    const [openModalNoteValidateCompany, setOpenModalNoteValidateCompany] =
        React.useState<any>(false);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const [openModalNoteWorker, setOpenModalNoteWorker] = React.useState(false);

    const analytics: any = getAnalytics();
    React.useEffect(() => {
        document.title =
            languageRedux === 1
                ? 'HiJob - Landing HiJob Video'
                : languageRedux === 2
                    ? 'HiJob - Landing HiJob Video'
                    : 'HiJob - HiJob Video 착륙';
        logEvent(analytics, 'screen_view' as string, {
            page_title: '/landing-video' as string,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux]);

    const handleCreateVideo = () => {
        if (!localStorage.getItem('accessToken')) {
            setOpenModalLogin(true);
            return;
        }
        if (profileV3 && profileV3.typeRoleData === 0) {
            setOpenModalNoteWorker(true);
            return;
        }
        if (
            profileV3 &&
            profileV3.companyInfo === null &&
            localStorage.getItem('refreshToken')
        ) {
            if (profileV3.companyInfo === null) {
                setOpenModalNoteCreateCompany(true);
                return;
            }
        } else {
            if (
                profileV3.companyInfo !== null &&
                profileV3.companyInfo.status === 0
            ) {
                setOpenModalNoteValidateCompany(true);
                return;
            } else {
                window.open(`/post`, '_parent');
            }
        }
    };

    const handleCancelNoteWorker = () => {
        setOpenModalNoteWorker(false);
    };
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const square = entry.target.querySelector(
                '.curve_arrow_animation',
            ) as HTMLElement;

            if (entry.isIntersecting) {
                square.classList.add('curve_arrow_animation_active');
                return; // if we added the class, exit the function
            }

            // We're not intersecting, so remove the class!
            square.classList.remove('curve_arrow_animation_active');
        });
    }, options);

    const curve_arrow_wrappers = document.querySelectorAll(
        '.curve_arrow_wrapper',
    );
    curve_arrow_wrappers.forEach((element) => {
        observer.observe(element);
    });

    return (
        <div className="landing_video_container">
            <div className="landing_video_content">
                <div className="landing_video_header">
                    <div className="landing_video_header_left">
                        <h3>
                            {languageRedux === 1
                                ? 'Video tuyển dụng có thể là sự bổ sung tuyệt vời cho tin tuyển dụng công ty bạn!'
                                : languageRedux === 2
                                    ? `Recruitment videos can be a great addition to your company's job postings!`
                                    : languageRedux === 3 &&
                                    '채용 비디오는 귀하 회사의 채용골고에 큰 도움이 될 수 있습니다'}
                        </h3>
                        <Button type="primary" onClick={handleCreateVideo}>
                            {languageRedux === 1
                                ? 'Tạo video tuyển dụng ngay'
                                : languageRedux === 2
                                    ? 'Create recruitment videos now'
                                    : languageRedux === 3 && '바로 채용 비디오 만들기'}
                        </Button>
                    </div>
                    <img src={Header_create_video} alt="Header_create_video" />
                </div>

                <div className="landing_video_illustration">
                    <h3>
                        {languageRedux === 1
                            ? 'HiJob sẽ hỗ trợ đăng video tuyển dụng của bạn trên nền tảng Tiktok và Youtube Shorts'
                            : languageRedux === 2
                                ? 'HiJob will support posting your recruitment videos on Tiktok and Youtube Shorts platforms'
                                : languageRedux === 3 &&
                                'HiJob은 당신의 채용 동영상을 Tiktok과 Youtube Shorts 플랫폼에 게시하도록 지원할 것이다.'}
                    </h3>
                    <div className="landing_video_illustration_content">
                        <div className="landing_video_illustration_item">
                            <img src={Illustration_1} alt="Illustration_1" />
                            <div className="item_bot">
                                <p>
                                    {languageRedux === 1
                                        ? 'Tăng số lượng ứng viên tiềm năng ứng tuyển công việc tại công ty.'
                                        : languageRedux === 2
                                            ? 'Increase the number of potential candidates applying for jobs at the company.'
                                            : languageRedux === 3 &&
                                            '회사에 취직할 수 있는 잠재 지원자의 수를 늘리다'}
                                </p>
                            </div>
                        </div>
                        <div className="landing_video_illustration_item">
                            <img src={Illustration_2} alt="Illustration_2" />
                            <div className="item_bot">
                                <p>
                                    {languageRedux === 1
                                        ? 'Thể hiện văn hóa tốt đẹp của công ty bạn đến với những ứng viên tiềm năng.'
                                        : languageRedux === 2
                                            ? `Show off your company's good culture to potential candidates`
                                            : languageRedux === 3 &&
                                            '지원자에게 회사의 좋은 문화를 보여 주다'}
                                </p>
                            </div>
                        </div>
                        <div className="landing_video_illustration_item">
                            <img src={Illustration_3} alt="Illustration_3" />
                            <div className="item_bot">
                                <p>
                                    {languageRedux === 1
                                        ? 'Thu hút nhiều sự chú ý hơn thông qua các lượt chia sẻ trên mạng xã hội.'
                                        : languageRedux === 2
                                            ? 'Get more attention through social shares.'
                                            : languageRedux === 3 &&
                                            '소셜네트워크서비스를 통해서 더 많은 관심을 끌다'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="landing_video_steps">
                    <h3>
                        {languageRedux === 1
                            ? 'Các bước cần thiết để tạo ra một video tuyển dụng'
                            : languageRedux === 2
                                ? 'Necessary steps to create a recruitment video'
                                : languageRedux === 3 && '채용 비디오를 만들기 위한 단계'}
                    </h3>
                    <div className="landing_video_steps_content">
                        <div className="landing_video_steps_item">
                            <div className="item_top">
                                <div className="steps_item_circle_wrap">
                                    <div className="steps_item_circle_out">
                                        <div className="steps_item_circle_in">
                                            <p>
                                                {languageRedux === 1
                                                    ? 'Bước 1'
                                                    : languageRedux === 2
                                                        ? 'Step 1'
                                                        : languageRedux === 3 && '1단계'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="curve_arrow_wrapper">
                                    <div className="curve_arrow_content">
                                        <div className="curve">
                                            <Curve />
                                        </div>
                                        <div className="arrow">
                                            <Triangle />
                                        </div>
                                    </div>
                                    <div className="curve_arrow_animation"></div>
                                </div>
                            </div>
                            <div className="item_bot">
                                <p>
                                    {languageRedux === 1
                                        ? 'Điền đầy đủ và chính xác thông tin cần thiết trong Đăng tin tuyển dụng của HiJob'
                                        : languageRedux === 2
                                            ? `Fill in the necessary information completely and accurately in HiJob's recruitment advertisement.`
                                            : languageRedux === 3 &&
                                            'HiJob의 채용 게시물에 필요한 정보를 완전하고 정확하게 등록하세요'}
                                </p>
                            </div>
                        </div>

                        <div className="landing_video_steps_item">
                            <div className="item_top">
                                <div className="steps_item_circle_wrap">
                                    <div className="steps_item_circle_out">
                                        <div className="steps_item_circle_in">
                                            <p>
                                                {languageRedux === 1
                                                    ? 'Bước 2'
                                                    : languageRedux === 2
                                                        ? 'Step 2'
                                                        : languageRedux === 3 && '2 단계'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="curve_arrow_wrapper">
                                    <div className="curve_arrow_content">
                                        <div className="curve">
                                            <Curve />
                                        </div>
                                        <div className="arrow">
                                            <Triangle />
                                        </div>
                                    </div>
                                    <div className="curve_arrow_animation"></div>
                                </div>
                            </div>
                            <div className="item_bot">
                                <p>
                                    {languageRedux === 1
                                        ? 'Mô tả chi tiết về công việc, yêu cầu về ứng viên'
                                        : languageRedux === 2
                                            ? 'Detailed description of the job and candidate requirements'
                                            : languageRedux === 3 &&
                                            '지원자의 요구 사항 및 직위에 대한 자세한 설명하세요'}
                                </p>
                            </div>
                        </div>

                        <div className="landing_video_steps_item">
                            <div className="item_top">
                                <div className="steps_item_circle_wrap">
                                    <div className="steps_item_circle_out">
                                        <div className="steps_item_circle_in">
                                            <p>
                                                {languageRedux === 1
                                                    ? 'Bước 3'
                                                    : languageRedux === 2
                                                        ? 'Step 3'
                                                        : languageRedux === 3 && '3 단계'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="curve_arrow_wrapper">
                                    <div className="curve_arrow_content">
                                        <div className="curve">
                                            <Curve />
                                        </div>
                                        <div className="arrow">
                                            <Triangle />
                                        </div>
                                    </div>
                                    <div className="curve_arrow_animation"></div>
                                </div>
                            </div>
                            <div className="item_bot">
                                <p>
                                    {languageRedux === 1
                                        ? 'Thêm thật nhiều hình ảnh công ty để video thêm sinh động nhằm thu hút ứng viên quan tâm'
                                        : languageRedux === 2
                                            ? 'Add lots of company images to make the video more vivid to attract interested candidates'
                                            : languageRedux === 3 &&
                                            '더 활기찬 영상을 위해서 회사 사진을 많이 올려주세요.'}
                                </p>
                            </div>
                        </div>

                        <div className="landing_video_steps_item">
                            <div className="item_top">
                                <div className="steps_item_circle_wrap">
                                    <div className="steps_item_circle_out">
                                        <div className="steps_item_circle_in">
                                            <p>
                                                {languageRedux === 1
                                                    ? 'Bước 4'
                                                    : languageRedux === 2
                                                        ? 'Step 4'
                                                        : languageRedux === 3 && '4 단계'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="curve_arrow_wrapper">
                                    <div className="curve_arrow_content">
                                        <div className="curve">
                                            <Curve />
                                        </div>
                                        <div className="arrow">
                                            <Triangle />
                                        </div>
                                    </div>
                                    <div className="curve_arrow_animation"></div>
                                </div>
                            </div>
                            <div className="item_bot">
                                <p>
                                    {languageRedux === 1
                                        ? 'Gửi yêu cầu tạo tin video tới HiJob'
                                        : languageRedux === 2
                                            ? 'Send a request to create a video message to HiJob.'
                                            : languageRedux === 3 &&
                                            'HiJob에게 채용 비디오를 요청하세요'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="landing_video_description">
                    <div className="landing_video_description_content">
                        <p>
                            {languageRedux === 1
                                ? 'Hãy cung cấp cho HiJob thật nhiều hình ảnh liên quan công ty của bạn (hình ảnh nhân viên, team building, bên ngoài công ty, bên trong văn phòng, môi trường làm việc, môi trường xung quanh,... ) để HiJob có thể tạo Video tuyển dụng một cách sống động nhất nhằm thu hút các ứng viên tiềm năng!'
                                : languageRedux === 2
                                    ? 'Please provide HiJob with lots of images related to your company (images of employees, team building, outside the company, inside the office, working environment, surrounding environment,...) for HiJob. You can create the most vivid recruitment videos to attract potential candidates!'
                                    : 'HiJob에게 회사와 관련된 많은 이미지(직원 이미지, 팀 뷰들링, 회사 외부, 사무실 내부, 작업 환경, 주변 환경 등)를 제공하십시오. HiJob이 가장 생생하게 채용 비디오를 만들어 지원자들에게 어필할 수 있도록 하겠습니다'}
                        </p>
                        <div className="landing_video_tiktok_youtube">
                            <div className="tiktok_youtube_item">
                                <div className="tiktok_youtube_icon">
                                    <img src={tiktok} alt="tiktok" />
                                </div>
                                <Link
                                    className="tiktok_youtube_url"
                                    to="https://www.tiktok.com/@hijob.site"
                                    target="_blank"
                                >
                                    /hijob.site
                                </Link>
                            </div>
                            <div className="tiktok_youtube_item">
                                <div className="tiktok_youtube_icon">
                                    <img src={youtube_shorts} alt="youtube_shorts" />
                                </div>
                                <Link
                                    className="tiktok_youtube_url"
                                    to="https://www.youtube.com/@HiJob-rz1xm"
                                    target="_blank"
                                >
                                    /HiJob-rz1xm
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="landing_video_create">
                    <img src={Element_create_video} alt="Element_create_video" />
                    <div className="landing_video_create_right">
                        <p>
                            {languageRedux === 1
                                ? 'Trong khoảng thời gian ngắn nhất tin tuyển dụng của bạn sẽ có video tuyển dụng ở cả 2 nền tảng Tiktok và Youtube Shorts và lan truyền đến thật nhiều ứng viên.'
                                : languageRedux === 2
                                    ? 'In the shortest amount of time, your recruitment ad will have a recruitment video on both Tiktok and Youtube Shorts platforms and spread to many candidates.'
                                    : languageRedux === 3 &&
                                    '당신의 채용 공고가 가장 짧은 시간 내에 틱톡과 유튜브의 두 플랫폼에서 비디오를 있을 수 있고 많은 지원자들에게 전파될 것이다.'}
                        </p>
                        <Button type="primary" shape="round" onClick={handleCreateVideo}>
                            {languageRedux === 1
                                ? 'Tạo video ngay '
                                : languageRedux === 2
                                    ? 'Sign in'
                                    : languageRedux === 3 && '바로 채용 비디오 만들기'}
                        </Button>
                    </div>
                </div>
            </div>
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
            <Backdrop
                sx={{
                    color: '#0d99ff ',
                    backgroundColor: 'transparent',
                    // boxShadow: 'none',
                    zIndex: (theme: any) => theme.zIndex.drawer + 1,
                }}
                open={openBackdrop}
            //  onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Modal
                width={500}
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
                            ? 'Bạn không phải là nhà tuyển dụng!'
                            : languageRedux === 2
                                ? `You are not a recruiter`
                                : languageRedux === 3 && '당신은 모집자가 아닙니다!'}
                    </h3>
                }
                footer={null}
                open={openModalNoteWorker}
                // onOk={handleOk}
                onCancel={handleCancelNoteWorker}
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
                        ? 'Chỉ nhà tuyển dụng mới thực hiện được thao tác trên!'
                        : languageRedux === 2
                            ? `Only the recruiter can perform the above operation`
                            : languageRedux === 3 &&
                            '고용주만이 위의 작업을 수행할 수 있습니다!'}
                </p>
                <div className="button_send_request_success_modal">
                    <Button type="primary" shape="round" onClick={handleCancelNoteWorker}>
                        {languageRedux === 1
                            ? 'OK'
                            : languageRedux === 2
                                ? 'OK'
                                : '이해했다'}
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default LandingVideo;
