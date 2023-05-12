import React, { useEffect, useState } from 'react'
// @ts-ignore
import { Navbar } from '#components'
import CategoryCarousel from './components/CategoryCarousel'
// import EmblaCarousel from
import EmblaCarousel from './components/Carousel'
import BreadcrumbsCpn from './components/Breadcrumbs'
import Content from './components/Content'

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const threshold = 600 // Ngưỡng scroll khi slider sẽ bị ẩn

      // console.log('hideSlider', hideSlider)

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

  return (
    <div className="home">
      <Navbar {...statePropsCloseSlider} />
      {!openCollapse && height < 70 ? (
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      ) : (
        <></>
      )}
      <div
        className="home__main"
        style={
          height > 70 || hideSlider ? { marginTop: `${height + 255}px` } : {}
        }
      >
        <CategoryCarousel height={height} hideSlider={hideSlider} />
        <BreadcrumbsCpn />
        <Content />
        <Content />
      </div>
      <Footer />
    </div>
  )
}

export default React.memo(Home)
