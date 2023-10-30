// import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import HomeValueContextProvider from 'context/HomeValueContextProvider';
import { lazy } from 'react';
const SearchResult = lazy(() => import('.'));
const route: RouteProps = {
  path: '/search-results',
  component: (
    <HomeValueContextProvider>
      <MainLayout>
        <SearchResult />
      </MainLayout>
    </HomeValueContextProvider>
  ),
};

export default route;
