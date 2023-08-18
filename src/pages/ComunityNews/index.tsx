import React, { useEffect } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

import { UserOutlined } from '@ant-design/icons';
// import moment, { Moment } from 'moment';

import { Avatar } from 'antd';
import { SaveIconOutline } from '#components/Icons';
import RollTop from '#components/RollTop';

// import component

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  // EditComunity,
  FilterComunity,
} from '#components/Icons';

// @ts-ignore

import { Navbar } from '#components';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import './style.scss';

const ComunityNews = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const [openMenu, setOpenMenu] = React.useState(false);
  const footerRef = React.useRef<any>(null);
  const [language, setLanguage] = React.useState<any>();

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
    const handleClickOutside = (event: any) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickItemMenu = () => {
    console.log('hello');
  };

  return (
    <div className="comunity-news-container">
      <Navbar />
      <div className="comunity-news-content">
        <div className="comunityPostNews">
          <div className="title-comunity-news">
            <h3>Hôm nay, HiJob có 10 bài viết mới</h3>
            <div className="title-comunity-news_icon">
              <div
                className="dropdown dropdown-4"
                ref={footerRef}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <FilterComunity />
                <ul className="dropdown_menu dropdown_menu-4">
                  <li
                    className="dropdown_item-1"
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={handleClickItemMenu}
                  >
                    <LikeIcon />
                    <p>
                      {
                        language?.history_page?.likes
                      }
                    </p>
                  </li>
                  <li
                    className="dropdown_item-2"
                    style={{ display: openMenu ? 'flex' : 'none' }}
                  >
                    <EysIcon />
                    <p>
                      {
                        language?.history_page?.views
                      }
                    </p>
                  </li>
                  <li
                    className="dropdown_item-3"
                    style={{ display: openMenu ? 'flex' : 'none' }}
                  >
                    <CommentIcon />
                    <p>
                      {
                        language?.history_page?.comments
                      }
                    </p>
                  </li>
                </ul>
              </div>
              {/* <EditComunity /> */}
            </div>
          </div>

          <div className="comunitypostNews-wrap_content">
            <div className="comunitypostNews-wrap_content__left">
              <Avatar
                shape="square"
                src="../images/banner.png"
                icon={<UserOutlined />}
              />
            </div>
            <div className="comunitypostNews-wrap_content__right">
              <div className="comunityPostNews-content">
                <div className="comunityPostNews-content-title">
                  <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                  <SaveIconOutline width={24} height={24} />
                </div>
                <div className="comunityPostNews-content_info">
                  <ul className={`text-content_postNew `}>
                    Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                    <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                    <li>Hiểu rõ công việc mình làm</li>
                    {/* <li>Hiểu thực đơn của nhà hàng</li>
                                        <li>Hiểu rõ công việc mình làm</li>
                                        <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                        <li>Hiểu thực đơn của nhà hàng</li> */}
                  </ul>
                  {/* {!showText ? (
                                        <span onClick={handleAddText}>Xem thêm...</span>
                                    ) : (
                                        <></>
                                    )} */}
                </div>
              </div>
              <div className="comunityPostNews-interaction">
                <div className="comunitypostNew-wrap_actor">
                  <div className="comunitypostNew-wrap">
                    {/* <img src="../images/banner.png" alt="anh loi" /> */}
                    <Avatar
                      size={42}
                      src="../images/banner.png"
                      icon={<UserOutlined />}
                    />
                    <div className="info-actor_comunity">
                      <p>Người viết</p>
                      <p>Trần Văn An</p>
                    </div>
                  </div>
                  <p>09/08/2023</p>
                </div>
                <div className="comunitypostNew-wrap_status">
                  <div className="status-item">
                    <EysIcon />
                    <p>123</p>
                  </div>
                  <div className="status-item">
                    <LikeIcon />
                    <p>2321</p>
                  </div>
                  <div className="status-item">
                    <CommentIcon />
                    <p>2321</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comunitypostNews-wrap_content">
            <div className="comunitypostNews-wrap_content__left">
              <Avatar
                shape="square"
                src="../images/banner.png"
                icon={<UserOutlined />}
              />
            </div>
            <div className="comunitypostNews-wrap_content__right">
              <div className="comunityPostNews-content">
                <div className="comunityPostNews-content-title">
                  <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                  <SaveIconOutline width={24} height={24} />
                </div>
                <div className="comunityPostNews-content_info">
                  <ul className={`text-content_postNew `}>
                    Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                    <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                    <li>Hiểu rõ công việc mình làm</li>
                    {/* <li>Hiểu thực đơn của nhà hàng</li>
                                        <li>Hiểu rõ công việc mình làm</li>
                                        <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                        <li>Hiểu thực đơn của nhà hàng</li> */}
                  </ul>
                  {/* {!showText ? (
                                        <span onClick={handleAddText}>Xem thêm...</span>
                                    ) : (
                                        <></>
                                    )} */}
                </div>
              </div>
              <div className="comunityPostNews-interaction">
                <div className="comunitypostNew-wrap_actor">
                  <div className="comunitypostNew-wrap">
                    {/* <img src="../images/banner.png" alt="anh loi" /> */}
                    <Avatar
                      size={42}
                      src="../images/banner.png"
                      icon={<UserOutlined />}
                    />
                    <div className="info-actor_comunity">
                      <p>Người viết</p>
                      <p>Trần Văn An</p>
                    </div>
                  </div>
                  <p>09/08/2023</p>
                </div>
                <div className="comunitypostNew-wrap_status">
                  <div className="status-item">
                    <EysIcon />
                    <p>123</p>
                  </div>
                  <div className="status-item">
                    <LikeIcon />
                    <p>2321</p>
                  </div>
                  <div className="status-item">
                    <CommentIcon />
                    <p>2321</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comunitypostNews-wrap_content">
            <div className="comunitypostNews-wrap_content__left">
              <Avatar
                shape="square"
                src="../images/banner.png"
                icon={<UserOutlined />}
              />
            </div>
            <div className="comunitypostNews-wrap_content__right">
              <div className="comunityPostNews-content">
                <div className="comunityPostNews-content-title">
                  <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                  <SaveIconOutline width={24} height={24} />
                </div>
                <div className="comunityPostNews-content_info">
                  <ul className={`text-content_postNew `}>
                    Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                    <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                    <li>Hiểu rõ công việc mình làm</li>
                    {/* <li>Hiểu thực đơn của nhà hàng</li>
                                        <li>Hiểu rõ công việc mình làm</li>
                                        <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                        <li>Hiểu thực đơn của nhà hàng</li> */}
                  </ul>
                  {/* {!showText ? (
                                        <span onClick={handleAddText}>Xem thêm...</span>
                                    ) : (
                                        <></>
                                    )} */}
                </div>
              </div>
              <div className="comunityPostNews-interaction">
                <div className="comunitypostNew-wrap_actor">
                  <div className="comunitypostNew-wrap">
                    {/* <img src="../images/banner.png" alt="anh loi" /> */}
                    <Avatar
                      size={42}
                      src="../images/banner.png"
                      icon={<UserOutlined />}
                    />
                    <div className="info-actor_comunity">
                      <p>Người viết</p>
                      <p>Trần Văn An</p>
                    </div>
                  </div>
                  <p>09/08/2023</p>
                </div>
                <div className="comunitypostNew-wrap_status">
                  <div className="status-item">
                    <EysIcon />
                    <p>123</p>
                  </div>
                  <div className="status-item">
                    <LikeIcon />
                    <p>2321</p>
                  </div>
                  <div className="status-item">
                    <CommentIcon />
                    <p>2321</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comunitypostNews-wrap_content">
            <div className="comunitypostNews-wrap_content__left">
              <Avatar
                shape="square"
                src="../images/banner.png"
                icon={<UserOutlined />}
              />
            </div>
            <div className="comunitypostNews-wrap_content__right">
              <div className="comunityPostNews-content">
                <div className="comunityPostNews-content-title">
                  <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                  <SaveIconOutline width={24} height={24} />
                </div>
                <div className="comunityPostNews-content_info">
                  <ul className={`text-content_postNew `}>
                    Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                    <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                    <li>Hiểu rõ công việc mình làm</li>
                    {/* <li>Hiểu thực đơn của nhà hàng</li>
                                        <li>Hiểu rõ công việc mình làm</li>
                                        <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                                        <li>Hiểu thực đơn của nhà hàng</li> */}
                  </ul>
                  {/* {!showText ? (
                                        <span onClick={handleAddText}>Xem thêm...</span>
                                    ) : (
                                        <></>
                                    )} */}
                </div>
              </div>
              <div className="comunityPostNews-interaction">
                <div className="comunitypostNew-wrap_actor">
                  <div className="comunitypostNew-wrap">
                    {/* <img src="../images/banner.png" alt="anh loi" /> */}
                    <Avatar
                      size={42}
                      src="../images/banner.png"
                      icon={<UserOutlined />}
                    />
                    <div className="info-actor_comunity">
                      <p>Người viết</p>
                      <p>Trần Văn An</p>
                    </div>
                  </div>
                  <p>09/08/2023</p>
                </div>
                <div className="comunitypostNew-wrap_status">
                  <div className="status-item">
                    <EysIcon />
                    <p>123</p>
                  </div>
                  <div className="status-item">
                    <LikeIcon />
                    <p>2321</p>
                  </div>
                  <div className="status-item">
                    <CommentIcon />
                    <p>2321</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default ComunityNews;
