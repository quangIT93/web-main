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
} from '#components/Icons';

// import Component
import ContentListCv from '#components/TemplatesCv/ContentListCv';

import './style.scss';

import { Modal, Button, Avatar } from 'antd';

const TemplatesCv: React.FC = () => {
  const [fontSizeCV, setFontSizeCV] = React.useState(12);

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
          <div className="backToEditor">
            <div className="icon-back">
              <BackIcon width={15} height={15} fill="white" />
            </div>
            <p>Back to Editor</p>
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

            <h3>|</h3>

            <div className="change-styles_color">
              <div className={`circle-color black`}></div>
              <div className={`circle-color blue`}></div>
              <div className={`circle-color yellow`}></div>
              <div className={`circle-color green`}></div>
              <div className={`circle-color red`}></div>
            </div>
          </div>
          <div className="button-cv">
            <Button
              type="primary"
              // onClick={() => {
              //   console.log('click');

              //   setOpenModalLogin(true);
              // }}
            >
              <LoginArrowIcon />
              Lưu và tải PDF
            </Button>

            <ShareCvIcon />
          </div>
        </div>

        <ContentListCv />
      </div>
      <Footer />
      {/* <Modal
                title="Basic Modal"
                open={open}
                //   onOk={this.handleOk}
                onCancel={handleOpenModel}
            >
                <Avatar size={200} src={blobCv} />
            </Modal> */}
    </div>
  );
};

export default TemplatesCv;
