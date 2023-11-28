import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
// import moment, { Moment } from 'moment';
// @ts-ignore

import './style.scss';

import { Button } from 'antd';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { setCookie } from 'cookies';

const ComunityCreateSuccess = () => {
  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  useEffect(() => {
    const community_success = localStorage.getItem('community_success');
    const accountId = localStorage.getItem('accountId');
    setCookie('workingId', '0', 365);
    setCookie('hijobId', '0', 365);
    if (
      (dataProfile && dataProfile.accountId != accountId) ||
      !community_success
    ) {
      //   window.open('/', '_parent');
    }
  }, []);
  const handleMoveWorkingStory = () => {
    // localStorage.removeItem('community_success')
    // window.open('/new-comunity', '_parent')
  };

  const handleMoveToCommunityPost = () => {
    // localStorage.removeItem('community_success')
    // window.open('/history?community_post=31', '_parent')
  };

  return (
    <div className="comunity-create-success-container">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <div className="comunity-create-success-content">
        <div className="create-success-message">
          <div className="create-success-message_header">
            <h3>{
              languageRedux === 1
                ? 'Đăng bài viết thành công'
                : languageRedux === 2
                  ? 'Posted successfully'
                  : '성공적으로 게시되었습니다'
            }</h3>
            <img
              src="../images/comunity_create_success.png"
              alt={languageRedux === 1
                ? 'Hình ảnh bị lỗi'
                : languageRedux === 2
                  ? 'Image is corrupted'
                  : '이미지가 손상되었습니다'}
            ></img>
          </div>
          <div className="create-success-message_body">
            <p>{languageRedux === 1
              ? 'Bài viết của bạn sẽ được kiểm duyệt nội dung trước khi công khai.'
              : languageRedux === 2
                ? 'Your article will be moderated before being published.'
                : '귀하의 기사는 게시되기 전에 내용에 대한 검토를 거칩니다.'}</p>
            <p>{languageRedux === 1
              ? 'Hãy đảm bảo các thông tin bài viết của bạn là chính xác!'
              : languageRedux === 2
                ? 'Make sure your article information is correct!'
                : '기사 정보가 올바른지 확인해주세요!'}</p>
          </div>
        </div>
        <div className="create-success-btns">
          <Button type="primary" onClick={handleMoveWorkingStory}>
            {languageRedux === 1
              ? 'Bài viết HiJob'
              : languageRedux === 2
                ? 'HiJob Articles'
                : 'HiJob 기사'}
          </Button>
          <Button onClick={handleMoveToCommunityPost}>
            {languageRedux === 1
              ? 'Xem bài viết của bạn'
              : languageRedux === 2
                ? 'View your posts'
                : '게시물 보기'}
          </Button>
        </div>
      </div>
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default ComunityCreateSuccess;
