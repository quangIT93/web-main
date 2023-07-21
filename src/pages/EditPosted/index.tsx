import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import moment, { Moment } from 'moment';
import { Skeleton } from 'antd';
import { message } from 'antd';
// import component
// @ts-ignore
import { Navbar } from '#components';
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

  const [searchParams, setSearchParams] = useSearchParams();

  const [dataPostById, setDataPostById] = useState<any>(null);

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

  const [dataPostAccount, SetDataPostAccount] = React.useState<any>([]);

  const [openModalEditPost, setOpenModalEditPost] = React.useState(false);

  const [loadingNotFound, setLoadingNotFound] = React.useState(false);

  const postId = parseInt(searchParams.get('postId') ?? '');

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
        phoneNumber: dataPostById.phone_contact.replace('+84', '0'),
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
  }, [dataPostById]);

  const [messageApi, contextHolder] = message.useMessage();
  const memoizedEditDataPosted = React.useMemo(
    () => editDataPosted,
    [editDataPosted],
  );

  const getDataPosted = async () => {
    try {
      const result = await postApi.getPostbyId(postId);
      if (result) {
        dataPostAccount?.map((value: any) => {
          if (value.post_id === postId) {
            setDataPostById(result.data);
          }
        });
      }
    } catch (error) {
      console.error(error);
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
  }, [dataPostAccount]);

  const getAllPostAccount = async () => {
    try {
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        0,
        20,
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
  }, []);

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();
    console.log('sssss', editDataPosted?.startDate);
    console.log(
      ' String(editDataPosted?.startDate) !== null',
      String(editDataPosted?.startDate) !== 'null',
    );
    console.log(
      'rrr',
      String(editDataPosted?.startDate) !== null
        ? String(editDataPosted?.startDate)
        : 'String(moment(new Date()).valueOf())',
    );
    console.log('xxx', String(moment(new Date()).valueOf()));
    const formData = new FormData();
    formData.append('id', String(editDataPosted?.id));
    formData.append('title', String(editDataPosted?.title));
    formData.append('companyName', String(editDataPosted?.company_name));
    formData.append('wardId', String(editDataPosted?.ward_id));
    formData.append('jobTypeId', String(editDataPosted?.jobTypeId));
    formData.append('isDatePeriod', String(editDataPosted?.isDatePeriod));
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
    console.log('editDataPosted', editDataPosted);
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
        message: 'Vui lòng nhập tên công việc',
        checkForm: false,
      };
    }
    if (editDataPosted?.company_name === '') {
      return {
        message: 'Vui lòng nhập tên công ty',
        checkForm: false,
      };
    }
    if (editDataPosted?.title === '') {
      return {
        message: 'Vui lòng nhập dia chi',
        checkForm: false,
      };
    }
    if (editDataPosted?.ward_id === '') {
      return {
        message: 'Vui lòng chọn tỉnh thành phố',
        checkForm: false,
      };
    }
    if (
      editDataPosted?.categoryIds &&
      editDataPosted?.categoryIds?.length <= 0
    ) {
      return {
        message: 'Vui lòng chọn danh mục nghề nghiệp',
        checkForm: false,
      };
    }
    if (
      (Number(editDataPosted?.salaryMax) === 0 &&
        editDataPosted?.salaryType !== 6) ||
      (Number(editDataPosted?.salaryMin) === 0 &&
        editDataPosted?.salaryType !== 6)
    ) {
      return {
        message: 'Vui lòng nhập mức lương',
        checkForm: false,
      };
    }
    if (Number(editDataPosted?.salaryMax) < Number(editDataPosted?.salaryMin)) {
      return {
        message: 'Lương tối đa phải lớn hơn lương tối thiểu',
        checkForm: false,
      };
    }
    if (
      editDataPosted?.phoneNumber === '' ||
      (editDataPosted?.phoneNumber &&
        editDataPosted?.phoneNumber?.length < 10) ||
      (editDataPosted?.phoneNumber && editDataPosted?.phoneNumber?.length > 11)
    ) {
      return {
        message: 'Số điện thoại sai định dạng',
        checkForm: false,
      };
    }
    if (editDataPosted?.description === '') {
      return {
        message: 'Vui lòng nhập mô tả công việc',
        checkForm: false,
      };
    }

    return {
      message: '',
      checkForm: true,
    };
  };

  const createNewPost = async (formData: any) => {
    // valid value form data
    const { message, checkForm } = validValue();
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
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  if (dataPostById) {
    return (
      <div className="edit-posted">
        {contextHolder}
        <Navbar />
        <div className="edit-posted_main">
          <h1>Chỉnh sửa bài đăng tuyển dụng</h1>
          <Skeleton loading={loading} active>
            <form action="">
              <EditPostJobCompany
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />

              <EditPostAddress
                dataPostById={dataPostById}
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />

              <EditPostImage
                editDataPosted={memoizedEditDataPosted}
                setEditDataPosted={setEditDataPosted}
                dataPosted={dataPostById?.images}
              />

              <EditPostTypeJob
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />

              <EditPostPeriodDate
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />
              {editDataPosted?.isDatePeriod === 1 ? (
                <EditRecruitmentTime
                  setEditDataPosted={setEditDataPosted}
                  editDataPosted={memoizedEditDataPosted}
                />
              ) : (
                <></>
              )}
              {editDataPosted?.startTime ? (
                <EditStyleWork
                  setEditDataPosted={setEditDataPosted}
                  editDataPosted={memoizedEditDataPosted}
                />
              ) : (
                <></>
              )}

              <EditPostTime
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />
              <EditPostCategoryId
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                dataPost={dataPostById?.categories}
              />

              <EditSalaryType
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />

              <EditPostTypeSalary
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                salaryType={editDataPosted?.salaryType}
              />

              <EditPostFilterSalary
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
                salaryType={editDataPosted?.salaryType}
                dataOld={dataPostById}
              />

              <EditPostNumberPhone
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />

              <EditDescription
                setEditDataPosted={setEditDataPosted}
                editDataPosted={memoizedEditDataPosted}
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn-edit_submitForm"
              >
                Lưu chỉnh sửa
              </button>
            </form>
          </Skeleton>
        </div>
        <ModalEditSuccess
          openModalEditPost={openModalEditPost}
          setOpenModalEditPost={setOpenModalEditPost}
        />
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <Skeleton loading={loading} active></Skeleton>
        <Skeleton loading={loading} active></Skeleton>
        <Skeleton loading={loading} active></Skeleton>
        <Skeleton loading={loading} active></Skeleton>
        <Skeleton loading={loading} active></Skeleton>
        <Skeleton loading={loading} active></Skeleton>
        <Skeleton loading={loading} active></Skeleton>
        <Skeleton loading={loadingNotFound} active>
          <NotFound />
        </Skeleton>
      </>
    );
  }
};

export default EditPosted;
