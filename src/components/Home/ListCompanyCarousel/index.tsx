import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { AxiosResponse } from 'axios'
// import api
import themeApi from '../../../api/themesApi'
import postApi from 'api/postApi'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../store/index'
import { RootState } from '../../../store/reducer'

// IMPORT dataimg
import { dataImageThemesJob } from './dataImageThemesJob'

import './style.scss'

interface ItemTheme {
  id: number
  title: string,
  image: string,
  number_of_posts: Number
}

const ListCompanyCarousel: React.FC = () => {
  const [value, setValue] = React.useState<Number>(0)
  const [listThemes, setListThemes] = React.useState<AxiosResponse | null>(null)

  const dispatch = useDispatch()
  const { setPostByTheme } = bindActionCreators(
    actionCreators,
    dispatch
  )

  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    try {
      setValue(newValue)
      const result = await postApi.getPostByThemeId(newValue, 19, null)
      if (result) {
        setPostByTheme(result)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const getThemesEnable = async () => {
    try {
      const result = await themeApi.getThemesEnable()
      if (result) {
        setListThemes(result)
      }
    } catch (error) {
      console.error(error)
    }


  }
  React.useEffect(() => {
    getThemesEnable()
  }, [])
  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '28px',
      }}
    >
      <Tabs
        value={value == 0 ? listThemes?.data[0].id : value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="secondary"
        aria-label="simple tabs example"
        className="tabThemeJob"
      >
        {listThemes?.data.map((item: ItemTheme, index: number) => (
          <Tab
            key={index}

            value={item.id}
            label={
              <div>
                <img
                  src={item.image}
                  alt="amhr bị lỗi"
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '10px',
                    objectFit: "cover"
                  }}
                />
              </div>
            }
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default ListCompanyCarousel
