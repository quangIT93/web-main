import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './pages/routes'

import { Layout } from './components'

import { Provider } from 'react-redux'
import { store } from './store'
// import firebase config
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/firebase/firebaseConfig'
import { getAnalytics } from 'firebase/analytics'
import './App.scss'
import ScrollObserver from './utils/ScrollObserver'
// import context
import HomeContextProvider from 'context/HomeContextProvider'

const NotFound = React.lazy(() => import('./pages/NotFound'))

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

interface RouteProps {
  path: string
  component: React.ReactNode
}

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <BrowserRouter>
          <HomeContextProvider>
            <ScrollObserver>
              <Layout>
                <Routes>
                  {/* @ts-ignore */}
                  {routes.map(({ path, component: component }: RouteProps) => {
                    return <Route path={path} element={component} key={path} />
                  })}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </ScrollObserver>
          </HomeContextProvider>
        </BrowserRouter>
      </Provider>
    </React.Suspense>
  )
}

export default App
