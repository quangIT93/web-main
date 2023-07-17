import React, { useContext, useState, useEffect } from 'react';

// import component
import ListChat from '#components/Message/ListChat/ListChat';
import ListUserChat from '#components/Message/ListUser/ListUser';
import HeaderMessage from '#components/Message/HeaderMessage';
// @ts-ignore
import Navbar from '#components/Navbar';
import Footer from '#components/Footer/Footer';
// import ui antd
import { Typography } from 'antd';

import './style.scss';

import { HomeValueContext } from 'context/HomeValueContextProvider';

import siteApi from 'api/siteApi';

// import firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

const { Text } = Typography;

const Message = () => {
  const { openCollapseFilter } = useContext(HomeValueContext);
  const [openListChat, setOpenListChat] = useState(false);

  const [titleFirebase, setTitleFirebase] = React.useState<string>('');
  const [site, SetSite] = React.useState<any>(null);

  const getTitle = async () => {
    try {
      const result = await siteApi.getSalaryType();
      if (result) {
        SetSite(result);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    getTitle();
    // document.title = 'Hijob - Nhắn tin';
  }, []);

  // custom title firebase
  const analytics: any = getAnalytics();

  new Promise((resolve, reject) => {
    document.title = 'Hijob - Nhắn tin';
  });
  useEffect(() => {
    logEvent(analytics, 'screen_view' as string, {
      page_title: '/new_message ',
    });
  }, []);
  return (
    <div className="message-page">
      <Navbar />

      <div className="message-page_main">
        {/* <div className="header-message">
          <HeaderMessage />
        </div> */}
        <div className="wrap-content_message">
          <div className="message-page_left">
            <ListUserChat
              setOpenListChat={setOpenListChat}
              openListChat={openListChat}
            />
          </div>

          <div className="message-page_right">
            <ListChat
              setOpenListChat={setOpenListChat}
              openListChat={openListChat}
            />
          </div>
        </div>
      </div>

      <div className="message-page-main_responsive">
        {/* <div className="header-message">
          <HeaderMessage />
        </div> */}
        <div className="wrap-content-message_responsive">
          {/* <div className="message-page-left_responsive"> */}
          <ListUserChat
            setOpenListChat={setOpenListChat}
            openListChat={openListChat}
          />
          {/* </div> */}

          {/* <div className="message-page-right_responsive"> */}
          <ListChat
            setOpenListChat={setOpenListChat}
            openListChat={openListChat}
          />
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Message;
