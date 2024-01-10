import React from 'react';
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

interface ItemTheme {
  id: number;
  title: string;
  image: string;
  number_of_posts: number;
}

export const videos = [
  {
    id: '146387',
    image:
      'https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/3bd3cbe209a5400796827a83b5b9f498_1704352142~tplv-photomode-zoomcover:480:480.avif?x-expires=1705057200&x-signature=DupjCVjFCgxLbNVM6AcFghCKGFc%3D',
    companyResourceData: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/355/1703824996634-730e46f3-754e-4c5c-b38c-aa6b742f9670.png',
    },
    title: 'Nhân viên Giao Hàng',
    companyName: 'CÔNG TY TNHH MỘT THÀNH VIÊN CHOPP',
    link: {
      youtube: 'https://www.youtube.com/shorts/3nJmowmWK0Q',
      tiktok: 'https://www.tiktok.com/@hijob.site/video/7320136226630061313',
    },
  },
  {
    id: '146178',
    image:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/9fd4da6089e74aaf8f9532ddb59daea3_1704270307?x-expires=1705057200&x-signature=7sCFiyKFM6OEEMjgLKY07gK2Nus%3D',
    companyResourceData: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/358/1704258155964-2c66afdc-5182-487a-940b-e85c2ca4305f.png',
    },
    title: 'CHUYÊN VIÊN TƯ VẤN GIÁO DỤC/ SENIOR EDUCATIONAL CONSULTANT',
    companyName: 'CÔNG TY TNHH GIÁO DỤC QUỐC TẾ TDP',
    link: {
      youtube: 'https://www.youtube.com/shorts/uzux2AKPm9E',
      tiktok: 'https://www.tiktok.com/@hijob.site/video/7319785178602245377',
    },
  },
  {
    id: '146067',
    image:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/aeec2b79eec8496bbed6173ada323ffc_1704264855?x-expires=1705057200&x-signature=RCztWQX%2B%2F8iHH3QmiaDdDfvaMAI%3D',
    companyResourceData: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/356/1704179936945-aeae7cf1-4783-4bc4-8225-5662bd825f3c.png',
    },
    title: 'NHÂN VIÊN VẬN HÀNH MÁY NHÀ MÁY KẸO PERFETTI',
    companyName: 'MASS RECRUITMENT COMPANY LIMITED',
    link: {
      youtube: 'https://www.youtube.com/shorts/FToPD0Fa3Z8',
      tiktok: 'https://www.tiktok.com/@hijob.site/video/7319748486595906818',
    },
  },
  {
    id: '145981',
    image:
      'https://p9-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/e4a254ad7eec439b97adeb539c47007b_1704188373?x-expires=1705057200&x-signature=iJAMy1AsfwmzF6ADQn7CBCjGtNs%3D',
    companyResourceData: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/355/1703824996634-730e46f3-754e-4c5c-b38c-aa6b742f9670.png',
    },
    title: 'Senior Backend Engineer',
    companyName: 'CÔNG TY TNHH MỘT THÀNH VIÊN CHOPP',
    link: {
      youtube: null,
      tiktok: 'https://www.tiktok.com/@hijob.site/video/7319433282700037377',
    },
  },
  {
    id: '144815',
    image:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/779cc00de0c94d93ba7786d48ebddcfe_1704264872?x-expires=1705057200&x-signature=qKZSTZrw7i5ouiiqLJIOIAXTRg8%3D',
    companyResourceData: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/331/1703169466081-1d6451c2-1ee9-4ed6-a855-b615d8219656.png',
    },
    title: 'Việc làm Tết, việc làm parttime, fulltime tại Hồ Chí Minh',
    companyName: 'Hưng Thịnh',
    link: {
      youtube: null,
      tiktok: 'https://www.tiktok.com/@hijob.site/video/7319321556344114434',
    },
  },
  {
    id: '144532',
    image:
      'https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/e789438c41ea4dd4919c55a08e0af9b1_1703743980?x-expires=1705057200&x-signature=9S5eoZiIGtZ%2FEgq71egAyw%2F%2BDV8%3D',
    companyResourceData: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/352/1703661962777-b75da335-115e-4e66-8485-f7a1b22d9c1e.png',
    },
    title: 'TUYỂN NHÂN VIÊN PARTTIME - THỜI VỤ TẾT',
    companyName: 'KHU VUI CHƠI TUYẾT SNOW TOWN SÀI GÒN',
    link: {
      youtube: 'https://www.youtube.com/shorts/IVxZXhWssXg',
      tiktok: 'https://www.tiktok.com/@hijob.site/video/7317524575317806338',
    },
  },
  {
    id: '142273',
    image: 'https://i.ytimg.com/vi_webp/yr19OcyvSf0/oar2.webp',
    companyResourceData: {
      logo: 'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/companies-logo/341/1703215468790-897f7d14-727c-4dc4-aaf8-b2b71274cfa5.png',
    },
    title: 'Trực quầy phụ bán đồ uống cho khách',
    companyName: 'Xu Shop',
    link: {
      youtube: 'https://www.youtube.com/shorts/yr19OcyvSf0',
      tiktok: 'https://www.tiktok.com/@hijob.site/video/7316389598089841922',
    },
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
  const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null);
  const postNewestV3: any = useSelector((state: RootState) => {
    // console.log('state', state);
    return state.newWestReducerV3;
  });

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
          <Popover
            content={
              <p>
                {languageRedux === 1
                  ? 'Công ty muốn đăng ký video tuyển dụng? Quý khách vui lòng đăng ký thông tin công ty ở website và gửi yêu cầu qua địa chỉ Email CSKH: '
                  : languageRedux === 2
                  ? 'Does the company want to register a recruitment video? Please register company information on the website and send a request via Customer Service Email: '
                  : '회사에서 채용영상을 등록하고 싶으십니까? 웹사이트에 회사 정보를 등록하시고 다음 주소로 영상 요청을 보내주십시오. 고객관리 이메일: '}
                <span>
                  <Link
                    to="mailto:contact.hijob@gmail.com"
                    style={{
                      color: '#0d99ff',
                      textDecoration: 'underline',
                    }}
                  >
                    contact.hijob@gmail.com
                  </Link>
                </span>
                {', '}
                <span>+84 93 8901794</span>
              </p>
            }
            // title={
            //     languageRedux === 1 ?
            //         "Công ty muốn đăng ký video tuyển dụng? Quý khách vui lòng đăng ký thông tin công ty ở website và gửi yêu cầu qua địa chỉ: Email CSKH : contact.hijob@gmail.com" :
            //         languageRedux === 2 ?
            //             "" :
            //             ""
            // }
            trigger="click"
            // open={true}
            //   onOpenChange={handleOpenChange}
          >
            <Button type="primary" shape="round">
              {languageRedux === 1
                ? 'Đăng ký'
                : languageRedux === 2
                ? 'Register'
                : languageRedux === 3 && '등록하세요'}
            </Button>
          </Popover>
        </div>
      </div>
      <Swiper
        navigation={true}
        spaceBetween={24}
        slidesPerView="auto"
        modules={[Mousewheel, Navigation, Pagination]}
        className="job-story-swiper"
      >
        {videos &&
          videos?.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                onClick={() => {
                  window.open(`post-detail?post-id=${item?.id}`);
                }}
              >
                <div className="job-story-slide-item">
                  <img
                    src={item?.image}
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
                    <Avatar
                      src={item?.companyResourceData?.logo}
                      size="large"
                    />
                    {/* </Badge> */}
                    <Space size={3} direction={'vertical'}>
                      <h5>{item.title}</h5>
                      <h6>{item.companyName}</h6>
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
