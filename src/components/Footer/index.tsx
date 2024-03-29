import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Footer: React.FC = () => {
  // const mail = 'hijob.contact1@gmail.com';
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
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
            <img
              width={66}
              height={80}
              src={require('../../img/langdingPage/logoHiJob.png')}
              alt={
                languageRedux === 1
                  ? 'Hình ảnh bị lỗi'
                  : languageRedux === 2
                  ? 'Image is corrupted'
                  : '이미지가 손상되었습니다'
              }
            />
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
              <img
                width={124}
                height={124}
                src={require('../../img/langdingPage/QRcode-ggplay.png')}
                alt="Ảnh lỗi"
              />
              <img
                width={124}
                height={124}
                style={{ marginLeft: 10 }}
                src={require('../../img/langdingPage/QRcode-appstore.png')}
                alt="Ảnh lỗi"
              />
            </div>
            <div className="div-link-app">
              <Link
                to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                target="_blank"
              >
                <img
                  width={117}
                  height={35}
                  id="img-gallery"
                  src={require('../../img/langdingPage/image 43.png')}
                  alt="Ảnh lỗi"
                />
              </Link>
              <Link
                to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                target="_blank"
              >
                <img
                  width={117}
                  height={35}
                  src={require('../../img/langdingPage/image 45.png')}
                  alt="Ảnh lỗi"
                />
              </Link>
            </div>
          </div>
          <div className="div-socal-link">
            <h4 style={{ color: '#0D99FF' }}>
              {languageRedux === 1
                ? 'Liên kết'
                : languageRedux === 2
                ? 'Link'
                : languageRedux === 3 && '연결'}
            </h4>
            <div id="div-img-socal">
              <Link to="https://www.facebook.com/hijobOfficial/">
                <img
                  src={require('../../img/langdingPage/imagefb.png')}
                  alt="Ảnh lỗi"
                />
              </Link>
              <Link to="#">
                <img
                  id="img-gallery"
                  src={require('../../img/langdingPage/imagein.png')}
                  alt="Ảnh lỗi"
                />
              </Link>
              <Link to="#">
                <img
                  src={require('../../img/langdingPage/imageyou.png')}
                  alt="Ảnh lỗi"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="div-policy-footer">
        <Link to="/policy">
          {' '}
          <p>Chính sách sử dụng</p>{' '}
        </Link>

        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: '#575757', fontSize: '12px' }}>Tổng đài CSKH: </p>
          <p style={{ color: '#575757', marginLeft: '5px', fontSize: '12px' }}>
            (028) 35358983
          </p>
          {/* <p style={{ color: '#575757', marginLeft: '2px' }}>
              (1.000 đồng/phút)
            </p> */}
        </div>

        <Link
          to={`mailto:hijob.contact1@gmail.com`}
          style={{
            color: '#0d99ff',
            textDecoration: 'underline',
            fontSize: '12px',
          }}
        >
          Email: hijob.contact1@gmail.com
        </Link>
      </div>
    </div>
  );
};

export default Footer;
