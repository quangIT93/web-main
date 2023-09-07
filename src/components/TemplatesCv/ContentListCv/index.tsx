import React from 'react';

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import api
import categoriesApi from 'api/categoriesApi';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ResumeIcon } from '#components/Icons';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
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
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
  const language = useSelector((state: RootState) => state.dataLanguage.languages)
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [cvId, setCvId] = React.useState<any>(1);
  const getDataParentCategory = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories(
        languageRedux === 1 ? 'vi' : 'en'
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

  const handleChangeCategory = async () => { };

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
                  languageRedux === 1 ?
                    "Chọn mẫu CV" :
                    "Choose resume template"
                }
                size="small"
              // error={!selectedProvince}
              />
            )}
          />
        </Box>

        <div className="list-template">
          {
            Array.from(new Array(10).keys()).map((item) => (
              <div className="template-item" key={item}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </div>
            ))
          }
        </div>
        <Swiper
          navigation={true}
          slidesPerView="auto"
          spaceBetween={17}
          modules={[Mousewheel, Navigation, Pagination]}
          className="list-template-swiper"
        >
          {
            Array.from(new Array(10).keys()).map((item: any, index: number) => {
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
            })
          }
        </Swiper>
      </div>
      <div className="contentCV-line"></div>
      <div className="contentCV-bottom-right">
        <div className="contentCv-bottom-right_title">
          <div className="title_left">
            <ResumeIcon />
            <h3>
              {
                languageRedux === 1 ?
                  `Hồ sơ số ${cvId}` :
                  `Resume No.${cvId}`
              }
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
          <Avatar shape="square" icon={<UserOutlined />} />
          <Avatar shape="square" icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  );
};

export default ContentListCv;
