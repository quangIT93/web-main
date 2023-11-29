import * as React from 'react';

import './style.scss';

import WorkingStory from './components/WorkingStory';
import HijobNews from './components/HijobNews';
import { CommunityIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
const Community = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  return (
    <div className="community-container" id="community-container">
      <div className="community-title">
        <CommunityIcon />
        <h3>
          {languageRedux === 1
            ? 'Câu chuyện việc làm HiJob'
            : languageRedux === 2
              ? 'HiJob Community'
              : languageRedux === 3 && '워킹스토리'}
        </h3>
      </div>
      <div className="community-content">
        <div className="community-content_item">
          <WorkingStory />
        </div>
        <div className="community-content_item">
          <HijobNews />
        </div>
      </div>
    </div>
  );
};

export default Community;
