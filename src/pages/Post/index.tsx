import React, { useState, FormEvent } from 'react';

import { Switch } from 'antd';

// @ts-ignore
import { Navbar } from '#components';

//@ts-ignore
import ModalNoteCreatePost from '#components/Post/ModalNoteCreatePost';

import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';

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

import RollTop from '#components/RollTop';
// import PostCategoryIds from '#components/Post/PostCategoryIds'
import PostTime from '#components/Post/PostTime';

import PostNumberPhone from '#components/Post/PostNumberPhone';

import PostCategoryId from '#components/Post/PostCategoryId';

import PostSalaryType from '#components/Post/PostSalaryType';

import Footer from '../../components/Footer/Footer';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// import context
// import { HomeValueContext } from 'context/HomeValueContextProvider';

import './style.scss';

// import data
import postApi from 'api/postApi';
import apiCompany from 'api/apiCompany';

import { message } from 'antd';

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

  const [openModalNoteCreatePost, setOpenModalNoteCreatePost] =
    React.useState(true);

  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState(false);

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

  // submit
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();
    console.log('selected File', selectedFiles);
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

  // valid values form data
  const validValue = () => {
    if (titleJob === '') {
      return {
        message: 'Vui lòng nhập tên công việc',
        checkForm: false,
      };
    }
    if (companyName === '') {
      return {
        message: 'Vui lòng nhập tên công ty',
        checkForm: false,
      };
    }
    if (address === '') {
      return {
        message: 'Vui lòng nhập dia chi',
        checkForm: false,
      };
    }
    if (wardId === '') {
      return {
        message: 'Vui lòng chọn tỉnh thành phố',
        checkForm: false,
      };
    }
    if (categoriesId.length <= 0) {
      return {
        message: 'Vui lòng chọn danh mục nghề nghiệp',
        checkForm: false,
      };
    }
    if (
      (Number(salaryMax) === 0 && salaryType !== 6) ||
      (Number(salaryMin) === 0 && salaryType !== 6)
    ) {
      return {
        message: 'Vui lòng nhập mức lương',
        checkForm: false,
      };
    }
    if (Number(salaryMax) < Number(salaryMin)) {
      return {
        message: 'Lương tối đa phải lớn hơn lương tối thiểu',
        checkForm: false,
      };
    }
    if (phoneNumber === '' || phoneNumber.length < 10) {
      return {
        message: 'Số điện thoại sai định dạng',
        checkForm: false,
      };
    }
    if (description === '') {
      return {
        message: 'Vui lòng nhập mô tả công việc',
        checkForm: false,
      };
    }

    if (startDate > endDate) {
      return {
        message: 'Bạn đã nhập ngày bắt đầu lớn hơn ngày kết thúc',
        checkForm: false,
      };
    }

    return {
      message: '',
      checkForm: true,
    };
  };

  // post newPost
  const createNewPost = async (formData: any) => {
    // valid value form data
    const { message, checkForm } = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          const result = await postApi.createPost(formData);
          // const result = await postApi.createPostV3(formData);
          if (result) {
            setOpenModalPost(true);
          }
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
    } catch (error: any) {
      console.error('error', error?.response?.data?.message);
      if (error?.response?.data?.message === 'You only can post 1 job/day') {
        messageApi.open({
          type: 'error',
          content: 'Bạn chỉ có thể đăng 1 bài trong 1 ngày',
        });
      } else if (error?.response?.data?.message === 'Invalid date value') {
        messageApi.open({
          type: 'error',
          content: 'Vui lòng nhập lại ngày làm việc',
        });
      }
    }
  };

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    document.title = 'HiJob - Tạo bài đăng tuyển dụng';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_createPost' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('phone', phoneNumber);

  const handleFillCompany = async () => {
    try {
      const result = await apiCompany.getCampanyByAccountApi('vi');
      if (result.data.companyInfomation) {
        setCompanyName(result.data.companyInfomation.name);
        setFillDistrict({
          id: result.data.companyInfomation.companyLocation.district.id,
          full_name:
            result.data.companyInfomation.companyLocation.district.fullName,
        });
        setFillProvince({
          id: result.data.companyInfomation.companyLocation.district.province
            .id,
          name: result.data.companyInfomation.companyLocation.district.province
            .fullName,
        });

        setFillWardId({
          id: result.data.companyInfomation.companyLocation.id,
          full_name: result.data.companyInfomation.companyLocation.fullName,
        });
        setWardId(result.data.companyInfomation.companyLocation.id);

        setAddress(result.data.companyInfomation.address);
      } else {
        setOpenModalNoteCreateCompany(true);
      }
    } catch (error) {}
  };

  console.log('wardId', wardId);

  if (localStorage.getItem('accessToken')) {
    return (
      <div className="post">
        <Navbar />

        {contextHolder}
        <div className="post-main">
          <div
            className="post-main_fillData"
            // style={{ textAlign: 'center', display: 'block' }}
          >
            <h1>Tạo bài đăng tuyển dụng</h1>
            <div className="post-main_switch">
              <h4>
                HiJob sẽ tự động điền tất cả các thông tin công việc trước đó
                của bạn!
              </h4>
              <Switch
                checked={openModalFillDataPost}
                checkedChildren=""
                unCheckedChildren=""
                onChange={() => setOpenFillDataPost(!openModalFillDataPost)}
              />
            </div>
          </div>
          <div className="fill-company" onClick={handleFillCompany}>
            <h3>Điền nhanh thông tin công ty</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <PostJobCompany
              setTitleJob={setTitleJob}
              setCompanyName={setCompanyName}
              // titleError={titleError}
              // companyError={companyError}
              titleJob={titleJob}
              companyName={companyName}
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
            />
            <PostImage
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              setSelectedImages={setSelectedImages}
              selectedImages={selectedImages}
              selectedFillImages={selectedFillImages}
            />
            <PostTypeJob typeJob={typeJob} setTypeJob={setTypeJob} />
            <PostPeriodDate
              setIsPeriodDate={setIsPeriodDate}
              isPeriodDate={isPeriodDate}
            />
            {isPeriodDate === 1 ? (
              <RecruitmentTime
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            ) : (
              <></>
            )}
            <StyleWork
              isWorkingWeekend={isWorkingWeekend}
              isRemotely={isRemotely}
              setIsWorkingWeekend={setIsWorkingWeekend}
              setIsRemotely={setIsRemotely}
            />
            <PostTime
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
            />

            <PostCategoryId
              setCategoriesId={setCategoriesId}
              categoriesId={categoriesId}
              fillCate={fillCate}
              setFillCate={setFillCate}
            />

            <SalaryType salaryType={salaryType} setSalaryType={setSalaryType} />

            <PostSalaryType
              setMoneyType={setMoneyType}
              moneyType={moneyType}
              salaryType={salaryType}
            />

            <PostFilterSalary
              salaryMin={salaryMin}
              setSalaryMin={setSalaryMin}
              salaryMax={salaryMax}
              setSalaryMax={setSalaryMax}
              salaryType={salaryType}
            />

            <PostNumberPhone
              phone={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <Description
              setDescription={setDescription}
              description={description}
            />
            {/* <EditText /> */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-submitForm"
            >
              Đăng
            </button>
          </form>
        </div>
        <Footer />
        <RollTop />
        <ModalPost
          openModalPost={openModalPost}
          setOpenModalPost={setOpenModalPost}
        />

        <ModalNoteCreatePost
          setOpenModalNoteCreatePost={setOpenModalNoteCreatePost}
          openModalNoteCreatePost={openModalNoteCreatePost}
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
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Post;
