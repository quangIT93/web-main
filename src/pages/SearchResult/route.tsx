// import React, { lazy } from 'react';
import SearchResult from '.';
import RouteProps from '../routes';
import HomeValueContextProvider from 'context/HomeValueContextProvider';
const route: RouteProps = {
  path: '/search-results',
  component: (
    <HomeValueContextProvider>
      <SearchResult />
    </HomeValueContextProvider>
  ),
};

export default route;
