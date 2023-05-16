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

import './style.scss'
import Footer from '../../components/Footer/Footer'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center',
}
const SLIDE_COUNT = 3
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

interface StatePropsCloseSlider {
  openCollapse: boolean
  setOpenCollapse: React.Dispatch<React.SetStateAction<boolean>>
  setHeight: React.Dispatch<React.SetStateAction<number>>
  height: number
}

const Home: React.FC = () => {
  const [openCollapse, setOpenCollapse] = React.useState(false)

  const [height, setHeight] = React.useState<number>(0)

  const statePropsCloseSlider: StatePropsCloseSlider = {
    openCollapse,
    setOpenCollapse,
    setHeight,
    height,
  }

  const [hideSlider, setHideSlider] = useState<boolean>(false)
  // thay đổi width setState
  const [windowWidth, setWindowWidth] = useState(false)

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

  return (
    <div className="home">
      <Navbar {...statePropsCloseSlider} />
      {!openCollapse && height < 70 ? (
        <Carousel slides={SLIDES} options={OPTIONS} />
      ) : (
        <></>
      )}
      <div
        className="home__main"
        style={
          height > 70 || (hideSlider && !windowWidth)
            ? { marginTop: `${height + 255}px` }
            : { marginTop: 0 }
        }
      >
        <CategoryCarousel
          height={height}
          hideSlider={hideSlider}
          windowWidth={windowWidth}
        />
        <Breadcrumbs />
        <NewJobs />
        <ThemesJob />
      </div>
      <Footer />
    </div>
  )
}

export default React.memo(Home)
