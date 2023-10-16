import React, { useContext, useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Box, Button, Collapse } from '@mui/material';
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { ArrowIcon, IconMenu } from '#components/Icons';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { DivRef1 } from 'context/HomeValueContextProvider';
import ModalLogin from '#components/Home/ModalLogin';
import JobInfoDropDown from './JobInforDropDown';
import CvDropDown from './CvDropDown';
import ComunityDropDown from './ComunityDropDown';
import CustomerDropDown from './CustomerDropDown';
const titleContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};
const title: React.CSSProperties = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: 700,
  letterSpacing: '0em',
  textAlign: 'left',
  color: '#000000',
};
const label: React.CSSProperties = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: '0em',
  textAlign: 'left',
  color: '#000000',
};

const CategoryDropdown: React.FC = () => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const {
    openCategoryDropdown,
    setOpenCategoryDropdown,
  }: {
    openCategoryDropdown: boolean;
    setOpenCategoryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  } = useContext(HomeValueContext);
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const location = useLocation();
  const [expand, setExpand] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const updateWindowWidth = () => {
    if (window.innerWidth > 560) {
      setWindowWidth(true);
      setExpand([1, 2, 3, 4]);
    } else {
      setWindowWidth(false);
      setExpand([]);
    }
  };

  useEffect(() => {
    updateWindowWidth();
  }, [window.innerWidth]);

  React.useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      console.log('resize');

      if (currentWidth > 560) {
        setWindowWidth(true);
        setExpand([1, 2, 3, 4]);
      } else {
        setWindowWidth(false);
        // setOpen(true);
        setExpand([]);
      }
    };

    window.addEventListener('resize', handleResize);

    return window.removeEventListener('resize', handleResize);
  }, []);

  const handleExpand = (id: any) => {
    if (expand.includes(id)) {
      setExpand(
        expand.filter((item: any) => {
          return item !== id;
        }),
      );
      return;
    }
    setExpand((prev: any) => [...prev, id]);
    // setOpen(!open);
  };

  const moveToAppliedJob = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    window.open('/history', '_parent');
  };

  const moveToSaveJob = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    window.open('/history?saved_jobs=1', '_parent');
  };

  const moveToRecruimentPost = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    window.open('/history', '_parent');
  };

  const handleScrollIntoViewDiv = (id: string) => {
    const div = document.getElementById(id);
    let newJobOffsetTop = 0;
    if (div) {
      newJobOffsetTop = document.getElementById(id) ? div.offsetTop : 0;
      window.scrollTo(0, newJobOffsetTop - 140);
    }
  };

  const moveToNewestJob = () => {
    localStorage.setItem('job-type', 'new');
    window.open('/more-jobs', '_parent');
  };

  const moveToOpeningPost = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    } else {
      window.open('/history?recruitment_post=opening', '_parent');
    }
  };

  const moveToHotJob = () => {
    if (location?.pathname === '/') {
      setOpenCategoryDropdown(false);
      handleScrollIntoViewDiv('hot-job-container');
    } else {
      localStorage.setItem('home', 'hot');
      window.open('/', '_parent');
    }
  };

  const moveToClosedPost = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    } else {
      window.open('/history?recruitment_post=closed', '_parent');
    }
  };

  const moveToJobByHotPlace = () => {
    if (location?.pathname === '/') {
      setOpenCategoryDropdown(false);
      handleScrollIntoViewDiv('job-by-hot-place');
    } else {
      localStorage.setItem('home', 'place');
      window.open('/', '_parent');
    }
  };

  const moveToPostjob = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    } else {
      window.open('/post', '_parent');
    }
  };

  const moveToSuggestedJob = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
    } else {
      localStorage.setItem('job-type', 'suggested');
      window.open('/more-jobs', '_parent');
    }
  };

  const moveToCompanyInfor = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    } else {
      window.open('/company-infor', '_parent');
    }
  };

  const moveToCreateCv = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    if (location?.pathname !== '/templates-cv') {
      window.open('/templates-cv', '_parent');
    } else {
      setOpenCategoryDropdown(false);
      window.scrollTo(0, 0);
    }
  };

  const moveToCadidateList = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    window.open('/candidatesAll', '_parent');
  };

  const moveToCvManage = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    if (location?.pathname !== '/profile-cv') {
      window.open('/profile-cv', '_parent');
    } else {
      setOpenCategoryDropdown(false);
      window.scrollTo(0, 0);
    }
  };

  const moveToSearchCandidate = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    window.open('/candidatesAll', '_parent');
  };

  const moveToIntroductionCv = () => {
    if (location?.pathname !== '/profile-cv') {
      window.open('/intructionsCv', '_parent');
    } else {
      setOpenCategoryDropdown(false);
      window.scrollTo(0, 0);
    }
  };

  const moveToSavedCandidateList = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    window.open('/history?candidate=4', '_parent');
  };

  const moveToWorkingStory = () => {
    if (location?.pathname !== '/new-comunity') {
      window.open('/new-comunity', '_parent');
    } else {
      setOpenCategoryDropdown(false);
      window.scrollTo(0, 0);
    }
  };

  const moveToHijobNews = () => {
    if (location?.pathname !== '/news-comunity') {
      window.open('/news-comunity', '_parent');
    } else {
      setOpenCategoryDropdown(false);
      window.scrollTo(0, 0);
    }
  };

  const moveToPostArticle = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    if (location?.pathname !== '/comunity_create_post') {
      window.open('/comunity_create_post', '_parent');
    } else {
      setOpenCategoryDropdown(false);
      window.scrollTo(0, 0);
    }
  };

  const moveToSavedArticle = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    window.open('/history?community_post=30', '_parent');
    setOpenCategoryDropdown(false);
  };

  const moveToPolicy = () => {
    window.open('/policy', '_parent');
    setOpenCategoryDropdown(false);
  };

  const moveToSupportTerms = () => {
    window.open('/policy#terms-of-use', '_parent');
    setOpenCategoryDropdown(false);
  };

  const moveToMemberGuide = () => {
    window.open('/policy#privacy-policy', '_parent');
    setOpenCategoryDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${openCategoryDropdown ? 'show-dropdown' : ''}`}>
      <Box
        // ref={dropdownRef}

        ref={dropdownRef}
        sx={{
          // maxWidth: { xs: 320, sm: 480, lg: 1320, xl: 1420, md: 720 },
          padding: '0 24px',
          // boxShadow: '0px 1px 3px #aaa',
          zIndex: '9',
          position: 'fixed',
          width: '100%',
          left: '0',
          right: '0',
          top: '70px',
          background: '#ffffff',
        }}
        className="category-dropdown-container"
      >
        <div
          className="category-dropdown-content"
          style={{
            maxWidth: location?.pathname === '/' ? '1280px' : '1080px',
          }}
        >
          <div
            className="category-dropdown-left"
            onMouseEnter={() => setOpenCategoryDropdown(true)}
            onMouseLeave={() => setOpenCategoryDropdown(false)}
            onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
          >
            <IconMenu />
            <h3>{languageRedux === 1 ? 'Danh mục' : 'Menu'}</h3>
          </div>
          {/* <div className="category-dropdown-line"></div>
          <div className="category-dropdown-right">
            <JobInfoDropDown
              moveToAppliedJob={moveToAppliedJob}
              moveToSaveJob={moveToSaveJob}
              moveToRecruimentPost={moveToRecruimentPost}
              moveToNewestJob={moveToNewestJob}
              moveToOpeningPost={moveToOpeningPost}
              moveToHotJob={moveToHotJob}
              moveToClosedPost={moveToClosedPost}
              moveToJobByHotPlace={moveToJobByHotPlace}
              moveToPostjob={moveToPostjob}
              moveToSuggestedJob={moveToSuggestedJob}
              moveToCompanyInfor={moveToCompanyInfor}
            />
            <CvDropDown
              moveToCreateCv={moveToCreateCv}
              moveToCadidateList={moveToCadidateList}
              moveToCvManage={moveToCvManage}
              moveToSearchCandidate={moveToSearchCandidate}
              moveToIntroductionCv={moveToIntroductionCv}
              moveToSavedCandidateList={moveToSavedCandidateList}
            />

            <ComunityDropDown
              moveToWorkingStory={moveToWorkingStory}
              moveToHijobNews={moveToHijobNews}
              moveToPostArticle={moveToPostArticle}
              moveToSavedArticle={moveToSavedArticle}
            />

            <CustomerDropDown
              moveToPolicy={moveToPolicy}
              moveToSupportTerms={moveToSupportTerms}
              moveToMemberGuide={moveToMemberGuide}
            />
          </div> */}
        </div>
        <Collapse
          in={openCategoryDropdown}
          // sx={collapseCssFilter}
          onMouseLeave={() => setOpenCategoryDropdown(false)}
          onMouseEnter={() => setOpenCategoryDropdown(true)}
          sx={
            location.pathname === '/'
              ? { maxWidth: '1280px' }
              : { maxWidth: '1080px' }
          }
          className="category-dropdown-collapse"
        >
          <div
            style={{
              background: 'transparent',
              position: 'absolute',
              width: '100%',
              height: '30px',
              top: '-30px',
            }}
          ></div>
          <div className="category-dropdown-wraps">
            <div className="category-dropdown-item">
              <div className="top-item" onClick={() => handleExpand(1)}>
                <h3>
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Thông tin việc làm'
                      : 'Job information'
                    : languageRedux === 1
                    ? 'Thông tin tuyển dụng'
                    : 'Employment information'}
                </h3>
                <ArrowIcon fill="black" />
              </div>
              <div
                className="bot-item"
                style={{
                  height: expand.includes(1) ? 'unset' : 0,
                  overflow: expand.includes(1) ? 'unset' : 'hidden',
                  marginTop: expand.includes(1) ? '16px' : '0px',
                }}
              >
                <h3
                  style={{ display: roleRedux === 0 ? 'block' : 'none' }}
                  onClick={moveToAppliedJob}
                >
                  {languageRedux === 1
                    ? 'Việc làm đã ứng tuyển'
                    : 'Apllied Jobs'}
                </h3>
                <h3
                  onClick={
                    roleRedux === 0 ? moveToSaveJob : moveToRecruimentPost
                  }
                >
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Việc làm đã lưu'
                      : 'Saved jobs'
                    : languageRedux === 1
                    ? 'Việc làm tuyển dụng đã đăng'
                    : 'Recruitment posted'}
                </h3>
                <h3
                  onClick={
                    roleRedux === 0 ? moveToNewestJob : moveToOpeningPost
                  }
                >
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Công việc mới nhất'
                      : 'Newest jobs'
                    : languageRedux === 1
                    ? 'Bài tuyển dụng đang mở'
                    : 'Job posting is opening'}
                </h3>
                <h3 onClick={roleRedux === 0 ? moveToHotJob : moveToClosedPost}>
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Công việc nổi bật'
                      : 'Hot jobs'
                    : languageRedux === 1
                    ? 'Bài tuyển dụng đã đóng'
                    : 'Job posting is closed'}
                </h3>
                <h3
                  onClick={
                    roleRedux === 0 ? moveToJobByHotPlace : moveToPostjob
                  }
                >
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Công việc theo chủ đề'
                      : 'Job by hot places'
                    : languageRedux === 1
                    ? 'Đăng bài tuyển dụng'
                    : 'Post recruitment posts'}
                </h3>
                <h3
                  onClick={
                    roleRedux === 0 ? moveToSuggestedJob : moveToCompanyInfor
                  }
                >
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Công việc gợi ý'
                      : 'Suggested jobs'
                    : languageRedux === 1
                    ? 'Thông tin công ty'
                    : "Company's information"}
                </h3>
              </div>
            </div>
            <div
              className="category-dropdown-item"
              // style={{ display: roleRedux === 0 ? 'block' : 'none' }}
            >
              <div className="top-item" onClick={() => handleExpand(2)}>
                <h3>
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Hồ sơ & CV'
                      : 'Resume & CV'
                    : languageRedux === 1
                    ? 'Thông tin nhân tài'
                    : 'Candidates information'}
                </h3>
                <ArrowIcon fill="black" />
              </div>
              <div
                className="bot-item"
                style={{
                  height: expand.includes(2) ? 'unset' : 0,
                  overflow: expand.includes(2) ? 'unset' : 'hidden',
                  marginTop: expand.includes(2) ? '16px' : '0px',
                }}
              >
                <h3
                  onClick={
                    roleRedux === 0 ? moveToCreateCv : moveToCadidateList
                  }
                >
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Tạo mới CV'
                      : 'Create a new CV'
                    : languageRedux === 1
                    ? 'Danh sách nhân tài mới nhất'
                    : 'Newest candidate list'}
                </h3>
                <h3
                  onClick={
                    roleRedux === 0 ? moveToCvManage : moveToSearchCandidate
                  }
                >
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Quản lý CV'
                      : 'CV management'
                    : languageRedux === 1
                    ? 'Tìm kiếm nhân tài'
                    : 'Search for candidate'}
                </h3>
                <h3
                  onClick={
                    roleRedux === 0
                      ? moveToIntroductionCv
                      : moveToSavedCandidateList
                  }
                >
                  {roleRedux === 0
                    ? languageRedux === 1
                      ? 'Hướng dẫn tạo CV'
                      : 'Instructions for creating a CV'
                    : languageRedux === 1
                    ? 'Danh sách nhân tài đã lưu'
                    : 'Saved candidate list'}
                </h3>
              </div>
            </div>
            <div className="category-dropdown-item">
              <div className="top-item" onClick={() => handleExpand(3)}>
                <h3>{languageRedux === 1 ? 'Cộng đồng' : 'Community'}</h3>
                <ArrowIcon fill="black" />
              </div>
              <div
                className="bot-item"
                style={{
                  height: expand.includes(3) ? 'unset' : 0,
                  overflow: expand.includes(3) ? 'unset' : 'hidden',
                  marginTop: expand.includes(3) ? '16px' : '0px',
                }}
              >
                <h3 onClick={moveToWorkingStory}>
                  {languageRedux === 1
                    ? 'Câu chuyện việc làm'
                    : 'Working story'}
                </h3>
                <h3 onClick={moveToHijobNews}>
                  {languageRedux === 1 ? 'Tin tức' : 'News'}
                </h3>
                <h3 onClick={moveToPostArticle}>
                  {languageRedux === 1
                    ? 'Đăng bài viết mới'
                    : 'Post new articles'}
                </h3>
                <h3 onClick={moveToSavedArticle}>
                  {languageRedux === 1 ? 'Bài viết đã lưu' : 'Saved post'}
                </h3>
              </div>
            </div>
            <div className="category-dropdown-item">
              <div className="top-item" onClick={() => handleExpand(4)}>
                <h3>
                  {languageRedux === 1
                    ? 'Hỗ trợ khách hàng'
                    : 'Customer support'}
                </h3>
                <ArrowIcon fill="black" />
              </div>
              <div
                className="bot-item"
                style={{
                  height: expand.includes(4) ? 'unset' : 0,
                  overflow: expand.includes(4) ? 'unset' : 'hidden',
                  marginTop: expand.includes(4) ? '16px' : '0px',
                }}
              >
                <h3 onClick={moveToPolicy}>
                  {languageRedux === 1
                    ? 'Chính sách bảo mật'
                    : 'Privacy Policy'}
                </h3>
                <h3 onClick={moveToSupportTerms}>
                  {languageRedux === 1 ? 'Điều khoản hỗ trợ' : 'Support terms'}
                </h3>
                <h3 onClick={moveToMemberGuide}>
                  {languageRedux === 1
                    ? 'Hướng dẫn thành viên'
                    : 'Member Guide'}
                </h3>
              </div>
            </div>
          </div>
        </Collapse>
      </Box>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </div>
  );
};

export default CategoryDropdown;
