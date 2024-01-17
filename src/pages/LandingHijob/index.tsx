import React, { FormEvent, useState } from 'react';

import styles from './style.module.scss';
import headerImage from '../../img/langdingPage/Hero-Image-1.png';
import hijobRecruitment from '../../img/langdingPage/Mockup_Final_1.png';
import hijobPropose from '../../img/langdingPage/laptop_mk3 1.png';
import item1 from '../../img/langdingPage/Asset-100.png';
import item2 from '../../img/langdingPage/Asset-15.png';
import item3 from '../../img/langdingPage/Asset-70.png';
import item4 from '../../img/langdingPage/Asset-22.png';
import item5 from '../../img/langdingPage/Asset-8.png';
import laptop from '../../img/langdingPage/laptop-1.png';
import mockup1 from '../../img/langdingPage/Mockup_Job.png';
import mockup2 from '../../img/langdingPage/Mockup_CV2.png';
import mockup3 from '../../img/langdingPage/Mockup_CV1.png';
import nofitication from '../../img/langdingPage/Notification.png';
import frame from '../../img/langdingPage/Frame-34799.png';
import Outstanding_features_1_new from '../../img/langdingPage/Outstanding_features_1_new.png';
import Outstanding_features_2_new from '../../img/langdingPage/Outstanding_features_2_new.png';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Button, Input, InputRef, Modal, message } from 'antd';
import { Icon4PointedStar } from '#components/Icons';
import emailjs from '@emailjs/browser';
import ModalLogin from '#components/Home/ModalLogin';
import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';
import ModalNotiValidateCompany from '#components/Post/ModalNotiValidateCompany';
import { Backdrop, CircularProgress } from '@mui/material';
import { getAnalytics, logEvent } from 'firebase/analytics';
const LandingHijob = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const [info, setInfo] = useState({
    from_name: '',
    user_email: '',
    message: '',
  });
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState<any>(false);
  const [openModalNoteValidateCompany, setOpenModalNoteValidateCompany] =
    React.useState<any>(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openModalSendRequestSuccess, setOpenModalSendRequestSuccess] =
    React.useState(false);
  const [openModalNoteWorker, setOpenModalNoteWorker] = React.useState(false);
  const handleChange = (e: any) => {
    setInfo((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  const analytics: any = getAnalytics();
  React.useEffect(() => {
    document.title =
      languageRedux === 1
        ? 'HiJob - Landing HiJob'
        : languageRedux === 2
          ? 'HiJob - Landing HiJob'
          : 'HiJob - HiJob 착륙';
    logEvent(analytics, 'screen_view' as string, {
      page_title: '/landing-hijob' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);
  const form = React.useRef<any>(null);
  const inputNameRef = React.useRef<InputRef>(null);
  const inputEmailRef = React.useRef<InputRef>(null);
  const inputPhoneRef = React.useRef<InputRef>(null);

  const regexCheckPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validValue = () => {
    if (info.from_name?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên không được bỏ trống'
            : languageRedux === 2
              ? 'Full name cannot be empty'
              : languageRedux === 3 && '이름은 비워둘 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (info.from_name?.trim().length > 255) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên không được vượt quá 255 ký tự'
            : languageRedux === 2
              ? 'Full name cannot exceed 255 characters'
              : languageRedux === 3 && '이름은 255자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (info.user_email?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không được bỏ trống'
            : languageRedux === 2
              ? 'Email cannot be empty'
              : languageRedux === 3 && '이메일이 비어 있지 않습니다',
        checkForm: false,
        idError: 2,
      };
    }
    if (regexCheckEmail.test(info.user_email) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không đúng định dạng'
            : languageRedux === 2
              ? 'The Email is not in the correct format'
              : languageRedux === 3 && '이메일의 형식이 올바르지 않습니다.',
        checkForm: false,
        idError: 2,
      };
    }
    if (info.message?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không được bỏ trống'
            : languageRedux === 2
              ? 'Phone cannot be empty'
              : languageRedux === 3 && '전화는 비워 둘 수 없습니다.',
        checkForm: false,
        idError: 3,
      };
    }
    if (regexCheckPhone.test(info.message) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không đúng định dạng'
            : languageRedux === 2
              ? 'The phone number is not in the correct format'
              : languageRedux === 3 && '전화 번호의 형식이 올바르지 않습니다.',
        checkForm: false,
        idError: 3,
      };
    }

    return {
      messageError: '',
      checkForm: true,
      idError: 0,
    };
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();
    const { messageError, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        setOpenBackdrop(true);
        emailjs
          .sendForm(
            'service_a3whncs',
            'template_ttg86o2',
            form?.current,
            'rhAsO6zgXRYuWpkqy',
          )
          .then(
            (result: any) => {
              setOpenBackdrop(false);
              console.log(result.text);
              setOpenModalSendRequestSuccess(true);
              setInfo({
                from_name: '',
                user_email: '',
                message: '',
              });
            },
            (error: any) => {
              console.log(error.text);
            },
          );
      } else {
        message.error(messageError);
        switch (idError) {
          case 1:
            inputNameRef.current!.focus({
              cursor: 'end',
            });
            break;
          case 2:
            inputEmailRef.current!.focus({
              cursor: 'end',
            });
            break;
          case 3:
            inputPhoneRef.current!.focus({
              cursor: 'end',
            });
            break;

          default:
            break;
        }
      }
    } catch (error) { }
  };
  // console.log(profileV3);

  const handleMoveToPost = () => {
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

  const handleMoveToRegister = () => {
    const register_form = document.getElementById(
      'landing_hijob_register_form',
    ) as HTMLElement;
    // register_form.scrollIntoView();
    let newJobOffsetTop = 0;
    if (register_form) {
      newJobOffsetTop = document.getElementById('landing_hijob_register_form')
        ? register_form.offsetTop
        : 0;
      window.scrollTo(0, newJobOffsetTop - 200);
    }
  };

  const handleCancel = () => {
    setOpenModalSendRequestSuccess(false);
  };
  const handleCancelNoteWorker = () => {
    setOpenModalNoteWorker(false);
  };

  return (
    <div className={styles.landing_hijob_container}>
      <div className={styles.landing_hijob_content}>
        <div className={styles.landing_header}>
          <div className={styles.content}>
            <h3>
              {languageRedux === 1
                ? 'Dịch vụ cộng đồng đăng tin tuyển dụng, tìm kiếm ứng viên hiệu quả.'
                : languageRedux === 2
                  ? 'Community services post job postings, search for candidates effectively.'
                  : languageRedux === 3 &&
                  '채용 공고를 게시하고 효과적으로 후보자를 검색할 수 있는 커뮤니티 서비스입니다.'}
            </h3>
            <Button type="primary" shape="round" onClick={handleMoveToPost}>
              {languageRedux === 1
                ? 'Đăng tin miễn phí'
                : languageRedux === 2
                  ? 'Post for free'
                  : languageRedux === 3 && '무료로 채용 공고 게시'}
            </Button>
          </div>
          <img src={headerImage} alt="headerImage" />
        </div>
        <div className={styles.landing_recruitment}>
          <div className={styles.landing_recruitment_left}>
            <h3>
              {languageRedux === 1
                ? 'HiJob Tuyển dụng'
                : languageRedux === 2
                  ? 'HiJob Recruitment'
                  : languageRedux === 3 && 'HiJob 채용'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'HiJob mang đến những giải pháp toàn diện giúp Doanh nghiệp giải quyết đồng thời các bài toán xoay quanh vấn đề tuyển dụng, từ việc tìm kiếm những CV, sàng lọc hồ sơ ứng viên cho đến đánh giá ứng viên và đo lường hiệu quả.'
                : languageRedux === 2
                  ? 'HiJob brings comprehensive solutions to help businesses simultaneously solve problems around recruitment, from finding CVs, screening candidate profiles to evaluating candidates and measuring effectiveness.'
                  : languageRedux === 3 &&
                  'HiJob은 기업이 이력서 검색, 후보자 프로필 심사, 후보자 평가 및 효율성 측정에 이르기까지 채용 문제와 관련된 문제를 동시에 해결할 수 있도록 지원하는 포괄적인 솔루션을 제공합니다.'}
            </p>
            <Button type="primary" shape="round" onClick={handleMoveToRegister}>
              {languageRedux === 1
                ? 'Tư vấn tuyển dụng miễn phí'
                : languageRedux === 2
                  ? 'Free recruitment consultation'
                  : languageRedux === 3 && '무료 채용 상담'}
            </Button>
          </div>
          <img src={hijobRecruitment} alt="hijobRecruitment" />
        </div>

        <div className={styles.landing_outstanding}>
          <div className={styles.outstanding_title}>
            <h3>
              {languageRedux === 1
                ? 'Đặc trưng nổi bật của HIJOB'
                : languageRedux === 2
                  ? 'Outstanding features of HIJOB'
                  : languageRedux === 3 &&
                  'HIJOB의 특징'}
            </h3>
          </div>
          <div className={styles.outstanding_content}>
            <div className={styles.outstanding_item}>
              <img src={Outstanding_features_1_new} alt="Outstanding_features_1_new" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Nguồn tin tuyển dụng đa dạng nhất'
                    : languageRedux === 2
                      ? 'The most diverse source of recruitment information'
                      : languageRedux === 3 && '제일 다양한 재용공고'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'Nơi tập hợp các tin tuyển dụng đa dạng từ nhiều nền tảng khác nhau (Facebook, Chợ tốt, Vietnamworks, Careerlink...).'
                    : languageRedux === 2
                      ? 'A place that gathers diverse job postings from many different platforms (Facebook, Cho Tot, Vietnamworks, Careerlink...).'
                      : languageRedux === 3 &&
                      '다양한 플랫폼의 다양한 채용 정보를 모아 놓은 곳 (facebook, chợ tốt, vietnamworks, careerlink...).'}
                </p>
              </div>
            </div>
            <div className={styles.outstanding_item}>
              <img src={Outstanding_features_2_new} alt="Outstanding_features_2_new" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Tạo video tuyển dụng miễn phí'
                    : languageRedux === 2
                      ? 'Create free recruitment videos'
                      : languageRedux === 3 && '무료 채용 비디오 만들기'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'Khi đăng tin tuyển dụng tại Hijob, Hijob hổ trợ giúp bạn tạo video quảng cáo tin tuyển dụng miễn phí trên nền tảng Tiktok và Youtube short.'
                    : languageRedux === 2
                      ? 'When posting a recruitment ad at Hijob, Hijob supports you in creating free recruitment advertisement videos on Tiktok and Youtube short platforms.'
                      : languageRedux === 3 &&
                      'Hijob에서 채용 공고를 게시할 때, hojob은 틱톡과 유투브 소셜 플랫폼에서 무료 채용 비디오를 만드는 것을 돕는다.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.landing_propose}>
          <h3>
            {languageRedux === 1
              ? 'Công nghệ đăng tin tuyển dụng mới. Tính năng mới. Trải nghiệm mới.'
              : languageRedux === 2
                ? 'New job posting technology. New feature. New experience.'
                : languageRedux === 3 &&
                '새로운 채용 공고 기술. 새로운 기능. 새로운 경험.'}
          </h3>
          <div className={styles.landing_propose_content}>
            <img src={hijobPropose} alt="hijobPropose" />
            <div className={styles.landing_propose_right}>
              <h3>
                {languageRedux === 1
                  ? 'HiJob Đề xuất'
                  : languageRedux === 2
                    ? 'HiJob Proposal'
                    : languageRedux === 3 && 'HiJob 추천'}
              </h3>
              <p>
                {languageRedux === 1
                  ? 'HiJob có khả năng phân tích yêu cầu, thói quen, hành vi của nhà tuyển dụng và ứng viên, đồng thời khai thác tối đa lượng dữ liệu lớn, từ đó đưa ra các phán đoán và đề xuất về những việc có thể làm để tuyển dụng hiệu quả hơn, kết nối đúng nhu cầu tuyển dụng của doanh nghiệp với các ứng viên phù hợp.'
                  : languageRedux === 2
                    ? 'HiJob has the ability to analyze the requirements, habits, and behaviors of employers and candidates, and make the most of large amounts of data, thereby making judgments and recommendations on what can be done to Recruit more effectively, connecting the right recruitment needs of the business with the right candidates.'
                    : languageRedux === 3 &&
                    'HiJob은 고용주와 후보자의 요구 사항, 습관, 행동을 분석하고 방대한 양의 데이터를 최대한 활용하여 Recruit을 보다 효과적으로 수행할 수 있는 방법에 대한 판단과 제안을 제공하고, 적합한 후보자와 비즈니스를 하세요.'}
              </p>
              <Button
                type="primary"
                shape="round"
                onClick={handleMoveToRegister}
              >
                {languageRedux === 1
                  ? 'Tư vấn tuyển dụng miễn phí'
                  : languageRedux === 2
                    ? 'Free recruitment consultation'
                    : languageRedux === 3 && '무료 채용 상담'}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.landing_advantages}>
          <div className={styles.advantages_title}>
            <h3>
              {languageRedux === 1
                ? 'Các ưu điểm có trên HiJob Recruitment.'
                : languageRedux === 2
                  ? 'Advantages available on HiJob Recruitment.'
                  : languageRedux === 3 &&
                  'HiJob Recruitment에서 제공되는 이점'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Với công nghệ mới, HiJob Recruitment kế thừa những ưu điểm hiện tại và mang đến trải nghiệm một cách hoàn toàn khác biệt, giúp doanh nghiệp tuyển dụng hiệu quả trong thời đại số.'
                : languageRedux === 2
                  ? 'With new technology, HiJob Recruitment inherits current advantages and brings a completely different experience, helping businesses recruit effectively in the digital age.'
                  : languageRedux === 3 &&
                  '새로운 기술을 통해 HiJob Recruitment는 현재의 장점을 계승하고 완전히 다른 경험을 제공하여 기업이 디지털 시대에 효과적으로 채용할 수 있도록 돕습니다.'}
            </p>
          </div>
          <div className={styles.advantages_content}>
            <div className={styles.advantages_content_top}>
              <div className={styles.advantages_item}>
                <img src={item1} alt="item1" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Đăng tin tuyển dụng miễn phí'
                      : languageRedux === 2
                        ? 'Post job ads for free'
                        : languageRedux === 3 && '무료로 채용 광고 게시'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'HiJob hỗ trợ các nhà tuyển dụng đăng tin miễn phí một cách nhanh chóng, dễ dàng nhờ vào những công cụ được tạo riêng bởi HiJob dành cho bạn.'
                      : languageRedux === 2
                        ? 'HiJob helps employers post free ads quickly and easily thanks to tools created specifically for you by HiJob.'
                        : languageRedux === 3 &&
                        'HiJob은 HiJob이 귀하를 위해 특별히 제작한 도구 덕분에 고용주가 무료 광고를 빠르고 쉽게 게시할 수 있도록 도와줍니다.'}
                  </p>
                </div>
              </div>
              <div className={styles.advantages_item}>
                <img src={item2} alt="item2" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Số lượng Ứng viên ứng tuyển lớn'
                      : languageRedux === 2
                        ? 'Large number of candidates applying'
                        : languageRedux === 3 && '지원자 수가 많아'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'HiJob có số lượng lớn Ứng viên hoạt động thường xuyên, lâu dài. Nhờ vào số lượng công việc đa dạng ngành nghề, địa điểm,...'
                      : languageRedux === 2
                        ? 'HiJob has a large number of candidates who are active regularly and for a long time. Thanks to the diverse number of jobs in professions, locations,...'
                        : languageRedux === 3 &&
                        'HiJob에는 정기적으로, 오랫동안 활동하는 지원자가 많이 있습니다. 직업, 위치, 분야의 다양한 직업 덕분에...'}
                  </p>
                </div>
              </div>
              <div className={styles.advantages_item}>
                <img src={item3} alt="item3" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Tính năng quản lý tin tuyển dụng, CV ứng viên'
                      : languageRedux === 2
                        ? 'Features for managing recruitment news and candidate CVs'
                        : languageRedux === 3 &&
                        '채용 소식 및 후보자 CV 관리 기능'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Giúp nhà tuyển dụng quản lý kho CV ứng viên, tin tuyển dụng của mình một cách đầy đủ, có tính hệ thống và không bị mất mát dữ liệu.'
                      : languageRedux === 2
                        ? 'Helps employers manage their warehouse of candidate CVs and job postings fully, systematically and without data loss.'
                        : languageRedux === 3 &&
                        '고용주가 후보자 CV 및 채용 공고 창고를 데이터 손실 없이 완전하고 체계적으로 관리할 수 있도록 도와줍니다.'}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.advantages_content_bot}>
              <div className={styles.advantages_item}>
                <img src={item4} alt="item4" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Hệ thống báo cáo thông tin tuyển dụng'
                      : languageRedux === 2
                        ? 'Recruitment information reporting system'
                        : languageRedux === 3 && '채용정보 보고 시스템'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Giúp nhà tuyển dụng biết được chính xác số lượng CV ứng viên qua từng vòng từ vòng nhận CV đến đi làm.'
                      : languageRedux === 2
                        ? 'Helps employers know the exact number of candidate CVs through each round from receiving CVs to going to work.'
                        : languageRedux === 3 &&
                        '고용주가 CV 수령부터 출근까지 각 라운드를 통해 후보자 CV의 정확한 수를 알 수 있도록 도와줍니다.'}
                  </p>
                </div>
              </div>
              <div className={styles.advantages_item}>
                <img src={item5} alt="item5" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Gia tăng hiệu quả của việc tuyển dụng'
                      : languageRedux === 2
                        ? 'Increase recruitment efficiency'
                        : languageRedux === 3 && '채용 효율성 증대'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Với các phương pháp tìm nguồn ứng viên thông minh, hiệu quả, nhà tuyển dụng sẽ dễ dàng tìm kiếm ứng viên cho Chiến dịch tuyển dụng của mình.'
                      : languageRedux === 2
                        ? 'With smart, effective candidate sourcing methods, employers will easily find candidates for their recruitment campaigns.'
                        : languageRedux === 3 &&
                        '현명하고 효과적인 후보자 소싱 방법을 통해 고용주는 채용 캠페인에 적합한 후보자를 쉽게 찾을 수 있습니다.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.landing_register}>
          <div className={styles.register_title}>
            <h3>
              {languageRedux === 1
                ? 'Đâu là giải pháp phù hợp cho doanh nghiệp của bạn?'
                : languageRedux === 2
                  ? 'What is the right solution for your business?'
                  : languageRedux === 3 &&
                  '귀하의 비즈니스에 적합한 솔루션은 무엇입니까?'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Hãy để lại thông tin tuyển dụng của bạn và các chuyên viên tư vấn tuyển dụng của HiJob sẽ liên hệ ngay với bạn.'
                : languageRedux === 2
                  ? "Please leave your recruitment information and HiJob's recruitment consultants will contact you immediately."
                  : languageRedux === 3 &&
                  '채용정보를 남겨주시면 하이잡 채용 컨설턴트가 즉시 연락드리겠습니다.'}
            </p>
          </div>
          <div className={styles.register_content}>
            <img src={laptop} alt="laptop" />
            <div
              id="landing_hijob_register_form"
              className={styles.register_form}
            >
              <h3>
                {languageRedux === 1
                  ? 'Đăng kí nhận tư vấn'
                  : languageRedux === 2
                    ? 'Sign up to receive consultation'
                    : languageRedux === 3 && '상담을 받으시려면 가입하세요'}
              </h3>
              <form
                className={styles.register_form_container}
                ref={form}
                onSubmit={handleSubmit}
              >
                <div className={styles.register_input}>
                  <p>
                    {languageRedux === 1
                      ? 'Họ và tên'
                      : languageRedux === 2
                        ? 'Full name'
                        : languageRedux === 3
                          ? '성명'
                          : 'Họ và tên'}
                  </p>
                  <Input
                    placeholder={
                      languageRedux === 1
                        ? 'Họ và tên'
                        : languageRedux === 2
                          ? 'Full name'
                          : languageRedux === 3
                            ? '성명'
                            : 'Họ và tên'
                    }
                    ref={inputNameRef}
                    allowClear
                    name="from_name"
                    value={info.from_name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.register_input}>
                  <p>
                    {languageRedux === 1
                      ? 'Email: '
                      : languageRedux === 2
                        ? 'Email: '
                        : '이메일: '}
                  </p>
                  <Input
                    placeholder="Example@gmail.com"
                    ref={inputEmailRef}
                    allowClear
                    name="user_email"
                    value={info.user_email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.register_input}>
                  <p>
                    {languageRedux === 1
                      ? 'Số điện thoại'
                      : languageRedux === 2
                        ? 'Phone number'
                        : languageRedux === 3
                          ? '전화 번호'
                          : 'Số điện thoại'}
                  </p>
                  <Input
                    placeholder={
                      languageRedux === 1
                        ? 'Số điện thoại'
                        : languageRedux === 2
                          ? 'Phone number'
                          : languageRedux === 3
                            ? '전화 번호'
                            : 'Số điện thoại'
                    }
                    ref={inputPhoneRef}
                    allowClear
                    name="message"
                    value={info.message}
                    onChange={handleChange}
                  />
                </div>
              </form>
              <Button type="primary" shape="round" onClick={handleSubmit}>
                {languageRedux === 1
                  ? 'Gửi yêu cần tư vấn ngay'
                  : languageRedux === 2
                    ? 'Send request for advice now'
                    : languageRedux === 3 && '즉시 조언 요청 보내기'}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.landing_platform}>
          <h3>
            {languageRedux === 1
              ? 'Giá trị khi sử dụng HiJob Recruitment Platform'
              : languageRedux === 2
                ? 'Value when using HiJob Recruitment Platform'
                : languageRedux === 3 &&
                'HiJob Recruitment Platform를 사용할 때의 값'}
          </h3>
          <div className={styles.platform_content}>
            <div className={styles.platform_item}>
              <img src={mockup1} alt="mockup1" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Cung cấp thông tin việc làm tốt'
                    : languageRedux === 2
                      ? 'Provide good job information'
                      : languageRedux === 3 &&
                      '좋은 일자리 정보를 제공해주세요'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'HiJob hỗ trợ các nhà tuyển dụng đăng tin miễn phí một cách nhanh chóng, dễ dàng nhờ vào những công cụ được tạo riêng bởi HiJob dành cho bạn.'
                    : languageRedux === 2
                      ? 'HiJob helps employers post free ads quickly and easily thanks to tools created specifically for you by HiJob.'
                      : languageRedux === 3 &&
                      'HiJob은 HiJob이 귀하를 위해 특별히 제작한 도구 덕분에 고용주가 무료 광고를 빠르고 쉽게 게시할 수 있도록 도와줍니다.'}
                </p>
              </div>
            </div>
            <div className={styles.platform_item}>
              <img src={mockup2} alt="mockup2" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Tạo CV cho riêng bạn đơn giản'
                    : languageRedux === 2
                      ? 'Creating your own CV is simple'
                      : languageRedux === 3 &&
                      '나만의 CV를 만드는 것은 간단합니다'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'HiJob có số lượng lớn Ứng viên hoạt động thường xuyên, lâu dài. Nhờ vào số lượng công việc đa dạng ngành nghề, địa điểm,...'
                    : languageRedux === 2
                      ? 'HiJob has a large number of candidates who are active regularly and for a long time. Thanks to the diverse number of jobs in professions, locations,...'
                      : languageRedux === 3 &&
                      'HiJob에는 정기적이고 장기적인 활동을 하는 지원자가 많이 있습니다. 다양한 산업, 위치에 다양한 일자리를 제공합니다.'}
                </p>
              </div>
            </div>
            <div className={styles.platform_item}>
              <img src={mockup3} alt="mockup3" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Hệ thống mẫu CV đa dạng theo ngành nghề'
                    : languageRedux === 2
                      ? 'The system of CV templates is diverse by industry'
                      : languageRedux === 3 &&
                      'CV 템플릿 시스템은 산업별로 다양합니다.'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'Giúp nhà tuyển dụng quản lý kho CV ứng viên, tin tuyển dụng của mình một cách đầy đủ, có tính hệ thống và không bị mất mát dữ liệu.'
                    : languageRedux === 2
                      ? 'Helps employers manage their warehouse of candidate CVs and job postings fully, systematically and without data loss.'
                      : languageRedux === 3 &&
                      '고용주가 후보자 CV 및 채용 공고 창고를 데이터 손실 없이 완전하고 체계적으로 관리할 수 있도록 도와줍니다.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.landing_nofitication}>
          <div className={styles.landing_nofitication_left}>
            <h3>
              {languageRedux === 1
                ? 'Bật thông báo'
                : languageRedux === 2
                  ? 'Turn on notifications.'
                  : languageRedux === 3 && '알림 켜기'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'HiJob có khả năng phân tích yêu cầu, thói quen, hành vi của nhà tuyển dụng và ứng viên, đồng thời khai thác tối đa lượng dữ liệu lớn, từ đó đưa ra các phán đoán và đề xuất về những việc có thể làm để tuyển dụng hiệu quả hơn, kết nối đúng nhu cầu tuyển dụng của doanh nghiệp với các ứng viên phù hợp.'
                : languageRedux === 2
                  ? 'HiJob has the ability to analyze the requirements, habits, and behaviors of employers and candidates, and make the most of large amounts of data, thereby making judgments and recommendations on what can be done to Recruit more effectively, connecting the right recruitment needs of the business with the right candidates.'
                  : languageRedux === 3 &&
                  'HiJob은 고용주와 후보자의 요구 사항, 습관, 행동을 분석하고 방대한 양의 데이터를 최대한 활용하여 Recruit을 보다 효과적으로 수행할 수 있는 방법에 대한 판단과 제안을 제공하고, 적합한 후보자와 비즈니스를 하세요.'}
            </p>
            {/* <Button
                            type="primary"
                            shape="round"
                            onClick={async () => {
                                // window.open('/profile-cv', '_parent');
                            }}
                        >
                            {languageRedux === 1 ? 'Nhận thông báo ngay' : 'Get notified now'}
                        </Button> */}
          </div>
          <img src={nofitication} alt="nofitication" />
        </div>
        <div className={styles.landing_login}>
          <img src={frame} alt="frame" />
          <div className={styles.landing_login_right}>
            <div className={styles.content_right}>
              <h3>
                {languageRedux === 1
                  ? 'HiJob Đề xuất'
                  : languageRedux === 2
                    ? 'HiJob Proposal'
                    : languageRedux === 3 && 'HiJob 권장'}
              </h3>
              <div className={styles.content}>
                <div className={styles.content_item}>
                  <div className={styles.star_item}>
                    <Icon4PointedStar />
                  </div>
                  <p>
                    {languageRedux === 1
                      ? 'Khả năng thu hút sự chú ý của Ứng viên phù hợp.'
                      : languageRedux === 2
                        ? 'Ability to attract the attention of the right Candidate.'
                        : languageRedux === 3 &&
                        '적합한 후보자의 관심을 끄는 능력.'}
                  </p>
                </div>
                <div className={styles.content_item}>
                  <div className={styles.star_item}>
                    <Icon4PointedStar />
                  </div>
                  <p>
                    {languageRedux === 1
                      ? 'Giải pháp toàn diện giúp Doanh nghiệp giải quyết đồng thời các bài toán xoay quanh vấn đề tuyển dụng.'
                      : languageRedux === 2
                        ? 'Comprehensive solution helps businesses solve problems surrounding recruitment issues at the same time.'
                        : languageRedux === 3 &&
                        '포괄적인 솔루션은 기업이 채용 문제와 관련된 문제를 동시에 해결할 수 있도록 도와줍니다.'}
                  </p>
                </div>
              </div>
            </div>
            <Button
              type="primary"
              shape="round"
              onClick={() => setOpenModalLogin(true)}
              style={{
                display: !localStorage.getItem('accessToken')
                  ? 'block'
                  : 'none',
              }}
            >
              {languageRedux === 1
                ? 'Đăng nhập ngay'
                : languageRedux === 2
                  ? 'Sign in'
                  : languageRedux === 3 && '로그인'}
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
        width={420}
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
              ? 'Gửi yêu cầu thành công'
              : languageRedux === 2
                ? 'Request sent successfully'
                : languageRedux === 3 && '요청이 성공적으로 전송되었습니다.'}
          </h3>
        }
        footer={null}
        open={openModalSendRequestSuccess}
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
            ? 'Thông tin của bạn đã được gửi cho Hijob. Chúng tôi sẽ liên lạc với bạn nhanh nhất có thể!'
            : languageRedux === 2
              ? 'Your information has been sent to Hijob. We will contact you as quickly as possible!'
              : languageRedux === 3 &&
              '귀하의 정보가 Hijob으로 전송되었습니다. 최대한 빠르게 연락드리겠습니다!'}
        </p>
        <div className={styles.button_send_request_success_modal}>
          <Button type="primary" shape="round" onClick={handleCancel}>
            OK
          </Button>
        </div>
      </Modal>

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
        <div className={styles.button_send_request_success_modal}>
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

export default LandingHijob;
