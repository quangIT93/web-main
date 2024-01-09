import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
// import Profile from '.';
import RouteProps from '../routes';
const LandingVideo = lazy(() => import('.'));
const route: RouteProps = {
    path: '/landing-video',
    component: (
        <MainLayout>
            <LandingVideo />
        </MainLayout>
    ),
};

export default route;
