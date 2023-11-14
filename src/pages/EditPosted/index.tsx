import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
import queryString from 'query-string';

// import { useSearchParams } from 'react-router-dom';

import moment from 'moment';
import { Skeleton } from 'antd';
import { message } from 'antd';
// import component
// @ts-ignore

import EditPostJobCompany from '#components/EditPosted/EditPostJobCompany';
import EditPostAddress from '#components/EditPosted/EditPostAddress';
import EditPostImage from '#components/EditPosted/EditPostImage';
import EditPostTypeJob from '#components/EditPosted/EditPostTypeJob';
import EditPostPeriodDate from '#components/EditPosted/EditPostPeriodDate';
import EditRecruitmentTime from '#components/EditPosted/EditRecruitmentTime';
import EditStyleWork from '#components/EditPosted/EditStyleWork';
import EditPostTime from '#components/EditPosted/EditPostTime';
import EditPostCategoryId from '#components/EditPosted/EditPostCategoryId';
import EditSalaryType from '#components/EditPosted/EditSalaryType';
import EditPostFilterSalary from '#components/EditPosted/EditPostFilterSalary';
import EditPostNumberPhone from '#components/EditPosted/EditPostNumberPhone';
import EditDescription from '#components/EditPosted/EditDescription';

import EditPostTypeSalary from '#components/EditPosted/EditPostTypeSalary';
import ModalEditSuccess from '#components/EditPosted/ModalEditSuccess';

import NotFound from 'pages/NotFound';

import './style.scss';

// inport Api
import postApi from 'api/postApi';
import historyRecruiter from 'api/historyRecruiter';
// import { ConsoleSqlOutlined } from '@ant-design/icons'

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import languageApi from 'api/languageApi';

import { RootState } from '../../store/reducer/index';
import { useSelector } from 'react-redux';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';

export interface FormValues {
  id: string;
  title: string;
  company_name: string;
  // provinceId: string | null
  // districtId: string | null
  ward_id: string | null;
  address: string;
  isDatePeriod: number;
  startDate: number | null;
  endDate: number | null;
  latitude: number | null;
  longitude: number | null;
  startTime: number | null;
  endTime: number | null;
  isWorkingWeekend: number;
  isRemotely: number;
  salaryMin: number;
  salaryMax: number;
  moneyType: number;
  salaryType: number;
  jobTypeId: number | null;
  description: string;
  phoneNumber: string;
  email: string;
  categoryIds: string[];
  images: string[];
  // // companyResourceId: string
  // url: null
  deletedImages: any[];
}

const EditPosted = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = queryString.parse(window.location.search);
  const [dataPostById, setDataPostById] = useState<any>(null);
  const [fillDistrict, setFillDistrict] = React.useState<any>('');
  const [fillProvince, setFillProvince] = React.useState<any>('');
  const [fillWard, setFillWard] = React.useState<any>('');
  const [editDataPosted, setEditDataPosted] = useState<FormValues | null>({
    id: '',
    title: '',
    company_name: '',
    // provinceId: null,
    // districtId: null,
    ward_id: null,
    address: '',
    latitude: null,
    longitude: null,
    isDatePeriod: 0,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    isWorkingWeekend: 0,
    isRemotely: 0,
    salaryMin: 1000,
    salaryMax: 1000,
    moneyType: 1,
    salaryType: 1,
    description: '',
    phoneNumber: '',
    categoryIds: [],
    images: [],
    jobTypeId: null,
    // // companyResourceId: null,
    // url: null,
    email: '',
    deletedImages: [],
  });
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [dataPostAccount, SetDataPostAccount] = React.useState<any>([]);

  const [openModalEditPost, setOpenModalEditPost] = React.useState(false);

  const [loadingNotFound, setLoadingNotFound] = React.useState(false);

  const [changePage, setChangePage] = React.useState(false);

  const postId = parseInt((queryParams['postId'] as string) ?? '');

  const analytics: any = getAnalytics();

  // const [language, setLanguage] = useState<any>();

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

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title = language?.post_detail_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - HiJob - Chi tiết bài tuyển dụng'
        : 'HiJob - Job Post Details';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_editPost' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

  useEffect(() => {
    if (dataPostById) {
      setEditDataPosted((prevFormValues: any) => ({
        ...prevFormValues,
        id: dataPostById.id,
        isDatePeriod: dataPostById.is_date_period,
        address: dataPostById.address,
        company_name: dataPostById.company_name,
        title: dataPostById.title,
        ward_id: dataPostById.ward_id,
        jobTypeId: dataPostById.job_type.job_type_id,
        endDate: dataPostById.end_date,
        startDate: dataPostById.start_date,
        startTime: dataPostById.start_time,
        endTime: dataPostById.end_time,
        categoryIds: dataPostById.categories.map(
          (cata: any) => cata.child_category_id,
        ),
        salaryMax: dataPostById.salary_max,
        salaryMin: dataPostById.salary_min,
        moneyType: dataPostById.money_type,
        salaryType: dataPostById.salary_type_id,
        phoneNumber:
          dataPostById?.phone_contact?.length > 0
            ? dataPostById?.phone_contact?.replace('+84', '0')
            : '',
        description: dataPostById.description,
        images: [],
        deletedImages: [],
        isWorkingWeekend: dataPostById.is_working_weekend,
        isRemotely: dataPostById.is_remotely,
        email: '',
        latitude: dataPostById.latitude,
        longitude: dataPostById.longitude,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPostById]);

  const [messageApi, contextHolder] = message.useMessage();
  const memoizedEditDataPosted = React.useMemo(
    () => editDataPosted,
    [editDataPosted],
  );

  const getDataPosted = async () => {
    try {
      const result = await postApi.getPostbyId(
        postId,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (
        result &&
        dataPostAccount.find((item: any) => item.post_id === postId)
      ) {
        // dataPostAccount.includes(value.post_id === postId)

        setDataPostById(result.data);

        setChangePage(false);

        // return [];
      } else {
        setChangePage(true);
      }
    } catch (error) {
      console.error(error);
      // window.open('/', 'self');
    }
  };

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setLoadingNotFound(true);

    getDataPosted().then(() => {
      if (isMounted && editDataPosted) {
        setLoading(false);

        setTimeout(() => {
          setLoadingNotFound(false);
        }, 3000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPostAccount, languageRedux]);

  const getAllPostAccount = async () => {
    try {
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        0,
        20,
        '-1',
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        SetDataPostAccount(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllPostAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', String(editDataPosted?.id));
    formData.append('title', String(editDataPosted?.title));
    formData.append('companyName', String(editDataPosted?.company_name));
    formData.append('wardId', String(editDataPosted?.ward_id));
    formData.append('jobTypeId', String(editDataPosted?.jobTypeId));
    formData.append('isDatePeriod', String(editDataPosted?.isDatePeriod));

    if (editDataPosted?.isDatePeriod === 1) {
      formData.append(
        'startDate',
        editDataPosted?.startDate !== null
          ? String(editDataPosted?.startDate)
          : String(moment(new Date()).valueOf()),
      );

      formData.append(
        'endDate',
        editDataPosted?.endDate !== null
          ? String(editDataPosted?.endDate)
          : String(moment(new Date()).valueOf()),
      );
    }
    formData.append('startTime', String(editDataPosted?.startTime));
    formData.append('endTime', String(editDataPosted?.endTime));
    formData.append(
      'salaryMin',
      String(editDataPosted?.salaryMin.toString().replace(',', '')),
    );
    formData.append(
      'salaryMax',
      String(editDataPosted?.salaryMax).toString().replace(',', ''),
    );
    formData.append(
      'isWorkingWeekend',
      String(editDataPosted?.isWorkingWeekend),
    );
    formData.append('isRemotely', String(editDataPosted?.isRemotely));
    formData.append('moneyType', String(editDataPosted?.moneyType));
    formData.append('salaryType', String(editDataPosted?.salaryType));
    formData.append('description', String(editDataPosted?.description.trim()));
    formData.append('address', String(editDataPosted?.address));
    formData.append('phoneNumber', String(editDataPosted?.phoneNumber));

    editDataPosted?.categoryIds.forEach((category: any) => {
      formData.append('categoryIds', category);
    });

    editDataPosted?.images.forEach((image: any) => {
      formData.append('images', image.image);
    });

    editDataPosted?.deletedImages.forEach((image: any) => {
      formData.append('deletedImages', JSON.stringify(image));
    });

    // NEW FIELD
    formData.append('email', String(editDataPosted?.email));
    // formData.append('companyResourceId', String(formValues.companyResourceId))
    // formData.append('url', Str1q 1q  1q  1q  1q  1q  1q  1q  ing(formValues.url))
    formData.append('latitude', String(editDataPosted?.latitude));
    formData.append('longitude', String(editDataPosted?.longitude));

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`)
    // }
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      images: [],
      deletedImages: [],
    }));
    if (formData) {
      createNewPost(formData);
    }
  };

  // valid values form data
  const validValue = () => {
    if (editDataPosted?.title === '') {
      return {
        message: language?.post_page?.err_job_title,
        checkForm: false,
        idError: 1,
      };
    }
    if (editDataPosted?.company_name === '') {
      return {
        message: language?.post_page?.err_company_name,
        checkForm: false,
        idError: 2,
      };
    }
    if (fillProvince === null) {
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
    if (fillWard === null) {
      return {
        message: language?.post_page?.err_location,
        checkForm: false,
        idError: 5,
      };
    }
    // if (editDataPosted?.title === '') {
    //   return {
    //     message: language?.post_page?.err_address,
    //     checkForm: false,
    //   };
    // }
    if (editDataPosted?.ward_id === '') {
      return {
        message: language?.post_page?.err_location,
        checkForm: false,
        idError: 5,
      };
    }
    if (editDataPosted?.address === '') {
      return {
        message: language?.post_page?.err_address,
        checkForm: false,
        idError: 6,
      };
    }

    // if (editDataPosted?.startDateNum.getTime() > editDataPosted?.endDate) {
    //   return {
    //     message: 'Bạn đã nhập ngày bắt đầu lớn hơn ngày kết thúc',
    //     checkForm: false,
    //   };
    // }

    if (
      editDataPosted?.categoryIds &&
      editDataPosted?.categoryIds?.length <= 0
    ) {
      return {
        message: language?.post_page?.err_cate,
        checkForm: false,
        idError: 7,
      };
    }
    // if (
    //   (Number(editDataPosted?.salaryMax) === 0 &&
    //     editDataPosted?.salaryType !== 6) ||
    //   (Number(editDataPosted?.salaryMin) === 0 &&
    //     editDataPosted?.salaryType !== 6)
    // ) {
    //   return {
    //     message: language?.post_page?.err_salary,
    //     checkForm: false,
    //     idError: 8,
    //   };
    // }
    if (
      (Number(editDataPosted?.salaryMin) === 0 && editDataPosted?.salaryType !== 6)
    ) {
      return {
        message: language?.post_page?.err_salary,
        checkForm: false,
        idError: 8,
      };
    }
    if (
      (Number(editDataPosted?.salaryMax) === 0 && editDataPosted?.salaryType !== 6)
    ) {
      return {
        message: language?.post_page?.err_salary,
        checkForm: false,
        idError: 9,
      };
    }
    if (Number(editDataPosted?.salaryMax) < Number(editDataPosted?.salaryMin)) {
      return {
        message: language?.post_page?.err_verify_salary,
        checkForm: false,
        idError: 9,
      };
    }
    if (
      editDataPosted?.phoneNumber === '' ||
      (editDataPosted?.phoneNumber &&
        editDataPosted?.phoneNumber?.length < 10) ||
      (editDataPosted?.phoneNumber && editDataPosted?.phoneNumber?.length > 11)
    ) {
      return {
        message: languageRedux === 1 ?
          "Số điện thoại không được bỏ trống và phải ít hơn 10 ký tự." :
          "Phone number cannot be blank and must be less than 10 characters.",
        checkForm: false,
        idError: 10,
      };
    }
    if (editDataPosted?.description === '') {
      return {
        message: languageRedux === 1 ?
          "Hãy nhập mô tả công việc." :
          "Please enter a job description.",
        checkForm: false,
        idError: 11,
      };
    }
    if (
      editDataPosted?.startDate &&
      editDataPosted?.endDate &&
      editDataPosted?.startDate > editDataPosted?.endDate
    ) {
      return {
        message: language?.post_page?.err_date,
        checkForm: false,
        idError: 12,
      };
    }

    return {
      message: '',
      checkForm: true,
      idError: 0,
    };
  };

  const createNewPost = async (formData: any) => {
    // valid value form data
    const { message, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          const result = await postApi.updatePostedInfo(formData);
          if (result) {
            setOpenModalEditPost(true);
          }
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
        const edit_post_title_job = document.getElementById('edit_post_title_job') as HTMLElement;
        const edit_post_company_name = document.getElementById('edit_post_company_name') as HTMLElement;
        const edit_post_place_city = document.getElementById('edit_post_place_city') as HTMLElement;
        const edit_post_place_district = document.getElementById('edit_post_place_district') as HTMLElement;
        const edit_post_place_ward = document.getElementById('edit_post_place_ward') as HTMLElement;
        const edit_post_place_address = document.getElementById('edit_post_place_address') as HTMLElement;
        const edit_post_category = document.getElementById('edit_post_category') as HTMLElement;
        const edit_post_salaryMin = document.getElementById('edit_post_salaryMin') as HTMLElement;
        const edit_post_salaryMax = document.getElementById('edit_post_salaryMax') as HTMLElement;
        const edit_post_phone = document.getElementById('edit_post_phone') as HTMLElement;
        const edit_post_description = document.getElementById('edit_post_description') as HTMLElement;
        console.log(idError);

        switch (idError) {
          case 1:
            edit_post_title_job.focus();
            break;
          case 2:
            edit_post_company_name.focus();
            break;
          case 3:
            edit_post_place_city.focus();
            break;
          case 4:
            edit_post_place_district.focus();
            break;
          case 5:
            edit_post_place_ward.focus();
            break;
          case 6:
            edit_post_place_address.focus();
            break;
          case 7:
            edit_post_category.focus();
            break;
          case 8:
            edit_post_salaryMin.focus();
            break;
          case 9:
            edit_post_salaryMax.focus();
            break;
          case 10:
            edit_post_phone.focus();
            break;
          case 11:
            edit_post_description.focus();
            break;

          default:
            break;
        }
      }
    } catch (error: any) {
      console.error('error', error);
      if (error?.response?.data?.message === 'Invalid date value') {
        messageApi.open({
          type: 'error',
          content: language?.post_page?.err_date,
        });
      }
    }
  };

  // console.log('editData', editDataPosted);

  if (!changePage) {
    return (
      <div className="edit-posted">
        {contextHolder}
        {/* <Navbar />
        <CategoryDropdown /> */}
        <div className="edit-posted_main">
          <div className="edit-title_post">
            <h1>{language?.post_page?.edit_post}</h1>
          </div>
          <Skeleton loading={loading} active>
            <form action="">
              <EditPostJobCompany
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                language={language}
              />

              <EditPostAddress
                dataPostById={dataPostById}
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                fillProvince={fillProvince}
                fillDistrict={fillDistrict}
                setFillDistrict={setFillDistrict}
                setFillProvince={setFillProvince}
                setFillWard={setFillWard}
                language={language}
                languageRedux={languageRedux}
              />

              <EditPostImage
                editDataPosted={memoizedEditDataPosted}
                setEditDataPosted={setEditDataPosted}
                dataPosted={dataPostById?.images}
                languageRedux={languageRedux}
                language={language}
              />

              <EditPostTypeJob
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                language={language}
                languageRedux={languageRedux}
              />

              <EditPostPeriodDate
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                language={language}
                languageRedux={languageRedux}
              />
              {editDataPosted?.isDatePeriod === 1 ? (
                <EditRecruitmentTime
                  setEditDataPosted={setEditDataPosted}
                  editDataPosted={memoizedEditDataPosted}
                  language={language}
                  languageRedux={languageRedux}
                />
              ) : (
                <></>
              )}
              {editDataPosted?.startTime ? (
                <EditStyleWork
                  setEditDataPosted={setEditDataPosted}
                  editDataPosted={memoizedEditDataPosted}
                  language={language}
                />
              ) : (
                <></>
              )}

              <EditPostTime
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                language={language}
              />
              <EditPostCategoryId
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                dataPost={dataPostById?.categories}
                language={language}
                languageRedux={languageRedux}
              />

              <EditSalaryType
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                language={language}
                languageRedux={languageRedux}
              />

              <EditPostTypeSalary
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                salaryType={editDataPosted?.salaryType}
                language={language}
              />

              <EditPostFilterSalary
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                salaryType={editDataPosted?.salaryType}
                dataOld={dataPostById}
                language={language}
                languageRedux={languageRedux}
              />

              <EditPostNumberPhone
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                language={language}
                languageRedux={languageRedux}
              />

              <EditDescription
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                language={language}
                languageRedux={languageRedux}
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn-edit_submitForm"
              >
                {language?.post_page?.save_edit_post}
              </button>
            </form>
          </Skeleton>
        </div>
        <ModalEditSuccess
          openModalEditPost={openModalEditPost}
          setOpenModalEditPost={setOpenModalEditPost}
          languageRedux={languageRedux}
          language={language}
        />
        {/* <RollTop /> */}
        {/* <Footer /> */}
      </div>
    );
  } else {
    return (
      <div className="edit-posted">
        {/* <Navbar /> */}
        <Skeleton active loading={loading}></Skeleton>
        <Skeleton active loading={loading}></Skeleton>
        <Skeleton active loading={loading}></Skeleton>
        <Skeleton active loading={loading}></Skeleton>
        <Skeleton active loading={loading}></Skeleton>
        <Skeleton active loading={loading}></Skeleton>
        <Skeleton active loading={loading}></Skeleton>
        <Skeleton active loading={loadingNotFound}>
          <NotFound />
        </Skeleton>
      </div>
    );
  }
};

export default EditPosted;
