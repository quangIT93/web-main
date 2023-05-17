import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { AxiosResponse } from 'axios'
// import api
import postApi from 'api/postApi'


// @ts-ignore
import { useSearchParams } from 'react-router-dom'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../store/index'
import { RootState } from '../../../store/reducer'

import './style.scss'

interface ItemTheme {
  id: number
  title: string,
  image: string,
  number_of_posts: Number
}

interface PropsThemesType {
  setThemeId?: (value: number) => void
  listTheme: AxiosResponse | null
}
const ListCompanyCarousel: React.FC<PropsThemesType> = ({ listTheme }) => {
  const [value, setValue] = React.useState<Number>(0)

  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()
  const { setPostByTheme } = bindActionCreators(
    actionCreators,
    dispatch
  )
  // get post by theme id when click theme item
  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    try {
      setValue(newValue)
      const categoryId = searchParams.get('categories-id')
      if (categoryId) {
        setSearchParams({ "theme-id": `${newValue}`, "categories-id": `${Number(categoryId) == 1 ? "all" : categoryId}` })
      } else {
        setSearchParams({ "theme-id": `${newValue}` })
      }

      const result = await postApi.getPostByThemeId(newValue, 19, null)
      if (result) {
        setPostByTheme(result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {

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
        value={value == 0 ? listTheme?.data[0].id : value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="secondary"
        aria-label="simple tabs example"
        className="tabThemeJob"
      >
        {listTheme?.data.map((item: ItemTheme, index: number) => (
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
