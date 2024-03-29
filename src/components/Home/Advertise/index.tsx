import React from "react";

import './style.scss';

import MockupHijob from '../../../img/Mockup_Hijob.png';
import { RootState } from "store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Advertise = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const languageData = useSelector((state: RootState) => state.dataLanguage.languages);
    return (
        <div className="advertise-container">
            <div className="advertise-content">
                <div className="advertsie-content_left">
                    <img src={MockupHijob} alt="Mockup_Hijob.png" />
                </div>
                <div className="advertsie-content_right">
                    <div className="content_top">
                        <h3>
                            {
                                languageRedux === 1
                                    ? 'Kiến tạo sự nghiệp của riêng bạn với HiJob!'
                                    : languageRedux === 2
                                        ? 'Create your own career with HiJob!'
                                        : languageRedux === 3
                                            ? 'HiJob과 함께 나만의 경력을 만들어보세요!'
                                            : 'Kiến tạo sự nghiệp của riêng bạn với HiJob!'
                            }
                        </h3>
                        <p>
                            {
                                languageRedux === 1
                                    ? 'Trải nghiệm quá trình tìm kiếm công việc, tạo riêng cho mình một bản CV chuyên nghiệp và hơn thế nữa.'
                                    : languageRedux === 2
                                        ? 'Experience the job search process, create your own professional CV and more.'
                                        : languageRedux === 3
                                            ? '구직 과정을 경험하고, 자신만의 전문 이력서를 작성하는 등 다양한 활동을 즐겨보세요.'
                                            : 'Trải nghiệm quá trình tìm kiếm công việc, tạo riêng cho mình một bản CV chuyên nghiệp và hơn thế nữa.'
                            }
                        </p>
                    </div>
                    <div className="content_bot">
                        <h3>
                            {
                                languageRedux === 1
                                    ? 'Tải Ứng dụng Hi Job ngay!'
                                    : languageRedux === 2
                                        ? 'Download the Hi Job App now!'
                                        : languageRedux === 3
                                            ? '지금 Hi Job 앱을 다운로드하세요!'
                                            : 'Tải Ứng dụng Hi Job ngay!'
                            }
                        </h3>
                        <div className="qr_content">
                            <div className="qr_left">
                                <img
                                    src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/qr-code.jpg"
                                    alt={languageData?.err_none_img}
                                />
                            </div>
                            <div className="qr_right">
                                <Link
                                    to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                                    target="_seft"
                                >
                                    <img
                                        id="img-gallery"
                                        src={require('../../../img/langdingPage/image 43.png')}
                                        alt={languageData?.err_none_img}
                                    />
                                </Link>
                                <Link
                                    to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                                    target="_seft"
                                >
                                    <img
                                        src={require('../../../img/langdingPage/image 45.png')}
                                        alt={languageData?.err_none_img}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Advertise;