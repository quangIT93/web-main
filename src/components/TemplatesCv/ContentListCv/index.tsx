import React from 'react';

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
          <div id="pdf-container">
            {/* <h2>CV Preview</h2> */}
            {/* {imageURL && <img src={imageURL} alt="Profile" width="50" height="50" />} */}
            <div className="header-cv">
              <div className="header-cv_left">
                <h2>Tên ứng viên</h2>
                <p>Ngành nghề</p>
              </div>
              <div className="header-cv_right">
                <img src="./images/project-manager.png" alt="" />
              </div>
            </div>
            <div className="content-cv">
              <div className="content-cv_left">
                <div className="itemCV">
                  <div className="wrap-titleCv">
                    <h3>PROFILE</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Natus voluptatibus ex libero sit voluptatum consequatur sed
                    ullam mollitia minima vel obcaecati dicta quae, asperiores
                    laborum blanditiis illo quasi rem eligendi.
                  </p>
                </div>
                <div className="itemCV">
                  <div className="wrap-titleCv">
                    <h3>PROFILE</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Natus voluptatibus ex libero sit voluptatum consequatur sed
                    ullam mollitia minima vel obcaecati dicta quae, asperiores
                    laborum blanditiis illo quasi rem eligendi.
                  </p>
                </div>
                <div className="itemCV">
                  <div className="wrap-titleCv">
                    <h3>PROFILE</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Natus voluptatibus ex libero sit voluptatum consequatur sed
                    ullam mollitia minima vel obcaecati dicta quae, asperiores
                    laborum blanditiis illo quasi rem eligendi.
                  </p>
                </div>
              </div>

              <div className="content-cv_right">
                <div className="wrap-titleCv">
                  <h3>PROFILE</h3>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  voluptatibus ex libero sit voluptatum consequatur sed ullam
                  mollitia minima vel obcaecati dicta quae, asperiores laborum
                  blanditiis illo quasi rem eligendi.
                </p>
              </div>
            </div>
            {/* {/* <p>Name: {name}</p> */}
          </div>
        </div>
        {/* <Avatar shape="square" icon={<UserOutlined />} />
          <Avatar shape="square" icon={<UserOutlined />} /> */}
      </div>
    </div>
  );
};

export default ContentListCv;
