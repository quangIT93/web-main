import React, { FormEvent, useEffect, useState } from 'react';

import styles from './style.module.scss';
import MagicWand from '../../img/langdingPage/MagicWand.png';
import Atom from '../../img/langdingPage/Atom.png';
import FolderLock from '../../img/langdingPage/FolderLock.png';
import FilePlus from '../../img/langdingPage/FilePlus.png';
import Command from '../../img/langdingPage/Command.png';
import Frame_CVS from '../../img/langdingPage/Frame_CVS.png';
import IllustrationDone from '../../img/langdingPage/IllustrationDone.png';
import IllustrationEmpty from '../../img/langdingPage/IllustrationEmpty.png';
import IllustrationWriting from '../../img/langdingPage/IllustrationWriting.png';
import FrameCv2 from '../../img/langdingPage/FrameCv2.png';
import New_CV_template from '../../img/langdingPage/New_CV_template.png';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Button, Modal } from 'antd';
import ModalLogin from '#components/Home/ModalLogin';
import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';
import ModalNotiValidateCompany from '#components/Post/ModalNotiValidateCompany';
import { Backdrop, CircularProgress } from '@mui/material';
import Navbar from '#components/Navbar';
import CategoryDropdown from '#components/CategoryDropdown';
import Footer from '#components/Footer/Footer';
import RollTop from '#components/RollTop';
import apiCv from 'api/apiCv';
import './style.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Mousewheel, Navigation } from 'swiper';
import { log } from 'util';
import { getAnalytics, logEvent } from 'firebase/analytics';
const NewPageCV = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const profileMoreV3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState<any>(false);
  const [openModalNoteValidateCompany, setOpenModalNoteValidateCompany] =
    React.useState<any>(false);
  const [openModalModalNotCandidate, setOpenModalNotCandidate] =
    React.useState(false);
  const [getThemeCv, setGetThemeCv] = React.useState<any>([]);
  const handleCancel = () => {
    setOpenModalNotCandidate(false);
  };
  // console.log(profileV3);

  const handleMoveToDoc = () => {
    window.open(`/policy`, '_parent');
  };

  const handleMoveToCreateCv = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    if (profileV3 && profileV3.typeRoleData === 1) {
      setOpenModalNotCandidate(true);
      return;
    } else {
      window.open('/templates-cv', '_parent');
    }
  };

  const getTheme = async () => {
    try {
      const result = await apiCv.getThemeCv();
      if (result) {
        setGetThemeCv(result.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getTheme();
    // Lấy danh sách các phần tử .slick-active trong Slider
  }, [profileMoreV3]);
  const analytics: any = getAnalytics();
  React.useEffect(() => {
    document.title =
      languageRedux === 1
        ? 'HiJob - Hướng dẫn tạo mẫu CV'
        : languageRedux === 2
        ? 'HiJob - Instructions for creating a sample CV'
        : 'HiJob - 이력서 작성 안내';
    logEvent(analytics, 'screen_view' as string, {
      page_title: '/landing-hijob' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);
  return (
    <div className={styles.new_page_cv_container}>
      <Navbar />
      <CategoryDropdown />
      <div className={styles.new_page_cv_content}>
        <div className={styles.new_page_cv_header}>
          <div className={styles.new_page_cv_header_content}>
            <div className={styles.content}>
              <h3>
                {languageRedux === 1
                  ? 'Chỉ có 2% hồ sơ vượt qua vòng tuyển dụng đầu tiên. Nằm trong top 2%!'
                  : languageRedux === 2
                  ? 'Only 2% of applications pass the first recruitment round. In the top 2%!'
                  : '지원자의 2%만이 1차 채용 라운드를 통과합니다. 상위 2% 안에!'}
              </h3>
              <p>
                {languageRedux === 1
                  ? "Sử dụng các mẫu sơ yếu lý lịch đã được kiểm tra chuyên nghiệp tại hiện trường tuân theo 'quy tắc sơ yếu lý lịch' chính xác mà nhà tuyển dụng tìm kiếm. Dễ sử dụng và thực hiện trong vòng vài phút - hãy thử miễn phí ngay bây giờ!"
                  : languageRedux === 2
                  ? "Use professionally field-tested resume templates that follow the exact 'resume rules' employers look for. Easy to use and done within minutes - try it for free now!"
                  : "고용주가 찾는 정확한 '이력서 규칙'을 따르는 전문적으로 현장 테스트를 거친 이력서 템플릿을 사용하세요. 사용하기 쉽고 몇 분 안에 완료됩니다. 지금 무료로 사용해 보세요!"}
              </p>
              <div className={styles.btn_count_cv}>
                <Button
                  type="primary"
                  // shape="round"
                  onClick={handleMoveToCreateCv}
                >
                  {languageRedux === 1
                    ? 'Tạo CV cho riêng bạn'
                    : languageRedux === 2
                    ? 'Create your own CV'
                    : '나만의 이력서 만들기'}
                </Button>
                <div className={styles.count_cv}>
                  <div className={styles.circle}></div>
                  <p>
                    <span>100</span>
                    {languageRedux === 1
                      ? 'CV được tạo ngày hôm nay'
                      : languageRedux === 2
                      ? 'CV created today'
                      : '오늘 만든 이력서'}
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
              {languageRedux === 1
                ? 'Các tính năng được thiết kế để giúp bạn giành được công việc mơ ước.'
                : languageRedux === 2
                ? 'Features designed to help you land your dream job.'
                : '꿈의 직업을 구하는 데 도움이 되도록 설계된 기능입니다.'}
            </h3>
            <div className={styles.functions_list}>
              <div className={styles.functions_item}>
                <div className={styles.icon_item}>
                  <img src={MagicWand} alt="MagicWand" />
                </div>
                <div className={styles.content_item}>
                  <h3>
                    {languageRedux === 1
                      ? 'Trình tạo sơ yếu lý lịch trực tuyến dễ dàng'
                      : languageRedux === 2
                      ? 'Easy online resume builder'
                      : '쉬운 온라인 이력서 작성기'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Tạo một sơ yếu lý lịch tuyệt vời trong vài phút mà không cần rời khỏi trình duyệt web của bạn.'
                      : languageRedux === 2
                      ? 'Create a great resume in minutes without leaving your web browser.'
                      : '웹 브라우저를 떠나지 않고도 몇 분 만에 멋진 이력서를 작성할 수 있습니다.'}
                  </p>
                </div>
              </div>
              <div className={styles.functions_item}>
                <div className={styles.icon_item}>
                  <img src={Atom} alt="Atom" />
                </div>
                <div className={styles.content_item}>
                  <h3>
                    {languageRedux === 1
                      ? 'Tùy chọn sơ yếu lý lịch đa định dạng'
                      : languageRedux === 2
                      ? 'Multi-format resume options'
                      : '다중 형식 이력서 옵션'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Lưu sơ yếu lý lịch hoàn hảo của bạn ở định dạng PDF chỉ bằng một cú nhấp chuột.'
                      : languageRedux === 2
                      ? 'Save your perfect resume in PDF format with just one click.'
                      : '단 한 번의 클릭으로 완벽한 이력서를 PDF 형식으로 저장하세요.'}
                  </p>
                </div>
              </div>
              <div className={styles.functions_item}>
                <div className={styles.icon_item}>
                  <img src={Command} alt="Command" />
                </div>
                <div className={styles.content_item}>
                  <h3>
                    {languageRedux === 1
                      ? 'Sơ yếu lý lịch được tối ưu hóa'
                      : languageRedux === 2
                      ? 'Optimized resume'
                      : '최적화된 이력서'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Các thiết kế được tối ưu hóa cho các thuật toán lọc sơ yếu lý lịch. Đảm bảo mọi người nhìn thấy ứng dụng của bạn!'
                      : languageRedux === 2
                      ? 'Designs optimized for resume filtering algorithms. Make sure everyone sees your app!'
                      : '이력서 필터링 알고리즘에 최적화된 디자인. 모든 사람이 귀하의 앱을 볼 수 있도록 하세요!'}
                  </p>
                </div>
              </div>
              <div className={styles.functions_item}>
                <div className={styles.icon_item}>
                  <img src={FolderLock} alt="FolderLock" />
                </div>
                <div className={styles.content_item}>
                  <h3>
                    {languageRedux === 1
                      ? 'Dữ liệu của bạn được an toàn'
                      : languageRedux === 2
                      ? 'Your data is safe'
                      : '귀하의 데이터는 안전합니다'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Dữ liệu của bạn được giữ kín và được bảo vệ bằng mã hóa 256-bit mạnh mẽ.'
                      : languageRedux === 2
                      ? 'Your data is kept private and protected by strong 256-bit encryption.'
                      : '귀하의 데이터는 비공개로 유지되며 강력한 256비트 암호화로 보호됩니다.'}
                  </p>
                </div>
              </div>
              <div className={styles.functions_item}>
                <div className={styles.icon_item}>
                  <img src={FilePlus} alt="FilePlus" />
                </div>
                <div className={styles.content_item}>
                  <h3>
                    {languageRedux === 1
                      ? 'Mẫu đã được phê duyệt'
                      : languageRedux === 2
                      ? 'Sample approved'
                      : '샘플 승인됨'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Các mẫu và ví dụ sơ yếu lý lịch được thiết kế chuyên nghiệp. Chỉ cần chỉnh sửa và tải xuống trong 5 phút.'
                      : languageRedux === 2
                      ? 'Professionally designed resume templates and examples. Just edit and download in 5 minutes.'
                      : '전문적으로 디자인된 이력서 템플릿 및 예제. 5분 안에 편집하고 다운로드하세요.'}
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
                {languageRedux === 1
                  ? 'HiJob Đề xuất'
                  : languageRedux === 2
                  ? 'HiJob Proposal'
                  : 'HiJob 추천'}
              </h3>
              <p>
                {languageRedux === 1
                  ? 'HiJob có khả năng phân tích yêu cầu, thói quen, hành vi của nhà tuyển dụng và ứng viên, đồng thời khai thác tối đa lượng dữ liệu lớn, từ đó đưa ra các phán đoán và đề xuất về những việc có thể làm để tuyển dụng hiệu quả hơn, kết nối đúng nhu cầu tuyển dụng của doanh nghiệp với các ứng viên phù hợp.'
                  : languageRedux === 2
                  ? 'HiJob has the ability to analyze the requirements, habits, and behaviors of employers and candidates, and make the most of large amounts of data, thereby making judgments and recommendations on what can be done to Recruit more effectively, connecting the right recruitment needs of the business with the right candidates.'
                  : 'HiJob은 고용주와 후보자의 요구 사항, 습관, 행동을 분석하고 방대한 양의 데이터를 최대한 활용하여 Recruit을 보다 효과적으로 수행할 수 있는 방법에 대한 판단과 제안을 제공하고, 적합한 후보자와 비즈니스를 하세요.'}
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
                {languageRedux === 1
                  ? 'Mẫu sơ yếu lý lịch đẹp có sẵn để sử dụng'
                  : languageRedux === 2
                  ? 'Beautiful resume templates available for use'
                  : '사용할 수 있는 아름다운 이력서 템플릿'}
              </h3>
              <p>
                {languageRedux === 1
                  ? 'Thu hút các nhà tuyển dụng và nhà tuyển dụng bằng cách sử dụng một trong hơn 20 mẫu sơ yếu lý lịch được thiết kế chuyên nghiệp, trang nhã của chúng tôi. Tải xuống word hoặc PDF.'
                  : languageRedux === 2
                  ? 'Attract recruiters and recruiters by using one of our 20+ elegant, professionally designed resume templates. Download word or PDF.'
                  : '20개 이상의 우아하고 전문적으로 디자인된 이력서 템플릿 중 하나를 사용하여 채용 담당자와 채용 담당자의 관심을 끌 수 있습니다. 단어나 PDF를 다운로드하세요.'}
              </p>
              <Button
                type="primary"
                shape="round"
                onClick={handleMoveToCreateCv}
              >
                {languageRedux === 1
                  ? 'Chọn mẫu sơ yếu lý lịch'
                  : languageRedux === 2
                  ? 'Choose a cv template'
                  : '이력서 템플릿을 선택하세요'}
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
                modules={[Mousewheel, Navigation, Autoplay]}
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
                {languageRedux === 1
                  ? 'Tạo sơ yếu lý lịch hoàn hảo cho thị trường việc làm hiện đại'
                  : languageRedux === 2
                  ? 'Create the perfect resume for the modern job market'
                  : '현대 취업 시장에 맞는 완벽한 이력서 만들기'}
              </h3>
              <p>
                {languageRedux === 1
                  ? 'Tạo sơ yếu lý lịch chưa bao giờ dễ dàng đến thế! Trong ba bước đơn giản, hãy tạo tài liệu hoàn hảo để gây ấn tượng với người quản lý tuyển dụng và nhà tuyển dụng. Thời gian tối thiểu, chất lượng chuyên nghiệp tối đa.'
                  : languageRedux === 2
                  ? 'Creating a resume has never been easier! In three simple steps, create the perfect document to impress hiring managers and recruiters. Minimum time, maximum professional quality.'
                  : '이력서 작성이 이보다 쉬웠던 적은 없었습니다! 간단한 세 단계를 통해 채용 관리자와 채용 담당자에게 깊은 인상을 줄 수 있는 완벽한 문서를 만드세요. 최소한의 시간, 최대의 전문적인 품질.'}
              </p>
              <Button
                type="primary"
                // shape="round"
                onClick={handleMoveToCreateCv}
              >
                {languageRedux === 1
                  ? 'Tạo CV cho riêng bạn'
                  : languageRedux === 2
                  ? 'Create your own CV'
                  : '나만의 이력서 만들기'}
              </Button>
            </div>
            <div className={styles.create_cv_content}>
              <div className={styles.create_cv_item}>
                <img src={IllustrationWriting} alt="IllustrationWriting" />
                <div className={styles.item_bot}>
                  <h3>01.</h3>
                  <h3>
                    {languageRedux === 1
                      ? 'Điền thông tin cá nhân'
                      : languageRedux === 2
                      ? 'Fill in personal information'
                      : '개인정보를 입력하세요'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Thông tin cá nhân, kinh nghiệm làm việc và mong muốn sự nghiệp của bạn cần được cụ thể để việc ứng tuyển và xây dựng CV được đầy đủ, chuyên nghiệp.'
                      : languageRedux === 2
                      ? 'Your personal information, work experience and career aspirations need to be specific so that your application and CV construction are complete and professional.'
                      : '귀하의 지원서와 이력서 작성이 완전하고 전문적이 되도록 귀하의 개인 정보, 업무 경험 및 경력 포부가 구체적이어야 합니다.'}
                  </p>
                </div>
              </div>
              <div className={styles.create_cv_item}>
                <img src={IllustrationDone} alt="IllustrationDone" />
                <div className={styles.item_bot}>
                  <h3>02.</h3>
                  <h3>
                    {languageRedux === 1
                      ? 'Tạo CV của riêng bạn'
                      : languageRedux === 2
                      ? 'Create your own CV'
                      : '나만의 이력서 만들기'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'HiJob có nhiều mẫu CV đẹp, chuyên nghiệp để bạn lựa chọn. Với những thao tác đơn giản, dễ sử dụng bạn có thể tạo ra những bản CV của riêng bạn.'
                      : languageRedux === 2
                      ? 'HiJob has many beautiful, professional CV templates for you to choose from. With simple, easy-to-use operations, you can create your own CV.'
                      : 'HiJob에는 선택할 수 있는 아름답고 전문적인 이력서 템플릿이 많이 있습니다. 간단하고 사용하기 쉬운 조작으로 나만의 CV를 만들 수 있습니다.'}
                  </p>
                </div>
              </div>
              <div className={styles.create_cv_item}>
                <img src={IllustrationEmpty} alt="IllustrationEmpty" />
                <div className={styles.item_bot}>
                  <h3>03.</h3>
                  <h3>
                    {languageRedux === 1
                      ? 'Tải xuống và chia sẻ CV'
                      : languageRedux === 2
                      ? 'Download and share CVs'
                      : '이력서 다운로드 및 공유'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'HiJob hỗ trợ bạn tải xuống và chia sẻ lên đến 10 CV. Bạn hãy chọn bản CV đẹp, đầy đủ thông tin và chuyên nghiệp để ứng tuyển công việc.'
                      : languageRedux === 2
                      ? 'HiJob supports you to download and share up to 10 CVs. Please choose a beautiful, informative and professional CV to apply for the job.'
                      : 'HiJob은 최대 10개의 이력서를 다운로드하고 공유할 수 있도록 지원합니다. 해당 직무에 지원하려면 아름답고 유익하며 전문적인 이력서를 선택하세요.'}
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
                {languageRedux === 1
                  ? 'Sơ yếu lý lịch chuyên nghiệp để phỏng vấn xin việc hiệu quả'
                  : languageRedux === 2
                  ? 'Professional resume for effective job interviews'
                  : '효과적인 취업 면접을 위한 전문 이력서'}
              </h3>
              <p>
                {languageRedux === 1
                  ? 'Một đơn xin việc tuyệt vời dẫn đến một cuộc phỏng vấn tốt. Một bản lý lịch tuyệt vời là điều khiến tất cả có thể thực hiện được. Hãy bắt đầu mạnh mẽ với người quản lý tuyển dụng bằng cách tạo ra một hình ảnh chuyên nghiệp tích cực. Cuộc phỏng vấn việc làm có thể dễ dàng hơn nhiều nếu họ có cái nhìn thiện cảm về sơ yếu lý lịch của bạn.'
                  : languageRedux === 2
                  ? 'A great application leads to a good interview. A great resume is what makes it all possible. Start strong with the hiring manager by creating a positive professional image. The job interview can be much easier if they have a favorable view of your resume.'
                  : '훌륭한 지원서는 좋은 인터뷰로 이어집니다. 훌륭한 이력서는 모든 것을 가능하게 해줍니다. 긍정적인 전문적 이미지를 만들어 채용 관리자와 함께 강력한 시작을 해보세요. 이력서에 대해 호의적인 견해를 가지고 있다면 면접이 훨씬 쉬울 수 있습니다.'}
              </p>
              <Button
                type="primary"
                shape="round"
                onClick={handleMoveToCreateCv}
              >
                {languageRedux === 1
                  ? 'Bắt đầu bây giờ'
                  : languageRedux === 2
                  ? 'Start now'
                  : '지금 시작하세요'}
              </Button>
            </div>
            <img src={FrameCv2} alt="FrameCv2" />
          </div>
        </div>
        {/* <div className={styles.new_page_cv_question}>
                    <div className={styles.new_page_cv_question_content}>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Các câu hỏi thường gặp" :
                                    languageRedux === 2 ?
                                        "Frequently asked Questions" :
                                        "자주 묻는 질문"
                            }
                        </h3>
                        <div className={styles.content}>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "CV là gì? Những điều bạn cần lưu ý khi viết CV xin việc?" :
                                            languageRedux === 2 ?
                                                "What is CV? What do you need to keep in mind when writing a CV?" :
                                                "이력서란 무엇입니까? 이력서를 작성할 때 유의해야 할 점은 무엇인가요?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Cách viết CV xin việc chuẩn?" :
                                            languageRedux === 2 ?
                                                "How to write a standard job application CV?" :
                                                "표준 입사 지원서 CV를 작성하는 방법은 무엇입니까?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Cách tạo mẫu CV xin việc đơn giản?" :
                                            languageRedux === 2 ?
                                                "How to create a simple CV template?" :
                                                "간단한 이력서 템플릿을 만드는 방법은 무엇입니까?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Một số lưu ý khi viết CV và nộp CV bạn nên nắm rõ?" :
                                            languageRedux === 2 ?
                                                "What are some things to keep in mind when writing and submitting your CV?" :
                                                "이력서 작성 및 제출 시 주의할 점은 무엇인가요?"
                                    }
                                </p>
                            </div>
                            <div onClick={handleMoveToDoc} className={styles.content_item}>
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Cách gửi CV qua email?" :
                                            languageRedux === 2 ?
                                                "How to send CV via email?" :
                                                "이메일로 이력서를 보내는 방법은 무엇입니까?"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
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
              : languageRedux === 2
              ? 'You are not a candidate!'
              : '당신은 후보자가 아닙니다!'}
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
            : languageRedux === 2
            ? 'Only the candidate can perform the above operation'
            : '위의 작업은 후보자만이 수행할 수 있습니다!'}
        </p>
        <div className={styles.button_send_request_success_modal}>
          <Button type="primary" shape="round" onClick={handleCancel}>
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

export default NewPageCV;
