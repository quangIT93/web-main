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
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Button, Input, InputRef, Modal, message } from 'antd';
import { Icon4PointedStar } from '#components/Icons';
import emailjs from '@emailjs/browser';
import ModalLogin from '#components/Home/ModalLogin';
import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';
import ModalNotiValidateCompany from '#components/Post/ModalNotiValidateCompany';
import { Backdrop, CircularProgress } from '@mui/material';
const LandingHijob = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const profileV3 = useSelector((state: RootState) => state.dataProfileInformationV3.data);
  const [info, setInfo] = useState({
    from_name: "",
    user_email: "",
    message: "",
  })
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState<any>(false);
  const [openModalNoteValidateCompany, setOpenModalNoteValidateCompany] =
    React.useState<any>(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openModalSendRequestSuccess, setOpenModalSendRequestSuccess] = React.useState(false);
  const [openModalNoteWorker, setOpenModalNoteWorker] = React.useState(false);
  const handleChange = (e: any) => {
    setInfo(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  };

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
            : 'Full name cannot be empty',
        checkForm: false,
        idError: 1,
      };
    }
    if (info.from_name?.trim().length > 255) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên không được vượt quá 255 ký tự'
            : 'Full name cannot exceed 255 characters',
        checkForm: false,
        idError: 1,
      };
    }
    if (info.user_email?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không được bỏ trống'
            : 'Email cannot be empty',
        checkForm: false,
        idError: 2,
      };
    }
    if (regexCheckEmail.test(info.user_email) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không đúng định dạng'
            : 'The Email is not in the correct format',
        checkForm: false,
        idError: 2,
      };
    }
    if (info.message?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không được bỏ trống'
            : 'Phone cannot be empty',
        checkForm: false,
        idError: 3,
      };
    }
    if (regexCheckPhone.test(info.message) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không đúng định dạng'
            : 'The phone number is not in the correct format',
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
      if (profileV3.companyInfo !== null &&
        profileV3.companyInfo.status === 0
      ) {
        setOpenModalNoteValidateCompany(true);
        return;
      } else {
        window.open(`/post`, '_parent')
      }
    }
  }


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
                : 'Community services post job postings, search for candidates effectively.'}
            </h3>
            <Button type="primary" shape="round" onClick={handleMoveToPost}>
              {languageRedux === 1 ? 'Đăng tin miễn phí' : 'Post for free'}
            </Button>
          </div>
          <img src={headerImage} alt="headerImage" />
        </div>
        <div className={styles.landing_recruitment}>
          <div className={styles.landing_recruitment_left}>
            <h3>
              {languageRedux === 1 ? 'HiJob Tuyển dụng' : 'HiJob Recruitment'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'HiJob mang đến những giải pháp toàn diện giúp Doanh nghiệp giải quyết đồng thời các bài toán xoay quanh vấn đề tuyển dụng, từ việc tìm kiếm những CV, sàng lọc hồ sơ ứng viên cho đến đánh giá ứng viên và đo lường hiệu quả.'
                : 'HiJob brings comprehensive solutions to help businesses simultaneously solve problems around recruitment, from finding CVs, screening candidate profiles to evaluating candidates and measuring effectiveness.'}
            </p>
            <Button type="primary" shape="round" onClick={handleMoveToRegister}>
              {languageRedux === 1
                ? 'Tư vấn tuyển dụng miễn phí'
                : 'Free recruitment consultation'}
            </Button>
          </div>
          <img src={hijobRecruitment} alt="hijobRecruitment" />
        </div>
        <div className={styles.landing_propose}>
          <h3>
            {languageRedux === 1
              ? 'Công nghệ đăng tin tuyển dụng mới. Tính năng mới. Trải nghiệm mới.'
              : 'New job posting technology. New feature. New experience.'}
          </h3>
          <div className={styles.landing_propose_content}>
            <img src={hijobPropose} alt="hijobPropose" />
            <div className={styles.landing_propose_right}>
              <h3>
                {languageRedux === 1 ? 'HiJob Đề xuất' : 'HiJob Proposal'}
              </h3>
              <p>
                {languageRedux === 1
                  ? 'HiJob có khả năng phân tích yêu cầu, thói quen, hành vi của nhà tuyển dụng và ứng viên, đồng thời khai thác tối đa lượng dữ liệu lớn, từ đó đưa ra các phán đoán và đề xuất về những việc có thể làm để tuyển dụng hiệu quả hơn, kết nối đúng nhu cầu tuyển dụng của doanh nghiệp với các ứng viên phù hợp.'
                  : 'HiJob has the ability to analyze the requirements, habits, and behaviors of employers and candidates, and make the most of large amounts of data, thereby making judgments and recommendations on what can be done to Recruit more effectively, connecting the right recruitment needs of the business with the right candidates.'}
              </p>
              <Button
                type="primary"
                shape="round"
                onClick={handleMoveToRegister}
              >
                {languageRedux === 1
                  ? 'Tư vấn tuyển dụng miễn phí'
                  : 'Free recruitment consultation'}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.landing_advantages}>
          <div className={styles.advantages_title}>
            <h3>
              {languageRedux === 1
                ? 'Các ưu điểm có trên HiJob Recruitment.'
                : 'Advantages available on HiJob Recruitment.'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Với công nghệ mới, HiJob Recruitment kế thừa những ưu điểm hiện tại và mang đến trải nghiệm một cách hoàn toàn khác biệt, giúp doanh nghiệp tuyển dụng hiệu quả trong thời đại số.'
                : 'With new technology, HiJob Recruitment inherits current advantages and brings a completely different experience, helping businesses recruit effectively in the digital age.'}
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
                      : 'Post job ads for free'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'HiJob hỗ trợ các nhà tuyển dụng đăng tin miễn phí một cách nhanh chóng, dễ dàng nhờ vào những công cụ được tạo riêng bởi HiJob dành cho bạn.'
                      : 'HiJob helps employers post free ads quickly and easily thanks to tools created specifically for you by HiJob.'}
                  </p>
                </div>
              </div>
              <div className={styles.advantages_item}>
                <img src={item2} alt="item2" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Số lượng Ứng viên ứng tuyển lớn'
                      : 'Large number of candidates applying'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'HiJob có số lượng lớn Ứng viên hoạt động thường xuyên, lâu dài. Nhờ vào số lượng công việc đa dạng ngành nghề, địa điểm,...'
                      : 'HiJob has a large number of candidates who are active regularly and for a long time. Thanks to the diverse number of jobs in professions, locations,...'}
                  </p>
                </div>
              </div>
              <div className={styles.advantages_item}>
                <img src={item3} alt="item3" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Tính năng quản lý tin tuyển dụng, CV ứng viên'
                      : 'Features for managing recruitment news and candidate CVs'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Giúp nhà tuyển dụng quản lý kho CV ứng viên, tin tuyển dụng của mình một cách đầy đủ, có tính hệ thống và không bị mất mát dữ liệu.'
                      : 'Helps employers manage their warehouse of candidate CVs and job postings fully, systematically and without data loss.'}
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
                      : 'Recruitment information reporting system'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Giúp nhà tuyển dụng biết được chính xác số lượng CV ứng viên qua từng vòng từ vòng nhận CV đến đi làm.'
                      : 'Helps employers know the exact number of candidate CVs through each round from receiving CVs to going to work.'}
                  </p>
                </div>
              </div>
              <div className={styles.advantages_item}>
                <img src={item5} alt="item5" />
                <div className={styles.item_bot}>
                  <h3>
                    {languageRedux === 1
                      ? 'Gia tăng hiệu quả của việc tuyển dụng'
                      : 'Increase recruitment efficiency'}
                  </h3>
                  <p>
                    {languageRedux === 1
                      ? 'Với các phương pháp tìm nguồn ứng viên thông minh, hiệu quả, nhà tuyển dụng sẽ dễ dàng tìm kiếm ứng viên cho Chiến dịch tuyển dụng của mình.'
                      : 'With smart, effective candidate sourcing methods, employers will easily find candidates for their recruitment campaigns.'}
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
                : 'What is the right solution for your business?'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Hãy để lại thông tin tuyển dụng của bạn và các chuyên viên tư vấn tuyển dụng của HiJob sẽ liên hệ ngay với bạn.'
                : "Please leave your recruitment information and HiJob's recruitment consultants will contact you immediately."}
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
                  : 'Sign up to receive consultation'}
              </h3>
              <form
                className={styles.register_form_container}
                ref={form}
                onSubmit={handleSubmit}
              >
                <div className={styles.register_input}>
                  <p>
                    {languageRedux === 1 ? 'Họ và tên' : 'First and last name'}
                  </p>
                  <Input
                    placeholder={
                      languageRedux === 1 ? 'Họ và tên' : 'First and last name'
                    }
                    ref={inputNameRef}
                    allowClear
                    name="from_name"
                    value={info.from_name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.register_input}>
                  <p>Email</p>
                  <Input
                    placeholder="example@gmail.com"
                    ref={inputEmailRef}
                    allowClear
                    name="user_email"
                    value={info.user_email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.register_input}>
                  <p>
                    {languageRedux === 1 ? 'Số điện thoại' : 'Phone number'}
                  </p>
                  <Input
                    placeholder={
                      languageRedux === 1 ? 'Số điện thoại' : 'Phone number'
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
                  : 'Send request for advice now'}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.landing_platform}>
          <h3>
            {languageRedux === 1
              ? 'Giá trị khi sử dụng HiJob Recruitment Platform'
              : 'Value when using HiJob Recruitment Platform'}
          </h3>
          <div className={styles.platform_content}>
            <div className={styles.platform_item}>
              <img src={mockup1} alt="mockup1" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Cung cấp thông tin việc làm tốt'
                    : 'Provide good job information'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'HiJob hỗ trợ các nhà tuyển dụng đăng tin miễn phí một cách nhanh chóng, dễ dàng nhờ vào những công cụ được tạo riêng bởi HiJob dành cho bạn.'
                    : 'HiJob helps employers post free ads quickly and easily thanks to tools created specifically for you by HiJob.'}
                </p>
              </div>
            </div>
            <div className={styles.platform_item}>
              <img src={mockup2} alt="mockup2" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Tạo CV cho riêng bạn đơn giản'
                    : 'Creating your own CV is simple'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'HiJob có số lượng lớn Ứng viên hoạt động thường xuyên, lâu dài. Nhờ vào số lượng công việc đa dạng ngành nghề, địa điểm,...'
                    : 'HiJob has a large number of candidates who are active regularly and for a long time. Thanks to the diverse number of jobs in professions, locations,...'}
                </p>
              </div>
            </div>
            <div className={styles.platform_item}>
              <img src={mockup3} alt="mockup3" />
              <div className={styles.item_bot}>
                <h3>
                  {languageRedux === 1
                    ? 'Hệ thống mẫu CV đa dạng theo ngành nghề'
                    : 'The system of CV templates is diverse by industry'}
                </h3>
                <p>
                  {languageRedux === 1
                    ? 'Giúp nhà tuyển dụng quản lý kho CV ứng viên, tin tuyển dụng của mình một cách đầy đủ, có tính hệ thống và không bị mất mát dữ liệu.'
                    : 'Helps employers manage their warehouse of candidate CVs and job postings fully, systematically and without data loss.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.landing_nofitication}>
          <div className={styles.landing_nofitication_left}>
            <h3>
              {languageRedux === 1 ? 'Bật thông báo' : 'Turn on notifications.'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'HiJob có khả năng phân tích yêu cầu, thói quen, hành vi của nhà tuyển dụng và ứng viên, đồng thời khai thác tối đa lượng dữ liệu lớn, từ đó đưa ra các phán đoán và đề xuất về những việc có thể làm để tuyển dụng hiệu quả hơn, kết nối đúng nhu cầu tuyển dụng của doanh nghiệp với các ứng viên phù hợp.'
                : 'HiJob has the ability to analyze the requirements, habits, and behaviors of employers and candidates, and make the most of large amounts of data, thereby making judgments and recommendations on what can be done to Recruit more effectively, connecting the right recruitment needs of the business with the right candidates.'}
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
                {languageRedux === 1 ? 'HiJob Đề xuất' : 'HiJob Proposal'}
              </h3>
              <div className={styles.content}>
                <div className={styles.content_item}>
                  <div className={styles.star_item}>
                    <Icon4PointedStar />
                  </div>
                  <p>
                    {languageRedux === 1
                      ? 'Khả năng thu hút sự chú ý của Ứng viên phù hợp.'
                      : 'Ability to attract the attention of the right Candidate.'}
                  </p>
                </div>
                <div className={styles.content_item}>
                  <div className={styles.star_item}>
                    <Icon4PointedStar />
                  </div>
                  <p>
                    {languageRedux === 1
                      ? 'Giải pháp toàn diện giúp Doanh nghiệp giải quyết đồng thời các bài toán xoay quanh vấn đề tuyển dụng.'
                      : 'Comprehensive solution helps businesses solve problems surrounding recruitment issues at the same time.'}
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
              {languageRedux === 1 ? 'Đăng nhập ngay' : 'Login now'}
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
              : 'Request sent successfully'}
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
            : 'Your information has been sent to Hijob. We will contact you as quickly as possible!'}
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
              : `You don't have to be a recruiter`}
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
            : `Only the recruiter can perform the above operation`}
        </p>
        <div className={styles.button_send_request_success_modal}>
          <Button type="primary" shape="round" onClick={handleCancelNoteWorker}>
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LandingHijob;
