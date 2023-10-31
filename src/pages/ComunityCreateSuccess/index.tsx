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
            <h3>{language?.community_page?.post_successfully_posted}</h3>
            <img
              src="../images/comunity_create_success.png"
              alt="ảnh lỗi"
            ></img>
          </div>
          <div className="create-success-message_body">
            <p>{language?.community_page?.successfully_title_1}</p>
            <p>{language?.community_page?.successfully_title_2}</p>
          </div>
        </div>
        <div className="create-success-btns">
          <Button type="primary" onClick={handleMoveWorkingStory}>
            {language?.community_page?.hijob_articles}
          </Button>
          <Button onClick={handleMoveToCommunityPost}>
            {language?.community_page?.view_your_post}
          </Button>
        </div>
      </div>
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default ComunityCreateSuccess;