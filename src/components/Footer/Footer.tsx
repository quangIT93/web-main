import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const [windowWidth, setWindowWidth] = useState(false);
  // const [position, setPosition] = React.useState('0')

  const footerRef = React.useRef<HTMLDivElement | null>(null);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

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

  useEffect(() => {
    updateWindowWidth();
  }, []);

  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (currentWidth < 784) {
      setWindowWidth(true);
    } else {
      setWindowWidth(false);
      setOpen(false);
    }
    // console.log('Current window width:', currentWidth);
  });

  useEffect(() => {}, [languageRedux]);

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
    <WrapFooter
      ref={footerRef}
      className="footer-main"
      onClick={(e: any) => {
        e.stopPropagation();
        return handleClickOpen;
      }}
    >
      <Visibility
        style={
          open && !windowWidth
            ? {
                transform: 'translateY(calc(-100% - 36px))',
                borderTop: '1px solid #ccc',
              }
            : !open && !windowWidth
            ? {
                transform: 'translateY(calc(0% + 36px))',
                visibility: 'hidden',
              }
            : { transform: 'none' }
        }
      >
        <div
          className="container-footer"
          style={
            location.pathname === '/'
              ? { maxWidth: '1280px' }
              : { maxWidth: '1080px' }
          }
        >
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
                alt={language?.err_none_img}
              />
            </div>

            <h3>{language?.connect_talent}</h3>
            <p>{language?.footer?.company_name}</p>
            <p>{language?.footer?.company_location}</p>
            <p>{language?.footer?.legal_representative}</p>
            <p>{language?.footer?.position_director}</p>
          </div>
          <div className="footer-center">
            <h4>{language?.footer?.about_hijob}</h4>
            <Link to="/policy#about-us" target="_seft">
              {language?.footer?.about_hijob}
            </Link>

            <Link to="/policy#privacy-policy" target="_seft">
              {' '}
              {language?.footer?.privacy_policy}{' '}
            </Link>

            <Link to="/policy#terms-of-use" target="_seft">
              {' '}
              {language?.footer?.terms_of_use}{' '}
            </Link>

            <h4>{language?.footer?.connect}</h4>
            <div className="link-facebook">
              <FaceBookIcon />
              <Link to="https://www.facebook.com/hijobOfficial" target="_blank">
                Facebook
              </Link>
            </div>
          </div>
          <div className="footer-right">
            <div className="right-top">
              <h4>{language?.download_hijob_app}</h4>
              <div className="div-img-footer">
                <img
                  width={124}
                  height={124}
                  src={require('../../img/langdingPage/QRcode-ggplay.png')}
                  alt={language?.err_none_img}
                />
                <img
                  width={124}
                  height={124}
                  style={{ marginLeft: 10 }}
                  src={require('../../img/langdingPage/QRcode-appstore.png')}
                  alt={language?.err_none_img}
                />
              </div>
              <div className="div-link-app">
                <Link
                  to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                  target="_seft"
                >
                  <img
                    width={117}
                    height={35}
                    id="img-gallery"
                    src={require('../../img/langdingPage/image 43.png')}
                    alt={language?.err_none_img}
                  />
                </Link>
                <Link
                  to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                  target="_seft"
                >
                  <img
                    width={117}
                    height={35}
                    src={require('../../img/langdingPage/image 45.png')}
                    alt={language?.err_none_img}
                  />
                </Link>
              </div>
            </div>
            <div className="div-socal-link">
              <h4 style={{ color: '#0D99FF' }}>{language?.footer?.connect}</h4>
              <div id="div-img-socal">
                <Link to="https://www.facebook.com/hijobOfficial/">
                  <img
                    src={require('../../img/langdingPage/imagefb.png')}
                    alt={language?.err_none_img}
                  />
                </Link>
                {/* <Link to={document.URL}>
                  <img
                    id="img-gallery"
                    src={require('../../img/langdingPage/imagein.png')}
                    alt={language?.err_none_img}
                  />
                </Link>
                <Link to={document.URL}>
                  <img
                    src={require('../../img/langdingPage/imageyou.png')}
                    alt={language?.err_none_img}
                  />
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </Visibility>
      <div onClick={handleClickOpen} className="wrap-footer-bottom">
        <PolicyFooter
          id="div-policy-footer"
          style={
            location.pathname === '/'
              ? { maxWidth: '1280px' }
              : { maxWidth: '1080px' }
          }
        >
          <Link to="/policy" target="_parent">
            <p>{language?.footer?.usage_policy}</p>
          </Link>
          <div id="div-policy-footer-right">
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
                fontSize: '12px',
              }}
            >
              <p style={{ color: '#575757', fontSize: '12px' }}>
                {language?.footer?.customer_service_center}
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
      </div>
    </WrapFooter>
  );
};

export default Footer;
