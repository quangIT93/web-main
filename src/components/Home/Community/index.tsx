import * as React from 'react';

import './style.scss';

import WorkingStory from './components/WorkingStory';
import HijobNews from './components/HijobNews';
import { CommunityIcon } from '#components/Icons';
const Community = () => {
  return (
    <div className="community-container">
      <div className="community-title">
        <CommunityIcon />
        <h3>HiJob Community</h3>
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
