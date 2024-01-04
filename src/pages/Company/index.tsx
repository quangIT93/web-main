import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import { Skeleton, Space } from 'antd';
import { message } from 'antd';

import { useLocation } from 'react-router-dom';

// import component
// @ts-ignore
import EditLogoCompany from './components/EditLogoCompany';
import EditNameTaxCompany from './components/EditNameTaxCompany';
import EditAddressCompany from './components/EditAddressCompany';
import EditPhoneMailCompany from './components/EditPhoneMailCompany';
import EditRoleWebCompany from './components/EditRoleWebCompany';
import EditFieldScaleCompany from './components/EditFieldScaleCompany';
import EditDescripeCompany from './components/EditDescripeCompany';

import ModalEditSuccess from '#components/EditPosted/ModalEditSuccess';
import ModalEditCompanySuccess from './components/ModalEditCompanySuccess';
import ModalUnsaveCompany from './components/ModalUnsaveCompany';
import ModalIntroduceCreateCompany from './components/ModalIntroduceCreateCompany';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
// import languageApi from 'api/languageApi';

// import NotFound from 'pages/NotFound';
import './style.scss';

// inport Api
// import postApi from 'api/postApi';
// import historyRecruiter from 'api/historyRecruiter';
// import { ConsoleSqlOutlined } from '@ant-design/icons'

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import apiCompany from 'api/apiCompany';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';
import EditImageCompany from './components/EditImageCompany';
import { PencilIcon } from '#components/Icons';
import profileApi from 'api/profileApi';
import { setProfileMeCompanyV3 } from 'store/reducer/profileMeCompanyReducerV3';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
import ModalCreateCompanySuccess from './components/ModalCreateCompanySuccess';

export interface FormValues {
  id: string;
  name: string;
  address: string;
  companyLocation: {
    district: {
      province: {
        id: string;
        fullName: string;
      };
      id: string;
      fullName: string;
    };
    id: string;
    fullName: string;
  };
  companyRoleInfomation: {
    id: number;
    nameText: string;
  };
  companyCategory: {
    id: number;
    nameText: string;
  };
  companySizeInfomation: {
    id: number;
    nameText: string;
  };
  taxCode: string;
  phone: string;
  email: string | null;
  website: string | null;
  description: string;
  logoPath: string;
}

export interface FormCompanyValues {
  // id: string;
  name: string;
  address: string;
  wardId: string;
  taxCode: string;
  phone: string;
  email: string | null;
  website: string | null;
  description: string;
  companyRoleId: number | null;
  companySizeId: number | null;
  categoryId: number | null;
  logo: string;
}

export interface FormCompanyImages {
  imagesId: [] | null;
  images: any | null;
}

interface ICompany {
  display: string;
  is_profile: boolean;
}

const Company: React.FC<ICompany> = (props) => {
  const { display, is_profile } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [haveCompany, setHaveCompany] = useState(false);

  const [companyId, setCompanyId] = useState<any>();
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const profileCompanyV3 = useSelector(
    (state: RootState) => state.dataProfileCompanyV3.data,
  );
  const [dataCompany, setDataCompany] = useState<any | null>({
    // id: '',
    name: '',
    address: '',
    companyLocation: '',
    companyRoleInfomation: '',
    companyCategory: '',
    companySizeInfomation: '',
    taxCode: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    logoPath: '',
    images: [],
    deletedImages: [],
  });
  const [fillDistrict, setFillDistrict] = React.useState<any>('');
  const [fillProvince, setFillProvince] = React.useState<any>('');
  const [fillWard, setFillWard] = React.useState<any>('');
  const [fillRole, setFillRole] = React.useState<any>('');
  const [fillActivity, setFillActivity] = React.useState<any>('');
  const [fillSize, setFillSize] = React.useState<any>('');

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [ShowModalUnsave, setShowModalUnsave] = useState(false);
  const [ShowModalFisnishCreateCompany, setShowModalFisnishCreateCompany] =
    useState(false);
  const [isValid, setIsValid] = useState(true);
  // const [language, setLanguageState] = React.useState<any>();
  const dispatch = useDispatch();
  const [openModalEditCompany, setOpenModalEditCompanySuccess] =
    React.useState(false);

  const analytics: any = getAnalytics();

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

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title =
    //   language?.company_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Thông tin công ty'
        : languageRedux === 2
          ? "HiJob - Company's Information"
          : 'HiJob - 회사 정보';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_company' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const getCompanyInforByAccount = async () => {
    try {
      setLoading(true);
      // const result = await apiCompany.getCampanyByAccountApi(
      //    languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      // );
      if (profileCompanyV3.id) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setHaveCompany(true);
        setCompanyId(profileCompanyV3?.id);
        setDataCompany(profileCompanyV3);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setHaveCompany(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileComanyV3();
  }, []);

  useEffect(() => {
    if (profileCompanyV3.length !== 0) {
      getCompanyInforByAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, profileCompanyV3]);

  useEffect(() => {
    if (profileV3.length !== 0 && profileV3.typeRoleData === 0) {
      window.open(`/`, '_parent');
    } else if (!localStorage.getItem('accessToken')) {
      window.open(`/`, '_parent');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('isvalid', isValid);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (isValid === false) {
        const message =
          languageRedux === 1
            ? 'Dữ liệu của bạn chưa được gửi, bạn có chắc chắn muốn rời đi?'
            : languageRedux === 2
              ? 'Your data has not been sent, you definitely want to leave?'
              : languageRedux === 3 &&
              '귀하의 데이터가 전송되지 않았습니다. 나가시겠습니까?';
        event.preventDefault();
        event.returnValue = message || true;
        return message;
      } else {
        return;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isValid]);

  const validURL = (str: string) => {
    // var pattern = new RegExp(
    //   '^(https?:\\/\\/)?' + // protocol
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //   '(\\#[-a-z\\d_]*)?$',
    //   'i',
    // ); // fragment locator
    var pattern = new RegExp(
      /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
    );
    return !!pattern.test(str);
  };

  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // valid values form data
  const validValue = () => {
    if (
      dataCompany?.logoPath === null ||
      dataCompany?.logoPath === '' ||
      dataCompany?.logoPath?.status === 'removed'
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn logo công ty'
            : languageRedux === 2
              ? 'Please select company logo'
              : '회사 로고를 선택해주세요',
        checkForm: false,
        idError: 1,
      };
    }
    if (dataCompany?.name.trim() === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập tên công ty'
            : languageRedux === 2
              ? 'Please enter company name'
              : '회사명을 입력해주세요',
        checkForm: false,
        idError: 2,
      };
    }
    // if (dataCompany?.taxCode === '') {
    //   return {
    //     message: 'Vui lòng nhập mã số thuế công ty',
    //     checkForm: false,
    //   };
    // }
    if (fillProvince === null) {
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
    if (fillWard === null) {
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
    if (dataCompany?.companyLocation === '') {
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
    if (dataCompany?.address === '' || dataCompany?.address.length <= 10) {
      return {
        message:
          languageRedux === 1
            ? 'Địa chỉ phải dài hơn 10 ký tự'
            : languageRedux === 2
              ? 'Address must be longer than 10 characters'
              : '주소는 10자 이상이어야 합니다',
        checkForm: false,
        idError: 6,
      };
    }
    if (
      dataCompany?.phone === '' ||
      (dataCompany?.phone && dataCompany?.phone?.length < 10) ||
      (dataCompany?.phone && dataCompany?.phone?.length > 11)
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Số điện thoại sai định dạng'
            : languageRedux === 2
              ? 'Invalid phone number format'
              : '전화번호 형식이 잘못되었습니다.',
        checkForm: false,
        idError: 7,
      };
    }
    if (dataCompany?.email === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập email công ty'
            : languageRedux === 2
              ? 'Please enter company email'
              : '회사 이메일을 입력해주세요',
        checkForm: false,
        idError: 8,
      };
    }
    if (dataCompany?.email.length > 50) {
      return {
        message:
          languageRedux === 1
            ? 'Email không được vượt quá 50 ký tự'
            : languageRedux === 2
              ? 'Email cannot exceed 50 characters'
              : languageRedux === 3 && '이메일은 50자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 8,
      };
    }
    if (regexCheckEmail.test(dataCompany?.email) === false) {
      return {
        message:
          languageRedux === 1
            ? 'Định dạng email không đúng'
            : languageRedux === 2
              ? 'Incorrect email format'
              : '이메일 형식이 잘못되었습니다.',
        checkForm: false,
        idError: 8,
      };
    }
    if (fillRole === null) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn vai trò của bạn'
            : languageRedux === 2
              ? 'Please select your role'
              : '당신의 역할을 선택해주세요',
        checkForm: false,
        idError: 9,
      };
    }
    if (dataCompany?.companyRoleInfomation === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn vai trò của bạn'
            : languageRedux === 2
              ? 'Please select your role'
              : '당신의 역할을 선택해주세요',
        checkForm: false,
        idError: 9,
      };
    }
    if (dataCompany?.website === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập website công ty'
            : languageRedux === 2
              ? 'Please enter company website'
              : '회사 홈페이지를 입력해주세요',
        checkForm: false,
        idError: 10,
      };
    }
    if (dataCompany?.website.length > 100) {
      return {
        message:
          languageRedux === 1
            ? 'Website không được vượt quá 100 ký tự.'
            : languageRedux === 2
              ? 'Website must not exceed 100 characters.'
              : languageRedux === 3 && '웹사이트는 100자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 10,
      };
    }
    if (validURL(dataCompany?.website) === false) {
      return {
        message:
          languageRedux === 1
            ? 'Định dạng website không chính xác'
            : languageRedux === 2
              ? 'Incorrect website format'
              : '웹사이트 형식이 잘못되었습니다.',
        checkForm: false,
        idError: 10,
      };
    }
    if (fillActivity === null) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn danh mục nghề nghiệp'
            : languageRedux === 2
              ? 'Please select a career category'
              : '직업 카테고리를 선택해주세요.',
        checkForm: false,
        idError: 11,
      };
    }
    if (dataCompany?.companyCategory === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn danh mục nghề nghiệp'
            : languageRedux === 2
              ? 'Please select a career category'
              : '직업 카테고리를 선택해주세요.',
        checkForm: false,
        idError: 11,
      };
    }
    if (fillSize === null) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn quy mô công ty'
            : languageRedux === 2
              ? 'Please select company size'
              : '회사규모를 선택해 주세요',
        checkForm: false,
        idError: 12,
      };
    }
    if (dataCompany?.companySizeInfomation === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn quy mô công ty'
            : languageRedux === 2
              ? 'Please select company size'
              : '회사규모를 선택해 주세요',
        checkForm: false,
        idError: 12,
      };
    }
    if (dataCompany?.description === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập mô tả công ty'
            : languageRedux === 2
              ? 'Please enter company description'
              : '회사 설명을 입력하세요.',
        checkForm: false,
        idError: 13,
      };
    }
    if (dataCompany?.description.length > 4000) {
      return {
        message:
          languageRedux === 1
            ? 'Mô tả không được quá 4000 ký tự.'
            : languageRedux === 2
              ? 'Description must not exceed 4000 characters.'
              : languageRedux === 3 && '설명은 4,000자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 13,
      };
    }

    return {
      message: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleCreateCompany = async (formData: any) => {
    // valid value form data
    const { message, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          const result = await apiCompany.createCampany(formData);
          if (result) {
            // setOpenModalEditPost(true);
            setOpenModalEditCompanySuccess(true);
            setIsValid(true);
            messageApi.open({
              type: 'success',
              content:
                languageRedux === 1
                  ? 'Tạo công ty thành công'
                  : languageRedux === 2
                    ? 'Create successful company'
                    : '성공적인 회사 만들기',
            });

            const resultProfileV3 = await profileApi.getProfileInformationV3(
              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            );
            if (resultProfileV3) {
              dispatch(setProfileMeInformationV3(resultProfileV3));
              // if(resultProfileV3.data.companyInfo !== null && resultProfileV3.data.companyInfo.status === 0){
              //   setShowModalFisnishCreateCompany(true)
              // }
            }

            // console.log("create company result", result);
          } else {
            messageApi.open({
              type: 'error',
              content:
                languageRedux === 1
                  ? 'Tạo công ty không thành công'
                  : languageRedux === 2
                    ? 'Create company failed'
                    : '회사를 만드는 데 실패했습니다.',
            });
          }
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
        const company_upload_avatar = document.getElementById(
          'company_upload_avatar',
        ) as HTMLElement;
        const company_name = document.getElementById(
          'company_name',
        ) as HTMLElement;
        const company_city = document.getElementById(
          'company_city',
        ) as HTMLElement;
        const company_district = document.getElementById(
          'company_district',
        ) as HTMLElement;
        const company_ward = document.getElementById(
          'company_ward',
        ) as HTMLElement;
        const company_address = document.getElementById(
          'company_address',
        ) as HTMLElement;
        const company_phone = document.getElementById(
          'company_phone',
        ) as HTMLElement;
        const company_email = document.getElementById(
          'company_email',
        ) as HTMLElement;
        const company_place_role = document.getElementById(
          'company_place_role',
        ) as HTMLElement;
        const company_website = document.getElementById(
          'company_website',
        ) as HTMLElement;
        const company_place_activity = document.getElementById(
          'company_place_activity',
        ) as HTMLElement;
        const company_place_size = document.getElementById(
          'company_place_size',
        ) as HTMLElement;
        const company_place_des = document.getElementById(
          'company_place_des',
        ) as HTMLElement;
        console.log(idError);

        switch (idError) {
          case 1:
            // company_upload_avatar.focus();
            window.scrollTo({ top: 0 });
            break;
          case 2:
            company_name.focus();
            break;
          case 3:
            company_city.focus();
            break;
          case 4:
            company_district.focus();
            break;
          case 5:
            company_ward.focus();
            break;
          case 6:
            company_address.focus();
            break;
          case 7:
            company_phone.focus();
            break;
          case 8:
            company_email.focus();
            break;
          case 9:
            company_place_role.focus();
            break;
          case 10:
            company_website.focus();
            break;
          case 11:
            company_place_activity.focus();
            break;
          case 12:
            company_place_size.focus();
            break;
          case 13:
            company_place_des.focus();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  };
  const handleUpdateCompany = async (formData: any, formDataImages: any) => {
    // valid value form data
    const { message, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          const result = await apiCompany.updateCampany(companyId, formData);

          const resultImages = await apiCompany.updateCampanyImages(
            companyId,
            formDataImages,
          );

          if (result || resultImages) {
            setOpenModalEditCompanySuccess(true);
            setIsValid(true);
            messageApi.open({
              type: 'success',
              content:
                languageRedux === 1
                  ? 'Cập nhật thông tin công ty thành công'
                  : languageRedux === 2
                    ? 'Updating company information successfully'
                    : '회사 정보가 업데이트되었습니다.',
            });

            setDataCompany((pre: any) => ({ ...pre, images: [] }));
            // console.log("update company result", result);
          } else {
            messageApi.open({
              type: 'error',
              content:
                languageRedux === 1
                  ? 'Lỗi cập nhật hình ảnh công ty'
                  : languageRedux === 2
                    ? 'Error updating company image'
                    : '회사 이미지를 업데이트하는 중에 오류가 발생했습니다.',
            });
          }
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
        const company_upload_avatar = document.getElementById(
          'company_upload_avatar',
        ) as HTMLElement;
        const company_name = document.getElementById(
          'company_name',
        ) as HTMLElement;
        const company_city = document.getElementById(
          'company_city',
        ) as HTMLElement;
        const company_district = document.getElementById(
          'company_district',
        ) as HTMLElement;
        const company_ward = document.getElementById(
          'company_ward',
        ) as HTMLElement;
        const company_address = document.getElementById(
          'company_address',
        ) as HTMLElement;
        const company_phone = document.getElementById(
          'company_phone',
        ) as HTMLElement;
        const company_email = document.getElementById(
          'company_email',
        ) as HTMLElement;
        const company_place_role = document.getElementById(
          'company_place_role',
        ) as HTMLElement;
        const company_website = document.getElementById(
          'company_website',
        ) as HTMLElement;
        const company_place_activity = document.getElementById(
          'company_place_activity',
        ) as HTMLElement;
        const company_place_size = document.getElementById(
          'company_place_size',
        ) as HTMLElement;
        const company_place_des = document.getElementById(
          'company_place_des',
        ) as HTMLElement;
        console.log(idError);

        switch (idError) {
          case 1:
            // company_upload_avatar.focus();
            window.scrollTo({ top: 0 });
            break;
          case 2:
            company_name.focus();
            break;
          case 3:
            company_city.focus();
            break;
          case 4:
            company_district.focus();
            break;
          case 5:
            company_ward.focus();
            break;
          case 6:
            company_address.focus();
            break;
          case 7:
            company_phone.focus();
            break;
          case 8:
            company_email.focus();
            break;
          case 9:
            company_place_role.focus();
            break;
          case 10:
            company_website.focus();
            break;
          case 11:
            company_place_activity.focus();
            break;
          case 12:
            company_place_size.focus();
            break;
          case 13:
            company_place_des.focus();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append('id', String(dataCompany?.id));
    formData.append('name', String(dataCompany?.name.trim()));
    formData.append('address', String(dataCompany?.address));
    formData.append('wardId', String(dataCompany?.companyLocation?.id));
    formData.append('taxCode', String(dataCompany?.taxCode));
    formData.append('phone', String(dataCompany?.phone));
    formData.append('email', String(dataCompany?.email));
    formData.append('website', String(dataCompany?.website));
    formData.append('description', String(dataCompany?.description));
    formData.append(
      'companyRoleId',
      String(dataCompany?.companyRoleInfomation?.id),
    );
    formData.append(
      'companySizeId',
      String(dataCompany?.companySizeInfomation?.id),
    );
    formData.append('categoryId', String(dataCompany?.companyCategory?.id));
    formData.append('logo', dataCompany?.logoPath);
    // formData.append('images', dataCompany?.images);

    !haveCompany &&
      dataCompany.images !== null &&
      dataCompany?.images.forEach((image: any) => {
        formData.append('images', image);
      });

    const formDataImages = new FormData();
    // if (dataCompany?.deletedImages && dataCompany?.deletedImages.length !== 0) {
    //   dataCompany?.deletedImages.forEach((id: any) => {
    //     formDataImages.append('imagesId', id);
    //   });
    // }

    dataCompany.images !== null &&
      dataCompany?.images.forEach((image: any) => {
        formDataImages.append('images', image);
      });
    // setDataCompany((preValue: any) => ({
    //     ...preValue,
    //     images: [],
    //     deletedImages: [],
    // }));

    if (formData) {
      haveCompany
        ? handleUpdateCompany(formData, formDataImages)
        : handleCreateCompany(formData);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      // Kiểm tra xem người dùng đã click bên ngoài container hay chưa
      const container = document.querySelector('.company-container');
      const buttonPost = document.querySelector('.category-dropdown-btn__post');

      const logo = document.querySelector('.nav .logo');

      if (
        (unsavedChanges &&
          !container?.contains(e.target) &&
          logo?.contains(e.target) &&
          buttonPost?.contains(e.target)) ||
        (unsavedChanges &&
          !container?.contains(e.target) &&
          logo?.contains(e.target) &&
          !buttonPost?.contains(e.target))
        // buttonPost?.contains(e.target) &&
      ) {
        e.preventDefault();
        setShowModalUnsave(true);
        setUnsavedChanges(false);
      }
    };

    // Lắng nghe sự kiện click trên toàn bộ trang
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [unsavedChanges]);

  return (
    <div
      className="company-container"
      style={{
        display: display,
        // marginTop: is_profile ? '30px' : '70px',
        // marginTop: is_profile ? '30px' : '0px',
        width: is_profile ? '100%' : 'unset',
      }}
    >
      {contextHolder}
      <div style={{ display: is_profile ? 'none' : 'block' }}>
        {/* <Navbar />
        {location?.pathname === '/company-infor' ? <CategoryDropdown /> : <></>} */}
      </div>
      <div className="company-content">
        <div
          className="company-title"
          style={{
            marginBottom: is_profile ? '24px' : '32px',
          }}
        >
          <div className="company-title_top">
            <h1>
              {languageRedux === 1
                ? 'Thông tin công ty'
                : languageRedux === 2
                  ? "Company's information"
                  : languageRedux === 3 && '회사 정보'}
            </h1>

            <Space
              style={{
                cursor: 'pointer',
                display: is_profile ? 'flex' : 'none',
              }}
              onClick={() => window.open(`/company-infor`, '_parent')}
            >
              <div className="edit-icon">
                <PencilIcon width={15} height={15} />
              </div>

              <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                {languageRedux === 1
                  ? 'Sửa'
                  : languageRedux === 2
                    ? 'Edit'
                    : '수정'}
              </p>
            </Space>
          </div>
          <div
            className="company-title_bottom"
            style={{ display: is_profile ? 'block' : 'none' }}
          >
            <p>
              {languageRedux === 1
                ? 'Bạn cần điền thông tin công ty của mình để đăng tin tuyển dụng, tìm kiếm ứng viên.'
                : languageRedux === 2
                  ? 'You need to fill in your company information to post job vacancies, search for candidates.'
                  : languageRedux === 3 &&
                  '채용 공고 게시 및 후보자 검색을 위해서는 회사 정보를 입력해야 합니다.'}
            </p>
          </div>
        </div>
        <Skeleton loading={loading} active>
          <form action="">
            <EditLogoCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              language={language}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              setIsValid={setIsValid}
            />
            <EditNameTaxCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              setIsValid={setIsValid}
            />
            <EditAddressCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              fillProvince={fillProvince}
              fillDistrict={fillDistrict}
              fillWard={fillWard}
              setFillDistrict={setFillDistrict}
              setFillProvince={setFillProvince}
              setFillWard={setFillWard}
              setIsValid={setIsValid}
            />
            <EditPhoneMailCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              setIsValid={setIsValid}
            />
            <EditRoleWebCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              setFillRole={setFillRole}
              setIsValid={setIsValid}
            />

            <EditFieldScaleCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              setFillActivity={setFillActivity}
              setFillSize={setFillSize}
              setIsValid={setIsValid}
            />
            <EditImageCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              setIsValid={setIsValid}
            />
            <EditDescripeCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
              setUnsavedChanges={setUnsavedChanges}
              setIsValid={setIsValid}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-edit_submitForm"
              style={{ display: is_profile ? 'none' : 'block' }}
            >
              {languageRedux === 1
                ? 'Lưu'
                : languageRedux === 2
                  ? 'Save'
                  : '저장'}
            </button>
          </form>
        </Skeleton>
      </div>
      <ModalEditCompanySuccess
        openModalEditCompany={openModalEditCompany}
        setOpenModalEditCompanySuccess={setOpenModalEditCompanySuccess}
        languageRedux={languageRedux}
        language={language}
      />

      <ModalCreateCompanySuccess
        ShowModalFisnishCreateCompany={ShowModalFisnishCreateCompany}
        setShowModalFisnishCreateCompany={setShowModalFisnishCreateCompany}
        languageRedux={languageRedux}
        language={language}
      />

      <ModalUnsaveCompany
        setShowModalUnsave={setShowModalUnsave}
        ShowModalUnsave={ShowModalUnsave}
        languageRedux={languageRedux}
        handleSubmit={handleSubmit}
      />

      <ModalIntroduceCreateCompany />

      <div style={{ display: is_profile ? 'none' : 'block' }}>
        {/* <RollTop /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
  // } else {
  //     return (
  //         <>
  //             <Skeleton loading={loading} active></Skeleton>
  //             <Skeleton loading={loading} active></Skeleton>
  //             <Skeleton loading={loading} active></Skeleton>
  //             <Skeleton loading={loading} active></Skeleton>
  //             <Skeleton loading={loading} active></Skeleton>
  //             <Skeleton loading={loading} active></Skeleton>
  //             <Skeleton loading={loading} active></Skeleton>
  //             <Skeleton loading={loadingNotFound} active>
  //                 <NotFound />
  //             </Skeleton>
  //         </>
  //     );
  // }
};

export default Company;
