import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
// import moment, { Moment } from 'moment';
import { Skeleton, Space } from 'antd';
import { message } from 'antd';

import { useLocation } from 'react-router-dom';

// import component
// @ts-ignore
import { Navbar } from '#components';
import EditLogoCompany from './components/EditLogoCompany';
import EditNameTaxCompany from './components/EditNameTaxCompany';
import EditAddressCompany from './components/EditAddressCompany';
import EditPhoneMailCompany from './components/EditPhoneMailCompany';
import EditRoleWebCompany from './components/EditRoleWebCompany';
import EditFieldScaleCompany from './components/EditFieldScaleCompany';
import EditDescripeCompany from './components/EditDescripeCompany';

import ModalEditSuccess from '#components/EditPosted/ModalEditSuccess';
import ModalEditCompanySuccess from './components/ModalEditCompanySuccess';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import languageApi from 'api/languageApi';

import RollTop from '#components/RollTop';

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
import CategoryDropdown from '#components/CategoryDropdown';

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
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
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
    deleteImages: [],
  });
  // const [language, setLanguageState] = React.useState<any>();
  const location = useLocation();
  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? 'vi' : 'en',
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);
  // console.log('dataCompany', dataCompany);
  const [openModalEditCompany, setOpenModalEditCompanySuccess] =
    React.useState(false);

  // const [loadingNotFound, setLoadingNotFound] = React.useState(false);

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title =
    //   language?.company_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Thông tin công ty'
        : "HiJob - Company's Information";
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
      //   languageRedux === 1 ? 'vi' : 'en',
      // );
      if (profileV3?.companyInfomation !== null) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setHaveCompany(true);
        setCompanyId(profileV3?.companyInfomation?.id);
        setDataCompany(profileV3?.companyInfomation);
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
    if (profileV3.length !== 0) {
      getCompanyInforByAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, profileV3]);

  useEffect(() => {
    if (roleRedux === 0) {
      window.open(`/`, '_parent');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("dataCompany api: ", dataCompany);

  const validURL = (str: string) => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };

  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // valid values form data
  const validValue = () => {
    if (
      dataCompany?.logoPath === '' ||
      dataCompany?.logoPath?.status === 'removed'
    ) {
      return {
        message: language?.company_page?.err_logo_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.name.trim() === '') {
      return {
        message: language?.company_page?.err_name_mess,
        checkForm: false,
      };
    }
    // if (dataCompany?.taxCode === '') {
    //   return {
    //     message: 'Vui lòng nhập mã số thuế công ty',
    //     checkForm: false,
    //   };
    // }
    if (dataCompany?.companyLocation === '') {
      return {
        message: language?.company_page?.err_location_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.address === '' || dataCompany?.address.length <= 10) {
      return {
        message: language?.company_page?.err_address_mess,
        checkForm: false,
      };
    }
    if (
      dataCompany?.phone === '' ||
      (dataCompany?.phone && dataCompany?.phone?.length < 10) ||
      (dataCompany?.phone && dataCompany?.phone?.length > 11)
    ) {
      return {
        message: language?.company_page?.err_phone_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.email === '') {
      return {
        message: language?.company_page?.err_email_mess,
        checkForm: false,
      };
    }
    if (regexCheckEmail.test(dataCompany?.email) === false) {
      return {
        message: language?.company_page?.err_verify_email_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.companyRoleInfomation === '') {
      return {
        message: language?.company_page?.err_role_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.website === '') {
      return {
        message: language?.company_page?.err_web_mess,
        checkForm: false,
      };
    }
    if (validURL(dataCompany?.website) === false) {
      return {
        message: language?.company_page?.err_verify_web_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.companyCategory === '') {
      return {
        message: language?.company_page?.err_cate_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.companySizeInfomation === '') {
      return {
        message: language?.company_page?.err_size_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.description === '') {
      return {
        message: language?.company_page?.err_des_mess,
        checkForm: false,
      };
    }

    return {
      message: '',
      checkForm: true,
    };
  };

  const handleCreateCompany = async (formData: any) => {
    // valid value form data
    const { message, checkForm } = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          const result = await apiCompany.createCampany(formData);
          if (result) {
            // setOpenModalEditPost(true);
            setOpenModalEditCompanySuccess(true);
            messageApi.open({
              type: 'success',
              content: language?.company_page?.create_success,
            });
            // console.log("create company result", result);
          } else {
            messageApi.open({
              type: 'error',
              content: language?.company_page?.create_error,
            });
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
  const handleUpdateCompany = async (formData: any) => {
    // valid value form data
    const { message, checkForm } = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          const result = await apiCompany.updateCampany(companyId, formData);
          if (result) {
            setOpenModalEditCompanySuccess(true);
            messageApi.open({
              type: 'success',
              content: language?.company_page?.update_success,
            });
            // console.log("update company result", result);
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
    formData.append('images', dataCompany?.images);

    // setDataCompany((preValue: any) => ({
    //     ...preValue,
    //     images: [],
    //     deletedImages: [],
    // }));
    if (formData) {
      haveCompany
        ? handleUpdateCompany(formData)
        : handleCreateCompany(formData);
    }
  };

  // if (dataPostById) {
  return (
    <div
      className="company-container"
      style={{
        display: display,
        // marginTop: is_profile ? '30px' : '70px',
        marginTop: is_profile ? '30px' : '100px',
        width: is_profile ? '100%' : 'unset',
      }}
    >
      {contextHolder}
      <div style={{ display: is_profile ? 'none' : 'block' }}>
        <Navbar />
        {location?.pathname === '/company-infor' ? <CategoryDropdown /> : <></>}
      </div>
      <div
        className="company-content"
        style={{
          padding: is_profile ? '0px' : '50px 0px',
        }}
      >
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
                : "Company's information"}
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
                {language?.edit}
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
                : 'You need to fill in your company information to post job vacancies, search for candidates.'}
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
            />
            <EditNameTaxCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditAddressCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditPhoneMailCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditRoleWebCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />

            <EditFieldScaleCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditImageCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditDescripeCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-edit_submitForm"
              style={{ display: is_profile ? 'none' : 'block' }}
            >
              {language?.save}
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
      <div style={{ display: is_profile ? 'none' : 'block' }}>
        <RollTop />
        <Footer />
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
