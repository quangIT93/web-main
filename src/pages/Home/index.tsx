import React, { useEffect, useState, useContext } from 'react'
// @ts-ignore
import { Navbar } from '#components'

// @ts-ignore
import { Breadcrumbs } from '#components'
// @ts-ignore
import { Carousel } from '#components'
// @ts-ignore
import { NewJobs } from '#components'
// @ts-ignore
import { ThemesJob } from '#components'
// @ts-ignore
import { CategoryCarousel } from '#components'

import ModalLogin from '#components/Home/ModalLogin'
import { useHomeState } from './HomeState'
import './style.scss'
import Footer from '../../components/Footer/Footer'

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider'
import { HomeContext } from 'context/HomeContextProvider'

import { IvalueJobChild } from 'context/HomeValueContextProvider'

const Home: React.FC = () => {
  const {
    openCollapseFilter,
  }: // setOpenCollapseFilter,
  // setHeightNavbar,
  // heightNavbar,
  // valueJobChild,
  // setValueJobChild,
  {
    openCollapseFilter: boolean
    // setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>
    // heightNavbar: number
    // setHeightNavbar: React.Dispatch<React.SetStateAction<number>>
    // valueJobChild: IvalueJobChild
    // setValueJobChild: React.Dispatch<React.SetStateAction<IvalueJobChild>>
  } = useContext(HomeValueContext)

  // handleChange job from category to Breadcrumbs

  return (
    <div className="home">
      <div
        className={`modal-navbar ${
          openCollapseFilter ? 'show-modal_navbar' : ''
        }`}
      >
        <Navbar />
      </div>
      <Carousel />

      <div className="home__main">
        <CategoryCarousel />
        <Breadcrumbs />

        <NewJobs />
        <ThemesJob />
      </div>
      <Footer />
    </div>
  )
}

export default React.memo(Home)
