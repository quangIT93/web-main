import React, { useEffect, useState } from 'react';
// @ts-ignore

// import ant
import { Button, Cascader, Divider, Typography, Spin } from 'antd';
import { RootState } from '../../store/reducer/index';
// import component
// @ts-ignore
import SeachLocation from '#components/Candidates/SeachLocation';
import ItemCadidate from '#components/Candidates/ItemCadidate';
// import css
import './style.scss';
import SearchCate from '#components/Candidates/SearchCate';
import SeachEducation from '#components/Candidates/SeachEducation';
import SeachGender from '#components/Candidates/SeachGender';
import SeachAge from '#components/Candidates/SearchAge';
import candidateSearch from 'api/apiCandidates';
import ModalLogin from '#components/Home/ModalLogin';
// import antIcon
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
// scroll data
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import ModalNoteWorker from '#components/Home/NewestGigWorker/ModalNoteWorker';
import ModalNotRecruitment from '#components/Candidates/ModalNotRecruitment';
const CandidatesAll = () => {
  // const listData: any = {
  //   status: 200,
  //   data: {
  //     total: 9,
  //     cvFilters: [
  //       {
  //         accountId: '577af5b4-5cb9-436e-9c31-c45d8fc3e2da',
  //         name: 'Phiên Nguyễn',
  //         updatedAt: 1695702860000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: null,
  //         birthdayData: 949165200000,
  //       },
  //       {
  //         accountId: '6f1761d3-f9ef-44e4-8b65-aa5da720ef86',
  //         name: 'Đình Khôi Đặng',
  //         updatedAt: 1695697642000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [
  //           {
  //             id: '568',
  //             full_name: 'Thành phố Nha Trang',
  //             province_id: '56',
  //           },
  //         ],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: null,
  //         birthdayData: 961693200000,
  //       },
  //       {
  //         accountId: '8b620044-ef15-443e-ae1b-3df84392895e',
  //         name: 'Minh Nhân',
  //         updatedAt: 1695702856000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: null,
  //         birthdayData: 950461200000,
  //       },
  //       {
  //         accountId: 'c9b02f55-52a7-44ee-ad29-4ab3cb7d9c8b',
  //         name: 'Nguyễn Tiến Đạt',
  //         updatedAt: 1695697632000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [],
  //         profilesEducationsData: [{}],
  //         genderData: 'Nam',
  //         imageData: null,
  //         birthdayData: 968346000000,
  //       },
  //       {
  //         accountId: 'd0d75834-7cf1-4cad-b0a8-5be878b42d8a',
  //         name: 'trương thanh huy',
  //         updatedAt: 1695702857000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [
  //           {
  //             id: '718',
  //             full_name: 'Thành phố Thủ Dầu Một',
  //             province_id: '74',
  //           },
  //           {
  //             id: '724',
  //             full_name: 'Thành phố Dĩ An',
  //             province_id: '74',
  //           },
  //           {
  //             id: '725',
  //             full_name: 'Thành phố Thuận An',
  //             province_id: '74',
  //           },
  //         ],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: null,
  //         birthdayData: 949338000000,
  //       },
  //       {
  //         accountId: 'd59a01bd-6b09-4ff8-84b2-e1a278aae891',
  //         name: 'Hòa Quách',
  //         updatedAt: 1695697635000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [
  //           {
  //             id: '268',
  //             full_name: 'Quận Hà Đông',
  //             province_id: '01',
  //           },
  //         ],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: null,
  //         birthdayData: 963766800000,
  //       },
  //       {
  //         accountId: 'ec7e61dc-87bc-4c0d-8eab-5972c273be08',
  //         name: 'Phúc Nguyễn',
  //         updatedAt: 1695702855000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [
  //           {
  //             id: '492',
  //             full_name: 'Quận Hải Châu',
  //             province_id: '48',
  //           },
  //           {
  //             id: '493',
  //             full_name: 'Quận Sơn Trà',
  //             province_id: '48',
  //           },
  //           {
  //             id: '495',
  //             full_name: 'Quận Cẩm Lệ',
  //             province_id: '48',
  //           },
  //         ],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: {
  //           avatar:
  //             'https://gig-app-upload.s3-ap-southeast-1.amazonaws.com/images/avatar/1682932403393-653a6df7-2718-4ce9-9656-89e8b8c7838a.jpg',
  //         },
  //         birthdayData: 950720400000,
  //       },
  //       {
  //         accountId: 'f489ce96-711e-44d7-aab1-e71f9a7d6fe0',
  //         name: 'Your name',
  //         updatedAt: 1695697633000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [
  //           {
  //             id: '917',
  //             full_name: 'Quận Ô Môn',
  //             province_id: '92',
  //           },
  //         ],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: {
  //           avatar:
  //             'https://gig-app-upload.s3-ap-southeast-1.amazonaws.com/images/avatar/1682630302078-c6f9690a-e9ea-41da-a8d2-7cf6be95b479.jpg',
  //         },
  //         birthdayData: 966013200000,
  //       },
  //       {
  //         accountId: 'feb2e1e4-05b8-4113-bc73-80d83884bdb6',
  //         name: 'Trí Huỳnh văn',
  //         updatedAt: 1695697637000,
  //         childCategoriesData: [],
  //         profilesLocationsData: [],
  //         profilesEducationsData: [],
  //         genderData: 'Nam',
  //         imageData: null,
  //         birthdayData: 962816400000,
  //       },
  //     ],
  //     is_over: true,
  //   },
  // };

  const [listData, setListData] = useState<any>([]);
  const [addresses, setAddresses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [educations, setEducations] = useState<number | undefined>();
  const [gender, setGender] = useState<undefined | number>(-1);
  const [ageMin, setAgeMin] = useState<number | null>(18);
  const [ageMax, setAgeMax] = useState<number | null>(35);
  const [page, setPage] = React.useState<any>('0');
  const [reset, setReset] = useState(false);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openModalNotRecruitment, setOpenModalNotRecruitment] = React.useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [hasMore, setHasMore] = React.useState(true);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const getAllCandidates = async () => {
    try {
      setHasMore(true);
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        18,
        page,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setTotal(result.data.total);
        setListData(result.data.cvFilters);
        if (result.data.cvFilters.length < 18) {
          setHasMore(false);
          setPage('0');
        } else if (result.data.cvFilters.length === 0) {
          setHasMore(false);
          setPage('0');
        } else {
          setHasMore(true);
        }
      }
    } catch (error) { }
  };

  console.log('totle', total);

  React.useEffect(() => {
    getAllCandidates();
  }, [languageRedux]);

  // React.useEffect(() => {
  //   if (profileV3.length !== 0 && profileV3.typeRoleData === 0) {
  //     window.open('/', '_parent');
  //   }
  // }, [profileV3]);

  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmitSearchCandidate = async () => {
    try {
      if (ageMin && ageMax && ageMin > ageMax) {
        message.error('Độ tuổi không hợp lệ!');
        return;
      }

      if (
        (ageMin && ageMax && ageMin < 18) ||
        (ageMin && ageMax && ageMax < 18)
      ) {
        message.error('Độ tuổi không hợp lệ!');
        return;
      }

      if (
        (ageMin && ageMax && ageMin > 60) ||
        (ageMin && ageMax && ageMax > 60)
      ) {
        message.error('Độ tuổi không hợp lệ!');
        return;
      }
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        18,
        page,
        'vi',
      );
      setPage('0');
      if (result) {
        setOpen(true);
        setTotal(result.data.total);
        console.log('totle', total);

        setListData(result.data.cvFilters);
        if (result.data.cvFilters.length < 18) {
          setHasMore(false);
          setPage('0');
        } else if (result.data.cvFilters.length === 0) {
          setHasMore(false);
          setPage('0');
        } else {
          setHasMore(true);
        }
      }
    } catch (error) {
      console.log('error', error);
      message.error('Lỗi server!');
      return;
    }
  };

  const handleResetSearchCandidate = () => {
    setAddresses([]);
    setCategories([]);
    setEducations(undefined);
    setGender(-1);
    setAgeMin(18);
    setAgeMax(35);
    setReset(true);
    setOpen(false);
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = parseInt(page) + 1;
      // const url = localStorage.getItem('hotjobApi');
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        19,
        nextPage,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      // const result = await hotJobApi.getHotJobById(
      //   url,
      //   nextPage,
      //   searchParams.get('hotjob-id') === '1' ? 18 : 20,
      //    languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      //   idFilterProvinces,
      // );

      if (result && result.data.cvFilters.length !== 0) {
        setListData((prev: any) => [...prev, ...result?.data.cvFilters]);
        setPage(nextPage);
      } else {
        setHasMore(false);
        setPage('0');
      }
    } catch (error) { }
  };
  const analytics: any = getAnalytics();
  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title =
    //   language?.company_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Tìm kiếm ứng viên'
        : languageRedux === 2
          ? 'HiJob - Search for talent'
          : 'HiJob - 후보자 검색';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/list-candidate' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  // console.log(addresses);
  // console.log(gender);
  // console.log(categories);
  // console.log(educations);

  return (
    <div className="container-candidate">
      {/* <Navbar />
      <CategoryDropdown /> */}
      {contextHolder}
      <div className="candidate">
        <div className="header-candidate">
          <h3>
            {languageRedux === 1
              ? 'Tìm kiếm ứng viên'
              : languageRedux === 2
                ? 'Looking for candidates'
                : languageRedux === 3 && '후보자 검색'}
          </h3>
          <Button
            type="primary"
            onClick={() => {
              if (!localStorage.getItem('accessToken')) {
                setOpenModalLogin(true);
                return;
              }
              if (profileV3.typeRoleData === 0) {
                setOpenModalNotRecruitment(true);
                return;
              }
              window.open(`/history?candidate=4`, '_parent')
            }}
          >
            {languageRedux === 1
              ? 'Danh sách ứng viên đã lưu'
              : languageRedux === 2
                ? 'Saved candidate list'
                : languageRedux === 3 && '저장된 후보자 목록'}
          </Button>
        </div>
        <div className="search-candidate">
          <p>
            {languageRedux === 1
              ? 'Tìm ứng viên phù hợp với công ty của bạn!'
              : languageRedux === 2
                ? 'Find the right candidate for your company!'
                : languageRedux === 3 && '회사에 적합한 후보자를 찾아보세요'}
          </p>
          <div className="list-search">
            {/* <div className="list-search_top">
            </div>
              */}
            <SeachLocation
              setAddresses={setAddresses}
              setReset={setReset}
              reset={reset}
              addresses={addresses}
            />
            <SearchCate
              setCategories={setCategories}
              setReset={setReset}
              reset={reset}
              categories={categories}
            />
            <SeachEducation
              setEducations={setEducations}
              setReset={setReset}
              reset={reset}
            />
            <SeachGender
              setGender={setGender}
              setReset={setReset}
              reset={reset}
              genderValue={gender}
            />
            <SeachAge
              setAgeMin={setAgeMin}
              setAgeMax={setAgeMax}
              ageMin={ageMin}
              ageMax={ageMax}
              setReset={setReset}
              reset={reset}
            />
            <div className="submit-search">
              <div
                className="submit-seach_button seach-button_Confirm"
                onClick={handleSubmitSearchCandidate}
              >
                {languageRedux === 1
                  ? 'Xác nhận'
                  : languageRedux === 2
                    ? 'Confirm'
                    : languageRedux === 3 && '확인'}
              </div>

              <div
                className="submit-seach_button seach-button_Reset"
                onClick={handleResetSearchCandidate}
              >
                {languageRedux === 1
                  ? 'Đặt lại'
                  : languageRedux === 2
                    ? 'Reset'
                    : languageRedux === 3 && '초기화'}
              </div>
            </div>
            {/* <div className="list-search_bottom"></div> */}
          </div>
        </div>
        <div className="list-candidates">
          <div className="list-candidates_title">
            {
              // addresses?.length !== 0 ||
              //   categories?.length !== 0 ||
              //   educations ||
              //   gender !== -1 &&
              open ? (
                <h3>
                  {languageRedux === 1
                    ? 'Kết quả tìm kiếm:'
                    : languageRedux === 2
                      ? 'Found results:'
                      : languageRedux === 3 && '검색 결과'}
                  <span>
                    {` ${total}`}
                    {languageRedux === 1
                      ? ' ứng cử viên'
                      : languageRedux === 2
                        ? ' candidates'
                        : languageRedux === 3 && ' 후보자'}
                  </span>
                </h3>
              ) : (
                <></>
              )
            }
          </div>
          <InfiniteScroll
            dataLength={listData && listData?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
            style={{ overflow: 'unset' }}
          >
            <div className="list-candidate">
              {listData?.map((item: any) => {
                return <ItemCadidate item={item} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <ModalNotRecruitment
        openModalNotRecruitment={openModalNotRecruitment}
        setOpenModalNotRecruitment={setOpenModalNotRecruitment}
      />
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
      {/* <Footer /> */}
    </div>
  );
};

export default CandidatesAll;
