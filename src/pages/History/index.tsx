import React from 'react'
import { StatePropsCloseSlider } from 'pages/Home'
import { useHomeState } from '../Home/HomeState'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Collapse } from 'antd'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Space, Tooltip } from 'antd'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Footer from '../../components/Footer/index'

// import icon
import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons'
import './style.scss'
// @ts-ignore
import { Navbar } from '#components'
import { render } from '@testing-library/react'
const { Panel } = Collapse
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const dataItem = [
  {
    id: 1,
    title: 'Các công việc đã ứng tuyển',
    childs: ['Tất cả', 'Đang chờ duyệt', 'Đã chờ duyệt'],
  },
  {
    id: 2,
    title: 'Các công việc đã lưu',
    childs: ['Tất cả'],
  },
  {
    id: 3,
    title: 'Các công việc đã đăng tuyển',
    childs: ['Tất cả', 'Chưa đóng', 'Đã đóng'],
  },
]
const HistoryPost = () => {
  const {
    openCollapse,
    setOpenCollapse,
    height,
    setHeight,
    openModalLogin,
    setOpenModalLogin,
  } = useHomeState()
  const [newOld, setnewOld] = React.useState('Mới nhất')
  const [activeKey, setActiveKey] = React.useState<string | string[]>([])
  const [activeChild, setActiveChild] = React.useState('')
  const statePropsCloseSlider: StatePropsCloseSlider = {
    openCollapse,
    setOpenCollapse,
    setHeight,
    height,
    setOpenModalLogin,
  }
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
  }
  const handleChange = (event: any) => {
    setnewOld(event.target.value)
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="#0d99ff "
      href="/"
      onClick={handleClick}
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#0d99ff "
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Lịch sử
    </Link>,
    <Typography key="3" color="text.primary">
      Các công việc đã ứng tuyển
    </Typography>,
  ]
  console.log('render', render)

  const handleCollapseChange = (keys: string | string[]) => {
    setActiveKey(keys)
  }

  const handleChildClick = (childKey: string) => {
    setActiveChild(childKey)
  }

  console.log('activeKey', activeKey)
  return (
    <div className="post-history">
      <Navbar {...statePropsCloseSlider} />
      <div className="post-history_main">
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
        <Box sx={{ display: 'flex', padding: '12px 0' }}>
          <Box className="history-post_left">
            <Collapse accordion bordered={false} ghost={true}>
              {dataItem.map((item, index) => (
                <Panel
                  header={item.title}
                  key={index}
                  className="history-left_item"
                >
                  {item.childs.map((child, idx) => (
                    <div
                      key={idx}
                      className={
                        activeChild === `${index}-${idx}`
                          ? 'active-child child-item'
                          : 'child-item'
                      }
                      onClick={() => handleChildClick(`${index}-${idx}`)}
                    >
                      {child}
                    </div>
                  ))}
                </Panel>
              ))}
            </Collapse>
          </Box>

          <Box className="history-post_right">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                5 đơn ứng tuyển đã gửi
              </Typography>
              <TextField
                select
                id="sex"
                value={newOld}
                onChange={handleChange}
                variant="outlined"
                placeholder="Giới tính"
                size="small"
                sx={{ width: '120px' }}
              >
                <MenuItem value="Mới nhất">Mới nhất</MenuItem>
                <MenuItem value="Cũ nhất">Cũ nhất</MenuItem>
              </TextField>
            </Box>
            <Box>
              <Grid spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
                <Grid>
                  {[1, 2, 3].map(() => (
                    <Card
                      sx={{
                        minWidth: '100%',
                        display: 'flex',
                        padding: '12px',
                        cursor: 'pointer',
                        '&:hover': {
                          background: '#E7E7ED',
                          transition: 'all 0.3s linear',
                        },
                        boxShadow: 'none',
                        borderRadius: '5px',
                        margin: '12px 0',
                      }}
                      onClick={(e) => {
                        console.log('ádhajh')
                      }}
                    >
                      <ImageListItem sx={{ flex: 1, display: 'flex' }}>
                        <img
                          src={`aaaa?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`aaa?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt="adnanjk"
                          loading="lazy"
                          style={{
                            width: '120px',
                            maxWidth: 'auto',
                            height: '100%',
                            maxHeight: 150,
                            borderRadius: 10,
                          }}
                        />
                        <div
                          style={{ padding: '0', marginLeft: '12px' }}
                          className="div-cart-item-post"
                        >
                          <Tooltip placement="top" title="àhakj">
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              sx={{
                                fontSize: '15px',
                                margin: 0,
                                fontWeight: 'bold',
                              }}
                            >
                              aaaa
                            </Typography>
                          </Tooltip>
                          <Tooltip placement="top" title="j j  j jj">
                            <Typography
                              gutterBottom
                              variant="h1"
                              component="div"
                              sx={{ fontSize: '12px' }}
                            >
                              akfjaklfjlk
                            </Typography>
                          </Tooltip>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                            }}
                          >
                            <EnvironmentFilled className="icon-cart-item-post" />
                            <Typography variant="body2" color="text.secondary">
                              quan, tinh
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <ClockCircleFilled className="icon-cart-item-post" />
                            <Typography variant="body2" color="text.secondary">
                              aaa
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <AttachMoneyIcon
                              sx={{
                                fontSize: 20,
                                marginLeft: '-2px',
                                marginRight: '2px',
                                color: '#575757',
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              1111
                            </Typography>
                          </div>
                          <div
                            style={{
                              marginTop: 5,
                            }}
                          >
                            <p
                              style={{
                                color: '#AAAAAA',
                                fontSize: 13,
                                fontStyle: 'italic',
                              }}
                            >
                              aaa
                            </p>
                          </div>
                        </div>
                      </ImageListItem>

                      <Space
                        style={{ justifyContent: 'space-between' }}
                        direction="vertical"
                        align="center"
                      >
                        <BookmarkBorderOutlinedIcon sx={{ top: 0, right: 0 }} />
                        <img className="img-resource-company" src="" />
                        <p style={{ fontSize: 13, fontStyle: 'italic' }}>aaa</p>
                      </Space>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  )
}

export default HistoryPost
