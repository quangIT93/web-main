import React from 'react';
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
//@ts-ignore
import { spacing } from '../Styles';

import { initialSettings } from '../Setting/settingsSlice';

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import api
import jsPDF from 'jspdf';
import { usePDF } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';

import categoriesApi from 'api/categoriesApi';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ResumeIcon } from '#components/Icons';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';

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
import { Link } from 'react-router-dom';

const styleChildBox = {
  marginBottom: '12px',
};

const ContentListCv = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [cvId, setCvId] = React.useState<any>(1);

  const [resume, setResume] = React.useState<any>({
    custom: { descriptions: Array(0) },
    educations: ['asdsadsadsa'],
    profile: {
      name: 'asdsad',
      summary: 'sadsad',
      email: 'sdsadsad',
      phone: 'dsadasdad',
      location: 'asdsadsad',
    },
    projects: ['sdsadsada'],
    skills: { featuredSkills: Array(6), descriptions: Array(0) },
    workExperiences: [],
  });
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

  React.useEffect(() => {
    getDataParentCategory();
    const cv_id = localStorage.getItem('cv-id');
    //convert string to number
    cv_id && setCvId(+cv_id);
  }, [languageRedux]);

  console.log('dataCategories', dataCategories);

  const handleChangeCategory = async () => {};

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [education, setEducation] = React.useState('');

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

  const handleClickDownCv = () => {
    const data = document.getElementById('receipt');
    html2canvas(data!).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('ikismail.pdf'); // Generated PDF
    });
  };

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
          {Array.from(new Array(10).keys()).map((item) => (
            <div className="template-item" key={item}>
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
                <div className="slide-item" key={item}>
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

          <div onClick={handleClickDownCv}>Download Cv now</div>

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
          <PDFViewer
            style={{ flex: 1, width: '100%', height: '100%' }}
            showToolbar={false}
          >
            <Theme1 />
            {/* <View1 /> */}
          </PDFViewer>
        </div>
        {/* <Avatar shape="square" icon={<UserOutlined />} />
          <Avatar shape="square" icon={<UserOutlined />} /> */}
      </div>
    </div>
  );
};

export default ContentListCv;
