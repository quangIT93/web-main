import React, { memo, useEffect } from 'react';

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import api
import jsPDF from 'jspdf';
import { PDFDownloadLink } from '@react-pdf/renderer';

import categoriesApi from 'api/categoriesApi';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Avatar, Spin } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { ResumeIcon } from '#components/Icons';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { spacing } from '../Styles';
import { initialSettings } from '../Setting/settingsSlice';
// import component
//@ts-ignore
import ItemCV from '../ItemCV';
//@ts-ignore
import Theme1 from '../Themes/Theme1';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';
import { Link, useSearchParams } from 'react-router-dom';
import CvTemplate1 from '../CvTemplate/CvTemplate1';
import CvTemplate2 from '../CvTemplate/CvTemplate2';

import { usePDF, StyleSheet } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import CvTemplate3 from '../CvTemplate/CvTemplate3';
import CvTemplate4 from '../CvTemplate/CvTemplate4';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const styleChildBox = {
  marginBottom: '12px',
};

interface IContentListCv {
  colorCV: any;
  fontSizeCV: any;
}

const ContentListCv: React.FC<IContentListCv> = (props) => {
  const { colorCV, fontSizeCV } = props;

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const profile = useSelector(
    (state: RootState) => state.dataProfileV3.data,
  );
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [cvId, setCvId] = React.useState<any>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const TemplateId = Number(searchParams.get('template-id'));
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
  ]

  const [instance, updateInstance] = usePDF(
    {
      // document: TemplateId === 0 ?
      //   <CvTemplate1 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
      //   TemplateId === 1 ?
      //     <CvTemplate2 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
      //     <CvTemplate3 color={colorCV} fontSize={fontSizeCV} profile={profile} />
      document: templatesCv.filter((item: any) => {
        return item.id === TemplateId
      })[0].component
    }
  );
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [numPages, setNumPages] = React.useState<number>();
  const [selected, setSelected] = React.useState<number>();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const getDataParentCategory = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  React.useEffect(() => {
    updateInstance(
      // TemplateId === 0 ?
      // <CvTemplate1 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
      // TemplateId === 1 ?
      //   <CvTemplate2 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
      //   <CvTemplate3 color={colorCV} fontSize={fontSizeCV} profile={profile} />
      templatesCv.filter((item: any) => {
        return item.id === TemplateId
      })[0].component
    );
  }, [colorCV, TemplateId, profile]);

  React.useEffect(() => {
    getDataParentCategory();
    const cv_id = localStorage.getItem('cv-id');
    //convert string to number
    cv_id && setCvId(+cv_id);
  }, [languageRedux]);

  // console.log('dataCategories', dataCategories);

  const handleChangeCategory = async () => { };

  const handleSelectTemplate = (id: any) => {
    setSearchParams({
      'template-id': id,
    });
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    headerLeft: {
      width: '30%',
    },
    headerRight: {
      width: '70%',
    },
    headerImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    content: {
      flexDirection: 'row',
    },
    contentLeft: {
      width: '30%',
    },
    contentRight: {
      width: '70%',
    },
    section: {
      marginBottom: 10,
    },
    flexCol: {
      display: 'flex',
      flexDirection: 'column',
    },
  });

  return (
    <div className="contentCV-bottom">
      <div className="contentCV-bottom-left">
        <Box sx={styleChildBox}>
          <Autocomplete
            autoHighlight
            className="contentCV-bottom-select"
            options={dataCategories ? dataCategories : []}
            getOptionLabel={(option: any) => option?.name || ''}
            value={
              true ? dataCategories?.find((cate: any) => cate.id === 1) : null
            }
            defaultValue={dataCategories}
            onChange={handleChangeCategory}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  languageRedux === 1 ? 'Chọn mẫu CV' : 'Choose resume template'
                }
                size="small"
              // error={!selectedProvince}
              />
            )}
          />
        </Box>

        <div className="list-template">
          {Array.from(new Array(10).keys()).map((item: any, index: any) => (
            <div
              className={
                TemplateId === index ?
                  "template-item active" : "template-item"
              }
              key={index}
              onClick={() => handleSelectTemplate(index)}
            >
              <Avatar shape="square" icon={<UserOutlined />} />
            </div>
          ))}
        </div>
        <Swiper
          navigation={true}
          slidesPerView="auto"
          spaceBetween={17}
          modules={[Mousewheel, Navigation, Pagination]}
          className="list-template-swiper"
        >
          {Array.from(new Array(10).keys()).map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                onClick={(event) => {
                  // handleClickItem();
                }}
              >
                <div className={
                  TemplateId === index ?
                    "slide-item active" :
                    "slide-item"
                }
                  key={item}
                  onClick={() => handleSelectTemplate(index)}
                >
                  <Avatar shape="square" icon={<UserOutlined />} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="contentCV-line"></div>
      <div className="contentCV-bottom-right">
        <div className="contentCv-bottom-right_title">
          <div className="title_left">
            <ResumeIcon />
            <h3>
              {languageRedux === 1 ? `Hồ sơ số ${cvId}` : `Resume No.${cvId}`}
            </h3>
          </div>
          {/* Tải xuống PDF */}
          {/* <PDFDownloadLink document={<Theme1 />} fileName="111.pdf">
            {({ loading }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink> */}

          <div className="title_right">
            <p
              onClick={() => {
                window.open('/profile-cv', '_parent');
              }}
            >
              {language?.home_page?.view_all}
            </p>
          </div>
        </div>
        <div className="contentCv-bottom-right_cv">
          {profileV3 && (
            <Document
              loading={<Spin indicator={antIcon} />}
              noData={<Spin indicator={antIcon} />}
              file={instance.url}
              onLoadSuccess={onDocumentLoadSuccess}
              className="page-cv-wrapper"
            >
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => (
                  <Page
                    className="page-cv"
                    loading={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                    noData={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                    pageNumber={page}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                ))}
            </Document>
          )}
          {/* <CvTemplate3 /> */}
        </div>
        {/* <Avatar shape="square" icon={<UserOutlined />} />
          <Avatar shape="square" icon={<UserOutlined />} /> */}
      </div>
    </div>
  );
};

export default memo(ContentListCv);
