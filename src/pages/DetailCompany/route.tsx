// import React, { lazy } from 'react'
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import DetailCompany from '.';
const route: RouteProps = {
    path: '/detail-company',
    component: (
        <MainLayout>
            <DetailCompany />
        </MainLayout>
    ),
};

export default route;
