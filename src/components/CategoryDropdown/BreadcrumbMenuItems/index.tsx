import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, useSearchParams } from 'react-router-dom';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const BreadcrumbMenuItems: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const location = useLocation();
  const [titleNameJobHome, setTitleNameJobHome] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const handleScroll = () => {
    var targetElement = document.getElementById('hot-job-container');
    var targetElement2 = document.getElementById('job-by-hot-place');
    var targetElement3 = document.getElementById('box-suggestedJob');
    var targetElement4 = document.getElementById('list-candidate-container');
    var targetElement5 = document.getElementById('new-job');
    var targetElement6 = document.getElementById('community-container');
    // công việc đã ứng tuyển

    if (
      targetElement &&
      targetElement2 &&
      targetElement3 &&
      targetElement4 &&
      targetElement6 &&
      targetElement5
    ) {
      // Lấy thông tin về vị trí của phần tử đó trong trang
      var elementRect = targetElement.getBoundingClientRect();
      var elementRect2 = targetElement2.getBoundingClientRect();
      var elementRect3 = targetElement3.getBoundingClientRect();
      var elementRect4 = targetElement4.getBoundingClientRect();
      var elementRect5 = targetElement5.getBoundingClientRect();
      var elementRect6 = targetElement6.getBoundingClientRect();

      // Kiểm tra xem phần tử đã hiển thị trong viewport hay chưa

      if (elementRect.top - 140 <= 0 && elementRect.bottom - 130 >= 0) {
        setTitleNameJobHome('Công việc nổi bật');
      } else if (
        elementRect2.top - 140 <= 0 &&
        elementRect2.bottom - 130 >= 0
      ) {
        setTitleNameJobHome('Công việc theo chủ đề');
      } else if (
        elementRect3.top - 140 <= 0 &&
        elementRect3.bottom - 130 >= 0
      ) {
        setTitleNameJobHome('Công việc gợi ý');
      } else if (
        elementRect4.top - 140 <= 0 &&
        elementRect4.bottom - 130 >= 0
      ) {
        // Phần tử đã hiển thị, bạn có thể thực hiện hành động ở đây
        setTitleNameJobHome('Ứng viên mới nhất');
      } else if (
        elementRect5.top - 140 <= 0 &&
        elementRect5.bottom - 130 >= 0
      ) {
        // Phần tử đã hiển thị, bạn có thể thực hiện hành động ở đây
        setTitleNameJobHome('Công việc mới nhất');
      } else if (
        elementRect6.top - 140 <= 0 &&
        elementRect6.bottom - 130 >= 0
      ) {
        // Phần tử đã hiển thị, bạn có thể thực hiện hành động ở đây
        setTitleNameJobHome('Câu chuyện việc làm');
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // return window.removeEventListener('scroll', handleScroll);
  }, [titleNameJobHome]);
  // Lắng nghe sự kiện scroll trên cửa sổ

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const locations = [
    {
      location: '/',
      menu: [
        {
          title: languageRedux === 1 ? 'Trang chủ' : 'Home',
          href: '/',
        },
        {
          title: titleNameJobHome ? titleNameJobHome : 'Nội dung công việc',
        },
      ],
    },
    {
      location: '/hotjobs',
      menu: [
        {
          title: 'Công việc nổi bật',
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
              : '',
          href: '/',
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
              : 'Tất cả',
        },
      ],
    },
    {
      location: '/history',
      menu: [
        {
          title: languageRedux === 1 ? 'Lịch sử' : 'History',
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
          title: languageRedux === 1 ? 'Tạo bài viết mới' : 'Creat new post',
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
  ];

  const menuItems = locations
    .filter((item) => item.location === location.pathname)
    .flatMap((item) =>
      item.menu.map((i) => ({ title: i.title, href: i.href })),
    );

  return <Breadcrumb separator=">" items={menuItems} />;
};

export default BreadcrumbMenuItems;
