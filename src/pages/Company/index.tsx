import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
// import moment, { Moment } from 'moment';
import { Skeleton } from 'antd';
import { message } from 'antd';
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

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

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

const Company = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [haveCompany, setHaveCompany] = useState(false);

  const [companyId, setCompanyId] = useState<any>();

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
  });

  // console.log('dataCompany', dataCompany);
  const [openModalEditPost, setOpenModalEditPost] = React.useState(false);

  // const [loadingNotFound, setLoadingNotFound] = React.useState(false);

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    document.title = languageRedux === 1 ?
      company.title_page :
      companyEn.title_page;
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_company' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const getCompanyInforByAccount = async () => {
    try {
      setLoading(true);
      const result = await apiCompany.getCampanyByAccountApi(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result && result?.data?.companyInfomation?.id != null) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setHaveCompany(true);
        setCompanyId(result?.data?.companyInfomation?.id);
        setDataCompany(result?.data?.companyInfomation);
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
    getCompanyInforByAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

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
        message: languageRedux === 1 ?
          company.err_logo_mess :
          companyEn.err_logo_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.name === '') {
      return {
        message: languageRedux === 1 ?
          company.err_name_mess :
          companyEn.err_name_mess,
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
        message: languageRedux === 1 ?
          company.err_location_mess :
          companyEn.err_location_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.address === '' || dataCompany?.address.length <= 10) {
      return {
        message: languageRedux === 1 ?
          company.err_address_mess :
          companyEn.err_address_mess,
        checkForm: false,
      };
    }
    if (
      dataCompany?.phone === '' ||
      (dataCompany?.phone && dataCompany?.phone?.length < 10) ||
      (dataCompany?.phone && dataCompany?.phone?.length > 11)
    ) {
      return {
        message: languageRedux === 1 ?
          company.err_phone_mess :
          companyEn.err_phone_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.email === '') {
      return {
        message: languageRedux === 1 ?
          company.err_email_mess :
          companyEn.err_email_mess,
        checkForm: false,
      };
    }
    if (regexCheckEmail.test(dataCompany?.email) === false) {
      return {
        message: languageRedux === 1 ?
          company.err_verify_email_mess :
          companyEn.err_verify_email_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.companyRoleInfomation === '') {
      return {
        message: languageRedux === 1 ?
          company.err_role_mess :
          companyEn.err_role_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.website === '') {
      return {
        message: languageRedux === 1 ?
          company.err_web_mess :
          companyEn.err_web_mess,
        checkForm: false,
      };
    }
    if (validURL(dataCompany?.website) === false) {
      return {
        message: languageRedux === 1 ?
          company.err_verify_web_mess :
          companyEn.err_verify_web_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.companyCategory === '') {
      return {
        message: languageRedux === 1 ?
          company.err_cate_mess :
          companyEn.err_cate_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.companySizeInfomation === '') {
      return {
        message: languageRedux === 1 ?
          company.err_size_mess :
          companyEn.err_size_mess,
        checkForm: false,
      };
    }
    if (dataCompany?.description === '') {
      return {
        message: languageRedux === 1 ?
          company.err_des_mess :
          companyEn.err_des_mess,
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
            messageApi.open({
              type: 'success',
              content: languageRedux === 1 ?
                company.create_success :
                companyEn.create_success,
            });
            // console.log("create company result", result);
          } else {
            messageApi.open({
              type: 'error',
              content: languageRedux === 1 ?
                company.create_error :
                companyEn.create_error,
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
            // setOpenModalEditPost(true);
            messageApi.open({
              type: 'success',
              content: languageRedux === 1 ?
                company.update_success :
                companyEn.update_success,
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
    formData.append('name', String(dataCompany?.name));
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
    <div className="company-container">
      {contextHolder}
      <Navbar />
      <div className="company-content">
        <h1>
          {
            languageRedux === 1 ?
              company.company_info :
              companyEn.company_info
          }
        </h1>
        <Skeleton loading={loading} active>
          <form action="">
            <EditLogoCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
            />
            <EditNameTaxCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
            />
            <EditAddressCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
            />
            <EditPhoneMailCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
            />
            <EditRoleWebCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
            />

            <EditFieldScaleCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
            />
            <EditDescripeCompany
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-edit_submitForm"
            >
              {
                languageRedux === 1 ?
                  company.finish :
                  companyEn.finish
              }
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
