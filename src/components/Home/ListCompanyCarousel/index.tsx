import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

// IMPORT dataimg
import { dataImageThemesJob } from './dataImageThemesJob'

import './style.scss'

const ListCompanyCarousel: React.FC = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
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
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="secondary"
        aria-label="simple tabs example"
        className="tabThemeJob"
      >
        {dataImageThemesJob.map((dataTheme, index) => (
          <Tab
            key={index}
            label={
              <div>
                <img
                  src={dataTheme.img}
                  alt="amhr bị lỗi"
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '10px',
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
