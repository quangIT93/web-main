import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import breakpoints from '../../scss/breakpoints';

import { FaceBookIcon } from '#components/Icons';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

const { mobile, tablet } = breakpoints;

const WrapFooter = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  Right: 0,
  width: '100%',
  background: 'white',
  borderTop: '1px solid #ccc',
  zIndex: '2',
  height: '36px',

  [`@media (max-width: ${mobile})`]: {
    height: '36px',
    position: 'unset',
  },

  [`@media (min-width: ${mobile}) and (max-width: ${tablet}) `]: {
    position: 'unset',
    height: '70px',
  },
});
const PolicyFooter = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer',
  zIndex: '2',

  // [`@media (max-width: ${mobile})`]: {
  //   position: 'unset',
  // },

  // [`@media (min-width: ${mobile}) and (max-width: ${tablet}) `]: {
  //   position: 'unset',
  // },
});

const Visibility = styled('div')({
  position: 'absolute',
  background: 'white',
  top: '100%',
  color: 'black',
  transition: 'all 0.4s linear',
  zIndex: '1',
  left: 0,
  right: 0,
  width: '100%',

  [`@media (max-width: ${mobile})`]: {
    position: 'unset',
  },

  [`@media (min-width: ${mobile}) and (max-width: ${tablet}) `]: {
    position: 'unset',
  },
});

const Footer: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [open, setOpen] = React.useState(false);

  const [windowWidth, setWindowWidth] = useState(false);
  // const [position, setPosition] = React.useState('0')

  const footerRef = React.useRef<HTMLDivElement | null>(null);

  // const mail = useRef('contact.hijob@gmail.com');
  // const email = ['contact.hijob@gmail.com', 'contact.hijob@gmail.com'];

  const handleClickOpen = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // e.isPropagationStopped()

    if (!open && !windowWidth) {
      return setOpen(true);
    } else if (open && !windowWidth) {
      setOpen(false);
    }
  };

  const updateWindowWidth = () => {
    if (window.innerWidth < 784) {
      setWindowWidth(true);
    } else {
      setWindowWidth(false);
    }
  };

  useEffect(() => {}, [languageRedux]);

  useEffect(() => {
    updateWindowWidth();
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth) {
      return setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapFooter ref={footerRef}>
      <Visibility
        style={
          open && !windowWidth
            ? {
                transform: 'translateY(calc(-100% - 36px))',
              }
            : !open && !windowWidth
            ? {
                transform: 'translateY(calc(0% + 36px))',
                visibility: 'hidden',
              }
            : { transform: 'none' }
        }
      >
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
                src={require('../../img/langdingPage/logoHiJob.png')}
                alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
              />
            </div>

            <h3>
              {languageRedux === 1 ? 'Kết nối tài năng' : 'Talent connection'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Công ty TNHH NeoWorks., LTD'
                : 'NeoWorks Co., Ltd., LTD'}
            </p>
            <p>
              {languageRedux === 1
                ? 'Địa chỉ: 79 Quốc Hương, P. Thảo Điền, Quận 2, TP HCM'
                : 'Address: 79 Quoc Huong, Thao Dien Ward, District 2, HCMC'}
            </p>
            <p>
              {languageRedux === 1
                ? 'Đại diện pháp luật: Kim Dongha'
                : 'Legal representative: Kim Dongha'}
            </p>
            <p>
              {languageRedux === 1 ? 'Chức vụ: Giám đốc' : 'Position: Director'}
            </p>
          </div>
          <div className="footer-center">
            <h4>{languageRedux === 1 ? 'Về HiJob' : 'About HiJob'}</h4>
            <Link to="/policy#about-us" target="_seft">
              {languageRedux === 1 ? 'Về HiJob' : 'About HiJob'}
            </Link>

            <Link to="/policy#privacy-policy" target="_seft">
              {' '}
              {languageRedux === 1
                ? 'Chính sách bảo mật'
                : 'Privacy Policy'}{' '}
            </Link>

            <Link to="/policy#terms-of-use" target="_seft">
              {' '}
              {languageRedux === 1 ? 'Điều khoản sử dụng' : 'Terms of use'}{' '}
            </Link>

            <h4>{languageRedux === 1 ? 'Liên kết' : 'Connect'}</h4>
            <div className="link-facebook">
              <FaceBookIcon />
              <Link to="https://www.facebook.com/hijobOfficial" target="_blank">
                Facebook
              </Link>
            </div>
          </div>
          <div className="footer-right">
            <div className="right-top">
              <h4>
                {languageRedux === 1
                  ? 'Tải Ứng dụng HiJob!'
                  : 'Download the HiJob App!'}
              </h4>
              <div className="div-img-footer">
                <img
                  src={require('../../img/langdingPage/QRcode-ggplay.png')}
                  alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
                />
                <img
                  style={{ marginLeft: 10 }}
                  src={require('../../img/langdingPage/QRcode-appstore.png')}
                  alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
                />
              </div>
              <div className="div-link-app">
                <Link
                  to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                  target="_seft"
                >
                  <img
                    id="img-gallery"
                    src={require('../../img/langdingPage/image 43.png')}
                    alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
                  />
                </Link>
                <Link
                  to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                  target="_seft"
                >
                  <img
                    src={require('../../img/langdingPage/image 45.png')}
                    alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
                  />
                </Link>
              </div>
            </div>
            <div className="div-socal-link">
              <h4 style={{ color: '#0D99FF' }}>LIÊN KẾT</h4>
              <div id="div-img-socal">
                <Link to="https://www.facebook.com/hijobOfficial/">
                  <img
                    src={require('../../img/langdingPage/imagefb.png')}
                    alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
                  />
                </Link>
                <Link to="#">
                  <img
                    id="img-gallery"
                    src={require('../../img/langdingPage/imagein.png')}
                    alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
                  />
                </Link>
                <Link to="#">
                  <img
                    src={require('../../img/langdingPage/imageyou.png')}
                    alt={languageRedux === 1 ? 'ảnh bị lỗi' : 'Error photo'}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Visibility>
      <PolicyFooter id="div-policy-footer" onClick={handleClickOpen}>
        <Link to="/policy" target="_parent">
          <p>{languageRedux === 1 ? 'Chính sách sử dụng' : 'Usage Policy'}</p>
        </Link>
        <div id="div-policy-footer-right">
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <p style={{ color: '#575757' }}>
              {languageRedux === 1
                ? 'Tổng đài CSKH:'
                : 'Customer Service Center'}
            </p>
            <p style={{ color: '#575757', marginLeft: '5px' }}>
              (028) 35358983
            </p>
            {/* <p style={{ color: '#575757', marginLeft: '2px' }}>
              (1.000 đồng/phút)
            </p> */}
          </div>
        </div>
        <Link
          to="mailto:contact.hijob@gmail.com"
          style={{
            color: '#0d99ff',
            textDecoration: 'underline',
            fontSize: '12px',
          }}
        >
          Email: contact.hijob@gmail.com
        </Link>
      </PolicyFooter>
    </WrapFooter>
  );
};

export default Footer;
