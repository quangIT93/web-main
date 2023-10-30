import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './pages/routes';

import { Layout } from './components';

import { Provider } from 'react-redux';
import { store } from './store';
// import firebase config
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebase/firebaseConfig';
import { getAnalytics } from 'firebase/analytics';
// import { getDatabase, ref, child, get, set } from 'firebase/database';
import './App.scss';
import ScrollObserver from './utils/ScrollObserver';
// import context
// import HomeContextProvider from 'context/HomeContextProvider';
import HomeValueContextProvider from 'context/HomeValueContextProvider';
import ChatContextProvider from 'context/ChatContextProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import Loading from '#components/Loading';

const NotFound = React.lazy(() => import('./pages/NotFound'));

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database: any =
getAnalytics(app);

interface RouteProps {
  path: string;
  component: React.ReactNode;
}

const App: React.FC = () => {
  let persistor = persistStore(store);

  return (
    <React.Suspense fallback={<Loading />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <HomeValueContextProvider>
              <ChatContextProvider>
                <ScrollObserver>
                  <Layout>
                    <Routes>
                      {/* @ts-ignore */}
                      {routes.map(({ path, component }: RouteProps) => {
                        return (
                          <Route path={path} element={component} key={path} />
                        );
                      })}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </ScrollObserver>
              </ChatContextProvider>
            </HomeValueContextProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.Suspense>
  );
};

export default App;
