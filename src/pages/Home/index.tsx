import React from 'react'
// @ts-ignore
import { Navbar } from '#components'
import EmblaCarousel from './components/Carousel'
import CategoryCarousel from './components/CategoryCarousel'
import './style.scss'

const Home: React.FC = () => {
  console.log('Home page here')
  return (
    <div className="home">
      <Navbar />
      <EmblaCarousel />
      <div className="home__main">
        <CategoryCarousel />
      </div>
      <strong>Home page</strong>
    </div>
  )
}

export default Home
