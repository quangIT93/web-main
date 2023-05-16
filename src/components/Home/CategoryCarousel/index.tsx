import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import './style.scss'

// import { categories } from './dataCategory'
import { AxiosResponse } from 'axios'

import CategoryItem from './components/CategoryItem'
import categoriesApi from '../../../api/categoriesApi'

interface PropState {
  height: number
  hideSlider: boolean
  windowWidth: boolean
}

// interface item category
interface CategoryItem {
  id: number,
  name: string,
  default_post_image: string
  image: string
}

const CategoryCarousel: React.FC<PropState> = ({
  height,
  hideSlider,
  windowWidth,
}) => {
  const [value, setValue] = React.useState(0)
  // const positionRef = React.useRef(0)

  // const {height} = height

  const [categories, setCategories] = React.useState<AxiosResponse | null>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  console.log('windowWidth', windowWidth)
  console.log('hideSlider', hideSlider)
  console.log('height', height)

  const getAllParentCategories = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories()
      if (result) {
        setCategories(result)
      }
    } catch (error) {
      console.error(error)
    }


  }
  React.useEffect(() => {
    getAllParentCategories()
  }, [])

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480, lg: 1320, xl: 1420, md: 720 },
        bgcolor: 'white',
        position:
          height > 60 && !windowWidth ? `fixed` : hideSlider ? 'fixed' : '',
        top:
          height > 60 && !windowWidth
            ? `${height + 121}px`
            : hideSlider
              ? '71px'
              : '',
        margin:
          height > 60 && !windowWidth
            ? '0 180px'
            : hideSlider
              ? '0 180px'
              : '24px 0',
        paddingTop:
          height > 60 && !windowWidth
            ? '0px'
            : height > 60 && windowWidth && !hideSlider
              ? '71px'
              : hideSlider
                ? '0'
                : '',

        right: 0,
        left: 0,
        zIndex: 1,
        border: 'none',
        // borderBottom: '1px solid #aaa',
        // boxShadow: '0px 1px 2px #aaa',
        // transition: 'top 0.5s',
      }}
      className="tabs"
    >
      <Tabs
        value={value == 0 ? categories?.data[0].id : value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        allowScrollButtonsMobile
        orientation="horizontal"
      >
        {/* <Tab label="Item One">sád</Tab> */}

        {categories?.data.map((item: CategoryItem, index: number) => {
          return (
            <Tab
              key={index}
              value={item.id}
              label={<CategoryItem content={item.name} imageLink={item.image} />}
              sx={{
                color: 'black',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: '12px',
                maxWidth: '120px',
              }}
            />
          )
        })}
      </Tabs>
    </Box>
  )
}

export default CategoryCarousel
