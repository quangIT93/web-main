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
import HomeContextProvider from 'context/HomeContextProvider';
import HomeValueContextProvider from 'context/HomeValueContextProvider';
import ChatContextProvider from 'context/ChatContextProvider';
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
  // const dbRef = ref(getDatabase(app));
  // get(child(dbRef, `user`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log('No data available');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // set(child(dbRef, 'user/'), {
  //   username: 'quang',
  //   email: 'quang@gmail.com',
  //   profile_picture: 'imageUrl',
  // });

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <BrowserRouter>
          <HomeValueContextProvider>
            <ChatContextProvider>
              <ScrollObserver>
                <Layout>
                  <Routes>
                    {/* @ts-ignore */}
                    {routes.map(
                      ({ path, component: component }: RouteProps) => {
                        return (
                          <Route path={path} element={component} key={path} />
                        );
                      },
                    )}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ScrollObserver>
            </ChatContextProvider>
          </HomeValueContextProvider>
        </BrowserRouter>
      </Provider>
    </React.Suspense>
  );
};

export default App;
