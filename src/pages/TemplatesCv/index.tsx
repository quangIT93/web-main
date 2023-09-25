import * as React from 'react';

// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';

// import icon
import {
  MinusCircle,
  PlusCircle,
  BackIcon,
  LoginArrowIcon,
  ShareCvIcon,
  TickIcon,
} from '#components/Icons';

// import Component
import ContentListCv from '#components/TemplatesCv/ContentListCv';

import './style.scss';

import { Modal, Button, Avatar } from 'antd';
import ModalShare from '#components/CV/ModalShare';
import ModalChooseCv from '#components/CV/ModalChooseCv';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { setCookie } from 'cookies';
import RollTop from '#components/RollTop';
import CvTemplate1 from '#components/TemplatesCv/CvTemplate/CvTemplate1';
import CvTemplate2 from '#components/TemplatesCv/CvTemplate/CvTemplate2';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSearchParams } from 'react-router-dom';
import CvTemplate3 from '#components/TemplatesCv/CvTemplate/CvTemplate3';
import CvTemplate4 from '#components/TemplatesCv/CvTemplate/CvTemplate4';
import CvTemplate5 from '#components/TemplatesCv/CvTemplate/CvTemplate5';
const TemplatesCv: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profile = useSelector(
    (state: RootState) => state.dataProfileV3.data,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [fontSizeCV, setFontSizeCV] = React.useState(24);
  //1: black, 2: blue, 3: yellow, 4:green, 5:red
  const [colorCV, setColorCV] = React.useState(1);
  const [openModalShare, setOpenModalShare] = React.useState(false);
  const [openModalChooseCv, setOpenModalChooseCv] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const TemplateId = Number(searchParams.get('template-id'));
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const templatesCv = [
    {
      id: 0,
      component: <CvTemplate1 color={colorCV} fontSize={fontSizeCV} profile={profile} />
    },
    {
      id: 1,
      component: <CvTemplate2 color={colorCV} fontSize={fontSizeCV} profile={profile} />
    },
    {
      id: 2,
      component: <CvTemplate3 color={colorCV} fontSize={fontSizeCV} profile={profile} />
    },
    {
      id: 3,
      component: <CvTemplate4 color={colorCV} fontSize={fontSizeCV} profile={profile} />
    },
    {
      id: 4,
      component: <CvTemplate5 color={colorCV} fontSize={fontSizeCV} profile={profile} />
    },
  ]
  React.useEffect(() => {
    roleRedux === 1 && window.open(`/`, '_parent');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickMinusCircle = () => {
    if (fontSizeCV > 16) {
      setFontSizeCV(fontSizeCV - 2);
    }
  };

  const handleClickPlusCircle = () => {
    if (fontSizeCV < 20) {
      setFontSizeCV(fontSizeCV + 2);
    }
  };

  const handlePickColor = (color: number) => {
    setColorCV(color);
  };

  const handleSaveCv = () => {
    setCookie('firstCv', '1', 365);
    setOpenModalChooseCv(true);
  };

  const removeVietnameseTones = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    str = str.replace(/Đ/g, 'D')
    return str
  }

  const createFileName = (str: string) => {
    str = removeVietnameseTones(str)
    str.trim()
    str = str.split(" ").join('_')
    str = str.concat('_CV')
    return str
  }

  const fileNameCv = createFileName(profile?.name ? profile?.name : "Your")

  return (
    <div className="cv-container">
      <Navbar />
      <div className="cv-content">
        {/* <div className="cv-content-page">
                    <div className="page" id="divToPrint1">
                        <div className="subpage">
                            <CV1 />
                        </div>
                    </div>
                </div>
                <div className="cv-content-page">
                    <div className="page" id="divToPrint2">
                        <div className="subpage">
                            <CV1 />
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        printDocument(true);
                    }}
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                >
                    Download
                </Button>
                <Button
                    onClick={() => {
                        printDocument(false);
                    }}
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                >
                    Preview
                </Button> */}

        <div className="contentCV-top">
          <div
            className="backToEditor"
            onClick={() => window.open(`/profile`, '_parent')}
          >
            <div className="icon-back">
              <BackIcon width={15} height={15} fill="white" />
            </div>
            <p>
              {languageRedux === 1 ? 'Về trang chỉnh sửa' : 'Back to Editor'}
            </p>
          </div>
          <div className="change-styles">
            <div className="change-styles_font">
              <div className="minusCircle" onClick={handleClickMinusCircle}>
                <MinusCircle />
              </div>
              <p style={{ fontSize: fontSizeCV }}>A</p>
              <div className="plusCircle" onClick={handleClickPlusCircle}>
                <PlusCircle />
              </div>
            </div>

            {/* <h3>|</h3> */}
            <div className="line"></div>

            <div className="color-group">
              <p>{languageRedux === 1 ? 'Màu sắc' : 'Color'}</p>
              <div className="change-styles_color">
                <div
                  className={`circle-color black`}
                  onClick={() => handlePickColor(1)}
                >
                  <div
                    className="circle-ticked"
                    style={{
                      display: colorCV === 1 ? 'block' : 'none',
                    }}
                  >
                    <TickIcon />
                  </div>
                </div>
                <div
                  className={`circle-color blue`}
                  onClick={() => handlePickColor(2)}
                >
                  <div
                    className="circle-ticked"
                    style={{
                      display: colorCV === 2 ? 'block' : 'none',
                    }}
                  >
                    <TickIcon />
                  </div>
                </div>
                <div
                  className={`circle-color yellow`}
                  onClick={() => handlePickColor(3)}
                >
                  <div
                    className="circle-ticked"
                    style={{
                      display: colorCV === 3 ? 'block' : 'none',
                    }}
                  >
                    <TickIcon />
                  </div>
                </div>
                <div
                  className={`circle-color green`}
                  onClick={() => handlePickColor(4)}
                >
                  <div
                    className="circle-ticked"
                    style={{
                      display: colorCV === 4 ? 'block' : 'none',
                    }}
                  >
                    <TickIcon />
                  </div>
                </div>
                <div
                  className={`circle-color red`}
                  onClick={() => handlePickColor(5)}
                >
                  <div
                    className="circle-ticked"
                    style={{
                      display: colorCV === 5 ? 'block' : 'none',
                    }}
                  >
                    <TickIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-cv">
            <PDFDownloadLink
              className="download-cv-btn"
              document={
                // TemplateId === 0 ?
                //   <CvTemplate1 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
                //   TemplateId === 1 ?
                //     <CvTemplate2 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
                //     <CvTemplate3 color={colorCV} fontSize={fontSizeCV} profile={profile} />
                templatesCv.filter((item: any) => {
                  return item.id === TemplateId
                })[0].component
              }
              fileName={fileNameCv}
            >
              {languageRedux === 1 ? 'Lưu và tải PDF' : 'Save & Download PDF'}
            </PDFDownloadLink>
            {/* <Button
              type="primary"
              onClick={handleSaveCv}
            >
              {
                languageRedux === 1 ?
                  "Lưu và tải PDF" :
                  "Save & Download PDF"
              }
            </Button> */}
            <Button
              type="primary"
              onClick={() => {
                setOpenModalShare(true);
              }}
            >
              <ShareCvIcon />
            </Button>
          </div>
        </div>

        <ContentListCv colorCV={colorCV} fontSizeCV={fontSizeCV} />
        <ModalShare
          openModalShare={openModalShare}
          setOpenModalShare={setOpenModalShare}
        />
        <ModalChooseCv
          openModalChooseCv={openModalChooseCv}
          setOpenModalChooseCv={setOpenModalChooseCv}
        />
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default TemplatesCv;
