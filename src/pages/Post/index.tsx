import React, { useState, FormEvent, useEffect, useRef } from 'react';

// import { Switch } from 'antd';
// import { Helmet } from 'react-helmet';
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

import { Checkbox, Typography, message } from 'antd';

import { RootState } from '../../store/reducer/index';
import { useDispatch, useSelector } from 'react-redux';
// import { post } from 'validations/lang/vi/post';
// import { postEn } from 'validations/lang/en/post';
import { setLocationApi } from 'store/reducer/locationReducer';
import locationApi from 'api/locationApi';
import profileApi from 'api/profileApi';
import { setProfileMeCompanyV3 } from 'store/reducer/profileMeCompanyReducerV3';
import ModalNotiValidateCompany from '#components/Post/ModalNotiValidateCompany';
//@ts-ignore
import { FillDataPost } from '#components/Icons';
import apiCompany from 'api/apiCompany';
import apiVideoShort from 'api/apiVideoShort';
import { Link } from 'react-router-dom';

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
const { Text } = Typography;
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
    startTime: new Date(
      new Date(1970, 0, 2, 7, 0).setHours(7, 0, 0, 0),
    ).getTime(),
    endTime: new Date(
      new Date(1970, 0, 2, 7, 0).setHours(17, 0, 0, 0),
    ).getTime(),
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
    // new Date(2000, 0, 2, 7, 0).getTime(),
    new Date(new Date(1970, 0, 2, 7, 0).setHours(7, 0, 0, 0)).getTime(),
  );

  const [endTime, setEndTime] = React.useState<any>(
    // new Date(1970, 0, 2, 17, 0).getTime(),
    new Date(new Date(1970, 0, 2, 7, 0).setHours(17, 0, 0, 0)).getTime(),
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const profileCompanyV3 = useSelector(
    (state: RootState) => state.dataProfileCompanyV3.data,
  );
  // const [startTime, setStartTime] = React.useState<string>('00:00');
  // const [endTime, setEndTime] = React.useState<string>('00:00');
  const currentDate = new Date();

  // Đặt giờ, phút, giây và miligiây
  currentDate.setHours(23, 59, 59, 999);

  const [startDate, setStartDate] = React.useState<any>(
    new Date(new Date().setHours(23, 59, 0, 999)).getTime(),
  );

  const [endDate, setEndDate] = React.useState<any>(
    new Date(new Date().setHours(23, 59, 59, 999)).getTime(),
  );
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

  const [openModalNoteValidateCompany, setOpenModalNoteValidateCompany] =
    React.useState<any>(false);

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
  const [createVideo, setCreateVideo] = React.useState<boolean>(false);
  const [checkPost, setCheckPost] = React.useState<boolean>(false);
  const [openCheckposted, setOpenCheckposted] = React.useState<boolean>(false);
  const [isValidSubmit, setIsValidSubmit] = useState(true);
  // const [language, setLanguage] = useState<any>();
  const [oldDescription, setOldDescription] = useState<any>('');
  // const getlanguageApi = async () => {
  //   if (!localStorage.getItem('accessToken')) {
  //     window.location.replace(`/`);
  //     return;
  //   }
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        dispatch(setProfileMeCompanyV3(result));
      }
    } catch (error) {
      dispatch(setProfileMeCompanyV3([]));
    }
  };

  // console.log(isValidSubmit);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (isValidSubmit === false) {
        const message =
          languageRedux === 1
            ? 'Dữ liệu của bạn chưa được gửi, bạn có chắc chắn muốn rời đi?'
            : languageRedux === 2
              ? 'Your data has not been sent, you definitely want to leave?'
              : languageRedux === 3
                ? '귀하의 데이터가 전송되지 않았습니다. 나가시겠습니까?'
                : 'Dữ liệu của bạn chưa được gửi, bạn có chắc chắn muốn rời đi?';
        event.preventDefault();
        event.returnValue = message || true;
        return message;
      } else {
        return;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isValidSubmit]);

  // submit
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();
    // if () {
    //   setNotiCreateCompany(true)
    //   return;
    // }
    console.log('startTime', startTime);
    console.log(
      'endTime',
      new Date(new Date().setHours(23, 59, 59, 999)).getTime(),
    );

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

    if (formData) {
      createNewPost(formData);
    }
  };

  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation(
        languageRedux === 1
          ? 'vi'
          : languageRedux === 2
            ? 'en'
            : languageRedux === 3
              ? 'ko'
              : 'vi',
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
  }, [languageRedux]);

  // valid values form data
  const validValue = () => {
    console.log(startDate < Date.now());
    if (titleJob === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập tên công việc'
            : languageRedux === 2
              ? 'Please enter job name'
              : languageRedux === 3 && '직업 이름을 입력해주세요',
        checkForm: false,
        idError: 1,
      };
    }
    if (titleJob.length > 255) {
      return {
        message:
          languageRedux === 1
            ? 'Tên công việc không được quá 255 ký tự'
            : languageRedux === 2
              ? 'The job name must not exceed 255 characters'
              : languageRedux === 3 && '작업 이름은 255자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (companyName === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập tên công ty'
            : languageRedux === 2
              ? 'Please enter company name'
              : languageRedux === 3 && '회사명을 입력해주세요',
        checkForm: false,
        idError: 2,
      };
    }
    if (companyName.length > 255) {
      return {
        message:
          languageRedux === 1
            ? 'Tên công ty không được quá 255 ký tự'
            : languageRedux === 2
              ? 'The company name must not exceed 255 characters'
              : languageRedux === 3 && '회사 이름은 255자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 2,
      };
    }
    if (fillProvince === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn tỉnh thành phố'
            : languageRedux === 2
              ? 'Please select a city'
              : '시와 도를 선택해주세요.',
        checkForm: false,
        idError: 3,
      };
    }
    if (fillDistrict === null) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn tỉnh thành phố'
            : languageRedux === 2
              ? 'Please select a city'
              : '시와 도를 선택해주세요.',
        checkForm: false,
        idError: 4,
      };
    }
    if (wardId === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn tỉnh thành phố'
            : languageRedux === 2
              ? 'Please select a city'
              : '시와 도를 선택해주세요.',
        checkForm: false,
        idError: 5,
      };
    }
    if (address === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập địa chỉ'
            : languageRedux === 2
              ? 'Please enter your address'
              : '주소를 입력해주세요',
        checkForm: false,
        idError: 6,
      };
    }
    if (categoriesId.length <= 0) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn danh mục nghề nghiệp'
            : languageRedux === 2
              ? 'Please select a career category'
              : '직업 카테고리를 선택해주세요.',
        checkForm: false,
        idError: 7,
      };
    }
    if (Number(salaryMin) === 0 && salaryType !== 6) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập mức lương'
            : languageRedux === 2
              ? 'Please enter salary'
              : '급여를 입력해주세요',
        checkForm: false,
        idError: 8,
      };
    }
    if (Number(salaryMax) === 0 && salaryType !== 6) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập mức lương'
            : languageRedux === 2
              ? 'Please enter salary'
              : '급여를 입력해주세요',
        checkForm: false,
        idError: 9,
      };
    }
    if (Number(salaryMax) < Number(salaryMin)) {
      return {
        message:
          languageRedux === 1
            ? 'Lương tối thiểu không được lớn hơn lương tối đa'
            : languageRedux === 2
              ? 'Minimum cannot be greater than maximum'
              : '최소 금액은 최대 금액보다 클 수 없습니다.',
        checkForm: false,
        idError: 10,
      };
    }
    if (phoneNumber === '' || phoneNumber.length < 10) {
      return {
        message:
          languageRedux === 1
            ? 'Số điện thoại không được bỏ trống và phải ít hơn 10 ký tự.'
            : languageRedux === 2
              ? 'Phone number cannot be blank and must be less than 10 characters.'
              : languageRedux === 3 &&
              '전화번호는 비워둘 수 없으며 10자 미만이어야 합니다.',
        checkForm: false,
        idError: 11,
      };
    }
    if (description === '') {
      return {
        message:
          languageRedux === 1
            ? 'Hãy nhập mô tả công việc.'
            : languageRedux === 2
              ? 'Please enter a job description.'
              : languageRedux === 3 && '직무 내용을 입력해주세요.',
        checkForm: false,
        idError: 12,
      };
    }

    if (startDate > endDate) {
      return {
        message:
          languageRedux === 1
            ? 'Thời gian bắt đầu không được vượt quá Thời gian kết thúc'
            : languageRedux === 2
              ? 'The start date cannot exceed the end date'
              : languageRedux === 3 &&
              '시작 날짜는 종료 날짜를 초과할 수 없습니다.',
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
            : languageRedux === 2
              ? 'The start date cannot be less than the current time'
              : languageRedux === 3 &&
              '시작 날짜는 현재 시각을 초과할 수 없습니다.',
        checkForm: false,
        idError: 13,
      };
    }

    if (!startDate && isPeriodDate === 1) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập ngày bắt đầu'
            : languageRedux === 2
              ? 'Please enter a start date'
              : languageRedux === 3 && '시작일을 입력하세요.',
        checkForm: false,
        idError: 13,
      };
    }

    if (!endDate && isPeriodDate === 1) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập ngày kết thúc'
            : languageRedux === 2
              ? 'Please enter end date'
              : languageRedux === 3 && '종료일을 입력해 주세요',
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
              setIsValidSubmit(true);
              setOpenModalPost(true);
              setCheckPost(true);
              if (createVideo) {
                createVideoPost(result?.data?.postId);
              }
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
        const job_title = document.getElementById(
          'post_jobTitle_job_title',
        ) as HTMLElement;
        const post_job_company = document.getElementById(
          'post_job_company',
        ) as HTMLElement;
        const post_job_city = document.getElementById(
          'post_job_city',
        ) as HTMLElement;
        const post_job_district = document.getElementById(
          'post_job_district',
        ) as HTMLElement;
        const post_job_ward = document.getElementById(
          'post_job_ward',
        ) as HTMLElement;
        const post_job_address = document.getElementById(
          'post_job_address',
        ) as HTMLElement;
        const post_job_category = document.getElementById(
          'post_job_category',
        ) as HTMLElement;
        const post_job_salaryMin = document.getElementById(
          'post_job_salaryMin',
        ) as HTMLElement;
        const post_job_salaryMax = document.getElementById(
          'post_job_salaryMax',
        ) as HTMLElement;
        const post_job_phone = document.getElementById(
          'post_job_phone',
        ) as HTMLElement;
        const post_job_description = document.getElementById(
          'post_job_description',
        ) as HTMLElement;
        const post_job_start_date = document.getElementById(
          'post_job_start_date',
        ) as HTMLElement;
        const post_job_end_date = document.getElementById(
          'post_job_end_date',
        ) as HTMLElement;

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
          case 13:
            post_job_start_date.focus();
            break;
          case 14:
            post_job_end_date.focus();
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
          content:
            languageRedux === 1
              ? 'Bạn chỉ có thể đăng 1 bài trong 1 ngày'
              : languageRedux === 2
                ? 'You can only post 1 post in 1 day'
                : '하루에 1개의 게시물만 게시할 수 있습니다.',
        });
      } else if (error?.response?.data?.message === 'Invalid date value') {
        messageApi.open({
          type: 'error',
          content:
            languageRedux === 1
              ? 'Vui lòng nhập lại ngày làm việc'
              : languageRedux === 2
                ? 'Please enter a business date again'
                : '근무일을 다시 입력해주세요.',
        });
      }
    }
  };

  //create video
  const createVideoPost = async (postId: any) => {
    const formData = new FormData();
    formData.append('postId ', postId);
    // formData.append('linkTiktok ', null);
    // formData.append('linkYoutube ', null);
    // formData.append('image ', null);
    if (formData) {
      try {
        const result = await apiVideoShort.createVideoShort(formData);
      } catch (error) {
        console.log(error);
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
        : languageRedux === 2
          ? 'HiJob - Create job posting'
          : languageRedux === 3
            ? 'HiJob - 채용 공고 만들기'
            : 'HiJob - Tạo bài đăng tuyển dụng';
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
      //    languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      // );

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
        if (result.data && profileV3?.companyInfo?.status === 1) {
          setCheckPost(true);
          setOpenCheckposted(true);
          setOpenModalNoteCreatePost(false);
        } else {
          setCheckPost(false);
          setOpenCheckposted(false);
          setOpenModalNoteCreatePost(true);
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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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

    if (profileV3?.typeRoleData === 0) {
      window.open('/', '_parent');
    }
  }, []);
  useEffect(() => {
    getProfileComanyV3();
  }, [languageRedux]);

  const senMail = () => {
    const subject =
      'Hãy tải lên bài đăng của tôi đã đăng ký hôm nay dưới dạng video tiktok hoặc youtube';
    const content = `Lời khuyên của HIJob:\n
    1. Nội dung video sẽ được tải lên thông tin công việc đăng ký bằng tài khoản email của bạn (có thể mất tới 2 ngày làm việc).\n
    2. Nếu bạn quay một video chi tiết (10-20 giây) và gửi cho chúng tôi, chúng tôi có thể tạo một video tuyển dụng tốt hơn.\n
    3. Nếu không có đủ hình ảnh cho thông tin công việc thì việc tạo video sẽ khó khăn.`;
    const emailBody = encodeURIComponent(`${content}`);
    window.location.href = `mailto:hijob.contact1@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${emailBody}`;
  };

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
            <h1>
              {languageRedux === 1
                ? 'Tạo bài đăng tuyển dụng'
                : languageRedux === 2
                  ? 'Create job posting'
                  : languageRedux === 3
                    ? '채용 공고 만들기'
                    : 'Tạo bài đăng tuyển dụng'}
            </h1>
            <div className="post-main_switch">
              <h4>
                {languageRedux === 1
                  ? 'HiJob sẽ tự động điền tất cả các thông tin công việc trước đó của bạn!'
                  : languageRedux === 2
                    ? 'HiJob will automatically fill all your previous job information!'
                    : languageRedux === 3
                      ? 'HiJob이 자동으로 당신의 이전 직업 정보를 전부 입력하겠습니다!'
                      : 'HiJob sẽ tự động điền tất cả các thông tin công việc trước đó của bạn!'}
              </h4>
              <div
                onClick={() => setOpenFillDataPost(!openModalFillDataPost)}
                style={{
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FillDataPost />
              </div>
            </div>
          </div>
          <div className="fill-company" onClick={handleFillCompany}>
            <h3>
              {languageRedux === 1
                ? 'Điền nhanh thông tin công ty'
                : languageRedux === 2
                  ? 'Auto - Fill in company information'
                  : languageRedux === 3
                    ? '회사정보를 빠르게 입력하세요'
                    : 'Điền nhanh thông tin công ty'}
            </h3>
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
              setIsValidSubmit={setIsValidSubmit}
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
              setIsValidSubmit={setIsValidSubmit}
            />
            <PostImage
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              setSelectedImages={setSelectedImages}
              selectedImages={selectedImages}
              selectedFillImages={selectedFillImages}
              languageRedux={languageRedux}
              language={language}
              setIsValidSubmit={setIsValidSubmit}
            />
            <PostTypeJob
              typeJob={typeJob}
              setTypeJob={setTypeJob}
              language={language}
              languageRedux={languageRedux}
              setIsValidSubmit={setIsValidSubmit}
            />
            <PostPeriodDate
              setIsPeriodDate={setIsPeriodDate}
              isPeriodDate={isPeriodDate}
              language={language}
              languageRedux={languageRedux}
              setIsValidSubmit={setIsValidSubmit}
            />
            {isPeriodDate === 1 ? (
              <RecruitmentTime
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                language={language}
                languageRedux={languageRedux}
                setIsValidSubmit={setIsValidSubmit}
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
              setIsValidSubmit={setIsValidSubmit}
              languageRedux={languageRedux}
            />
            <PostTime
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              language={language}
              setIsValidSubmit={setIsValidSubmit}
              languageRedux={languageRedux}
            />

            <PostCategoryId
              setCategoriesId={setCategoriesId}
              categoriesId={categoriesId}
              fillCate={fillCate}
              setFillCate={setFillCate}
              language={language}
              languageRedux={languageRedux}
              setIsValidSubmit={setIsValidSubmit}
            />

            <SalaryType
              salaryType={salaryType}
              setSalaryType={setSalaryType}
              language={language}
              languageRedux={languageRedux}
              setIsValidSubmit={setIsValidSubmit}
            />

            <PostSalaryType
              setMoneyType={setMoneyType}
              moneyType={moneyType}
              salaryType={salaryType}
              language={language}
              setIsValidSubmit={setIsValidSubmit}
              languageRedux={languageRedux}
            />

            <PostFilterSalary
              salaryMin={salaryMin}
              setSalaryMin={setSalaryMin}
              salaryMax={salaryMax}
              setSalaryMax={setSalaryMax}
              salaryType={salaryType}
              language={language}
              languageRedux={languageRedux}
              setIsValidSubmit={setIsValidSubmit}
            />

            <PostNumberPhone
              phone={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              language={language}
              languageRedux={languageRedux}
              setIsValidSubmit={setIsValidSubmit}
            />
            <Description
              setDescription={setDescription}
              description={description}
              language={language}
              languageRedux={languageRedux}
              setIsValidSubmit={setIsValidSubmit}
              oldDescription={oldDescription}
            />
            {/* <EditText /> */}
            <div className="create-video-wrap">
              <Checkbox
                style={{
                  marginTop: 24,
                }}
                onChange={(e: any) => {
                  setCreateVideo(e.target.checked);
                }}
              >
                {languageRedux === 1
                  ? 'Tạo video cho bài đăng'
                  : languageRedux === 2
                    ? 'Create a video for your post'
                    : '게시물에 대한 비디오 만들기'}
              </Checkbox>
              <Text italic>
                {languageRedux === 1
                  ? 'Hijob sẽ tự động tạo video bài đăng của bạn trên nền tảng Tiktok và Youtube Shorts trong thời gian sớm nhất. Để tạo được video hãy tải lên nhiều hình ảnh trong bài. Hoặc bạn có thể gửi hình ảnh hay video qua địa chỉ email. '
                  : languageRedux === 2
                    ? 'Hijob will automatically create your video posts on the Tiktok and Youtube Shorts platforms as soon as possible. To create a video, upload multiple images in the post. Or you can send pictures or videos via email: '
                    : 'Hijob은 가능한 한 빨리 Tiktok 및 Youtube Shorts 플랫폼에 비디오 게시물을 자동으로 생성합니다. 동영상을 만들려면 공고에 여러 이미지를 업로드하세요. 또는 '}
                <span onClick={senMail} className="create-video-wrap_sentMail">
                  hijob.contact1@gmail.com
                </span>{' '}
                {languageRedux === 3
                  ? '이메일으로 주소를 통해 사진이나 비디오를 보낼 수도 있습니다.'
                  : ''}
              </Text>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-submitForm"
            >
              {languageRedux === 1
                ? 'Lưu'
                : languageRedux === 2
                  ? 'Save'
                  : '저장'}
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

        <ModalNotiValidateCompany
          openModalNoteValidateCompany={openModalNoteValidateCompany}
          setOpenModalNoteValidateCompany={setOpenModalNoteValidateCompany}
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
          setOldDescription={setOldDescription}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Post;
