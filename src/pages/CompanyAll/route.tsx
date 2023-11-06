// import React, { lazy } from 'react'
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import CompanyAll from '.';
const route: RouteProps = {
    path: '/companyAll',
    component: (
        <MainLayout>
            <CompanyAll />
        </MainLayout>
    ),
};

export default route;
