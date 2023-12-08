import React, { memo, useEffect, useState } from 'react';

import categoriesApi from 'api/categoriesApi';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Avatar, Spin } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
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

import { usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import apiCv from 'api/apiCv';

import templatesCv from '../CvTemplate/ListTheme';
import { template } from '@babel/core';
import profileApi from 'api/profileApi';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
// AnotherFile.js
import { listTemplate } from './dataListTemplate';
// const sharp = require('sharp');
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/legacy/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface IContentListCv {
  colorCV: any;
  fontSizeCV: any;
}

const ContentListCv: React.FC<IContentListCv> = (props) => {
  const { colorCV, fontSizeCV } = props;

  const profileMoreV3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [valueNameCv, setValueNameCv] = React.useState<any>(
    `Resume ${Number(localStorage.getItem('cv-id')) || 1}`,
  );
  const [cvId, setCvId] = React.useState<any>(1);

  const [getThemeCv, setGetThemeCv] = React.useState<any>([]);

  const TemplateId = Number(localStorage.getItem('cv-id')) || 1;
  const dispatch = useDispatch();
  useEffect(() => {
    setValueNameCv(
      `${profileV3.name} - Resume ${
        Number(localStorage.getItem('cv-id')) || 1
      }`,
    );
  }, [profileV3]);

  const getProfileComanyV3 = async () => {
    try {
      const result = await profileApi.getProfileInformationMoreV3(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        dispatch(setProfileMeInformationMoreV3(result));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    getProfileComanyV3();
  }, []);

  // const templatesCv = [
  //   {
  //     id: 1,
  //     component: (
  //       <CvTemplate1 color={colorCV} fontSize={fontSizeCV} profile={profile} />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     component: (
  //       <CvTemplate3 color={colorCV} fontSize={fontSizeCV} profile={profile} />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     component: (
  //       <CvTemplate4 color={colorCV} fontSize={fontSizeCV} profile={profile} />
  //     ),
  //   },
  //   {
  //     id: 4,
  //     component: (
  //       <CvTemplate2 color={colorCV} fontSize={fontSizeCV} profile={profile} />
  //     ),
  //   },
  // ];

  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  useEffect(() => {
    const selectedTemplate = templatesCv.find(
      (template) => template.id === TemplateId,
    );
    if (selectedTemplate) {
      if (profileV3.avatarPath) {
        const CvComponent = selectedTemplate.component; // Lấy component của mẫu CV

        // Tạo một biến để lưu trữ mẫu CV được chọn
        setSelectedDocument(
          <CvComponent
            color={colorCV}
            fontSize={fontSizeCV}
            profile={profileV3}
            profileMore={profileMoreV3}
          />,
        );
      } else {
        const CvComponent = selectedTemplate.component; // Lấy component của mẫu CV

        // Tạo một biến để lưu trữ mẫu CV được chọn
        setSelectedDocument(
          <CvComponent
            color={colorCV}
            fontSize={fontSizeCV}
            profileMore={profileMoreV3}
            profile={profileV3}
          />,
        );
      }
    }
  }, [TemplateId, colorCV, fontSizeCV, profileV3, profileMoreV3]);

  const [instance, updateInstance] = usePDF({
    document: selectedDocument, // Truyền mẫu CV được chọn vào document
  });

  useEffect(() => {
    updateInstance(selectedDocument);
  }, [selectedDocument]);
  // Tìm mẫu CV với ID tương ứng trong danh sách templatesCv

  // const [instance, updateInstance] = usePDF({ document: <></> });

  // const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [numPages, setNumPages] = React.useState<number>();
  const [selectedThemeId, setSelectedThemeId] = React.useState<number>(1);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const getDataParentCategory = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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

  // React.useEffect(() => {
  //   if (templatesCv.length > 0) {
  //     updateInstance(
  //       // TemplateId === 0 ?
  //       // <CvTemplate1 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
  //       // TemplateId === 1 ?
  //       //   <CvTemplate2 color={colorCV} fontSize={fontSizeCV} profile={profile} /> :
  //       //   <CvTemplate3 color={colorCV} fontSize={fontSizeCV} profile={profile} />
  //       templatesCv.filter((item: any) => {
  //         return item.id === TemplateId;
  //       })[0].component,
  //     );
  //   }
  // }, [colorCV, TemplateId, profile]);

  React.useEffect(() => {
    getDataParentCategory();
    // getTheme();
    const cv_id =
      Number(localStorage.getItem('cv-id')) === 0
        ? 1
        : localStorage.getItem('cv-id');

    //convert string to number
    cv_id && setCvId(+cv_id);
  }, [languageRedux]);

  React.useEffect(() => {
    if (!valueNameCv) {
      // setValueNameCv(localStorage.getItem('nameCv'));
      listTemplate.map((value: any) => {
        if (Number(localStorage.getItem('cv-id')) === value.id) {
          setValueNameCv(`${profileV3.name} - ${value.name}`);
        }
      });
    }
  }, [listTemplate]);

  const handleChangeCategory = async () => {};

  const handleSelectTemplate = (id: any, name: string) => {
    setSelectedThemeId(id);
    setValueNameCv(`${profileV3.name} - ${name}`);
    localStorage.setItem('cv-id', id);
    localStorage.setItem('nameCv', `${profileV3.name} - ${name}`);
  };

  // const getTheme = async () => {
  //   try {
  //     const result = await apiCv.getThemeCv();
  //     if (result) {
  //       setGetThemeCv(result.data);
  //     }
  //   } catch (error) {}
  // };

  // console.log('aaa');
  // const element = document.querySelector('.scalable-element') as any;
  // const currentWidth = element?.offsetWidth; // Lấy chiều rộng hiện tại

  // useEffect(() => {
  //   const targetWidth = 200; // Chiều rộng mục tiêu (thay đổi theo nhu cầu)

  //   const scale = targetWidth / currentWidth; // Tính tỷ lệ (scale)

  //   element.style.transform = `scale(${scale})`; // Áp dụng tỷ lệ (scale) cho phần tử
  // }, [currentWidth]);

  window.onload = function () {
    const elements = document.querySelectorAll('.page-break');

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      if (rect.height > 297) {
        // Kiểm tra kích thước A4
        element.classList.add('page-break');
      }
    });
  };

  return (
    <div className="contentCV-bottom">
      <div className="contentCV-bottom-left">
        {/* <Box sx={styleChildBox}>
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
        </Box> */}

        <div className="list-template-title">
          <h3>
            {languageRedux === 1
              ? 'Chọn mẫu CV'
              : languageRedux === 2
              ? 'Choose CV template'
              : '이력서 템플릿을 선택하세요'}
          </h3>
        </div>
        <div className="list-template">
          {listTemplate.map((item: any, index: any) => (
            <div
              className={
                item?.id ===
                (Number(localStorage.getItem('cv-id'))
                  ? Number(localStorage.getItem('cv-id'))
                  : 1)
                  ? 'template-item active'
                  : 'template-item'
              }
              key={index}
              onClick={() => {
                // localStorage.setItem('nameCv', item?.name);
                setValueNameCv(`${profileV3.name} - ${item?.name}`);
                handleSelectTemplate(item?.id, item?.name);
              }}
            >
              <Avatar
                shape="square"
                icon={<UserOutlined />}
                src={item?.image}
              />
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
          {listTemplate.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                onClick={(event) => {
                  // handleClickItem();
                }}
              >
                <div
                  className={
                    item?.id === selectedThemeId
                      ? 'slide-item active'
                      : 'slide-item'
                  }
                  key={item}
                  onClick={() => {
                    // localStorage.setItem('nameCv', item?.name);
                    handleSelectTemplate(item?.id, item?.name);
                  }}
                >
                  <Avatar
                    shape="square"
                    icon={<UserOutlined />}
                    src={item?.image}
                  />
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
              {/* {languageRedux === 1
                ? `Hồ sơ số ${selectedThemeId}`
                : `Resume ${selectedThemeId}`} */}

              {/* {getThemeCv.map((item: any) => {
                if (item.id === selectedThemeId) {
                  return <h3>{item.name}</h3>;
                } else {
                  return '';
                }
              })} */}
            </h3>
            <div className="title_left-nameCv">
              <input
                type="text"
                name=""
                id=""
                value={valueNameCv}
                onChange={(e: any) => {
                  setValueNameCv(e.target.value);
                  localStorage.setItem('nameCv', e.target.value);
                }}
              />
              {/* <div className="nameCvIcon" onClick={handleChangeNameCv}> */}
              {/* <PencilIcon width={15} height={15} /> */}
              {/* Save
              </div> */}
            </div>
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
              {languageRedux === 1
                ? 'Xem tất cả'
                : languageRedux === 2
                ? 'View all'
                : languageRedux === 3 && '모두보기'}
            </p>
          </div>
        </div>
        <div
          className="contentCv-bottom-right_cv"
          id="page"
          // dangerouslySetInnerHTML={{ __html: htmlCv }}
        >
          <>
            {/* <PreviewTheme1 /> */}

            {profileV3.length !== 0 ? (
              <Document
                loading={<Spin indicator={antIcon} />}
                noData={<Spin indicator={antIcon} />}
                file={
                  profileV3.length !== 0 && profileMoreV3.length !== 0
                    ? instance.url
                    : null
                }
                onLoadSuccess={onDocumentLoadSuccess}
                // onLoadError={(error) =>
                //   console.error('Error loading document:', error)
                // }
                className="page-cv-wrapper"
              >
                {Array.apply(null, Array(numPages))
                  .map((x, i) => i + 1)
                  .map((page) => (
                    <Page
                      className="page-cv"
                      loading={
                        page === 1 ? (
                          <Spin indicator={antIcon} />
                        ) : (
                          <Spin indicator={antIcon} />
                        )
                      }
                      noData={
                        page === 1 ? (
                          <Spin indicator={antIcon} />
                        ) : (
                          <Spin indicator={antIcon} />
                        )
                      }
                      pageNumber={page}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  ))}
              </Document>
            ) : (
              <></>
            )}
          </>
        </div>
        {/* <Avatar shape="square" icon={<UserOutlined />} />
          <Avatar shape="square" icon={<UserOutlined />} /> */}
      </div>
    </div>
  );
};

export default memo(ContentListCv);
