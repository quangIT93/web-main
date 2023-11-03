import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, useSearchParams } from 'react-router-dom';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const BreadcrumbMenuItems: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const dataItem = [
    {
      id: 0,
      // title: language?.history_page?.applied_jobs,
      // childs: [language?.all],
      title:
        languageRedux === 1 ? 'Các công việc đã ứng tuyển' : 'Applied jobs',
      childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
    },
    {
      id: 1,
      // title: language?.history_page?.saved_jobs,
      // childs: [language?.all],
      title: languageRedux === 1 ? 'Các công việc đã lưu' : 'Saved jobs',
      childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
    },
    {
      id: 2,
      // title: language?.history_page?.posted_jobs,
      title:
        languageRedux === 1 ? 'Các công việc đã đăng tuyển' : 'Posted jobs',
      childs: [
        languageRedux === 1 ? 'Tất cả' : 'All',
        languageRedux === 1 ? 'Các công việc chưa đóng' : 'Unclosed jobs',
        languageRedux === 1 ? 'Các công việc đã đóng' : 'Closed jobs',

        // language?.history_page?.unclosed_jobs,

        // language?.history_page?.closed_jobs,
      ],
    },
    {
      id: 3,
      // title: language?.history_page?.list_of_articles,
      title: languageRedux === 1 ? 'Danh sách bài viết' : 'List of articles',
      childs: [
        languageRedux === 1 ? 'Đã lưu' : 'Saved',
        languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posts',
        // language?.history_page?.saved,
        // language?.history_page?.posts_created,
      ],
    },
    {
      id: 4,
      // title: language?.history_page?.list_of_articles,
      title: languageRedux === 1 ? 'Danh sách ứng viên' : 'List of candidates',
      childs: [
        languageRedux === 1 ? 'Tất cả' : 'All',
        // languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posts',
        // language?.history_page?.saved,
        // language?.history_page?.posts_created,
      ],
    },
  ];
  const location = useLocation();
  const [titleNameJobHome, setTitleNameJobHome] = useState('');

  // const handleScroll = () => {
  //   var targetElement = document.getElementById('hot-job-container');
  //   var targetElement2 = document.getElementById('job-by-hot-place');
  //   var targetElement3 = document.getElementById('box-suggestedJob');
  //   var targetElement4 = document.getElementById('list-candidate-container');
  //   var targetElement5 = document.getElementById('new-job');
  //   var targetElement6 = document.getElementById('community-container');
  //   // công việc đã ứng tuyển

  //   if (
  //     targetElement &&
  //     targetElement2 &&
  //     targetElement3 &&
  //     targetElement4 &&
  //     targetElement6 &&
  //     targetElement5
  //   ) {
  //     // Lấy thông tin về vị trí của phần tử đó trong trang
  //     var elementRect = targetElement.getBoundingClientRect();
  //     var elementRect2 = targetElement2.getBoundingClientRect();
  //     var elementRect3 = targetElement3.getBoundingClientRect();
  //     var elementRect4 = targetElement4.getBoundingClientRect();
  //     var elementRect5 = targetElement5.getBoundingClientRect();
  //     var elementRect6 = targetElement6.getBoundingClientRect();

  //     // Kiểm tra xem phần tử đã hiển thị trong viewport hay chưa

  //     if (elementRect.top - 140 <= 0 && elementRect.bottom - 130 >= 0) {
  //       setTitleNameJobHome(
  //         languageRedux === 1 ? 'Công việc nổi bật' : 'Hot jobs',
  //       );
  //     } else if (
  //       elementRect2.top - 140 <= 0 &&
  //       elementRect2.bottom - 130 >= 0
  //     ) {
  //       setTitleNameJobHome(
  //         languageRedux === 1 ? 'Công việc theo chủ đề' : 'Job by hot places',
  //       );
  //     } else if (
  //       elementRect3.top - 140 <= 0 &&
  //       elementRect3.bottom - 130 >= 0
  //     ) {
  //       setTitleNameJobHome(
  //         languageRedux === 1 ? 'Công việc gợi ý' : 'Suggested jobs',
  //       );
  //     } else if (
  //       elementRect4.top - 140 <= 0 &&
  //       elementRect4.bottom - 130 >= 0
  //     ) {
  //       // Phần tử đã hiển thị, bạn có thể thực hiện hành động ở đây
  //       setTitleNameJobHome(
  //         languageRedux === 1 ? 'Ứng viên mới nhất' : 'Newest workers',
  //       );
  //     } else if (
  //       elementRect5.top - 140 <= 0 &&
  //       elementRect5.bottom - 130 >= 0
  //     ) {
  //       // Phần tử đã hiển thị, bạn có thể thực hiện hành động ở đây
  //       setTitleNameJobHome(
  //         languageRedux === 1 ? 'Công việc mới nhất' : 'Newest Jobs',
  //       );
  //     } else if (
  //       elementRect6.top - 140 <= 0 &&
  //       elementRect6.bottom - 130 >= 0
  //     ) {
  //       // Phần tử đã hiển thị, bạn có thể thực hiện hành động ở đây
  //       setTitleNameJobHome(
  //         languageRedux === 1 ? 'Cộng đồng HiJob' : 'HiJob Community',
  //       );
  //     }
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   // return window.removeEventListener('scroll', handleScroll);
  // }, [titleNameJobHome]);

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const locations = [
    {
      location: '/',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        // {
        //   title: titleNameJobHome
        //     ? titleNameJobHome
        //     : languageRedux === 1
        //     ? 'Thông tin tuyển dụng'
        //     : 'Recruitment information',
        // },
      ],
    },
    {
      location: '/hotjobs',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Công việc nổi bật' : 'Hot jobs',
          href: `/hotjobs?hotjob-id=${searchParams.get(
            'hotjob-id',
          )}&hotjob-type=${searchParams.get('hotjob-id')}`,
        },
        {
          title:
            searchParams.get('hotjob-id') === '6'
              ? 'Driver'
              : searchParams.get('hotjob-id') === '2'
              ? 'Remote'
              : searchParams.get('hotjob-id') === '5'
              ? 'Freelancer'
              : searchParams.get('hotjob-id') === '1'
              ? 'Influencer'
              : searchParams.get('hotjob-id') === '3'
              ? 'Short time'
              : searchParams.get('hotjob-id') === '4'
              ? 'Job today'
              : searchParams.get('hotjob-id') === '8'
              ? 'Restaurant Service'
              : searchParams.get('hotjob-id') === '9'
              ? 'Parttime'
              : searchParams.get('hotjob-id') === '10'
              ? 'Marketing'
              : searchParams.get('hotjob-id') === '11'
              ? 'Beauty'
              : '',
        },
      ],
    },
    {
      location: '/profile',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title:
            profileV3.typeRoleData === 0
              ? languageRedux === 1
                ? 'Thông tin người dùng'
                : 'User information'
              : languageRedux === 1
              ? 'Thông tin nhà tuyển dụng'
              : 'Employer information',
        },
      ],
    },
    {
      location: '/more-jobs',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title:
            localStorage.getItem('job-type') === 'new'
              ? languageRedux === 1
                ? 'Công việc mới nhất'
                : 'Newest Job'
              : localStorage.getItem('job-type') === 'suggested'
              ? languageRedux === 1
                ? 'Công việc gợi ý'
                : 'Subjected Job'
              : localStorage.getItem('job-type') === 'place'
              ? languageRedux === 1
                ? 'Công việc theo chủ đề'
                : 'Job by hot places'
              : localStorage.getItem('job-type') === 'hot-job'
              ? languageRedux === 1
                ? 'Công việc nổi bật'
                : 'Hot jobs'
              : '',
          href: '/more-jobs',
        },
        {
          title:
            searchParams.get('categories-id') === 'all'
              ? languageRedux === 1
                ? 'Công việc gợi ý'
                : 'Suggested'
              : searchParams.get('categories-id') === '2'
              ? languageRedux === 1
                ? 'Văn phòng'
                : 'Office worker'
              : searchParams.get('categories-id') === '3'
              ? languageRedux === 1
                ? 'Khách sạn/Nhà hàng'
                : 'Hotel/Restaurant'
              : searchParams.get('categories-id') === '4'
              ? languageRedux === 1
                ? 'IT/Lập trình viên'
                : 'IT/Programming'
              : searchParams.get('categories-id') === '5'
              ? languageRedux === 1
                ? 'Design'
                : 'Design'
              : searchParams.get('categories-id') === '6'
              ? languageRedux === 1
                ? 'Marketing'
                : 'Marketing'
              : searchParams.get('categories-id') === '7'
              ? languageRedux === 1
                ? 'Lao động phổ thông'
                : 'Blue-collar worker'
              : searchParams.get('categories-id') === '8'
              ? languageRedux === 1
                ? 'Ngân hàng'
                : 'Bank'
              : searchParams.get('categories-id') === '9'
              ? languageRedux === 1
                ? 'Beauty & Spa'
                : 'Beauty & Spa'
              : searchParams.get('categories-id') === '10'
              ? languageRedux === 1
                ? 'Xuất nhập khẩu'
                : 'Logistic'
              : searchParams.get('categories-id') === '11'
              ? languageRedux === 1
                ? 'Dịch vụ'
                : 'Service'
              : searchParams.get('categories-id') === '12'
              ? languageRedux === 1
                ? 'Giáo dục - Đào tạo'
                : 'Education'
              : searchParams.get('categories-id') === '13'
              ? languageRedux === 1
                ? 'Dịch thuật'
                : 'Translator'
              : searchParams.get('categories-id') === '14'
              ? languageRedux === 1
                ? 'Khoa học - Kỹ thuật'
                : 'Science - Technology'
              : searchParams.get('categories-id') === '15'
              ? languageRedux === 1
                ? 'Chuyển nhà/Vệ sinh'
                : 'House moving/Cleaning'
              : searchParams.get('categories-id') === '16'
              ? languageRedux === 1
                ? 'Ngành khác'
                : 'Others'
              : languageRedux === 1
              ? 'Tất cả'
              : 'All',
        },
      ],
    },
    {
      location: '/history',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Lịch sử' : 'History',
          href: '/history',
        },
        {
          title:
            searchParams.get('p') === '1'
              ? 'Các công việc đã lưu'
              : searchParams.get('p') === '2'
              ? 'Các công việc đã đăng tuyển'
              : searchParams.get('p') === '3'
              ? 'Danh sách bài viết'
              : searchParams.get('p') === '4'
              ? 'Danh sách ứng viên'
              : searchParams.get('p') === '0'
              ? 'Các công việc đã ứng tuyển'
              : '',
          href: '/history',
        },
        {
          title:
            searchParams.get('c') === '1-0' ||
            searchParams.get('c') === '2-0' ||
            searchParams.get('c') === '2-0' ||
            searchParams.get('c') === '0-0' ||
            searchParams.get('c') === '4-0'
              ? languageRedux === 1
                ? 'Tất cả'
                : 'All'
              : searchParams.get('c') === '2-1'
              ? 'Các công việc chưa đóng'
              : searchParams.get('c') === '2-2'
              ? 'Các công việc đã đóng'
              : searchParams.get('c') === '3-0'
              ? 'Đã lưu'
              : searchParams.get('c') === '3-1'
              ? 'Bài viết bạn đã tạo'
              : '',
          href: '/history',
        },
      ],
    },
    {
      location: '/message',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Tin nhắn' : 'Messenger',
        },
      ],
    },
    {
      location: '/new-comunity',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Câu chuyện công việc' : 'Working story',
        },
      ],
    },
    {
      location: '/news-comunity',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Tin tức' : 'News',
        },
      ],
    },
    {
      location: '/detail-comunity',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Chi tiết bài viết' : 'Article details',
        },
      ],
    },
    {
      location: '/comunity_create_post',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: !searchParams.get('post-community')
            ? languageRedux === 1
              ? 'Tạo bài viết mới'
              : 'Creat new post'
            : languageRedux === 1
            ? 'Chỉnh sửa bài đăng'
            : 'Edit post',
        },
      ],
    },
    {
      location: '/page-cv',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Hướng dẫn tạo mẫu CV'
              : 'Instructions for creating a sample CV',
        },
      ],
    },
    {
      location: '/templates-cv',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Tạo CV' : 'Create CV',
        },
      ],
    },
    {
      location: '/profile-cv',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title:
            languageRedux === 1 ? 'Danh sách CV đã tạo' : 'List of created CV',
        },
      ],
    },
    {
      location: '/company-infor',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: 'Profile',
          href: '/profile',
        },
        {
          title:
            languageRedux === 1 ? 'Thông tin công ty' : 'Company information',
        },
      ],
    },
    {
      location: '/candidatesAll',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title:
            languageRedux === 1 ? 'Tìm kiếm ứng viên' : 'Search candidates',
        },
      ],
    },
    {
      location: '/candidate-new-detail',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Chi tiết thông tin ứng viên'
              : 'Detailed candidate information',
        },
      ],
    },
    {
      location: '/post-detail',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Chi tiết bài đăng' : 'Post details',
        },
      ],
    },
    {
      location: '/pdfView',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: languageRedux === 1 ? 'Chi tiết hồ sơ CV' : 'CV detail',
        },
      ],
    },
    {
      location: '/post',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tạo bài đăng tuyển dụng'
              : 'Create job posting',
        },
      ],
    },
  ];

  const menuItems = locations
    .filter((item) => item.location === location.pathname)
    .flatMap((item) =>
      item.menu.map((i) => ({ title: i.title, href: i.href })),
    );

  return <Breadcrumb separator=">" items={menuItems} />;
};

export default BreadcrumbMenuItems;
