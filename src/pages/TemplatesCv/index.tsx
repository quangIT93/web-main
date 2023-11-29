import * as React from 'react';

// @ts-ignore
// import { Navbar } from '#components';
// import Footer from '../../components/Footer/Footer';

// import icon
import { MinusCircle, PlusCircle, BackIcon, TickIcon } from '#components/Icons';

// import Component
import ContentListCv from '#components/TemplatesCv/ContentListCv';
import templatesCv from '#components/TemplatesCv/CvTemplate/ListTheme';

import './style.scss';

import ModalShare from '#components/CV/ModalShare';
import ModalChooseCv from '#components/CV/ModalChooseCv';
import ModalSuccessSaveCv from '#components/CV/ModalSuccessSaveCv';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
// import { setCookie } from 'cookies';

import { pdf } from '@react-pdf/renderer';

import apiCv from 'api/apiCv';

import { Backdrop, CircularProgress } from '@mui/material';
import { getAnalytics, logEvent } from 'firebase/analytics';
import ModalOver10Cv from '#components/CV/ModalOver10Cv';
import ModalSaveCvValidInfo from '#components/CV/ModalSaveCvValidInfo';
const TemplatesCv: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  // const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [fontSizeCV, setFontSizeCV] = React.useState(24);
  //1: black, 2: blue, 3: yellow, 4:green, 5:red
  const [colorCV, setColorCV] = React.useState(1);
  const [openModalShare, setOpenModalShare] = React.useState(false);
  const [openModalChooseCv, setOpenModalChooseCv] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openModalSuccessDownCv, setOpenModalSuccessDownCv] = React.useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  // const [searchParams, setSearchParams] = useSearchParams();
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const profileMoreV3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );
  const [unUp, setUnUp] = React.useState(true);
  const [unDown, setUnDown] = React.useState(false);
  const [openModalOver10Cv, setOpenModalOver10Cv] = React.useState(false);
  const [openModalSaveValidInfo, setOpenModalSaveValidInfo] =
    React.useState(false);

  React.useEffect(() => {
    profileV3.length !== 0 &&
      profileV3.typeRoleData === 1 &&
      window.open(`/`, '_parent');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickMinusCircle = () => {
    setUnUp(false);
    if (fontSizeCV > 20) {
      setFontSizeCV(fontSizeCV - 2);
    }
    if (fontSizeCV === 20) {
      setUnDown(true);
      console.log(unDown);
    }
    console.log(fontSizeCV);
  };

  const handleClickPlusCircle = () => {
    setUnDown(false);
    if (fontSizeCV < 24) {
      setFontSizeCV(fontSizeCV + 2);
    }
    if (fontSizeCV === 24) {
      setUnUp(true);
      console.log(unUp);
    }
    console.log(fontSizeCV);
  };

  const handlePickColor = (color: number) => {
    setColorCV(color);
  };

  // const handleSaveCv = () => {
  //   // setCookie('firstCv', '1', 365);
  //   localStorage.setItem('firstCv', '1');
  //   setOpenModalChooseCv(true);
  // };

  // React.useEffect(() => {}, []);

  const handleClickSaveCv = async () => {
    const analytics: any = getAnalytics();

    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: `/web_click_create_cv` as string,
    });

    const selectedTemplate = templatesCv.find((template) => {
      // console.log(template.id);
      // console.log(Number(localStorage.getItem('cv-id')));
      if (!Number(localStorage.getItem('cv-id'))) {
        return 1;
      }

      if (template.id === Number(localStorage.getItem('cv-id')))
        return Number(localStorage.getItem('cv-id'));
      // return template.id === Number(localStorage.getItem('cv-id'))
      //   ? Number(localStorage.getItem('cv-id'))
    });
    try {
      setLoading(true);
      if (
        !profileV3.name &&
        !profileV3.phone &&
        !profileV3.email &&
        !profileV3.jobTypeName &&
        !profileV3.avatarPath
      ) {
        setOpenModalSaveValidInfo(true);
        setLoading(false);
        return;
      }

      if (
        !profileMoreV3.profileActivities &&
        !profileMoreV3.profileAwards &&
        !profileMoreV3.profileHobbies &&
        !profileMoreV3.profilesEducations &&
        !profileMoreV3.profilesExperiences &&
        !profileMoreV3.profilesLanguages &&
        !profileMoreV3.profilesReferences
      ) {
        setOpenModalSaveValidInfo(true);
        setLoading(false);

        return;
      }
      if (selectedTemplate) {
        const CvComponent = selectedTemplate.component; // Lấy component của mẫu CV

        // Tạo một biến để lưu trữ mẫu CV được chọn

        const pdfBlob = await pdf(
          <CvComponent
            color={colorCV}
            fontSize={fontSizeCV}
            profile={profileV3}
            profileMore={profileMoreV3}
          />,
        ).toBlob();

        const name =
          localStorage.getItem('nameCv') !== null
            ? localStorage.getItem('nameCv')
            : 'Resume 1';

        if (pdfBlob) {
          const formData = new FormData();
          formData.append('file', pdfBlob);
          formData.append('name', name!);
          // formData.append('status', '1');

          const result = await apiCv.postCv(formData);
          if (result) {
            setLoading(false);
            setOpenModalSuccessDownCv({ open: true, id: result.data.id });
            // setOpenModalChooseCv(true);
            // console.log('lưu cv thành công');
            // handleSaveCv();
          }
        }
      }

      // Tạo tệp PDF và lấy Blob
      // const pdfBlob = await MyPdfDocument.toBlob();

      // Chuyển đổi Blob thành mảng dữ liệu (array buffer)
      // const arrayBuffer = await pdfBlob.arrayBuffer();

      // Lưu trữ array buffer trong một biến
      // const pdfData = new Uint8Array(arrayBuffer);
    } catch (error) {
      console.log('error', error);
      setOpenModalOver10Cv(true);
      setLoading(false);
    }
  };
  const removeVietnameseTones = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  };

  const createFileName = (str: string) => {
    str = removeVietnameseTones(str);
    str.trim();
    str = str.split(' ').join('_');
    str = str.concat('_CV');
    return str;
  };

  const fileNameCv = createFileName(profileV3?.name ? profileV3?.name : 'Your');

  React.useEffect(() => {
    if (!localStorage.getItem('accessToken') || profileV3.typeRoleData === 1)
      window.open(`/`, '_parent');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (profileV3.typeRoleData === 1) {
      window.open('/', '_parent');
    }
  }, [profileV3]);

  return (
    <div className="cv-container">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <div className="cv_content">
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
              {languageRedux === 1
                ? 'Quay lại trang chỉnh sửa'
                : languageRedux === 2
                  ? 'Return to the editing page'
                  : '편집 페이지로 돌아가기'}
            </p>
          </div>
          <div className="change-styles">
            <div className="change-styles_font">
              <div
                className={unDown ? 'minusCircle unable' : 'minusCircle'}
                onClick={handleClickMinusCircle}
              >
                <MinusCircle />
              </div>
              <p style={{ fontSize: fontSizeCV }}>A</p>
              <div
                className={unUp ? 'plusCircle unable' : 'plusCircle'}
                onClick={handleClickPlusCircle}
              >
                <PlusCircle />
              </div>
            </div>

            {/* <h3>|</h3> */}
            <div className="line"></div>

            <div className="color-group">
              <p>{languageRedux === 1
                ? 'Màu sắc'
                : languageRedux === 2
                  ? 'Color'
                  : '색상'}</p>
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
          <div className="button-cv" onClick={handleClickSaveCv}>
            {/* <PDFDownloadLink
              className="download-cv-btn"
              document={
                templatesCv.filter((item: any) => {
                  return item.id === TemplateId;
                })[0].component
              }
              fileName={fileNameCv}
            >
              {languageRedux === 1 ? 'Lưu và tải PDF' : 'Save & Download PDF'}
            </PDFDownloadLink> */}
            <p className="download-cv-btn">
              {languageRedux === 1
                ? 'Lưu PDF'
                : languageRedux === 2
                  ? 'Save PDF'
                  : 'PDF 저장'}
            </p>
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
            {/* <Button
              type="primary"
              onClick={() => {
                setOpenModalShare(true);
              }}
            >
              <ShareCvIcon />
            </Button> */}
          </div>
        </div>

        <Backdrop
          sx={{
            color: '#0d99ff ',
            backgroundColor: 'transparent',
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <ContentListCv colorCV={colorCV} fontSizeCV={fontSizeCV} />
        <ModalShare
          openModalShare={openModalShare}
          setOpenModalShare={setOpenModalShare}
        />
        <ModalChooseCv
          openModalChooseCv={openModalChooseCv}
          setOpenModalChooseCv={setOpenModalChooseCv}
        />

        <ModalSuccessSaveCv
          openModalSuccessDownCv={openModalSuccessDownCv}
          setOpenModalSuccessDownCv={setOpenModalSuccessDownCv}
        />

        <ModalOver10Cv
          openModalOver10Cv={openModalOver10Cv}
          setOpenModalOver10Cv={setOpenModalOver10Cv}
        />

        <ModalSaveCvValidInfo
          openModalSaveValidInfo={openModalSaveValidInfo}
          setOpenModalSaveValidInfo={setOpenModalSaveValidInfo}
        />
      </div>
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default TemplatesCv;
