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

  // const dataItem = [
  //   {
  //     id: 0,
  //     // title: language?.history_page?.applied_jobs,
  //     // childs: [language?.all],
  //     title:
  //       languageRedux === 1 ? 'Các công việc đã ứng tuyển' : 'Applied jobs',
  //     childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
  //   },
  //   {
  //     id: 1,
  //     // title: language?.history_page?.saved_jobs,
  //     // childs: [language?.all],
  //     title: languageRedux === 1 ? 'Các công việc đã lưu' : 'Saved jobs',
  //     childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
  //   },
  //   {
  //     id: 2,
  //     // title: language?.history_page?.posted_jobs,
  //     title:
  //       languageRedux === 1 ? 'Các công việc đã đăng tuyển' : 'Posted jobs',
  //     childs: [
  //       languageRedux === 1 ? 'Tất cả' : 'All',
  //       languageRedux === 1 ? 'Các công việc chưa đóng' : 'Unclosed jobs',
  //       languageRedux === 1 ? 'Các công việc đã đóng' : 'Closed jobs',

  //       // language?.history_page?.unclosed_jobs,

  //       // language?.history_page?.closed_jobs,
  //     ],
  //   },
  //   {
  //     id: 3,
  //     // title: language?.history_page?.list_of_articles,
  //     title: languageRedux === 1 ? 'Danh sách bài viết' : 'List of articles',
  //     childs: [
  //       languageRedux === 1 ? 'Đã lưu' : 'Saved',
  //       languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posted',
  //       // language?.history_page?.saved,
  //       // language?.history_page?.posts_created,
  //     ],
  //   },
  //   {
  //     id: 4,
  //     // title: language?.history_page?.list_of_articles,
  //     title: languageRedux === 1 ? 'Danh sách ứng viên' : 'List of candidates',
  //     childs: [
  //       languageRedux === 1 ? 'Tất cả' : 'All',
  //       // languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posts',
  //       // language?.history_page?.saved,
  //       // language?.history_page?.posts_created,
  //     ],
  //   },
  // ];
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

  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const locations = [
    {
      location: '/',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
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
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Công việc nổi bật'
              : languageRedux === 2
              ? 'Hot jobs'
              : languageRedux === 3 && '핫잡스',
          href: `/more-jobs`,
        },
        {
          title:
            searchParams.get('hotjob-id') === '6'
              ? languageRedux === 1
                ? 'Tài xế'
                : languageRedux === 2
                ? 'Driver'
                : '운전기사'
              : searchParams.get('hotjob-id') === '2'
              ? languageRedux === 1
                ? 'Làm việc từ xa'
                : languageRedux === 2
                ? 'Remote work'
                : '원격 근무'
              : searchParams.get('hotjob-id') === '5'
              ? languageRedux === 1
                ? 'Làm việc tự do'
                : languageRedux === 2
                ? 'Freelancer'
                : '프리랜서'
              : searchParams.get('hotjob-id') === '1'
              ? languageRedux === 1
                ? 'Influencer'
                : languageRedux === 2
                ? 'Influencer'
                : '인플루언서'
              : searchParams.get('hotjob-id') === '3'
              ? languageRedux === 1
                ? 'Công việc ngắn hạn'
                : languageRedux === 2
                ? 'Short-term job'
                : '단기 근무'
              : searchParams.get('hotjob-id') === '4'
              ? languageRedux === 1
                ? 'Công việc hôm nay'
                : languageRedux === 2
                ? "Today's job"
                : '오늘의 작업'
              : searchParams.get('hotjob-id') === '8'
              ? languageRedux === 1
                ? 'Dịch vụ nhà hàng'
                : languageRedux === 2
                ? 'Restaurant Service'
                : '레스토랑 서비스'
              : searchParams.get('hotjob-id') === '9'
              ? languageRedux === 1
                ? 'Bán thời gian'
                : languageRedux === 2
                ? 'Part time'
                : '파트타임'
              : searchParams.get('hotjob-id') === '10'
              ? languageRedux === 1
                ? 'Tiếp thị'
                : languageRedux === 2
                ? 'Marketing'
                : '마케팅'
              : searchParams.get('hotjob-id') === '11'
              ? languageRedux === 1
                ? 'Làm đẹp'
                : languageRedux === 2
                ? 'Beauty'
                : '뷰티'
              : '',
        },
      ],
    },
    {
      location: '/profile',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            profileV3.typeRoleData === 0
              ? languageRedux === 1
                ? 'Thông tin người dùng'
                : languageRedux === 2
                ? 'User information'
                : languageRedux === 3 && '개인 사용자 정보'
              : languageRedux === 1
              ? 'Thông tin nhà tuyển dụng'
              : languageRedux === 2
              ? 'Employer information'
              : languageRedux === 3 && '기업 사용자 정보',
        },
      ],
    },
    {
      location: '/more-jobs',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            localStorage.getItem('job-type') === 'new'
              ? languageRedux === 1
                ? 'Công việc mới nhất'
                : languageRedux === 2
                ? 'Newest jobs'
                : languageRedux === 3 && '최신 작업'
              : localStorage.getItem('job-type') === 'suggested'
              ? languageRedux === 1
                ? 'Công việc gợi ý'
                : languageRedux === 2
                ? 'Suggested jobs'
                : languageRedux === 3 && '추천 직업'
              : localStorage.getItem('job-type') === 'place'
              ? languageRedux === 1
                ? 'Công việc theo chủ đề'
                : languageRedux === 2
                ? 'Job by hot places'
                : languageRedux === 3 && '핫플레이스별작업'
              : localStorage.getItem('job-type') === 'hot-job'
              ? languageRedux === 1
                ? 'Công việc nổi bật'
                : languageRedux === 2
                ? 'Hot jobs'
                : languageRedux === 3 && '핫잡스'
              : '',
          href: '/more-jobs',
        },
        {
          title:
            searchParams.get('categories-id') === 'all'
              ? languageRedux === 1
                ? 'Công việc gợi ý'
                : languageRedux === 2
                ? 'Suggested jobs'
                : languageRedux === 3 && '추천 직업'
              : searchParams.get('categories-id') === '2'
              ? languageRedux === 1
                ? 'Văn phòng'
                : languageRedux === 2
                ? 'Office worker'
                : languageRedux === 3 && '사무실'
              : searchParams.get('categories-id') === '3'
              ? languageRedux === 1
                ? 'Khách sạn/Nhà hàng'
                : languageRedux === 2
                ? 'Hotel/Restaurant'
                : languageRedux === 3 && '호텔/식당'
              : searchParams.get('categories-id') === '4'
              ? languageRedux === 1
                ? 'IT/Lập trình viên'
                : languageRedux === 2
                ? 'IT/Programming'
                : languageRedux === 3 && 'IT/프로그래머'
              : searchParams.get('categories-id') === '5'
              ? languageRedux === 1
                ? 'Thiết kế'
                : languageRedux === 2
                ? 'Design'
                : languageRedux === 3 && '디자인'
              : searchParams.get('categories-id') === '6'
              ? languageRedux === 1
                ? 'Marketing'
                : languageRedux === 2
                ? 'Marketing'
                : languageRedux === 3 && '마케팅'
              : searchParams.get('categories-id') === '7'
              ? languageRedux === 1
                ? 'Lao động phổ thông'
                : languageRedux === 2
                ? 'Blue-collar worker'
                : languageRedux === 3 && '단순노동'
              : searchParams.get('categories-id') === '8'
              ? languageRedux === 1
                ? 'Ngân hàng'
                : languageRedux === 2
                ? 'Bank'
                : languageRedux === 3 && '은행'
              : searchParams.get('categories-id') === '9'
              ? languageRedux === 1
                ? 'Beauty & Spa'
                : languageRedux === 2
                ? 'Beauty & Spa'
                : languageRedux === 3 && '뷰티 & 스파'
              : searchParams.get('categories-id') === '10'
              ? languageRedux === 1
                ? 'Xuất nhập khẩu'
                : languageRedux === 2
                ? 'Logistic'
                : languageRedux === 3 && '수출입'
              : searchParams.get('categories-id') === '11'
              ? languageRedux === 1
                ? 'Dịch vụ'
                : languageRedux === 2
                ? 'Service'
                : languageRedux === 3 && '서비스'
              : searchParams.get('categories-id') === '12'
              ? languageRedux === 1
                ? 'Giáo dục - Đào tạo'
                : languageRedux === 2
                ? 'Education'
                : languageRedux === 3 && '교육-과외'
              : searchParams.get('categories-id') === '13'
              ? languageRedux === 1
                ? 'Dịch thuật'
                : languageRedux === 2
                ? 'Translator'
                : languageRedux === 3 && '번역'
              : searchParams.get('categories-id') === '14'
              ? languageRedux === 1
                ? 'Khoa học - Kỹ thuật'
                : languageRedux === 2
                ? 'Science - Technology'
                : languageRedux === 3 && '과학-기술'
              : searchParams.get('categories-id') === '15'
              ? languageRedux === 1
                ? 'Chuyển nhà/Vệ sinh'
                : languageRedux === 2
                ? 'House moving/Cleaning'
                : languageRedux === 3 && '이사/ 청소 서비스'
              : searchParams.get('categories-id') === '16'
              ? languageRedux === 1
                ? 'Ngành khác'
                : languageRedux === 2
                ? 'Others'
                : languageRedux === 3 && '기타'
              : languageRedux === 1
              ? 'Tất cả'
              : languageRedux === 2
              ? 'All'
              : languageRedux === 3 && '전부',
        },
      ],
    },
    {
      location: '/history',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Lịch sử'
              : languageRedux === 2
              ? 'History'
              : languageRedux === 3 && '기록',
          href: '/history',
        },
        {
          title:
            searchParams.get('p') === '1'
              ? languageRedux === 1
                ? 'Các công việc đã lưu'
                : languageRedux === 2
                ? 'Saved jobs'
                : languageRedux === 3 && '저장된 작업'
              : searchParams.get('p') === '2'
              ? languageRedux === 1
                ? 'Các công việc đã đăng tuyển'
                : languageRedux === 2
                ? 'Posted jobs'
                : languageRedux === 3 && '게시된 작업'
              : searchParams.get('p') === '3'
              ? languageRedux === 1
                ? 'Danh sách bài viết'
                : languageRedux === 2
                ? 'List of articles'
                : languageRedux === 3 && '커뮤니티'
              : searchParams.get('p') === '4'
              ? languageRedux === 1
                ? 'Danh sách ứng viên'
                : languageRedux === 2
                ? 'List of candidates'
                : languageRedux === 3 && '지원자 리스트'
              : searchParams.get('p') === '5'
              ? languageRedux === 1
                ? 'Danh sách công ty'
                : languageRedux === 2
                ? 'List of companies'
                : languageRedux === 3 && '회사  리스트'
              : searchParams.get('p') === '0'
              ? languageRedux === 1
                ? 'Các công việc đã ứng tuyển'
                : languageRedux === 2
                ? 'Apllied jobs'
                : languageRedux === 3 && '지원한 직업들'
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
                : languageRedux === 2
                ? 'All'
                : languageRedux === 3 && '전부'
              : searchParams.get('c') === '2-1'
              ? languageRedux === 1
                ? 'Các công việc chưa đóng'
                : languageRedux === 2
                ? 'Unclosed jobs'
                : languageRedux === 3 && '마감되지 않은 채용정보'
              : searchParams.get('c') === '2-2'
              ? languageRedux === 1
                ? 'Các công việc đã đóng'
                : languageRedux === 2
                ? 'Closed jobs'
                : languageRedux === 3 && '채용이 마감되었습니다'
              : searchParams.get('c') === '3-0'
              ? languageRedux === 1
                ? 'Đã lưu'
                : languageRedux === 2
                ? 'Saved articles'
                : languageRedux === 3 && '저정되기'
              : searchParams.get('c') === '3-1'
              ? languageRedux === 1
                ? 'Bài viết bạn đã tạo'
                : languageRedux === 2
                ? 'Posted articles'
                : languageRedux === 3 && '등록되기'
              : searchParams.get('c') === '5-0'
              ? languageRedux === 1
                ? 'Công ty đã lưu'
                : languageRedux === 2
                ? 'Saved comopanies'
                : languageRedux === 3 && '저장된 회사'
              : searchParams.get('c') === '5-1'
              ? languageRedux === 1
                ? 'Nhà tuyển dụng xem hồ sơ'
                : languageRedux === 2
                ? 'Employers view resumes'
                : languageRedux === 3 && '이력서 열람 회사'
              : '',
          href: '/history',
        },
      ],
    },
    {
      location: '/message',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tin nhắn'
              : languageRedux === 2
              ? 'Message'
              : languageRedux === 3 && '메시지',
        },
      ],
    },
    {
      location: '/new-comunity',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Câu chuyện việc làm'
              : languageRedux === 2
              ? 'Working story'
              : languageRedux === 3 && '워킹스토리',
        },
      ],
    },
    {
      location: '/news-comunity',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tin tức'
              : languageRedux === 2
              ? 'News'
              : languageRedux === 3 && '뉴스',
        },
      ],
    },
    {
      location: '/detail-comunity',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Chi tiết bài viết'
              : languageRedux === 2
              ? 'Article details'
              : languageRedux === 3 && '자세한 게시물',
        },
      ],
    },
    {
      location: '/comunity_create_post',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title: !searchParams.get('post-community')
            ? languageRedux === 1
              ? 'Tạo bài viết mới'
              : languageRedux === 2
              ? 'Creat new post'
              : languageRedux === 3 && '새 글을 만들기'
            : languageRedux === 1
            ? 'Chỉnh sửa bài đăng'
            : languageRedux === 2
            ? 'Edit post'
            : languageRedux === 3 && '게시물 수정',
        },
      ],
    },
    {
      location: '/page-cv',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Hướng dẫn tạo mẫu CV'
              : languageRedux === 2
              ? 'Instructions for creating a sample CV'
              : languageRedux === 3 && '이력서 작성 안내',
        },
      ],
    },
    {
      location: '/templates-cv',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tạo CV'
              : languageRedux === 2
              ? 'Create CV'
              : languageRedux === 3 && '이력서 작성',
        },
      ],
    },
    {
      location: '/profile-cv',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Danh sách CV đã tạo'
              : languageRedux === 2
              ? 'List of created CV'
              : languageRedux === 3 && '이력서 관리',
        },
      ],
    },
    {
      location: '/company-infor',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Trang cá nhân'
              : languageRedux === 2
              ? 'Profile'
              : '개인 페이지',
          href: '/profile',
        },
        {
          title:
            languageRedux === 1
              ? 'Thông tin công ty'
              : languageRedux === 2
              ? 'Company information'
              : languageRedux === 3 && '회사 정보',
        },
      ],
    },
    {
      location: '/candidatesAll',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tìm kiếm ứng viên'
              : languageRedux === 2
              ? 'Search candidates'
              : languageRedux === 3 && '인재 검색',
        },
      ],
    },

    {
      location: '/candidate-new-detail',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Chi tiết thông tin ứng viên'
              : languageRedux === 2
              ? 'Detailed candidate information'
              : languageRedux === 3 && '자세한 인재 정보',
        },
      ],
    },
    {
      location: '/post-detail',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Chi tiết bài đăng'
              : languageRedux === 2
              ? 'Post details'
              : languageRedux === 3 && '자세한 채용 정보',
        },
      ],
    },
    {
      location: '/pdfView',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Chi tiết hồ sơ CV'
              : languageRedux === 2
              ? 'CV detail'
              : languageRedux === 3 && '자세한 이력서',
        },
      ],
    },
    {
      location: '/post',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tạo bài đăng tuyển dụng'
              : languageRedux === 2
              ? 'Create job posting'
              : languageRedux === 3 && '채용공고 등록',
        },
      ],
    },
    {
      location: '/detail-company',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tìm kiếm công ty'
              : languageRedux === 2
              ? 'Search company'
              : languageRedux === 3 && '회사 검색',
          href: '/companyAll',
        },
        {
          title:
            languageRedux === 1
              ? 'Chi tiết công ty'
              : languageRedux === 2
              ? 'Detail Company'
              : languageRedux === 3 && '자세한 회사 정보',
        },
      ],
    },
    {
      location: '/companyAll',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Tìm kiếm công ty'
              : languageRedux === 2
              ? 'Looking company'
              : languageRedux === 3 && '회사 검색',
        },
      ],
    },
    {
      location: '/landing-hijob',
      menu: [
        {
          title:
            languageRedux === 1
              ? 'Trang chủ'
              : languageRedux === 2
              ? 'Home'
              : languageRedux === 3 && '홈',
          href: '/',
        },
        {
          title:
            languageRedux === 1
              ? 'Landing HiJob'
              : languageRedux === 2
              ? 'Landing HiJob'
              : 'HiJob 착륙',
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
