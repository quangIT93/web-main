import React, { useEffect } from 'react';
// @ts-ignore
import copy from 'clipboard-copy';
import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
import NavBar from '../../components/Navbar/index';
import { AxiosResponse } from 'axios';
import Footer from '../../components/Footer/Footer';
// @ts-ignore
import { Link, useSearchParams } from 'react-router-dom';

// import api
import postApi from '../../api/postApi';
import bookMarkApi from 'api/bookMarkApi';
// import redux
// import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
import {
  setAlertCancleSave,
  setAlertSave,
  setShowCopy,
} from 'store/reducer/alertReducer';
import { useDispatch, useSelector } from 'react-redux';
// import locationApi from '../../api/locationApi'
import appplicationApi from 'api/appplication';
import ItemSuggest from './components/ItemSuggest';
import ShowCancleSave from '#components/ShowCancleSave';
import ShowNotificativeSave from '#components/ShowNotificativeSave';
// @ts-ignore
import { Button, notification } from 'antd';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Mousewheel, Navigation, Pagination, Thumbs } from 'swiper';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MessageOutlined } from '@ant-design/icons';
//@ts-ignore
// import { CopyToClipboard } from 'react-copy-to-clipboard';
//@ts-ignore
// import { StatePropsCloseSlider } from 'pages/Home'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../../store/index'
import { RootState } from '../../store/reducer';

// import firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import ModalLogin from '../../components/Home/ModalLogin';

import { FormOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { SaveIconOutline, SaveIconFill, ShareIcon } from '#components/Icons';
import { PostNewest } from '#components/Home/NewJobs';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Avatar } from 'antd';
import languageApi from 'api/languageApi';
import IconButton from '@mui/material/IconButton';
import { CloseIcon } from '#components/Icons';
// import icon
import {
  MailIcon,
  FacebookIcon,
  CopyIcon,
  // MessagerIcon,
  CompanyNameDetailPostIcon,
  AddressDetailPostIcon,
  ClockDetailPostIcon,
  BackIcon,
  TaxCodeDetailPostIcon,
  LocationDetailPostIcon,
  MailDetailPostIcon,
  PhoneDetailPostIcon,
  WebDetailPostIcon,
  JobTypePostIcon,
  ClockPostIcon,
  CalendarPostIcon,
  MonitorPostIcon,
  DollarPostIcon,
  WorkPostIcon,
  BoardiIntroCompanyPostIcon,
} from '#components/Icons';

import './style.scss';
import ShowCopy from '#components/ShowCopy';

//@ts-ignore
import AnotherPost from './components/AnotherPost';
// import { height, width } from '@mui/system';
import { postDetail } from 'validations/lang/vi/postDetail';
import { postDetailEn } from 'validations/lang/en/postDetail';

import RollTop from '#components/RollTop';
import { setCookie } from 'cookies';
import CategoryDropdown from '#components/CategoryDropdown';
// import { Language } from '#components/Navbar/Css';

// const itemsShare = [
//   {
//     nameShare: 'Sao chép liên kết',
//     icon: <CopyIcon />,
//     source: '',
//   },
//   {
//     nameShare: 'Mail',
//     icon: <MailIcon />,
//     source: '',
//   },
//   {
//     nameShare: 'Facebook',
//     icon: <FacebookIcon />,
//     source: '',
//   },
//   // {
//   //   nameShare: 'Messenger',
//   //   icon: <MessagerIcon />,
//   //   source: '',
//   // },
//   // {
//   //   nameShare: 'Zalo',
//   //   icon: <ZaloIcon />,
//   //   source: '',
//   // },
// ];
// interface ItemCategories {
//   child_category_id?: Number;
//   parent_category?: string;
//   child_category?: string;
//   parent_category_id: Number;
// }
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};
// state props
// interface PostNewest {
//   id?: Number;
//   status?: Number;
//   account_id?: string;
//   title?: string;
//   company_name?: string;
//   is_date_period?: number;
//   start_date?: number;
//   end_date?: number;
//   start_time?: number;
//   image?: string;
// }
const ACCESS_TOKEN = localStorage.getItem('accessToken');

// page view details post
const Detail = () => {
  // const { Search } = Input
  // test redux
  // const userProfile = useSelector((state: RootState) => state.profileUser);
  const userProfile = useSelector((state: RootState) => state.profile.profile);
  // const dispatch = useDispatch()
  // const { setPostByTheme, setProvince } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // )
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const componentRef = React.useRef<HTMLDivElement>(null);
  const componentRefJob = React.useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [title, setTitle] = React.useState('');
  // const [tabValue, setTabValue] = React.useState('1');

  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  // const [width, setWidth] = React.useState<Number>(1050);
  const [post, setPost] = React.useState<AxiosResponse | null>(null);
  const [postPrev, setPostPrev] = React.useState<AxiosResponse | null>(null);
  const [postNext, setPostNext] = React.useState<AxiosResponse | null>(null);
  const [postNewest, setPostNewest] = React.useState<AxiosResponse | null>(
    null,
  );
  const [automatic, setAutomatic] = React.useState<Boolean>(false);
  // const [language, setLanguage] = React.useState<any>();
  const [textButton, setTextButton] = React.useState<string>(
    language?.post_detail_page?.apply,
  );
  const [key, setKeyTab] = React.useState<string>('1');
  const [backgroundButton, setBackgroundButton] =
    React.useState<string>('#0D99FF');
  const [checkPostUser, setCheckPostUser] = React.useState<Boolean>(false);
  const [checkApply, setCheckApply] = React.useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [bookmarked, setBookmarked] = React.useState(false);
  const [openModalShare, setOpenModalShare] = React.useState(false);
  const [openModalApply, setOpenModalApply] = React.useState(false);
  const [isApplied, setIsApplied] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? 'vi' : 'en',
  //     );
  //     if (result) {
  //       setLanguage(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);
  const itemsShare = [
    {
      nameShare: language?.post_detail_page?.copy_link,
      icon: <CopyIcon />,
      source: '',
    },
    {
      nameShare: 'Mail',
      icon: <MailIcon />,
      source: '',
    },
    {
      nameShare: 'Facebook',
      icon: <FacebookIcon />,
      source: '',
    },
    // {
    //   nameShare: 'Messenger',
    //   icon: <MessagerIcon />,
    //   source: '',
    // },
    // {
    //   nameShare: 'Zalo',
    //   icon: <ZaloIcon />,
    //   source: '',
    // },
  ];

  const POST_ID = Number(searchParams.get('post-id'));
  // const openNotification = () => {
  //   api.info({
  //     message: (
  //       <>
  //         Ứng tuyển công việc thành công <br /> Bạn muốn chia sẻ công việc ?
  //       </>
  //     ),
  //     description: (
  //       <Input
  //         addonBefore="Link"
  //         addonAfter={
  //           <CopyToClipboard text={window.location.href}>
  //             <Tooltip
  //               trigger="click"
  //               placement="topRight"
  //               title={'Đã copy link '}
  //               arrow={true}
  //             >
  //               <div style={{ cursor: 'pointer' }}>Copy</div>
  //             </Tooltip>
  //           </CopyToClipboard>
  //         }
  //         defaultValue={window.location.href}
  //       />
  //     ),
  //     placement: 'topRight',
  //     icon: <CheckCircleFilled style={{ color: 'green' }} />,
  //   });
  // };

  // message if user login yet
  // const CheckWasLogin = () => {
  //   api.info({
  //     message: `Không thể thực hiện thao tác`,
  //     description: 'Vui lòng đăng nhập để thực hiện thao tác',
  //     placement: 'top',
  //     icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
  //   });
  // };

  const getDataCompany = () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    getDataCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  console.log('backgroundButton', backgroundButton);

  // get post by id-post
  const getPostById = async () => {
    try {
      // setIsLoading(true);
      const accountId = localStorage.getItem('accountId');
      // const result = await postApi.getById(POST_ID);
      const result = await postApi.getPostV3(
        POST_ID,
        languageRedux === 1 ? 'vi' : 'en',
      );
      // console.log('result', result2);
      if (result) {
        // const list = result?.data.categories.map((category: any) =>
        //   Number(category.child_category_id)
        // )
        // console.log('postId', result.data);
        // check  application status
        // setIsLoading(false);
        document.title = result.data.title;
        logEvent(analytics, 'screen_view' as string, {
          // screen_name: screenName as string,
          page_title: '/web_post_detail' as string,
        });

        if (result.data.accountId === accountId) {
          setTextButton(
            languageRedux === 1
              ? 'Chỉnh sửa bài tuyển dụng'
              : 'Edit job posting',
          );
          setBackgroundButton('gray');
          setCheckPostUser(true);
        } else if (result.data.status === 3) {
          setBackgroundButton('gray');
          setTextButton(languageRedux === 1 ? 'Bài đăng đã đóng' : 'Closed');
          // setBackgroundButton('#0D99FF');
          result.data.applied = true;
        } else if (result.data.applied) {
          setBackgroundButton('gray');
          setTextButton(languageRedux === 1 ? 'Đã ứng tuyển' : 'Applied');
        } else {
          setTextButton(languageRedux === 1 ? 'Ứng tuyển ngay' : 'Apply');
          setBackgroundButton('#0D99FF');
          // setCheckPostUser(true);
        }
        // else if (result.data.application_status === 2) {
        //   setTextButton('Hồ sơ được phê duyệt');
        //   setBackgroundButton('#0D99FF');
        // } else if (result.data.application_status === 3) {
        //   setTextButton('Hồ sơ bị từ chối');
        //   setBackgroundButton('#BD3131');
        // } else if (result.data.application_status === 4) {
        //   setTextButton('Hồ sơ được chấp nhận');
        //   setBackgroundButton('#5CB265');
        // }
        setPost(result);
        setCheckApply(result.data.applied);
        if (result.data.bookmarked) {
          setBookmarked(true);
        } else {
          setBookmarked(false);
        }
        // get post related by id post
        const postNewest = await postApi.getPostRelated(
          POST_ID,
          languageRedux === 1 ? 'vi' : 'en',
        );
        //setPost related
        setPostNewest(postNewest);
      }
    } catch (error) {
      console.error(error);
      window.open('/', '_parent');
    }
  };

  const getAnotherPost = async (postID: number, position: number) => {
    try {
      // setIsLoading(true);
      const result = await postApi.getById(
        postID,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        // setIsLoading(false);
        position === 0 ? setPostPrev(result.data) : setPostNext(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPost = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams({
      'post-id': `${POST_ID - 1}`,
    });
  };

  const handleNextPost = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams({
      'post-id': `${POST_ID + 1}`,
    });
  };

  React.useEffect(() => {
    getPostById();
    //get post prev
    getAnotherPost(POST_ID - 1, 0);
    //get post next
    getAnotherPost(POST_ID + 1, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarked, POST_ID, languageRedux, language]);

  // set size for Breadcrumb
  // React.useEffect(() => {
  //   function handleWindowResize() {
  //     const w =
  //       Number(componentRef?.current?.offsetWidth) +
  //       Number(componentRefJob?.current?.offsetWidth);
  //     setWidth(w);
  //   }
  //   window.addEventListener('resize', handleWindowResize);
  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, []);

  // console.log(post?.data);

  // handle click button
  const onclick = async () => {
    try {
      if (!ACCESS_TOKEN) {
        setOpenModalLogin(true);
        // CheckWasLogin();
        return;
      }
      // console.log('applied', post?.data.applied);
      // console.log(
      //   'post?.data?.companyResourceData?.name',
      //   post?.data?.companyResourceData?.name,
      // );

      // Applied and Hijob
      if (
        // (post?.data.application_status === 1 && isHiJob) ||
        // (post?.data.applied &&
        // post?.data?.companyResourceData?.name === 'HIJOB') ||
        (post?.data?.applied &&
          post?.data?.companyResourceData?.name === 'HIJOB') ||
        (checkApply && post?.data?.companyResourceData?.name === 'HIJOB')
      ) {
        api.info({
          message: language?.post_detail_page?.applied_alert_mess,
          description: language?.post_detail_page?.applied_alert_des,
          placement: 'top',
          icon: <ExclamationCircleFilled style={{ color: 'blue' }} />,
        });
        return;
      }

      // Applied but !Hijob

      if (
        // (post?.data.application_status === 1 && !isHiJob) ||
        (post?.data?.applied &&
          post?.data?.companyResourceData?.name !== 'HIJOB') ||
        (checkApply && post?.data?.companyResourceData?.name !== 'HIJOB')
      ) {
        window.open(post?.data?.companyResourceData?.postUrl, '_blank');
        return;
      }
      // navigate to edit post
      if (checkPostUser) {
        window.open(`edit-posted/?postId=${POST_ID}`, 'width=800,height=600');
        return;
      }
      if (
        !userProfile.name ||
        !userProfile.address ||
        !userProfile.birthday ||
        userProfile.gender === null ||
        userProfile.gender === undefined ||
        !userProfile.phone ||
        !userProfile.email
      ) {
        api.info({
          message: language?.post_detail_page?.update_infor_mess,
          description: language?.post_detail_page?.update_infor_des,
          placement: 'top',
          icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
        });
        return;
      }

      setOpenModalApply(true);
      // const result = await appplicationApi.applyAplication(POST_ID);
      // console.log('result ung tiyen', result);
      // if (true) {
      //   // openNotification();
      //   setTextButton('Đã ứng tuyển');
      //   // setBackgroundButton('gray');
      //   setCheckApply(true);
      //   // window.open(post?.data.resource.url, '_blank');
      // }
    } catch (error: any) {
      console.log('error', error);
      // if (error.response.status === 400) {
      //   // api.info({
      //   //   message: `Ứng tuyển không thành công!`,
      //   //   description: 'Bạn đã ứng tuyển vị trí này',
      //   //   placement: 'top',
      //   //   icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
      //   // });
      //   setTextButton('Đã ứng tuyển');
      //   // setBackgroundButton('gray');
      //   setBackgroundButton('#0D99FF');
      //   setCheckApply(true);
      //   window.open(post?.data?.companyResourceData.url, '_blank');
      //   // openNotification();
      //   return;
      // }
    }
  };

  // const captionStyle = {
  //   fontSize: '2em',
  //   fontWeight: 'bold',
  // };
  // const slideNumberStyle = {
  //   fontSize: '15px',
  //   fontWeight: 'bold',
  // };
  setTimeout(() => {
    setAutomatic(true);
  }, 700);

  const handleClickShare = () => {
    setOpenModalShare(true);
  };
  const handleClickSave = async () => {
    // const a = post?.data.bookmarked;

    try {
      if (!localStorage.getItem('accessToken')) {
        setOpenModalLogin(true);
      }
      if (post?.data.bookmarked && bookmarked) {
        const result = await bookMarkApi.deleteBookMark(post?.data.id);
        if (result) {
          setBookmarked(!bookmarked);
          dispatch<any>(setAlertCancleSave(true));
        }
      } else if (!post?.data.bookmarked && !bookmarked) {
        const result = await bookMarkApi.createBookMark(post?.data.id);
        if (result) {
          dispatch<any>(setAlertSave(true));
          setBookmarked(!bookmarked);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalShare = () => {
    setOpenModalShare(false);
  };

  const handleCloseModalApply = () => {
    setOpenModalApply(false);
    setIsApplied(false);
  };
  const handleClickShareSource = (nameShare: string) => {
    // window.location.href = `mailto:${email}`;
    if (nameShare === 'Mail') {
      // window.location.href = `mailto:quangbk54@gmail.com`;
      const subject = 'HiJob đề xuất công việc dành cho bạn';
      const title = 'Nội dung khi share qua mail nè';

      const content = `
        HiJob mong muốn sẽ giúp bạn tìm được công việc mơ ước của mình. Chúng tôi đã tìm được những công việc mới nhất có thể phù hợp với bạn bạn.
        Hãy nhấn vào link đính kèm để xem thêm thông tin chi tiết về công việc.
        `;
      const emailBody = encodeURIComponent(
        `${title} ${content} ${post?.data.shareLink}`,
      );

      // window.location.href = `mailto:?body=${encodeURIComponent(
      //   post?.data?.companyResourceData?.name === 'HIJOB'
      //     ? post?.data.shareLink
      //     : // : post?.data.companyResourceData.postUrl,
      //       post?.data.shareLink,
      // )}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(
        subject,
      )}&body=${emailBody}`;
    }

    // if (nameShare === 'Messenger') {
    //   // fb-messenger://share/?link=${encodeURIComponent(linkToShare)}
    //   // window.location.href = `fb-messenger://share/?link=${encodeURIComponent(
    //   const messengerLink =
    //     'fb-messenger://share?link=' +
    //     encodeURIComponent(post?.data.resource.url) +
    //     '&app_id=' +
    //     encodeURIComponent('523018296116961');
    //   window.location.href = messengerLink;
    // }
    if (nameShare === 'Facebook') {
      // const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      //   post?.data?.companyResourceData?.name === 'HIJOB'
      //     ? post?.data.shareLink
      //     : post?.data.shareLink,
      // )}`;

      const titleShare = 'hijob chia sẻ công việc cho bạn';

      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        post?.data.shareLink,
      )}&quote=${encodeURIComponent(titleShare)}}&display=iframe`;
      window.open(url);
    }
    if (nameShare === 'Zalo') {
      window.location.href = `zalo://app?link=${encodeURIComponent(
        post?.data?.companyResourceData?.name === 'HIJOB'
          ? post?.data.shareLink
          : post?.data.shareLink,
      )}`;
    }
    if (nameShare === 'Sao chép liên kết' || nameShare === 'Copy link') {
      copy(
        post?.data?.companyResourceData?.name === 'HIJOB'
          ? post?.data.shareLink
          : post?.data.shareLink,
        // : post?.data.companyResourceData.postUrl,
      );
      // setCopied(true);
      dispatch<any>(setShowCopy(true));
      // setTimeout(() => {
      //   setCopied(false);
      // }, 3000);
    }
  };

  // console.log('copy link', copied);
  // console.log('date', new Date(post?.data.created_at).toLocaleDateString());

  // custom title firebase
  const analytics: any = getAnalytics();

  useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title = language?.post_detail_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Chi tiết bài tuyển dụng'
        : 'HiJob - Job Post Details';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_post_detail' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

  // const handleClickSearch = () => {
  //   window.location.href = `/search?q=${post?.data.company_name}`;
  // }

  const handleClickSearch = () => {
    const companyName = post?.data.companyName;
    const searchUrl = `/search-results?q=${encodeURIComponent(companyName)}`;
    window.open(searchUrl, '_self');
  };

  const handleClickShowMap = () => {
    window.open(
      'https://www.google.com/maps/place/' +
        `${post?.data.address}, ${
          post?.data.location ? post?.data.location.fullName : ''
        }, ${
          post?.data?.location?.district
            ? post?.data?.location?.district?.fullName
            : ''
        }, ${
          post?.data?.location?.district?.province
            ? post?.data.district?.province?.fullName
            : ''
        }`,
    );
  };

  const handleClickChangePage = () => {
    window.open(post?.data?.companyResourceData?.postUrl, '_blank');
    setIsApplied(true);
  };

  const handleChangeStatus = async () => {
    try {
      const result = await appplicationApi.applyAplication(POST_ID);
      // console.log('result ung tiyen', result);
      if (result && post?.data?.applied) {
        // openNotification();
        setTextButton(language?.post_detail_page?.applied);
        setBackgroundButton('gray');
        setCheckApply(true);
        // window.open(post?.data.resource.url, '_blank');
        setOpenModalApply(false);
      } else {
        // openNotification();
        setTextButton(language?.post_detail_page?.applied);
        setBackgroundButton('gray');
        setCheckApply(true);
        // window.open(post?.data.resource.url, '_blank');
        setOpenModalApply(false);
      }
    } catch (error) {
      setTextButton(language?.post_detail_page?.applied);
      // setBackgroundButton('gray');
      setCheckApply(true);
      // window.open(post?.data.resource.url, '_blank');
      setOpenModalApply(false);
    }
  };

  const handleApply = async () => {
    if (
      !userProfile.name ||
      !userProfile.address ||
      !userProfile.birthday ||
      userProfile.gender === null ||
      userProfile.gender === undefined ||
      !userProfile.phone ||
      !userProfile.email
    ) {
      api.info({
        message: language?.post_detail_page?.update_infor_mess,
        description: language?.post_detail_page?.update_infor_des,
        placement: 'top',
        icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
      });
      return;
    }
    try {
      const result: any = await appplicationApi.applyAplication(POST_ID);
      // console.log('result ung tiyen', result);
      // console.log('result ung tiyen', result?.success);
      // console.log('result ung tiyen', result?.code);
      if (
        (result?.success as any) &&
        (result.code as number) === (201 as any)
      ) {
        // openNotification();
        setTextButton(language?.post_detail_page?.applied);
        setBackgroundButton('gray');
        setCheckApply(true);
        // window.open(post?.data.resource.url, '_blank');
        setOpenModalApply(false);
      }
    } catch (error) {
      console.log('error', error);

      // if (
      //   (result?.success as any) &&
      //   (result.code as number) === (400 as any)
      // ) {
      //   // openNotification();
      //   setTextButton('Đã ứng tuyển');
      //   // setBackgroundButton('gray');
      //   setCheckApply(true);
      //   // window.open(post?.data.resource.url, '_blank');
      //   setOpenModalApply(false);
      // }
    }
  };

  const onChangeTab = (key: string) => {
    setKeyTab(key);
  };

  console.log('postDate', post?.data);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: language?.post_detail_page?.job_information,
      children: (
        <>
          <div className="job-title-container">
            <div className="job-title-details">
              {/* <div className="div-detail-row">
                              <EnvironmentOutlined
                                style={{ color: '#575757' }}
                              />
                              <div style={{ marginLeft: '10px' }}>
                                {' '}
                                <p>Địa chỉ</p>
                                <h5>{post?.data.address}</h5>
                              </div>
                            </div> */}
              <div className="div-detail-row">
                <div className="div-detail-row-titleItem">
                  <JobTypePostIcon />
                  <p>{language?.post_detail_page?.job_type}</p>
                </div>
                <div className="div-detail-row-titleItem">
                  <h5>{post?.data.postJobType.fullName}</h5>
                </div>
              </div>
              <div className="div-detail-row">
                <div className="div-detail-row-titleItem">
                  <ClockPostIcon />
                  <p>{language?.post_detail_page?.working_hour}</p>
                </div>
                <div className="div-detail-row-titleItem">
                  <h5>
                    {moment(new Date(post?.data.startTime)).format('HH:mm')} -{' '}
                    {moment(new Date(post?.data.endTime)).format('HH:mm')}
                  </h5>
                </div>
              </div>
              <div
                className="div-detail-row"
                style={{
                  display:
                    post?.data?.startDate != null || post?.data?.endDate != null
                      ? 'flex'
                      : 'none',
                }}
              >
                <div className="div-detail-row-titleItem">
                  <CalendarPostIcon />
                  <p>{language?.post_detail_page?.working_time}</p>
                </div>
                <div className="div-detail-row-titleItem">
                  <h5>
                    {new Date(post?.data?.startDate).toLocaleDateString(
                      'en-GB',
                    )}
                    -{' '}
                    {new Date(post?.data?.endDate).toLocaleDateString('en-GB')}
                  </h5>
                </div>
              </div>
              <div className="div-detail-row">
                <div className="div-detail-row-titleItem">
                  <CalendarPostIcon />
                  <p>{language?.post_detail_page?.work_on_weekends}</p>
                </div>
                <div className="div-detail-row-titleItem">
                  <h5>
                    {post?.data.isWorkingWeekend === 0
                      ? language?.post_detail_page?.weekend_no
                      : language?.post_detail_page?.weekend_yes}
                  </h5>
                </div>
              </div>
              <div className="div-detail-row">
                <div className="div-detail-row-titleItem">
                  <MonitorPostIcon />
                  <p>{language?.post_detail_page?.work_remotely}</p>
                </div>
                <div className="div-detail-row-titleItem">
                  <h5>
                    {post?.data.isRemotely === 0
                      ? language?.post_detail_page?.remote_no
                      : language?.post_detail_page?.remote_yes}
                  </h5>
                </div>
              </div>
              <div className="div-detail-row">
                <div className="div-detail-row-titleItem">
                  <DollarPostIcon />
                  <p>{language?.post_detail_page?.salary}</p>
                </div>
                <div className="div-detail-row-titleItem">
                  {post?.data.postSalaryType.id === 6 ? (
                    <h5>{post?.data.postSalaryType.fullName}</h5>
                  ) : (
                    <h5>
                      {new Intl.NumberFormat('en-US').format(
                        post?.data.salaryMin,
                      ) + ` ${post?.data.moneyTypeText}`}{' '}
                      -{' '}
                      {new Intl.NumberFormat('en-US').format(
                        post?.data.salaryMax,
                      ) + ` ${post?.data.moneyTypeText}`}
                    </h5>
                  )}
                </div>
              </div>
              <div className="div-detail-row">
                <div className="div-detail-row-titleItem">
                  <WorkPostIcon />
                  <p>{language?.post_detail_page?.job_category}</p>
                </div>
                <div
                  className="div-detail-row-titleItem"
                  style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <h5>
                    {post?.data.postCategories.map(
                      (item: any, index: null | number) => `
                      ${item.parentCategory.fullName}/${item.fullName}/
                      `,
                    )}
                  </h5>
                </div>
              </div>
              <div className="div-detail-row">
                <div className="div-detail-row-titleItem">
                  <ClockPostIcon />
                  <p>{language?.post_detail_page?.expiration_date}</p>
                </div>
                <div
                  className="div-detail-row-titleItem"
                  style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <h5>
                    {post?.data.expiredDate
                      ? `${new Date(post?.data.expiredDate).toLocaleDateString(
                          'en-GB',
                        )}`
                      : language?.post_detail_page?.indefinite}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="post-detail-btns">
            {contextHolder}
            <Button
              type="primary"
              ghost
              className="btn-mess"
              icon={<MessageOutlined />}
              style={{
                padding: '20px',
                display:
                  post?.data?.companyResourceData?.name === 'HIJOB'
                    ? 'flex'
                    : 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                if (!localStorage.getItem('accessToken')) {
                  setOpenModalLogin(true);
                  return;
                }
                window.open(
                  `/message?post_id=${searchParams.get('post-id')}&user_id=${
                    post?.data?.accountId
                  } `,
                  '_parent',
                );
              }}
              // onClick={() => {
              //   console.log(post?.data);
              // }}
            ></Button>
            <Button
              onClick={onclick}
              className="btn-apply"
              type={'primary'}
              // disabled={checkApply}
              style={{
                fontSize: 16,
                backgroundColor: `${backgroundButton}`,
                color: 'white',
                fontWeight: 'normal',
                // position: 'absolute',
                // bottom: '-212px',
              }}
              icon={checkPostUser ? <FormOutlined /> : null}
            >
              {textButton}
            </Button>
          </div>
        </>
      ),
    },
    post?.data?.postCompanyInformation && {
      key: '2',
      label: language?.post_detail_page?.company_infor,
      style: {
        display:
          post?.data?.postCompanyInformation && key === '2' ? 'flex' : 'none',
      },
      children: (
        <>
          <div
            className={`job-title-container`}
            style={{ overflowY: 'scroll' }}
          >
            <div className="job-title-details">
              <div className="div-intro-Company">
                <Avatar
                  shape="square"
                  size={80}
                  src={post?.data?.postCompanyInformation?.logoPath}
                />
                <div className="div-intro-Company_rows">
                  <div className="div-intro-Company_row">
                    <p>{post?.data?.postCompanyInformation?.name}</p>
                  </div>
                  <div className="div-intro-Company_row">
                    <div className="div-intro-Company_row__item">
                      <BoardiIntroCompanyPostIcon />
                      <h3>
                        {
                          post?.data?.postCompanyInformation
                            ?.companySizeInfomation?.nameText
                        }
                      </h3>
                    </div>
                    <div className="div-intro-Company_row__item">
                      <CalendarPostIcon width={24} height={24} />
                      <h3>
                        {
                          post?.data?.postCompanyInformation?.companyCategory
                            ?.fullName
                        }
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-detail-rowCompany">
                <h3 style={{ display: 'block' }}>
                  {language?.post_detail_page?.company_description}
                </h3>
                <div className="div-detail_descCompany">
                  <p>
                    {post?.data.postCompanyInformation
                      ? post?.data.postCompanyInformation?.description
                      : language?.post_detail_page?.not_update}
                  </p>
                </div>
              </div>
              <div className="div-detail-rowCompany">
                <h3>{language?.post_detail_page?.basic_info}</h3>
                <div className="div-detail-items">
                  <div className="div-detail-titleItem">
                    <TaxCodeDetailPostIcon />
                    <p>{language?.post_detail_page?.tax_code}</p>
                  </div>
                  <div className="div-detail-titleItem">
                    <h5>
                      {post?.data?.postCompanyInformation.taxCode
                        ? post?.data?.postCompanyInformation?.taxCode
                        : language?.post_detail_page?.not_update}
                    </h5>
                  </div>
                </div>
                <div className="div-detail-items">
                  <div className="div-detail-titleItem">
                    <LocationDetailPostIcon />
                    <p>{language?.post_detail_page?.address}</p>
                  </div>
                  <div className="div-detail-titleItem">
                    <h5>
                      {post?.data?.postCompanyInformation
                        ? `${post?.data?.postCompanyInformation?.companyLocation?.fullName}, ` +
                          `${post?.data?.postCompanyInformation?.companyLocation?.district?.fullName}, ` +
                          `${post?.data?.postCompanyInformation?.companyLocation?.district?.province?.fullName}`
                        : language?.post_detail_page?.not_update}
                    </h5>
                  </div>
                </div>
                <div className="div-detail-items">
                  <div className="div-detail-titleItem">
                    <MailDetailPostIcon />
                    <p>Email</p>
                  </div>
                  <div className="div-detail-titleItem">
                    <h5>
                      {post?.data?.postCompanyInformation
                        ? post?.data?.postCompanyInformation?.email
                        : language?.post_detail_page?.not_update}
                    </h5>
                  </div>
                </div>
                <div className="div-detail-items">
                  <div className="div-detail-titleItem">
                    <PhoneDetailPostIcon />
                    <p>{language?.post_detail_page?.phone_number}</p>
                  </div>
                  <div className="div-detail-titleItem">
                    <h5>
                      {post?.data?.postCompanyInformation
                        ? post?.data?.postCompanyInformation?.phone
                        : language?.post_detail_page?.not_update}
                    </h5>
                  </div>
                </div>
                <div className="div-detail-items">
                  <div className="div-detail-titleItem">
                    <WebDetailPostIcon />
                    <p>Website</p>
                  </div>
                  <div className="div-detail-titleItem">
                    <h5>
                      {post?.data?.postCompanyInformation
                        ? post?.data?.postCompanyInformation?.website
                        : language?.post_detail_page?.not_update}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
  // console.log('post?.data?', post?.data);
  // console.log('dispatch(setPostNewestApi(result));', postNewest);

  return (
    <>
      {automatic && (
        <div className="detail">
          <NavBar />
          <CategoryDropdown />
          {/* <div className="div-include-breadcrumb">
            <div className="job-breadcrumb">
              <div className="div-breadcrumb" style={{ width: `${width}px` }}>
                <Breadcrumb
                  separator=">"
                  items={[
                    {
                      title: <a href="/">HiJob</a>,
                    },
                    {
                      title: `${post?.data.title}`,
                    },
                  ]}
                />
              </div>
            </div>
          </div> */}
          <div className="detail-container">
            <div className="detail-content">
              <div className="title-container">
                <div className="top-title">
                  <h2>{post?.data.title}</h2>
                  {post?.data.companyResourceData.logo ? (
                    <img
                      src={post?.data.companyResourceData.logo}
                      alt={post?.data.companyResourceData.logo}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mid-title">
                  <div className="mid-title_companyName">
                    <CompanyNameDetailPostIcon width={24} height={24} />
                    <h3>{post?.data.companyName}</h3>
                    <h3>|</h3>
                    <h3
                      onClick={handleClickSearch}
                      style={{ cursor: 'pointer' }}
                      className="clickShow-detailPost"
                    >
                      {language?.post_detail_page?.see_all}
                    </h3>
                  </div>
                  <div className="mid-title_companyAddress">
                    <AddressDetailPostIcon width={24} height={24} />
                    <h3>{`${post?.data.address}, ${
                      post?.data?.location ? post?.data?.location?.fullName : ''
                    }, ${
                      post?.data?.location?.district
                        ? post?.data?.location?.district?.fullName
                        : ''
                    }, ${
                      post?.data?.location?.district?.province
                        ? post?.data?.location?.district?.province?.fullName
                        : ''
                    }`}</h3>
                    <h3>|</h3>
                    <h3
                      onClick={handleClickShowMap}
                      style={{ cursor: 'pointer' }}
                      className="clickShow-detailPost"
                    >
                      {language?.post_detail_page?.see_on_map}
                    </h3>
                  </div>
                </div>
                <div className="bot-title">
                  <div className="bot-title-createdTime">
                    <ClockDetailPostIcon width={24} height={24} />
                    <h3>
                      {moment(new Date(post?.data.createdAt)).format('HH:mm')}
                      <span>&nbsp;</span>
                      {new Date(post?.data.createdAt).toLocaleDateString(
                        'en-GB',
                      )}
                    </h3>
                  </div>
                  <div className="bot-title-actions">
                    {/* <div className="actions-item">
                      <img
                        src={post?.data.resource.company_icon}
                        alt={post?.data.resource.company_icon}
                      />
                      <h3>{post?.data.resource.company_resource_name}</h3>
                    </div> */}

                    <div className="actions-item" onClick={handleClickShare}>
                      <ShareIcon width={24} height={24} />
                      {/* <div className="items-share">
                          <Link
                            to="#"
                            onClick={() => {
                              window.location.href = `mailto:kalsjkahsjkfasjfkajkshfjkashkj@gmail.com`;
                            }}
                          >
                            send
                          </Link>
                        </div> */}
                      <h3>{language?.post_detail_page?.share}</h3>
                    </div>
                    <div className="actions-item" onClick={handleClickSave}>
                      {bookmarked ? (
                        // <SaveIcon width={24} height={24} />
                        <SaveIconFill width={24} height={24} />
                      ) : (
                        <SaveIconOutline width={24} height={24} />
                      )}
                      <h3>{language?.post_detail_page?.save}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-container">
                <div className="div-job-img" ref={componentRef}>
                  {/* {isLoading ? (
                    <Skeleton
                      variant="rectangular"
                      width={'100%'}
                      height={630}
                    />
                  ) : (
                    <Carousel
                      data={
                        post?.data.images.length > 0 ? post?.data.images : data
                      }
                      time={2000}
                      width="100%"
                      height="500px"
                      captionStyle={captionStyle}
                      radius="10px"
                      slideNumber={true}
                      slideNumberStyle={slideNumberStyle}
                      captionPosition="bottom"
                      automatic={false}
                      // dots={true}
                      pauseIconColor="white"
                      pauseIconSize="40px"
                      slideBackgroundColor="darkgrey"
                      slideImageFit="cover"
                      thumbnails={true}
                      thumbnailWidth="100px"
                      style={{
                        textAlign: 'center',
                        // maxWidth: '850px',
                        maxHeight: '590px',
                      }}
                    />
                  )} */}
                  <Swiper
                    // style={{
                    //   '--swiper-navigation-color': '#fff',
                    //   '--swiper-pagination-color': '#fff',
                    // }}
                    pagination={{
                      type: 'fraction',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    // mousewheel={true}
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[
                      Mousewheel,
                      FreeMode,
                      Pagination,
                      Navigation,
                      Thumbs,
                    ]}
                    className="div-job-img-swipper"
                  >
                    {post?.data?.images ? (
                      post?.data?.images.map((item: any, index: number) => {
                        return (
                          <SwiperSlide
                            className="div-job-img-swipper_item"
                            key={index}
                          >
                            <img src={item.url} alt={language?.err_none_img} />
                          </SwiperSlide>
                        );
                      })
                    ) : (
                      <SwiperSlide className="div-job-img-swipper_item">
                        <img
                          src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/no-image.png"
                          alt={language?.err_none_img}
                          style={{ objectFit: 'cover' }}
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    // mousewheel={true}
                    slidesPerView={3}
                    freeMode={true}
                    centeredSlides={
                      post?.data.images && post?.data.images.length === 1
                        ? true
                        : false
                    }
                    watchSlidesProgress={true}
                    modules={[Mousewheel, FreeMode, Navigation, Thumbs]}
                    className="div-job-img-swipper_Thumbs"
                  >
                    {post?.data?.images &&
                      post?.data?.images.map((item: any, index: number) => {
                        return (
                          <SwiperSlide
                            className="div-job-img-swipper-thumbs_item"
                            key={index}
                          >
                            <img src={item.url} alt="Ảnh lỗi" />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
                <div className="div-job-title" ref={componentRefJob}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      typography: 'body1',
                    }}
                  >
                    <Tabs
                      defaultActiveKey="1"
                      centered
                      items={items}
                      animated={false}
                      onChange={onChangeTab}
                    />
                  </Box>
                </div>
              </div>
              <div className="description-container">
                <div className="div-description-mo">
                  <div className="description">
                    <h3>{language?.post_detail_page?.job_description}</h3>
                    <div
                      style={{
                        whiteSpace: 'pre-line',
                        fontFamily: 'Roboto',
                        marginTop: '18px',
                        wordBreak: 'break-word',
                        fontSize: '14px',
                      }}
                    >
                      {post?.data.description}
                    </div>
                    <div className="div-description-mo-bottom">
                      <div className="description-buttons">
                        <div
                          className="description-button_previous"
                          // onClick={handlePreviousPost}
                        >
                          <div className="icon">
                            <BackIcon width={17} height={17} />
                          </div>
                          <span>{language?.post_detail_page?.pre_job}</span>
                        </div>
                        <div
                          className="description-button_next"
                          // onClick={handleNextPost}
                          style={{
                            color: postNext ? 'black' : '#cccc',
                          }}
                        >
                          <span>{language?.post_detail_page?.next_job}</span>
                          <div
                            className="icon"
                            style={
                              {
                                // backgroundColor: postNext ? 'white' : '#cccc',
                              }
                            }
                          >
                            <BackIcon
                              width={17}
                              height={17}
                              fill={postNext ? 'black' : '#cccc'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="description-post">
                        <AnotherPost
                          item={postPrev}
                          onClick={handlePreviousPost}
                        />
                        <AnotherPost item={postNext} onClick={handleNextPost} />
                      </div>
                    </div>
                  </div>
                  {/* <Button
                    onClick={onclick}
                    className="btn-apply btn-for-mo"
                    type={'primary'}
                    disabled={checkApply}
                    style={{
                      fontSize: 16,
                      backgroundColor: `${backgroundButton}`,
                      color: 'white',
                      fontWeight: 'normal',
                    }}
                    icon={checkPostUser ? <FormOutlined /> : null}
                  >
                    {textButton}
                  </Button> */}
                </div>
                <div className="div-suggest">
                  <h3>{language?.post_detail_page?.similar_jobs}</h3>
                  <div className="item">
                    {postNewest?.data?.posts.map(
                      (item: PostNewest, index: null | number) => (
                        <ItemSuggest item={item} key={index} />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShowCancleSave />
          <ShowNotificativeSave />
          <ShowCopy />

          <Modal
            open={openModalShare}
            onClose={handleCloseModalShare}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ position: 'relative' }}
              >
                {language?.post_detail_page?.share_this_job}
                <IconButton
                  aria-label="close"
                  onClick={handleCloseModalShare}
                  sx={{
                    position: 'absolute',
                    right: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Typography>
              <div className="wrap-info_modalShare">
                <div className="wrap-img_info">
                  <div className="wrap-img">
                    <img src={post?.data.image} alt={post?.data.company_name} />
                  </div>
                  <div>
                    <Typography sx={{ ml: 2 }}>
                      {post?.data.companyName}
                    </Typography>
                    <Typography
                      sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
                    >
                      <CompanyNameDetailPostIcon width={16} height={16} />{' '}
                      <span style={{ marginLeft: '8px' }}>
                        {post?.data.title}
                      </span>
                    </Typography>
                    <Typography sx={{ ml: 2 }}>
                      <AddressDetailPostIcon width={16} height={16} />
                      <span style={{ marginLeft: '8px' }}>
                        {`${post?.data.address}, ${
                          post?.data?.location
                            ? post?.data?.location?.fullName
                            : ''
                        }, ${
                          post?.data?.location?.district
                            ? post?.data?.location?.district?.fullName
                            : ''
                        }, ${
                          post?.data?.location?.district?.province
                            ? post?.data?.location?.district?.province?.fullName
                            : ''
                        }`}
                      </span>
                    </Typography>
                    {/* <div className="mid-title_companyName">
                      <CompanyNameDetailPostIcon width={24} height={24} />
                      <h3>{post?.data.companyName}</h3>
                      <h3>|</h3>
                      <h3
                        onClick={handleClickSearch}
                        style={{ cursor: 'pointer' }}
                        className="clickShow-detailPost"
                      >
                        {language?.post_detail_page?.see_all}
                      </h3>
                    </div>

                    <div className="mid-title_companyAddress">
                      <AddressDetailPostIcon width={24} height={24} />
                      <h3>{`${post?.data.address}, ${
                        post?.data?.location
                          ? post?.data?.location?.fullName
                          : ''
                      }, ${
                        post?.data?.location?.district
                          ? post?.data?.location?.district?.fullName
                          : ''
                      }, ${
                        post?.data?.location?.district?.province
                          ? post?.data?.location?.district?.province?.fullName
                          : ''
                      }`}</h3>
                      <h3>|</h3>
                      <h3
                        onClick={handleClickShowMap}
                        style={{ cursor: 'pointer' }}
                        className="clickShow-detailPost"
                      >
                        {language?.post_detail_page?.see_on_map}
                      </h3>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="items-share">
                {itemsShare.map((itemShare: any, index: number) => (
                  <div
                    // to={`/post-detail?post-id=${post?.data.id}`}
                    className="item-share"
                    onClick={() => handleClickShareSource(itemShare.nameShare)}
                    key={index}
                  >
                    {itemShare.icon}
                    <span style={{ marginLeft: '4px' }}>
                      {itemShare.nameShare}
                    </span>
                  </div>
                ))}
              </div>
            </Box>
          </Modal>

          <Modal
            open={openModalApply}
            onClose={handleCloseModalApply}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                sx={{ textAlign: 'center', color: '#0d99ff' }}
              >
                {language?.post_detail_page?.apply_this_job_mess}
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h4"
                sx={{ margin: '24px 0', fontSize: '15px', textAlign: 'center' }}
              >
                {post?.data?.companyResourceData?.name === 'HIJOB'
                  ? language?.post_detail_page?.apply_this_job_des
                  : isApplied
                  ? language?.post_detail_page?.have_applied_yet
                  : language?.post_detail_page?.forward_des}
              </Typography>

              <Box
                sx={{
                  margin: '12px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <Button
                  type="primary"
                  danger
                  onClick={handleCloseModalApply}
                  style={{
                    width: '300px',
                  }}
                >
                  {isApplied
                    ? language?.post_detail_page?.not_yet
                    : language?.no}
                </Button>
                <Button
                  type="primary"
                  onClick={
                    post?.data?.companyResourceData?.name === 'HIJOB'
                      ? handleApply
                      : isApplied
                      ? handleChangeStatus
                      : handleClickChangePage
                  }
                  style={{
                    width: '300px',
                  }}
                >
                  {isApplied
                    ? language?.post_detail_page?.already
                    : language?.yes}
                </Button>
              </Box>
            </Box>
          </Modal>
          <ModalLogin
            openModalLogin={openModalLogin}
            setOpenModalLogin={setOpenModalLogin}
          />
          <RollTop />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Detail;
