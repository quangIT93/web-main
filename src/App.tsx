import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './pages/routes'
import { Layout } from './components'
// import firebase config
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/firebase/firebaseConfig'
import { getAnalytics } from 'firebase/analytics'
import './App.scss'
import ScrollObserver from './utils/ScrollObserver'

import Home from './pages/Home'
import Feed from './pages/Feed'
import Policy from './pages/Policy'
import PostDetail from './pages/PostDetail'
import RedirectorPage from './pages/Mobile/Redirector'
import About from './pages/About'
import Landing from './pages/Landing'
import ProtectedRoute from './components/routing/ProtectedRoute'

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
      <BrowserRouter>
        <ScrollObserver>
          <Layout>
            <Routes>
              {/* @ts-ignore */}
              {routes.map(({ path, component: component }: RouteProps) => {
                return (
                  <Route path={path} element={component} key={path}>
                    {path === '/home' ? (
                      <Route path="x" element={component} />
                    ) : (
                      <></>
                    )}
                  </Route>
                )
              })}
              {/* <Route path="/" element={<Landing />}></Route>
              <Route path="/"></Route>
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="home" element={<Home />}></Route>
                <Route path="feed" element={<Feed />}></Route>
                <Route path="policy" element={<Policy />}></Route>
                <Route path="post-detail" element={<PostDetail />}></Route>
                <Route path="app/mobile" element={<RedirectorPage />}></Route>
                <Route path="about" element={<About />}></Route>
              </Route>
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Layout>
        </ScrollObserver>
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App
