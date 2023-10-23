// import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import SearchResult from '.';
import RouteProps from '../routes';
import HomeValueContextProvider from 'context/HomeValueContextProvider';
const route: RouteProps = {
  path: '/search-results',
  component: (
    <MainLayout>
      <HomeValueContextProvider>
        <SearchResult />
      </HomeValueContextProvider>
    </MainLayout>
  ),
};

export default route;
