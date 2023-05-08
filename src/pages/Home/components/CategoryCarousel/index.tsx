import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabsList from '@mui/base/TabsList'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import { SearchIcon, AllIcon } from '../../../../components/Icons'

import AccessTimeIcon from '@mui/icons-material/AccessTime'

import './style.scss'

import { categories } from './dataCategory'

import CategoryItem from './components/CategoryItem'

// const CategoryCarouselItem: React.FC<CategoryCarouselItemProps> = ({
//   content,
//   imageLink,
//   imageDescription,
// }) => {
//   return (
//     <div className="category-carousel__slide ">
//       <div>
//         <img src={imageLink} alt={imageDescription} />
//       </div>
//       <div>
//         <span>{content}</span>
//       </div>
//     </div>
//   )
// }
interface PropState {
  height: number
  hideSlider: boolean
}

const CategoryCarousel: React.FC<PropState> = ({ height, hideSlider }) => {
  const [value, setValue] = React.useState(0)
  const positionRef = React.useRef(0)

  // const {height} = height
  console.log(height)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(value)
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480, lg: 1320 },
        // bgcolor: 'background.paper',
        bgcolor: 'white',
        // {height <- 247 ? marginTop: "" : marginTop: ""}
        // marginTop: height > 244 ? `${height}px` : '0px',
        position: height > 240 ? `fixed` : hideSlider ? 'fixed' : '',
        top: height > 240 ? `${height}px` : hideSlider ? '88px' : '',
        margin: height > 240 ? '0 180px' : hideSlider ? '0 180px' : '24px 0',
        paddingTop: height > 240 ? '24px' : hideSlider ? '24px' : '',

        // background: 'red',
        right: 0,
        left: 0,
        zIndex: 1,
        border: 'none',
      }}
      className="tabs"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        allowScrollButtonsMobile
        orientation="horizontal"
      >
        {/* <Tab label="Item One">sád</Tab> */}

        {categories.map((v, index) => {
          return (
            <Tab
              key={index}
              label={<CategoryItem content={v.name} imageLink={v.image} />}
              sx={{
                color: 'black',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                margin: 0,
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
