import React, { useEffect } from 'react';
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'

import Box from '@mui/material/Box';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { AxiosResponse } from 'axios';
// import api
import postApi from 'api/postApi';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';

// @ts-ignore
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { Avatar, Badge, Button, Popover, Space } from 'antd';

// import redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
// import { RootState } from '../../../store/reducer';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import './style.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { getCookie } from 'cookies';
import themesApi from 'api/themesApi';
import { NewJobIcon } from '#components/Icons';
import apiVideoShort from 'api/apiVideoShort';

interface ItemTheme {
  id: number;
  title: string;
  image: string;
  number_of_posts: number;
}

export const videos = [
  {
    company: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/355/1703824996634-730e46f3-754e-4c5c-b38c-aa6b742f9670.png',
      name: 'CÔNG TY TNHH MỘT THÀNH VIÊN CHOPP',
      id: 71,
    },
    companyId: 71,
    createdAt: 1705040635000,
    id: 1,
    imageThumb:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/3bd3cbe209a5400796827a83b5b9f498_1704352142?x-expires=1705413600&x-signature=2ftIo5VzA6SZoXyCovmYmA1KnSQ%3D',
    post: {
      title: 'Nhân viên Giao Hàng',
      id: 146387,
    },
    linkTiktok: 'https://www.tiktok.com/@hijob.site/video/7320136226630061313',
    linkYoutube: 'https://www.youtube.com/shorts/3nJmowmWK0Q',
    postId: 146387,
    status: 1,
    updatedAt: 1705040933000,
    video: null,
  },
  {
    company: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/358/1704258155964-2c66afdc-5182-487a-940b-e85c2ca4305f.png',
      name: 'CÔNG TY TNHH GIÁO DỤC QUỐC TẾ TDP',
    },
    companyId: 71,
    createdAt: 1705040635000,
    id: 2,
    imageThumb:
      'https://p9-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/9fd4da6089e74aaf8f9532ddb59daea3_1704270307?x-expires=1705413600&x-signature=O61mKQbLlOcfNW9wRYKDZCfvqCY%3D',
    post: {
      title: 'CHUYÊN VIÊN TƯ VẤN GIÁO DỤC/ SENIOR EDUCATIONAL CONSULTANT',
    },
    postId: '146178',
    linkTiktok: 'https://www.tiktok.com/@hijob.site/video/7319785178602245377',
    linkYoutube: 'https://www.youtube.com/shorts/uzux2AKPm9E',
    status: 1,
    updatedAt: 1705040933000,
    video: null,
  },
  {
    companyId: 71,
    createdAt: 1705040635000,
    id: 3,
    postId: '146067',
    imageThumb:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/aeec2b79eec8496bbed6173ada323ffc_1704264855?x-expires=1705413600&x-signature=zEeiMmH9eFitw%2BTEMdRBQt45pyo%3D',
    company: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/356/1704179936945-aeae7cf1-4783-4bc4-8225-5662bd825f3c.png',
      name: 'MASS RECRUITMENT COMPANY LIMITED',
    },
    post: {
      title: 'NHÂN VIÊN VẬN HÀNH MÁY NHÀ MÁY KẸO PERFETTI',
    },
    linkTiktok: 'https://www.tiktok.com/@hijob.site/video/7319748486595906818',
    linkYoutube: 'https://www.youtube.com/shorts/FToPD0Fa3Z8',
    status: 1,
    updatedAt: 1705040933000,
    video: null,
  },
  {
    companyId: 71,
    createdAt: 1705040635000,
    id: 4,
    postId: '145981',
    imageThumb:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/e4a254ad7eec439b97adeb539c47007b_1704188373?x-expires=1705413600&x-signature=LxbmIRj47Z5pC5xLWHPnoR8i8AI%3D',
    company: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/355/1703824996634-730e46f3-754e-4c5c-b38c-aa6b742f9670.png',
      name: 'CÔNG TY TNHH MỘT THÀNH VIÊN CHOPP',
    },
    post: {
      title: 'Senior Backend Engineer',
    },
    linkTiktok: 'https://www.tiktok.com/@hijob.site/video/7319433282700037377',
    linkYoutube: null,
    status: 1,
    updatedAt: 1705040933000,
    video: null,
  },
  {
    companyId: 71,
    createdAt: 1705040635000,
    id: 5,
    postId: '144815',
    imageThumb:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/779cc00de0c94d93ba7786d48ebddcfe_1704264872?x-expires=1705413600&x-signature=rRblJsN4QelsNqJsaBFFLgj43BU%3D',
    company: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/331/1703169466081-1d6451c2-1ee9-4ed6-a855-b615d8219656.png',
      name: 'Hưng Thịnh',
    },
    post: {
      title: 'Việc làm Tết, việc làm parttime, fulltime tại Hồ Chí Minh',
    },
    linkTiktok: 'https://www.tiktok.com/@hijob.site/video/7319321556344114434',
    linkYoutube: null,
    status: 1,
    updatedAt: 1705040933000,
    video: null,
  },
  {
    companyId: 71,
    createdAt: 1705040635000,
    id: 6,
    postId: '144532',
    imageThumb:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/e789438c41ea4dd4919c55a08e0af9b1_1703743980?x-expires=1705413600&x-signature=2b5PmB%2BpzIY0X7QVFtQg7qADvZU%3D',
    company: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/352/1703661962777-b75da335-115e-4e66-8485-f7a1b22d9c1e.png',
      name: 'KHU VUI CHƠI TUYẾT SNOW TOWN SÀI GÒN',
    },
    post: {
      title: 'TUYỂN NHÂN VIÊN PARTTIME - THỜI VỤ TẾT',
    },
    linkTiktok: 'https://www.tiktok.com/@hijob.site/video/7317524575317806338',
    linkYoutube: 'https://www.youtube.com/shorts/IVxZXhWssXg',
    status: 1,
    updatedAt: 1705040933000,
    video: null,
  },
  {
    companyId: 71,
    createdAt: 1705040635000,
    id: 7,
    postId: '142273',
    imageThumb: 'https://i.ytimg.com/vi_webp/yr19OcyvSf0/oar2.webp',
    company: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/341/1703215468790-897f7d14-727c-4dc4-aaf8-b2b71274cfa5.png',
      name: 'Xu Shop',
    },
    post: {
      title: 'Trực quầy phụ bán đồ uống cho khách',
    },
    linkTiktok: 'https://www.tiktok.com/@hijob.site/video/7316389598089841922',
    linkYoutube: 'https://www.youtube.com/shorts/yr19OcyvSf0',
    status: 1,
    updatedAt: 1705040933000,
    video: null,
  },
];

const JobStory = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [value, setValue] = React.useState<Number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);
  const location = useLocation();
  const [listVideo, setListVideo] = React.useState<any>([]);
  const postNewestV3: any = useSelector((state: RootState) => {
    // console.log('state', state);
    return state.newWestReducerV3;
  });

  const getVideoShort = async () => {
    try {
      const result = await apiVideoShort.getVideoShortList(0, 10);

      if (result) {
        setListVideo([...result.data.data, ...videos]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoShort();
  }, []);

  console.log('list', listVideo);

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '16px',
      }}
      className="job-story-container"
    >
      <div className="job-story-title-wrapper">
        <div className="job-story-title">
          <NewJobIcon width={25} height={25} />
          <h2 className="title_home">
            {languageRedux === 1
              ? 'Video tuyển dụng'
              : languageRedux === 2
                ? 'Recruitment videos'
                : languageRedux === 3 && '채용 비디오'}
          </h2>
          {/* <Popover
            content={
              <p>
                {languageRedux === 1
                  ? 'Công ty muốn đăng ký video tuyển dụng? Quý khách vui lòng đăng ký thông tin công ty ở website và gửi yêu cầu qua địa chỉ Email CSKH: '
                  : languageRedux === 2
                    ? 'Does the company want to register a recruitment video? Please register company information on the website and send a request via Customer Service Email: '
                    : '회사에서 채용영상을 등록하고 싶으십니까? 웹사이트에 회사 정보를 등록하시고 다음 주소로 영상 요청을 보내주십시오. 고객관리 이메일: '}
                <span>
                  <Link
                    to="mailto:hijob.contact1@gmail.com"
                    style={{
                      color: '#0d99ff',
                      textDecoration: 'underline',
                    }}
                  >
                    hijob.contact1@gmail.com
                  </Link>
                </span>
                {', '}
                <span>+84 93 8901794</span>
              </p>
            }
            // title={
            //     languageRedux === 1 ?
            //         "Công ty muốn đăng ký video tuyển dụng? Quý khách vui lòng đăng ký thông tin công ty ở website và gửi yêu cầu qua địa chỉ: Email CSKH : hijob.contact1@gmail.com" :
            //         languageRedux === 2 ?
            //             "" :
            //             ""
            // }
            trigger="click"
          // open={true}
          //   onOpenChange={handleOpenChange}
          > */}
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              window.open(`/landing-video`);
            }}
          >
            {languageRedux === 1
              ? 'Bắt đầu ngay'
              : languageRedux === 2
                ? 'Start now'
                : languageRedux === 3 && '바로시작'}
          </Button>
          {/* </Popover> */}
        </div>
      </div>
      <Swiper
        navigation={true}
        spaceBetween={24}
        slidesPerView="auto"
        modules={[Mousewheel, Navigation, Pagination]}
        className="job-story-swiper"
      >
        {listVideo &&
          listVideo?.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                onClick={() => {
                  window.open(`post-detail?post-id=${item?.postId}`);
                }}
              >
                <div className="job-story-slide-item">
                  <img
                    src={item?.imageThumb}
                    alt={
                      languageRedux === 1
                        ? 'Hình ảnh bị lỗi'
                        : languageRedux === 2
                          ? 'Image is corrupted'
                          : '이미지가 손상되었습니다'
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '10px',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="job-story-info">
                    {/* <Badge dot status="success" offset={[-5, 33]}> */}
                    <Avatar src={item?.company?.logo} size="large" />
                    {/* </Badge> */}
                    <Space size={3} direction={'vertical'}>
                      <h5>{item?.post?.title}</h5>
                      <h6>{item?.company?.name}</h6>
                    </Space>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Box>
  );
};

export default JobStory;
