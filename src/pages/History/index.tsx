import React, { useMemo, useCallback, useEffect } from 'react'
import { StatePropsCloseSlider } from 'pages/Home'
import { useHomeState } from '../Home/HomeState'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Collapse } from 'antd'
import { Box, Typography } from '@mui/material'

// import component
import Footer from '../../components/Footer/index'
import CardsPosted from '#components/History/CardsPosted'
import CardsApplied from '#components/History/CardsApplied'
import CardsSavedJob from '#components/History/CardsSavedJob'

// import icon

import './style.scss'
// @ts-ignore
import { Navbar } from '#components'
import Item from 'antd/es/list/Item'

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
    childs: ['Tất cả', 'Đã được duyệt', 'Đang chờ duyệt'],
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
  const [activeChild, setActiveChild] = React.useState('0-0')
  const [ItemLeft, setItemLeft] = React.useState<null | number>(0)
  const [showDetailPosted, setShowDetailPosted] = React.useState<boolean>(false)
  const statePropsCloseSlider: StatePropsCloseSlider = {
    openCollapse,
    setOpenCollapse,
    setHeight,
    height,
    setOpenModalLogin,
  }
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    // event.preventDefault()
    console.info('You clicked a breadcrumb.')
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="#0d99ff "
      href="/home"
      onClick={handleClick}
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#0d99ff "
      href="/history"
      onClick={handleClick}
    >
      Lịch sử
    </Link>,
    <Typography key="3" color="text.primary">
      {ItemLeft === dataItem[0].id - 1
        ? dataItem[0].title
        : ItemLeft === dataItem[1].id - 1
        ? dataItem[1].title
        : dataItem[2].title}
    </Typography>,
    <Typography key="3" color="text.primary">
      {activeChild === '0-0'
        ? 'Tất cả'
        : activeChild === '0-1'
        ? 'Đã được duyệt'
        : activeChild === '0-2'
        ? 'Đang chờ duyệt'
        : ''}

      {activeChild === '1-0' ? 'Tất cả' : ''}

      {activeChild === '2-0'
        ? 'Tất cả'
        : activeChild === '2-1'
        ? 'Chưa đóng'
        : activeChild === '2-2'
        ? 'Đã đóng'
        : ''}
    </Typography>,
  ]
  const CardsPost = useMemo(() => {
    if (ItemLeft === 2) {
      return (
        <CardsPosted
          activeChild={activeChild}
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      )
    }
    return null
  }, [ItemLeft, activeChild, showDetailPosted, setShowDetailPosted])

  const CardsApply = useMemo(() => {
    if (ItemLeft === 0) {
      return <CardsApplied activeChild={activeChild} />
    }
    return null
  }, [ItemLeft, activeChild])

  const CardsSave = useMemo(() => {
    if (ItemLeft === 1) {
      return <CardsSavedJob activeChild={activeChild} />
    }
    return null
  }, [ItemLeft, activeChild])

  const handleChildClick = useCallback((childKey: string) => {
    setActiveChild(childKey)

    if (childKey === '2-0') setShowDetailPosted(false)
    if (childKey === '2-1') setShowDetailPosted(false)
    if (childKey === '2-2') setShowDetailPosted(false)
  }, [])

  const handleClickSubTitle = useCallback((index: number) => {
    setItemLeft(index)
    setActiveChild(`${index}-0`)
    setShowDetailPosted(false)
  }, [])
  console.log('render history')

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
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Box className="history-post_left">
            <Collapse accordion bordered={false} ghost={true}>
              {dataItem.map((item: any, index: number) => (
                <Panel
                  header={
                    <div
                      onClick={() => handleClickSubTitle(index)}
                      className={`${
                        ItemLeft === index ? 'activeItem' : ''
                      } panel-title_text`}
                    >
                      {item.title}
                    </div>
                  }
                  key={index}
                  className={`history-left_item`}
                >
                  {item.childs.map((child: string, idx: number) => (
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
            {CardsPost}
            {CardsApply}
            {CardsSave}
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  )
}

export default HistoryPost
