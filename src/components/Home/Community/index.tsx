import * as React from 'react';

import './style.scss';

import WorkingStory from './components/WorkingStory';
import HijobNews from './components/HijobNews';

const Community = () => {
  return (
    <div className="community-container">
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
