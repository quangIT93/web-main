import React, { useState, useEffect } from 'react';

// import component
import ListChat from '#components/Message/ListChat/ListChat';
import ListUserChat from '#components/Message/ListUser/ListUser';

// @ts-ignore
import Navbar from '#components/Navbar';
import Footer from '#components/Footer/Footer';
import RollTop from '#components/RollTop';
// import ui antd
// import { Typography } from 'antd';

import './style.scss';

// import { HomeValueContext } from 'context/HomeValueContextProvider';

// import siteApi from 'api/siteApi';

// import firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import languageApi from 'api/languageApi';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import { messVi } from 'validations/lang/vi/mess';
import { messEn } from 'validations/lang/en/mess';

// const { Text } = Typography;

const Message = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  // const { openCollapseFilter } = useContext(HomeValueContext);
  const [openListChat, setOpenListChat] = useState(false);
  const [language, setLanguage] = useState<any>();

  // const [titleFirebase, setTitleFirebase] = React.useState<string>('');

  // custom title firebase
  const analytics: any = getAnalytics();

  // new Promise((resolve, reject) => {
  //   document.title = 'Hijob - Nhắn tin';
  // });

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setLanguage(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi()
  }, [languageRedux])

  useEffect(() => {
    document.title = language?.messages_page?.title_page;
    logEvent(analytics, 'screen_view' as string, {
      page_title: '/web_message ',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);
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
              language={language}
              languageRedux={languageRedux}
            />
          </div>

          <div className="message-page_right">
            <ListChat
              setOpenListChat={setOpenListChat}
              openListChat={openListChat}
              language={language}
              languageRedux={languageRedux}
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
            language={language}
            languageRedux={languageRedux}
          />
          {/* </div> */}

          {/* <div className="message-page-right_responsive"> */}
          <ListChat
            setOpenListChat={setOpenListChat}
            openListChat={openListChat}
            language={language}
            languageRedux={languageRedux}
          />
          {/* </div> */}
        </div>
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default Message;
