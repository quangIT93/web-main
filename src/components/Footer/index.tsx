import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Footer: React.FC = () => {
  const mail = 'contact.hijob@gmail.com';
  return (
    <div style={{ width: '100%' }}>
      <div className="container-footer">
        <div className="footer-left">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '40%',
              marginBottom: 10,
            }}
          >
            <img src={require('../../img/langdingPage/logoHiJob.png')} />
          </div>

          <h3>Kết nối tài năng</h3>
          <p>Công ty TNHH NeoWorks., LTD</p>
          <p>Địa chỉ: 79 Quốc Hương, P. Thảo Điền, Quận 2, TP HCM</p>
          <p>Đại diện pháp luật: Kim Dongha</p>
          <p>Chức vụ: Giám đốc</p>
        </div>
        <div className="footer-center">
          <h4>Về HiJob</h4>
          <a href="/policy#about-us">Về HiJob</a>

          <a href="/policy#privacy-policy"> Chính sách bảo mật </a>

          <a href="/policy#terms-of-use"> Điều khoản sử dụng </a>
        </div>
        <div className="footer-right">
          <div className="right-top">
            <h4>TẢI ỨNG DỤNG HIJOB</h4>
            <div className="div-img-footer">
              <img src={require('../../img/langdingPage/QRcode-ggplay.png')} />
              <img
                style={{ marginLeft: 10 }}
                src={require('../../img/langdingPage/QRcode-appstore.png')}
              />
            </div>
            <div className="div-link-app">
              <a
                href="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                target="_blank"
              >
                <img
                  id="img-gallery"
                  src={require('../../img/langdingPage/image 43.png')}
                />
              </a>
              <a
                href="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                target="_blank"
              >
                <img src={require('../../img/langdingPage/image 45.png')} />
              </a>
            </div>
          </div>
          <div className="div-socal-link">
            <h4 style={{ color: '#0D99FF' }}>LIÊN KẾT</h4>
            <div id="div-img-socal">
              <a href="https://www.facebook.com/hijobOfficial/">
                <img src={require('../../img/langdingPage/imagefb.png')} />
              </a>
              <a href="#">
                <img
                  id="img-gallery"
                  src={require('../../img/langdingPage/imagein.png')}
                />
              </a>
              <a href="#">
                <img src={require('../../img/langdingPage/imageyou.png')} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="div-policy-footer">
        <a href="/policy">
          {' '}
          <p>Chính sách sử dụng</p>{' '}
        </a>
        <div id="div-policy-footer-right">
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <p style={{ color: '#575757' }}>Tổng đài CSKH: </p>
            <p style={{ color: '#AAAAAA', marginLeft: '5px' }}>
              (028) 35358983
            </p>
            {/* <p style={{ color: '#575757', marginLeft: '2px' }}>
              (1.000 đồng/phút)
            </p> */}
          </div>
          <Link to={`mailto:someone@example.com`} style={{ color: '#575757' }}>
            Email: contact.hijob@gmail.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
