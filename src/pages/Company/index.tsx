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

// import NotFound from 'pages/NotFound';
import './style.scss';

// inport Api
// import postApi from 'api/postApi';
// import historyRecruiter from 'api/historyRecruiter';
// import { ConsoleSqlOutlined } from '@ant-design/icons'

import apiCompany from 'api/apiCompany';

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

  console.log('dataCompany', dataCompany);
  const [openModalEditPost, setOpenModalEditPost] = React.useState(false);

  //   const [loadingNotFound, setLoadingNotFound] = React.useState(false);

  const getCompanyInforByAccount = async () => {
    try {
      setLoading(true);
      const result = await apiCompany.getCampanyByAccountApi();
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
  }, []);

  console.log('dataCompany api: ', dataCompany);

  // valid values form data
  const validValue = () => {
    if (dataCompany?.logoPath === '') {
      return {
        message: 'Vui lòng chọn logo công ty',
        checkForm: false,
      };
    }
    if (dataCompany?.name === '') {
      return {
        message: 'Vui lòng nhập tên công ty',
        checkForm: false,
      };
    }
    if (dataCompany?.taxCode === '') {
      return {
        message: 'Vui lòng nhập mã số thuế công ty',
        checkForm: false,
      };
    }
    if (dataCompany?.companyLocation === '') {
      return {
        message: 'Vui lòng chọn tỉnh thành phố',
        checkForm: false,
      };
    }
    if (dataCompany?.address === '') {
      return {
        message: 'Vui lòng nhập địa chỉ',
        checkForm: false,
      };
    }
    if (
      dataCompany?.phone === '' ||
      (dataCompany?.phone && dataCompany?.phone?.length < 10) ||
      (dataCompany?.phone && dataCompany?.phone?.length > 11)
    ) {
      return {
        message: 'Số điện thoại sai định dạng',
        checkForm: false,
      };
    }
    if (dataCompany?.email === '') {
      return {
        message: 'Vui lòng nhập email công ty',
        checkForm: false,
      };
    }
    if (dataCompany?.companyRoleInfomation === '') {
      return {
        message: 'Vui lòng chọn vai trò của bạn',
        checkForm: false,
      };
    }
    if (dataCompany?.website === '') {
      return {
        message: 'Vui lòng nhập website công ty',
        checkForm: false,
      };
    }
    if (dataCompany?.companyCategory === '') {
      return {
        message: 'Vui lòng chọn danh mục nghề nghiệp',
        checkForm: false,
      };
    }
    if (dataCompany?.companySizeInfomation === '') {
      return {
        message: 'Vui lòng chọn quy mô công ty',
        checkForm: false,
      };
    }
    if (dataCompany?.description === '') {
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
              content: 'Tạo công ty thành công',
            });
            console.log('create company result', result);
          } else {
            messageApi.open({
              type: 'error',
              content: 'Tạo công ty không thành công',
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
              content: 'Cập nhật thông tin công ty thành công',
            });
            console.log('update company result', result);
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
        <h1>Thông tin công ty</h1>
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
              Hoàn thành
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
