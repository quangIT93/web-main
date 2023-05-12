import React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import ImageListItem from '@mui/material/ImageListItem'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { url } from 'inspector'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import "./style.scss"

const ImageCpn = () => { }

const Content = () => {
  const [page, setPage] = React.useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <Box sx={{ flexGrow: 1 }} className='item-post' >
      <h2 style={{ marginBottom: 15 }}> Công việc mới nhất </h2>
      <Grid container spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
        {itemData.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <Card
              sx={{
                minWidth: '100%',
                display: 'flex',
                padding: '12px',
                borderBottom: '1px solid #aaa',
                borderTop: '1px solid #aaa',
                cursor: 'pointer',
                '&:hover': {
                  background: '#e8f5ff',
                  transition: 'all 0.3s linear',
                },
                boxShadow: 'none',
                borderRadius: 'unset',
              }}
            >
              <ImageListItem key={item.img} sx={{ flex: 1, display: 'flex' }}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '160px', maxWidth: 'auto', height: '152px' }}
                />
                <div style={{ padding: '0', marginLeft: '12px' }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontSize: '16px', margin: 0 }}
                  >
                    Phục vụ nhà hàng
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h1"
                    component="div"
                    sx={{ fontSize: '12px' }}
                  >
                    Nhà hàng xxx
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <RoomOutlinedIcon />
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <RoomOutlinedIcon />
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <RoomOutlinedIcon sx={{ fontSize: '14px' }} />
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread
                    </Typography>
                  </div>
                </div>
              </ImageListItem>
              <CardActions sx={{ position: 'relative' }}>
                <BookmarkBorderOutlinedIcon
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}
      >
        {/* <Pagination count={10} shape="rounded" /> */}
        Test page: {page}
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  )
}

export default Content

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
]
