import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './pages/routes'
// @ts-ignore
import { Layout } from '#components'
// import NotFound from './pages/NotFound'
import './App.scss'
import ScrollObserver from './utils/ScrollObserver'
const NotFound = React.lazy(() => import('./pages/NotFound'))
// import Home from './pages/Home'
// const Home = React.lazy(() => import('./pages/Home'))

interface RouteProps {
  path: string
  componenet: React.ReactNode
}

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <ScrollObserver>
          <Layout>
            <Routes>
              {/* @ts-ignore */}
              {routes.map(({ path, componenet }: RouteProps) => {
                return <Route path={path} element={componenet} key={path} />
              })}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ScrollObserver>
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App
