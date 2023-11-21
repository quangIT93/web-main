import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
// import Profile from '.';
import RouteProps from '../routes';
const LangdingHijob = lazy(() => import('.'));
const route: RouteProps = {
    path: '/landing-hijob',
    component: (
        <MainLayout>
            <LangdingHijob />
        </MainLayout>
    ),
};

export default route;
