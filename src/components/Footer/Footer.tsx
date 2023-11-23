import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useLocation } from 'react-router-dom';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import breakpoints from '../../scss/breakpoints';

import {
  ENSubLoginIcon,
  FaceBookIcon,
  KoreanSubLoginIcon,
  VNSubLoginIcon,
} from '#components/Icons';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import './style.scss';
import { getCookie, setCookie } from 'cookies';
import { getLanguages } from 'store/reducer/dataLanguage';
import { setLanguage } from 'store/reducer/changeLanguageReducer';

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
  const dispatch = useDispatch();

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const languageData = useSelector((state: RootState) => {
  //   return state.dataLanguage.languages;
  // });
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  // Language
  // const [languageId, setLanguageId] = useState<number>(languageRedux);

  // React.useEffect(() => {
  //   let userLanguageSelected = JSON.parse(getCookie('languageId') || '1');
  //   if (userLanguageSelected) {
  //     setLanguageId(userLanguageSelected);
  //     dispatch(getLanguages(userLanguageSelected) as any);
  //   } else {
  //     setLanguageId(1);
  //     dispatch(getLanguages('1') as any);
  //   }
  // }, [languageId]);

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

  const totgleLanguage = async (e: any, value: any) => {
    // setLanguageId(e.target.value);
    // let value = 1;
    // value === 1 ? value = 2 : 1;

    e.stopPropagation();
    setCookie('languageId', JSON.stringify(value), 365);
    await dispatch<any>(setLanguage(value));
    await dispatch(getLanguages(value.toString()) as any);
  };

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

            <h3>
              {languageRedux === 1
                ? 'Kết nối tài năng'
                : languageRedux === 2
                  ? 'Connect talent'
                  : languageRedux === 3 && '인재 모임'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Công ty TNHH NeoWorks., LTD'
                : languageRedux === 2
                  ? 'NeoWorks Co., LTD'
                  : languageRedux === 3 && 'NeoWorks 주식회사, LTD'}
            </p>
            <p>
              {languageRedux === 1
                ? 'Địa chỉ: 79 Quốc Hương, P. Thảo Điền, Quận 2, TP HCM'
                : languageRedux === 2
                  ? 'Address: 79 Quoc Huong, Thao Dien Ward, District 2, HCMC'
                  : languageRedux === 3 &&
                    '주소: 79 Quoc Huong, P. 호치민시 2군, HCM시'}
            </p>
            <p>
              {languageRedux === 1
                ? 'Đại diện pháp luật: Kim Dongha'
                : languageRedux === 2
                  ? 'Legal representative: Kim Dongha'
                  : languageRedux === 3 && '법인대표 : 김동하'}
            </p>
            <p>
              {languageRedux === 1
                ? 'Chức vụ: Giám đốc'
                : languageRedux === 2
                  ? 'Position: Director'
                  : languageRedux === 3 && '직무: 사장'}
            </p>
          </div>
          <div className="footer-center">
            <h4>
              {languageRedux === 1
                ? 'Về HiJob'
                : languageRedux === 2
                  ? 'About HiJob'
                  : languageRedux === 3 && 'Hi Job에 대해서'}
            </h4>
            <Link to="/policy#about-us" target="_seft">
              {languageRedux === 1
                ? 'Về HiJob'
                : languageRedux === 2
                  ? 'About HiJob'
                  : languageRedux === 3 && 'Hi Job에 대해서'}
            </Link>

            <Link to="/policy#privacy-policy" target="_seft">
              {' '}
              {languageRedux === 1
                ? 'Chính sách bảo mật'
                : languageRedux === 2
                  ? 'Privacy Policy'
                  : languageRedux === 3 && '보안 정책'}{' '}
            </Link>

            <Link to="/policy#terms-of-use" target="_seft">
              {' '}
              {languageRedux === 1
                ? 'Điều khoản sử dụng'
                : languageRedux === 2
                  ? 'Terms of Use'
                  : languageRedux === 3 && '이용약관'}{' '}
            </Link>
            <h4>
              {languageRedux === 1
                ? 'Liên kết'
                : languageRedux === 2
                  ? 'Link'
                  : languageRedux === 3 && '연결'}
            </h4>
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
                  : languageRedux === 2
                    ? 'Download HiJob App!'
                    : languageRedux === 3 && 'HiJob 앱 다운로드!'}
              </h4>
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
            <p>
              {
                // language?.footer?.usage_policy
                languageRedux === 1
                  ? 'Chính sách sử dụng'
                  : languageRedux === 2
                    ? 'Terms & Policies'
                    : languageRedux === 3 && '이용약관'
              }
            </p>
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
                {
                  // language?.footer?.customer_service_center
                  languageRedux === 1
                    ? 'Tổng đài CSKH'
                    : languageRedux === 2
                      ? 'Customer Call Center'
                      : languageRedux === 3 && '고객관리 교환국'
                }
              </p>
              <p style={{ color: '#575757', marginLeft: '5px' }}>
                (028) 35358983
              </p>
              {/* <p style={{ color: '#575757', marginLeft: '2px' }}>
              (1.000 đồng/phút)
            </p> */}
            </div>
          </div>
          <div className="left_footer">
            <div
              key="1"
              className="language"
              onClick={(e: any) => {
                // languageRedux === 1
                //   ? totgleLanguage(e, 2)
                //   : totgleLanguage(e, 1);
                switch (languageRedux) {
                  case 1:
                    totgleLanguage(e, 2);
                    break;
                  case 2:
                    totgleLanguage(e, 3);
                    break;
                  case 3:
                    totgleLanguage(e, 1);
                    break;

                  default:
                    break;
                }
              }}
            >
              {languageRedux === 1 ? (
                <VNSubLoginIcon width={20} height={20} />
              ) : languageRedux === 2 ? (
                <ENSubLoginIcon width={20} height={20} />
              ) : (
                languageRedux === 3 && (
                  <KoreanSubLoginIcon width={20} height={20} />
                )
              )}
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
          </div>
        </PolicyFooter>
      </div>
    </WrapFooter>
  );
};

export default Footer;
