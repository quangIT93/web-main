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

import { spacing } from '../Styles';

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import api
import jsPDF from 'jspdf';

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
import ItemCV from '../ItemCV';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';

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

  const handleDownload = () => {
    // Tạo đối tượng jsPDF với kích thước A4
    const doc = new jsPDF({
      orientation: 'portrait', // hoặc 'landscape' nếu muốn dọc ngang
      unit: 'mm',
      format: 'a4',
    });

    // Tạo đường kẻ chia layout ngang
    for (let i = 0; i < 100; i += 10) {
      doc.setLineWidth(0.1);
      doc.line(10, 90 - i, 200, 90 - i); // Thay đổi giá trị y để điều chỉnh đường chia layout
    }

    // Thêm nội dung vào tệp PDF
    doc.setFontSize(12); // Đặt kích thước font là 12

    doc.text(`Name: ${name}`, 60, 20);
    doc.setFontSize(20); // Đặt kích thước font là 12

    // Văn bản Email
    doc.setTextColor(0, 0, 255); // Màu xanh dương
    doc.text(`Email: ${email}`, 60, 30);

    // Văn bản Experience
    doc.setTextColor(0); // Màu đen (RGB: 0, 0, 0)
    doc.setFontSize(10); // Đặt kích thước font là 10
    doc.text(`Experience: ${experience}`, 10, 60);

    // Văn bản Education
    doc.setTextColor(255, 0, 0); // Màu đỏ
    doc.setFontSize(14); // Đặt kích thước font là 14
    doc.text(`Education: ${education}`, 10, 80);

    // Tạo phần vùng cho CV
    doc.setDrawColor(0); // Màu đường viền là đen
    doc.setLineWidth(0.5); // Độ rộng của đường viền
    doc.rect(10, 10, 190, 100, 'S'); // Vẽ một hình chữ nhật

    // Tải xuống tệp PDF
    doc.save('my_cv.pdf');
    // Tải xuống tệp PDF
    doc.save('my_cv.pdf');
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
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
          {/* <PDFViewer width="100%" height={600}> */}
          <Document
            title={`${name} Resume`}
            author={name}
            style={{
              width: 'auto',
              height: 'auto',
            }}
          >
            <Page size="A4">
              <View style={styles.page}>
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    {/* Phần trái của header */}
                    <Text>Tên</Text>
                    <Text>Nghề nghiệp</Text>
                  </View>
                  <View style={styles.headerRight}>
                    {/* Phần phải của header */}
                    <Image
                      src="./path/to/hinh.jpg"
                      style={styles.headerImage}
                    />
                  </View>
                </View>
                <View style={styles.content}>
                  <View style={styles.contentLeft}>
                    {/* Phần trái của content */}
                    <View style={styles.section}>
                      <Text>Profile</Text>
                    </View>
                    <View style={styles.section}>
                      <Text>Thông tin liên hệ</Text>
                    </View>
                  </View>
                  <View style={styles.contentRight}>
                    {/* Phần phải của content */}
                    <View style={styles.section}>
                      <Text>Thông tin chi tiết</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
          {/* </PDFViewer> */}
        </div>
        {/* <Avatar shape="square" icon={<UserOutlined />} />
          <Avatar shape="square" icon={<UserOutlined />} /> */}
      </div>
    </div>
  );
};

export default ContentListCv;
