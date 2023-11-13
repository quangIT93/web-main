import React, { useState, FormEvent, useEffect, useRef } from 'react';

import { Switch } from 'antd';
import { Helmet } from 'react-helmet';
// @ts-ignore

//@ts-ignore
import ModalNoteCreatePost from '#components/Post/ModalNoteCreatePost';

import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';

import ModalNotePostedToday from '#components/Post/ModalNotePostedToday';

// import component
import PostFilterSalary from '../../components/Post/PostFilterSalary';
import PostJobCompany from '../../components/Post/PostJobCompany';
import PostAddress from '../../components/Post/PostAddress';
import PostTypeJob from '../../components/Post/PostTypeJob';
import ModalPost from '#components/Post/ModalPost';
import ModalFillDataPost from '../../components/Post/ModalFillDataPost';
import PostPeriodDate from '#components/Post/PostPeriodDate';
import RecruitmentTime from '#components/Post/RecruitmentTime';
import StyleWork from '#components/Post/StyleWork';
import SalaryType from '#components/Post/SalaryType';
import Description from '#components/Post/Description';
import PostImage from '#components/Post/PostImage';

// import PostCategoryIds from '#components/Post/PostCategoryIds'
import PostTime from '#components/Post/PostTime';

import PostNumberPhone from '#components/Post/PostNumberPhone';

import PostCategoryId from '#components/Post/PostCategoryId';

import PostSalaryType from '#components/Post/PostSalaryType';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// import context
// import { HomeValueContext } from 'context/HomeValueContextProvider';

import './style.scss';

// import data
import postApi from 'api/postApi';
// import languageApi from 'api/languageApi';
// import apiCompany from 'api/apiCompany';

import { message } from 'antd';

import { RootState } from '../../store/reducer/index';
import { useDispatch, useSelector } from 'react-redux';
// import { post } from 'validations/lang/vi/post';
// import { postEn } from 'validations/lang/en/post';
import { setLocationApi } from 'store/reducer/locationReducer';
import locationApi from 'api/locationApi';
import profileApi from 'api/profileApi';
import { setProfileMeCompanyV3 } from 'store/reducer/profileMeCompanyReducerV3';

// redux
// import { RootState } from 'store';

// const initPost = {
//   title: '',
//   companyName: '',
//   provinceId: null,
//   districtId: null,
//   wardId: null,
//   address: '',
//   latitude: null,
//   longitude: null,
//   isDatePeriod: 0,
//   startDate: null,
//   endDate: null,
//   startTime: new Date(1970, 0, 2, 0, 0).getTime(),
//   endTime: new Date(1970, 0, 2, 0, 0).getTime(),
//   isWorkingWeekend: 0,
//   isRemotely: 0,
//   salaryMin: 1000,
//   salaryMax: 1000,
//   salaryType: 1,
//   moneyType: 1,
//   description: '',
//   phoneNumber: '',
//   categories: [],
//   images: [],
//   jobTypeId: null,
//   companyResourceId: null,
//   url: '',
//   email: '',
// };

// interface ICategoryIds {
//   id: string;
//   name: string;
// }

export interface FormValues {
  title: string;
  companyName: string;
  provinceId: string | null;
  districtId: string | null;
  wardId: string | null;
  address: string;
  isDatePeriod: number;
  startDate: number | null;
  endDate: number | null;
  // latitude: number;
  // longitude: number;
  startTime: number;
  endTime: number;
  isWorkingWeekend: number;
  isRemotely: number;
  salaryMin: number;
  salaryMax: number;
  salaryType: number;
  moneyType: number;
  jobTypeId: number | null;
  description: string;
  phoneNumber: string;
  email: string;
  categoryIds: string[];
  images: string[];
  // companyResourceId: string
  url: null;
}

// interface Option {
//   id: string;
//   name: string;
//   image: string;
//   default_post_image: string;
// }

const Post: React.FC = () => {
  // const { openCollapseFilter } = useContext(HomeValueContext);

  // const userProfile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch();
  const formValues = {
    title: '',
    companyName: '',
    provinceId: null,
    districtId: null,
    wardId: null,
    address: '',
    latitude: null,
    longitude: null,
    isDatePeriod: 0,
    startDate: null,
    endDate: null,
    startTime: new Date(2023, 0, 2, 0, 0).getTime(),
    endTime: new Date(2023, 0, 2, 0, 0).getTime(),
    isWorkingWeekend: 0,
    isRemotely: 0,
    salaryMin: 1000,
    salaryMax: 1000,
    salaryType: 1,
    moneyType: 1,
    description: '',
    phoneNumber: '',
    categories: [],
    images: [],
    jobTypeId: null,
    // companyResourceId: null,
    url: null,
    email: '',
  };

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [titleJob, setTitleJob] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');

  const [typeJob, setTypeJob] = useState(1);
  const [isPeriodDate, setIsPeriodDate] = useState<number>(1);
  const [startTime, setStartTime] = React.useState<any>(
    new Date(1970, 0, 2, 7, 0).getTime(),
  );

  const [endTime, setEndTime] = React.useState<any>(
    new Date(1970, 0, 2, 17, 0).getTime(),
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const profileCompanyV3 = useSelector(
    (state: RootState) => state.dataProfileCompanyV3.data,
  );
  // const [startTime, setStartTime] = React.useState<string>('00:00');
  // const [endTime, setEndTime] = React.useState<string>('00:00');
  const [startDate, setStartDate] = React.useState<any>(new Date().getTime());
  const [endDate, setEndDate] = React.useState<any>(new Date().getTime());
  const [isWorkingWeekend, setIsWorkingWeekend] = React.useState<number>(0);
  const [isRemotely, setIsRemotely] = React.useState<number>(0);
  // const [salary, setSalary] = React.useState<number[]>([500000, 100000000]);
  const [moneyType, setMoneyType] = React.useState<number>(1);
  const [salaryType, setSalaryType] = React.useState<number>(1);
  const [description, setDescription] = React.useState<string>('');
  // const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [categoriesId, setCategoriesId] = useState<string[]>([]);
  const [address, setAddress] = useState<string>('');
  const [wardId, setWardId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  // const [latitude, SetLatitude] = useState<number>(10.761955);
  // const [longitude, SetLongitude] = useState<number>(106.70183);
  const [salaryMin, setSalaryMin] = React.useState<number>(0);
  const [salaryMax, setSalaryMax] = React.useState<number>(0);
  // modal
  const [openModalPost, setOpenModalPost] = React.useState(false);
  const [openModalFillDataPost, setOpenFillDataPost] =
    React.useState<boolean>(false);
  // check error
  // const [titleError, setTitleError] = useState(false);
  // const [companyError, setCompanyError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const textFieldRef = useRef(null);
  const [openModalNoteCreatePost, setOpenModalNoteCreatePost] = React.useState(
    () => {
      setTimeout(() => {
        return true;
      }, 2000);

      return false;
    },
  );

  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState(false);
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  // fill data
  const [fillWardId, setFillWardId] = React.useState<any>({
    id: '',
    full_name: '',
  });
  const [fillDistrict, setFillDistrict] = React.useState<any>('');
  const [fillProvince, setFillProvince] = React.useState<any>('');
  const [fillCate, setFillCate] = useState<any>([]);

  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const [selectedFillImages, setSelectedFillImages] = React.useState<string[]>(
    [],
  );

  const [checkPost, setCheckPost] = React.useState<boolean>(false);
  const [openCheckposted, setOpenCheckposted] = React.useState<boolean>(false);

  // const [language, setLanguage] = useState<any>();

  // const getlanguageApi = async () => {
  //   if (!localStorage.getItem('accessToken')) {
  //     window.location.replace(`/`);
  //     return;
  //   }
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

  const getProfileComanyV3 = async () => {
    try {
      const result = await profileApi.getProfileCompanyV3(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        dispatch(setProfileMeCompanyV3(result));
      }
    } catch (error) {
      dispatch(setProfileMeCompanyV3([]));
    }
  };

  // submit
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();
    // if () {
    //   setNotiCreateCompany(true)
    //   return;
    // }
    const formData = new FormData();
    formData.append('title', titleJob);
    formData.append('companyName', companyName);
    formData.append('wardId', wardId);
    formData.append('jobTypeId', String(typeJob));
    formData.append('isDatePeriod', String(isPeriodDate));
    if (isPeriodDate === 1) {
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
    }

    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('salaryMin', String(salaryMin.toString().replace(',', '')));
    formData.append('salaryMax', String(salaryMax).toString().replace(',', ''));
    formData.append('isWorkingWeekend', String(isWorkingWeekend));
    formData.append('isRemotely', String(isRemotely));
    formData.append('moneyType', String(moneyType));
    formData.append('salaryType', String(salaryType));
    formData.append('description', description.trim());
    formData.append('address', String(address));
    formData.append('phoneNumber', String(phoneNumber));

    categoriesId.forEach((category: any) => {
      formData.append('categoryIds', category);
    });

    selectedFiles.forEach((image: any) => {
      formData.append('images', image.image);
    });

    // NEW FIELD
    formData.append('email', formValues.email);
    // formData.append('companyResourceId', String(formValues.companyResourceId))
    // formData.append('url', Str1q 1q  1q  1q  1qing(formValues.url))
    formData.append('latitude', String(10.761955));
    formData.append('longitude', String(106.70183));

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    if (formData) {
      createNewPost(formData);
    }
  };

  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        // setDataLocations(result.data);
        dispatch(setLocationApi(result));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllLocaitions();
  }, []);

  // valid values form data
  const validValue = () => {
    if (titleJob === '') {
      return {
        message: language?.post_page?.err_job_title,
        checkForm: false,
        idError: 1,
      };
    }
    if (titleJob.length > 255) {
      return {
        message: languageRedux === 1 ?
          'Tên công việc không được quá 255 ký tự' :
          'The job name must not exceed 255 characters',
        checkForm: false,
        idError: 1,
      };
    }
    if (companyName === '') {
      return {
        message: language?.post_page?.err_company_name,
        checkForm: false,
        idError: 2,
      };
    }
    if (companyName.length > 255) {
      return {
        message: languageRedux === 1 ?
          'Tên công ty không được quá 255 ký tự' :
          'The company name must not exceed 255 characters',
        checkForm: false,
        idError: 2,
      };
    }
    if (fillProvince === '') {
      return {
        message: language?.post_page?.err_location,
        checkForm: false,
        idError: 3,
      };
    }
    if (fillDistrict === null) {
      return {
        message: language?.post_page?.err_location,
        checkForm: false,
        idError: 4,
      };
    }
    if (wardId === '') {
      return {
        message: language?.post_page?.err_location,
        checkForm: false,
        idError: 5,
      };
    }
    if (address === '') {
      return {
        message: language?.post_page?.err_address,
        checkForm: false,
        idError: 6,
      };
    }
    if (categoriesId.length <= 0) {
      return {
        message: language?.post_page?.err_cate,
        checkForm: false,
        idError: 7,
      };
    }
    if (
      (Number(salaryMin) === 0 && salaryType !== 6)
    ) {
      return {
        message: language?.post_page?.err_salary,
        checkForm: false,
        idError: 8,
      };
    }
    if (
      (Number(salaryMax) === 0 && salaryType !== 6)
    ) {
      return {
        message: language?.post_page?.err_salary,
        checkForm: false,
        idError: 9,
      };
    }
    if (Number(salaryMax) < Number(salaryMin)) {
      return {
        message: language?.post_page?.err_verify_salary,
        checkForm: false,
        idError: 10,
      };
    }
    if (phoneNumber === '' || phoneNumber.length < 10) {
      return {
        message: language?.company_page?.err_phone_mess,
        checkForm: false,
        idError: 11,
      };
    }
    if (description === '') {
      return {
        message: language?.company_page?.err_des_mess,
        checkForm: false,
        idError: 12,
      };
    }

    if (startDate > endDate) {
      return {
        message: language?.post_page?.err_date,
        checkForm: false,
        idError: 13,
      };
    }

    // if (startDate === endDate) {
    //   return {
    //     message:
    //       languageRedux === 1
    //         ? 'Ngày bắt đầu không thể bằng ngày kết thúc'
    //         : 'The start date cannot be the same as the end date',
    //     checkForm: false,
    //   };
    // }

    if (startDate < Date.now() && isPeriodDate === 1) {
      return {
        message:
          languageRedux === 1
            ? 'Ngày bắt đầu không được nhỏ hơn thời gian hiện tại'
            : 'The start date cannot be less than the current time',
        checkForm: false,
        idError: 14,
      };
    }

    if (!startDate && isPeriodDate === 1) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập ngày bắt đầu'
            : 'Please enter a start date',
        checkForm: false,
        idError: 14,
      };
    }

    if (!endDate && isPeriodDate === 1) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập ngày kết thúc'
            : 'Please enter an end date',
        checkForm: false,
        idError: 14,
      };
    }

    return {
      message: '',
      checkForm: true,
      idError: 0,
    };
  };

  // post newPost
  const createNewPost = async (formData: any) => {
    // valid value form data
    const { message, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        if (profileV3 && profileV3.companyInfo && !checkPost) {
          if (Array.from(formData.values()).some((value) => value !== '')) {
            const result = await postApi.createPost(formData);
            // const result = await postApi.createPostV3(formData);
            if (result) {
              setOpenModalPost(true);
              setCheckPost(true);
            }
          }
        } else if (profileV3 && !profileV3.companyInfo && !checkPost) {
          setOpenModalNoteCreateCompany(true);
        } else {
          setOpenCheckposted(true);
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
        const job_title = document.getElementById('post_jobTitle_job_title') as HTMLElement;
        const post_job_company = document.getElementById('post_job_company') as HTMLElement;
        const post_job_city = document.getElementById('post_job_city') as HTMLElement;
        const post_job_district = document.getElementById('post_job_district') as HTMLElement;
        const post_job_ward = document.getElementById('post_job_ward') as HTMLElement;
        const post_job_address = document.getElementById('post_job_address') as HTMLElement;
        const post_job_category = document.getElementById('post_job_category') as HTMLElement;
        const post_job_salaryMin = document.getElementById('post_job_salaryMin') as HTMLElement;
        const post_job_salaryMax = document.getElementById('post_job_salaryMax') as HTMLElement;
        const post_job_phone = document.getElementById('post_job_phone') as HTMLElement;
        const post_job_description = document.getElementById('post_job_description') as HTMLElement;
        console.log(idError, fillDistrict);

        switch (idError) {
          case 1:
            job_title.focus();
            break;
          case 2:
            post_job_company.focus();
            break;
          case 3:
            post_job_city.focus();
            break;
          case 4:
            post_job_district.focus();
            break;
          case 5:
            post_job_ward.focus();
            break;
          case 6:
            post_job_address.focus();
            break;
          case 7:
            post_job_category.focus();
            break;
          case 8:
            post_job_salaryMin.focus();
            break;
          case 9:
            post_job_salaryMax.focus();
            break;
          case 10:
            post_job_salaryMax.focus();
            break;
          case 11:
            post_job_phone.focus();
            break;
          case 12:
            post_job_description.focus();
            break;

          default:
            break;
        }

      }
    } catch (error: any) {
      console.error('error', error?.response?.data?.message);
      if (error?.response?.data?.message === 'You only can post 1 job/day') {
        messageApi.open({
          type: 'error',
          content: language?.post_page?.err_1_post_per_day,
        });
      } else if (error?.response?.data?.message === 'Invalid date value') {
        messageApi.open({
          type: 'error',
          content: language?.post_page?.err_date,
        });
      }
    }
  };

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics

    // document.title = language?.post_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Tạo bài đăng tuyển dụng'
        : 'HiJob - Create job posting';
    // document.title = language?.post_page?.title_page;
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_createPost' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

  // console.log('phone', phoneNumber);

  const handleFillCompany = async () => {
    try {
      // const result = await apiCompany.getCampanyByAccountApi(
      //   languageRedux === 1 ? 'vi' : 'en',
      // );
      console.log('profileV3?.companyInfo', profileV3?.companyInfo);
      console.log('profileCompanyV3', profileCompanyV3);

      if (profileV3?.companyInfo) {
        setCompanyName(profileCompanyV3.name);
        setFillDistrict({
          id: profileCompanyV3.companyLocation.district.id,
          full_name: profileCompanyV3.companyLocation.district.fullName,
        });
        setFillProvince({
          id: profileCompanyV3.companyLocation.district.province.id,
          province_fullName:
            profileCompanyV3.companyLocation.district.province.fullName,
        });

        // setSelectedProvince(result.data.companyInfomation.company

        setFillWardId({
          id: profileCompanyV3.companyLocation.id,
          full_name: profileCompanyV3.companyLocation.fullName,
        });
        setWardId(profileCompanyV3.companyLocation.id);

        setAddress(profileCompanyV3.address);
      } else {
        setOpenModalNoteCreateCompany(true);
      }
    } catch (error) { }
  };

  const checkPostedToday = async () => {
    try {
      const result = await postApi.checkPostedToday();
      if (result) {
        if (result.data) {
          setCheckPost(true);
          setOpenCheckposted(true);
          setOpenModalNoteCreatePost(false);
        } else {
          setCheckPost(false);
          setOpenCheckposted(false);
        }
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
    checkPostedToday();
  }, []);

  const handleClickForm = () => {
    if (checkPost) {
      setOpenCheckposted(true);
    }
  };

  const setProfleCompany = async () => {
    try {
      const result = await profileApi.getProfileCompanyV3(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        dispatch(setProfileMeCompanyV3(result));
      }
    } catch (error) {
      console.log('error', error);
      dispatch(setProfileMeCompanyV3([]));
    }
  };

  useEffect(() => {
    if (profileV3?.companyInfo) {
      setProfleCompany();
    }
  }, []);
  useEffect(() => {
    getProfileComanyV3();
  }, [languageRedux]);

  if (localStorage.getItem('accessToken')) {
    return (
      <div className="post">
        {/* <Navbar />
        <CategoryDropdown /> */}
        {contextHolder}
        <div className="post-main">
          <div
            className="post-main_fillData"
          // style={{ textAlign: 'center', display: 'block' }}
          >
            <h1>{language?.profile_page?.create_post}</h1>
            <div className="post-main_switch">
              <h4>{language?.post_page?.auto_fill}</h4>
              <Switch
                checked={openModalFillDataPost}
                // checkedHelmetren=""
                // unCheckedChildren=""
                onChange={() => setOpenFillDataPost(!openModalFillDataPost)}
              />
            </div>
          </div>
          <div className="fill-company" onClick={handleFillCompany}>
            <h3>{language?.post_page?.fill_company}</h3>
          </div>
          <form onSubmit={handleSubmit} onClick={handleClickForm}>
            <PostJobCompany
              setTitleJob={setTitleJob}
              setCompanyName={setCompanyName}
              // titleError={titleError}
              // companyError={companyError}
              titleJob={titleJob}
              companyName={companyName}
              language={language}
            />
            <PostAddress
              setWardId={setWardId}
              setAddress={setAddress}
              fillWardId={fillWardId}
              address={address}
              wardId={wardId}
              fillProvince={fillProvince}
              fillDistrict={fillDistrict}
              setFillDistrict={setFillDistrict}
              setFillProvince={setFillProvince}
              setFillWardId={setFillWardId}
              language={language}
              languageRedux={languageRedux}
            />
            <PostImage
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              setSelectedImages={setSelectedImages}
              selectedImages={selectedImages}
              selectedFillImages={selectedFillImages}
              languageRedux={languageRedux}
              language={language}
            />
            <PostTypeJob
              typeJob={typeJob}
              setTypeJob={setTypeJob}
              language={language}
              languageRedux={languageRedux}
            />
            <PostPeriodDate
              setIsPeriodDate={setIsPeriodDate}
              isPeriodDate={isPeriodDate}
              language={language}
              languageRedux={languageRedux}
            />
            {isPeriodDate === 1 ? (
              <RecruitmentTime
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                language={language}
                languageRedux={languageRedux}
              />
            ) : (
              <></>
            )}
            <StyleWork
              isWorkingWeekend={isWorkingWeekend}
              isRemotely={isRemotely}
              setIsWorkingWeekend={setIsWorkingWeekend}
              setIsRemotely={setIsRemotely}
              language={language}
            />
            <PostTime
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              language={language}
            />

            <PostCategoryId
              setCategoriesId={setCategoriesId}
              categoriesId={categoriesId}
              fillCate={fillCate}
              setFillCate={setFillCate}
              language={language}
              languageRedux={languageRedux}
            />

            <SalaryType
              salaryType={salaryType}
              setSalaryType={setSalaryType}
              language={language}
              languageRedux={languageRedux}
            />

            <PostSalaryType
              setMoneyType={setMoneyType}
              moneyType={moneyType}
              salaryType={salaryType}
              language={language}
            />

            <PostFilterSalary
              salaryMin={salaryMin}
              setSalaryMin={setSalaryMin}
              salaryMax={salaryMax}
              setSalaryMax={setSalaryMax}
              salaryType={salaryType}
              language={language}
              languageRedux={languageRedux}
            />

            <PostNumberPhone
              phone={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              language={language}
              languageRedux={languageRedux}
            />
            <Description
              setDescription={setDescription}
              description={description}
              language={language}
              languageRedux={languageRedux}
            />
            {/* <EditText /> */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-submitForm"
            >
              {language?.save}
            </button>
          </form>
        </div>
        {/* <Footer /> */}
        {/* <RollTop /> */}
        <ModalPost
          openModalPost={openModalPost}
          setOpenModalPost={setOpenModalPost}
        />

        <ModalNotePostedToday
          setOpenCheckposted={setOpenCheckposted}
          openCheckposted={openCheckposted}
        />
        <ModalNoteCreatePost
          setOpenModalNoteCreatePost={setOpenModalNoteCreatePost}
          openModalNoteCreatePost={openModalNoteCreatePost}
          language={language}
        />
        <ModalNoteCreateCompany
          openModalNoteCreateCompany={openModalNoteCreateCompany}
          setOpenModalNoteCreateCompany={setOpenModalNoteCreateCompany}
        />
        <ModalFillDataPost
          setOpenFillDataPost={setOpenFillDataPost}
          openModalFillDataPost={openModalFillDataPost}
          setTitleJob={setTitleJob}
          setCompanyName={setCompanyName}
          setFillWardId={setFillWardId}
          setAddress={setAddress}
          setFillDistrict={setFillDistrict}
          setFillProvince={setFillProvince}
          setTypeJob={setTypeJob}
          setIsPeriodDate={setIsPeriodDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setIsWorkingWeekend={setIsWorkingWeekend}
          setIsRemotely={setIsRemotely}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setPhoneNumber={setPhoneNumber}
          setSalaryMin={setSalaryMin}
          setSalaryMax={setSalaryMax}
          setDescription={setDescription}
          setWardId={setWardId}
          setCategoriesId={setCategoriesId}
          setFillCate={setFillCate}
          setSelectedImages={setSelectedImages}
          setSalaryType={setSalaryType}
          setMoneyType={setMoneyType}
          setSelectedFillImages={setSelectedFillImages}
          language={language}
          languageRedux={languageRedux}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Post;
