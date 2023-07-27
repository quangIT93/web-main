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

import EditLogoCompany from './components/EditLogoCompany';
import EditNameTaxCompany from './components/EditNameTaxCompany';
import EditAddressCompany from './components/EditAddressCompany';
import EditPhoneMailCompany from './components/EditPhoneMailCompany';
import EditRoleWebCompany from './components/EditRoleWebCompany';
import EditFieldScaleCompany from './components/EditFieldScaleCompany';
import EditDescripeCompany from './components/EditDescripeCompany';

import ModalEditSuccess from '#components/EditPosted/ModalEditSuccess';

import NotFound from 'pages/NotFound';
import './style.scss';

// inport Api
import postApi from 'api/postApi';
import historyRecruiter from 'api/historyRecruiter';
// import { ConsoleSqlOutlined } from '@ant-design/icons'

import apiCompany from 'api/apiCompany';

export interface FormValues {
    id: string;
    company_name: string;
    address: string;
    ward_id: string | null;
    tax: string;
    phoneNumber: string;
    email: string | null;
    web: string | null;
    description: string;
    role_id: number | null;
    size_id: number | null;
    category_id: number | null;
    logo: string;
    deletedImages: any;
}

const Company = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const [dataCompanyById, setDataCompanyById] = useState<any>(null);

    const [dataCompany, setDataCompany] = useState<any | null>({
        id: '',
        company_name: '',
        address: '',
        ward_id: null,
        tax: '',
        phoneNumber: '',
        email: '',
        web: '',
        description: '',
        role_id: 1,
        size_id: 1,
        category_id: 1,
        logo: '',
        deletedImages: '',
    });

    console.log("dataCompany", dataCompany);


    const [dataPostAccount, SetDataPostAccount] = React.useState<any>([]);

    const [openModalEditPost, setOpenModalEditPost] = React.useState(false);

    const [loadingNotFound, setLoadingNotFound] = React.useState(false);

    const getCompanyInforByAccount = async () => {
        try {
            setLoading(true);
            const result = await apiCompany.getCampanyByAccountApi()
            if (result) {
                setLoading(false);
                setDataCompany(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCompanyInforByAccount()
    }, [])

    console.log("dataCompany api: ", dataCompany);



    // if (dataPostById) {
    return (
        <div className="company-container">
            {/* {contextHolder} */}
            <Navbar />
            <div className="company-content">
                <h1>Thông tin công ty</h1>
                {/* <Skeleton loading={loading} active> */}
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
                        // onClick={handleSubmit}
                        className="btn-edit_submitForm"
                    >
                        Hoàn thành
                    </button>
                </form>
                {/* </Skeleton> */}
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
