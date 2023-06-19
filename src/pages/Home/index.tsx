import React, { useEffect, useState } from 'react'
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

import { EmblaOptionsType } from 'embla-carousel-react'

import ModalLogin from '#components/Home/ModalLogin'
import { useHomeState } from './HomeState'
import './style.scss'
import Footer from '../../components/Footer/Footer'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center',
}
const SLIDE_COUNT = 3
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export interface StatePropsCloseSlider {
  openCollapse: boolean
  setOpenCollapse: React.Dispatch<React.SetStateAction<boolean>>
  setHeight: React.Dispatch<React.SetStateAction<number>>
  height: number
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Home: React.FC = () => {
  const [valueJob, setValueJob] = React.useState<any>({
    id: 1,
    parentName: 'Tất cả',
  })

  const [hideSlider, setHideSlider] = useState<boolean>(false)
  // thay đổi width setState
  const [windowWidth, setWindowWidth] = useState(false)

  const {
    openCollapse,
    setOpenCollapse,
    height,
    setHeight,
    openModalLogin,
    setOpenModalLogin,
  } = useHomeState()

  const statePropsCloseSlider: StatePropsCloseSlider = {
    openCollapse,
    setOpenCollapse,
    setHeight,
    height,
    setOpenModalLogin,
  }

  const [isLoading, setIsLoading] = React.useState(false)

  const handleLoading = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // console.log('scrollPosition', scrollPosition)
      const threshold = 316 // Ngưỡng scroll khi slider sẽ bị ẩn

      if (scrollPosition >= threshold) {
        setHideSlider(true)
      } else {
        setHideSlider(false)
      }
    }

    // Thêm event listener cho sự kiện scroll
    window.addEventListener('scroll', handleScroll)

    // Xóa event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 784) {
        console.log('setState')
        setWindowWidth(true)
      } else {
        setWindowWidth(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const updateWindowWidth = () => {
    if (window.innerWidth < 784) {
      setWindowWidth(true)
    } else {
      setWindowWidth(false)
    }
  }

  useEffect(() => {
    updateWindowWidth()
  }, [])

  // handleChange job from category to Breadcrumbs
  const handleChange = (newValue: string, id: number) => {
    // Cập nhật giá trị trong thành phần cha

    setValueJob({
      parentName: newValue,
      id,
    })
  }

  const handleClickShowModalLogin = (openModal: boolean) => {
    setOpenModalLogin(openModal)
  }
  console.log(isLoading)

  return (
    <div className="home">
      <Navbar {...statePropsCloseSlider} />
      {/* {!openCollapse && height < 70 ? (
        <Carousel slides={SLIDES} options={OPTIONS} />
        ) : (
          <></>
          )} */}
      <Carousel slides={SLIDES} options={OPTIONS} />

      <div className="home__main">
        <CategoryCarousel
          height={height}
          hideSlider={hideSlider}
          windowWidth={windowWidth}
          valueJob={valueJob}
          onChange={handleChange}
        />
        <Breadcrumbs valueJob={valueJob} />

        <NewJobs handleLoadingW={handleLoading} />
        <ThemesJob />
      </div>
      <Footer windowWidth={windowWidth} />
      {/* <ModalLogin
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        /> */}
    </div>
  )
}

export default React.memo(Home)
